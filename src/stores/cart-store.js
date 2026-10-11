import { create } from 'zustand'

export const useCartStore = create((set) => ({
  items: [
    { id: 'notebook', name: 'สมุด', price: 50, quantity: 2 },
    { id: 'pen', name: 'ปากกา', price: 20, quantity: 1 },
  ],
  addItem: (product) => set((state) => {
    // TODO 1: รหัสซ้ำให้เพิ่ม quantity ในรายการเดิมแบบ immutable
    if (state.items.some((item) => item.id === product.id)) return {}
    return { items: [...state.items, { ...product, quantity: 1 }] }
  }),
  // TODO 2: เพิ่มจำนวนของรหัสที่รับมาโดยไม่แก้ object เดิม
  increaseQuantity: (_id) => {},
  // TODO 3: ลดจำนวนแต่หยุดที่ 1
  decreaseQuantity: (_id) => {},
  // TODO 4: ลบเฉพาะรหัสที่รับมา
  removeItem: (_id) => {},
}))
