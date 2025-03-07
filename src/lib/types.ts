
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  stock: number;
  rating: number;
  reviews: Review[];
  nutritionalInfo: NutritionalInfo;
}

export interface NutritionalInfo {
  servingSize: string;
  protein: string;
  carbs: string;
  fat: string;
  sugar: string;
  calories: string;
  ingredients: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  type: 'credit_card' | 'paypal';
  lastFour?: string;
  expiryDate?: string;
}
