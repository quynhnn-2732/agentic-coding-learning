# Tasks: Hệ thống giải thưởng (Award Information)

**Frame**: `313-8436-AwardInformation`
**Prerequisites**: plan.md ✅, spec.md ✅, design-style.md ✅

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create directory structure. No new packages needed — all infrastructure already exists.

- [x] T001 Create component directory for feature | `src/app/_components/awards-information/` (empty dir placeholder)
- [x] T002 Create test directory for feature | `tests/unit/awards-information/` (empty dir placeholder)
- [x] T003 Verify award images exist in public folder (6 files: award-top-talent.png, award-top-project.png, award-top-project-leader.png, award-best-manager.png, award-signature-creator.png, award-mvp.png) | `public/images/homepage/`

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Extend shared data layer and design tokens — ALL component implementations depend on these.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T004 Add `AwardDetail` interface extending `Award` with `quantity`, `unit`, `prizeValue` fields | `src/libs/types/homepage.ts`
- [x] T005 Update `awardsData` type annotation from `Award[]` to `AwardDetail[]` and add `quantity`, `unit`, `prizeValue` to all 6 entries (Top Talent: 10/Đơn vị/7M, Top Project: 2/Tập thể/15M, Top Project Leader: 3/Cá nhân/7M, Best Manager: 1/Cá nhân/10M, Signature: 1/Cá nhân/dual 5M+8M, MVP: 1/Cá nhân/15M) | `src/libs/data/awards.ts`
- [x] T006 Add missing design tokens: `--radius-metadata: 16px` and `--text-award-page-title-size: 57px` to `@theme` block | `src/app/globals.css`

**Checkpoint**: Types compile (`yarn tsc --noEmit`), `awardsData` has all 6 entries with new fields, tokens available in Tailwind — user story implementation can now begin.

---

## Phase 3: User Story 1 — Xem tổng quan hệ thống giải thưởng (Priority: P1) 🎯 MVP

**Goal**: Render the full page at `/awards-information` with all 6 award entries — image, title (h2), description, quantity box, prize value box, and the page h1 heading.

**Independent Test**: Navigate to `http://localhost:3000/awards-information` (authenticated). All 6 award cards are visible with correct name, image, quantity, and prize value. Signature 2025 shows "5.000.000 VNĐ / Hoặc / 8.000.000 VNĐ".

### Tests — US1 (TDD: write failing tests FIRST)

- [x] T007 [P] [US1] Write unit test: `AwardMetadataBox` renders quantity label + number + unit; renders single prize label + value; renders dual prize with "Hoặc" divider for Signature | `tests/unit/awards-information/award-metadata-box.test.tsx`
- [x] T008 [P] [US1] Write unit test: `AwardContentBlock` renders h2 with gold title, justified description paragraph, and 2 metadata boxes | `tests/unit/awards-information/award-content-block.test.tsx`
- [x] T009 [P] [US1] Write unit test: `AwardEntry` renders `<section id={slug}>`, image with correct `alt="{name} award"`, imagePosition='left' puts image first / imagePosition='right' puts image last | `tests/unit/awards-information/award-entry.test.tsx`
- [x] T010 [P] [US1] Write unit test: `AwardTitleSection` renders `<h1>`, subtitle text "Sun* annual awards 2025", and gold heading "Hệ thống giải thưởng SAA 2025" | `tests/unit/awards-information/award-title-section.test.tsx`
- [x] T011 [P] [US1] Write integration test: page renders 6 award sections with correct slugs; unauthenticated request redirects to `/login` | `tests/integration/awards-information-page.test.tsx`

### Implementation — US1

