# บทที่ 4 — เลือกอ่านเฉพาะสิ่งที่ใช้

เวลา 35 นาที: เนื้อหา 10 นาที → lab 20 นาที → เฉลย 5 นาที

## เป้าหมายและพื้นฐาน

ปรับการสมัครอ่าน store ของรายการตะกร้า ป้ายจำนวนรายการ และปุ่ม actions โดยพฤติกรรมเดิมยังถูกต้อง
ควรรู้ store/actions, immutable updates, arrow functions และการแยก component
จุดเริ่มต้นเป็นเฉลยบทก่อน: สมุด ×2 ปากกา ×1 ทุกปุ่มทำงานแล้ว เพิ่มป้ายจำนวนรายการที่ถูกต้องไว้ให้
**ข้อยกเว้นของบทนี้: lab ตั้งต้น tests ผ่านทั้งหมด** โจทย์คือปรับการอ่านทั้ง store เป็น selectors และอธิบายเหตุผลด้วย checklist ไม่ใช่แก้พฤติกรรมที่ผิด
เริ่ม lab นี้ได้แม้บทก่อนยังทำไม่ผ่าน

## เริ่มเรียน

ดู [การเตรียมเครื่อง](../TOOLING.md) ก่อนวันเรียน commit งานเดิมแล้วหยุด dev server ด้วย Ctrl+C ก่อนเปลี่ยน branch

```bash
git switch -c my/04-selectors origin/04-selectors-lab
npm ci
npm run check
npm run dev
```

มีแต่ local course branch ให้ตัด `origin/` ออก ถ้ามี branch ส่วนตัวแล้วใช้ `git switch my/04-selectors` ไม่ใช้ `-c` ซ้ำ

## เนื้อหาและตัวอย่างคนละโจทย์

`useCartStore()` อ่านทั้ง state object การเปลี่ยน field อื่นอาจทำให้ component ได้รับค่าที่เปลี่ยนทั้งที่ไม่ได้ใช้
selector คือฟังก์ชันที่รับ state แล้วคืนเฉพาะค่าที่ต้องการ ตัวอย่างข้อความ:

```js
const message = useMessageStore((state) => state.message)
const changeMessage = useMessageStore((state) => state.changeMessage)
```

ปุ่มที่ใช้เฉพาะ action เลือก action โดยตรง รายการเลือก items ส่วนป้ายเลือกตัวเลขที่แสดง
React ยังอาจ render จาก parent หรือ props ได้ selectors ไม่ได้สัญญาว่า component จะไม่มี render สาเหตุอื่น
ไม่ต้องสร้าง object ใหม่รวมหลายค่าใน selector ในบทนี้ เลือกแต่ละค่าแยกกัน

จำนวนรายการ = จำนวนรหัสสินค้าที่ต่างกัน ใน store ที่รักษาหนึ่งแถวต่อหนึ่งรหัสจึงนับได้ด้วย items.length
สมุดสองเล่มและปากกาหนึ่งด้ามมี **2 รายการ** แต่ **3 ชิ้นรวม** ไม่เก็บจำนวนรายการซ้ำใน store เพราะคำนวณจาก items ได้

## โจทย์และจุดแก้

แก้ TODO 1–4 ใน `src/App.jsx` เท่านั้น:

1. CartBadge เลือกอ่านเฉพาะจำนวนรายการที่ต้องแสดง
2. AddProductButton เลือกอ่านเฉพาะ addItem
3. CartItemActions เลือกอ่าน increaseQuantity, decreaseQuantity, removeItem ทีละ action
4. CartItems เลือกอ่านเฉพาะ items

ไม่เปลี่ยน store หรือพฤติกรรม ป้ายก่อนและหลังยังแสดง 2 รายการ เพิ่มสมุดซ้ำยัง 2 รายการ เพิ่มกระเป๋าจึงเป็น 3 รายการ ลบปากกากลับเป็น 2
โค้ดตั้งต้นอ่านทั้ง store ทุกจุด แต่ทำงานถูกอยู่แล้ว tests ไม่ได้ตรวจรูปโค้ดหรือจำนวน render

<details><summary>คำใบ้ระดับ 1 — ขอบเขตข้อมูล</summary>
ถามแต่ละ component ว่า “ใช้ค่าอะไรจริง?” ปุ่มต้องรู้ items หรือแค่เรียก action ก็พอ? ป้ายต้องรู้ object ทั้งตะกร้าหรือเฉพาะจำนวน?
</details>
<details><summary>คำใบ้ระดับ 2 — ตำแหน่งและลำดับ</summary>
แทนการ destructure จาก hook เปล่าด้วย hook ที่รับฟังก์ชันเลือกค่า เริ่มจากปุ่ม addItem แล้วรายการ items จากนั้นปุ่มปรับจำนวนและป้าย
</details>
<details><summary>คำใบ้ระดับ 3 — โครงให้เติม</summary>

```js
// const value = useCartStore((state) => /* field หรือค่าตัวเลขที่ component ใช้ */)
// เลือก action แต่ละตัวแยกกัน ไม่คืน object ใหม่รวมหลายค่า
```

