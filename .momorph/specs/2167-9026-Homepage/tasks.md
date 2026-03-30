# Tasks: Homepage SAA

**Frame**: `2167-9026-Homepage`
**Prerequisites**: plan.md ✅, spec.md ✅, design-style.md ✅
**Generated**: 2026-03-24 | **Last Updated**: 2026-03-24

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no unmet dependencies)
- **[Story]**: Which user story this belongs to (US1–US5)
- **|**: Primary file(s) affected by this task
- **[x]**: Task complete

> **Implementation status**: ~90% complete. Phases 1–7 are largely done (66 tests passing).
> **Remaining work**: T006 (font file) + T_FIX01 + T_FIX02 (countdown tile bug).

> **TDD Rule (NON-NEGOTIABLE)**: Each phase STARTS with failing tests. Tests MUST be written and verified to fail BEFORE the corresponding implementation task is started.

---

## Phase 1: Setup — Asset Preparation

**Purpose**: Download Figma assets and source fonts; configure environment

- [x] T001 Download hero keyvisual from Figma MCP (`get_media_files`) → `public/images/homepage/hero-keyvisual.png`
- [x] T002 [P] Download ROOT FURTHER logotype images from Figma MCP → `public/images/homepage/root-further-hero.png` (hero use, 451×200px display), `root-further-b4-1.png`, `root-further-b4-2.png` (B4 content, 290×134px display)
- [x] T003 [P] Download 6 award card images from Figma MCP → `public/images/homepage/award-top-talent.png`, `award-top-project.png`, `award-top-project-leader.png`, `award-best-manager.png`, `award-signature-creator.png`, `award-mvp.png`
- [x] T004 [P] Download KUDOS section background from Figma MCP → `public/images/homepage/kudos-section-bg.png`
- [x] T005 [P] Download KUDOS logotype SVG from Figma MCP → `public/images/homepage/kudos-logo.svg`
- [x] T006 Source Digital Numbers `.woff2` font (open-source license, e.g. fontlibrary.org) → `public/fonts/digital-numbers/digital-numbers.woff2` ✅ DONE — downloaded DigitalNumbers-Regular.ttf from google/fonts GitHub (OFL license), converted to woff2 using wawoff2
- [x] T007 [P] Add `NEXT_PUBLIC_EVENT_DATETIME` and `NEXT_PUBLIC_EVENT_LOCATION` entries to `.env.example` with placeholder values | `.env.example`

**Checkpoint**: All assets present → can begin implementation

---

## Phase 2: Foundation — Tokens, Types, Config

**Purpose**: Core infrastructure required by ALL user stories

**⚠️ CRITICAL**: No user story implementation can begin until this phase is complete

- [x] T008 Update `vitest.config.ts` to add `env` block with `NEXT_PUBLIC_EVENT_DATETIME: '2025-12-26T18:30:00+07:00'` and `NEXT_PUBLIC_EVENT_LOCATION: 'Âu Cơ Art Center'` test values | `vitest.config.ts`
- [x] T009 Update `next.config.ts` to add `images.remotePatterns` for `lh3.googleusercontent.com` | `next.config.ts`
- [x] T010 [P] Add Homepage design tokens to `globals.css` inside `@theme inline {}` — colors (`--color-accent-gold`, `--color-accent-gold-glow`, `--color-btn-kudos-bg`, `--color-btn-kudos-border`, `--color-notification-badge`, `--color-kudos-text`, `--color-nav-selected`, `--color-countdown-digit`, `--color-homepage-header-bg`); spacing (`--spacing-section`, `--spacing-page-px`, `--spacing-page-py`, `--spacing-content-w`); typography tokens; shadows (`--shadow-glow-gold`, `--shadow-nav-selected`); font token (`--font-digital`) | `src/app/globals.css`
- [x] T011 [P] Add `@font-face` block for Digital Numbers outside `@theme {}` with `font-display: swap` | `src/app/globals.css`
- [x] T012 [P] Create TypeScript interfaces `Award` and `CountdownState` | `src/libs/types/homepage.ts`
- [x] T013 Write FAILING unit test: awards data exports array of 6 items with correct slugs (`top-talent`, `top-project`, `top-project-leader`, `best-manager`, `signature-2025-creator`, `mvp`) and required fields (`id`, `slug`, `name`, `description`, `imageUrl`) | `tests/unit/homepage/awards-data.test.ts`
- [x] T014 Create static awards data file with 6 `Award[]` objects matching slugs above (must pass T013) | `src/libs/data/awards.ts`
- [x] T015 Verify skeleton `src/app/page.tsx` (RSC: fetches user session via `createClient()`, reads `user.user_metadata.avatar_url`, renders all section components within `<main className="overflow-x-hidden bg-[#00101A]">`) | `src/app/page.tsx`

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Stories 1 & 2 — Hero, Header & Countdown (Priority: P1) 🎯 MVP

