# ดูแลและตรวจคอร์ส

ใช้ Node.js 22.12 ขึ้นไปตาม `package.json` ติดตั้งด้วย `npm ci` และ `npx playwright install chromium` ครั้งแรก จากนั้นเรียกคำสั่งเดียวกับ GitHub Actions:

```sh
git fetch origin '+refs/heads/*:refs/remotes/origin/*'
npm run test:course
npm run check:course
```

คำสั่งไม่สลับ branch หรือแก้งานใน workspace ผู้เรียน สร้าง detached worktree ชั่วคราวต่อ branch ติดตั้งตาม lockfile ของ branch นั้น build แอป แล้วรัน Vitest และ Playwright ซึ่งเปิดแอปให้เอง ล้าง worktree เมื่อจบ ตรวจทีละ branch เพื่อไม่ชนพอร์ต โดยใช้ 4318 (ปรับด้วย `COURSE_TEST_PORT=4319 npm run check:course`) การตรวจอ่าน local branch ก่อน `origin/<branch>` จึงควรตรวจว่า local branch ตรงรุ่นที่ต้องการก่อนเริ่ม

ระหว่างสร้างคอร์ส ตรวจเฉพาะ branch ที่มีอยู่ได้:

```sh
npm run check:course -- --branches 01-basic-store-lab,01-basic-store-solution
npm run check:course -- --output /tmp/course-readiness
```

ลงทะเบียนคู่บทใหม่ใน `course/branches.json` ตามรูปแบบเดิม ไม่ต้องแก้ runner ระบุชื่อ test เต็มจาก Vitest JSON (`fullName`) และชื่อพฤติกรรม Playwright (`spec.title`) ให้ตรงทุกตัวอักษร `expectedFailures.unit` และ `expectedFailures.e2e` ระบุเฉพาะ lab ที่ยังไม่ได้เติม เฉลยต้องเป็น array ว่าง ไม่ใส่รายการผิดพฤติกรรมของบทก่อนหน้า ไม่มี tests หรือ tests ข้าม/ไม่จบถือว่าผิดเกณฑ์

Exit status 0 หมายถึง install/build สำเร็จ tests ไม่ผ่านตรง baseline ทุกชื่อ และลิงก์ใน `COURSE.md` ไป branch/เอกสารมีอยู่จริง Exit status 1 หมายถึงมีความเสียหายหรือ baseline เปลี่ยน รวมทั้ง expected failure ที่หายไป (อาจมีคำตอบรั่วหรือ test ถูกลบ) ชุดตรวจบาง branch จะบันทึกลิงก์ของ branch อื่นเป็น deferred ต้องตรวจทั้งชุดก่อนประกาศพร้อมสอน

`course/readiness/latest.json` เก็บ commit ต้นทาง commit ของทุก branch, expected failures, ผลจริงและ mismatch ส่วน `latest.md` เป็นสรุปอ่านง่าย log แต่ละขั้นอยู่ข้างกัน ใน CI ดาวน์โหลด artifact ชื่อ `course-readiness-<commit>` ซึ่งสร้างแม้ตรวจไม่ผ่าน ก่อนประกาศรุ่นให้ตรวจครบทุก branch และ commit เฉพาะ JSON/Markdown กลางบน main เพื่อเก็บหลักฐาน commit ที่ตรวจ ไม่ commit logs รายงานเป็นประวัติรุ่นล่าสุด ไม่ยืนยันว่า branch ที่เปลี่ยนภายหลังยังผ่าน

## ส่งต่อการแก้โดยไม่พาเฉลยข้ามบท

แยก commit เครื่องมือ/dependencies/คำสั่งตรวจออกจาก commit เนื้อหาเสมอ ระบุ branch ที่ได้รับผลกระทบ และกระจายเฉพาะ commit ที่เกี่ยวข้อง เช่น:

```sh
git switch 03-immutable-updates-lab
git cherry-pick <tooling-commit>
git switch main
npm run check:course -- --branches 03-immutable-updates-lab,03-immutable-updates-solution
```

ชื่อ branch ตัวอย่างให้แทนด้วยชื่อจริงใน manifest ห้าม merge ทั้ง branch เพื่อส่งแก้ เพราะจะพาเฉลยหรือบทอนาคตเข้า lab ตรวจทุก branch ที่รับการแก้และบันทึก commit ใหม่ หาก patch ใช้กับบทเก่าไม่ได้ ให้แก้เฉพาะเครื่องมือใน branch นั้นและบันทึกเหตุผล ไม่ขยายเนื้อหาบทเรียนโดยอัตโนมัติ

ระหว่างรุ่นแก้เฉพาะปัญหาขวางการเรียน ประกาศบท ส่วนที่กระทบ และ commit ที่แก้ ผู้เรียน commit งานเดิมแล้วสร้าง branch ส่วนตัวใหม่จาก lab ที่แก้ เปิดงานเก่าเทียบและคัดลอกเฉพาะคำตอบ ไม่ต้อง merge/rebase การปรับ dependencies หรือเนื้อหาปกติทำระหว่างรุ่น

การตรวจอัตโนมัติไม่แทนการทบทวนภาษา ตัวอย่าง checklist คำใบ้ และการไม่รั่วของเฉลยโดยผู้สอน ผล lab ตั้งต้นที่ผิดเฉพาะ baseline เป็นเกณฑ์ผู้ดูแลเท่านั้น ผู้เรียนยังต้องผ่าน tests ทั้งหมดพร้อม checklist และคำถามเหตุผลครบก่อนถือว่าสำเร็จ
