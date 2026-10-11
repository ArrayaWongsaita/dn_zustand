# บทที่ 3 — เพิ่มซ้ำ ปรับจำนวน และลบแบบ immutable

เวลา 35 นาที: เนื้อหา 10 นาที → lab 20 นาที → เฉลย 5 นาที

## เป้าหมายและพื้นฐาน

เปลี่ยน array และ object โดยไม่แก้ข้อมูลเดิม ฝึกกติกาสินค้ารหัสซ้ำ จำนวนขั้นต่ำ และปุ่มลบแยก
ควรรู้ store/actions จากสองบทแรก, object/array spread, map, filter และเงื่อนไข
เริ่มจากเฉลยบทก่อน แต่เปลี่ยนข้อมูลตั้งต้นเป็นสมุด ×2 กับปากกา ×1
เพิ่มสินค้าใหม่ได้แล้ว UI และ event handlers ปรับจำนวน/ลบเชื่อมพร้อมใช้ ยังต้องเติม logic สี่จุดใน store เท่านั้น
เริ่มจาก lab นี้ได้แม้บทก่อนยังทำไม่สำเร็จ

## เริ่มเรียน

เตรียมเครื่องตาม [เครื่องมือร่วม](../TOOLING.md) ก่อนวันเรียน
commit งานเดิมและหยุด dev server ด้วย Ctrl+C ก่อนเปลี่ยน branch

```bash
git switch -c my/03-immutable-updates origin/03-immutable-updates-lab
npm ci
npm run dev
```

ถ้ามีแต่ local course branch ให้ตัด `origin/` ออก ถ้ามี branch ส่วนตัวแล้วใช้ `git switch my/03-immutable-updates` ไม่ใช้ `-c` ซ้ำ

## แนวคิดและตัวอย่างคนละโจทย์

array ใหม่ยังอาจมี object เดิมอยู่ ถ้าจะเปลี่ยน object ใดต้องสร้าง object ใหม่ของตัวนั้นด้วย
map เปลี่ยนสมาชิกที่ตรงเงื่อนไข filter เลือกสมาชิกที่ต้องเก็บไว้ ตัวอย่างรายการงาน:

```js
const tasks = [{ id: 'read', done: false }, { id: 'rest', done: false }]
const completed = tasks.map((task) =>
  task.id === 'read' ? { ...task, done: true } : task,
)
const active = completed.filter((task) => !task.done)
// tasks เดิมยังมี done: false ทั้งสองตัว
```

`[...items]` แล้วเขียน `next[0].quantity++` ยังแก้ object เดิม เพราะคัดลอกเฉพาะ array ชั้นนอก
สัญญาของเราไม่แก้ array/object เดิม ใช้ set รับ state ปัจจุบันและคืน items ใหม่

## โจทย์และจุดแก้

แก้เฉพาะ `src/stores/cart-store.js` ตาม TODO 1–4:

1. addItem(product): ถ้ามีรหัสเดิมแล้ว เพิ่ม quantity ในรายการเดิมแทนการสร้างแถวซ้ำ คงพฤติกรรมเพิ่มสินค้าใหม่จากบทก่อน
2. increaseQuantity(id): เพิ่มจำนวนรายการนั้นหนึ่งชิ้น
3. decreaseQuantity(id): ลดหนึ่งชิ้นแต่หยุดที่ 1 ไม่ลบอัตโนมัติ
4. removeItem(id): ลบเฉพาะรหัสนั้น

แต่ละตัวอย่างเริ่มใหม่จากสมุด ×2 ปากกา ×1 (รีโหลดหน้าเพื่อเริ่มใหม่ในบทนี้):
เพิ่มสมุดซ้ำ → สมุด ×3; เพิ่มจำนวนสมุด → ×3; ลดสมุด → ×1; ลดปากกา → ยัง ×1; ลบปากกา → เหลือสมุด ×2
จำนวนเป็นจำนวนเต็มตั้งแต่ 1 ใช้ปุ่มลบแยก ไม่เพิ่มพฤติกรรมอื่นและไม่แก้ tests เพื่อให้ผ่าน

<details><summary>คำใบ้ระดับ 1 — สังเกตพฤติกรรม</summary>
รหัสเดียวควรมีแถวเดียว ดูว่าผลลัพธ์ถูกและข้อมูลก่อนอัปเดตยังเหมือนเดิมหรือไม่ การคัดลอก array อย่างเดียวอาจยัง mutation object
</details>
<details><summary>คำใบ้ระดับ 2 — ตำแหน่งและลำดับ</summary>
แยกกรณีพบรหัสเดิมใน addItem ใช้ map เลือกรหัสที่จะเปลี่ยนและ spread object นั้น ส่วนลบใช้ filter เลือกตัวที่ต้องเก็บไว้ ลดจำนวนให้ตรวจขั้นต่ำก่อนคืนค่า
</details>
<details><summary>คำใบ้ระดับ 3 — โครงให้เติม</summary>

```js
// set((state) => ({ items: state.items.map((item) =>
//   item.id === id ? { ...item, quantity: /* จำนวนใหม่ตามกติกา */ } : item
// ) }))
// remove: state.items.filter((item) => /* เงื่อนไขตัวที่ต้องเก็บ */)
```

