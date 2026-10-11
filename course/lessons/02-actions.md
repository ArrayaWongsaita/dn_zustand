# บทที่ 2 — เพิ่มสินค้าผ่าน action

เวลา 35 นาที: เนื้อหา 10 นาที → lab 20 นาที → เฉลย 5 นาที

## เป้าหมายและพื้นฐาน

แยกการเปลี่ยนข้อมูลไปไว้ใน `addItem(product)` และให้ event handler เรียก action
ควรรู้การอ่าน store จากบทแรก, object spread, array spread และ onClick
เริ่มจากเฉลยบทแรก แต่ตะกร้าบทนี้ว่างเพื่อฝึกเพิ่มสินค้าใหม่ UI/รายการสินค้าพร้อมใช้ ปุ่มเปิดให้กดแล้วแต่ยังไม่เปลี่ยนข้อมูล
เริ่มบทนี้ได้แม้บทแรกยังไม่ผ่าน โดยใช้ lab branch ที่เตรียมไว้

## เริ่มเรียน

ก่อนเปลี่ยน branch ให้ commit งานเดิม และหยุด dev server ด้วย Ctrl+C แล้วติดตั้งใหม่หลังเปลี่ยน branch
ดู [การเตรียมเครื่องและคำสั่งตรวจ](../TOOLING.md)

```bash
git switch -c my/02-actions origin/02-actions-lab
npm ci
npm run dev
```

ถ้ามีแต่ local course branch ให้ตัด `origin/` ออก ถ้าเคยสร้าง branch ส่วนตัวแล้วใช้ `git switch my/02-actions` โดยไม่ใช้ `-c` ซ้ำ

## แนวคิดพร้อมตัวอย่างคนละโจทย์

Zustand ส่ง `set` ให้ฟังก์ชันสร้าง store ส่วน action เป็นฟังก์ชันใน store ที่เรียก set เพื่อเปลี่ยนข้อมูล
component มีหน้าที่รับเหตุการณ์และส่งข้อมูลที่เกี่ยวข้องให้ action

```js
const useMessageStore = create((set) => ({
  message: 'สวัสดี',
  changeMessage: (message) => set({ message }),
}))
// component อ่าน changeMessage แล้วเรียก changeMessage('พร้อมเรียน') ใน event handler
```

ถ้าค่าใหม่ขึ้นกับข้อมูลเดิม ให้ส่งฟังก์ชันรับ state ปัจจุบันเข้า set
เมื่อเปลี่ยน items ให้สร้าง array ใหม่ด้วย spread แทน push บน array เดิม

## โจทย์และจุดแก้

- `src/stores/cart-store.js` TODO 1: เติม `addItem(product)` รับสินค้าที่มี id/name/price แล้วเพิ่มรายการใหม่ที่มี quantity เป็น 1 เข้า items
- `src/App.jsx` TODO 2: อ่าน action จาก store และให้ onClick ของสินค้านั้นเรียก action พร้อม product

ก่อนทำ: ตะกร้าว่าง กดเพิ่มสมุดแล้วยังว่าง หลังทำ: สมุด 50 บาท จำนวน 1 ชิ้น
ฝึกเพิ่มเฉพาะสินค้าที่ยังไม่มี เช่น สมุดแล้วปากกา กรณีเพิ่มรหัสซ้ำเป็นบทถัดไป ยังไม่ต้องออกแบบจำนวนหรือลบในบทนี้
อย่าเปลี่ยน state ตรงใน component และอย่าแก้ tests/fixture เพื่อให้ผ่าน

<details><summary>คำใบ้ระดับ 1 — พฤติกรรม</summary>
ถ้ากดแล้วไม่เปลี่ยน ตรวจสองเส้นทาง: ปุ่มเรียก action หรือยัง และ action เปลี่ยน items หรือยัง
</details>
<details><summary>คำใบ้ระดับ 2 — ตำแหน่งและลำดับ</summary>
ให้ create รับ set แล้ว addItem ใช้ state ปัจจุบันต่อท้ายรายการใหม่ ใน App อ่าน addItem และใช้ arrow function ใน onClick เพื่อส่ง product เมื่อกดจริง
</details>
<details><summary>คำใบ้ระดับ 3 — โครงให้เติม</summary>

```js
// addItem: (product) => set((state) => ({
//   items: [ ... /* array เดิม */, { ... /* ข้อมูลสินค้า */, quantity: /* จำนวนเริ่ม */ } ]
// }))
// onClick={() => /* เรียก action พร้อมสินค้า */}
```

</details>

