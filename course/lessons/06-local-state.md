# บทที่ 6 — กรองสินค้าด้วย local state

เวลา 35 นาที: เนื้อหา 10 นาที → lab 20 นาที → เฉลย 5 นาที

## เป้าหมายและพื้นฐาน

เลือกขอบเขต state ให้เหมาะกับผู้ใช้ข้อมูล ตัวกรองเป็นของ component รายการสินค้า ส่วนตะกร้าเป็นข้อมูลร่วมใน store
ควรรู้ useState, controlled input, array.filter, string.includes และ selectors จากบทก่อน
เริ่มจากเฉลยบทก่อน: สมุด ×2 ปากกา ×1 ทุก action และยอดรวมถูกต้อง มีช่องค้นหาและ UI “ไม่พบสินค้า” เตรียมไว้ให้
เริ่ม lab นี้ได้แม้บทก่อนยังทำไม่ผ่าน

## เริ่มเรียน

เตรียมเครื่องตาม [เครื่องมือร่วม](../TOOLING.md) ก่อนวันเรียน commit งานเดิมและหยุด dev server ด้วย Ctrl+C ก่อนเปลี่ยน branch

```bash
git switch -c my/06-local-state origin/06-local-state-lab
npm ci
npm run dev
```

ถ้ามีแต่ local course branch ให้ตัด `origin/` ออก ถ้ามี branch ส่วนตัวแล้วใช้ `git switch my/06-local-state` ไม่ใช้ `-c` ซ้ำ

## แนวคิดและตัวอย่างคนละโจทย์

state ที่ใช้เฉพาะ UI ส่วนเดียวเก็บใน component ที่ต้องการ ไม่ต้องนำทุกค่าขึ้น store
ผลลัพธ์จากการกรองคำนวณตอน render ไม่จำเป็นต้องมี state อีกชุดหรือ useEffect ซิงก์ค่า
ตัวอย่างรายชื่อสี:

```js
const [query, setQuery] = useState('')
const colors = ['สีแดง', 'สีฟ้า', 'สีเขียว']
const visibleColors = colors.filter((color) => color.includes(query))
// ช่องกรอก value={query}, onChange={(event) => setQuery(event.target.value)}
```

includes ตรวจว่าคำค้นอยู่ภายในชื่อ ค่าว่างอยู่ในทุก string จึงแสดงทั้งหมด
การ filter คืน array ใหม่ ไม่แก้ products ต้นฉบับหรือ items ในตะกร้า

## โจทย์และจุดแก้

แก้ TODO 1–2 ใน ProductCatalog ที่ `src/App.jsx`:

1. เก็บคำค้นใน local useState เริ่มด้วยค่าว่าง แล้วเชื่อมค่าที่ผู้ใช้กรอกให้เปลี่ยน state
2. สร้าง visibleProducts ด้วยการเลือกสินค้าใน products ที่ชื่อมีคำค้นอยู่

Input และข้อความไม่พบเตรียมไว้แล้ว ไม่ต้องเปลี่ยน store, cart selectors หรือรายการในตะกร้า
ก่อนทำช่องกรอกยังไม่มี state จริงและแสดงสินค้าทั้งหมด หลังทำค้น “ปาก” เหลือปากกา ค้น “รองเท้า” แสดง “ไม่พบสินค้า” ล้างคำค้นแสดงครบสามชนิด
ตะกร้าทุกกรณียังเป็นสมุด ×2 ปากกา ×1 / 3 ชิ้น / 120 บาท ไม่ใช่เหลือเฉพาะปากกาตามตัวกรอง
อย่าแก้ tests เพื่อให้ผ่าน

<details><summary>คำใบ้ระดับ 1 — ขอบเขตข้อมูล</summary>
คำค้นควรเปลี่ยนเฉพาะสิ่งที่เลือกซื้อบนหน้าจอ ถ้าสมุดในตะกร้าหายเมื่อค้นปากกา แสดงว่าไปกรองผิดชุด
</details>
<details><summary>คำใบ้ระดับ 2 — ตำแหน่งและลำดับ</summary>
import useState แล้วแทน query/changeQuery ชั่วคราวด้วยคู่ state/setter ของ ProductCatalog จากนั้น filter products ด้วย name.includes(query)
</details>
<details><summary>คำใบ้ระดับ 3 — โครงให้เติม</summary>

```js
// const [query, changeQuery] = useState(/* ค่าเริ่มต้น */)
// const visibleProducts = products.filter((product) => /* ชื่อมีคำค้น */)
```

</details>

นาที 5 ถ้าพิมพ์แล้วค่าไม่เปลี่ยนเปิดคำใบ้ 1; นาที 10 ไล่ input → local state → visibleProducts; นาที 15 ขอความช่วยเหลือพร้อม “คาดว่าจะเกิดอะไร เกิดอะไรจริง และลองอะไรแล้ว” ผู้ฝึกเองใช้ลำดับเดียวกัน

