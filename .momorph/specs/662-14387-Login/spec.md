# Feature Specification: Login

**Frame ID**: `662:14387`
**Frame Name**: `Login`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-23
**Status**: Draft

---

## Overview

The Login screen is the application entry point for **SAA 2025 (Sun Annual Awards 2025)**.
It is a full-screen, dark-themed landing page that presents the "ROOT FURTHER" hero visual and
invites users to authenticate with their Google account. After successful authentication via
Google OAuth, users are redirected into the main application.

**Target users**: Sun* employees / invited participants of SAA 2025.
**Business context**: Gate-keeps the awards platform; only authenticated users may access
content beyond this screen.

---

## User Scenarios & Testing

### User Story 1 — Google Authentication (Priority: P1)

**As a** Sun* employee visiting the application for the first time,
**I want to** click "LOGIN With Google" and authenticate with my Google account,
**So that** I can access the SAA 2025 platform and explore its content.

**Why this priority**: This is the sole authentication mechanism on the screen and the
critical path to the entire application. Without it the app is inaccessible.

**Independent Test**: Navigate to `/` → click "LOGIN With Google" → Google OAuth flow
completes → redirected to authenticated home page.

**Acceptance Scenarios**:

1. **Given** the user is unauthenticated on the Login page,
   **When** they click the "LOGIN With Google" button,
   **Then** the Google OAuth popup/redirect opens.

2. **Given** the Google OAuth flow completes successfully with a valid account,
   **When** the system receives the OAuth callback,
   **Then** a Supabase session is created, the user is stored/updated in the database,
   and the user is redirected to the main dashboard / home page.

3. **Given** the Google OAuth flow is cancelled or fails,
   **When** the callback returns an error,
   **Then** the user is returned to the Login page and an appropriate error message is shown.

4. **Given** the user clicks "LOGIN With Google",
   **When** the authentication is in progress,
   **Then** the button is disabled and shows a loading indicator so the user cannot
   trigger multiple auth flows.

---

### User Story 2 — Language Selection (Priority: P2)

**As a** user who prefers a language other than Vietnamese,
**I want to** click the language selector ("VN") in the header,
**So that** I can switch the application language from the Login screen.

**Why this priority**: Accessibility and internationalisation — important but not blocking
the core auth flow.

**Independent Test**: On the Login page click the "VN" language toggle → a dropdown appears
with language options → selecting another language updates the UI locale.

**Acceptance Scenarios**:

1. **Given** the Login page is displayed,
   **When** the user clicks the "VN" language selector in the header,
   **Then** the language dropdown (`721:4942 Dropdown-ngôn ngữ`) opens below the button
   and the chevron icon rotates 180°.

2. **Given** the language dropdown is open,
   **When** the user selects a different language,
   **Then** the dropdown closes, the selected language code updates in the header,
   and the UI content switches to the chosen locale.

3. **Given** the language dropdown is open,
   **When** the user clicks outside the dropdown,
   **Then** the dropdown closes without changing the language.

---

### Edge Cases

- What happens if the Google OAuth provider is unavailable?
  → Show an error toast/banner: "Đăng nhập thất bại. Vui lòng thử lại sau."
- What if the user is already authenticated (has a valid Supabase session)?
  → Redirect immediately to the main dashboard without showing the Login screen.
- What if the device has JavaScript disabled?
  → Show a static fallback message instructing the user to enable JavaScript.

---

## UI/UX Requirements *(from Figma)*

> For exact visual values, CSS, and dimensions see:
> **[design-style.md](./design-style.md)**

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| C_Keyvisual | 662:14388 | Full-screen background artwork (decorative) | None |
| Gradient overlays | 662:14392, 662:14390 | Left-to-right and bottom-to-top dark gradients | None |
| A_Header | 662:14391 | Top navigation bar with logo and language selector | Language selector clickable |
| A.1_Logo | I662:14391;186:2166 | SAA 2025 logo — top-left | None |
| A.2_Language | I662:14391;186:1601 | Language toggle button "VN" | Click → opens language dropdown |
| B.1_Key Visual | 662:14395 | "ROOT FURTHER" brand logo image | None |
| B.2_content | 662:14753 | Hero text (2 lines, Vietnamese) | None |
| B.3_Login | 662:14425 | "LOGIN With Google" CTA button | Click → Google OAuth |
| D_Footer | 662:14447 | Copyright line at page bottom | None |

### Navigation Flow

- **From**: Direct URL access `/` (unauthenticated)
- **To (success)**: Dashboard / main authenticated page
- **To (language dropdown)**: `721:4942` Dropdown-ngôn ngữ overlay
- **Triggers**: Click on "LOGIN With Google" button; Click on language selector

### Visual Requirements

- **Responsive breakpoints**: mobile (< 768px), tablet (768–1023px), desktop (≥ 1024px).
  See `design-style.md → Responsive Specifications` for per-breakpoint changes.
- **Animations/Transitions**:
  - Login button: subtle lift on hover (`translateY(-2px)`) + transition 200ms ease-out.
  - Language chevron: rotate 180° when dropdown is open, 150ms ease-in-out.
  - Button loading state: opacity reduced, spinner shown.
