# Tasks: FAB + Thể lệ Flow

**Frame**: `313_9137` + `313_9139` + `3204_6051`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2)
- **|**: File path affected by this task

---

## User Story Mapping

| Story | Title | Priority | Scope |
|-------|-------|----------|-------|
| US1 | FAB Expand/Collapse with menu | P1 | 313:9137 US1 + 313:9139 US1-US3 |
| US2 | Thể lệ Rules Panel | P1 | 3204:6051 US1-US5 |

---

## Phase 1: Setup (Assets & Infrastructure)

**Purpose**: Download assets and add CSS variables

- [x] T001 Download 4 Hero badge images from Figma (component set `3007:17505`: New Hero, Rising Hero, Super Hero, Legend Hero) and save to `public/images/rules/` as `badge-new-hero.png`, `badge-rising-hero.png`, `badge-super-hero.png`, `badge-legend-hero.png` | public/images/rules/
- [x] T002 Download 6 collectible icon images from Figma (component set `737:20452`: REVIVAL `737:20446`, TOUCH OF LIGHT `737:20450`, STAY GOLD `737:20449`, FLOW TO HORIZON `737:20447`, BEYOND THE BOUNDARY `737:20448`, ROOT FURTHER `737:20451`) and save to `public/images/rules/` as `icon-revival.png`, `icon-touch-of-light.png`, `icon-stay-gold.png`, `icon-flow-to-horizon.png`, `icon-beyond-the-boundary.png`, `icon-root-further.png` | public/images/rules/
- [x] T003 Add 3 CSS variables to `globals.css` under the `/* === Sun* Kudos Live Board tokens === */` section: `--spacing-fab-expanded-gap: 20px`, `--color-fab-close: rgba(212, 39, 29, 1)`, `--radius-fab-btn: 4px` | src/app/globals.css

---

## Phase 2: Foundation (Shared Components)

