
import { Product } from './types';

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Whey Protein",
    description: "Our premium whey protein powder is derived from grass-fed cows and provides 25g of high-quality protein per serving. Perfect for muscle recovery and growth.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "whey",
    featured: true,
    stock: 50,
    rating: 4.8,
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "John D.",
        rating: 5,
        comment: "Best protein I've ever tried. Mixes well and tastes great!",
        date: "2023-08-15"
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Sarah M.",
        rating: 4.5,
        comment: "Great results after just 2 weeks of use. Good mixability.",
        date: "2023-07-29"
      }
    ],
    nutritionalInfo: {
      servingSize: "30g",
      protein: "25g",
      carbs: "3g",
      fat: "1.5g",
      sugar: "1g",
      calories: "120",
      ingredients: ["Whey Protein Isolate", "Natural Flavors", "Stevia", "Sunflower Lecithin"]
    }
  },
  {
    id: "2",
    name: "Plant-Based Protein",
    description: "A complete plant-based protein blend made from pea, rice, and hemp proteins. Contains 24g of protein per serving with a complete amino acid profile.",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "plant",
    featured: true,
    stock: 35,
    rating: 4.6,
    reviews: [
      {
        id: "r3",
        userId: "u3",
        userName: "Alex T.",
        rating: 5,
        comment: "Finally a plant protein that doesn't taste like dirt. Love it!",
        date: "2023-08-10"
      }
    ],
    nutritionalInfo: {
      servingSize: "35g",
      protein: "24g",
      carbs: "5g",
      fat: "2g",
      sugar: "0g",
      calories: "135",
      ingredients: ["Pea Protein", "Brown Rice Protein", "Hemp Protein", "Natural Flavors", "Monk Fruit Extract"]
    }
  },
  {
    id: "3",
    name: "Casein Protein",
    description: "Slow-digesting casein protein ideal for overnight recovery. Provides a steady release of amino acids to feed your muscles for up to 8 hours.",
    price: 52.99,
    image: "https://images.unsplash.com/photo-1579722821273-0f6d7d3d7f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "casein",
    featured: false,
    stock: 25,
    rating: 4.7,
    reviews: [],
    nutritionalInfo: {
      servingSize: "32g",
      protein: "24g",
      carbs: "4g",
      fat: "1g",
      sugar: "1g",
      calories: "120",
      ingredients: ["Micellar Casein", "Natural Flavors", "Stevia", "Salt"]
    }
  },
  {
    id: "4",
    name: "Pre-Workout Formula",
    description: "Boost your energy and focus before workouts with our clinically dosed pre-workout. Contains caffeine, L-citrulline, and beta-alanine.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "performance",
    featured: false,
    stock: 40,
    rating: 4.5,
    reviews: [],
    nutritionalInfo: {
      servingSize: "10g",
      protein: "0g",
      carbs: "3g",
      fat: "0g",
      sugar: "0g",
      calories: "15",
      ingredients: ["L-Citrulline", "Beta-Alanine", "Caffeine", "Taurine", "Natural Flavors"]
    }
  },
  {
    id: "5",
    name: "Mass Gainer",
    description: "High-calorie formula designed to help you gain weight and muscle mass. Contains 50g of protein and 1250 calories per serving.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1586401549271-8fc7f59d7fa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "weight-gain",
    featured: false,
    stock: 20,
    rating: 4.3,
    reviews: [],
    nutritionalInfo: {
      servingSize: "334g",
      protein: "50g",
      carbs: "252g",
      fat: "10g",
      sugar: "30g",
      calories: "1250",
      ingredients: ["Whey Protein Concentrate", "Maltodextrin", "Medium Chain Triglycerides", "Vitamins and Minerals Blend", "Creatine Monohydrate"]
    }
  },
  {
    id: "6",
    name: "BCAA Recovery Formula",
    description: "Branched-chain amino acids (BCAAs) to support muscle recovery and reduce soreness. 2:1:1 ratio of leucine, isoleucine, and valine.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1579722819743-a85cb890adab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "recovery",
    featured: false,
    stock: 30,
    rating: 4.4,
    reviews: [],
    nutritionalInfo: {
      servingSize: "7g",
      protein: "0g",
      carbs: "0g",
      fat: "0g",
      sugar: "0g",
      calories: "5",
      ingredients: ["L-Leucine", "L-Isoleucine", "L-Valine", "Natural Flavors", "Citric Acid"]
    }
  }
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "whey", name: "Whey Protein" },
  { id: "plant", name: "Plant Protein" },
  { id: "casein", name: "Casein Protein" },
  { id: "performance", name: "Performance" },
  { id: "weight-gain", name: "Weight Gain" },
  { id: "recovery", name: "Recovery" }
];