**Goal (US1)**: Full header with logo, sticky nav, right icons + hero section with ROOT FURTHER keyvisual, CTA buttons; all navigation flows working

**Goal (US2)**: Real-time countdown (Days/Hours/Minutes) auto-updating every minute; event info display (time, venue, livestream note)

**Independent Test (US1)**: Render `<HomepageHeader>` → assert logo, all nav links, language selector, bell icon, account icon present; click "About SAA 2025" → `window.scrollTo` called; click "Awards Information" → href = `/awards-information`

**Independent Test (US2)**: Render `<Countdown>` with mock date 30 days before event → assert digits displayed; advance time 1 minute → assert minutes decremented; mock date past event → assert "Coming soon" hidden + all digits "00"

### Tests First — Write Failing Tests (US1 + US2)

- [x] T016 [P] Write FAILING unit test for `<NavScrollLink>`: click triggers `window.scrollTo({ top: 0, behavior: 'smooth' })` (mock via `Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true })`) | `tests/unit/homepage/nav-scroll-link.test.tsx`
- [x] T017 [P] Write FAILING unit test for `<HomepageHeader>`: renders logo, nav links, `<LanguageSelector>`, notification bell, account icon; "Awards Information" href = `/awards-information`; "Sun* Kudos" href = `/sun-kudos`; logo links to `/` | `tests/unit/homepage/header.test.tsx`
- [x] T018 [P] Write FAILING unit tests for `<Countdown>`: (a) renders days/hours/minutes with correct 0-padded values given mock date; (b) "Coming soon" visible before event; (c) "Coming soon" hidden + all "00" after event; (d) uses `Date.now()` re-evaluated per tick (not drift-prone counter) | `tests/unit/homepage/countdown.test.tsx`
- [x] T019 [P] Write FAILING unit tests for `<EventInfo>`: (a) formats date as "26/12/2025" using `Intl.DateTimeFormat`; (b) formats time as "18h30" (NOT "18:30:00"); (c) renders venue and livestream note; (d) missing/invalid `NEXT_PUBLIC_EVENT_DATETIME` → renders empty string gracefully | `tests/unit/homepage/event-info.test.tsx`

### Icons (parallel, no story dependencies)

- [x] T020 [P] Create `<ArrowIcon>` (two sizes: 24×24 for CTA buttons, 20×20 for "Chi tiết" links, SVG) | `src/app/_components/icons/arrow-icon.tsx`
- [x] T021 [P] Create `<NotificationBellIcon>` (24×24, SVG, `aria-label="Thông báo"`) | `src/app/_components/icons/notification-bell-icon.tsx`
- [x] T022 [P] Create `<AccountIcon>` (40×40 placeholder circle, SVG, `aria-label="Tài khoản"`) | `src/app/_components/icons/account-icon.tsx`

### Implementation (US1)

