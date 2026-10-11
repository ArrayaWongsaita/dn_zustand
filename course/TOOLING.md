# เครื่องมือร่วม

ใช้ Node.js 22 LTS ตั้งแต่ 22.12 หรือ 24 LTS (ดู engines ใน package.json) และ npm 10 ขึ้นไป ตรวจด้วย `node --version` และ `npm --version`

ก่อนวันเรียน: `npm ci` แล้ว `npx playwright install chromium` (Linux ใช้ `npx playwright install --with-deps chromium`)
ใช้ npm และ package-lock.json เป็นหลัก; เก็บ pnpm-lock.yaml ของ starter ไว้เป็นประวัติ ไม่ใช้ติดตั้งคอร์ส

- `npm run dev` เปิดแอป ทดลองตาม URL ที่ Vite แจ้ง
- `npm run test:unit` ตรวจ public state/actions ของ store แบบจบแล้วออก
- `npm run test:e2e` ตรวจผ่าน Chromium และเปิด/ปิด Vite ให้เอง
- `npm run check` ตรวจทั้งสองชุด (ถ้า unit ไม่ผ่านให้ตรวจ e2e แยกเพื่อดูครบ)
- `npm run build` ตรวจการสร้างแอปสำหรับเผยแพร่

รายงานเครื่องอ่านได้: `npm run test:unit -- --reporter=json --outputFile=test-results/unit.json` และ `npm run test:e2e -- --reporter=json` (redirect stdout ไปไฟล์หากต้องการ)
Vitest ใช้ tests/unit/*.test.js, Playwright ใช้ tests/e2e/*.spec.js และ browser context ใหม่ต่อ test
Helper resetStore คืน initial state ผ่าน public API ไม่พึ่ง clearCart และ clone items เพื่อไม่ให้ mutation ข้าม test

ปัญหาเครื่องมือ: “Executable doesn't exist” ก่อนเปิด browser ให้ติดตั้ง Chromium อีกครั้ง ไม่ต้องแก้ store
ปัญหาพฤติกรรม: test บอก expected สมุด ×2 แต่ received [] แปลว่าเครื่องมือรันได้แล้ว ให้ตรวจ items/การอ่าน store
อ่านชื่อ test → expected/received → store หรือ component ที่เกี่ยวข้อง → แก้จุดเดียว → ตรวจซ้ำ

ผู้ดูแล: commit เครื่องมือแยกจากเนื้อหา ให้ส่งต่อเฉพาะ commit เครื่องมือ แล้วตรวจทุก branch ที่ได้รับ ห้าม merge เฉลยทั้ง branch เข้า lab
