import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail?: string;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  loadCart: () => Promise<void>;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = '@simpleshop_cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from AsyncStorage on app start
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setIsLoading(true);
      const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCart = async (updatedCart: CartItem[]) => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
      setCart(updatedCart);
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  };

  const addToCart = async (item: CartItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
      await saveCart(updatedCart);
    } else {
      await saveCart([...cart, item]);
    }
  };

  const removeFromCart = async (id: number) => {
    const updatedCart = cart.filter(item => item.id !== id);
    await saveCart(updatedCart);
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    await saveCart(updatedCart);
  };

  const clearCart = async () => {
    await saveCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
 