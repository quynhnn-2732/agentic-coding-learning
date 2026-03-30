# Tasks: Login

**Frame**: `662:14387-Login`
**Prerequisites**: plan.md ✅, spec.md ✅, design-style.md ✅

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[US1]**: Google Authentication (P1)
- **[US2]**: Language Selection (P2)

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Install test tooling, configure runners, and prepare all Figma media assets before any code work.

- [x] T001 Install dev dependencies: `yarn add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event @testing-library/jest-dom @playwright/test` | package.json
- [x] T002 [P] Configure Vitest with jsdom environment and jest-dom setupFiles | vitest.config.ts
- [x] T003 [P] Configure Playwright with baseURL, browser matrix, and retries | playwright.config.ts
- [x] T004 [P] Download background artwork from Figma (Node 662:14388) | public/images/keyvisual-bg.jpg
- [x] T005 [P] Download ROOT FURTHER logo from Figma (Node 662:14395 / 2939:9548) | public/images/root-further-logo.png
- [x] T006 [P] Download SAA 2025 logo from Figma (Node I662:14391;178:1033;178:1030) | public/images/saa-logo.svg

**Checkpoint**: Test runners configured; all Figma assets in `public/images/`

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Shared infrastructure required by ALL user stories — design tokens, fonts, types, security headers, middleware.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T007 Add all `@theme inline` design tokens (colors, spacing, radius, fonts) to globals.css — see plan.md Phase 1a for complete token list | src/app/globals.css
- [x] T008 [P] Configure Montserrat and Montserrat Alternates via `next/font/google`, expose as CSS variables, remove Geist fonts | src/app/layout.tsx
- [x] T009 [P] Create TypeScript types: `AuthUser`, `AuthError`, `Locale` | src/libs/types/auth.ts
- [x] T010 [P] Add OWASP security headers (CSP with Supabase+Google domains, X-Frame-Options, HSTS, X-Content-Type-Options) to next.config.ts — see plan.md Phase 1d for exact CSP directives | next.config.ts
- [x] T011 Implement Next.js middleware with auth guard, session refresh, and `config.matcher` | src/middleware.ts

**Checkpoint**: Design tokens active, fonts loading, types exported, security headers applied, middleware redirecting correctly

---

## Phase 3: User Story 1 — Google Authentication (Priority: P1) 🎯 MVP

**Goal**: Unauthenticated users can visit `/`, click "LOGIN With Google", complete OAuth, and reach `/dashboard`. Authenticated users visiting `/` are redirected immediately.

**Independent Test**: Navigate to `/` → click "LOGIN With Google" → Google OAuth completes → redirected to `/dashboard`. Visit `/` while authenticated → redirected to `/dashboard` automatically.

### Tests First (TDD — write FAILING tests before implementation)

- [x] T012 [P] [US1] Write failing unit tests for auth callback route (valid code → /dashboard; missing code → /?error; Supabase error → /?error=encoded) | tests/unit/auth-callback.test.ts
- [x] T013 [P] [US1] Write failing unit tests for middleware (unauth on /dashboard → /; auth on / → /dashboard; unauth on / → passes through) | tests/unit/middleware.test.ts
- [x] T014 [P] [US1] Write failing unit tests for LoginButton (renders text+icon; click → loading state; {url} return → window.location.href; {error} return → onError called) | tests/unit/login-button.test.tsx
- [x] T015 [P] [US1] Write failing unit tests for LoginSection (initialError → ErrorBanner shown; onError → ErrorBanner appears; dismiss → ErrorBanner gone; no error → ErrorBanner absent) | tests/unit/login-section.test.tsx

### Backend (US1)

- [x] T016 [P] [US1] Implement `signInWithGoogle()` Server Action — returns `{ url } | { error }`, no redirect() (Cloudflare pattern) | src/libs/auth/actions.ts
- [x] T017 [P] [US1] Implement OAuth callback route handler — `exchangeCodeForSession`, redirect to /dashboard on success, /?error=encoded on failure | src/app/auth/callback/route.ts

### Frontend Icons (US1)

