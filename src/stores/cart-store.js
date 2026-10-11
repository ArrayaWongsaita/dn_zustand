import { create } from 'zustand'

export const useCartStore = create(() => ({
  items: [],
  // TODO 1: รับ product และเปลี่ยน items ผ่าน set ของ Zustand
  addItem: (_product) => {},
}))
