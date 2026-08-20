"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { Product } from "@/lib/products";

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
}

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "Card" | "UPI";
  last4: string;
  name: string;
  expiry?: string;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  profile: {
    name: string;
    email: string;
    phone: string;
  };
}

type StoreAction =
  | { type: "ADD_TO_CART"; item: CartItem }
  | { type: "REMOVE_FROM_CART"; index: number }
  | { type: "UPDATE_QTY"; index: number; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_WISHLIST"; productId: string }
  | { type: "PLACE_ORDER"; order: Order }
  | { type: "ADD_ADDRESS"; address: Address }
  | { type: "UPDATE_ADDRESS"; address: Address }
  | { type: "DELETE_ADDRESS"; id: string }
  | { type: "ADD_PAYMENT"; payment: PaymentMethod }
  | { type: "DELETE_PAYMENT"; id: string }
  | { type: "UPDATE_PROFILE"; profile: Partial<StoreState["profile"]> }
  | { type: "HYDRATE"; state: StoreState };

const STORAGE_KEY = "mfashions-store";

const initialState: StoreState = {
  cart: [],
  wishlist: [],
  orders: [
    {
      id: "ORD-2024-0892",
      date: "2024-08-15",
      items: [
        {
          product: {
            id: "p6",
            name: "Leather Biker Jacket",
            category: "Jackets",
            price: 7999,
            rating: 4.9,
            reviews: 76,
            image:
              "https://images.pexels.com/photos/18326063/pexels-photo-18326063.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
            images: [],
            colors: [],
            sizes: [],
            description: "",
          },
          size: "L",
          color: "Black",
          quantity: 1,
        },
      ],
      total: 7999,
      status: "Delivered",
    },
    {
      id: "ORD-2024-0915",
      date: "2024-09-02",
      items: [
        {
          product: {
            id: "p2",
            name: "Urban Hoodie — Olive",
            category: "Hoodies",
            price: 2499,
            rating: 4.8,
            reviews: 156,
            image:
              "https://images.pexels.com/photos/18078030/pexels-photo-18078030.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
            images: [],
            colors: [],
            sizes: [],
            description: "",
          },
          size: "M",
          color: "Olive",
          quantity: 2,
        },
      ],
      total: 4998,
      status: "Shipped",
    },
    {
      id: "ORD-2024-0934",
      date: "2024-09-10",
      items: [
        {
          product: {
            id: "p7",
            name: "Oversized Drop-Shoulder Tee",
            category: "Oversized Tees",
            price: 1599,
            rating: 4.6,
            reviews: 167,
            image:
              "https://images.pexels.com/photos/32490938/pexels-photo-32490938.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
            images: [],
            colors: [],
            sizes: [],
            description: "",
          },
          size: "L",
          color: "Cream",
          quantity: 1,
        },
      ],
      total: 1599,
      status: "Processing",
    },
  ],
  addresses: [
    {
      id: "addr-1",
      label: "Home",
      name: "Musammil Mussu",
      phone: "+91 98765 43210",
      line1: "42, MG Road, Indiranagar",
      line2: "2nd Floor, Above Cafe",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      isDefault: true,
    },
  ],
  paymentMethods: [
    {
      id: "pm-1",
      type: "Card",
      last4: "4242",
      name: "Musammil Mussu",
      expiry: "08/27",
    },
  ],
  profile: {
    name: "Musammil Mussu",
    email: "Musammil.Mussu@example.com",
    phone: "+91 98765 43210",
  },
};

function reducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.findIndex(
        (c) =>
          c.product.id === action.item.product.id &&
          c.size === action.item.size &&
          c.color === action.item.color,
      );
      if (existing >= 0) {
        const cart = [...state.cart];
        cart[existing] = {
          ...cart[existing],
          quantity: cart[existing].quantity + action.item.quantity,
        };
        return { ...state, cart };
      }
      return { ...state, cart: [...state.cart, action.item] };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((_, i) => i !== action.index),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        cart: state.cart.map((item, i) =>
          i === action.index
            ? { ...item, quantity: Math.max(1, action.quantity) }
            : item,
        ),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "TOGGLE_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.includes(action.productId)
          ? state.wishlist.filter((id) => id !== action.productId)
          : [...state.wishlist, action.productId],
      };
    case "PLACE_ORDER":
      return { ...state, orders: [action.order, ...state.orders], cart: [] };
    case "ADD_ADDRESS":
      return { ...state, addresses: [...state.addresses, action.address] };
    case "UPDATE_ADDRESS":
      return {
        ...state,
        addresses: state.addresses.map((a) =>
          a.id === action.address.id ? action.address : a,
        ),
      };
    case "DELETE_ADDRESS":
      return {
        ...state,
        addresses: state.addresses.filter((a) => a.id !== action.id),
      };
    case "ADD_PAYMENT":
      return {
        ...state,
        paymentMethods: [...state.paymentMethods, action.payment],
      };
    case "DELETE_PAYMENT":
      return {
        ...state,
        paymentMethods: state.paymentMethods.filter((p) => p.id !== action.id),
      };
    case "UPDATE_PROFILE":
      return { ...state, profile: { ...state.profile, ...action.profile } };
    case "HYDRATE":
      return action.state;
    default:
      return state;
  }
}