- **Accessibility**:
  - All interactive elements MUST have `aria-label` or visible text.
  - Login button MUST have `role="button"` and proper focus styles (visible outline on Tab focus).
  - Language selector MUST manage `aria-expanded` for the dropdown.
  - Background image MUST have `alt=""` (decorative).
  - Color contrast MUST meet WCAG AA: white on #00101A ✅; #00101A on #FFEA9E ✅.
  - **Keyboard navigation**:
    - `Tab` MUST move focus in logical order: A.2_Language → B.3_Login.
    - `Enter` / `Space` on B.3_Login MUST trigger the Google OAuth flow.
    - `Enter` / `Space` on A.2_Language MUST open the language dropdown.
    - `Escape` MUST close the language dropdown and return focus to A.2_Language.
    - Focus ring MUST be visible on all interactive elements (2px solid outline).

### Error Message Display

When FR-006 is triggered (OAuth failure or cancellation):
- An error banner MUST appear **below the header** (below 80px, not overlapping the hero CTA).
- Alternatively, display as a **toast notification** at the top-right of the screen.
- Content: `"Đăng nhập thất bại. Vui lòng thử lại sau."` (default); specific messages for known errors.
- The message MUST be dismissible (close button or auto-dismiss after 5 seconds).
- Background: `#EF4444` (red) with white text to meet WCAG AA contrast.
- The B.3_Login button MUST return to its default (enabled) state after the error appears.

> **Open question**: Exact error message placement (toast vs. banner) to be confirmed with design team.
> See `design-style.md → Error Message Component` for visual spec.

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST display the Login page to unauthenticated users visiting `/`.
- **FR-002**: System MUST redirect authenticated users away from `/` to the dashboard.
- **FR-003**: Users MUST be able to initiate Google OAuth by clicking "LOGIN With Google".
- **FR-004**: System MUST create or update a Supabase user record on successful Google OAuth.
- **FR-005**: System MUST disable the Login button and show a loading state during auth.
- **FR-006**: System MUST display an error message if OAuth fails or is cancelled.
- **FR-007**: Users MUST be able to open the language dropdown via the header language button.
- **FR-008**: System MUST show copyright text in the footer at all times.

### Technical Requirements

- **TR-001**: Authentication MUST use Supabase Auth with Google OAuth provider;
  session tokens MUST be stored in HttpOnly cookies via `@supabase/ssr` (per constitution V).
- **TR-002**: The Login page MUST be a Next.js Server Component by default; the Login button
  MUST be a `"use client"` component for interactivity (per constitution II).
- **TR-003**: The background image MUST be served via `next/image` with appropriate `sizes`
  prop and `priority` flag for LCP optimisation.
- **TR-004**: The page MUST be responsive across mobile, tablet, and desktop breakpoints
  (per constitution IV).
- **TR-005**: Fonts (Montserrat, Montserrat Alternates) MUST be loaded via `next/font/google`.
- **TR-006**: The application MUST set security headers: `Content-Security-Policy`,
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and
  `Strict-Transport-Security` (per constitution V — OWASP).
- **TR-007**: Design color and spacing tokens MUST be declared in the Tailwind config file
  (not as inline arbitrary values), per constitution II TailwindCSS rules.
- **TR-008**: After successful OAuth callback, the system MUST redirect to `/dashboard`
  (or the originally requested protected route if using next-url redirect pattern).

> **Open question**: Confirm dashboard redirect path — is it `/dashboard`, `/home`, or another route?

### Key Entities

- **User**: Authenticated user record in Supabase. Key attributes: `id`, `email`, `name`,
  `avatar_url`, `provider` (google), `created_at`.

---

## API Dependencies

| Endpoint / Action | Method | Purpose | Status |
|-------------------|--------|---------|--------|
| Supabase Auth — `signInWithOAuth({ provider: 'google' })` | Client SDK | Initiates Google OAuth flow | Predicted |
| `/auth/callback` (Route Handler) | GET | Handles OAuth callback, exchanges code for session | Predicted (new) |
| Supabase Auth — `getUser()` | Server SDK | Checks existing session in middleware | Predicted |

---

## State Management

| State | Scope | Description |
|-------|-------|-------------|
| `isLoading` | Local (LoginButton component) | True while Google OAuth is in progress; disables button |
| `error` | Local (LoginPage component) | Holds OAuth error message to display to user |
| `locale` | Global (i18n context / cookie) | Current language selection |
| User session | Global (Supabase SSR cookie) | Persisted across requests via HttpOnly cookie |

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Unauthenticated user can complete Google OAuth and reach the dashboard in ≤ 3
  redirects.
- **SC-002**: Login button is visibly disabled and shows a spinner during OAuth — preventing
  duplicate authentication attempts.
- **SC-003**: Page renders correctly on mobile (320px), tablet (768px), and desktop (1440px)
  without horizontal scroll.
- **SC-004**: Lighthouse accessibility score ≥ 90 for the Login page.
- **SC-005**: WCAG AA color contrast met for all text elements.

---

## Out of Scope

- Email/password login — only Google OAuth is supported in this screen.
- User registration flow — handled by OAuth on first login.
- Password reset — not applicable.
- Social login providers other than Google (e.g., GitHub, Facebook).

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`) — to be created
- [ ] Database design completed (`.momorph/database.sql`) — to be created
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`) — ✅ completed 2026-03-23

---

## Notes

- The Login page is the root route `/`. Middleware (`src/libs/supabase/middleware.ts`)
  MUST intercept requests and redirect authenticated users to the dashboard.
- The `signInWithOAuth` call uses a `redirectTo` option pointing to `/auth/callback`
  which exchanges the OAuth code for a Supabase session.
- Language switching on the Login page affects the entire application locale; the selected
  language MUST be persisted (e.g., in a cookie) so it survives navigation.
- The hero text ("Bắt đầu hành trình...") is static copy and does not need to be fetched
  from an API.
- The "ROOT FURTHER" key visual is an image asset — source from Figma export or media files.
