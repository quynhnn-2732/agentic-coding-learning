# Tasks: Dropdown Ngon Ngu (Language Selector with i18n)

**Frame**: `721-4942-dropdown-ngon-ngu`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3, US4, US5)
- **|**: File path affected by this task

---

## Phase 1: Setup (next-intl Infrastructure)

**Purpose**: Install `next-intl`, configure cookie-based locale resolution, create translation files, update test setup. App must build and run identically after this phase (default locale `vi`).

- [x] T001 Install `next-intl` dependency: `yarn add next-intl` | package.json
- [x] T002 Create i18n request config with cookie-based locale resolution — read `locale` cookie, validate against `['vi','en']`, fallback to `'vi'`, dynamic import `messages/{locale}.json` | src/i18n/request.ts
- [x] T003 Update Next.js config: wrap existing config with `createNextIntlPlugin('./src/i18n/request.ts')` | next.config.ts
- [x] T004 [P] Create Vietnamese translation file with Phase 1 keys: Header (5 keys), Footer (5 keys), Widget (4 keys), RulesPanel (3 keys), Language (1 key) — exact values from plan.md Translation Files section | messages/vi.json
- [x] T005 [P] Create English translation file with Phase 1 keys: same structure as vi.json with English translations — exact values from plan.md Translation Files section | messages/en.json
- [x] T006 Update root layout: convert to async function, add `getLocale()` + `getMessages()`, change `<html lang="vi">` to `<html lang={locale}>`, wrap children with `<NextIntlClientProvider messages={messages}>` as outermost provider (outside WriteKudoProvider) | src/app/layout.tsx
- [x] T007 Create shared test helper `IntlWrapper` that wraps children with `<NextIntlClientProvider locale="vi" messages={viMessages}>` for use in all unit tests | tests/helpers/intl-wrapper.tsx
- [x] T008 Update existing LanguageSelector tests to use dynamic import + IntlWrapper; verify all 4 existing tests still pass | tests/unit/language-selector.test.tsx
- [x] T009 Update existing WidgetButton tests to wrap renders with IntlWrapper; verify all existing tests still pass | tests/unit/homepage/widget-button.test.tsx
- [x] T010 Update existing Header tests to mock `getTranslations` from `next-intl/server`; verify all existing tests still pass | tests/unit/homepage/header.test.tsx
- [x] T011 Verify app builds successfully with `yarn build` and all existing tests pass with `yarn test`

**Checkpoint**: next-intl infrastructure complete. App renders identically with `vi` default. All existing tests green.

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Create new icon component needed by all language-related user stories.

**CRITICAL**: No user story work can begin until this phase is complete.

- [x] T012 [P] Create `GbFlagIcon` SVG component: 24x24 icon frame, inner Union Jack flag 20x15px, same interface as `VnFlagIcon` (`size` prop, `aria-hidden="true"`). Reference Figma component ID `178:967` | src/app/_components/icons/gb-flag-icon.tsx
- [x] T013 [P] Write unit test for `GbFlagIcon`: renders SVG with correct size, has `aria-hidden`, matches VnFlagIcon interface | tests/unit/icons/gb-flag-icon.test.tsx

**Checkpoint**: Foundation ready — GbFlagIcon component available for LanguageSelector.

---

## Phase 3: User Story 1 — Switch Language via Dropdown (Priority: P1) MVP

**Goal**: Clicking VN/EN in the dropdown switches all Phase 1 UI strings (header, footer, widget, rules-panel labels) to the selected language. Preference persists across page refreshes via cookie.

**Independent Test**: Render any authenticated page → click language dropdown → select "EN" → verify header/footer/widget text switches to English → refresh page → verify English persists.

### i18n Wiring (US1)

