# Implementation Plan: Login

**Frame**: `662:14387-Login`
**Date**: 2026-03-23
**Spec**: `specs/662-14387-Login/spec.md`

---

## Summary

Build the Login screen — the public entry point for SAA 2025. The page presents a full-screen
dark hero layout with a "LOGIN With Google" button that triggers Supabase OAuth (Google provider).
On success, the user's session is stored in HttpOnly cookies and they are redirected to the
dashboard. The screen also supports language switching via a header dropdown.

The implementation uses **Next.js 15 App Router** (Server Components by default), **Supabase
Auth + SSR**, and deploys to **Cloudflare Workers** via OpenNext. All styling is done with
**TailwindCSS v4** (CSS-based `@theme` tokens).

---

## Technical Context

**Language/Framework**: TypeScript 5 / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, @supabase/ssr 0.8, @supabase/supabase-js 2
**Database**: Supabase PostgreSQL (managed by Supabase Auth; no custom migration for Login)
**Testing**: Vitest (unit/integration), Playwright (E2E)
**State Management**: Local React state (`useState`) for loading/error; cookies for locale/session
**API Style**: Supabase Client SDK + Next.js Route Handler (for OAuth callback)
**Deployment**: Cloudflare Workers via `@opennextjs/cloudflare`

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case filenames, ≤40 line functions, no dead code)
- [x] Uses approved libraries and patterns (Next.js App Router RSC, Supabase SSR, Tailwind v4)
- [x] Adheres to folder structure (`src/app/` for pages/routes, `src/libs/` for utilities)
- [x] Meets security requirements (HttpOnly cookies, OWASP headers, no raw SQL, Zod validation)
- [x] Follows testing standards (TDD: tests written before implementation, Vitest + Playwright)

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| Adding Vitest dev dependency | No test framework exists yet; Vitest is Cloudflare-compatible | Jest requires Node.js APIs unavailable in Workers |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based under `src/app/_components/login/` and
  `src/app/_components/layout/`. Server Components by default; `"use client"` only for
  `LoginButton`, `ErrorBanner`, `LoginSection`, and `LanguageSelector` (interactivity required).
- **Styling Strategy**: TailwindCSS v4 via `@theme` tokens in `globals.css`. No inline
  arbitrary values — all brand colors/spacing defined as CSS variables under `@theme`.
- **Data Fetching**: Session check happens in `src/middleware.ts` (server-side);
  the Login page itself has no data fetching (static UI).
- **Font Loading**: `Montserrat` and `Montserrat Alternates` loaded via `next/font/google`
  in `src/app/layout.tsx`, replacing the current Geist placeholders.

### Backend Approach

- **API Design**: Single Route Handler at `src/app/auth/callback/route.ts` handles the
  Google OAuth code-exchange callback (GET).
- **Data Access**: Supabase Auth manages user records automatically on first OAuth login.
  No custom DB migration required for the Login screen.
- **Validation**: `src/middleware.ts` validates session via `supabase.auth.getUser()`.
  OAuth callback validates the `code` query param presence before exchange.
- **Security Headers**: Added in `next.config.ts` via `headers()` — applies to all routes.

### Integration Points

- **Existing Services**:
  - `src/libs/supabase/server.ts` — server-side Supabase client (used in Server Action + callback route)
  - `src/libs/supabase/client.ts` — browser Supabase client (NOT used in Login flow; LoginButton calls Server Action only)
  - `src/libs/supabase/middleware.ts` — Supabase middleware client factory (used in `src/middleware.ts`)
- **Shared Components**: Header and Footer will be reused across all future authenticated pages
- **API Contracts**: Supabase OAuth callback URL: `{NEXT_PUBLIC_SITE_URL}/auth/callback`

### Key Cloudflare Constraint