- [x] T018 [P] [US1] Create GoogleIcon SVG component (24×24px, from Figma Node I662:14426;186:1766) | src/app/_components/icons/google-icon.tsx

### Frontend Components (US1)

- [x] T019 [P] [US1] Implement ErrorBanner — `role="alert"`, `aria-live="assertive"`, auto-dismiss with `useEffect`+`clearTimeout` cleanup, dismiss button with `aria-label` | src/app/_components/login/error-banner.tsx
- [x] T020 [P] [US1] Implement LoginButton — native `<button>`, `aria-busy`, loading spinner (20×20 animate-spin), `bg-btn-login-bg`, `w-btn-login-w h-btn-login-h`, hover lift, focus ring | src/app/_components/login/login-button.tsx
- [x] T021 [US1] Implement LoginSection — `"use client"` wrapper owning `error` state, renders `<ErrorBanner>` + `<LoginButton onError={setError}>`, `initialError` prop | src/app/_components/login/login-section.tsx
- [x] T022 [P] [US1] Implement Footer — copyright text, Montserrat Alternates 16px/700, border-top divider, absolute bottom-0, `px-footer-px py-xl` | src/app/_components/layout/footer.tsx
- [x] T023 [US1] Implement HeroSection — Server Component, ROOT FURTHER logo (`next/image`, alt="", priority, object-contain, 451×200), hero text (2 Vietnamese lines), `<LoginSection initialError={initialError} />`, `absolute top-hero-top px-hero-px py-hero-py flex flex-col gap-hero-gap` | src/app/_components/login/hero-section.tsx
- [x] T024 [US1] Implement Header (without LanguageSelector for now — placeholder renders nothing for US1) | src/app/_components/layout/header.tsx
- [x] T025 [US1] Implement Login Page — await searchParams, C_Keyvisual bg image (absolute inset-0, fill, object-cover), two gradient overlay divs (`from-gradient-from from-25%` and `from-22%`), Header + HeroSection + Footer layout | src/app/page.tsx
- [x] T026 [US1] Add `<noscript>` Vietnamese fallback message inside `<body>` | src/app/layout.tsx

### Tests (US1)

- [x] T027 [US1] Run unit tests for T012–T015; make all pass (red → green cycle) | tests/unit/
- [x] T028 [US1] Write and run integration test — OAuth flow + middleware redirect with mocked Supabase | tests/integration/auth-flow.test.ts

**Checkpoint**: User Story 1 complete — Login page renders, OAuth flow works, middleware guards all routes, all unit + integration tests pass

---

## Phase 4: User Story 2 — Language Selection (Priority: P2)

**Goal**: Users can click the "VN" language selector in the header, open a dropdown, select a language, and the UI locale updates.

**Independent Test**: On Login page, click "VN" language toggle → dropdown opens, chevron rotates 180° → select option → dropdown closes, locale cookie set, UI updates.

### Tests First (TDD)

- [x] T029 [US2] Write failing unit tests for LanguageSelector (default VN+flag+chevron; click → dropdown open + chevron rotate; click outside → closes; select option → closes + cookie set) | tests/unit/language-selector.test.tsx

### Frontend Icons (US2)

- [x] T030 [P] [US2] Create VnFlagIcon SVG component (24×24px, from Figma Node I662:14391;186:1696;186:1821;186:1709) | src/app/_components/icons/vn-flag-icon.tsx
- [x] T031 [P] [US2] Create ChevronDownIcon SVG component (24×24px, white, from Figma Node I662:14391;186:1696;186:1821;186:1441) | src/app/_components/icons/chevron-down-icon.tsx

### Frontend Components (US2)

- [x] T032 [US2] Implement LanguageSelector — native `<button>` with `aria-expanded`, `aria-haspopup="listbox"`, `aria-label="Select language"`, `role="listbox"` dropdown, `role="option"` items, `document.cookie` locale write + `router.refresh()`, Escape/Enter/Space/Arrow keyboard nav, `useEffect` outside-click cleanup, chevron `rotate-180 transition-transform duration-150` | src/app/_components/layout/language-selector.tsx
- [x] T033 [US2] Wire LanguageSelector into Header (replace US1 placeholder with `<LanguageSelector />`) | src/app/_components/layout/header.tsx

