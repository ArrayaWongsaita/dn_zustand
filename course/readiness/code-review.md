# Code review of spec #9

Fixed point: `main` (`55e3bcb`). Reviewed integration commit: `be4092c`. Two independent read-only review agents inspected standards and spec coverage.

## Standards

Standards review: main (`55e3bcb`) → `be4092c`.

Documented standards: no violations found in the reviewed changes. Sources: `AGENTS.md`, `docs/agents/{issue-tracker,triage-labels,domain}.md`, root `GLOSSARY.md`, `.agents/skills/tdd/SKILL.md`, root `README.md`, `course/TOOLING.md`, and `course/MAINTENANCE.md`. Existing starter code/dependencies were distinguished using `9ea1163`. Tool-enforced lint findings are excluded. Separate pedagogical store actions, public store/browser seams, and independent literal expectations were retained intentionally.

Actionable baseline smell (judgement, low priority):

- `tests/e2e/cart.spec.js:56–61` and `:74–79` — **Duplicated Code**. Both hunks repeat `for (const product of [...])`, initial-quantity lookup, and the inner loop clicking `เพิ่ม${product.name}`. The identical logic already exists in `prepareTrainingCart(page)` at lines 95–102 and is used by later scenarios. Replace these two setup blocks with `await prepareTrainingCart(page)`. This keeps arrangement behavior consistent when lesson starting quantities change and avoids maintaining three copies of the same browser interaction algorithm. Keep the subsequent literal badge/total assertions independent.

No other actionable baseline smells identified. This review evaluates standards only; it does not establish spec completeness or independently rerun course validation.

## Spec

# Spec review — #9

Reviewed integration/spec-9-zustand-course at be4092c against main 55e3bcbdfc40d107de98cfa5f5d74466b7480313, the complete commit list, spec #9, and tickets #10–#20. Also inspected actual registered lesson branch snapshots, including store progression across all 18 branches, selectors/local-state lab seams, initial lesson UI, tests, lab/solution documents, learner workflow, and validation/reporting implementation.

(a) Missing/partial requirements: No additional actionable implementation finding. Publication of all lesson refs, real GitHub Actions results, and recorded CI references remain explicitly pending coordinator work. These must finish before claiming the automatic acceptance criteria complete: “ตรวจทุก branch จาก commit จริงด้วยคำสั่งผู้ดูแลและ CI”. The saved local 18-branch report and 24 verified map targets do not themselves establish remote accessibility or CI success.

(b) Scope creep: None found. The ninth numbered branch pair is the required 30-minute review activity, separate from the eight taught lessons. Retained starter assets/dependencies are preserved original work, not newly added course scope.

(c) Apparently implemented but incorrect requirements: No concrete defect found. Actual branch stores follow the specified initial carts and capability sequence; lesson 4 intentionally passes tests before selectors are completed. Quantity mutation checks retain original objects, filtering stays local, clearCart preserves actions/filter, and persistence selects only items. Tests/checklists retain distinct learner and maintainer success criteria.

Instructor review remains deliberately outstanding. The spec requires “ต้องมีทั้งผลตรวจอัตโนมัติบนเครื่อง/CI และการทบทวนเนื้อหาโดยผู้สอนก่อนประกาศพร้อมสอน”; course/INSTRUCTOR-HANDOFF.md correctly leaves that approval unclaimed. This code review is not a substitute for pedagogical approval or the pending remote checks.

No edits made; relied on recorded full execution evidence rather than rerunning all 18 branches. Coarse boundary evidence was corroborated with actual git-show snapshots, but instructor content/no-leak review must still occur.

## Resolution

The single standards refactor and tool-reported unused import were fixed in tooling commit `f64e358`, on the integration branch and 12 affected course snapshots. Test names and literal assertions were preserved. A fresh Node 22 full-course check passed all 18 final branch commits and 24 map links; integration unit/browser checks, build and five validator tests passed. See [readiness evidence](latest.md). Publication and real CI are recorded separately in `ci.json` after execution. Instructor approval remains pending.

Standards: 1 low-priority judgement, 0 documented violations. Spec: 0 implementation findings; remote validation recorded separately.