The middleware and Route Handler MUST use only Cloudflare-compatible APIs. The existing
`@supabase/ssr` + cookie pattern is compatible. `getCloudflareContext()` is available in
dev via `initOpenNextCloudflareForDev()` (already in `next.config.ts`).

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/662-14387-Login/
├── spec.md              ✅ Complete
├── design-style.md      ✅ Complete
├── plan.md              ← This file
└── tasks.md             ← Next step
```

### New Files to Create

| File | Purpose |
|------|---------|
| `src/middleware.ts` | Next.js middleware: auth guard, session refresh, security headers |
| `src/app/auth/callback/route.ts` | OAuth callback Route Handler — exchanges code for session |
| `src/app/_components/login/login-button.tsx` | `"use client"` — Google OAuth CTA button with loading state |
| `src/app/_components/login/error-banner.tsx` | `"use client"` — dismissible error banner for OAuth failures |
| `src/app/_components/login/hero-section.tsx` | Server Component — ROOT FURTHER image + hero text |
| `src/app/_components/login/login-section.tsx` | `"use client"` — Client wrapper managing `error` state; renders LoginButton + ErrorBanner |
| `src/app/_components/layout/header.tsx` | Server Component — logo + language selector wrapper |
| `src/app/_components/layout/footer.tsx` | Server Component — copyright footer |
| `src/app/_components/layout/language-selector.tsx` | `"use client"` — VN flag + dropdown toggle |
| `src/app/_components/icons/google-icon.tsx` | Icon Component — Google SVG icon |
| `src/app/_components/icons/chevron-down-icon.tsx` | Icon Component — chevron SVG |
| `src/app/_components/icons/vn-flag-icon.tsx` | Icon Component — VN flag SVG |
| `src/libs/auth/actions.ts` | Server Actions — `signInWithGoogle()` wrapper |
| `src/libs/types/auth.ts` | TypeScript types: `AuthUser`, `AuthError`, `Locale` |
| `public/images/keyvisual-bg.jpg` | Background artwork (downloaded from Figma) |
| `public/images/root-further-logo.png` | ROOT FURTHER key visual (downloaded from Figma) |
| `public/images/saa-logo.svg` | SAA 2025 logo (downloaded from Figma) |
| `tests/unit/login-button.test.tsx` | Unit test — LoginButton states |
| `tests/unit/login-section.test.tsx` | Unit test — LoginSection error state management |
| `tests/unit/language-selector.test.tsx` | Unit test — LanguageSelector open/close/select |
| `tests/unit/auth-callback.test.ts` | Unit test — callback route validation |
| `tests/unit/middleware.test.ts` | Unit test — middleware auth guard redirects |
| `tests/integration/auth-flow.test.ts` | Integration test — OAuth flow + middleware redirect |
| `tests/e2e/login.spec.ts` | Playwright E2E — full login journey |
| `vitest.config.ts` | Vitest configuration (jsdom env for components, setupFiles imports `@testing-library/jest-dom`) |
| `playwright.config.ts` | Playwright configuration (baseURL, browser matrix, retries) |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/page.tsx` | Replace boilerplate with Login Server Component |
| `src/app/layout.tsx` | Add Montserrat + Montserrat Alternates fonts; update metadata title |
| `src/app/globals.css` | Add brand design tokens to `@theme` block |
| `next.config.ts` | Add security headers (`CSP`, `X-Frame-Options`, `HSTS`, etc.) |

### New Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vitest` | ^3.x | Unit/integration test runner (Cloudflare-compatible) |
| `@vitejs/plugin-react` | ^4.x | React support for Vitest |
| `@testing-library/react` | ^16.x | Component testing utilities |
| `@testing-library/user-event` | ^14.x | User interaction simulation |
| `@testing-library/jest-dom` | ^6.x | DOM matchers (`.toBeInTheDocument()`, `.toBeDisabled()`, etc.) |
| `@playwright/test` | ^1.x | E2E testing |

---

## Implementation Approach

### Phase 0: Asset Preparation

> Download Figma media assets before any UI work. Use `get_media_files` tool.

- [ ] Download background artwork → `public/images/keyvisual-bg.jpg`
  (Figma Node: `662:14388` C_Keyvisual)
