# ผลตรวจอัตโนมัติของคอร์ส

ตรวจเมื่อ 2026-10-11T07:07:23.376Z จาก commit `f64e358e3ce78f8a147667f2ab542d401f1221f1`

ผลรวม: **ผ่าน**

| Branch | Commit | ผล | Expected failures |
|---|---|---|---|
| 01-basic-store-lab | 58d8ccd0289a42ccaeba77bae8b00d1d9d0bb7de | ผ่าน | {"unit":["store exposes the lesson initial cart items"],"e2e":["screen displays the lesson cart items and quantities"]} |
| 01-basic-store-solution | 7ea1f8e4cec4da1878d180f4d035199da7362f91 | ผ่าน | {"unit":[],"e2e":[]} |
| 02-actions-lab | ddef2da148e8d4fa9e13114a9f230866ab6ef92d | ผ่าน | {"unit":["adding a new product creates a cart item with quantity one"],"e2e":["adding a product from the catalog displays it in the cart"]} |
| 02-actions-solution | 75b15c02fff9d4b466e759762ba1b3a15c188960 | ผ่าน | {"unit":[],"e2e":[]} |
| 03-immutable-updates-lab | a84ba35921cdf1753cf9c3c8a496bee06932fe33 | ผ่าน | {"unit":["adding an existing product increases its quantity without mutating previous items","increasing quantity preserves the previous cart and its item objects","decreasing quantity preserves the previous cart and its item objects","removing an item preserves the previous cart and its item objects"],"e2e":["quantity controls stop at one and the remove button removes the item"]} |
| 03-immutable-updates-solution | f56d103a753c30daa3ec26bc9d9180f106bcc248 | ผ่าน | {"unit":[],"e2e":[]} |
| 04-selectors-lab | ecb1341f74973415b4bb626c04f18968f9d96262 | ผ่าน | {"unit":[],"e2e":[]} |
| 04-selectors-solution | a1f4959f37b4935107674ccdb650dc8d1fc756df | ผ่าน | {"unit":[],"e2e":[]} |
| 05-derived-state-lab | 637314d82b34b9bba48d31a4072e25e0cccfb9c6 | ผ่าน | {"unit":["total quantity sums pieces and updates after adding another product","cart total sums price times quantity and updates after adding another product"],"e2e":["cart summary updates total pieces and price after cart changes"]} |
| 05-derived-state-solution | e2638b4946e8a8574268ed8f2b555a213e04d05b | ผ่าน | {"unit":[],"e2e":[]} |
| 06-local-state-lab | 9294da35c659527e73a805903ee62097c1e3bd84 | ผ่าน | {"unit":[],"e2e":["searching a Thai substring filters products without changing the cart or totals","an unmatched search shows a message and clearing it restores all products"]} |
| 06-local-state-solution | 49e4821d029985f1a7682307ace3de6ee00809ea | ผ่าน | {"unit":[],"e2e":[]} |
| 07-reset-lab | 6a52bc76c5f291c243b15577dc536a50914a1597 | ผ่าน | {"unit":["clearing the cart empties items and keeps actions usable for adding again"],"e2e":["clearing the cart preserves the product filter and allows adding again"]} |
| 07-reset-solution | 89067d120a4235a8ee04420c5fb817b199c59c58 | ผ่าน | {"unit":[],"e2e":[]} |
| 08-persist-lab | 173d5def88c57bf3a9d45ca1124785e7e10869c4 | ผ่าน | {"unit":[],"e2e":["adding a product survives reload while the local filter resets","adjusted quantities survive reload and quantity actions remain usable","clearing a saved cart remains empty after reload and actions still work","persist saves only cart items under the course storage key"]} |
| 08-persist-solution | 23276669377ac7e29ab5e97874b379938056b03e | ผ่าน | {"unit":[],"e2e":[]} |
| 09-review-bug | ad47e384016dcf47535448180d8b8b96411441b4 | ผ่าน | {"unit":["increasing quantity preserves the previous cart and its item objects"],"e2e":[]} |
| 09-review-solution | b2d12486b9c5469615603713560cda88a56974d0 | ผ่าน | {"unit":[],"e2e":[]} |

ลิงก์ตรวจแล้ว 24; รอตรวจในชุดอื่น 0

ผลนี้ยืนยันเครื่องมือและพฤติกรรมตาม baseline เท่านั้น ผู้สอนต้องทบทวนเนื้อหา checklist และการไม่รั่วของเฉลยก่อนประกาศพร้อมสอน
