# เฉลยกิจกรรมทบทวน — ข้อมูลเดิมต้องไม่เปลี่ยน

กลับไป [ชุดฝึก](https://github.com/ArrayaWongsaita/dn_zustand/blob/09-review-bug/course/lessons/09-review.md) และลองอธิบายอาการเองก่อนอ่าน

## สิ่งที่เปลี่ยนและเหตุผล

บั๊กอยู่ใน `increaseQuantity`: ระหว่าง map โค้ดเพิ่ม `item.quantity` ของ object เดิมแล้วคืน object นั้น แม้ map สร้าง array ใหม่ แต่ object ด้านในยังใช้ reference เดิม ข้อมูลตะกร้ารุ่นก่อนจึงถูกแก้ตามไปด้วย หน้าจออาจอัปเดตถูกเพราะได้ array ใหม่ การดูหน้าจออย่างเดียวจึงพลาดข้อผิดพลาดนี้

แก้โดยสร้าง object ใหม่เฉพาะสินค้าที่จำนวนเปลี่ยน:

```js
increaseQuantity: (id) => set((state) => ({
  items: state.items.map((item) => item.id === id
    ? { ...item, quantity: item.quantity + 1 }
    : item),
})),
```

`{ ...item, quantity: item.quantity + 1 }` สร้าง object ใหม่โดยอ่านค่าเดิม ไม่เขียนกลับ object เก่า รายการอื่นใช้ object เดิมต่อได้เพราะไม่ได้เปลี่ยน ค่าเดิมสมุด ×2 จึงยังเป็น ×2 ส่วนตะกร้าใหม่เป็น ×3 การเขียน `item.quantity += 1` แล้วค่อย spread ก็สายเกินไป เพราะข้อมูลเดิมถูกแก้ไปแล้ว การ copy array อย่างเดียว เช่น `[...state.items]` จึงไม่พอ

Vitest เก็บ reference ของ array และ objects ก่อนเรียก action พร้อม snapshot ค่าไว้ แล้วตรวจว่าค่าเหล่านั้นเหมือนเดิม นี่เป็นการตรวจสัญญาของ public state/actions ไม่จำเป็นต้องบังคับผู้เรียนใช้ map หรือรูปโค้ดเหมือนเฉลย ขอเพียงผลใหม่ถูกต้องและข้อมูลเดิมไม่เปลี่ยน

## คำตอบตัวอย่างและ checklist

- [ ] คำค้นอยู่ใน local state ของ ProductCatalog เพราะควบคุมเฉพาะสินค้าให้เลือกซื้อ ไม่ใช่ข้อมูลตะกร้า
- [ ] items/actions อยู่ใน store เพราะ Cart และปุ่มซื้อสินค้าต้องใช้ข้อมูลร่วมกัน
- [ ] จำนวนรายการ จำนวนชิ้นรวม และยอดรวมคำนวณจาก items ระหว่างอ่าน ไม่เก็บสำเนาค่าที่ต้องซิงก์เมื่อซื้อ/ลบ/เปลี่ยนจำนวน
- [ ] สมุด ×2 ปากกา ×1 มี 2 รหัส แต่ 3 ชิ้น เพิ่มสมุดอีกชิ้นยังมี 2 รายการ แต่เป็น 4 ชิ้น ยอดรวมจาก 120 เป็น 170 บาท
- [ ] อธิบายได้ว่า array ใหม่ที่อ้าง objects เดิมยังเปิดโอกาสให้ mutation เปลี่ยนข้อมูลเดิม
- [ ] Tests ทุกตัวผ่านพร้อมเหตุผลของตัวเองครบ ไม่แก้ assertions

## ทดลองเฉลยแยกจากงานตัวเอง

Commit งานเดิมและหยุด dev server ก่อนเปลี่ยน branch:

```sh
git switch -c try/09-review-solution origin/09-review-solution
npm ci
npm run check
npm run dev
```

ใช้ local branch ให้ตัด `origin/` ออก กลับไปงานของตัวเองด้วย `git switch my/09-review` หลัง commit งานทดลองและหยุด server แล้วติดตั้งตาม lockfile ใหม่ ถ้าจะกลับมาทดลองเฉลยเดิมใช้ `git switch try/09-review-solution` ไม่สร้างซ้ำ

ดู [diff ชุดฝึกกับเฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/09-review-bug...09-review-solution) การแก้จริงอยู่ที่ action และมีเอกสารเหตุผลเพิ่ม ไม่เพิ่ม clearCart/persist หรือฟีเจอร์ใหม่ ผู้ดูแลตรวจทั้งคู่และเก็บ commit ในรายงานกลาง เฉลยต้องไม่มี expected failures

หลังอ่าน ปิดเฉลยแล้วกลับไปลองแก้ใน branch ส่วนตัว อธิบาย local/store/derived state และ reference ก่อน/หลังอีกครั้ง ถ้ายังตอบไม่ได้ จดสิ่งที่ติดและฝึกจุดนั้นใหม่ การอ่านคำตอบอย่างเดียวยังไม่ครบเกณฑ์สำเร็จ
