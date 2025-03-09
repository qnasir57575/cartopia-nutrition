
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  BarChart3, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock dashboard data
  const dashboardData = {
    totalSales: '$12,453',
    newOrders: 28,
    totalProducts: 87,
    totalCustomers: 346
  };
  
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalSales}</div>
            <p className="text-xs text-green-500 mt-1">+15% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">New Orders</CardTitle>
            <ShoppingCart className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.newOrders}</div>
            <p className="text-xs text-green-500 mt-1">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
            <Package className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalProducts}</div>
            <p className="text-xs text-gray-500 mt-1">+3 new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
            <Users className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalCustomers}</div>
            <p className="text-xs text-green-500 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <BarChart3 className="h-24 w-24 text-gray-300" />
            <p className="text-gray-500">Sales chart will appear here</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Order #45623</p>
                  <p className="text-sm text-gray-500">2 items • Premium Whey Protein, BCAA Recovery</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$99.98</p>
                  <p className="text-sm text-amber-600">Processing</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Order #45622</p>
                  <p className="text-sm text-gray-500">1 item • Plant-Based Protein</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$54.99</p>
                  <p className="text-sm text-green-600">Delivered</p>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Order #45621</p>
                  <p className="text-sm text-gray-500">3 items • Casein Protein, Pre-Workout, Mass Gainer</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$152.97</p>
                  <p className="text-sm text-blue-600">Shipped</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
