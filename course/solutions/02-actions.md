# เฉลยบทที่ 2 — UI เรียก action

อ่าน [โจทย์และ checklist](../lessons/02-actions.md) และลองทำก่อนเปิดเฉลย

```js
export const useCartStore = create((set) => ({
  items: [],
  addItem: (product) => set((state) => ({
    items: [...state.items, { ...product, quantity: 1 }],
  })),
}))
```

set แบบฟังก์ชันอ่าน state ปัจจุบัน แล้วคืน items array ใหม่โดยคงรายการเดิมไว้และต่อท้ายรายการใหม่
product มี id/name/price แต่ quantity เป็นจำนวนที่เลือกในตะกร้า จึงเติม quantity: 1 ใน action
UI อ่าน `const { addItem } = useCartStore()` และปุ่มใช้ `onClick={() => addItem(product)}`
arrow function ทำให้ส่งสินค้าของปุ่มนั้นเมื่อคลิกจริง ไม่เรียก action ระหว่าง render

UI ส่งความตั้งใจและข้อมูลเข้า action ส่วน store รับผิดชอบการเปลี่ยนข้อมูล ทำให้กติกาไม่กระจายไปตาม component
array spread สร้าง array ใหม่ จึงไม่แก้ items เดิมด้วย push
ก่อนเพิ่มตะกร้าว่าง หลังเพิ่มสมุดมีสมุด ×1 เพิ่มปากกาต่อได้โดยสมุดยังอยู่
บทนี้ฝึกเฉพาะรหัสที่ยังไม่มี; เพิ่มซ้ำ ปรับจำนวนและลบจะฝึกบทถัดไป

ตรวจด้วย `npm run check` แล้วตอบ checklist ในโจทย์: action อยู่ใน store, UI เรียก action เท่านั้น, quantity เป็นข้อมูลของรายการในตะกร้า และอธิบายเหตุผลของ array ใหม่ได้

[เทียบ lab กับเฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/02-actions-lab...02-actions-solution)
