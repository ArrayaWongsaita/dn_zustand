import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useCartStore = create(persist((set) => ({
  items: [],
  addItem: (product) => set((state) => {
    if (state.items.some((item) => item.id === product.id)) {
      return { items: state.items.map((item) => item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item) }
    }
    return { items: [...state.items, { ...product, quantity: 1 }] }
  }),
  increaseQuantity: (id) => set((state) => ({
    items: state.items.map((item) => item.id === id
      ? { ...item, quantity: item.quantity + 1 }
      : item),
  })),
  decreaseQuantity: (id) => set((state) => ({
    items: state.items.map((item) => item.id === id
      ? { ...item, quantity: Math.max(1, item.quantity - 1) }
      : item),
  })),
  clearCart: () => set({ items: [] }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),
 }), {
  name: 'zustand-course-cart',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({ items: state.items }),
}))