- [x] T014 [US1] Add `useTranslations('Language')` to LanguageSelector: replace hardcoded `aria-label="Select language"` with `t('selectLanguage')` | src/app/_components/layout/language-selector.tsx
- [x] T015 [US1] Update LanguageSelector to show dynamic flag icon per option: `VnFlagIcon` for `vi` option, `GbFlagIcon` for `en` option. Also update trigger button to show flag matching current `selected` locale (not always VnFlagIcon) | src/app/_components/layout/language-selector.tsx
- [x] T016 [US1] Make `HomepageHeader` an async function, add `const t = await getTranslations('Header')`, replace 5 hardcoded strings: logo aria-label → `t('goToHomepage')`, nav links → `t('aboutSaa')`, `t('awardsInfo')`, `t('sunKudos')`, bell aria-label → `t('notification')`. Pass translated text as children to NavScrollLink. | src/app/_components/homepage/header.tsx
- [x] T017 [US1] Make `HomepageFooter` an async function, add `const t = await getTranslations('Footer')`, restructure NAV_LINKS to use translation keys: move label resolution inside component body using `t()` calls. Replace copyright string with `t('copyright')`. | src/app/_components/homepage/footer.tsx
- [x] T018 [US1] Add `useTranslations('Widget')` to WidgetButton (already `'use client'`), replace 4 hardcoded strings: FAB aria-label → `t('quickAction')`, "Thể lệ" → `t('rules')`, "Viết KUDOS" → `t('writeKudos')`, close aria-label → `t('closeMenu')` | src/app/_components/homepage/widget-button.tsx
- [x] T019 [US1] Add `useTranslations('RulesPanel')` to RulesPanel (already `'use client'`), replace 3 hardcoded labels: heading → `t('title')`, close button → `t('close')`, write kudos button → `t('writeKudos')`. Do NOT translate RulesPanelContent body text. | src/app/_components/sun-kudos/rules-panel.tsx

### Tests (US1)

- [x] T020 [US1] Write unit test for i18n locale resolution: mock cookies with `locale=en` → verify getRequestConfig returns `locale: 'en'` and English messages; mock cookies with `locale=vi` → verify Vietnamese; no cookie → verify fallback to `vi`; invalid value `locale=fr` → verify fallback to `vi` | tests/unit/i18n-setup.test.tsx
- [x] T021 [US1] Update LanguageSelector test: add test case verifying cookie is set to `locale=en` when EN option clicked, `locale=vi` when VN option clicked, `router.refresh()` is called after selection | tests/unit/language-selector.test.tsx
- [x] T022 [US1] Verify full build + all tests pass: `yarn build && yarn test`

**Checkpoint**: User Story 1 complete. Language switch works end-to-end for Phase 1 strings. Preference persists via cookie.

---

## Phase 4: User Story 2 — Dropdown Open/Close Behavior (Priority: P1)

**Goal**: Dropdown opens on click, shows VN and EN options with flag icons, closes on outside click / Escape / selection.

**Independent Test**: Click language button → dropdown opens with 2 flagged options → click outside → closes. Press Escape → closes. Select option → closes.

> **Note**: Most of US2 behavior already exists in the current LanguageSelector. This phase focuses on restyling the dropdown to match Figma and verifying existing behavior.

### Dropdown Restyle (US2)

- [x] T023 [US2] Restyle LanguageSelector dropdown panel to match Figma design-style.md: container `bg-[var(--Details-Container-2,#00070C)]` `border border-[var(--Details-Border,#998C5F)]` `rounded-lg` `p-1.5`, each option `w-[110px] h-14 p-4 flex items-center gap-1`, text `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white text-center` | src/app/_components/layout/language-selector.tsx

### Tests (US2)

- [x] T024 [US2] Update LanguageSelector test: verify dropdown renders 2 options with flag icons (VnFlagIcon + GbFlagIcon), verify click-outside closes dropdown, verify Escape closes dropdown and returns focus to trigger button | tests/unit/language-selector.test.tsx
- [x] T025 [US2] Verify full build + all tests pass: `yarn build && yarn test`

**Checkpoint**: User Story 2 complete. Dropdown styled per Figma, open/close behavior verified.