interface StoreContextValue extends StoreState {
  addToCart: (
    product: Product,
    size: string,
    color: string,
    qty?: number,
  ) => void;
  removeFromCart: (index: number) => void;
  updateQty: (index: number, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  placeOrder: () => void;
  updateProfile: (profile: Partial<StoreState["profile"]>) => void;
  addAddress: (address: Address) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  addPayment: (payment: PaymentMethod) => void;
  deletePayment: (id: string) => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: "HYDRATE", state: { ...initialState, ...parsed } });
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, hydrated]);

  const addToCart = useCallback(
    (product: Product, size: string, color: string, qty = 1) => {
      dispatch({
        type: "ADD_TO_CART",
        item: { product, size, color, quantity: qty },
      });
      setCartOpen(true);
    },
    [],
  );

  const removeFromCart = useCallback((index: number) => {
    dispatch({ type: "REMOVE_FROM_CART", index });
  }, []);

  const updateQty = useCallback((index: number, qty: number) => {
    dispatch({ type: "UPDATE_QTY", index, quantity: qty });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  const toggleWishlist = useCallback((productId: string) => {
    dispatch({ type: "TOGGLE_WISHLIST", productId });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => state.wishlist.includes(productId),
    [state.wishlist],
  );

  const placeOrder = useCallback(() => {
    if (state.cart.length === 0) return;
    const total = state.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const order: Order = {
      id: `ORD-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000,
      )}`,
      date: new Date().toISOString().split("T")[0],
      items: [...state.cart],
      total,
      status: "Processing",
    };
    dispatch({ type: "PLACE_ORDER", order });
  }, [state.cart]);

  const updateProfile = useCallback(
    (profile: Partial<StoreState["profile"]>) => {
      dispatch({ type: "UPDATE_PROFILE", profile });
    },
    [],
  );

  const addAddress = useCallback((address: Address) => {
    dispatch({ type: "ADD_ADDRESS", address });
  }, []);

  const updateAddress = useCallback((address: Address) => {
    dispatch({ type: "UPDATE_ADDRESS", address });
  }, []);

  const deleteAddress = useCallback((id: string) => {
    dispatch({ type: "DELETE_ADDRESS", id });
  }, []);

  const addPayment = useCallback((payment: PaymentMethod) => {
    dispatch({ type: "ADD_PAYMENT", payment });
  }, []);

  const deletePayment = useCallback((id: string) => {
    dispatch({ type: "DELETE_PAYMENT", id });
  }, []);

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = state.cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const value: StoreContextValue = {
    ...state,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toggleWishlist,
    isInWishlist,
    placeOrder,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    addPayment,
    deletePayment,
    cartCount,
    cartTotal,
    isCartOpen,
    setCartOpen,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