</details>

นาที 5 ถ้ายังไม่รู้จะเลือกอะไร เปิดคำใบ้ 1; นาที 10 ไล่ component ตามคำใบ้ 2; นาที 15 ขอความช่วยเหลือโดยบอก “คาดว่าจะเกิดอะไร เกิดอะไรจริง และลองอะไรแล้ว” ผู้ฝึกเองใช้ลำดับเดียวกัน

## ตรวจงานและเหตุผล

```bash
npm run test:unit
npm run test:e2e
npm run check
```

`cart badge counts distinct product IDs rather than total quantity` ตรวจป้ายและการเพิ่มซ้ำ/เพิ่มรหัสใหม่/ลบ
tests เดิมยังตรวจการเพิ่ม ปรับจำนวน ลบ และ immutable updates
ถ้า expected 2 รายการ แต่ได้ 3 ชิ้น ให้ตรวจว่าคำนวณจำนวนรายการหรือ quantity
ถ้า browser เปิดไม่ได้ให้ดูตัวอย่างปัญหาเครื่องมือใน TOOLING ก่อนแก้ selector

- [ ] tests ทั้งหมดผ่าน (ยังไม่พอจะยืนยันว่า refactor selectors แล้ว)
- [ ] อ่านทุก TODO แล้วพบ selector ที่เลือกเฉพาะสิ่งที่ component ใช้ อธิบายได้ว่า selector รับและคืนอะไร
- [ ] ปุ่ม actions ไม่สมัครอ่าน items โดยไม่จำเป็น การเลือก action ช่วยจำกัด subscription อย่างไร?
- [ ] CartItems เลือก items และ CartBadge เลือกจำนวนรายการ ทำไมสอง component นี้จึงต้องการค่าคนละแบบ?
- [ ] ไม่มีจำนวนรายการเก็บซ้ำใน store ทำไมสมุด ×2 ปากกา ×1 จึงเป็น 2 รายการ?
- [ ] ไม่คืน object/array ใหม่จาก selector เพื่อรวมค่าหลายตัว และไม่เพิ่มเทคนิคเปรียบเทียบขั้นสูง

สำเร็จเมื่อ tests ผ่านและ checklist/คำถามเหตุผลครบ แม้ tests ผ่านตั้งแต่เริ่มแต่ยังไม่ปรับ selectors ให้จด “พฤติกรรมผ่านแล้ว แต่ยังต้องทบทวนแนวคิด”

## เก็บงาน กลับมา และย้ายบท

หยุด dev server ก่อนสลับ branch แล้ว commit งานแม้ยังไม่เสร็จ:

```bash
git add src
git commit -m "ฝึกบท 4: เลือกอ่านด้วย selectors"
```

จด component/แนวคิดที่ติดใน NOTES.md หรือสมุด (ถ้าเป็นไฟล์ให้ commit ด้วย)
กลับมาทำต่อใช้ `git switch my/04-selectors` แล้ว `npm ci` ลองแก้จุดที่ติดเองและตรวจซ้ำ อ่านเฉลยอย่างเดียวไม่ถือว่าสำเร็จ
ไปบทถัดไปให้ commit งานแล้วสร้าง branch ส่วนตัวใหม่จาก lab ตามแผนการเรียน ไม่ต้องรวมงานเก่าและไม่บังคับ push

## ดูและทดลองเฉลย

[branch เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/tree/04-selectors-solution)
· [เปรียบเทียบ lab/เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/04-selectors-lab...04-selectors-solution)
คำอธิบาย `course/solutions/04-selectors.md` มีเฉพาะ branch เฉลย
หลัง commit งานเดิมและหยุด dev server:

```bash
git switch -c try/04-selectors-solution origin/04-selectors-solution
npm ci
npm run check
npm run dev
```

ครั้งถัดไปใช้ `git switch try/04-selectors-solution` กลับงานตัวเองใช้ `git switch my/04-selectors` และติดตั้งใหม่


## ไปบทถัดไปด้วย branch ใหม่

Commit งานแม้ยังไม่เสร็จและจดจุดที่ต้องกลับมาฝึก แล้วหยุด dev server ด้วย Ctrl+C ไม่ต้องนำงานบทก่อนมารวม จุดเริ่มต้นใหม่มีคำตอบบทก่อนพร้อมแล้ว:

```sh
git add src
git commit -m "เก็บงานก่อนย้ายบท"
git switch -c my/05-derived-state origin/05-derived-state-lab
npm ci
npm run dev
```

ถ้ามี NOTES.md ให้ add และ commit ไฟล์นั้นด้วย หากไม่มีการเปลี่ยนแปลงไม่ต้อง commit ซ้ำ ใช้ local branch ให้ตัด `origin/` ออก หาก branch ส่วนตัวของบทถัดไปมีอยู่แล้วใช้ `git switch my/05-derived-state` ไม่สร้างซ้ำ จากนั้นอ่าน [โจทย์บทถัดไป](https://github.com/ArrayaWongsaita/dn_zustand/blob/05-derived-state-lab/course/lessons/05-derived-state.md)
