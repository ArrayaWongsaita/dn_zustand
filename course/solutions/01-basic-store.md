# เฉลยบทที่ 1 — แหล่งข้อมูลร่วม

อ่าน [โจทย์และ checklist](https://github.com/ArrayaWongsaita/dn_zustand/blob/01-basic-store-lab/course/lessons/01-basic-store.md) และลองทำเองก่อน

`src/stores/cart-store.js` เรียก `create` แล้วคืน object ที่มี items สมุด ×2 และปากกา ×1 แต่ละรายการมีข้อมูลสินค้าและ quantity
`src/App.jsx` import useCartStore แล้วเรียก hook ภายใน CartItems: `const { items } = useCartStore()`
หน้าจอ map จาก items จริง จึงไม่ต้องคัดลอกไป useState และไม่ใส่ array ข้อมูลซ้ำใน component

```js
export const useCartStore = create(() => ({
  items: [
    { id: 'notebook', name: 'สมุด', price: 50, quantity: 2 },
    { id: 'pen', name: 'ปากกา', price: 20, quantity: 1 },
  ],
}))
```

สมุดสองเล่มกับปากกาหนึ่งด้ามมีจำนวนรายการ 2 แต่จำนวนชิ้นรวม 3 สังเกตว่า quantity อยู่กับรายการแต่ละรหัส
ตอนนี้ปุ่มเพิ่มยังไม่ทำงานเพราะเป้าหมายคืออ่าน state; การเปลี่ยน state ผ่าน action เป็นเนื้อหาบทถัดไป
อ่านทั้ง store เป็นคำตอบที่ถูกต้องของบทนี้ แล้วจึงฝึก selectors ในบทที่กำหนด

`npm run check` ต้องผ่านทั้ง store และหน้าจอ อ่านโค้ดพร้อมตอบได้ว่า source ของ items คือ store และ hook ทำให้ React สมัครรับข้อมูล
เกณฑ์ checklist: มี items ใน store จริง ไม่มีสำเนาใน local state อธิบายการเชื่อม hook ได้ และแยกจำนวนรายการ/quantity ได้

[เปรียบเทียบการเปลี่ยนแปลง](https://github.com/ArrayaWongsaita/dn_zustand/compare/01-basic-store-lab...01-basic-store-solution)
