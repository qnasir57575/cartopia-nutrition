
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RatingStars from '@/components/RatingStars';
import ProductGrid from '@/components/ProductGrid';
import { 
  Alert,
  AlertTitle,
  AlertDescription 
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Minus, Plus, Info } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === id);
  
  // Get similar products
  const similarProducts = product 
    ? products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-md p-8 rounded-lg bg-white shadow-sm text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">
              The product you're looking for does not exist or has been removed.
            </p>
            <Link to="/products">
              <Button>View All Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link to="/products" className="inline-flex items-center text-sm text-green-600 hover:text-green-700">
              <ArrowLeft size={16} className="mr-1" />
              Back to Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div>
              <div className="rounded-lg overflow-hidden bg-gray-100 h-96">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <RatingStars rating={product.rating} size={20} className="mr-2" />
                <span className="text-sm text-gray-600">
                  {product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'}
                </span>
              </div>
              
              <div className="text-2xl font-bold text-green-600 mb-4">
                ${product.price.toFixed(2)}
              </div>
              
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
              
              {product.stock === 0 ? (
                <Alert variant="destructive" className="mb-6">
                  <AlertTitle>Out of Stock</AlertTitle>
                  <AlertDescription>
                    This product is currently out of stock. Please check back later.
                  </AlertDescription>
                </Alert>
              ) : product.stock < 10 ? (
                <Alert className="mb-6 border-yellow-200 bg-yellow-50">
                  <Info className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-600">Low Stock</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    Only {product.stock} items left in stock.
                  </AlertDescription>
                </Alert>
              ) : null}
              
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <Button 
                    onClick={handleAddToCart} 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Nutritional Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-sm text-gray-500">Serving Size</div>
                    <div className="font-medium">{product.nutritionalInfo.servingSize}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-sm text-gray-500">Protein</div>
                    <div className="font-medium">{product.nutritionalInfo.protein}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-sm text-gray-500">Carbs</div>
                    <div className="font-medium">{product.nutritionalInfo.carbs}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-sm text-gray-500">Fat</div>
                    <div className="font-medium">{product.nutritionalInfo.fat}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-sm text-gray-500">Sugar</div>
                    <div className="font-medium">{product.nutritionalInfo.sugar}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-sm text-gray-500">Calories</div>
                    <div className="font-medium">{product.nutritionalInfo.calories}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs for description, ingredients and reviews */}
          <div className="mb-12">
            <div className="border-b border-gray-200 mb-6">
              <div className="text-xl font-bold mb-4">Ingredients</div>
            </div>
            <div className="prose max-w-none text-gray-600">
              <ul className="list-disc pl-5 space-y-1">
                {product.nutritionalInfo.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="mb-16">
            <div className="border-b border-gray-200 mb-6">
              <div className="text-xl font-bold mb-4">Customer Reviews</div>
            </div>
            
            {product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-100 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="font-medium text-gray-900 mr-2">{review.userName}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <RatingStars rating={review.rating} size={16} className="mb-2" />
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                This product has no reviews yet. Be the first to leave a review!
              </p>
            )}
          </div>
          
          {/* Similar Products Section */}
          {similarProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
              <ProductGrid products={similarProducts} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
