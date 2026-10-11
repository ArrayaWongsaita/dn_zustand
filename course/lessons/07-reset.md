# บทที่ 7 — ล้างเฉพาะตะกร้า

เวลา 35 นาที: เนื้อหา 10 นาที → lab 20 นาที → เฉลย 5 นาที

## เป้าหมายและพื้นฐาน

กำหนดขอบเขต reset ให้ชัดเจน: ล้างรายการในตะกร้า โดยยังใช้ actions ต่อได้และไม่เปลี่ยน local filter
ควรรู้ Zustand set, object merge, derived state และ local state จากบทก่อน
เริ่มจากเฉลยบทก่อน: สมุด ×2 ปากกา ×1 ค้นหาและทุก action เดิมทำงาน ปุ่มล้างตะกร้าเชื่อม action ไว้ให้ แต่ action ยังเป็นจุดเติม
เริ่ม lab นี้ได้แม้บทก่อนยังทำไม่ผ่าน

## เริ่มเรียน

เตรียมเครื่องตาม [เครื่องมือร่วม](../TOOLING.md) ก่อนวันเรียน commit งานเดิมและหยุด dev server ด้วย Ctrl+C ก่อนเปลี่ยน branch

```bash
git switch -c my/07-reset origin/07-reset-lab
npm ci
npm run dev
```

ถ้ามีแต่ local course branch ให้ตัด `origin/` ออก ถ้ามี branch ส่วนตัวแล้วใช้ `git switch my/07-reset` ไม่ใช้ `-c` ซ้ำ

## แนวคิดและตัวอย่างคนละโจทย์

reset ไม่จำเป็นต้องคืนทั้งระบบเป็นค่าเริ่มต้น ต้องถามว่าคำสั่งนี้ควรเปลี่ยนข้อมูลใดบ้าง
Zustand set รวม field ที่ส่งเข้ากับ state เดิมโดยปริยาย จึงอัปเดตเฉพาะ field ที่ต้องการได้
ตัวอย่างล้างข้อความแต่รักษาโหมด:

```js
const useMessageStore = create((set) => ({
  message: 'สวัสดี',
  mode: 'preview',
  clearMessage: () => set({ message: '' }),
}))
// mode และ clearMessage ยังอยู่
```

การแทนที่ state ทั้ง object อาจลบ actions ถ้าไม่ได้ส่งกลับครบ
อย่าคืนชุดข้อมูลฝึกในการล้างตะกร้า เพราะผู้ใช้ต้องการตะกร้าว่าง ส่วน helper resetStore ของ tests มีหน้าที่อื่นคือเริ่มข้อมูลตรวจใหม่

## โจทย์และจุดแก้

แก้ TODO `clearCart()` ใน `src/stores/cart-store.js` ให้ items เป็น array ว่าง ไม่แก้ component หรือ local state
ก่อนทำกดล้างแล้วยังมีสมุด ×2 ปากกา ×1 หลังทำต้องว่าง / 0 ชิ้น / 0 บาท
ทดลองค้น “กระเป๋า” → ล้าง → คำค้นยัง “กระเป๋า” → กดเพิ่มกระเป๋า → กระเป๋า ×1 / 200 บาท
จำนวนและยอดรวมคำนวณจาก items อยู่แล้ว ไม่ต้องเขียน reset ค่าเหล่านี้เพิ่ม
ไม่แก้ tests และอย่าใช้ clearCart แทน helper เริ่มต้น tests เพราะกำลังตรวจ action นี้อยู่

<details><summary>คำใบ้ระดับ 1 — ขอบเขต</summary>
ล้างตะกร้าควรเปลี่ยนรายการที่เลือกเท่านั้น คำค้นเป็นของ ProductCatalog และ actions ต้องยังเรียกได้
</details>
<details><summary>คำใบ้ระดับ 2 — ตำแหน่งและลำดับ</summary>
ภายใน clearCart เรียก set เฉพาะ field items ไม่ตั้งกลับ initialState และไม่ใช้ replace ทั้ง store
</details>
<details><summary>คำใบ้ระดับ 3 — โครงให้เติม</summary>

