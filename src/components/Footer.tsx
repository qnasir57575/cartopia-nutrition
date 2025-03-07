
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold text-green-600">typecabNutrition</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Premium nutrition products to support your fitness journey. Quality ingredients, scientifically formulated.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-green-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Products column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Products</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/products?category=whey" className="text-sm text-gray-600 hover:text-green-600">
                  Whey Protein
                </Link>
              </li>
              <li>
                <Link to="/products?category=plant" className="text-sm text-gray-600 hover:text-green-600">
                  Plant Protein
                </Link>
              </li>
              <li>
                <Link to="/products?category=performance" className="text-sm text-gray-600 hover:text-green-600">
                  Performance
                </Link>
              </li>
              <li>
                <Link to="/products?category=recovery" className="text-sm text-gray-600 hover:text-green-600">
                  Recovery
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-green-600">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-green-600">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-green-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-green-600">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-green-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-green-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-green-600">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-green-600">
                  Returns & Refunds
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} typecabNutrition. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
