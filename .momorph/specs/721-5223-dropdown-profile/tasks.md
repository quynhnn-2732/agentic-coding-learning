# Tasks: Dropdown Profile

**Frame**: `721:5223-dropdown-profile`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1, US2, US3)
- **|**: File path affected by this task

---

## Phase 1: Setup (Asset Preparation)

**Purpose**: Create icon assets needed by the dropdown component

- [x] T001 [P] Create ChevronRightIcon component following existing IconProps pattern (`size`, `color`, `aria-hidden="true"`) — use ChevronDownIcon as reference and rotate/mirror the SVG path | src/app/_components/icons/chevron-right-icon.tsx
- [x] T002 [P] Verify AccountIcon matches design spec (24x24, golden color #FFEA9E). If icon color is hardcoded, ensure it accepts `color` prop — no changes needed if already compliant | src/app/_components/icons/account-icon.tsx

**Checkpoint**: Icon assets ready — dropdown component can reference them

---

## Phase 2: US3 — Open and Close Dropdown (Priority: P1) 🎯 MVP Foundation

**Goal**: User can click the profile avatar to toggle the dropdown menu. Clicking outside or pressing Escape closes it. This is the foundation that blocks US1 and US2.

**Independent Test**: Render ProfileDropdown, click trigger → dropdown appears with "Profile" and "Logout" items visible. Click outside → dropdown closes. Press Escape → dropdown closes and focus returns to trigger.

### Tests (US3) — TDD Red Phase

- [x] T003 [US3] Write failing unit tests for dropdown open/close behavior: (1) renders closed by default, (2) clicking trigger opens dropdown, (3) clicking outside closes, (4) Escape closes and returns focus to trigger, (5) correct ARIA attributes (`aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `role="menuitem"`) | tests/unit/profile-dropdown.test.tsx

### Frontend (US3) — TDD Green Phase

- [x] T004 [US3] Create ProfileDropdown client component with: `"use client"` directive, props `avatarUrl?: string`, local state `isOpen`, trigger button (reuse A1.8 avatar markup from header), dropdown panel with dark container styling (`bg-[var(--color-kudos-container-dark)]`, `border border-[var(--color-btn-kudos-border)]`, `rounded-lg`, `p-1.5`), click-outside detection via `useRef` + `mousedown` listener (LanguageSelector pattern), Escape key handler, ARIA attributes, enter animation (`transition-all duration-150 ease-out opacity-0 scale-95 → opacity-100 scale-100`). Include placeholder "Profile" and "Logout" menu items with design-style typography (`font-montserrat text-base font-bold text-white`) | src/app/_components/layout/profile-dropdown.tsx
- [x] T005 [US3] Integrate ProfileDropdown into HomepageHeader: replace avatar `<button>` block (A1.8, lines 79-95) with `<ProfileDropdown avatarUrl={avatarUrl} />`, add import statement | src/app/_components/homepage/header.tsx

### Verify (US3)

- [x] T006 [US3] Run unit tests — all 5 tests from T003 must pass green | tests/unit/profile-dropdown.test.tsx

**Checkpoint**: Dropdown opens/closes correctly — US1 and US2 can now build on this

---

## Phase 3: US1 — Navigate to Profile Page (Priority: P1)

**Goal**: User clicks "Profile" in the dropdown to navigate to their profile page. The Profile item shows an active glow state when the user is on the profile page.

**Independent Test**: Open dropdown, click "Profile" → navigates to `/profile` and dropdown closes. On `/profile` page, open dropdown → Profile item has golden glow background and text-shadow.

### Tests (US1) — TDD Red Phase

- [x] T007 [US1] Write failing unit tests for profile navigation: (1) clicking "Profile" calls router navigation to `/profile`, (2) dropdown closes after clicking "Profile", (3) Profile item shows active glow state (`bg-[rgba(255,234,158,0.1)]` + `text-shadow`) when `usePathname()` returns `/profile`, (4) Profile item shows inactive state (transparent bg, no text-shadow) when on other pages, (5) keyboard Enter/Space on Profile item triggers navigation | tests/unit/profile-dropdown.test.tsx

### Frontend (US1)

- [x] T008 [P] [US1] Create profile page stub: server component with auth guard (redirect to `/login` if no session via `createClient().auth.getUser()`), render `HomepageHeader` with `avatarUrl`, minimal content with "Profile" heading and placeholder text | src/app/profile/page.tsx
- [x] T009 [US1] Implement Profile menu item in ProfileDropdown: wrap with `<Link href="/profile">`, add `usePathname()` for active state detection (`pathname.startsWith('/profile')`), apply conditional styles — active: `bg-[rgba(255,234,158,0.1)]` + `[text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]`, inactive: `bg-transparent` no text-shadow. Add AccountIcon (24x24) and "Profile" label. Close dropdown on click via `setIsOpen(false)` | src/app/_components/layout/profile-dropdown.tsx

### Verify (US1)

- [x] T010 [US1] Run unit tests — all 5 tests from T007 must pass green | tests/unit/profile-dropdown.test.tsx

**Checkpoint**: Profile navigation works independently — user can navigate to profile page

---

## Phase 4: US2 — Logout from Application (Priority: P1)

**Goal**: User clicks "Logout" to sign out. Loading state shown during API call. Error toast if signOut fails. Redirect to `/login` on success.

**Independent Test**: Open dropdown, click "Logout" → loading state appears on Logout item → redirect to `/login`. Simulate signOut failure → error toast shown, dropdown stays open for retry.

### Tests (US2) — TDD Red Phase

- [x] T011 [US2] Write failing unit tests for logout: (1) clicking "Logout" calls `signOut` server action, (2) loading state shown during signOut (`opacity-60 cursor-not-allowed`), (3) on success: redirects to `/login` via `router.push` + `router.refresh`, (4) on error: Toast shown with error message and dropdown stays open, (5) duplicate clicks prevented when `isLoggingOut` is true | tests/unit/profile-dropdown.test.tsx

### Backend (US2)

- [x] T012 [P] [US2] Implement `signOut` server action in actions.ts following existing `signInWithGoogle` result-object pattern: `export async function signOut(): Promise<{ success: true } | { error: string }>` using `createClient()` from `server.ts`. Do NOT use `redirect()` — return result object for client-side error handling | src/libs/auth/actions.ts

### Frontend (US2)

- [x] T013 [US2] Implement Logout menu item in ProfileDropdown: add local state `isLoggingOut`, click handler flow (set loading → call `signOut()` → on success: `router.push('/login')` + `router.refresh()` → on error: show Toast, reset loading), loading styles (`opacity-60 cursor-not-allowed`), duplicate click guard (`if (isLoggingOut) return`). Add ChevronRightIcon (24x24) and "Logout" label. Import `signOut` from `@/libs/auth/actions` and Toast from `@/app/_components/sun-kudos/toast.tsx` | src/app/_components/layout/profile-dropdown.tsx
- [x] T014 [US2] Add Toast error state management to ProfileDropdown: local state `toastMessage: string | null`, render `<Toast>` conditionally when `toastMessage` is set, auto-dismiss via Toast's built-in 3s timer with `onDismiss={() => setToastMessage(null)}` | src/app/_components/layout/profile-dropdown.tsx

### Verify (US2)

- [x] T015 [US2] Run unit tests — all 5 tests from T011 must pass green | tests/unit/profile-dropdown.test.tsx

**Checkpoint**: Complete dropdown — all 3 user stories functional and independently testable

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, responsive behavior, edge cases, E2E tests

### Accessibility

- [x] T016 [P] Implement full WAI-ARIA menu keyboard navigation in ProfileDropdown: Arrow Up/Down to move focus between menu items (track `focusedIndex` state), Enter/Space to activate focused item, Tab moves focus out of menu and closes it. Use `useRef` array for menu item refs. Follow HashtagDropdown pattern | src/app/_components/layout/profile-dropdown.tsx

### Edge Cases

- [x] T017 [P] Add Supabase `onAuthStateChange` listener in ProfileDropdown to detect session changes from other tabs: if `event === 'SIGNED_OUT'`, close dropdown and `router.push('/login')`. Cleanup listener in `useEffect` return | src/app/_components/layout/profile-dropdown.tsx

### Responsive

- [x] T018 [P] Verify and adjust dropdown positioning for all breakpoints: mobile (< 768px) — ensure dropdown doesn't overflow viewport, right-aligned `absolute right-0 top-full mt-1`; desktop — same positioning below avatar. Verify touch targets ≥ 44px (items are 56px ✅). Add any needed responsive Tailwind classes | src/app/_components/layout/profile-dropdown.tsx

### E2E Tests

- [x] T019 Write Playwright E2E tests covering complete flows: (1) click avatar → dropdown opens with Profile and Logout, (2) click Profile → navigates to `/profile`, (3) click Logout → redirects to `/login`, (4) click outside → closes, (5) Escape → closes, (6) keyboard Arrow/Enter navigation, (7) mobile viewport touch interaction | tests/e2e/profile-dropdown.spec.ts

### Final Cleanup

- [x] T020 Run full test suite (unit + E2E), verify `yarn lint` passes with zero errors, review all files for dead code or unused imports per constitution Rule I | all affected files

**Checkpoint**: Feature complete — all stories, accessibility, responsive, E2E verified

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)          → No dependencies — start immediately
  ↓
Phase 2 (US3: Open/Close) → Depends on Phase 1 (needs icons)
  ↓                         ⚠️ BLOCKS Phase 3 and Phase 4
Phase 3 (US1: Profile)   → Depends on Phase 2 (needs dropdown component)
Phase 4 (US2: Logout)    → Depends on Phase 2 (needs dropdown component)
  ↓                         Phase 3 and 4 CAN run in parallel
Phase 5 (Polish)          → Depends on Phase 3 + 4 completion
```

### Within Each User Story

1. Tests MUST be written and FAIL before implementation (TDD Red)
2. Implementation makes tests pass (TDD Green)
3. Verify step confirms all tests green
4. Story complete before moving to next priority (or parallel if capacity allows)

### Parallel Opportunities

**Phase 1**: T001 and T002 can run in parallel (different files)

**Phase 2**: Sequential — T003 (tests) → T004 (implement) → T005 (integrate) → T006 (verify)

**Phase 3 & 4 can run in parallel** (different concerns, both depend on Phase 2):
- Phase 3 (US1): Profile navigation — modifies `profile-dropdown.tsx` + creates `profile/page.tsx`
- Phase 4 (US2): Logout — modifies `profile-dropdown.tsx` + modifies `actions.ts`
- ⚠️ If running in parallel: coordinate edits to `profile-dropdown.tsx` (merge at verify step)
- If running sequentially: US1 first (simpler), then US2

**Phase 4 internal**: T012 (server action) can run in parallel with T011 (tests) since they're in different files

**Phase 5**: T016, T017, T018 can all run in parallel (different concerns in same file, but independent logic blocks)

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (Setup) + Phase 2 (US3: Open/Close)
2. **STOP and VALIDATE**: Dropdown opens/closes correctly in the browser
3. Complete Phase 3 (US1: Profile Navigation)
4. **STOP and VALIDATE**: Can navigate to profile page via dropdown
5. Complete Phase 4 (US2: Logout)
6. **STOP and VALIDATE**: Can logout and redirects to login
7. Complete Phase 5 (Polish)
8. **FINAL VALIDATION**: Full E2E test suite passes

### Incremental Delivery

1. Setup + US3 → Test → Deployable (dropdown shows, no actions yet)
2. Add US1 → Test → Deployable (profile navigation works)
3. Add US2 → Test → Deployable (logout works)
4. Add Polish → Test → Feature complete

---

## Notes

- **TDD is NON-NEGOTIABLE** per constitution Rule III — every phase starts with failing tests
- Commit after each task or logical group using Conventional Commits (`feat:`, `test:`)
- Run `yarn lint` before moving to next phase
- The ProfileDropdown component grows incrementally across phases — Phase 2 creates the skeleton, Phase 3 adds Profile item, Phase 4 adds Logout item, Phase 5 adds keyboard nav
- Toast import from `sun-kudos/` is acceptable cross-boundary per plan review — extract to shared if a second consumer appears
- Update spec.md status from "Draft" to "In Progress" when implementation begins
- Mark tasks complete as you go: `- [x] T001 ...`
