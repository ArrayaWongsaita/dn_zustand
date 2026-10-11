# คอร์ส Zustand ภาษาไทย — เรียนผ่านตะกร้าสินค้า

คอร์สลงมือทำ 6 ชั่วโมง ผ่านร้านเครื่องเขียนหน้าเดียวด้วย React + Vite และ JavaScript ฝึก state/actions, immutable updates, selectors, derived state, local state, reset และ persist รวม 8 บท แต่ละบทมี lab คำใบ้ ชุดตรวจ checklist และเฉลยพร้อมเหตุผล

เริ่มที่ [แผนการเรียนและลิงก์ทุกบท](COURSE.md) ไม่ต้องทำ lab ก่อนหน้าผ่านเพื่อเริ่มบทถัดไป เพราะแต่ละ lab เตรียมคำตอบสมบูรณ์ของบทก่อนให้แล้ว

## พื้นฐานก่อนเริ่ม

ควรอ่านและเขียน React components, props, useState, useEffect และ event handlers ได้ รู้ array.map/filter และ object spread เบื้องต้น ใช้ terminal และ Git clone/switch/add/commit ได้ คอร์สใช้ JavaScript ไม่ต้องเรียน TypeScript หรือ React Router เพิ่ม ไม่มี API/async หรือระบบส่งงาน

## เตรียมเครื่องก่อนวันเรียน

ติดตั้ง Git, Node.js 22 LTS ตั้งแต่ 22.12 และ npm 10 ขึ้นไป พร้อม editor และเครือข่ายสำหรับดาวน์โหลด dependencies/browser ตรวจเวอร์ชันก่อน:

```sh
node --version
npm --version
git --version
git clone https://github.com/ArrayaWongsaita/dn_zustand.git
cd dn_zustand
npm ci
npx playwright install chromium
```

Linux ใช้ `npx playwright install --with-deps chromium` อ่าน [เครื่องมือร่วมและตัวอย่างอ่านผลตรวจ](course/TOOLING.md) ใช้ npm กับ `package-lock.json` เป็นหลัก ไม่สลับไปติดตั้งด้วย lockfile ของ starter ตัวอื่น

## เริ่ม lab แรก

จาก clone ที่ยังไม่มี branch ส่วนตัว:

```sh
git switch -c my/01-basic-store origin/01-basic-store-lab
npm ci
npm run dev
```

เปิด URL ที่ Vite แจ้ง แล้วอ่าน [โจทย์บท 1 บน branch lab](https://github.com/ArrayaWongsaita/dn_zustand/blob/01-basic-store-lab/course/lessons/01-basic-store.md) ถ้ามีเฉพาะ local course branches ให้ตัด `origin/` ออก

หยุด dev server ด้วย Ctrl+C ก่อนตรวจ browser หรือเปลี่ยน branch:

```sh
npm run test:unit
npm run test:e2e
npm run check
```

Lab ตั้งต้นตั้งใจให้บาง tests ไม่ผ่าน อ่านชื่อ test → expected/actual → action/component ที่เกี่ยวข้อง → แก้และตรวจซ้ำ ถ้าขึ้น “Executable doesn't exist” ให้ติดตั้ง Chromium ก่อน ไม่ใช่แก้ store `npm run check` หยุดเมื่อ unit ไม่ผ่าน จึงรัน e2e แยกได้เพื่อดูผลครบ

ผู้เรียนสำเร็จเมื่อ tests ทั้งหมดผ่านและ checklist/คำถามเหตุผลครบ ถ้า tests ผ่านแต่เหตุผลยังไม่ครบ ให้จดว่า “พฤติกรรมผ่านแล้ว แต่ยังต้องทบทวนแนวคิด” การยอมรับ expected failures ของ lab ตั้งต้นเป็นเกณฑ์ผู้ดูแลเท่านั้น ไม่ผ่อนเกณฑ์ผู้เรียน การอ่านเฉลยอย่างเดียวยังไม่ถือว่าสำเร็จ

## เก็บงาน เปลี่ยนบท และดูเฉลย

หมดเวลาให้ commit แม้ยังไม่เสร็จ พร้อมจด test/แนวคิดที่ติดใน NOTES.md นาที 5 เปิดคำใบ้ระดับ 1 ได้ นาที 10 ระดับ 2 นาที 15 ระดับ 3 หรือถามผู้สอนว่า “คาดว่าจะเกิดอะไร เกิดอะไรจริง และลองอะไรแล้ว” เปิดคำใบ้ก่อนเวลาได้

```sh
git add src NOTES.md
git commit -m "ฝึกบท 1 และจดสิ่งที่ยังติด"
git switch -c my/02-actions origin/02-actions-lab
npm ci
npm run dev
```

คำสั่ง add NOTES.md ใช้เมื่อสร้างไฟล์แล้ว หากไม่มีให้ใช้ `git add src` ก่อนเปลี่ยนบททุกครั้งหยุด server และ commit งาน ไม่ต้องนำงานบทก่อนมารวมและไม่บังคับ push กลับ branch เดิมด้วย `git switch my/01-basic-store` ไม่ใช้ `-c` ซ้ำ แล้ว `npm ci` และเปิด server ใหม่

ดูเฉลยผ่านลิงก์ GitHub ในแต่ละบท หากจะทดลอง แยก branch จากเฉลยหลัง commit และหยุด server:

```sh
git switch -c try/01-basic-store-solution origin/01-basic-store-solution
npm ci
npm run check
npm run dev
```

เมื่อกลับให้ commit งานทดลอง หยุด server แล้ว `git switch my/01-basic-store` ตามด้วย `npm ci` และ `npm run dev` กลับมาทำจุดที่ติดเองและตรวจซ้ำ หาก branch ทดลองมีอยู่แล้วใช้ `git switch try/01-basic-store-solution` ไม่สร้างซ้ำ ขั้นตอนปกติใช้เพียง branch ส่วนตัวและ commit

## สำหรับผู้สอนและผู้ดูแล

[คู่มือดูแลและส่งต่อการแก้](course/MAINTENANCE.md) · [หลักฐานอัตโนมัติล่าสุด](course/readiness/latest.md) · [รายการก่อนประกาศรุ่น](course/INSTRUCTOR-HANDOFF.md)

คำสั่ง `npm run check:course` ตรวจแต่ละ branch ใน worktree แยกโดยไม่สลับงานผู้เรียน เก็บ commit และ expected failures ของแต่ละ branch ผลอัตโนมัติยังต้องประกอบการทบทวนเนื้อหา checklist และการไม่รั่วของเฉลยโดยผู้สอนก่อนประกาศพร้อมสอน