- [x] T023 [P] [US1] Create `<NavScrollLink>` ("use client", onClick: `window.scrollTo({ top: 0, behavior: 'smooth' })`; renders as `<button>` styled as nav link); must pass T016 | `src/app/_components/homepage/nav-scroll-link.tsx`
- [x] T024 [US1] Create `<HomepageHeader>` (RSC, `sticky top-0 z-10`, bg: `--color-homepage-header-bg` with `backdrop-blur`; logo `<Image>` → href `/`; nav `hidden md:flex` with `<NavScrollLink>` for "About SAA 2025" always-selected, `<Link>` for "Awards Information" + "Sun* Kudos"; right icons: reuse `<LanguageSelector />` from `layout/language-selector.tsx` + `<NotificationBellIcon>` + `<Image avatarUrl>` or `<AccountIcon>` placeholder; accepts `avatarUrl?: string` prop); must pass T017 | `src/app/_components/homepage/header.tsx`
- [x] T025 [P] [US1] Create `<CtaButtons>` (RSC, two `<Link>` buttons: "ABOUT AWARDS" → `/awards-information`, "ABOUT KUDOS" → `/sun-kudos`; outlined default, hover → filled yellow; transition 200ms ease-out; `flex-col md:flex-row`) | `src/app/_components/homepage/cta-buttons.tsx`

### Implementation (US2)

- [x] T026 [P] [US2] Create `<Countdown>` ("use client", `useEffect` with `setInterval(tick, 60_000)` + cleanup; `Date.now()` re-evaluated each tick; zero-pad via `String(n).padStart(2,'0')`; hide "Coming soon" when `isEventPast`; pass `targetDateIso` prop); must pass T018 | `src/app/_components/homepage/countdown.tsx`
- [x] T027 [P] [US2] Create `<EventInfo>` (RSC, reads `NEXT_PUBLIC_EVENT_DATETIME` + `NEXT_PUBLIC_EVENT_LOCATION`; custom time format `${h}h${m}`; `Intl.DateTimeFormat('vi-VN', ...)` for date; graceful fallback on invalid env var); must pass T019 | `src/app/_components/homepage/event-info.tsx`

### Hero Section (US1 + US2)

- [x] T028 [US1] [US2] Create `<HeroSection>` (RSC; `<section className="relative min-h-[calc(100vh-80px)] overflow-hidden">`; keyvisual `<Image fill priority className="object-cover" src="/images/homepage/hero-keyvisual.png" />`; gradient overlay; content div `relative z-10 px-[144px] py-[96px] flex flex-col gap-[120px]`; ROOT FURTHER image `root-further-hero.png` 451×200; contains `<Countdown>`, `<EventInfo>`, `<CtaButtons>`) | `src/app/_components/homepage/hero-section.tsx`

### Wire up homepage page (US1 + US2)

- [x] T029 [US1] [US2] Verify `src/app/page.tsx` renders `<HomepageHeader avatarUrl={avatarUrl}>` + `<HeroSection>` within `<main className="overflow-x-hidden bg-[#00101A]">` | `src/app/page.tsx`

**Checkpoint**: US1 + US2 complete — hero, header, countdown, navigation all independently testable

---

## Phase 4: User Stories 3 & 4 — Awards, Kudos & Footer (Priority: P2)

**Goal (US3)**: Awards section with 6-card responsive grid (2-col mobile, 3-col desktop); each card links to `/awards-information#{slug}`

**Goal (US4)**: Sun* Kudos promo section with description, KUDOS logo image, and "Chi tiết" CTA → `/sun-kudos`

**Independent Test (US3)**: Render `<AwardsSection>` with static awards data → assert 6 cards render; click card "Chi tiết" → href = `/awards-information#top-talent`; at mobile width → `grid-cols-2`

**Independent Test (US4)**: Render `<SunkudosSection>` → assert "Chi tiết" button href = `/sun-kudos`

### Tests First — Write Failing Tests (US3 + US4)

