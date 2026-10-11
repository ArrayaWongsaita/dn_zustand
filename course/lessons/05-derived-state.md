# บทที่ 5 — จำนวนชิ้นรวมและยอดรวมจาก items

เวลา 35 นาที: เนื้อหา 10 นาที → lab 20 นาที → เฉลย 5 นาที

## เป้าหมายและพื้นฐาน

คำนวณข้อมูลที่ได้จาก state เดิม โดยไม่เก็บค่าซ้ำใน store
ควรรู้ selectors, immutable updates, array.reduce และการคูณราคา/จำนวน
เริ่มจากเฉลยบทก่อน: สมุด ×2 ปากกา ×1 ทุกปุ่มทำงาน ป้ายจำนวนรายการถูกต้อง เตรียม UI สรุปและ selectors ที่คืน 0 ไว้ให้เติม
เริ่ม lab นี้ได้แม้บทก่อนยังทำไม่ผ่าน

## เริ่มเรียน

เตรียมเครื่องตาม [เครื่องมือร่วม](../TOOLING.md) ก่อนวันเรียน commit งานเดิมและหยุด dev server ด้วย Ctrl+C ก่อนเปลี่ยน branch

```bash
git switch -c my/05-derived-state origin/05-derived-state-lab
npm ci
npm run dev
```

ถ้ามีแต่ local course branch ให้ตัด `origin/` ออก ถ้ามี branch ส่วนตัวแล้วใช้ `git switch my/05-derived-state` ไม่ใช้ `-c` ซ้ำ

## เนื้อหาและตัวอย่างคนละโจทย์

derived state เป็นข้อมูลที่คำนวณจาก state ที่มีอยู่ ถ้าเก็บค่าเดียวกันซ้ำหลายที่ ทุก action ต้องรักษาให้ตรงกัน จึงมีโอกาสลืมอัปเดต
ให้ selector คำนวณจาก items ปัจจุบันแล้วคืนตัวเลขโดยตรง ตัวอย่างจำนวนนาทีที่อ่านหนังสือ:

```js
const sessions = [{ minutes: 10 }, { minutes: 25 }]
const totalMinutes = sessions.reduce((sum, session) => sum + session.minutes, 0)
// 35 นาที; array ว่างได้ 0 เพราะมีค่าเริ่มต้น
```

แยกสามคำ: จำนวนรายการนับรหัสที่ต่างกัน จำนวนชิ้นรวมบวก quantity และยอดรวมบวก price × quantity
สมุดสองเล่มกับปากกาหนึ่งด้าม: 2 รายการ / 3 ชิ้นรวม / 120 บาท

## โจทย์และจุดแก้

แก้เฉพาะ `src/stores/cart-selectors.js` TODO 1–2:

1. `selectTotalQuantity(state)` คืนผลรวม quantity ของ state.items เป็นตัวเลข
2. `selectCartTotal(state)` คืนผลรวม price × quantity เป็นตัวเลข

React CartSummary เชื่อม selectors ให้แล้ว ไม่ต้องแก้ UI และไม่เพิ่ม field จำนวน/ยอดรวมใน store
เริ่มต้นสมุด ×2 ปากกา ×1: ก่อนทำแสดง 0 ชิ้น / 0 บาท หลังทำต้องเป็น 3 ชิ้น / 120 บาท
เพิ่มกระเป๋า 200 บาทต่อเนื่อง: 4 ชิ้น / 320 บาท เพิ่มจำนวนสมุดอีกหนึ่ง: 5 ชิ้น / 370 บาท
ตะกร้าว่างต้องได้ 0 ชิ้น / 0 บาท ชุดตรวจเตรียม fixture ว่างผ่าน public store API ให้แล้ว ยังไม่ต้องสร้าง clearCart (เรียนบท 7)
ไม่แก้ tests เพื่อให้ผ่าน

<details><summary>คำใบ้ระดับ 1 — แหล่งข้อมูล</summary>
ทั้งสองค่ามาจาก items ชุดเดียวกัน ต้องนับ quantity ไม่ใช่ length และยอดรวมต้องคูณจำนวนของแต่ละรายการ
</details>
<details><summary>คำใบ้ระดับ 2 — ตำแหน่งและลำดับ</summary>
ในแต่ละ selector ใช้ state.items.reduce เริ่ม accumulator เป็น 0 แล้วเลือกค่าที่จะบวกต่อรายการ อย่าเขียนค่ากลับลง store
</details>
<details><summary>คำใบ้ระดับ 3 — โครงให้เติม</summary>