- [ ] Download ROOT FURTHER logo → `public/images/root-further-logo.png`
  (Figma Node: `662:14395` B.1_Key Visual / `2939:9548` MM_MEDIA_Root Further Logo)
- [ ] Download SAA 2025 logo → `public/images/saa-logo.svg`
  (Figma Node: `I662:14391;178:1033;178:1030` MM_MEDIA_Logo)
- [ ] Extract Google SVG icon → `src/app/_components/icons/google-icon.tsx`
  (Figma Node: `I662:14426;186:1766` MM_MEDIA_Google)
- [ ] Extract VN flag → `src/app/_components/icons/vn-flag-icon.tsx`
- [ ] Extract Chevron Down → `src/app/_components/icons/chevron-down-icon.tsx`

### Phase 1: Foundation (Shared Infrastructure)

> Shared infrastructure required by all phases. Must complete before UI work.

**1a. Design tokens** — `src/app/globals.css`
```css
@theme inline {
  /* ── Colors ── */
  --color-bg-dark: #00101A;
  --color-header-bg: rgba(11, 15, 18, 0.8);
  --color-btn-login-bg: #FFEA9E;
  --color-btn-login-text: #00101A;
  --color-text-white: #FFFFFF;
  --color-divider: #2E3940;
  --color-error: #EF4444;
  --color-gradient-from: #00101A;   /* shared by both gradient overlays */

  /* ── Spacing (from design-style.md Spacing table) ── */
  --spacing-xs: 4px;          /* icon-text gap inside language button */
  --spacing-sm: 8px;          /* icon-text gap inside login button */
  --spacing-md: 16px;         /* button py, content block pl */
  --spacing-lg: 24px;         /* button px, content block gap */
  --spacing-xl: 40px;         /* footer py */
  --spacing-2xl: 80px;        /* hero inner column (Frame 487) gap */
  --spacing-hero-px: 144px;   /* hero & header horizontal padding */
  --spacing-hero-py: 96px;    /* hero vertical padding */
  --spacing-hero-top: 88px;   /* B_Bìa top offset (header 80px + 8px gap) */
  --spacing-hero-gap: 120px;  /* B_Bìa flex-col gap */
  --spacing-footer-px: 90px;  /* footer horizontal padding */
  --spacing-header-py: 12px;  /* header vertical padding */
  --spacing-header-h: 80px;   /* header height */
  --spacing-btn-login-w: 305px; /* login button width */
  --spacing-btn-login-h: 60px;  /* login button height */

  /* ── Border Radius ── */
  --radius-sm: 4px;   /* language selector button */
  --radius-md: 8px;   /* login button */

  /* ── Fonts ── */
  --font-montserrat: var(--font-montserrat);
  --font-montserrat-alt: var(--font-montserrat-alt);
}
```

**1b. Font setup** — `src/app/layout.tsx`
- Import `Montserrat` (subsets: latin, vietnamese) and `Montserrat_Alternates`
- Expose as CSS variables `--font-montserrat` and `--font-montserrat-alt`
- Remove Geist fonts (no longer used)

**1c. TypeScript types** — `src/libs/types/auth.ts`
```ts
export type AuthUser = { id: string; email: string; name: string; avatar_url: string }
export type AuthError = { message: string; code?: string }
export type Locale = 'vi' | 'en'
```

**1d. Security headers** — `next.config.ts`
```ts
headers: async () => [{
  source: '/(.*)',
  headers: [
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    {
      key: 'Content-Security-Policy',
      value: [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://accounts.google.com",
        "connect-src 'self' https://*.supabase.co https://accounts.google.com",
        "img-src 'self' data: https://*.googleusercontent.com https://*.supabase.co",
        "frame-src https://accounts.google.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
      ].join('; ')
    },
    // Note: replace *.supabase.co with your project ref (e.g. abcdef.supabase.co) in production
  ]
}]
```