---

## Phase 5: User Story 3 — Visual Selected State (Priority: P2)

**Goal**: The currently active language option has a highlighted background to differentiate it from the unselected option.

**Independent Test**: Open dropdown when VN is selected → VN row has `rgba(255,234,158,0.2)` background, EN row is transparent. Switch to EN → re-open → EN highlighted, VN transparent.

### Selected State (US3)

- [x] T026 [US3] Add conditional selected styling to LanguageSelector options: if `selected === locale.code` → apply `bg-[rgba(255,234,158,0.2)] rounded-sm`, else `bg-transparent`. Add `aria-selected={selected === locale.code}` to each `<li role="option">` | src/app/_components/layout/language-selector.tsx

### Tests (US3)

- [x] T027 [US3] Add test case: render LanguageSelector → open dropdown → verify VN option has `aria-selected="true"` and highlighted background class, EN option has `aria-selected="false"` and no background class | tests/unit/language-selector.test.tsx
- [x] T028 [US3] Verify full build + all tests pass: `yarn build && yarn test`

**Checkpoint**: User Story 3 complete. Selected locale visually distinguished.

---

## Phase 6: User Story 4 — Keyboard Accessibility (Priority: P2)

**Goal**: Full keyboard navigation: Tab to trigger → Enter/Space to open → ArrowUp/Down to navigate → Enter to select → Escape to close.

**Independent Test**: Tab to language button → press Enter → dropdown opens → press ArrowDown → focus moves to next option → press Enter → language selected, dropdown closes.

### Keyboard Nav (US4)

- [x] T029 [US4] Add `role="listbox"` to dropdown `<ul>`, `role="option"` to each `<li>`, `aria-expanded` and `aria-haspopup="listbox"` to trigger button (verify existing ARIA attrs, add missing ones) | src/app/_components/layout/language-selector.tsx
- [x] T030 [US4] Implement ArrowUp/ArrowDown keyboard navigation: track `focusedIndex` state, ArrowDown moves focus to next option, ArrowUp moves to previous, wrap around at boundaries. Apply `tabIndex={0}` and visual focus indicator to focused option. Enter/Space on focused option selects it. | src/app/_components/layout/language-selector.tsx

### Tests (US4)

- [x] T031 [US4] Add keyboard navigation tests: (a) Enter/Space opens dropdown, (b) ArrowDown moves focus from VN to EN, (c) ArrowUp moves focus from EN to VN, (d) Enter on focused option selects it and closes dropdown, (e) Escape closes dropdown and returns focus to trigger | tests/unit/language-selector.test.tsx
- [x] T032 [US4] Verify full build + all tests pass: `yarn build && yarn test`

**Checkpoint**: User Story 4 complete. Full keyboard accessibility.

---

## Phase 7: User Story 5 — Default Language Detection (Priority: P3)

**Goal**: First-time visitors (no locale cookie) default to Vietnamese. Invalid cookie values fall back to Vietnamese.

**Independent Test**: Clear all cookies → visit any page → verify UI renders in Vietnamese and dropdown shows VN flag.

### Fallback Behavior (US5)

- [x] T033 [US5] Verify `src/i18n/request.ts` correctly handles: (a) missing cookie → `vi`, (b) invalid value like `fr` → `vi`, (c) empty string → `vi`. These should already work from T002 — this task is verification + any fixes needed | src/i18n/request.ts
- [x] T034 [US5] Verify concurrent dropdown behavior: open language dropdown → click profile dropdown trigger → language dropdown should close (via existing click-outside handler). If not working, add `CustomEvent('dropdown-open')` dispatch/listen pattern | src/app/_components/layout/language-selector.tsx

### Tests (US5)

- [x] T035 [US5] Add edge case tests: (a) no cookie → renders VN label and flag, (b) invalid cookie → renders VN, (c) verify concurrent dropdown closing behavior | tests/unit/language-selector.test.tsx
- [x] T036 [US5] Verify full build + all tests pass: `yarn build && yarn test`

