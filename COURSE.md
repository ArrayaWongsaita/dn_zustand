# แผนการเรียน Zustand — 360 นาที

เรียน JavaScript ผ่านแอปตะกร้าสินค้าหน้าเดียว เตรียมเครื่องก่อนวันเรียนตาม [README](README.md) และ [เครื่องมือร่วม](course/TOOLING.md) พื้นฐานในตารางเป็นความรู้ที่ควรทบทวน ไม่ใช่เงื่อนไขว่าต้องส่งหรือทำ lab ก่อนหน้าผ่าน แต่ละ lab เริ่มจากเฉลยสมบูรณ์ของบทก่อน จึงไปต่อได้แม้ยังมีจุดต้องกลับมาฝึก

ทุกบท 35 นาที: อธิบาย 10 → lab 20 → เฉลยและเหตุผล 5 นาที ลิงก์เปิดเอกสารบน branch ที่ต้องใช้โดยตรง ตั้ง branch ส่วนตัวจาก lab ก่อนเริ่มตาม README

| บท | เป้าหมาย | พื้นฐานที่ควรทบทวน | เวลา | Lab | เฉลย |
|---|---|---|---|---|---|
| 1 สร้าง store | สร้าง useCartStore และอ่าน items ใน component | components, props, useState, event handlers | 35 นาที | [01-basic-store-lab](https://github.com/ArrayaWongsaita/dn_zustand/blob/01-basic-store-lab/course/lessons/01-basic-store.md) | [01-basic-store-solution](https://github.com/ArrayaWongsaita/dn_zustand/blob/01-basic-store-solution/course/solutions/01-basic-store.md) |
| 2 Actions | เพิ่มสินค้าใหม่ผ่าน addItem และเชื่อมปุ่ม | store และการอ่าน state | 35 นาที | [02-actions-lab](https://github.com/ArrayaWongsaita/dn_zustand/blob/02-actions-lab/course/lessons/02-actions.md) | [02-actions-solution](https://github.com/ArrayaWongsaita/dn_zustand/blob/02-actions-solution/course/solutions/02-actions.md) |
| 3 Immutable updates | เพิ่มซ้ำ ปรับจำนวน และลบ โดยข้อมูลเดิมไม่เปลี่ยน ลดหยุดที่ 1 | state/actions, array.map/filter, object spread | 35 นาที | [03-immutable-updates-lab](https://github.com/ArrayaWongsaita/dn_zustand/blob/03-immutable-updates-lab/course/lessons/03-immutable-updates.md) | [03-immutable-updates-solution](https://github.com/ArrayaWongsaita/dn_zustand/blob/03-immutable-updates-solution/course/solutions/03-immutable-updates.md) |
| 4 Selectors | ให้แต่ละ component อ่านเฉพาะข้อมูล/actions ที่ใช้ จำนวนรายการนับรหัส | immutable updates | 35 นาที | [04-selectors-lab](https://github.com/ArrayaWongsaita/dn_zustand/blob/04-selectors-lab/course/lessons/04-selectors.md) | [04-selectors-solution](https://github.com/ArrayaWongsaita/dn_zustand/blob/04-selectors-solution/course/solutions/04-selectors.md) |
| 5 Derived state | คำนวณจำนวนชิ้นรวมและยอดรวมจาก items โดยไม่เก็บค่าซ้ำ | selectors | 35 นาที | [05-derived-state-lab](https://github.com/ArrayaWongsaita/dn_zustand/blob/05-derived-state-lab/course/lessons/05-derived-state.md) | [05-derived-state-solution](https://github.com/ArrayaWongsaita/dn_zustand/blob/05-derived-state-solution/course/solutions/05-derived-state.md) |
| 6 Local state | ค้นชื่อสินค้าใน component โดยตะกร้าไม่เปลี่ยน | selectors, derived state, useState, controlled input | 35 นาที | [06-local-state-lab](https://github.com/ArrayaWongsaita/dn_zustand/blob/06-local-state-lab/course/lessons/06-local-state.md) | [06-local-state-solution](https://github.com/ArrayaWongsaita/dn_zustand/blob/06-local-state-solution/course/solutions/06-local-state.md) |
| 7 Reset | clearCart ล้างเฉพาะตะกร้า ไม่ล้างตัวกรอง และ actions ยังใช้ได้ | ขอบเขต local/store state | 35 นาที | [07-reset-lab](https://github.com/ArrayaWongsaita/dn_zustand/blob/07-reset-lab/course/lessons/07-reset.md) | [07-reset-solution](https://github.com/ArrayaWongsaita/dn_zustand/blob/07-reset-solution/course/solutions/07-reset.md) |
| 8 Persist | เก็บเฉพาะ items ใน localStorage และกู้คืนหลังรีโหลด | reset และแนวคิด localStorage | 35 นาที | [08-persist-lab](https://github.com/ArrayaWongsaita/dn_zustand/blob/08-persist-lab/course/lessons/08-persist.md) | [08-persist-solution](https://github.com/ArrayaWongsaita/dn_zustand/blob/08-persist-solution/course/solutions/08-persist.md) |

บท 4 เริ่มด้วย tests ผ่านอยู่แล้ว ใช้ checklist ตรวจ selectors ผลหน้าจออย่างเดียวไม่ยืนยันแนวคิดของ selectors/derived/local state ทุกบทต้องผ่าน tests พร้อมตอบเหตุผลครบ

## ตารางสอนรวม 6 ชั่วโมง

| นาทีจากเริ่ม | กิจกรรม | ระยะเวลา |
|---|---|---|
| 0–20 | เปิดคอร์ส ตรวจเครื่อง และอธิบาย workflow | 20 นาที |
| 20–55 | บท 1 | 35 นาที |
| 55–90 | บท 2 | 35 นาที |
| 90–125 | บท 3 | 35 นาที |
| 125–140 | พัก | 15 นาที |
| 140–175 | บท 4 | 35 นาที |
| 175–210 | บท 5 | 35 นาที |
| 210–245 | บท 6 | 35 นาที |
| 245–260 | พัก | 15 นาที |
| 260–295 | บท 7 | 35 นาที |
| 295–330 | บท 8 | 35 นาที |
| 330–360 | ทบทวนและแก้บั๊ก | 30 นาที |

รวมเปิด 20 + 8 × 35 + พัก 30 + ทบทวน 30 = 360 นาที ติดตั้ง dependencies และ Chromium ล่วงหน้า ไม่ใช้เวลาของ lab ไปดาวน์โหลดเครื่องมือ

## ทบทวนท้ายคอร์ส

[ชุดฝึก 09-review-bug](https://github.com/ArrayaWongsaita/dn_zustand/blob/09-review-bug/course/lessons/09-review.md) และ [เฉลย 09-review-solution](https://github.com/ArrayaWongsaita/dn_zustand/blob/09-review-solution/course/solutions/09-review.md) เป็นกิจกรรมแยกจาก 8 บท ไม่ใช่บทเพิ่ม ใช้พื้นฐานบท 6 จึงฝึกได้โดยไม่ต้องรอ reset/persist

ทบทวน local/store/derived state 10 นาที → แก้บั๊ก immutable updates ที่ไม่มี TODO 15 นาที → อธิบายเหตุผลและวางแผนฝึกต่อ 5 นาที หน้าจออาจถูกแต่ข้อมูลเดิมถูกแก้ ชุดตรวจ store จะช่วยยืนยันข้อผิดพลาดนี้

## วิธีฝึกและกลับมาทบทวน

ระหว่าง lab นาที 5 เปิดคำใบ้ระดับ 1 ถ้ายังติด นาที 10 ระดับ 2 นาที 15 ระดับ 3 หรือถามผู้สอน เปิดก่อนเวลาได้ ผู้สอนเริ่มช่วยด้วย “คาดว่าจะเกิดอะไร เกิดอะไรจริง และลองอะไรแล้ว”

หมดเวลาให้ commit แม้ยังไม่เสร็จ จดชื่อ test/แนวคิดที่ติด แล้วไป branch ส่วนตัวใหม่จาก lab ถัดไปตาม [ขั้นตอนเก็บงานและกลับมาทำต่อ](README.md) อ่านเฉลยแล้วต้องกลับไปลองจุดนั้นเอง ไม่บังคับ push หรือส่งงาน

สำหรับผู้ดูแล: [คำสั่งตรวจและดูแลรุ่น](course/MAINTENANCE.md) · [รายงานตาม commit](course/readiness/) · [รายการทบทวนของผู้สอน](course/INSTRUCTOR-HANDOFF.md) ผลอัตโนมัติไม่แทนการทบทวนเนื้อหาและการไม่รั่วของเฉลย
