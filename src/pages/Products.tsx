
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '@/lib/data';
import { Product } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearch(searchParam);
    }
    
    const sortParam = searchParams.get('sort');
    if (sortParam) {
      setSortOption(sortParam);
    }
  }, [searchParams]);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(searchLower) || 
          product.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort products
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
    
    // Update URL params
    const params: Record<string, string> = {};
    if (selectedCategory !== 'all') params.category = selectedCategory;
    if (search) params.search = search;
    if (sortOption !== 'featured') params.sort = sortOption;
    
    setSearchParams(params, { replace: true });
  }, [selectedCategory, search, sortOption, setSearchParams]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already applied in the useEffect
  };
  
  const resetFilters = () => {
    setSelectedCategory('all');
    setSearch('');
    setSortOption('featured');
    setSearchParams({});
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Products</h1>
            
            <form onSubmit={handleSearch} className="flex w-full md:w-auto md:max-w-sm">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pr-10"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>
          </div>
          
          <div className="md:hidden mb-4">
            <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full flex justify-between">
                  <span>Filters & Sorting</span>
                  <SlidersHorizontal size={16} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className={selectedCategory === category.id ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
                
                {(selectedCategory !== 'all' || search || sortOption !== 'featured') && (
                  <Button variant="ghost" onClick={resetFilters} className="text-sm">
                    Reset Filters
                  </Button>
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-60 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                          selectedCategory === category.id 
                            ? 'bg-green-100 text-green-700 font-medium' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Sort By</h3>
                  <div className="space-y-2">
                    <ToggleGroup 
                      type="single" 
                      value={sortOption} 
                      onValueChange={(value) => value && setSortOption(value)}
                      className="flex flex-col space-y-1"
                    >
                      <ToggleGroupItem value="featured" className="justify-start">Featured</ToggleGroupItem>
                      <ToggleGroupItem value="price-low" className="justify-start">Price: Low to High</ToggleGroupItem>
                      <ToggleGroupItem value="price-high" className="justify-start">Price: High to Low</ToggleGroupItem>
                      <ToggleGroupItem value="rating" className="justify-start">Highest Rated</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
                
                {(selectedCategory !== 'all' || search || sortOption !== 'featured') && (
                  <Button variant="outline" onClick={resetFilters} className="w-full">
                    Reset Filters
                  </Button>
                )}
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="flex-grow">
              {search && (
                <p className="mb-4 text-sm text-gray-600">
                  Search results for: <span className="font-medium">{search}</span>
                </p>
              )}
              
              <ProductGrid products={filteredProducts} />
              
              {filteredProducts.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-gray-600">No products found matching your criteria.</p>
                  <Button variant="link" onClick={resetFilters} className="mt-2">
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