### Tests (US2)

- [x] T034 [US2] Run unit tests for T029; make all pass | tests/unit/language-selector.test.tsx

**Checkpoint**: User Stories 1 & 2 complete — full Login screen functional including language switching

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, responsive layout, E2E coverage, lint gate.

- [x] T035 Verify responsive layout at 320px, 768px, and 1440px — no horizontal scroll, button full-width on mobile, correct padding breakpoints per design-style.md Responsive Specifications
- [x] T036 [P] Run Lighthouse accessibility audit → score MUST be ≥90; fix any failing checks (color contrast, ARIA, focus order)
- [x] T037 [P] Validate keyboard navigation: Tab moves A.2_Language → B.3_Login; Enter/Space triggers OAuth; Enter/Space opens dropdown; Escape closes dropdown + returns focus
- [x] T038 [P] Verify all interactive touch targets are ≥44×44px on mobile viewport
- [x] T039 Write Playwright E2E test — happy path (unauthenticated visit + OAuth flow) + error path (callback missing code → ErrorBanner) | tests/e2e/login.spec.ts
- [x] T040 [P] Run `yarn lint` → fix all ESLint errors to zero
- [x] T041 Final review: all tasks marked [x], `yarn build` succeeds, no TypeScript errors, `yarn preview` serves correctly on Cloudflare local runtime

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
  └── Phase 2 (Foundation) — BLOCKS all user stories
        ├── Phase 3 (US1 — P1) ← START HERE for MVP
        │     └── Phase 4 (US2 — P2) — depends on Phase 3 complete
        │           └── Phase 5 (Polish) — depends on Phase 3 + 4 complete
        └── (Phase 4 can start in parallel with Phase 3 if team has capacity after T011)
```

### Within Each User Story

```
TDD tests (T012–T015) written FIRST → must FAIL initially
Backend (T016–T017) in parallel
Icons (T018, T030–T031) in parallel with backend
Components in order: ErrorBanner + LoginButton (parallel) → LoginSection → Footer (parallel) → HeroSection → Header → Page
Run tests → green
Integration test
```

### Parallel Opportunities

| Group | Tasks | Condition |
|-------|-------|-----------|
| Phase 1 setup | T002, T003, T004, T005, T006 | All parallel after T001 |
| Phase 2 foundation | T008, T009, T010 | Parallel after T007 |
| US1 TDD tests | T012, T013, T014, T015 | All parallel (different files) |
| US1 backend | T016, T017 | Parallel (different files) |
| US1 components | T019, T020 | Parallel (different files) |
| US2 icons | T030, T031 | Parallel (different files) |
| Polish | T036, T037, T038, T040 | Parallel (different concerns) |

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 (T001–T006)
2. Complete Phase 2 (T007–T011)
3. Complete Phase 3 US1 (T012–T028)
4. **STOP and VALIDATE**: Run all tests, verify OAuth flow works
5. Deploy if ready — language switching not required for core functionality

### Incremental Delivery

1. Phase 1 + Phase 2 → foundation ready
2. Phase 3 US1 → Login works, OAuth works → deploy
3. Phase 4 US2 → Language switching → deploy
4. Phase 5 Polish → accessibility + E2E → final release

---

## Notes

- TDD is non-negotiable per constitution.md Section III — tests MUST fail before implementation begins
- Token-based classes only — no Tailwind arbitrary values (e.g. `w-btn-login-w` NOT `w-[305px]`)
- Server Action `signInWithGoogle()` MUST return `{ url } | { error }` — do NOT call `redirect()` inside it (Cloudflare edge constraint)
- `searchParams` in page.tsx MUST be `await`ed (Next.js 15 change)
- Background image and gradient overlays live in `page.tsx` root, NOT inside `HeroSection`
- `ErrorBanner` MUST have `role="alert"` + `aria-live="assertive"` for screen reader support
- Mark tasks complete as you go: change `[ ]` → `[x]`
- Commit after each logical group using Conventional Commits format
