# เฉลยบทที่ 5 — คำนวณจากข้อมูลจริง

ลอง [โจทย์และ checklist](https://github.com/ArrayaWongsaita/dn_zustand/blob/05-derived-state-lab/course/lessons/05-derived-state.md) ก่อนอ่านคำตอบ

```js
export const selectTotalQuantity = (state) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectCartTotal = (state) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
```

จำนวนชิ้นรวมบวก quantity ไม่ใช่จำนวนแถว ส่วนยอดรวมคูณราคาต่อชิ้นด้วย quantity ก่อนบวก
ทั้งสองสูตรเริ่ม reduce ที่ 0 จึงคืนตัวเลข 0 เมื่อตะกร้าว่าง

สมุด ×2 ปากกา ×1: จำนวนรายการ 2, จำนวนชิ้นรวม 3, ยอดรวม 50×2 +20×1 =120 บาท
เพิ่มกระเป๋า ×1: จำนวนรายการ 3, จำนวนชิ้นรวม 4, ยอดรวม 320 บาท
เพิ่มจำนวนสมุดอีกหนึ่ง: จำนวนชิ้นรวม 5, ยอดรวม 370 บาท ลบกระเป๋าแล้วเหลือ4ชิ้น/170บาท

CartSummary เรียก useCartStore กับ selector ตัวเลขแต่ละตัว React และ unit checks ใช้ public selectors ชุดเดียวกัน
ค่ามาจาก items ปัจจุบันเสมอ จึงไม่ต้อง set ยอดใหม่ใน addItem/increase/decrease/remove
ถ้าเก็บยอดซ้ำใน store จะต้องอัปเดตทุก action และอาจลืมบางเส้นทาง ทำให้ข้อมูลไม่ตรงกัน
ตะกร้าว่างใน unit tests เตรียมด้วย public setState เป็น fixture ของการตรวจ ไม่เพิ่ม clearCart ก่อนบทที่กำหนด

`npm run check` ต้องผ่านทุกชุด แล้วอ่าน store ยืนยันว่าไม่มีจำนวน/ยอดเก็บซ้ำ พร้อมอธิบายสามคำและ reduce ค่าเริ่ม0ตาม checklist
[เทียบ lab/เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/05-derived-state-lab...05-derived-state-solution)
