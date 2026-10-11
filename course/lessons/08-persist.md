# บทที่ 8 — เก็บตะกร้าข้ามการรีโหลด

เวลา 35 นาที: เนื้อหา 10 นาที → lab 20 นาที → เฉลย 5 นาที

## เป้าหมายและพื้นฐาน

ใช้ persist เก็บเฉพาะ items ใน localStorage และกู้คืนพร้อม actions ที่ใช้ต่อได้
ควรรู้ state/actions, immutable updates, selectors, local state และความต่างของ memory กับ browser storage
เริ่มจากเฉลยบทก่อน แต่เปลี่ยน initial items เป็นว่างเมื่อไม่มีข้อมูลบันทึก ทุกปุ่มเดิมทำงานแล้ว จุดเติมคือ persist wrapper/options เท่านั้น
เริ่ม lab นี้ได้แม้บทก่อนยังทำไม่ผ่าน

## เริ่มเรียน

เตรียมเครื่องตาม [เครื่องมือร่วม](../TOOLING.md) ก่อนวันเรียน commit งานเดิมและหยุด dev server ด้วย Ctrl+C ก่อนเปลี่ยน branch

```bash
git switch -c my/08-persist origin/08-persist-lab
npm ci
npm run dev
```

ถ้ามีแต่ local course branch ให้ตัด `origin/` ออก ถ้ามี branch ส่วนตัวแล้วใช้ `git switch my/08-persist` ไม่ใช้ `-c` ซ้ำ
localStorage แยกตาม origin และอยู่ข้ามการเปลี่ยน branch ของเว็บที่ใช้ URL เดิม หากต้องการเริ่มใหม่ให้ล้างข้อมูลเว็บไซต์ใน DevTools หรือเปิดหน้าต่างส่วนตัว
Tests ใช้ browser context ใหม่ทุก test จึงไม่ใช้ตะกร้าจากการทดลองด้วยมือ

## แนวคิดและตัวอย่างคนละโจทย์

state ใน memory เริ่มใหม่เมื่อรีโหลด persist บันทึกข้อมูลที่เลือกไว้และนำกลับมารวมกับ state/actions ที่สร้างจากโค้ด
ตัวอย่างเก็บโหมดหน้าจอแต่ไม่เก็บ action:

```js
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
const useDisplayStore = create(persist((set) => ({
  mode: 'preview',
  changeMode: (mode) => set({ mode }),
}), {
  name: 'display-example',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({ mode: state.mode }),
}))
```

name คือ key ใน storage createJSONStorage จัดการ JSON ส่วน partialize เลือกข้อมูลที่จะบันทึก
ไม่เก็บ actions หรือ derived values เพราะ actions สร้างจากโค้ดและยอดคำนวณจาก items ได้อยู่แล้ว
query ของ ProductCatalog ยังเป็น local state จึงกลับเป็นค่าว่างเมื่อรีโหลด

## โจทย์และจุดแก้

แก้ TODO ใน `src/stores/cart-store.js` โดย import middleware และครอบ state creator เดิมด้วย persist
ตั้ง name เป็น `zustand-course-cart`, ใช้ localStorage ผ่าน createJSONStorage, partialize คืนเฉพาะ items
รักษา initial items: [] และทุก action เดิม ไม่คืนข้อมูลฝึกหรือเปลี่ยน local query เป็น store state

ก่อนทำเพิ่มแล้วรีโหลดตะกร้าหาย หลังทำทดลองแยกเส้นทาง:

- ไม่มีข้อมูลบันทึก → ตะกร้าว่าง; เพิ่มกระเป๋า → รีโหลด → กระเป๋า ×1 / 200 บาท
- เริ่มใหม่ เพิ่มสมุดแล้วเพิ่มจำนวน → รีโหลด → สมุด ×2 / 100 บาท แล้วลด/ลบยังทำงาน
- มีตะกร้าบันทึกไว้ → ล้าง → รีโหลด → ยังว่าง / 0 ชิ้น / 0 บาท ไม่คืนสินค้าเก่า และเพิ่มใหม่ได้

ลองค้น “กระเป๋า” แล้วเพิ่มก่อนรีโหลด หลังรีโหลดคำค้นว่างและสินค้าครบ แต่ตะกร้าที่บันทึกยังอยู่
ไม่เพิ่ม migration, ข้อมูลเสียหรือหลายแท็บในบทนี้ อย่าแก้ tests เพื่อให้ผ่าน

