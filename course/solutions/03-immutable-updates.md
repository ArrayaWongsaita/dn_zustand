# เฉลยบทที่ 3 — copy ทุกชั้นที่เปลี่ยน

ลอง [โจทย์และ checklist](../lessons/03-immutable-updates.md) ก่อนอ่านคำตอบ

addItem แยกรหัสที่มีแล้วด้วย some ถ้าซ้ำใช้ map เปลี่ยน quantity ของรายการนั้น ถ้ายังไม่มีใช้คำตอบบทก่อนเพื่อต่อท้าย quantity: 1
increaseQuantity ใช้ map และ spread object เฉพาะรหัสที่ตรงกันเพื่อเพิ่มหนึ่ง

```js
increaseQuantity: (id) => set((state) => ({
  items: state.items.map((item) => item.id === id
    ? { ...item, quantity: item.quantity + 1 }
    : item),
})),
```

array ใหม่ทำให้ items เปลี่ยน ส่วน object ใหม่ทำให้ quantity เดิมไม่ถูกเขียนทับ
สมาชิกที่ไม่ได้เปลี่ยนแชร์ reference เดิมได้ เพราะเราไม่ได้แก้สมาชิกนั้น
`const next = [...items]; next[0].quantity++` จึงผิด: array ใหม่แต่ object ตัวแรกยังเป็นตัวเดิม
Tests เก็บทั้ง array และ object เดิมก่อนทุก action แล้วตรวจเนื้อหาหลัง action จึงจับกรณีนี้ได้

```js
decreaseQuantity: (id) => set((state) => ({
  items: state.items.map((item) => item.id === id
    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
    : item),
})),
removeItem: (id) => set((state) => ({
  items: state.items.filter((item) => item.id !== id),
})),
```

Math.max รักษาขั้นต่ำ 1 โดยไม่ลบรายการ ส่วน filter เก็บตัวที่รหัสต่างจากตัวที่ต้องลบ
จำนวนเป็นจำนวนเต็มเสมอเพราะเริ่มจากจำนวนเต็มและเพิ่ม/ลดทีละหนึ่งตาม UI
สมุด ×2 ปากกา ×1: เพิ่มซ้ำ/เพิ่มจำนวนสมุดได้ ×3 ลดสมุดได้ ×1 ลดปากกาคง ×1 ลบปากกาเหลือสมุด ×2 (แต่ละตัวอย่างเริ่มใหม่)

`npm run check` ต้องผ่านทุกชุด แล้วตอบเหตุผลใน checklist: รหัสเดิมมีหนึ่งแถว, ลดกับลบแยกกันตามกติกา, array/object ที่เปลี่ยนมีสำเนาใหม่ และอธิบาย map/filter ได้
[เทียบ lab/เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/03-immutable-updates-lab...03-immutable-updates-solution)
