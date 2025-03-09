
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';

// Pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Wishlist from '@/pages/Wishlist';
import NotFound from '@/pages/NotFound';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductsManagement from '@/pages/admin/ProductsManagement';
import OrdersManagement from '@/pages/admin/OrdersManagement';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<ProductsManagement />} />
                  <Route path="orders" element={<OrdersManagement />} />
                  <Route path="customers" element={<AdminDashboard />} /> {/* Placeholder */}
                  <Route path="settings" element={<AdminDashboard />} /> {/* Placeholder */}
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
