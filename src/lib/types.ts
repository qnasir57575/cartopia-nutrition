
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