**Purpose**: Create building block components needed by both US1 and US2

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 [P] Write FAILING unit test for `CloseIcon`: renders SVG with default 24x24 size; accepts `size` and `color` props; has `aria-hidden="true"` | tests/unit/icons/close-icon.test.tsx
- [x] T005 [P] Write FAILING unit test for `HeroBadge`: renders badge pill with tier name; accepts `tier` prop (`'new' | 'rising' | 'super' | 'legend'`); renders correct tier label text ("New Hero", "Rising Hero", "Super Hero", "Legend Hero"); renders badge background image from `public/images/rules/badge-{tier}-hero.png`; has border `1px solid #FFEA9E` and `border-radius: 56px` | tests/unit/sun-kudos/hero-badge.test.tsx
- [x] T006 [P] Write FAILING unit test for `CollectibleIcon`: renders circular image (64x64, border-radius 100%, 2px white border) with `next/image`; renders name label below image (Montserrat 700, 11-12px, white, center-aligned); accepts `name` and `imageSrc` props; shows fallback placeholder circle (bg: #1a1a2e) when image fails to load | tests/unit/sun-kudos/collectible-icon.test.tsx
- [x] T007 [P] Create `CloseIcon` component — SVG X icon, props: `size?: number` (default 24), `color?: string` (default 'currentColor'), `className?: string`; uses `aria-hidden="true"`; follows pattern from existing `pen-icon.tsx` | src/app/_components/icons/close-icon.tsx
- [x] T008 [P] Create `HeroBadge` component — renders badge pill; props: `tier: 'new' | 'rising' | 'super' | 'legend'`; maps tier to label, image path, and special styles (Legend Hero gets glow effect `text-shadow: 0 0 1.5px #FFF`); width 126px, height 22px, border `1px solid var(--color-accent-gold)`, border-radius 56px; font: Montserrat 700 13px white with text-shadow `0 0.5px 1.8px #000` | src/app/_components/sun-kudos/hero-badge.tsx
- [x] T009 [P] Create `CollectibleIcon` component — renders circular badge image + label; props: `name: string`, `imageSrc: string`; image: 64x64 `next/image` with `border-2 border-white rounded-full`; label: Montserrat 700 11px white centered below; container: flex-col items-center gap-2 w-20; onError handler shows fallback placeholder | src/app/_components/sun-kudos/collectible-icon.tsx
- [x] T010 Verify all 3 foundation component tests PASS (run `vitest run tests/unit/icons/close-icon.test.tsx tests/unit/sun-kudos/hero-badge.test.tsx tests/unit/sun-kudos/collectible-icon.test.tsx`)

**Checkpoint**: Foundation ready — all building blocks created and tested

---

## Phase 3: User Story 1 — FAB Expand/Collapse with Menu (Priority: P1) 🎯 MVP

**Goal**: Extend existing `WidgetButton` so clicking it reveals "Thể lệ", "Viết KUDOS", and Close buttons; clicking Close or pressing Escape collapses back; clicking outside collapses back.

**Independent Test**: Click the FAB → 3 buttons appear ("Thể lệ" 149x64, "Viết KUDOS" 214x64, Close 56x56 red circle). Click Close → buttons disappear. Press Escape → buttons disappear. Click outside → buttons disappear. Tab cycles through buttons. Each button has `role="menuitem"`.

### Tests (US1) — TDD: Write FIRST

- [x] T011 [US1] Write FAILING tests extending `tests/unit/homepage/widget-button.test.tsx` — update existing test #3 ("toggles isMenuOpen state on click") to expect 3 `role="menuitem"` buttons instead of empty menu div; update test #4 ("renders pen icon and SAA icon") if SVG count changes; add new tests: (a) expanded menu has `role="menu"` container; (b) "Thể lệ" button renders with text "Thể lệ" and `WidgetSaaIcon`; (c) "Viết KUDOS" button renders with text "Viết KUDOS" and `WidgetPenIcon`; (d) Close button renders with red bg `#D4271D` and `CloseIcon`; (e) Escape key calls collapse; (f) `aria-expanded` is "false" initially, "true" after click; (g) buttons have correct dimensions (149x64, 214x64, 56x56) | tests/unit/homepage/widget-button.test.tsx

### Implementation (US1)

- [x] T012 [US1] Modify `WidgetButton` — replace empty `<div role="menu">` with expanded menu container: `fixed z-50 flex flex-col items-end gap-[var(--spacing-fab-expanded-gap)]`; positioned same bottom-right as collapsed FAB; contains 3 buttons: (A) "Thể lệ" — `w-[149px] h-16 bg-[var(--color-accent-gold)] rounded-[var(--radius-fab-btn)] flex items-center gap-2 px-4` with `<WidgetSaaIcon />` + text "Thể lệ" (Montserrat 700 24px `text-[var(--color-bg-dark)]`), `role="menuitem"`; (B) "Viết KUDOS" — `w-[214px] h-16` same style with `<WidgetPenIcon />` + text "Viết KUDOS", `role="menuitem"`; (C) Close — `w-14 h-14 bg-[var(--color-fab-close)] rounded-full flex items-center justify-center` with `<CloseIcon color="white" />`, `role="menuitem"` | src/app/_components/homepage/widget-button.tsx
- [x] T013 [US1] Add click-outside handler to `WidgetButton` — `useRef` for menu container + `useEffect` with `mousedown` listener on `document` (reuse pattern from `highlight-carousel.tsx:42-53`); if click target is outside ref, call `setIsMenuOpen(false)` | src/app/_components/homepage/widget-button.tsx
- [x] T014 [US1] Add Escape key handler to `WidgetButton` — `useEffect` with `keydown` listener; if `event.key === 'Escape'` and `isMenuOpen`, call `setIsMenuOpen(false)` and return focus to FAB trigger button via `useRef` | src/app/_components/homepage/widget-button.tsx
- [x] T015 [US1] Wire "Thể lệ" button click — add `isRulesOpen` state (`useState(false)`); onClick: `setIsRulesOpen(true)`, `setIsMenuOpen(false)`; conditionally render `<RulesPanel isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />` (component will be created in US2, import can be lazy) | src/app/_components/homepage/widget-button.tsx
- [x] T016 [US1] Wire "Viết KUDOS" button click — stub behavior: `setIsMenuOpen(false)`; add `// TODO: navigate to Viết Kudo form when Frame 520:11602 is implemented` comment | src/app/_components/homepage/widget-button.tsx
- [x] T017 [US1] Wire Close button click — onClick: `setIsMenuOpen(false)` | src/app/_components/homepage/widget-button.tsx
- [x] T018 [US1] Verify all WidgetButton tests PASS (run `vitest run tests/unit/homepage/widget-button.test.tsx`)

**Checkpoint**: User Story 1 complete — FAB expand/collapse works with 3 menu buttons, keyboard nav, and click-outside dismiss

---

## Phase 4: User Story 2 — Thể lệ Rules Panel (Priority: P1)

**Goal**: Build the slide-in rules panel showing Hero badge tiers, collectible icon grid, and Kudos Quốc Dân section with sticky footer buttons.

**Independent Test**: Click FAB → click "Thể lệ" → panel slides in from right with title "Thể lệ", 4 Hero badge tiers (New Hero 1-4, Rising Hero 5-9, Super Hero 10-20, Legend Hero 20+), 6 icons in 3×2 grid, "Kudos Quốc Dân" section, footer with "Đóng" and "Viết KUDOS". Click "Đóng" → panel slides out. Press Escape → panel closes. Content scrolls, footer stays fixed.

### Tests (US2) — TDD: Write FIRST

- [x] T019 [US2] Write FAILING unit tests for `RulesPanel`: (a) renders nothing when `isOpen={false}`; (b) renders panel with `role="dialog"` and `aria-modal="true"` when `isOpen={true}`; (c) has `aria-labelledby` pointing to title element; (d) Escape key calls `onClose`; (e) panel has z-index 60 (above FAB z-50); (f) panel width is 553px | tests/unit/sun-kudos/rules-panel.test.tsx
- [x] T020 [P] [US2] Write FAILING unit tests for `RulesPanelContent`: (a) renders title "Thể lệ" with Montserrat 700 45px gold; (b) renders section heading "NGƯỜI NHẬN KUDOS: HUY HIỆU HERO CHO NHỮNG ẢNH HƯỞNG TÍCH CỰC"; (c) renders 4 `HeroBadge` components; (d) renders threshold text for each tier ("Có 1-4 người gửi Kudos cho bạn", "Có 5-9...", "Có 10–20...", "Có hơn 20..."); (e) renders section heading containing "NGƯỜI GỬI KUDOS"; (f) renders 6 `CollectibleIcon` components (REVIVAL, TOUCH OF LIGHT, STAY GOLD, FLOW TO HORIZON, BEYOND THE BOUNDARY, ROOT FURTHER); (g) renders "KUDOS QUỐC DÂN" heading; (h) renders footer with "Đóng" and "Viết KUDOS" buttons | tests/unit/sun-kudos/rules-panel-content.test.tsx

### Implementation (US2)

- [x] T021 [US2] Create `RulesPanel` component (`'use client'`) — props: `isOpen: boolean`, `onClose: () => void`; renders `null` when `!isOpen`; when open: `fixed right-0 top-0 h-screen w-[553px] md:w-[450px] max-md:w-screen bg-[var(--color-kudos-container-dark)] z-60 flex flex-col justify-between p-[24px_40px_40px_40px] overflow-y-auto`; `role="dialog"`, `aria-modal="true"`, `aria-labelledby="rules-panel-title"`; slide-in via CSS transition `transform translateX(100%) → translateX(0)` 300ms ease-out; Escape key handler calls `onClose`; `useEffect` to reset scrollTop to 0 on open; `useRef` for scroll container | src/app/_components/sun-kudos/rules-panel.tsx
- [x] T022 [US2] Create `RulesPanelContent` component (server component, no `'use client'`) — renders all static content: Title section (`id="rules-panel-title"`, "Thể lệ", Montserrat 700 45px/52px `text-[var(--color-accent-gold)]`); Section 1 "Người nhận Kudos" (heading 22px/28px gold + description 16px/24px white justified + 4 badge tier rows each with `<HeroBadge>` + threshold text 16px white + description text 14px/20px white); Section 2 "Người gửi Kudos" (heading 22px/28px gold + description 16px/24px white + 3×2 grid `flex flex-wrap gap-4 px-6` of `<CollectibleIcon>` + completion note); Section 3 "KUDOS QUỐC DÂN" (heading 24px/32px gold + description 16px/24px white). All Vietnamese text hardcoded from Figma. | src/app/_components/sun-kudos/rules-panel-content.tsx
- [x] T023 [US2] Add footer to `RulesPanel` — sticky bottom section: `flex gap-4 w-full`; Button "Đóng": `flex items-center justify-center gap-2 px-4 py-4 bg-[var(--color-btn-kudos-bg)] border border-[var(--color-btn-kudos-border)] rounded-[var(--radius-fab-btn)]` with `<CloseIcon size={24} color="white" />` + text "Đóng" (Montserrat 700 16px white); onClick calls `onClose`. Button "Viết KUDOS": `flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-[var(--color-accent-gold)] rounded-[var(--radius-fab-btn)] h-14` with `<WidgetPenIcon />` + text "Viết KUDOS" (Montserrat 700 16px `text-[var(--color-bg-dark)]`); onClick stubs: calls `onClose` + `// TODO: navigate to Viết Kudo form` | src/app/_components/sun-kudos/rules-panel.tsx
- [x] T024 [US2] Wire `RulesPanel` into `WidgetButton` — ensure `<RulesPanel isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />` is rendered; verify FAB is hidden or beneath panel when rules are open (z-index 60 vs 50) | src/app/_components/homepage/widget-button.tsx
- [x] T025 [US2] Verify all RulesPanel tests PASS (run `vitest run tests/unit/sun-kudos/`)

**Checkpoint**: User Story 2 complete — Thể lệ panel displays all rules content with working close button

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Animations, keyboard accessibility, responsive behavior, edge cases

- [x] T026 [P] Add stagger animation to FAB expanded menu — each button appears with delay: button A (50ms), button B (100ms), button C (150ms); use Tailwind `transition-all duration-150 ease-out` with `opacity-0 translate-y-2` → `opacity-100 translate-y-0`; collapse animation: `duration-200 ease-in` | src/app/_components/homepage/widget-button.tsx
- [x] T027 [P] Add slide animation to RulesPanel — open: `transition-transform duration-300 ease-out translate-x-full → translate-x-0`; close: `duration-250 ease-in translate-x-0 → translate-x-full`; content fade: `transition-opacity duration-200 ease-out` | src/app/_components/sun-kudos/rules-panel.tsx
- [x] T028 [P] Add hover/focus/active states to FAB expanded buttons — "Thể lệ" & "Viết KUDOS": hover `bg-[#F5E08E] shadow-[0_2px_8px_0_rgba(0,0,0,0.2)]`, active `bg-[#EBD67E] scale-[0.98]`, focus `outline-2 outline-[var(--color-accent-gold)] outline-offset-2`; Close button: hover `bg-[#B8221A]`, active darkened, focus `outline-2 outline-[var(--color-fab-close)] outline-offset-2`; "Đóng" footer: hover `bg-[rgba(255,234,158,0.20)]`; "Viết KUDOS" footer: hover `bg-[#F5E08E]` | src/app/_components/homepage/widget-button.tsx, src/app/_components/sun-kudos/rules-panel.tsx
- [x] T029 [P] Add focus trap to RulesPanel — on open, focus moves to first focusable element (panel title or close button); Tab cycles only within panel; Shift+Tab wraps to last element; on close, focus returns to "Thể lệ" FAB button (use `useRef` to store trigger) | src/app/_components/sun-kudos/rules-panel.tsx
- [x] T030 [P] Add responsive styles — FAB: `right-4 md:right-[19px]`; RulesPanel: `w-screen md:w-[450px] lg:w-[553px]`, padding `p-4 p-5 md:p-[20px_32px_32px] lg:p-[24px_40px_40px]`, title `text-[32px] lg:text-[45px]` | src/app/_components/homepage/widget-button.tsx, src/app/_components/sun-kudos/rules-panel.tsx
- [x] T031 [P] Add badge image fallback — in `CollectibleIcon`, `onError` handler on `next/image` sets local state to show fallback `div` with `bg-[#1a1a2e] rounded-full w-16 h-16 flex items-center justify-center` and badge name text centered | src/app/_components/sun-kudos/collectible-icon.tsx
- [x] T032 Write E2E test for full FAB → Thể lệ flow — Playwright test: (1) navigate to `/sun-kudos`; (2) verify FAB visible (aria-label "Thao tác nhanh"); (3) click FAB → verify 3 menu buttons appear; (4) click "Thể lệ" → verify panel slides in with title "Thể lệ"; (5) verify 4 Hero badge tiers visible; (6) verify 6 collectible icons visible; (7) scroll panel content; (8) click "Đóng" → verify panel closes; (9) verify FAB returns to collapsed state; (10) Escape key test: open FAB → press Escape → verify collapsed | tests/e2e/fab-rules-flow.spec.ts

**Checkpoint**: All features complete with animations, accessibility, responsive behavior, and E2E coverage

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──→ Phase 2 (Foundation) ──→ Phase 3 (US1: FAB) ──→ Phase 4 (US2: Panel) ──→ Phase 5 (Polish)
                                                                  ↗ (US2 needs US1's isRulesOpen state wiring)
```

- **Phase 1** (T001-T003): No dependencies — start immediately
- **Phase 2** (T004-T010): Depends on Phase 1 (assets must exist for image tests)
- **Phase 3** (T011-T018): Depends on Phase 2 (needs `CloseIcon`); US1 is MVP
- **Phase 4** (T019-T025): Depends on Phase 2 (needs `HeroBadge`, `CollectibleIcon`) + Phase 3 T015 (needs `isRulesOpen` state in WidgetButton)
- **Phase 5** (T026-T032): Depends on Phase 3 + Phase 4 completion

### Within Each Phase

- Tests marked first MUST be written and FAIL before implementation begins (TDD)
- Tasks marked [P] within the same phase can run in parallel
- Non-[P] tasks must run sequentially

### Parallel Opportunities

| Phase | Parallel Tasks | Why Parallel |
|-------|---------------|--------------|
| Phase 1 | T001 + T002 | Different asset sets, no overlap |
| Phase 2 | T004 + T005 + T006 | Different test files |
| Phase 2 | T007 + T008 + T009 | Different component files |
| Phase 5 | T026 + T027 + T028 + T029 + T030 + T031 | Different files/concerns |

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Foundation)
2. Complete Phase 3 (US1: FAB Expand/Collapse only)
3. **STOP and VALIDATE**: Click FAB → 3 buttons appear → Close works → Escape works → Click-outside works
4. If MVP validates, proceed to Phase 4 (US2: Rules Panel)

### Incremental Delivery

1. Phase 1 + 2 → Foundation ready
2. Phase 3 → FAB expand/collapse works → Can demo
3. Phase 4 → Rules panel works → Can demo full flow
4. Phase 5 → Polished with animations, responsive, E2E → Production ready

---

## Summary

| Metric | Count |
|--------|-------|
| **Total tasks** | 32 |
| **Phase 1 (Setup)** | 3 tasks |
| **Phase 2 (Foundation)** | 7 tasks |
| **Phase 3 (US1: FAB)** | 8 tasks |
| **Phase 4 (US2: Panel)** | 7 tasks |
| **Phase 5 (Polish)** | 7 tasks |
| **Parallel opportunities** | 16 tasks parallelizable |
| **Test tasks** | 8 (TDD-first) |
| **Implementation tasks** | 18 |
| **Polish tasks** | 7 |
| **MVP scope** | Phase 1-3 (18 tasks) |

---

## Notes

- Commit after each completed task or logical group
- Run `vitest run` before moving to next phase
- Existing 4 tests in `tests/unit/homepage/widget-button.test.tsx` will be modified in T011 (not replaced)
- The "Viết KUDOS" button is a stub in both FAB menu (T016) and rules panel footer (T023) — both add `// TODO` comments
- All text content in `rules-panel-content.tsx` (T022) is hardcoded Vietnamese from the Figma design
- Mark tasks complete as you go: `- [x] T###`
