# Implementation Plan: Dropdown Profile

**Frame**: `721:5223-dropdown-profile`
**Date**: 2026-03-31
**Spec**: `specs/721-5223-dropdown-profile/spec.md`

---

## Summary

Implement a profile dropdown menu that appears when clicking the user avatar in the application header. The dropdown provides "Profile" navigation and "Logout" functionality with a dark theme, gold-accented border, and glow effects. The implementation leverages existing codebase patterns (LanguageSelector, HashtagDropdown) for click-outside detection, keyboard navigation, and ARIA accessibility, while integrating with Supabase Auth for session management.

---

## Technical Context

**Language/Framework**: TypeScript (strict mode) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, @supabase/ssr, @supabase/supabase-js
**Database**: N/A (auth state only, managed by Supabase)
**Testing**: Vitest (unit/integration), Playwright (E2E)
**State Management**: React useState/useRef (local), Supabase Auth context (global)
**API Style**: Supabase SDK + Next.js Server Actions

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **I. Clean Code**: File/folder naming in kebab-case, single responsibility per component, functions ≤ 40 lines
- [x] **II. Tech Stack**: `"use client"` for interactive component, Supabase browser client for auth, TailwindCSS for styling
- [x] **III. Test-First (TDD)**: Tests written before implementation code (see Testing Strategy)
- [x] **IV. Responsive Design**: Mobile-first with `md:` and `lg:` breakpoints, touch targets ≥ 44×44px (items are 56px)
- [x] **V. Security (OWASP)**: Session invalidation via `supabase.auth.signOut()`, cookies managed by `@supabase/ssr`, no tokens in localStorage

**Violations (if any)**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — new `ProfileDropdown` component in `src/app/_components/layout/` alongside existing `LanguageSelector` and header components
- **Styling Strategy**: Tailwind utility classes using existing CSS variables from `globals.css` (e.g., `--color-kudos-container-dark`, `--color-btn-kudos-border`, `--color-accent-gold`)
- **Data Fetching**: User data passed as props from server component (`HomepageHeader` receives user from parent page), no client-side data fetching needed
- **No external UI library**: Project uses custom-built dropdowns (HashtagDropdown, LanguageSelector pattern). Follow this convention — no Radix, Headless UI, etc.

### Backend Approach

- **Logout Action**: New server action `signOut()` in `src/libs/auth/actions.ts` alongside existing `signInWithGoogle()`
- **Validation**: N/A (no user input beyond click actions)
- **API Design**: Uses Supabase SDK directly — `supabase.auth.signOut()` for logout

### Integration Points

- **Existing Services**: Supabase Auth via server-side client (`src/libs/supabase/server.ts`) — signOut is a server action that clears cookies server-side, matching `signInWithGoogle` pattern
- **Shared Components**: `AccountIcon` from `src/app/_components/icons/`, Toast from `src/app/_components/sun-kudos/toast.tsx` (acceptable cross-boundary import — Toast is a generic UI component despite its current location; if more features need it, extract to `_components/shared/` later)
- **Existing Patterns**: Click-outside detection (from `LanguageSelector`), keyboard nav (from `HashtagDropdown`), ARIA roles (from `HashtagDropdown`)

### Key Design Decision: Icon Reuse

The design spec calls for a "User" icon and "Chevron Right" icon. The codebase already has:
- `AccountIcon` — matches the user/profile icon
- Need to create: `ChevronRightIcon` — does not exist yet (only `ChevronDownIcon` exists)

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/721-5223-dropdown-profile/
├── spec.md              # Feature specification
├── design-style.md      # Design specifications
├── plan.md              # This file
├── tasks.md             # Task breakdown (next step)
└── assets/
    └── frame.png        # Figma frame screenshot
```

### Source Code (affected areas)

```text
src/
├── app/
│   ├── _components/
│   │   ├── layout/
│   │   │   └── profile-dropdown.tsx    # NEW - Profile dropdown component
│   │   └── icons/
│   │       └── chevron-right-icon.tsx  # NEW - Chevron right icon
│   └── profile/
│       └── page.tsx                    # NEW - Profile page (stub/placeholder)
├── libs/
│   └── auth/
│       └── actions.ts                  # MODIFY - Add signOut server action

tests/
├── unit/
│   └── profile-dropdown.test.tsx       # NEW - Unit tests
└── e2e/
    └── profile-dropdown.spec.ts        # NEW - E2E tests