## ตรวจงานและคำถามเหตุผล

```bash
npm run test:unit
npm run test:e2e
npm run check
```

Vitest เดิมยังต้องผ่านทั้งหมด Browser มีสองกรณีใหม่:
`searching a Thai substring filters products without changing the cart or totals`
และ `an unmatched search shows a message and clearing it restores all products`
ถ้า expected รายการสินค้า1 แต่ received3 ให้ตรวจ controlled state และ filter; ถ้าตะกร้าหายให้ตรวจว่าใช้ products แทน items หรือไม่
ถ้า browser เปิดไม่ได้ให้ดูตัวอย่างปัญหาเครื่องมือใน TOOLING ก่อนแก้ state

- [ ] tests ทั้งหมดผ่าน รวมพฤติกรรมเดิม
- [ ] query อยู่ใน local state ของ ProductCatalog ไม่เพิ่มใน store ทำไมส่วนอื่นไม่จำเป็นต้องสมัครอ่านคำค้นนี้?
- [ ] visibleProducts คำนวณจาก products ไม่แก้ products/items เดิม เหตุใดสินค้าที่เลือกซื้อกับตะกร้าจึงใช้ขอบเขตตัวกรองคนละแบบ?
- [ ] ไม่เก็บ visibleProducts เป็น state เพิ่ม และไม่ใช้ effect ซิงก์ ทำไมค่าที่คำนวณได้จึงไม่ควรมีสำเนาอีกชุด?
- [ ] อธิบายค่าว่าง/คำย่อย/ไม่พบได้ และยืนยันว่าตะกร้า/ยอดรวมยังเท่าเดิม

สำเร็จเมื่อ tests ผ่านและ checklist/คำถามเหตุผลครบ ถ้า tests ผ่านแต่ยังตอบไม่ได้ให้จด “พฤติกรรมผ่านแล้ว แต่ยังต้องทบทวนแนวคิด”

## เก็บงาน กลับมา และย้ายบท

หยุด dev server ก่อนสลับ branch แล้ว commit งานแม้ยังไม่เสร็จ:

```bash
git add src
git commit -m "ฝึกบท 6: กรองสินค้าด้วย local state"
```

จดส่วนของ state/แนวคิดที่ติดใน NOTES.md หรือสมุด (ถ้าเป็นไฟล์ให้ commit ด้วย)
กลับมาทำต่อใช้ `git switch my/06-local-state` แล้ว `npm ci` ลองแก้จุดที่ติดเองและตรวจซ้ำ อ่านเฉลยอย่างเดียวไม่ถือว่าสำเร็จ
ไปบทถัดไปให้ commit งานแล้วสร้าง branch ส่วนตัวใหม่จาก lab ตามแผนการเรียน ไม่ต้องรวมงานเก่าและไม่บังคับ push

## ดูและทดลองเฉลย

[branch เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/tree/06-local-state-solution)
· [เปรียบเทียบ lab/เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/06-local-state-lab...06-local-state-solution)
คำอธิบาย `course/solutions/06-local-state.md` มีเฉพาะ branch เฉลย
หลัง commit งานเดิมและหยุด dev server:

```bash
git switch -c try/06-local-state-solution origin/06-local-state-solution
npm ci
npm run check
npm run dev
```

ครั้งถัดไปใช้ `git switch try/06-local-state-solution` กลับงานตัวเองใช้ `git switch my/06-local-state` และติดตั้งใหม่


## ไปบทถัดไปด้วย branch ใหม่

Commit งานแม้ยังไม่เสร็จและจดจุดที่ต้องกลับมาฝึก แล้วหยุด dev server ด้วย Ctrl+C ไม่ต้องนำงานบทก่อนมารวม จุดเริ่มต้นใหม่มีคำตอบบทก่อนพร้อมแล้ว:

```sh
git add src
git commit -m "เก็บงานก่อนย้ายบท"
git switch -c my/07-reset origin/07-reset-lab
npm ci
npm run dev
```

ถ้ามี NOTES.md ให้ add และ commit ไฟล์นั้นด้วย หากไม่มีการเปลี่ยนแปลงไม่ต้อง commit ซ้ำ ใช้ local branch ให้ตัด `origin/` ออก หาก branch ส่วนตัวของบทถัดไปมีอยู่แล้วใช้ `git switch my/07-reset` ไม่สร้างซ้ำ จากนั้นอ่าน [โจทย์บทถัดไป](https://github.com/ArrayaWongsaita/dn_zustand/blob/07-reset-lab/course/lessons/07-reset.md)
