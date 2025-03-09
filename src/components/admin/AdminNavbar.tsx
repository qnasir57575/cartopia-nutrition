
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';

const AdminNavbar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  
  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/products', icon: <Package size={20} />, label: 'Products' },
    { path: '/admin/orders', icon: <ShoppingBag size={20} />, label: 'Orders' },
    { path: '/admin/customers', icon: <Users size={20} />, label: 'Customers' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];
  
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6">
        <Link to="/" className="text-xl font-bold text-white">
          TypeCab<span className="text-green-500">Admin</span>
        </Link>
      </div>
      
      <nav className="flex-1 mt-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
                  location.pathname === item.path ? 'bg-gray-800 text-white' : ''
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-gray-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
          onClick={logout}
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </Button>
        
        <Link to="/">
          <Button 
            variant="ghost" 
            className="w-full mt-4 justify-start text-gray-300 hover:text-white hover:bg-gray-800"
          >
            Back to Store
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
