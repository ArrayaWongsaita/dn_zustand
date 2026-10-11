import { create } from 'zustand'

export const useCartStore = create(() => ({
  items: [
    { id: 'notebook', name: 'สมุด', price: 50, quantity: 2 },
    { id: 'pen', name: 'ปากกา', price: 20, quantity: 1 },
  ],
}))
