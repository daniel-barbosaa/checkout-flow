import { create } from "zustand";
import { ProductsType } from "../types/products";

type CartItem = ProductsType & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
  total: number;
  addToCart: (product: ProductsType) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,

  addToCart: (product) => {
    const items = get().items;
    const existing = items.find((item) => item.id === product.id);

    let newItems;
    if (existing) {
      newItems = items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      newItems = [...items, { ...product, quantity: 1 }];
    }

    const newTotal = newItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    set({ items: newItems, total: newTotal });
  },

  removeFromCart: (id) => {
    const newItems = get().items.filter((item) => item.id !== id);
    const newTotal = newItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    set({ items: newItems, total: newTotal });
  },

  updateQuantity: (id, quantity) => {
    const newItems = get().items.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );
    const newTotal = newItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    set({ items: newItems, total: newTotal });
  },

  clearCart: () => set({ items: [], total: 0 }),
}));
