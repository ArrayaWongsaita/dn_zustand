# เฉลยบทที่ 8 — เก็บเฉพาะข้อมูลที่ต้องอยู่ข้ามรีโหลด

ลอง [โจทย์และ checklist](../lessons/08-persist.md) ก่อนอ่านคำตอบ

```js
import { createJSONStorage, persist } from 'zustand/middleware'
// ครอบ state creator เดิมโดยรักษาทุก action และ items: []
create(persist((set) => ({ /* items และ actions เดิม */ }), {
  name: 'zustand-course-cart',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({ items: state.items }),
}))
```

name ตรงกับ key ที่ใช้เก็บตะกร้าคอร์ส storage แปลงข้อมูลเป็น JSON ใน browser localStorage
partialize เลือกเฉพาะitems ไม่เก็บaction,query,จำนวนรายการ,จำนวนชิ้นรวม หรือยอดรวม
actions สร้างจากโค้ดทุกครั้งและ persist นำข้อมูลที่อ่านได้มารวมกับ state จึงยังเพิ่ม/ลด/ลบ/ล้างต่อได้หลังรีโหลด
ยอดคำนวณจาก items ที่กู้คืนโดย selectors เดิม ไม่ต้องมีสำเนาใน storage

initial items ว่างเมื่อไม่มีข้อมูลบันทึก ไม่มีชุดฝึกสมุด/ปากกากลับมาเอง
เพิ่มกระเป๋าแล้วรีโหลดได้×1/200บาท; เพิ่มสมุดแล้วเพิ่มจำนวนก่อนรีโหลดได้×2/100บาท
clearCart ผ่าน set แบบเดิมจึงบันทึก items:[] กลับ storage การรีโหลดหลังล้างไม่คืนสินค้าเก่าและยังเพิ่มใหม่ได้
query อยู่ local state จึงเริ่มว่างทุกครั้งที่หน้าโหลดใหม่ แม้ตะกร้าบันทึกจะยังอยู่

Playwright เริ่ม browser context ใหม่แต่ละ test ทุกเส้นทางเปลี่ยนตะกร้า→รีโหลด→ตรวจใน test เดียว
เส้นทางล้างยืนยันว่าตะกร้าถูกบันทึกและกู้คืนจริงก่อนล้าง จึงไม่ผ่านโดยบังเอิญจากการเริ่มว่างทุกครั้ง
ชุดตรวจยังอ่าน payload ที่ key ตามสัญญาเพื่อยืนยัน state มีเฉพาะ items
Vitest รักษาการตรวจ state/actions เดิมโดยไม่ต้องมี browser storage ไม่เพิ่ม migration/ข้อมูลเสีย/หลายแท็บในขอบเขตนี้

`npm run check` ผ่านแล้วอ่าน wrapper/options ตาม checklist พร้อมอธิบายขอบเขตการเก็บข้อมูลและแหล่งสร้างactions/derivedvalues
[เทียบ lab/เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/08-persist-lab...08-persist-solution)
