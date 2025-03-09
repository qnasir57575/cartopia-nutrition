
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Search,
  LogIn,
  ShieldCheck
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AuthModal from './auth/AuthModal';
import { useMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const isMobile = useMobile();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About' },
  ];
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };
  
  const closeNav = () => {
    setNavOpen(false);
  };
  
  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
        <div className="container px-4 mx-auto flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center text-2xl font-bold text-gray-900" onClick={closeNav}>
            typecab<span className="text-green-600">Nutrition</span>
          </Link>
          
          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden flex items-center text-gray-500 hover:text-gray-700"
            onClick={toggleNav}
            aria-label="Toggle menu"
          >
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-green-600'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {isAdmin && (
              <Link
                to="/admin"
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors flex items-center"
              >
                <ShieldCheck size={16} className="mr-1"/>
                Admin
              </Link>
            )}
          </nav>
          
          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/wishlist" className="p-2 text-gray-700 hover:text-green-600 transition-colors relative">
              <Heart size={20} />
            </Link>
            
            <Link to="/cart" className="p-2 text-gray-700 hover:text-green-600 transition-colors relative">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user?.name}</span>
                      <span className="text-xs text-gray-500">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setAuthModalOpen(true)}>
                <LogIn size={16} className="mr-1" />
                Login
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Overlay */}
      {navOpen && (
        <div className="fixed inset-0 z-30 bg-white md:hidden overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
              <Link to="/" className="text-2xl font-bold text-gray-900" onClick={closeNav}>
                typecab<span className="text-green-600">Nutrition</span>
              </Link>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={toggleNav}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="py-4">
              <div className="relative mb-6">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block text-lg font-medium py-2 border-b border-gray-100 ${
                      location.pathname === item.path
                        ? 'text-green-600'
                        : 'text-gray-700'
                    }`}
                    onClick={closeNav}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block text-lg font-medium py-2 border-b border-gray-100 text-gray-700 flex items-center"
                    onClick={closeNav}
                  >
                    <ShieldCheck size={18} className="mr-2"/>
                    Admin Dashboard
                  </Link>
                )}
              </nav>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 py-2">
                  <Link 
                    to="/wishlist" 
                    className="flex items-center text-gray-700"
                    onClick={closeNav}
                  >
                    <Heart size={20} className="mr-3" />
                    <span className="text-lg font-medium">Wishlist</span>
                  </Link>
                </div>
                
                <div className="flex items-center justify-between border-b border-gray-100 py-2">
                  <Link 
                    to="/cart" 
                    className="flex items-center text-gray-700"
                    onClick={closeNav}
                  >
                    <ShoppingCart size={20} className="mr-3" />
                    <span className="text-lg font-medium">Cart</span>
                  </Link>
                  {cartItemsCount > 0 && (
                    <span className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
                
                {isAuthenticated ? (
                  <div className="pt-4">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-gray-500 mb-4">{user?.email}</p>
                    <div className="space-y-3">
                      <Link 
                        to="/profile" 
                        className="block text-gray-700 py-1"
                        onClick={closeNav}
                      >
                        My Profile
                      </Link>
                      <Link 
                        to="/orders" 
                        className="block text-gray-700 py-1"
                        onClick={closeNav}
                      >
                        My Orders
                      </Link>
                      <button
                        className="block text-red-600 py-1"
                        onClick={() => {
                          logout();
                          closeNav();
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    className="w-full mt-4 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setAuthModalOpen(true);
                      closeNav();
                    }}
                  >
                    <LogIn size={16} className="mr-1" />
                    Login / Register
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
};

export default Navbar;