```js
// (state) => state.items.reduce((sum, item) => sum + /* ค่าของรายการนี้ */, 0)
// quantity: บวกจำนวน; total: บวกราคาคูณจำนวน
```

</details>

นาที 5 เปิดคำใบ้ 1 ถ้ายังแยกจำนวนรายการ/ชิ้นไม่ออก; นาที 10 ตรวจสูตรและค่าเริ่ม reduce; นาที 15 ขอความช่วยเหลือพร้อม “คาดว่าจะเกิดอะไร เกิดอะไรจริง และลองอะไรแล้ว” ผู้ฝึกเองใช้ลำดับเดียวกัน

## ตรวจงานและคำถามเหตุผล

```bash
npm run test:unit
npm run test:e2e
npm run check
```

ชื่อ `total quantity sums pieces and updates after adding another product` ตรวจ 3→4 ชิ้น
ชื่อ `cart total sums price times quantity and updates after adding another product` ตรวจ 120→320 บาท
ชื่อ `an empty cart has zero total quantity and zero cart total` ตรวจข้อมูลว่าง
Browser ตรวจสรุปเปลี่ยนตามเพิ่มสินค้า/เพิ่มจำนวน/ลบ ใช้ selectors ชุดเดียวกับ public state tests
ถ้า expected 3 แต่ received 2 ให้ตรวจว่านับ length แทน quantity หรือไม่; ถ้า expected 120 แต่ได้ 70 ให้ตรวจการคูณ quantity
ถ้า browser เปิดไม่ได้ให้ดูตัวอย่างปัญหาเครื่องมือใน TOOLING ก่อนแก้สูตร

- [ ] tests ทั้งหมดผ่าน รวมพฤติกรรมบทก่อนหน้า
- [ ] ไม่เก็บจำนวนรายการ จำนวนชิ้นรวม หรือยอดรวมเพิ่มใน store ทำไมการเก็บซ้ำจึงทำให้ actions ดูแลยาก?
- [ ] selectors คำนวณจาก items ปัจจุบันและคืนตัวเลข ไม่มีการ set state ระหว่างคำนวณ
- [ ] อธิบาย 2 รายการ / 3 ชิ้น / 120 บาท และ 3 รายการ / 4 ชิ้น / 320 บาทได้
- [ ] อธิบายได้ว่าทำไม reduce ต้องมีค่าเริ่ม 0 เพื่อรองรับตะกร้าว่าง

สำเร็จเมื่อ tests ผ่านและ checklist/คำถามเหตุผลครบ ถ้า tests ผ่านแต่ยังตอบไม่ได้ให้จด “พฤติกรรมผ่านแล้ว แต่ยังต้องทบทวนแนวคิด”

## เก็บงาน กลับมา และย้ายบท

หยุด dev server ก่อนสลับ branch แล้ว commit งานแม้ยังไม่เสร็จ:

```bash
git add src
git commit -m "ฝึกบท 5: คำนวณจำนวนชิ้นและยอดรวม"
```

จดสูตร/แนวคิดที่ติดใน NOTES.md หรือสมุด (ถ้าเป็นไฟล์ให้ commit ด้วย)
กลับมาทำต่อใช้ `git switch my/05-derived-state` แล้ว `npm ci` ลองแก้จุดที่ติดเองและตรวจซ้ำ อ่านเฉลยอย่างเดียวไม่ถือว่าสำเร็จ
ไปบทถัดไปให้ commit งานแล้วสร้าง branch ส่วนตัวใหม่จาก lab ตามแผนการเรียน ไม่ต้องรวมงานเก่าและไม่บังคับ push

## ดูและทดลองเฉลย

[branch เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/tree/05-derived-state-solution)
· [เปรียบเทียบ lab/เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/05-derived-state-lab...05-derived-state-solution)
คำอธิบาย `course/solutions/05-derived-state.md` มีเฉพาะ branch เฉลย
หลัง commit งานเดิมและหยุด dev server:

```bash
git switch -c try/05-derived-state-solution origin/05-derived-state-solution
npm ci
npm run check
npm run dev
```

ครั้งถัดไปใช้ `git switch try/05-derived-state-solution` กลับงานตัวเองใช้ `git switch my/05-derived-state` และติดตั้งใหม่
