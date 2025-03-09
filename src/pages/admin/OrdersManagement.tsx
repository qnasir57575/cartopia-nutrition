
import React, { useState } from 'react';
import { 
  ArrowDownAZ, 
  ArrowUpAZ, 
  EyeIcon, 
  FilterIcon,
  Calendar,
  Package,
  Truck,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    customerName: 'John Smith',
    email: 'john.smith@example.com',
    date: '2023-05-15',
    total: 99.98,
    status: 'delivered',
    items: [
      { productName: 'Premium Whey Protein', quantity: 1, price: 49.99 },
      { productName: 'BCAA Recovery Formula', quantity: 1, price: 34.99 },
      { productName: 'Shaker Bottle', quantity: 1, price: 15.00 }
    ]
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Doe',
    email: 'jane.doe@example.com',
    date: '2023-05-18',
    total: 54.99,
    status: 'processing',
    items: [
      { productName: 'Plant-Based Protein', quantity: 1, price: 54.99 }
    ]
  },
  {
    id: 'ORD-003',
    customerName: 'Robert Johnson',
    email: 'robert.j@example.com',
    date: '2023-05-20',
    total: 152.97,
    status: 'shipped',
    items: [
      { productName: 'Casein Protein', quantity: 1, price: 52.99 },
      { productName: 'Pre-Workout Formula', quantity: 1, price: 39.99 },
      { productName: 'BCAA Recovery Formula', quantity: 1, price: 59.99 }
    ]
  },
  {
    id: 'ORD-004',
    customerName: 'Samantha Williams',
    email: 'sam.w@example.com',
    date: '2023-05-22',
    total: 34.99,
    status: 'pending',
    items: [
      { productName: 'BCAA Recovery Formula', quantity: 1, price: 34.99 }
    ]
  },
  {
    id: 'ORD-005',
    customerName: 'Michael Brown',
    email: 'michael.b@example.com',
    date: '2023-05-25',
    total: 109.98,
    status: 'delivered',
    items: [
      { productName: 'Premium Whey Protein', quantity: 2, price: 49.99 },
      { productName: 'Shaker Bottle', quantity: 1, price: 10.00 }
    ]
  }
];

const OrdersManagement: React.FC = () => {
  const [orders] = useState(mockOrders);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewOrder, setViewOrder] = useState<typeof mockOrders[0] | null>(null);
  
  const filteredOrders = orders.filter(order => 
    order.customerName.toLowerCase().includes(search.toLowerCase()) ||
    order.email.toLowerCase().includes(search.toLowerCase()) ||
    order.id.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Calendar size={16} className="text-blue-500" />;
      case 'processing':
        return <Package size={16} className="text-amber-500" />;
      case 'shipped':
        return <Truck size={16} className="text-violet-500" />;
      case 'delivered':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 flex items-center gap-1">
            <Calendar size={12} />
            Pending
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 flex items-center gap-1">
            <Package size={12} />
            Processing
          </Badge>
        );
      case 'shipped':
        return (
          <Badge variant="outline" className="border-violet-200 bg-violet-50 text-violet-700 flex items-center gap-1">
            <Truck size={12} />
            Shipped
          </Badge>
        );
      case 'delivered':
        return (
          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 flex items-center gap-1">
            <CheckCircle size={12} />
            Delivered
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
      </header>
      
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <div className="relative w-full sm:w-96">
          <Input
            type="text"
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <FilterIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <Button 
          variant="outline" 
          onClick={toggleSortOrder}
          className="self-start flex items-center"
        >
          {sortOrder === 'asc' ? (
            <>
              <ArrowUpAZ size={18} className="mr-2" />
              Oldest First
            </>
          ) : (
            <>
              <ArrowDownAZ size={18} className="mr-2" />
              Newest First
            </>
          )}
        </Button>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Order ID</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Customer</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Date</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Total</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
              <th className="py-3 px-4 text-right font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{order.id}</td>
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-gray-500 text-xs">{order.email}</p>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 font-medium">${order.total.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    {getStatusIcon(order.status)}
                    <span className="ml-2 capitalize">{order.status}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => setViewOrder(order)}
                  >
                    <EyeIcon size={16} />
                    <span className="sr-only">View Order</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredOrders.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No orders found matching your search.</p>
          </div>
        )}
      </div>
      
      {/* Order Details Dialog */}
      <Dialog open={!!viewOrder} onOpenChange={(open) => !open && setViewOrder(null)}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          
          {viewOrder && (
            <div className="py-4 divide-y">
              <div className="pb-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">{viewOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date(viewOrder.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{viewOrder.customerName}</p>
                  <p className="text-gray-500 text-sm">{viewOrder.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(viewOrder.status)}</div>
                </div>
              </div>
              
              <div className="py-4">
                <h3 className="font-medium mb-4">Order Items</h3>
                <div className="space-y-3">
                  {viewOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t mt-4 pt-4 flex justify-between">
                  <p className="font-bold text-lg">Total</p>
                  <p className="font-bold text-lg">${viewOrder.total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-4">Order Actions</h3>
                <div className="flex gap-2">
                  <Button variant="outline" className="w-full">
                    Mark as {
                      viewOrder.status === 'pending' ? 'Processing' :
                      viewOrder.status === 'processing' ? 'Shipped' :
                      viewOrder.status === 'shipped' ? 'Delivered' : 'Complete'
                    }
                  </Button>
                  <Button variant="outline" className="w-full">Print Invoice</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersManagement;