นาที 5 เปิดคำใบ้ 1 ถ้ากดแล้วยังว่าง; นาที 10 ไล่ event → action → state ตามคำใบ้ 2; นาที 15 ขอความช่วยเหลือโดยบอก “คาดว่าจะเกิดอะไร เกิดอะไรจริง และลองอะไรแล้ว” ผู้ฝึกเองใช้ลำดับเดียวกัน

## ตรวจงานและเหตุผล

```bash
npm run test:unit
npm run test:e2e
npm run check
```

`adding a new product creates a cart item with quantity one` ตรวจ action ผ่าน public store
`adding a product from the catalog displays it in the cart` ตรวจการกดจริง
tests การอ่านข้อมูลและหน้าจอจากบทแรกยังต้องผ่าน โดยใช้ข้อมูลตั้งต้นว่างของบทนี้
ถ้า expected มีสมุด ×1 แต่ received [] ให้ตรวจ action; ถ้า unit ผ่านแต่ browser ไม่ผ่านให้ตรวจ onClick
ถ้า browser เปิดไม่ได้ให้ดูตัวอย่างปัญหาเครื่องมือใน TOOLING ก่อนแก้ logic

- [ ] tests ทั้งหมดผ่าน
- [ ] UI เรียก action ไม่เปลี่ยน state ด้วยตัวเอง เพราะเหตุใดจึงควรรวมกติกาการเปลี่ยนข้อมูลไว้ใน store?
- [ ] action เพิ่มข้อมูลสินค้าและ quantity เป็น 1; อธิบายได้ว่าทำไม quantity จึงเป็นส่วนของรายการในตะกร้า
- [ ] สร้าง array ใหม่ ทำไม push บน state เดิมอาจทำให้การสังเกตการเปลี่ยนข้อมูลมีปัญหา?

สำเร็จเมื่อ tests ผ่านและ checklist/คำถามเหตุผลครบ หาก tests ผ่านแต่ยังตอบไม่ได้ ให้ระบุ “พฤติกรรมผ่านแล้ว แต่ยังต้องทบทวนแนวคิด”

## เก็บงานและกลับมาฝึก

หยุด dev server ก่อนสลับ branch แล้วเก็บงานแม้ยังทำไม่เสร็จ:

```bash
git add src
git commit -m "ฝึกบท 2: เพิ่มสินค้าผ่าน action"
```

จด test/แนวคิดที่ติดใน NOTES.md หรือสมุด (ถ้าเป็นไฟล์ให้ commit ด้วย)
กลับมาทำต่อ: `git switch my/02-actions` แล้ว `npm ci` ลองทำจุดที่ติดเองและตรวจซ้ำ อ่านเฉลยอย่างเดียวไม่ถือว่าสำเร็จ
เมื่อย้ายบทให้ commit และสร้าง branch ส่วนตัวใหม่จาก lab บทถัดไปตามแผนการเรียน ไม่ต้องรวมงานเก่าและไม่บังคับ push

## ดูและทดลองเฉลย

[branch เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/tree/02-actions-solution)
· [เปรียบเทียบ lab/เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/02-actions-lab...02-actions-solution)
คำอธิบาย `course/solutions/02-actions.md` มีเฉพาะ branch เฉลย
หลัง commit งานเดิมและหยุด dev server:

```bash
git switch -c try/02-actions-solution origin/02-actions-solution
npm ci
npm run check
npm run dev
```

ครั้งถัดไปใช้ `git switch try/02-actions-solution` กลับงานตัวเองใช้ `git switch my/02-actions` และติดตั้งใหม่


## ไปบทถัดไปด้วย branch ใหม่

Commit งานแม้ยังไม่เสร็จและจดจุดที่ต้องกลับมาฝึก แล้วหยุด dev server ด้วย Ctrl+C ไม่ต้องนำงานบทก่อนมารวม จุดเริ่มต้นใหม่มีคำตอบบทก่อนพร้อมแล้ว:

```sh
git add src
git commit -m "เก็บงานก่อนย้ายบท"
git switch -c my/03-immutable-updates origin/03-immutable-updates-lab
npm ci
npm run dev
```

ถ้ามี NOTES.md ให้ add และ commit ไฟล์นั้นด้วย หากไม่มีการเปลี่ยนแปลงไม่ต้อง commit ซ้ำ ใช้ local branch ให้ตัด `origin/` ออก หาก branch ส่วนตัวของบทถัดไปมีอยู่แล้วใช้ `git switch my/03-immutable-updates` ไม่สร้างซ้ำ จากนั้นอ่าน [โจทย์บทถัดไป](https://github.com/ArrayaWongsaita/dn_zustand/blob/03-immutable-updates-lab/course/lessons/03-immutable-updates.md)
