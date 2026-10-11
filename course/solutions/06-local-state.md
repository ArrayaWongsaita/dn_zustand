# เฉลยบทที่ 6 — คำค้นเป็นของ ProductCatalog

ลอง [โจทย์และ checklist](https://github.com/ArrayaWongsaita/dn_zustand/blob/06-local-state-lab/course/lessons/06-local-state.md) ก่อนอ่านคำตอบ

```js
import { useState } from 'react'
// ภายใน ProductCatalog
const [query, changeQuery] = useState('')
const visibleProducts = products.filter((product) => product.name.includes(query))
```

input ใช้ value={query} และ onChange ส่ง event.target.value ให้ changeQuery
การเปลี่ยนคำค้นทำให้ component คำนวณ visibleProducts ใหม่ทันที ไม่ต้องเก็บผลกรองอีกชุดหรือใช้ useEffect

query มีผู้ใช้เฉพาะ ProductCatalog จึงอยู่ใน local state ไม่เพิ่ม field ใน useCartStore
products เป็นรายการสินค้าที่เลือกซื้อ ส่วน store.items เป็นสิ่งที่เลือกแล้ว การกรอง products ไม่กระทบ cart
filter คืน array ใหม่และไม่แก้ข้อมูลต้นฉบับ

ค้น “ปาก” แสดงปากกา ค้น “รองเท้า” ไม่พบสินค้า ล้างคำค้นกลับแสดงสามชนิด เพราะทุกชื่อ includes ค่าว่าง
ทั้งสามกรณีตะกร้ายังมีสมุด ×2 ปากกา ×1 / 3 ชิ้น / 120 บาท
การใช้ state ร่วมควรมีเหตุผลว่าหลายส่วนต้องใช้ค่าร่วมจริง ไม่ต้องนำค่าของ UI ทุกตัวไปไว้ store

`npm run check` ผ่านแล้วให้อ่านโค้ดตาม checklist ยืนยัน query อยู่ใน component, visibleProducts เป็นค่าคำนวณ,ไม่มีการแก้ items/products เดิม และอธิบายเหตุผลของขอบเขต state ได้
[เทียบ lab/เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/06-local-state-lab...06-local-state-solution)