- [x] T030 [P] Write FAILING unit tests for `<AwardCard>`: (a) renders image, title, description, "Chi tiết" link; (b) link href = `/awards-information#{slug}`; (c) image has `loading="lazy"`; (d) hover class applied | `tests/unit/homepage/award-card.test.tsx`
- [x] T031 [P] Write FAILING unit tests for `<HomepageFooter>`: (a) renders SAA logo; (b) nav links: "About SAA 2025" → `/`, "Awards Information" → `/awards-information`, "Sun* Kudos" → `/sun-kudos`; (c) renders copyright "Bản quyền thuộc về Sun* © 2025" | `tests/unit/homepage/footer.test.tsx`

### Implementation (US3)

- [x] T032 [P] [US3] Create `<B4Content>` (RSC; ROOT FURTHER images `root-further-b4-1.png` + `root-further-b4-2.png`; descriptive paragraph text; container `max-w-[1152px] mx-auto px-12 py-16 md:px-[104px] md:py-[120px] rounded-[8px] flex flex-col items-center`) | `src/app/_components/homepage/b4-content.tsx`
- [x] T033 [P] [US3] Create `<AwardCard>` (RSC; wraps in `<Link href="/awards-information#{slug}">`; `<Image width={336} height={336} loading="lazy">`; gold title 24px/#FFEA9E; description 16px/white `line-clamp-2`; "Chi tiết →" with `<ArrowIcon>`; hover: `hover:-translate-y-1 hover:shadow-[...]` transition 200ms); must pass T030 | `src/app/_components/homepage/award-card.tsx`
- [x] T034 [US3] Create `<AwardsSection>` (RSC; C1 header: caption + 1px divider `#2E3940` + "Hệ thống giải thưởng" 57px/#FFEA9E — **no sub-description text** per US3 spec; C2 grid: `grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-[repeat(3,336px)] lg:gap-x-[108px] lg:gap-y-20`; maps `awardsData` → 6 `<AwardCard>` with `w-full lg:w-[336px]`) | `src/app/_components/homepage/awards-section.tsx`

### Implementation (US4)

- [x] T035 [P] [US4] Create `<SunkudosSection>` (RSC; `flex-col md:flex-row`; text left: label "Phong trào ghi nhận", title "Sun* Kudos", description, "Chi tiết" gold `<Link href="/sun-kudos">`; right: KUDOS logo `<Image src="/images/homepage/kudos-logo.svg">`; section uses `kudos-section-bg.png` as background) | `src/app/_components/homepage/sunkudos-section.tsx`
- [x] T036 [US3] [US4] Create `<HomepageFooter>` (RSC; `flex-row justify-between`; logo `<Image>`; nav links `gap-[80px]`: "About SAA 2025" → `/`, "Awards Information" → `/awards-information`, "Sun* Kudos" → `/sun-kudos`, "Tiêu chuẩn chung" → `/tieu-chuan-chung`; copyright; `border-t border-[#2E3940]`); must pass T031 | `src/app/_components/homepage/footer.tsx`

### Wire up homepage page (US3 + US4)

- [x] T037 [US3] [US4] Verify `src/app/page.tsx` renders `<B4Content>`, `<AwardsSection>`, `<SunkudosSection>`, `<HomepageFooter>` in page shell | `src/app/page.tsx`

**Checkpoint**: US3 + US4 complete — all content sections rendered and independently testable

---

## Phase 5: User Story 5 — Floating Widget Button (Priority: P3)

**Goal**: Fixed FAB pill button at bottom-right; click toggles `isMenuOpen` state (menu content is Out of Scope)

**Independent Test**: Render `<WidgetButton>` → assert `position: fixed`; click → `isMenuOpen` toggles; `aria-label="Thao tác nhanh"` present; `aria-expanded` attribute changes

### Tests First

- [x] T038 Write FAILING unit tests for `<WidgetButton>`: (a) renders with fixed positioning; (b) click toggles `isMenuOpen` state; (c) has `aria-label="Thao tác nhanh"`; (d) `aria-expanded` is "false" initially, "true" after click; (e) contains pen icon and SAA icon | `tests/unit/homepage/widget-button.test.tsx`

### Icons + Implementation (US5)

- [x] T039 [P] Create `<WidgetPenIcon>` (SVG, pen icon for widget button) | `src/app/_components/icons/widget-pen-icon.tsx`
- [x] T040 [P] Create `<WidgetSaaIcon>` (SVG, SAA mini logo for widget button) | `src/app/_components/icons/widget-saa-icon.tsx`
- [x] T041 [US5] Create `<WidgetButton>` ("use client"; `fixed bottom-10 right-[19px] w-[106px] h-16 rounded-full`; bg `--color-accent-gold`; shadow `--shadow-glow-gold`; `useState(false)` for `isMenuOpen`; `aria-label="Thao tác nhanh"`, `aria-expanded={isMenuOpen}`; contains `<WidgetPenIcon>` + `<WidgetSaaIcon>`; click → toggles `isMenuOpen`, renders empty `<div role="menu" aria-hidden>` when open); must pass T038 | `src/app/_components/homepage/widget-button.tsx`
- [x] T042 [US5] Verify `src/app/page.tsx` renders `<WidgetButton>` as sibling to `<main>` (fixed positioning self-manages) | `src/app/page.tsx`

**Checkpoint**: US5 complete — all user stories implemented

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, responsive verification, performance, metadata

- [x] T043 Add `export const metadata: Metadata = { title: 'SAA 2025 — Homepage' }` to homepage page | `src/app/page.tsx`
- [x] T044 [P] Verify responsive layout: header nav `hidden md:flex`; CTA buttons `flex-col md:flex-row`; Sunkudos `flex-col md:flex-row`; award grid `grid-cols-2` mobile (< 768px) → `lg:grid-cols-[repeat(3,336px)]` desktop (≥ 1024px) | across `src/app/_components/homepage/`
- [x] T045 [P] Verify ARIA labels: notification bell `aria-label="Thông báo"`; account icon `aria-label="Tài khoản"`; widget button `aria-label="Thao tác nhanh"` + `aria-expanded` | `src/app/_components/homepage/`
- [x] T046 [P] Add focus rings on all interactive elements via Tailwind `focus-visible:ring-2 focus-visible:ring-[--color-accent-gold] focus-visible:outline-none` (header nav links, CTA buttons, award cards, footer nav links, widget button) | `src/app/_components/homepage/`
- [x] T047 Verify no horizontal scroll at 320px viewport: all containers have `overflow-x-hidden` or `max-w-full`; visual check in DevTools at 320px | `src/app/page.tsx` + homepage components
- [x] T048 Verify Lighthouse Performance ≥ 90: `yarn build && npx lighthouse http://localhost:3000/ --only-categories=performance`; confirm hero `priority`, award images `loading="lazy"`, `font-display: swap` | verification task

---

## Phase 7: Integration & E2E Tests

**Purpose**: End-to-end verification of the full homepage across all user stories

- [x] T049 [P] Write integration test: `src/app/page.tsx` + mock Supabase `getUser` (returns user with `avatar_url`) → render full page → assert SAA logo present, awards section with 6 "Chi tiết" links, Sunkudos section, footer copyright | `tests/integration/dashboard-page.test.tsx`
- [x] T050 [P] Write integration test: render full page with no avatar_url → `<AccountIcon>` placeholder rendered (no `<Image>` for avatar) | `tests/integration/dashboard-page.test.tsx`
- [x] T051 Write E2E test (Playwright, mocked Supabase auth): (a) visit `/` authenticated → assert countdown visible + `<link>` "Chi tiết" count ≥ 6; (b) click "ABOUT AWARDS" → URL = `/awards-information`; (c) click "ABOUT KUDOS" → URL = `/sun-kudos`; (d) click award `a[href*="#top-talent"]` → URL = `/awards-information#top-talent`; (e) unauthenticated visit `/` → redirected to `/login` | `tests/e2e/homepage.spec.ts`

**Checkpoint**: All tests passing (66+ tests) — homepage fully verified

---

## Phase 8: Remaining Open Items 🔴 TODO

**Purpose**: Fix the 2 outstanding issues identified in plan review

### T_FONT — Acquire Digital Numbers Font

- [ ] T052 Source `digital-numbers.woff2` from open-source font library (e.g. fontlibrary.org or github.com/dmgottwald/digital-7); verify open-source license; place at `public/fonts/digital-numbers/digital-numbers.woff2` | `public/fonts/digital-numbers/digital-numbers.woff2`
  - `@font-face` block already in `globals.css` pointing to this path — no CSS change needed once file is present
  - After adding: `yarn dev` → verify countdown digits render in Digital Numbers font (not monospace)

### T_COUNTDOWN_BUG — Fix Countdown Digit Tile Layout

- [x] T053 Update `countdown.test.tsx` to add FAILING assertions: given `days=7`, render produces TWO separate tile elements — one containing "0" and one containing "7" — NOT a single element containing "07"; gap between tiles is 4px | `tests/unit/homepage/countdown.test.tsx`
  - Run test to confirm it fails before fixing implementation
- [x] T054 Fix `countdown.tsx`: replace `DigitTile` (single div per 2-char value) with `DigitGroup` (flex-row with 4px gap) containing TWO `<SingleDigitTile>` components — one per character; each `SingleDigitTile` is a `51×82px` div with `border: 0.5px solid #FFEA9E`, `backdrop-filter: blur(17px)`, displaying ONE digit character in Digital Numbers font; unit label below the group; run tests to confirm T053 passes | `src/app/_components/homepage/countdown.tsx`

  **Reference implementation:**
  ```tsx
  function SingleDigitTile({ char }: { char: string }) {
    return (
      <div
        className="flex items-center justify-center w-[51px] h-[82px] rounded-md backdrop-blur-[17px]"
        style={{ border: '0.5px solid #FFEA9E' }}
      >
        <span
          className="text-white text-[49px] leading-none font-normal"
          style={{ fontFamily: 'var(--font-digital, monospace)' }}
        >
          {char}
        </span>
      </div>
    )
  }

  function DigitGroup({ value, label }: { value: string; label: string }) {
    const [d1, d2] = value.split('') // "07" → ["0", "7"]
    return (
      <div className="flex flex-col items-center gap-[16px]">
        <div className="flex flex-row gap-[4px]">
          <SingleDigitTile char={d1} />
          <SingleDigitTile char={d2} />
        </div>
        <span className="font-montserrat font-bold text-[24px] leading-[32px] text-white">
          {label}
        </span>
      </div>
    )
  }
  ```

**Checkpoint**: T052–T054 complete → Digital Numbers font renders, countdown shows correct individual tiles per digit

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup/Assets)     → can start immediately
Phase 2 (Foundation)       → depends on Phase 1; BLOCKS all user story phases
Phase 3 (US1+US2)          → depends on Phase 2
Phase 4 (US3+US4)          → depends on Phase 2 (can run parallel with Phase 3)
Phase 5 (US5)              → depends on Phase 2 (can run parallel with Phase 3+4)
Phase 6 (Polish)           → depends on Phase 3+4+5
Phase 7 (Integration+E2E)  → depends on Phase 6
Phase 8 (Open Items)       → independent; T052 can start anytime; T053/T054 need Phase 3 done
```

### Within Each Phase

- Tests MUST be written and **verified to fail** before corresponding implementation tasks
- Icons (T020–T022, T039–T040) are parallel; implement any time after Phase 2
- Foundation config tasks (T008–T012) are parallel within Phase 2
- `page.tsx` wire-up tasks (T029, T037, T042) are sequential (each depends on prior sections)

### Parallel Opportunities

| Group | Tasks | Can Parallelize? |
|-------|-------|-----------------|
| Asset downloads | T001–T005 | ✅ All in parallel |
| Foundation config | T008–T012 | ✅ T008, T009, T010+T011, T012 in parallel |
| P1 failing tests | T016–T019 | ✅ All in parallel |
| P1 icons | T020–T022 | ✅ All in parallel |
| P1 components | T023, T025–T027 | ✅ All in parallel |
| P2 failing tests | T030–T031 | ✅ Both in parallel |
| P2 components | T032, T033, T035 | ✅ All in parallel |
| Polish | T044–T046 | ✅ All in parallel |
| Integration+E2E | T049–T050 | ✅ Both in parallel |
| Open items | T052 vs T053+T054 | ✅ Font (T052) independent of countdown fix (T053+T054) |

---

## Implementation Strategy

### Current State (Patch Mode)

Since Phases 1–7 are complete, only Phase 8 remains:

1. **T052**: Drop font file into `public/fonts/digital-numbers/digital-numbers.woff2` → verify countdown font in browser
2. **T053**: Add failing test assertions for 2-tile countdown layout
3. **T054**: Fix `countdown.tsx` with `DigitGroup` + `SingleDigitTile` → run `yarn test` → confirm all passing

### MVP First (for reference)

1. Phase 1 (assets) + Phase 2 (foundation)
2. Phase 3 (US1+US2 — hero, header, countdown)
3. **STOP and VALIDATE**: `yarn dev` → verify hero renders, countdown ticks, navigation works
4. Deploy MVP if ready

### Incremental Delivery

1. Phase 1 + 2 → Phase 3 → verify → merge
2. Phase 4 → verify → merge
3. Phase 5 → verify → merge
4. Phase 6 + 7 → final polish + E2E → merge to main
5. Phase 8 → font + countdown fix → merge

---

## Summary

| Metric | Count |
|--------|-------|
| **Total tasks** | **54** |
| Phase 1 (Setup/Assets) | 7 |
| Phase 2 (Foundation) | 8 |
| Phase 3 (US1+US2 — Hero + Header + Countdown) | 14 |
| Phase 4 (US3+US4 — Awards + Kudos + Footer) | 8 |
| Phase 5 (US5 — Widget) | 5 |
| Phase 6 (Polish) | 6 |
| Phase 7 (Integration+E2E) | 3 |
| **Phase 8 (Open Items — REMAINING)** | **3** |
| Tasks completed `[x]` | 51 |
| Tasks remaining `[ ]` | **3** (T006, T053, T054) |
| Tasks marked [P] (parallelizable) | 28 |
| Test tasks (TDD) | 12 |

### MVP Scope (Phase 3 target)

US1 + US2: header, hero section, countdown, event info, CTA buttons. Independently testable at `/` after login.

---

## Notes

- Mark tasks complete as you go: `- [x]`
- Commit after each phase or logical group (per `/momorph.commit`)
- Run `yarn test` after each phase before starting the next
- `src/app/page.tsx` must stay ≤ 40 lines (imports + JSX shell only — all logic delegated to section components)
- Login components (`layout/header.tsx`, `layout/footer.tsx`) are **NOT modified** — homepage uses its own `homepage/header.tsx` and `homepage/footer.tsx`
- Footer has **4 nav links** (more than header's 3): "About SAA 2025" → `/`, "Awards Information", "Sun* Kudos", **"Tiêu chuẩn chung"** → `/tieu-chuan-chung` (footer-only)
- Widget button menu content is **Out of Scope** — only toggle + empty `<div role="menu">` implemented
- Hamburger mobile nav is **Out of Scope** — header nav hidden on mobile via `hidden md:flex`