<details><summary>คำใบ้ระดับ 1 — อะไรควรอยู่ข้ามรีโหลด</summary>
เก็บรายการที่เลือกแล้วเท่านั้น ไม่จำเป็นต้องเก็บฟังก์ชันหรือยอดคำนวณ และการล้างต้องเขียนตะกร้าว่างกลับ storage ด้วย
</details>
<details><summary>คำใบ้ระดับ 2 — ตำแหน่งและลำดับ</summary>
import persist/createJSONStorage จาก zustand/middleware ครอบฟังก์ชันสร้าง store เดิม แล้วกำหนด name/storage/partialize โดยไม่เปลี่ยน actions
</details>
<details><summary>คำใบ้ระดับ 3 — โครงให้เติม</summary>

```js
// create(persist(/* state creator เดิม */, {
//   name: /* key ตามโจทย์ */,
//   storage: createJSONStorage(() => /* browser storage */),
//   partialize: (state) => ({ /* เก็บเฉพาะข้อมูลตะกร้า */ }),
// }))
```

</details>

นาที 5 เปิดคำใบ้ 1 ถ้ารีโหลดแล้วหาย; นาที 10 ตรวจ wrapper/key/partialize; นาที 15 ขอความช่วยเหลือพร้อม “คาดว่าจะเกิดอะไร เกิดอะไรจริง และลองอะไรแล้ว” ผู้ฝึกเองใช้ลำดับเดียวกัน

## ตรวจงานและคำถามเหตุผล

```bash
npm run test:unit
npm run test:e2e
npm run check
```

Vitest เดิมตรวจ public state/actions; browser ตรวจ persistence จริงในแต่ละ test เส้นทางเพิ่ม/ปรับจำนวน/ล้างและ payloadที่เก็บเฉพาะitems
เช่น `adjusted quantities survive reload and quantity actions remain usable` expected2แต่ไม่มีรายการหลังรีโหลด ให้ตรวจ persist/storage
ถ้าล้างแล้วสินค้ากลับมา ให้ตรวจว่าการล้างอัปเดต storage และ initial items ยังว่าง
Node ของ Vitest ไม่มี browser localStorage อาจมีข้อความ storage unavailable ระหว่างทดสอบ actions; อ่านผล assertion เป็นหลัก การบันทึกจริงตรวจด้วย Playwright
ถ้า browser เปิดไม่ได้ให้ดูตัวอย่างปัญหาเครื่องมือใน TOOLING ก่อนแก้ persist

- [ ] tests ทั้งหมดผ่าน รวมพฤติกรรมเดิม
- [ ] storage ใช้ key ตามโจทย์และเก็บเฉพาะ items ทำไม actions กับยอดรวมจึงไม่ควรบันทึก?
- [ ] ไม่มีข้อมูลบันทึกแล้วเริ่มว่าง มีข้อมูลแล้วคืนจำนวนถูกต้อง ทำไม initial state จึงไม่ควรเป็นชุดฝึกอีกต่อไป?
- [ ] เพิ่ม/ปรับจำนวน/ล้างแล้วรีโหลดถูกต้อง และ actionsยังใช้ต่อได้ การกู้ข้อมูลกับการสร้างฟังก์ชันมาจากไหน?
- [ ] query ยัง local และรีโหลดกลับว่าง ทำไมขอบเขต persistence ไม่ควรครอบคลุมคำค้น?

สำเร็จเมื่อ tests ผ่านและ checklist/คำถามเหตุผลครบ ถ้า tests ผ่านแต่ยังตอบไม่ได้ให้จด “พฤติกรรมผ่านแล้ว แต่ยังต้องทบทวนแนวคิด”

## เก็บงาน กลับมา และทบทวน

หยุด dev server ก่อนสลับ branch แล้ว commit งานแม้ยังไม่เสร็จ:

```bash
git add src
git commit -m "ฝึกบท 8: persist เฉพาะ items"
```

จดเส้นทางรีโหลด/แนวคิดที่ติดใน NOTES.md หรือสมุด (ถ้าเป็นไฟล์ให้ commit ด้วย)
กลับมาทำต่อใช้ `git switch my/08-persist` แล้ว `npm ci` ลองแก้จุดที่ติดเองและตรวจซ้ำ อ่านเฉลยอย่างเดียวไม่ถือว่าสำเร็จ
หลังบทนี้ทำกิจกรรมทบทวนตามแผนการเรียน โดย commit งานก่อนสร้าง branch ใหม่ ไม่ต้องรวมงานเก่าและไม่บังคับ push

## ดูและทดลองเฉลย

[branch เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/tree/08-persist-solution)
· [เปรียบเทียบ lab/เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/08-persist-lab...08-persist-solution)
คำอธิบาย `course/solutions/08-persist.md` มีเฉพาะ branch เฉลย
หลัง commit งานเดิมและหยุด dev server:

```bash
git switch -c try/08-persist-solution origin/08-persist-solution
npm ci
npm run check
npm run dev
```

ครั้งถัดไปใช้ `git switch try/08-persist-solution` กลับงานตัวเองใช้ `git switch my/08-persist` และติดตั้งใหม่
