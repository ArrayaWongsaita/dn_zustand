import { create } from 'zustand'

// TODO 1: สร้าง items ของบทนี้: สมุด ×2 และปากกา ×1
// ใช้ array ว่างเป็นจุดเริ่มต้นเพื่อให้แอปเปิดได้
export const useCartStore = create(() => ({ items: [] }))
