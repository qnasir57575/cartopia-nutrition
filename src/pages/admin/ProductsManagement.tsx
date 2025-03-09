
import React, { useState } from 'react';
import { products, categories } from '@/lib/data';
import { Product } from '@/lib/types';
import { 
  PencilIcon, 
  Trash2Icon, 
  PlusIcon, 
  Search,
  CheckIcon,
  XIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

const ProductsManagement: React.FC = () => {
  const [productsList, setProductsList] = useState<Product[]>(products);
  const [search, setSearch] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    featured: false,
    stock: 0,
    rating: 0,
    reviews: [],
    nutritionalInfo: {
      servingSize: '',
      protein: '',
      carbs: '',
      fat: '',
      sugar: '',
      calories: '',
      ingredients: []
    }
  });
  
  const filteredProducts = productsList.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleAddProduct = () => {
    // In a real app, this would be an API call
    const newProductComplete = {
      ...newProduct,
      id: `${productsList.length + 1}`,
      rating: 0,
      reviews: []
    } as Product;
    
    setProductsList([...productsList, newProductComplete]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Product added",
      description: `${newProduct.name} has been added to the catalog.`,
    });
    
    // Reset form
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      featured: false,
      stock: 0,
      rating: 0,
      reviews: [],
      nutritionalInfo: {
        servingSize: '',
        protein: '',
        carbs: '',
        fat: '',
        sugar: '',
        calories: '',
        ingredients: []
      }
    });
  };
  
  const handleOpenEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setNewProduct(product);
    setIsEditDialogOpen(true);
  };
  
  const handleEditProduct = () => {
    if (!currentProduct) return;
    
    // In a real app, this would be an API call
    const updatedProducts = productsList.map(p => 
      p.id === currentProduct.id ? { ...p, ...newProduct } : p
    );
    
    setProductsList(updatedProducts);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Product updated",
      description: `${newProduct.name} has been updated successfully.`,
    });
  };
  
  const handleOpenDeleteDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteProduct = () => {
    if (!currentProduct) return;
    
    // In a real app, this would be an API call
    const updatedProducts = productsList.filter(p => p.id !== currentProduct.id);
    
    setProductsList(updatedProducts);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Product deleted",
      description: `${currentProduct.name} has been removed from the catalog.`,
      variant: "destructive",
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested nutritionalInfo properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setNewProduct({
        ...newProduct,
        [parent]: {
          ...newProduct[parent as keyof typeof newProduct],
          [child]: value
        }
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value
      });
    }
  };
  
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setNewProduct({
      ...newProduct,
      [name]: parseFloat(value)
    });
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setNewProduct({
      ...newProduct,
      featured: checked
    });
  };
  
  const handleCategoryChange = (value: string) => {
    setNewProduct({
      ...newProduct,
      category: value
    });
  };
  
  return (
    <div>
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusIcon size={16} className="mr-2" />
          Add New Product
        </Button>
      </header>
      
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Product</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Category</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Price</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Stock</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Featured</th>
              <th className="py-3 px-4 text-right font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {categories.find(c => c.id === product.category)?.name || product.category}
                </td>
                <td className="py-3 px-4 font-medium">${product.price.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className={`font-medium ${
                    product.stock === 0 ? 'text-red-600' : 
                    product.stock < 10 ? 'text-amber-600' : 'text-gray-600'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {product.featured ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      <CheckIcon size={12} className="mr-1" />
                      Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      <XIcon size={12} className="mr-1" />
                      No
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleOpenEditDialog(product)}
                    >
                      <PencilIcon size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleOpenDeleteDialog(product)}
                    >
                      <Trash2Icon size={16} />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No products found matching your search.</p>
          </div>
        )}
      </div>
      
      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Premium Whey Protein"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={newProduct.price?.toString()}
                  onChange={handleNumberInputChange}
                  placeholder="49.99"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Product description..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.id !== 'all').map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={newProduct.stock?.toString()}
                  onChange={handleNumberInputChange}
                  placeholder="50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="featured" className="cursor-pointer">Featured Product</Label>
              <Switch
                id="featured"
                checked={!!newProduct.featured}
                onCheckedChange={handleSwitchChange}
              />
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-4">Nutritional Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nutritionalInfo.servingSize">Serving Size</Label>
                  <Input
                    id="nutritionalInfo.servingSize"
                    name="nutritionalInfo.servingSize"
                    value={newProduct.nutritionalInfo?.servingSize}
                    onChange={handleInputChange}
                    placeholder="30g"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nutritionalInfo.protein">Protein</Label>
                  <Input
                    id="nutritionalInfo.protein"
                    name="nutritionalInfo.protein"
                    value={newProduct.nutritionalInfo?.protein}
                    onChange={handleInputChange}
                    placeholder="25g"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nutritionalInfo.carbs">Carbs</Label>
                  <Input
                    id="nutritionalInfo.carbs"
                    name="nutritionalInfo.carbs"
                    value={newProduct.nutritionalInfo?.carbs}
                    onChange={handleInputChange}
                    placeholder="3g"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nutritionalInfo.fat">Fat</Label>
                  <Input
                    id="nutritionalInfo.fat"
                    name="nutritionalInfo.fat"
                    value={newProduct.nutritionalInfo?.fat}
                    onChange={handleInputChange}
                    placeholder="1.5g"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nutritionalInfo.sugar">Sugar</Label>
                  <Input
                    id="nutritionalInfo.sugar"
                    name="nutritionalInfo.sugar"
                    value={newProduct.nutritionalInfo?.sugar}
                    onChange={handleInputChange}
                    placeholder="1g"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nutritionalInfo.calories">Calories</Label>
                  <Input
                    id="nutritionalInfo.calories"
                    name="nutritionalInfo.calories"
                    value={newProduct.nutritionalInfo?.calories}
                    onChange={handleInputChange}
                    placeholder="120"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct}>
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  value={newProduct.price?.toString()}
                  onChange={handleNumberInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <textarea
                id="edit-description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  defaultValue={newProduct.category} 
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c.id !== 'all').map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-stock">Stock</Label>
                <Input
                  id="edit-stock"
                  name="stock"
                  type="number"
                  value={newProduct.stock?.toString()}
                  onChange={handleNumberInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="edit-featured" className="cursor-pointer">Featured Product</Label>
              <Switch
                id="edit-featured"
                checked={!!newProduct.featured}
                onCheckedChange={handleSwitchChange}
              />
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-4">Nutritional Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-nutritionalInfo.servingSize">Serving Size</Label>
                  <Input
                    id="edit-nutritionalInfo.servingSize"
                    name="nutritionalInfo.servingSize"
                    value={newProduct.nutritionalInfo?.servingSize}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-nutritionalInfo.protein">Protein</Label>
                  <Input
                    id="edit-nutritionalInfo.protein"
                    name="nutritionalInfo.protein"
                    value={newProduct.nutritionalInfo?.protein}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-nutritionalInfo.carbs">Carbs</Label>
                  <Input
                    id="edit-nutritionalInfo.carbs"
                    name="nutritionalInfo.carbs"
                    value={newProduct.nutritionalInfo?.carbs}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-nutritionalInfo.fat">Fat</Label>
                  <Input
                    id="edit-nutritionalInfo.fat"
                    name="nutritionalInfo.fat"
                    value={newProduct.nutritionalInfo?.fat}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-nutritionalInfo.sugar">Sugar</Label>
                  <Input
                    id="edit-nutritionalInfo.sugar"
                    name="nutritionalInfo.sugar"
                    value={newProduct.nutritionalInfo?.sugar}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-nutritionalInfo.calories">Calories</Label>
                  <Input
                    id="edit-nutritionalInfo.calories"
                    name="nutritionalInfo.calories"
                    value={newProduct.nutritionalInfo?.calories}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Product Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete <span className="font-medium">{currentProduct?.name}</span>?</p>
            <p className="text-gray-500 text-sm mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteProduct}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsManagement;