**1e. Next.js middleware** — `src/middleware.ts`
- Uses `src/libs/supabase/middleware.ts` factory to create Supabase client
- Calls `supabase.auth.getUser()` to check session
- Redirects unauthenticated users on protected routes → `/`
- Redirects authenticated users on `/` → `/dashboard`
- Refreshes session cookies on every request
- MUST export `config.matcher` to exclude static files and internals:
  ```ts
  export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|ico)$).*)'],
  }
  ```

### Phase 2: OAuth Backend (US1 — server-side)

> TDD: write failing tests first, then implement.

**Tests first** — `tests/unit/auth-callback.test.ts`:
- Test: callback with valid `code` → exchanges for session → redirects to `/dashboard`
- Test: callback with missing `code` → redirects to `/?error=auth_error`
- Test: callback with Supabase error → redirects to `/?error=<encoded_message>`

**Tests first** — `tests/unit/middleware.test.ts`:
- Test: unauthenticated user requests `/dashboard` → redirects to `/`
- Test: authenticated user requests `/` → redirects to `/dashboard`
- Test: unauthenticated user requests `/` → passes through (Login page renders)

**Tests first** — `tests/unit/login-button.test.tsx`:
- Renders "LOGIN With Google" text + Google icon
- Click → button enters loading state (disabled, spinner visible)
- During loading → button is non-interactive (`pointer-events: none`)
- `signInWithGoogle()` returns `{ url }` → `window.location.href` assigned, loading cleared
- `signInWithGoogle()` returns `{ error }` → `onError(message)` called, loading cleared, button re-enabled

**Tests first** — `tests/unit/login-section.test.tsx`:
- `initialError` prop → ErrorBanner renders with that message on mount
- `onError` callback from LoginButton → sets error state → ErrorBanner appears
- Dismiss (×) → `error` cleared → ErrorBanner unmounts
- No error → ErrorBanner not in DOM

Two distinct error paths exist — both must redirect to `/?error=<code>` so the Login page can display the banner:

**Error Path A — signInWithOAuth fails** (Supabase SDK error before any redirect):
- Caught inside `signInWithGoogle()` Server Action
- Server Action should NOT call `redirect()` on error — instead, use `useFormState` / `useActionState` or return an error object
- Pattern: the Server Action returns `{ error: string } | { url: string }`; the `LoginSection` client component checks the return value and either calls `window.location.href = url` (for redirect) or sets `error` state

**Error Path B — OAuth callback fails** (callback route receives error or missing code):
- Caught in `src/app/auth/callback/route.ts`
- Redirects to `/?error=<encoded_message>` — Login page reads it from `searchParams`

**Implement** `src/app/auth/callback/route.ts`:
```ts
// GET /auth/callback?code=...
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  if (!code) return NextResponse.redirect(`${origin}/?error=auth_error`)
  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) return NextResponse.redirect(`${origin}/?error=${encodeURIComponent(error.message)}`)
  return NextResponse.redirect(`${origin}/dashboard`)
}
```