```

### Modified Files

| File | Changes |
|------|---------|
| `src/app/_components/homepage/header.tsx` | Replace avatar `<button>` (A1.8) with `<ProfileDropdown>` component |
| `src/libs/auth/actions.ts` | Add `signOut()` server action |

### New Files

| File | Purpose |
|------|---------|
| `src/app/_components/layout/profile-dropdown.tsx` | Main dropdown component (`"use client"`) |
| `src/app/_components/icons/chevron-right-icon.tsx` | Chevron right SVG icon |
| `src/app/profile/page.tsx` | Profile page stub (navigation target) |
| `tests/unit/profile-dropdown.test.tsx` | Unit tests (Vitest + Testing Library) |
| `tests/e2e/profile-dropdown.spec.ts` | E2E tests (Playwright) |

### Dependencies

No new dependencies required. All needed packages already installed:
- `@supabase/supabase-js` (auth signOut)
- `@supabase/ssr` (cookie management)
- `@testing-library/react` (unit tests)
- `@playwright/test` (E2E)
- `vitest` (test runner)

---

## Implementation Strategy

### Phase 0: Asset Preparation

- Create `ChevronRightIcon` component in `src/app/_components/icons/` following existing icon pattern (`IconProps` interface with `size` and `color` props, `aria-hidden="true"`)
- Verify `AccountIcon` matches the design spec's user icon
- No Figma media downloads needed — icons are SVG components

### Phase 1: Foundation (US3 - Open/Close Dropdown)

Start with the dropdown toggle since it's the entry point for all other functionality.

**1.1. Write failing tests** (TDD - Red):
- Test: Dropdown renders closed by default
- Test: Clicking trigger opens dropdown
- Test: Clicking outside closes dropdown
- Test: Pressing Escape closes dropdown and returns focus to trigger
- Test: Dropdown has correct ARIA attributes

**1.2. Implement `ProfileDropdown` component** (TDD - Green):
- Create `src/app/_components/layout/profile-dropdown.tsx`
- `"use client"` directive
- Props: `avatarUrl?: string` (from server component)
- Local state: `isOpen` (boolean, default `false`)
- Trigger: Avatar button (reuse existing A1.8 markup)
- Dropdown panel: Dark container with gold border
- Click-outside detection using `useRef` + `mousedown` event (LanguageSelector pattern)
- Escape key handler
- ARIA: `aria-haspopup="menu"` + `aria-expanded` on trigger, `role="menu"` on dropdown, `role="menuitem"` on items
- Animation (enter only): Tailwind `transition-all duration-150 ease-out` with `opacity-0 scale-95` → `opacity-100 scale-100`. Exit animation is not needed — at 150ms the instant unmount via `{isOpen && ...}` is imperceptible and follows the LanguageSelector pattern which also has no exit animation

**1.3. Integrate into Header** (TDD - Refactor):
- Modify `src/app/_components/homepage/header.tsx`
- Replace avatar `<button>` block (A1.8) with `<ProfileDropdown avatarUrl={avatarUrl} />`
- Pass `avatarUrl` prop from parent

### Phase 2: Core Feature - Profile Navigation (US1)

**2.1. Write failing tests**:
- Test: "Profile" item navigates to `/profile`
- Test: Dropdown closes after clicking "Profile"
- Test: "Profile" item shows active glow state when on profile page
- Test: Keyboard Enter/Space on "Profile" triggers navigation

**2.2. Implement Profile navigation**:
- Add `<Link href="/profile">` wrapper on Profile menu item
- Golden glow styling: `bg-[rgba(255,234,158,0.1)]` + text-shadow
- Active state detection via `usePathname()` from `next/navigation`
- Create stub `src/app/profile/page.tsx`:
  - Server component with auth guard (redirect to `/login` if no session, per constitution Section V)
  - Minimal content: page title "Profile" + placeholder text
  - Use existing layout pattern from other pages (e.g., `dashboard/page.tsx`)
  - Pass `avatarUrl` to `HomepageHeader` with `activePath` consideration

### Phase 3: Core Feature - Logout (US2)

**3.1. Write failing tests**:
- Test: Clicking "Logout" calls signOut and redirects to `/login`
- Test: Loading state shown during signOut
- Test: Error toast shown on signOut failure
- Test: Duplicate click prevention during loading

**3.2. Implement signOut server action**:
- Add to `src/libs/auth/actions.ts` following the existing `signInWithGoogle` result-object pattern:
  ```typescript
  export async function signOut(): Promise<{ success: true } | { error: string }> {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
      return { error: error.message }
    }
    return { success: true }
  }
  ```
- **Important**: Do NOT use `redirect()` inside the server action — it throws `NEXT_REDIRECT` which prevents the client from handling errors. Instead, return a result object and let the client redirect on success via `router.push('/login')` + `router.refresh()`.

**3.3. Implement Logout menu item**:
- Local state: `isLoggingOut` (boolean)
- On click handler flow:
  1. Set `isLoggingOut = true`
  2. Call `signOut()` server action
  3. If `{ success: true }`: call `router.push('/login')` then `router.refresh()`
  4. If `{ error }`: show Toast with error message, set `isLoggingOut = false`, keep dropdown open
- Loading state: `opacity-60 cursor-not-allowed` on Logout item + prevent duplicate clicks via `if (isLoggingOut) return` guard
- Error handling: catch both server action errors and network failures, show Toast component

### Phase 4: Polish & Accessibility

**4.1. WAI-ARIA menu keyboard navigation**:
- Arrow Up/Down to move between items
- Enter/Space to activate focused item
- Tab moves focus out of menu
- Follow pattern from HashtagDropdown

**4.2. Responsive behavior**:
- Mobile: Dropdown positioned relative to trigger, touch targets verified at 56px
- Tablet/Desktop: Absolute positioning below avatar, right-aligned

**4.3. Edge cases**:
- Rapid clicks: State guard `if (isOpen) return` or let React batching handle
- Multi-tab session: Supabase `onAuthStateChange` listener to detect external logout

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: ProfileDropdown ↔ Header integration
- [x] **External dependencies**: Supabase Auth signOut
- [ ] **Data layer**: N/A
- [x] **User workflows**: Open dropdown → click Profile/Logout → verify navigation/session

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Dropdown toggle, navigation, logout flow |
| Service ↔ Service | Yes | signOut server action ↔ Supabase Auth |
| App ↔ External API | Yes | Supabase Auth signOut endpoint |
| App ↔ Data Layer | No | N/A |
| Cross-platform | Yes | Responsive positioning, touch targets |

### Test Environment

- **Environment type**: Local (Vitest for unit, Playwright for E2E)
- **Test data strategy**: Mock Supabase client for unit tests, real Supabase for E2E (test user)
- **Isolation approach**: Fresh state per test, mocked auth context

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth | Mock (unit) / Real (E2E) | Unit tests must be fast and isolated; E2E validates real auth flow |
| Next.js Router | Mock (unit) / Real (E2E) | Mock `useRouter`, `usePathname` in unit tests |
| Toast component | Real | Lightweight, no side effects |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Open dropdown → see "Profile" and "Logout" items
   - [x] Click "Profile" → navigate to `/profile`, dropdown closes
   - [x] Click "Logout" → loading state → redirect to `/login`
   - [x] Click outside → dropdown closes
   - [x] Press Escape → dropdown closes, focus returns to trigger

2. **Error Handling**
   - [x] Logout fails → error toast shown, dropdown stays open
   - [x] Network offline → appropriate error message

3. **Edge Cases**
   - [x] Rapid trigger clicks → no flickering
   - [x] Keyboard navigation → Arrow Up/Down, Enter/Space, Tab
   - [x] Active state → Profile item shows glow when on `/profile`
   - [x] Mobile touch → same behavior as click

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Core user flows (open/close, navigate, logout) | 90%+ | High |
| Keyboard accessibility | 85%+ | High |
| Error handling | 80%+ | Medium |
| Responsive behavior | E2E only | Medium |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Supabase signOut doesn't clear cookies properly | Low | High | Test with real Supabase in E2E; verify cookie removal in server action |
| Dropdown positioning overflow on mobile | Medium | Low | Use right-aligned absolute positioning; test on small viewports |
| Active glow state detection with dynamic routes | Low | Low | Use `usePathname()` with startsWith check for `/profile` |
| Toast component imported from `sun-kudos/` into `layout/` | Low | Low | Acceptable cross-boundary import for now — Toast is generic. If a second consumer appears, extract to `_components/shared/toast.tsx` |

### Estimated Complexity

- **Frontend**: Medium (dropdown with keyboard nav, states, animations)
- **Backend**: Low (single server action for signOut)
- **Testing**: Medium (multiple interaction patterns, ARIA compliance)

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [x] Codebase research completed (inline above)
- [x] API contracts defined (Supabase SDK — existing)
- [ ] Database migrations planned — N/A

### External Dependencies

- Supabase Auth service (already configured)
- Montserrat font (already loaded via `--font-montserrat` CSS variable)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following TDD cycle (Phase 1 → 4)

---

## Notes

- **Reuse existing patterns**: The codebase has 3 dropdown implementations (HashtagDropdown, LanguageSelector, WidgetButton). Follow `LanguageSelector` pattern most closely since it's in the same `layout/` directory and has similar requirements.
- **No new dependencies**: All functionality can be achieved with existing packages. This aligns with the project's custom-component philosophy (no Radix/Headless UI).
- **Design tokens exist**: Most design tokens from the spec already exist in `globals.css` — `--color-kudos-container-dark: #00070C` matches `--color-dropdown-bg`, `--color-btn-kudos-border: #998C5F` matches `--color-dropdown-border`, `--color-accent-gold: #FFEA9E` matches the glow color.
- **Server Action for logout**: Using a server action instead of client-side `supabase.auth.signOut()` ensures the server-side session/cookies are properly cleared (per constitution Section V, OWASP compliance).
- **Profile page stub**: A minimal `/profile` page stub is needed as a navigation target. Full profile page implementation is out of scope per spec.