</details>

นาที 5 เปิดคำใบ้ 1 ถ้าแถวซ้ำ/จำนวนไม่เปลี่ยน; นาที 10 ไล่ id → map/filter → object ใหม่; นาที 15 ขอความช่วยเหลือโดยบอก “คาดว่าจะเกิดอะไร เกิดอะไรจริง และลองอะไรแล้ว” ผู้ฝึกเองเปิดตามลำดับเดียวกัน

## ตรวจงานและคำถามเหตุผล

```bash
npm run test:unit
npm run test:e2e
npm run check
```

ชื่อ test บอก action ที่ผิดและการรักษาข้อมูลเดิม เช่น `increasing quantity preserves the previous cart and its item objects`
อ่าน expected/received: expected quantity 3 แต่ได้ 2 ให้ตรวจรหัส/สูตรเพิ่ม; ถ้าผลใหม่ถูกแต่ snapshot เดิมเปลี่ยน ให้ตรวจการแก้ object เดิม
Browser ตรวจปุ่มเพิ่ม/ลดถึง 1 และลบ ไม่ตรวจ logic ซ้ำทุกกรณีที่ unit ตรวจแล้ว
ถ้า browser เปิดไม่ได้ให้ดูตัวอย่างปัญหาเครื่องมือใน TOOLING ก่อนแก้ state

- [ ] tests ทั้งหมดผ่าน รวม tests บทก่อนหน้า
- [ ] เพิ่มซ้ำยังเป็นแถวเดียว จำนวนรายการกับจำนวนชิ้นรวมต่างกันอย่างไร?
- [ ] ลดหยุดที่ 1 และมีปุ่มลบแยก เพราะเหตุใดลดแล้วไม่ควรลบตามกติกานี้?
- [ ] ไม่มี push/splice หรือการเขียน quantity บน object เดิม ทำไม `[...items]` แล้วแก้สมาชิกยังผิดได้?
- [ ] อธิบายได้ว่า map และ filter สร้างผลลัพธ์ใหม่อย่างไร และ object ใดต้อง copy เพิ่ม

สำเร็จเมื่อ tests ผ่านและ checklist/คำถามเหตุผลครบ ถ้า tests ผ่านแต่ยังตอบไม่ได้ให้จด “พฤติกรรมผ่านแล้ว แต่ยังต้องทบทวนแนวคิด”

## เก็บงาน กลับมา และย้ายบท

หยุด dev server ก่อนสลับ branch แล้วเก็บงานแม้ยังทำไม่เสร็จ:

```bash
git add src
git commit -m "ฝึกบท 3: อัปเดตแบบ immutable"
```

จด test/แนวคิดที่ติดใน NOTES.md หรือสมุด (ถ้าเป็นไฟล์ให้ commit ด้วย)
กลับมาทำต่อ: `git switch my/03-immutable-updates` แล้ว `npm ci` ลองแก้จุดที่ติดเองและตรวจซ้ำ อ่านเฉลยอย่างเดียวไม่ถือว่าสำเร็จ
ไปบทถัดไปให้ commit งานและสร้าง branch ส่วนตัวใหม่จาก lab ตามแผนการเรียน ไม่ต้องรวมงานเก่าและไม่บังคับ push

## ดูและทดลองเฉลย

[branch เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/tree/03-immutable-updates-solution)
· [เปรียบเทียบ lab/เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/03-immutable-updates-lab...03-immutable-updates-solution)
คำอธิบาย `course/solutions/03-immutable-updates.md` มีเฉพาะ branch เฉลย
หลัง commit งานเดิมและหยุด dev server:

```bash
git switch -c try/03-immutable-updates-solution origin/03-immutable-updates-solution
npm ci
npm run check
npm run dev
```

ครั้งถัดไปใช้ `git switch try/03-immutable-updates-solution` กลับงานตัวเองใช้ `git switch my/03-immutable-updates` และติดตั้งใหม่


## ไปบทถัดไปด้วย branch ใหม่

Commit งานแม้ยังไม่เสร็จและจดจุดที่ต้องกลับมาฝึก แล้วหยุด dev server ด้วย Ctrl+C ไม่ต้องนำงานบทก่อนมารวม จุดเริ่มต้นใหม่มีคำตอบบทก่อนพร้อมแล้ว:

```sh
git add src
git commit -m "เก็บงานก่อนย้ายบท"
git switch -c my/04-selectors origin/04-selectors-lab
npm ci
npm run dev
```

ถ้ามี NOTES.md ให้ add และ commit ไฟล์นั้นด้วย หากไม่มีการเปลี่ยนแปลงไม่ต้อง commit ซ้ำ ใช้ local branch ให้ตัด `origin/` ออก หาก branch ส่วนตัวของบทถัดไปมีอยู่แล้วใช้ `git switch my/04-selectors` ไม่สร้างซ้ำ จากนั้นอ่าน [โจทย์บทถัดไป](https://github.com/ArrayaWongsaita/dn_zustand/blob/04-selectors-lab/course/lessons/04-selectors.md)
