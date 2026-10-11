# บทที่ 1 — สร้าง store และอ่าน state

เวลา 35 นาที: อธิบาย 10 นาที → lab 20 นาที → ตรวจและเฉลย 5 นาที

## เป้าหมาย

สร้าง `useCartStore` ที่มี `items` และให้ component อ่านข้อมูลร่วมกันจาก store ได้
ก่อนเริ่มควรรู้ components, props, useState, array.map และ event handlers ไม่ต้องรู้ TypeScript
โค้ดตั้งต้นมีสินค้าสามชนิด UI และปุ่มที่ยังปิดใช้งาน แอปเปิดได้แต่ตะกร้ายังว่าง ไม่มี action เพิ่มสินค้าในบทนี้

## เริ่มเรียน

เตรียมเครื่องก่อนวันเรียนตาม [เครื่องมือร่วม](../TOOLING.md) ใช้ Node.js 22 LTS ตั้งแต่ 22.12

```bash
git switch -c my/01-basic-store origin/01-basic-store-lab
npm ci
npx playwright install chromium
npm run dev
```

ถ้า clone มีแต่ local branch ใช้ `01-basic-store-lab` แทน `origin/01-basic-store-lab`
ถ้ามี branch ส่วนตัวแล้วให้ใช้ `git switch my/01-basic-store` ไม่ใช้ `-c` ซ้ำ

## เนื้อหาสั้น

`useState` อยู่กับ component ส่วน store เป็นข้อมูลร่วมที่ component หลายตัวสมัครอ่านได้
Zustand `create` รับฟังก์ชันที่คืน state และสร้าง hook ให้ React ใช้ ข้อมูลที่ส่งเข้า store เป็น JavaScript ปกติ
ตัวอย่างคนละโจทย์กับ lab:

```js
import { create } from 'zustand'
const useMessageStore = create(() => ({ message: 'สวัสดี' }))
function Greeting() {
  const state = useMessageStore()
  return <p>{state.message}</p>
}
```

อย่าคัดลอกค่าไปเก็บ useState อีกชุด เพราะอาจไม่ตรงกับ store เมื่อข้อมูลเปลี่ยน
บทนี้อ่านทั้ง store ได้ บท selectors จะฝึกเลือกเฉพาะข้อมูลที่ใช้ภายหลัง

## โจทย์และจุดแก้

1. `src/stores/cart-store.js` TODO 1: ใส่ `items` เป็นสมุด ×2 และปากกา ×1
2. `src/App.jsx` TODO 2: อ่าน `items` จาก `useCartStore` แทน array ชั่วคราว

สินค้าคงที่อยู่ `src/data/products.js`: notebook/สมุด/50, pen/ปากกา/20, bag/กระเป๋า/200 บาท
รายการในตะกร้ามี `id`, `name`, `price`, `quantity` ชื่อตัวแปรและ store ใช้ตามโจทย์ ไม่เพิ่ม actions
ก่อนทำหน้าจอตะกร้าว่าง หลังทำหน้าจอมีสมุดราคา 50 บาท จำนวน 2 ชิ้น และปากการาคา 20 บาท จำนวน 1 ชิ้น
ข้อมูลตัวอย่างใน tests มีไว้ตรวจคำตอบ อย่าแก้ tests เพื่อให้ผ่าน

<details><summary>คำใบ้ระดับ 1 — แนวคิด</summary>
ตะกร้าว่างอาจเกิดจากข้อมูลใน store หรือ component ยังอ่าน array คนละชุด ตรวจทั้งสองจุดตามลำดับ
</details>
<details><summary>คำใบ้ระดับ 2 — ส่วนที่แก้</summary>
เปิด cart-store.js เติม array ที่แต่ละ object มี quantity จากนั้น import hook ใน App.jsx และเรียกใน CartItems
</details>
<details><summary>คำใบ้ระดับ 3 — โครงให้เติม</summary>

```js
// store: create(() => ({ items: [ /* เติมสองรายการ */ ] }))
// component: const state = /* เรียก hook */
// const items = /* อ่านข้อมูลจาก state */
```

</details>

ระหว่าง lab นาที 5 ถ้ายังไม่เห็นข้อมูลให้เปิดคำใบ้ 1; นาที 10 ตรวจไฟล์ตามคำใบ้ 2; นาที 15 ขอความช่วยเหลือพร้อมบอก “คาดว่าจะเกิดอะไร เกิดอะไรจริง และลองอะไรแล้ว” ผู้ฝึกเองใช้ลำดับเดียวกัน

## ตรวจงาน

```bash
npm run test:unit
npm run test:e2e
npm run check
```

ชื่อ `store exposes the lesson initial cart items` ตรวจข้อมูล public store
ชื่อ `screen displays the lesson cart items and quantities` ตรวจรายการ ราคา และจำนวนผ่านหน้าจอ
หาก expected มีสมุด ×2 แต่ received [] ให้ตรวจ TODO 1; ถ้า unit ผ่านแต่หน้าจอว่างให้ตรวจ TODO 2
ถ้ารัน browser ไม่ได้ให้ดู [ตัวอย่างปัญหาเครื่องมือ](../TOOLING.md) ก่อนแก้ state

- [ ] ทั้งสองชุด tests ผ่าน
- [ ] อ่านโค้ดแล้วอธิบายได้ว่า store กับ component เชื่อมกันตรงไหน
- [ ] ข้อมูลตะกร้ามีแหล่งจริงชุดเดียว ทำไมการคัดลอก items ไป useState อาจทำให้ข้อมูลไม่ตรงกัน?
- [ ] อธิบายได้ว่า `quantity` ต่างจากจำนวนรายการอย่างไร (สมุดสองเล่มยังเป็นหนึ่งรหัสสินค้า)

สำเร็จเมื่อ tests ผ่านและ checklist/คำถามเหตุผลครบ ถ้า tests ผ่านแต่ยังอธิบายไม่ได้ให้จดว่า “พฤติกรรมผ่านแล้ว แต่ยังต้องทบทวนแนวคิด”

## เก็บงาน กลับมาฝึก และย้ายบท

```bash
git add src
git commit -m "ฝึกบท 1: สร้าง store และอ่าน items"
```

หมดเวลาให้ commit แม้ยังไม่เสร็จ จด test/แนวคิดที่ติดในสมุดหรือไฟล์ NOTES.md แล้วเก็บไฟล์นั้นด้วย commit
กลับมาทำต่อใช้ `git switch my/01-basic-store` ลองแก้จุดที่ติดด้วยตัวเองและตรวจซ้ำ อ่านเฉลยอย่างเดียวไม่ถือว่าสำเร็จ
เมื่อบท 2 เปิดให้เรียน ให้ commit งานก่อนแล้วเริ่ม branch ใหม่จาก lab บทนั้นตามแผนการเรียน ไม่ต้องนำงานบทเดิมมารวมและไม่บังคับ push

## เทียบเฉลย

[ดู branch เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/tree/01-basic-store-solution)
และ [เปรียบเทียบ lab กับเฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/01-basic-store-lab...01-basic-store-solution)
คำอธิบายคำตอบอยู่ `course/solutions/01-basic-store.md` บน branch เฉลยเท่านั้น

ทดลองแก้เฉลยแยกจากงานตัวเองหลัง commit แล้ว:

```bash
git switch -c try/01-basic-store-solution origin/01-basic-store-solution
npm ci
npm run check
npm run dev
```

ครั้งต่อไปใช้ `git switch try/01-basic-store-solution` โดยไม่สร้างซ้ำ และกลับงานเดิมด้วย `git switch my/01-basic-store`
