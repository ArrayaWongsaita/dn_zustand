# เฉลยบทที่ 4 — ขอบเขต subscription

อ่าน [โจทย์และ checklist](https://github.com/ArrayaWongsaita/dn_zustand/blob/04-selectors-lab/course/lessons/04-selectors.md) และปรับโค้ดด้วยตัวเองก่อน

CartItems เลือก items: `useCartStore((state) => state.items)` เพราะต้องใช้รายการเพื่อแสดงชื่อ ราคา จำนวน
CartBadge เลือกตัวเลข: `useCartStore((state) => state.items.length)` แล้วแสดงจำนวนรายการ
AddProductButton เลือก `state.addItem` ส่วน CartItemActions เรียก hook แยกสามครั้งเพื่อเลือก `state.increaseQuantity`, `state.decreaseQuantity`, `state.removeItem`

```js
const increaseQuantity = useCartStore((state) => state.increaseQuantity)
const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
const removeItem = useCartStore((state) => state.removeItem)
```

selectors คืนเฉพาะค่าที่ต้องใช้ component ที่ใช้เฉพาะ actions จึงไม่สมัครอ่าน items โดยตรง
ยังอาจ render จาก parent หรือ props ได้ จึงไม่อ้างว่า selectors ป้องกัน render ทุกกรณี
ไม่รวมค่าหลายตัวเป็น object ใหม่จาก selector ในบทนี้ ใช้ค่า/ฟังก์ชันแต่ละตัวเพื่อให้ขอบเขตตรงไปตรงมา

ป้ายจำนวนรายการเลือกค่าคำนวณจาก items โดยไม่เก็บซ้ำใน store
store รักษาหนึ่งรายการต่อหนึ่งรหัสจึงใช้ length ได้ สมุด ×2 ปากกา ×1 เป็น2รายการแต่3ชิ้นรวม
เพิ่มสมุดซ้ำไม่เพิ่มจำนวนรายการ เพิ่มกระเป๋าจึงเป็น3รายการและลบปากกากลับเป็น2

ทั้ง lab และเฉลยผ่าน `npm run check` เหมือนกัน tests ยืนยันพฤติกรรม แต่ไม่ยืนยันการเลือก subscription
ต้องอ่านโค้ดตาม checklist และตอบได้ว่ารายการ/ป้าย/ปุ่มแต่ละตัวเลือกอะไรและเพราะอะไร จึงถือว่าบทนี้สำเร็จ
[เปรียบเทียบ lab/เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/04-selectors-lab...04-selectors-solution)
