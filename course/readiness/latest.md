# ผลตรวจอัตโนมัติของคอร์ส

ตรวจเมื่อ 2026-10-11T07:00:17.628Z จาก commit `ee5f914a2e18a95632e1811c9535274970772708`

ผลรวม: **ผ่าน**

| Branch | Commit | ผล | Expected failures |
|---|---|---|---|
| 01-basic-store-lab | 58d8ccd0289a42ccaeba77bae8b00d1d9d0bb7de | ผ่าน | {"unit":["store exposes the lesson initial cart items"],"e2e":["screen displays the lesson cart items and quantities"]} |
| 01-basic-store-solution | 7ea1f8e4cec4da1878d180f4d035199da7362f91 | ผ่าน | {"unit":[],"e2e":[]} |
| 02-actions-lab | ddef2da148e8d4fa9e13114a9f230866ab6ef92d | ผ่าน | {"unit":["adding a new product creates a cart item with quantity one"],"e2e":["adding a product from the catalog displays it in the cart"]} |
| 02-actions-solution | 75b15c02fff9d4b466e759762ba1b3a15c188960 | ผ่าน | {"unit":[],"e2e":[]} |
| 03-immutable-updates-lab | a84ba35921cdf1753cf9c3c8a496bee06932fe33 | ผ่าน | {"unit":["adding an existing product increases its quantity without mutating previous items","increasing quantity preserves the previous cart and its item objects","decreasing quantity preserves the previous cart and its item objects","removing an item preserves the previous cart and its item objects"],"e2e":["quantity controls stop at one and the remove button removes the item"]} |
| 03-immutable-updates-solution | f56d103a753c30daa3ec26bc9d9180f106bcc248 | ผ่าน | {"unit":[],"e2e":[]} |
| 04-selectors-lab | 6fc89245b411b55b637a8a1cf5e3be9c3131e933 | ผ่าน | {"unit":[],"e2e":[]} |
| 04-selectors-solution | f7ca4c014c3fc337da3c70220c2d1089dea7bcef | ผ่าน | {"unit":[],"e2e":[]} |
| 05-derived-state-lab | 17091e1659a7d3840797d3da00c46b106fa5b3d7 | ผ่าน | {"unit":["total quantity sums pieces and updates after adding another product","cart total sums price times quantity and updates after adding another product"],"e2e":["cart summary updates total pieces and price after cart changes"]} |
| 05-derived-state-solution | 14d63d0482a3ae372ca291262b3a88e39468e6d9 | ผ่าน | {"unit":[],"e2e":[]} |
| 06-local-state-lab | 9d720925d0e8e5fa1f16382886457986f2b236f0 | ผ่าน | {"unit":[],"e2e":["searching a Thai substring filters products without changing the cart or totals","an unmatched search shows a message and clearing it restores all products"]} |
| 06-local-state-solution | e285822cfa19c1860415e82161f6d38ad22796bf | ผ่าน | {"unit":[],"e2e":[]} |
| 07-reset-lab | e7cd6f3949f82749265e587b69affc940ab42fa8 | ผ่าน | {"unit":["clearing the cart empties items and keeps actions usable for adding again"],"e2e":["clearing the cart preserves the product filter and allows adding again"]} |
| 07-reset-solution | 5ee5c9db6629786c19a1647393a3d8ee74588851 | ผ่าน | {"unit":[],"e2e":[]} |
| 08-persist-lab | 88cb6db69f8b409a19d5ead72c4abe57bbf30a9d | ผ่าน | {"unit":[],"e2e":["adding a product survives reload while the local filter resets","adjusted quantities survive reload and quantity actions remain usable","clearing a saved cart remains empty after reload and actions still work","persist saves only cart items under the course storage key"]} |
| 08-persist-solution | 37db13ed3631f4a6a0e5741c804b58bff8d11f8b | ผ่าน | {"unit":[],"e2e":[]} |
| 09-review-bug | 275308bb637227bdc9f253f258aa80c8ff41afef | ผ่าน | {"unit":["increasing quantity preserves the previous cart and its item objects"],"e2e":[]} |
| 09-review-solution | fc38ad32a9aa5831a51852d2ea2c2f7f5eca6018 | ผ่าน | {"unit":[],"e2e":[]} |

ลิงก์ตรวจแล้ว 24; รอตรวจในชุดอื่น 0

ผลนี้ยืนยันเครื่องมือและพฤติกรรมตาม baseline เท่านั้น ผู้สอนต้องทบทวนเนื้อหา checklist และการไม่รั่วของเฉลยก่อนประกาศพร้อมสอน