```js
// clearCart: () => set({ /* field ที่จะล้าง */: /* array ว่าง */ })
```

</details>

นาที 5 เปิดคำใบ้ 1 ถ้าล้างแล้วยังมีรายการ; นาที 10 ตรวจว่า set เปลี่ยนเฉพาะ field ที่จำเป็น; นาที 15 ขอความช่วยเหลือพร้อม “คาดว่าจะเกิดอะไร เกิดอะไรจริง และลองอะไรแล้ว” ผู้ฝึกเองใช้ลำดับเดียวกัน

## ตรวจงานและคำถามเหตุผล

```bash
npm run test:unit
npm run test:e2e
npm run check
```

`clearing the cart empties items and keeps actions usable for adding again` ตรวจล้างและเพิ่มใหม่
`clearing the cart preserves the product filter and allows adding again` ตรวจหน้าจอว่าง ยอดศูนย์ คำค้นเดิม และเพิ่มใหม่ได้
ถ้า expected [] แต่ received ชุดฝึก ให้ตรวจว่าคืน initial state แทนการล้างหรือไม่; ถ้าพบ addItem is not a function ให้ตรวจการ replace store ที่ทำ actions หาย
ถ้า browser เปิดไม่ได้ให้ดูตัวอย่างปัญหาเครื่องมือใน TOOLING ก่อนแก้ reset

- [ ] tests ทั้งหมดผ่าน รวมพฤติกรรมเดิม
- [ ] clearCart เปลี่ยนเฉพาะ items ไม่คืนชุดฝึก เพราะเหตุใดการล้างกับการเตรียมข้อมูล tests จึงต่างกัน?
- [ ] actions ยังใช้หลังล้างได้ ทำไม set แบบ merge field จึงเหมาะกว่าการแทน state ทั้ง object ในกรณีนี้?
- [ ] query อยู่ local state และไม่ถูก reset ทำไมขอบเขตคำสั่งล้างจึงไม่ครอบคลุมคำค้น?
- [ ] ไม่มีการ reset จำนวน/ยอดรวมซ้ำ เพราะเหตุใด derived values จึงเป็นศูนย์ได้เอง?

สำเร็จเมื่อ tests ผ่านและ checklist/คำถามเหตุผลครบ ถ้า tests ผ่านแต่ยังตอบไม่ได้ให้จด “พฤติกรรมผ่านแล้ว แต่ยังต้องทบทวนแนวคิด”

## เก็บงาน กลับมา และย้ายบท

หยุด dev server ก่อนสลับ branch แล้ว commit งานแม้ยังไม่เสร็จ:

```bash
git add src
git commit -m "ฝึกบท 7: ล้างเฉพาะตะกร้า"
```

จดขอบเขต reset/แนวคิดที่ติดใน NOTES.md หรือสมุด (ถ้าเป็นไฟล์ให้ commit ด้วย)
กลับมาทำต่อใช้ `git switch my/07-reset` แล้ว `npm ci` ลองแก้จุดที่ติดเองและตรวจซ้ำ อ่านเฉลยอย่างเดียวไม่ถือว่าสำเร็จ
ไปบทถัดไปให้ commit งานแล้วสร้าง branch ส่วนตัวใหม่จาก lab ตามแผนการเรียน ไม่ต้องรวมงานเก่าและไม่บังคับ push

## ดูและทดลองเฉลย

[branch เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/tree/07-reset-solution)
· [เปรียบเทียบ lab/เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/07-reset-lab...07-reset-solution)
คำอธิบาย `course/solutions/07-reset.md` มีเฉพาะ branch เฉลย
หลัง commit งานเดิมและหยุด dev server:

```bash
git switch -c try/07-reset-solution origin/07-reset-solution
npm ci
npm run check
npm run dev
```

ครั้งถัดไปใช้ `git switch try/07-reset-solution` กลับงานตัวเองใช้ `git switch my/07-reset` และติดตั้งใหม่