**Checkpoint**: User Story 5 complete. All edge cases handled.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, animation, and cleanup.

- [x] T037 [P] Add dropdown open/close animation: `opacity` + `translateY` transition, 150ms ease-out for open, 100ms ease-in for close. Add ChevronDown rotation animation (150ms ease-in-out) when dropdown toggles. | src/app/_components/layout/language-selector.tsx
- [x] T038 [P] Add hover state to dropdown options: `hover:bg-[rgba(255,234,158,0.1)]` with 150ms transition, `cursor-pointer` | src/app/_components/layout/language-selector.tsx
- [x] T039 Verify mobile touch targets: each option is 56px tall (> 44px minimum per constitution). Verify dropdown positioning on mobile viewport (absolute right-0, no overflow) | manual verification
- [x] T040 Run full test suite and build: `yarn lint && yarn test && yarn build` — all must pass with zero errors
- [ ] T041 Verify Cloudflare Workers deployment still works: `yarn deploy` or equivalent staging deploy to confirm next-intl plugin compatibility with OpenNext

**Checkpoint**: Feature complete. All user stories implemented, tested, and deployed.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)          → No deps, start immediately
Phase 2 (Foundation)     → Depends on Phase 1 (needs next-intl installed)
Phase 3 (US1 - Switch)   → Depends on Phase 2 (needs GbFlagIcon)
Phase 4 (US2 - Dropdown)  → Depends on Phase 3 (builds on LanguageSelector changes from US1)
Phase 5 (US3 - Selected)  → Depends on Phase 4 (builds on restyled dropdown)
Phase 6 (US4 - Keyboard)  → Depends on Phase 5 (adds to existing dropdown)
Phase 7 (US5 - Fallback)  → Can run after Phase 3 (only needs i18n setup + locale resolution)
Phase 8 (Polish)          → Depends on all user story phases
```

### Parallel Opportunities Within Phases

**Phase 1**: T004 + T005 (translation files) can run in parallel. T008 + T009 + T010 (test updates) can run in parallel.

**Phase 2**: T012 + T013 (icon + icon test) can run in parallel.

**Phase 3 (US1)**: T014-T019 (i18n wiring tasks) touch different files and can run in parallel. T020 (i18n test) can run in parallel with T021 (selector test update).

**Cross-phase**: Phase 7 (US5) can start as soon as Phase 3 is complete (independent of Phases 4-6).

### Within Each User Story

1. Implementation tasks before verification
2. Tests updated/written alongside implementation
3. Build verification (`yarn build && yarn test`) at each checkpoint

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + Phase 2 (Setup + Foundation)
2. Complete Phase 3 (US1 — language switch works)
3. **STOP and VALIDATE**: Switch to EN → all Phase 1 strings change → refresh → persists
4. Deploy to staging if ready

### Incremental Delivery

1. Setup + Foundation (Phase 1-2)
2. US1 (Phase 3) → Test → Deploy
3. US2 (Phase 4) → Test → Deploy (dropdown restyled)
4. US3 (Phase 5) → Test → Deploy (selected state)
5. US4 (Phase 6) → Test → Deploy (keyboard a11y)
6. US5 + Polish (Phase 7-8) → Test → Deploy (edge cases + animations)

---

## Notes

- Commit after each phase or logical group of tasks
- Run tests before moving to next phase
- **RSC components** (HomepageHeader, HomepageFooter): use `await getTranslations()` — must be async functions
- **Client Components** (WidgetButton, LanguageSelector, RulesPanel): use `useTranslations()` hook
- `RulesPanelContent` body text is out of Phase 1 scope — only UI labels translated
- `<noscript>` text in layout stays hardcoded Vietnamese (no JS = no i18n)
- Login page strings are out of Phase 1 scope (LanguageSelector works there but page text not translated)
- Mark tasks complete as you go: `[x]`