- [x] T012 [P] [US1] Implement `AwardMetadataBox` component — props: `type: 'quantity' | 'prize'`, renders label (gold #FFEA9E 16px), value (white 36px bold), unit (white 14px); dual-prize shows "Hoặc" centered divider between two prize rows; styling: `bg-divider rounded-[var(--radius-metadata)] p-[var(--spacing-md)]` | `src/app/_components/awards-information/award-metadata-box.tsx`
- [x] T013 [US1] Implement `AwardContentBlock` component — renders h2 (gold Montserrat 24/700), description p (white 16/700 text-justify tracking-[0.5px]), quantity AwardMetadataBox, prize AwardMetadataBox; container: `w-[480px] flex flex-col gap-[var(--spacing-lg)] rounded-[16px]` | `src/app/_components/awards-information/award-content-block.tsx`
- [x] T014 [P] [US1] Implement `AwardTitleSection` component — renders subtitle span (white Montserrat 24/700) + h1 heading (gold #FFEA9E Montserrat 57/700 tracking-[-0.25px]); container: `flex flex-col gap-[16px]` | `src/app/_components/awards-information/award-title-section.tsx`
- [x] T015 [US1] Implement `AwardEntry` component — renders `<section id={award.slug}>`; `flex flex-row gap-[var(--spacing-xl)]`; when imagePosition='left': `[<Image />, <AwardContentBlock />]`; when 'right': `[<AwardContentBlock />, <Image />]`; image: `next/image width={336} height={336} className="flex-shrink-0"` with gray placeholder div as fallback | `src/app/_components/awards-information/award-entry.tsx`
- [x] T016 [P] [US1] Implement `KeyvisualBanner` component — `next/image fill` of `hero-keyvisual.png` in a `relative` container with gradient overlay `linear-gradient(0deg, #00101A -4.23%, transparent 52.79%)`; `aria-hidden="true"` | `src/app/_components/awards-information/keyvisual-banner.tsx`
- [x] T017 [US1] Create `awards-information/page.tsx` — RSC; import `createClient` from `@/libs/supabase/server`; fetch session for avatarUrl; render: `<HomepageHeader activePath="awards-information" />`, `<KeyvisualBanner />`, padded content wrapper (`px-4 md:px-[144px] py-[96px] flex flex-col gap-[80px]`) containing `<AwardTitleSection />` + sidebar-awards flex-row, then `<SunkudosSection />` outside wrapper in `<div className="pb-[96px]">`, then `<Footer />`; `awardsData.map((award, i) => <AwardEntry imagePosition={i % 2 === 0 ? 'left' : 'right'} />)` | `src/app/awards-information/page.tsx`
- [x] T018 [US1] Verify all US1 unit tests pass (`yarn test tests/unit/awards-information/`) | —

**Checkpoint**: US1 complete — authenticated user sees all 6 award entries at `/awards-information`. Run: `yarn test tests/unit/awards-information/ && yarn test tests/integration/awards-information-page.test.tsx`

---

## Phase 4: User Story 2 — Điều hướng nhanh đến hạng mục giải (Priority: P2)

**Goal**: Left sidebar with 6 nav items; click → smooth scroll to section; scroll spy updates active item automatically.

**Independent Test**: Click "Best Manager" in sidebar → page scrolls to `#best-manager` section → "Best Manager" nav item shows gold underline + 16px. Scroll manually past "Top Project" section → "Top Project" nav item becomes active.

### Tests — US2 (TDD: write failing tests FIRST)

- [x] T019 [US2] Write unit test: `AwardSidebar` renders 6 nav buttons with correct text; active button has `aria-current="true"`; click triggers `scrollIntoView` on matching section element; `activeSlug` state updates when IntersectionObserver fires (mock IO) | `tests/unit/awards-information/award-sidebar.test.tsx`
- [x] T020 [US2] Write E2E test: navigate to `/awards-information`, click each sidebar item, verify viewport scrolls to correct section and active state changes; verify sidebar is hidden at 375px viewport | `tests/e2e/awards-information.spec.ts`

### Implementation — US2

- [x] T021 [US2] Implement `AwardSidebar` client component — `"use client"`; `useState('top-talent')` for activeSlug; `useEffect` sets up IntersectionObserver (threshold: 0.4, rootMargin: '-80px 0px 0px 0px') on all `awardsData` section IDs, calls `setActiveSlug(entry.target.id)` on intersection; scrollTo handler calls `document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' })`; renders `<nav role="navigation" aria-label="Award categories" className="w-[178px] sticky top-[96px] self-start flex flex-col gap-[16px]">` with buttons using active class `text-[#FFEA9E] text-[16px] underline` vs normal class `text-white text-[14px] hover:text-[rgba(255,234,158,0.7)]`; focus: `focus-visible:outline-2 focus-visible:outline-accent-gold` | `src/app/_components/awards-information/award-sidebar.tsx`
- [x] T022 [US2] Wire `AwardSidebar` into page — wrap in `<div className="hidden md:block">` for mobile hide; sidebar is already imported in T017 page structure (verify placement in flex-row with awards list) | `src/app/awards-information/page.tsx`
- [x] T023 [US2] Verify US2 unit test passes (`yarn test tests/unit/awards-information/award-sidebar.test.tsx`) | —

**Checkpoint**: US1 + US2 complete — sidebar navigation functional. Run: `yarn test tests/unit/awards-information/`

---

## Phase 5: User Story 3 — Xem thông tin Sun* Kudos (Priority: P3)

**Goal**: Sun* Kudos promotional block renders at page bottom; "Chi tiết" button navigates to `/sun-kudos`.

**Independent Test**: Scroll to bottom of `/awards-information`. Sun* Kudos block is visible with golden background image. Click "Chi tiết" → navigates to `/sun-kudos`.

### Implementation — US3

- [x] T024 [US3] Verify `SunkudosSection` is placed outside the padded content wrapper in page.tsx — check `<div className="pb-[96px]"><SunkudosSection /></div>` is a direct child of `<main>`, NOT inside the `px-[144px]` content div | `src/app/awards-information/page.tsx`
- [x] T025 [US3] Add E2E test scenario: scroll to bottom of awards page, verify Kudos section is visible, click "Chi tiết" button, verify navigation to `/sun-kudos` | `tests/e2e/awards-information.spec.ts`

**Checkpoint**: All 3 user stories complete. Full page functional end-to-end.

---

## Phase 6: Polish, Responsive & Cleanup

**Purpose**: Mobile/tablet responsive, header active state, cleanup.

- [x] T026 [P] Add mobile responsive to `AwardEntry` — `flex-col md:flex-row` for row direction; image: `w-full max-w-[280px] md:w-[336px] md:h-[336px]`; content block: `w-full md:w-[480px]` | `src/app/_components/awards-information/award-entry.tsx`
- [x] T027 [P] Add mobile responsive to `AwardTitleSection` — heading: `text-[32px] md:text-[57px] md:leading-[64px]` | `src/app/_components/awards-information/award-title-section.tsx`
- [x] T028 [P] Add tablet responsive to awards list — content block uses `flex-1 min-w-0` at md breakpoint; award entry gap `gap-[var(--spacing-xl)]` stays for md/lg | `src/app/_components/awards-information/award-entry.tsx`
- [x] T029 Add `activePath?: 'awards-information' | 'sun-kudos'` prop to `HomepageHeader`; when `activePath` is set, render `<Link href="/">About SAA 2025</Link>` instead of `<NavScrollLink>`; apply gold active class `text-[#FFEA9E] border-b-2 border-[#FFEA9E]` to matching nav link | `src/app/_components/homepage/header.tsx`
- [x] T030 Remove debug `console.log("user", user, "pathname", pathname)` from middleware (line 15) | `src/middleware.ts`
- [x] T031 [P] Run full test suite and confirm all pass: `yarn test` + `yarn tsc --noEmit` + `yarn lint` | —
- [x] T032 Run E2E tests: `yarn playwright test tests/e2e/awards-information.spec.ts` | —

**Checkpoint**: All phases complete, tests green, lint passes.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundation: T004 → T005 → T006)
    ↓ BLOCKS all user stories
Phase 3 (US1): T007–T011 tests → T012–T017 impl → T018 verify
    ↓
Phase 4 (US2): T019–T020 tests → T021–T022 impl → T023 verify
    ↓
Phase 5 (US3): T024–T025
    ↓
Phase 6 (Polish): T026–T032
```

### Within Each User Story

1. **Tests FIRST** (TDD) — write failing tests before any implementation
2. Leaf components before parent components:
   - `AwardMetadataBox` (T012) → `AwardContentBlock` (T013) → `AwardEntry` (T015)
   - `AwardTitleSection` (T014) + `KeyvisualBanner` (T016) — parallel with content chain
3. `page.tsx` (T017) last — assembles all components

### Parallel Opportunities

| Tasks | Can Run In Parallel | Reason |
|-------|--------------------|----|
| T007, T008, T009, T010 | ✅ Yes | Different test files |
| T012, T014, T016 | ✅ Yes | Independent leaf components |
| T019, T020 | ✅ Yes | Different test files |
| T026, T027, T028 | ✅ Yes | Different component files |
| T029, T030 | ✅ Yes | Different files |

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete **Phase 1** (Setup) + **Phase 2** (Foundation)
2. Complete **Phase 3** (US1 — all 6 awards render)
3. **STOP and VALIDATE**: `yarn dev` → visit `/awards-information` → confirm layout matches Figma
4. Continue Phase 4 → Phase 5 → Phase 6

### Incremental Delivery

1. Phase 1 + 2 → Phase 3 (US1) → **validate** → commit
2. Phase 4 (US2) → **validate sidebar scroll** → commit
3. Phase 5 (US3) → **validate Kudos CTA** → commit
4. Phase 6 (Polish) → **validate responsive + tests** → commit

---

## Summary

| Metric | Value |
|--------|-------|
| Total tasks | 32 |
| Phase 1 (Setup) | 3 tasks |
| Phase 2 (Foundation) | 3 tasks |
| Phase 3 (US1 — P1) | 12 tasks (5 tests + 6 impl + 1 verify) |
| Phase 4 (US2 — P2) | 5 tasks (2 tests + 2 impl + 1 verify) |
| Phase 5 (US3 — P3) | 2 tasks |
| Phase 6 (Polish) | 7 tasks |
| Parallelizable tasks [P] | 16 tasks |
| MVP scope (Phase 1–3 only) | 18 tasks |

---

## Notes

- Mark tasks complete as you go: change `[ ]` → `[x]`
- Commit after each phase checkpoint
- Run `yarn tsc --noEmit` after Phase 2 to catch type errors early
- The sidebar `top-[96px]` sticky offset = 80px header + 16px buffer — adjust `rootMargin` in IntersectionObserver if scroll spy feels off
- `SunkudosSection` must stay OUTSIDE the `px-[144px]` padded div (it manages its own padding)
- After T029 (HomepageHeader changes), test homepage and dashboard pages still render correctly — `activePath` prop is optional and defaults to undefined