**Implement** `src/libs/auth/actions.ts` (Server Action — returns result, no redirect):
```ts
'use server'
export async function signInWithGoogle(): Promise<{ url: string } | { error: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` }
  })
  if (error || !data.url) return { error: error?.message ?? 'auth_error' }
  return { url: data.url }
}
```
> Note: Returning `{ url }` instead of calling `redirect()` inside the action avoids the Cloudflare edge
> `NEXT_REDIRECT` exception behavior and gives the client component control over navigation.

### Phase 3: Login Page UI (US1 — frontend)

> TDD: write component tests first.

**Implement UI components** (in order — tests already defined in Phase 2 above):

1. **Icons** — `src/app/_components/icons/` (3 SVG components)

2. **LoginButton** — `src/app/_components/login/login-button.tsx`
   - `"use client"` component
   - MUST use native `<button>` element (NOT `<div>`) — provides implicit `role="button"`, Tab focus, Enter/Space keyboard activation per spec
   - Props: `onError: (message: string) => void`
   - Calls `signInWithGoogle()` server action on click; awaits the `{ url } | { error }` return
   - On `{ url }`: sets `window.location.href = url` to trigger the OAuth redirect
   - On `{ error }`: calls `onError(message)`, clears loading state
   - `isLoading` state → `disabled` attribute + show spinner (20×20 animate-spin), hide text+icon
   - `aria-busy={isLoading}` during loading
   - Styles: `bg-btn-login-bg rounded-md w-btn-login-w h-btn-login-h px-lg py-md` (all Phase 1a tokens), hover `translate-y-[-2px] transition-transform duration-200 ease-out`, focus `outline-2 outline-btn-login-bg outline-offset-3`

3. **ErrorBanner** — `src/app/_components/login/error-banner.tsx`
   - `"use client"` component
   - Props: `message: string | null`, `onDismiss: () => void`
   - Renders when `message` is truthy; returns `null` otherwise
   - Root element MUST have `role="alert"` and `aria-live="assertive"` so screen readers
     announce the error immediately when it appears (required for Lighthouse ≥90, SC-004)
   - Full-width banner below header (`absolute top-header-h left-0 right-0`, `bg-error`, white text)
   - Dismiss `<button>` with `aria-label="Đóng thông báo"` (×) on right
   - Auto-dismiss: `useEffect(() => { const t = setTimeout(onDismiss, 5000); return () => clearTimeout(t) }, [message, onDismiss])`
     — cleanup clears timer on unmount or message change, preventing memory leaks

4. **LoginSection** — `src/app/_components/login/login-section.tsx`
   - `"use client"` wrapper component — owns all interactive state for the login CTA
   - Props: `initialError?: string` (from server-side `?error` URL param)
   - State: `error: string | null` (initialized from `initialError`)
   - Renders: `<ErrorBanner message={error} onDismiss={() => setError(null)} />` + `<LoginButton onError={setError} />`
   - This is the single source of truth for the error state; avoids Server ↔ Client prop threading conflict

5. **HeroSection** — `src/app/_components/login/hero-section.tsx`
   - Server Component (no client state)
   - Does NOT contain background image or gradients — those live at page root (see step 8)
   - Props: `{ initialError?: string }` — received from Page, forwarded to LoginSection
   - Contains Frame 487 / Frame 550 content only:
     - ROOT FURTHER logo: `<Image src="/images/root-further-logo.png" alt="" priority className="object-contain" width={451} height={200} />` (design-style: decorative)
     - Hero text: two lines of static Vietnamese copy (`B.2_content`)
     - Renders `<LoginSection initialError={initialError} />` (client island)
   - Positioning: `absolute top-hero-top w-full px-hero-px py-hero-py flex flex-col gap-hero-gap` (uses Phase 1a tokens)

6. **Footer** — `src/app/_components/layout/footer.tsx`
   - Server Component
   - Copyright text, `font-montserrat-alt`, border-top divider

7. **Header** — `src/app/_components/layout/header.tsx`
   - Server Component wrapper
   - Logo (`next/image`, decorative `alt=""`)
   - Renders `<LanguageSelector>` (client island)

8. **Login Page** — `src/app/page.tsx` (replace boilerplate)
   - Server Component
   - **Next.js 15**: `searchParams` is `Promise<{[key: string]: string | string[] | undefined}>` — must be `await`ed:
     ```ts
     type Props = { searchParams: Promise<{ error?: string }> }
     export default async function LoginPage({ searchParams }: Props) {
       const { error } = await searchParams
       ...
     }
     ```
   - Reads `?error` search param → passes to `<HeroSection initialError={error} />`
   - C_Keyvisual and gradient overlays MUST be at the page root (not inside HeroSection)
     so the background spans the full viewport including the header area
   - Full-screen layout structure:
     ```tsx
     <main className="relative min-h-screen bg-bg-dark overflow-hidden">
       {/* C_Keyvisual: full-screen background (662:14388) */}
       <div className="absolute inset-0">
         <Image src="/images/keyvisual-bg.jpg" alt="" fill sizes="100vw" priority className="object-cover" />
       </div>
       {/* Rectangle 57: L→R gradient overlay (662:14392) */}
       <div className="absolute inset-0 bg-gradient-to-r from-gradient-from from-25% to-transparent" />
       {/* Cover: B→T gradient overlay (662:14390) */}
       <div className="absolute inset-0 bg-gradient-to-t from-gradient-from from-22% to-transparent" />
       {/* Page structure (z-index above bg) */}
       <Header />
       <HeroSection initialError={error} />
       <Footer />
     </main>
     ```
   - `from-gradient-from` uses the `--color-gradient-from` token defined in Phase 1a
   - `from-25%` and `from-22%` are Tailwind v4 built-in percentage stop modifiers (no brackets needed)

### Phase 4: Language Selection (US2)

> Depends on Phase 3 complete.

**Tests first** (`tests/unit/language-selector.test.tsx`):
- Default state: shows "VN" + flag + chevron down
- Click → dropdown opens, chevron rotates 180°
- Click outside → dropdown closes
- Select option → closes dropdown, updates displayed language, sets locale cookie

**Implement**:
- `LanguageSelector` — `"use client"`, manages `isOpen` state
- MUST use native `<button>` element with `aria-expanded={isOpen}` and `aria-haspopup="listbox"`
- `aria-label="Select language"` on the toggle button (visible label is "VN" but needs descriptive aria label)
- Dropdown items MUST be `role="option"` inside `role="listbox"` for screen reader compatibility
- On select: sets `locale` cookie client-side (`document.cookie = 'locale=en; path=/; max-age=31536000'`), then calls `router.refresh()` to re-render Server Components with new locale
- No Server Action needed — direct cookie write from client is sufficient for a locale preference
- Keyboard: Enter/Space to open, Escape to close (focus returns to button), Arrow keys navigate options
- `useEffect` to add `document` click listener for outside-click dismissal (cleanup on unmount)
- Chevron: `transition-transform duration-150` + `rotate-180` class toggled by `isOpen`

### Phase 5: Polish

- [ ] Verify responsive layout at 320px, 768px, 1440px (DevTools)
- [ ] Run Lighthouse accessibility audit → target ≥ 90
- [ ] Validate Tab → Enter flow for keyboard users
- [ ] Verify touch targets ≥ 44×44px on mobile
- [ ] Confirm `yarn lint` passes with zero errors
- [ ] JS-disabled fallback: add `<noscript>` tag inside `<body>` in `layout.tsx` with Vietnamese message:
  ```html
  <noscript>
    <p style="text-align:center;padding:2rem;color:#fff">
      Vui lòng bật JavaScript để sử dụng ứng dụng này.
    </p>
  </noscript>
  ```

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: LoginButton ↔ signInWithGoogle action; ErrorBanner ↔ error state
- [x] **External dependencies**: Supabase Auth Google OAuth (mocked in unit/integration; real in E2E)
- [x] **User workflows**: Full OAuth flow end-to-end (E2E only)

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Button click → loading state → error display |
| App ↔ External API | Yes | Supabase signInWithOAuth, exchangeCodeForSession |
| App ↔ Data Layer | No | Auth is managed by Supabase; no custom DB queries |
| Cross-platform | Yes | Responsive layout at 3 breakpoints |

### Mocking Strategy

| Dependency | Strategy | Rationale |
|------------|----------|-----------|
| `supabase.auth.signInWithOAuth` | Mock (Vitest) | Avoid real OAuth in unit tests; returns fake URL |
| `supabase.auth.exchangeCodeForSession` | Mock (Vitest) | Test error paths without real tokens |
| `supabase.auth.getUser` | Mock (Vitest) | Test middleware logic without real session |
| Google OAuth redirect | Real (Playwright) | E2E must verify real OAuth flow end-to-end |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Unauthenticated user visits `/` → Login page renders
   - [ ] Click "LOGIN With Google" → button disabled + spinner shown
   - [ ] OAuth callback with valid code → session created → redirect to `/dashboard`
   - [ ] Authenticated user visits `/` → redirected to `/dashboard` (middleware)

2. **Error Handling**
   - [ ] OAuth callback missing `code` param → redirect to `/?error=auth_error`
   - [ ] OAuth callback Supabase error → redirect to `/?error={message}`
   - [ ] `/?error=...` param present → ErrorBanner renders with message
   - [ ] Dismiss banner → banner hides, button re-enabled

3. **Edge Cases**
   - [ ] User clicks Login button rapidly → only one OAuth flow triggered (disabled state)
   - [ ] Language selector: click outside → closes without change
   - [ ] Page at 320px mobile → no horizontal scroll, button full-width

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| LoginButton component | 90%+ | High |
| Auth callback route | 95%+ | High |
| Middleware auth guard | 90%+ | High |
| Error banner | 80%+ | Medium |
| Language selector | 80%+ | Medium |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Supabase OAuth not configured in Supabase dashboard | Medium | High | Verify Google provider enabled + redirect URL whitelisted before coding |
| `NEXT_PUBLIC_SITE_URL` env var missing | Low | High | Add to `.env` + Cloudflare secrets before deploying |
| Cloudflare `nodejs_compat` flag incompatibility with new deps | Low | High | Test `yarn preview` after each new dependency |
| Tailwind v4 `@theme` token naming conflict with existing vars | Low | Medium | Namespace with `brand-` prefix; verify CSS output |
| Image optimization not supported in Cloudflare (without IMAGES binding) | Low | Medium | `wrangler.jsonc` already has `images: { binding: "IMAGES" }` — verify binding active |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` reviewed (3 open questions noted — proceed with reasonable defaults)
- [ ] Supabase project configured with Google OAuth provider
- [ ] `.env` file contains: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SITE_URL`
- [ ] Cloudflare Workers secrets set (for production): same 3 vars above
- [ ] Google OAuth credentials created in Google Cloud Console with correct redirect URI

### Open Questions (from spec review — proceed with defaults)

- **Q1** (Languages): Only VN shown in Figma. Default: implement VN-only for now; add EN placeholder.
- **Q2** (Error UI): Default to full-width banner below header at `top-20`. Can be swapped to toast later.
- **Q3** (Dashboard path): Default to `/dashboard`. Update if team specifies otherwise.

### External Dependencies

- Supabase project (Google OAuth provider enabled)
- Google Cloud Console project (OAuth 2.0 credentials)
- Figma media files (background, logos — downloaded in Phase 0)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown with parallel opportunities
2. **Verify** Supabase Google OAuth setup before starting Phase 2
3. **Begin** implementation following Phase 0 → 1 → 2 → 3 → 4 → 5 order

---

## Notes

- **Tailwind v4 design tokens**: Unlike v3, Tailwind v4 uses CSS `@theme` blocks instead of
  `tailwind.config.ts`. All brand tokens go in `src/app/globals.css` under `@theme inline {}`.
- **`src/middleware.ts` vs `src/libs/supabase/middleware.ts`**: The existing file in `libs/` is
  the Supabase client factory for middleware — not the Next.js middleware itself. The new
  `src/middleware.ts` is the Next.js middleware entry point that uses the factory.
- **Server Actions for OAuth (Cloudflare pattern)**: The `signInWithGoogle` Server Action returns
  `{ url }` instead of calling `redirect()` directly. This is required on Cloudflare because
  Next.js `redirect()` throws a `NEXT_REDIRECT` error internally; on Cloudflare Workers this
  exception may not be caught correctly by the OpenNext adapter. Returning the URL and calling
  `window.location.href` from the client component is the safe, adapter-independent pattern.
- **`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`**: This project uses the new Supabase naming convention
  (publishable key vs anon key). Both refer to the same public API key.
- **No custom DB migration needed**: Supabase Auth creates user records automatically on first
  Google OAuth login. The `auth.users` table is managed by Supabase internally.
