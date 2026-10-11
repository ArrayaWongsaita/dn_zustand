# เฉลยบทที่ 7 — reset ตามขอบเขต

ลอง [โจทย์และ checklist](../lessons/07-reset.md) ก่อนอ่านคำตอบ

```js
clearCart: () => set({ items: [] }),
```

set รวม field ที่ส่งกับ state เดิมตามปกติ จึงเปลี่ยนเฉพาะ items และรักษา addItem/increaseQuantity/decreaseQuantity/removeItem/clearCart ไว้
ไม่ใช้ replace ทั้ง object ซึ่งอาจทำให้ฟังก์ชันหาย และไม่คืนชุดฝึกเพราะคำสั่งนี้หมายถึงตะกร้าว่าง
array ว่างใหม่ไม่แก้ array หรือ object ที่ผู้ใช้ถืออยู่ก่อนหน้า

จำนวนรายการ จำนวนชิ้นรวมและยอดรวมคำนวณจาก items อยู่แล้ว เมื่อล้างจึงเป็น0/0/0ทันที ไม่ต้อง resetค่าซ้ำ
query อยู่ใน local state ของ ProductCatalog และ component ยังอยู่ตำแหน่งเดิม จึงรักษาคำค้นไว้
ค้นกระเป๋า → ล้าง → ตะกร้าว่าง/0ชิ้น/0บาท แต่ยังแสดงสินค้าเฉพาะกระเป๋า → เพิ่มกระเป๋าใหม่ได้×1/200บาท

helper resetStore ของ tests ใช้ public initial state เพื่อเริ่ม scenario ใหม่ รวมข้อมูลฝึกที่ตรงกับบท
มันไม่ได้เรียก clearCart เพราะการเตรียมข้อมูลกับการล้างเพื่อผู้ใช้เป็นคนละหน้าที่ และไม่ควรพึ่ง action ที่กำลังทดสอบ

`npm run check` ผ่านแล้วให้ตอบ checklist: ขอบเขตเฉพาะitems,actionsยังอยู่,localqueryไม่ถูกแตะ,derivedvaluesเป็นศูนย์เอง
[เทียบ lab/เฉลย](https://github.com/ArrayaWongsaita/dn_zustand/compare/07-reset-lab...07-reset-solution)
