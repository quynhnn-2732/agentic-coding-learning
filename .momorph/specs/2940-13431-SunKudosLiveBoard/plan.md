# Implementation Plan: Sun* Kudos - Live Board

**Frame**: `2940-13431-SunKudosLiveBoard`
**Date**: 2026-03-27
**Spec**: `specs/2940-13431-SunKudosLiveBoard/spec.md`

---

## Summary

Build the Sun* Kudos Live Board — the main peer-recognition hub at `/sun-kudos`. The page has four zones: Hero/CTA area, Highlighted Kudos carousel with filters, Spotlight Board (word cloud + live counter + ticker), and All Kudos feed with a stats/leaderboard sidebar. The approach is RSC-first with client component islands for interactivity, Supabase for data + auth + real-time, and mobile-first Tailwind styling.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS v4, Supabase (@supabase/ssr), next/image
**Database**: Supabase (PostgreSQL + RLS)
**Testing**: Vitest + React Testing Library (unit/integration), Playwright (E2E)
**State Management**: React useState/useEffect for local state; Supabase auth for global user
**API Style**: Supabase client SDK (no custom REST route handlers needed — direct DB queries via typed Supabase client in RSC and client components)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case files, ≤40 line functions, no dead code)
- [x] Uses approved libraries and patterns (Next.js App Router, Supabase, Tailwind v4)
- [x] Adheres to folder structure guidelines (`src/app/sun-kudos/`, `src/app/_components/sun-kudos/`, `src/libs/`)
- [x] Meets security requirements (RLS, server-side auth, no localStorage tokens, zod validation)
- [x] Follows testing standards (TDD red-green-refactor, unit + integration + E2E)

**Violations (if any)**: None anticipated.

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based grouping under `src/app/_components/sun-kudos/`. Shared components (Header, Footer) reused from existing `_components/homepage/` and `_components/layout/`.
- **RSC vs Client split**:
  - **Server Components (RSC)**: Page shell (`page.tsx`), Keyvisual, section headers, footer. Initial data fetched server-side via Supabase server client.
  - **Client Components (`"use client"`)**: `HighlightCarousel` (carousel state + filters), `KudoPostCard` (heart toggle, copy link), `SpotlightBoard` (word cloud + ticker + counter), `KudosStatsPanel` (mở quà button), `TopSunnerLeaderboard` (click navigation), `KudosFeed` (pagination "load more").
- **Styling Strategy**: Tailwind utility classes using named design tokens registered in `globals.css` under `@theme inline`. All new tokens prefixed `--color-kudos-*`, `--spacing-kudos-*`, `--radius-kudos-*`. Mobile-first: base = mobile, `md:` = tablet, `lg:` = desktop.
- **Data Fetching**:
  - **Initial load (SSR)**: RSC page fetches first page of feed, highlighted Kudos, stats, leaderboard, and spotlight data via Supabase server client. Data passed as props to client components.
  - **Client interactions**: Heart toggle, pagination ("load more"), filter changes — use Supabase browser client in client components.
  - **Real-time**: Supabase Realtime subscriptions in a client component for live counter, ticker, and feed updates.

### Spec API → Supabase Query Mapping

The spec lists REST-style API endpoints. Since this project uses Supabase client SDK directly (no custom Route Handlers), each "endpoint" maps to a Supabase query or RPC in `kudos-queries.ts`:

| Spec Endpoint | Supabase Implementation |
|---------------|------------------------|
| GET /kudos/feed | `supabase.from('kudos_feed_view').select().range(offset, offset+limit)` |
| GET /kudos/highlighted | `supabase.from('kudos_highlighted_view').select().eq('hashtag', ?).eq('department', ?)` |
| GET /kudos/stats | `supabase.rpc('get_user_kudos_stats', { p_user_id })` |
| GET /kudos/leaderboard | `supabase.rpc('get_leaderboard', { p_limit: 10 })` |
| GET /kudos/spotlight | `supabase.from('kudos_spotlight_view').select()` |
| POST /kudos/:id/heart | `supabase.from('kudo_hearts').upsert() / .delete()` |
| GET /hashtags | `supabase.from('hashtags').select()` |
| GET /departments | `supabase.from('departments').select()` |
| GET /users?search= | `supabase.from('profiles').select().ilike('name', '%search%')` |

### Data Fetching & Constitution Compliance

Per Constitution Principle II: "Data fetching MUST happen in Server Components or Route Handlers — never in `useEffect` for server data."

- **Server Component (initial load)**: The RSC page.tsx fetches ALL initial data (first page of feed, highlighted Kudos, stats, leaderboard, spotlight) and passes as props. This is the primary data source.
- **Client Component (user-initiated only)**: Heart toggles, "load more" pagination, filter changes, and Supabase Realtime subscriptions happen in client components via Supabase browser client. These are **user-initiated interactions**, not server data initialization — they comply with the constitution.

### Backend Approach

- **No custom Route Handlers needed** — all data operations use Supabase client SDK directly (typed query builder). This avoids an extra network hop and leverages RLS for authorization.
- **Database tables required** (new):
  - `kudos` — id, sender_id, receiver_id, content, category_tag, video_url, created_at
  - `kudo_hashtags` — kudo_id, hashtag_id (junction)
  - `kudo_images` — kudo_id, image_url, sort_order
  - `kudo_hearts` — kudo_id, user_id (unique constraint)
  - `hashtags` — id, name
  - `departments` — id, name
  - `secret_boxes` — id, user_id, status, content
- **RLS policies**: All tables require auth; hearts limited to one per user per kudo; users can only see their own stats.
- **Supabase Views/RPCs** (for complex queries):
  - `kudos_feed_view` — joins kudos + sender + receiver + heart count + images + hashtags
  - `kudos_highlighted_view` — top 5 by heart count with optional hashtag/dept filter
  - `get_user_kudos_stats(user_id)` — RPC returning stats + secret box counts
  - `get_leaderboard(limit)` — RPC returning top N gift recipients

### Integration Points

- **Existing Services**: Supabase Auth (Google OAuth — already implemented), HomepageHeader (reuse with `activePath="sun-kudos"`), HomepageFooter (reuse), WidgetButton (reuse FAB)
- **Shared Components**: `HomepageHeader`, `HomepageFooter`, `WidgetButton`, `LanguageSelector`, Icon components (NotificationBellIcon, AccountIcon, etc.)
- **New shared types**: `Kudo`, `KudosStats`, `User` (extended from `AuthUser`), `SecretBox`, `Hashtag`, `Department`

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/2940-13431-SunKudosLiveBoard/
├── spec.md              # Feature specification (done)
├── design-style.md      # Design style document (done)
├── plan.md              # This file
├── tasks.md             # Task breakdown (next step)
└── assets/              # Reference screenshots
```

### Source Code (affected areas)

```text
# Page + Layout
src/app/sun-kudos/
├── page.tsx                    # RSC: data fetching + page shell
├── loading.tsx                 # Skeleton loading state
└── error.tsx                   # Error boundary

# Feature Components
src/app/_components/sun-kudos/
├── kudos-keyvisual.tsx         # Keyvisual: hero background + gradient overlay (RSC)
├── kudos-banner.tsx            # A_KV: hero title + KUDOS logo (RSC)
├── kudos-action-bar.tsx        # A.1 Ghi nhận + Search pills (RSC, links only)
├── section-header.tsx          # Reusable section header pattern (RSC)
├── highlight-carousel.tsx      # B: Carousel container + B.2.1/B.2.2 inline arrows + filters ("use client")
├── highlight-kudo-card.tsx     # B.3: Single highlight card ("use client")
├── carousel-arrow.tsx          # Shared arrow button (used by both B.2 inline + B.5 pagination)
├── carousel-pagination.tsx     # B.5: Prev/page/next bar below carousel
├── filter-dropdown.tsx         # B.1.1/B.1.2: Hashtag/Dept dropdown ("use client")
├── spotlight-board.tsx         # B.7: Word cloud + counter + ticker ("use client")
├── kudos-feed.tsx              # C.2: Feed list + "load more" ("use client")
├── kudo-post-card.tsx          # C.3: Individual Kudo card ("use client")
├── kudo-user-info.tsx          # Sender/receiver block (shared between feed + highlight)
├── category-tag.tsx            # Category label (e.g., "IDOL GIỚI TRẺ")
├── hashtag-list.tsx            # Hashtag row with truncation
├── image-gallery.tsx           # Image thumbnails + video overlay
├── heart-button.tsx            # Heart toggle with optimistic update
├── copy-link-button.tsx        # Copy URL + toast notification
├── toast.tsx                   # Lightweight toast notification (auto-dismiss after 3s)
├── kudos-stats-panel.tsx       # D.1: Stats sidebar ("use client")
├── open-gift-button.tsx        # D.1.8: Mở Secret Box button
├── top-sunner-leaderboard.tsx  # D.3: Top 10 list
└── leaderboard-item.tsx        # Single leaderboard entry

# New Icon Components
src/app/_components/icons/
├── pen-icon.tsx                # Ghi nhận button
├── search-icon.tsx             # Search button
├── heart-icon.tsx              # Heart (filled + outline variants)
├── copy-link-icon.tsx          # Copy link
├── sent-arrow-icon.tsx         # Sender → Receiver arrow
├── gift-icon.tsx               # Mở quà button
├── play-icon.tsx               # Video overlay
├── left-arrow-icon.tsx         # Carousel prev
├── right-arrow-icon.tsx        # Carousel next
└── pan-zoom-icon.tsx           # Spotlight control

# Types + Validation
src/libs/types/
└── kudos.ts                    # Kudo, KudosStats, SecretBox, Hashtag, Department types

src/libs/validations/
└── kudos-schemas.ts            # Zod schemas for API response validation (heartToggle, feed, stats)

# Data / Supabase
src/libs/data/
└── kudos-queries.ts            # Supabase query helpers (server + client), validates responses with zod

# Database (Supabase CLI)
supabase/migrations/
└── YYYYMMDD_create_kudos_tables.sql

# Tests
tests/
├── unit/sun-kudos/
│   ├── kudos-banner.test.tsx
│   ├── kudos-action-bar.test.tsx
│   ├── section-header.test.tsx
│   ├── kudo-post-card.test.tsx
│   ├── kudo-user-info.test.tsx
│   ├── heart-button.test.tsx
│   ├── copy-link-button.test.tsx
│   ├── category-tag.test.tsx
│   ├── hashtag-list.test.tsx
│   ├── image-gallery.test.tsx
│   ├── highlight-carousel.test.tsx
│   ├── carousel-pagination.test.tsx
│   ├── filter-dropdown.test.tsx
│   ├── kudos-feed.test.tsx
│   ├── kudos-stats-panel.test.tsx
│   ├── open-gift-button.test.tsx
│   ├── top-sunner-leaderboard.test.tsx
│   ├── leaderboard-item.test.tsx
│   ├── spotlight-board.test.tsx
│   └── toast.test.tsx
├── integration/
│   └── sun-kudos-page.test.tsx
└── e2e/
    └── sun-kudos.spec.ts
```

### Modified Files

| File | Changes |
|------|---------|
| `src/app/globals.css` | Add Kudos-specific tokens: `--color-kudos-card-bg` (#FFF8E1), `--color-kudos-container-dark` (#00070C), `--color-kudos-heart-active` (#FF0000), `--radius-kudos-card` (24px), `--radius-kudos-highlight` (16px), `--radius-kudos-stats` (17px), `--radius-kudos-pill` (68px), `--radius-kudos-spotlight` (47.14px). Many tokens already exist (`--color-bg-dark`, `--color-accent-gold`, `--color-btn-kudos-bg`, `--spacing-page-px`) |
| `src/libs/types/auth.ts` | Extend `AuthUser` with optional fields: department (string), starCount (number), title (string) |
| `src/middleware.ts` | Add `/sun-kudos` to protected routes matcher |

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| (none new) | — | All functionality achievable with existing deps (Next.js, Supabase, Tailwind) |

**Note on Spotlight Board**: If positioned HTML/CSS word cloud proves insufficient for hundreds of names, consider adding `d3-cloud` (lightweight word cloud layout). This is deferred until Phase 4 — start with CSS-positioned approach first.

---

## Implementation Strategy

### Phase Breakdown

#### Phase 0: Foundation & Tokens
- Register all design tokens from design-style.md into `globals.css` (only new tokens not already present — see Notes)
- Create TypeScript types (`src/libs/types/kudos.ts`)
- Create Zod validation schemas (`src/libs/validations/kudos-schemas.ts`) for feed response, heart toggle response, stats RPC response
- Create Supabase migration for kudos tables + RLS policies (`supabase/migrations/`)
- Create `kudos-queries.ts` with server/client query helpers (validates responses with zod)
- Add `/sun-kudos` route protection to middleware
- Download static assets from Figma via `get_media_files`: Keyvisual background, KUDOS logo SVG to `public/images/sun-kudos/`

#### Phase 1: Page Shell + Static Layout (US5 — Navigation)
- Create `src/app/sun-kudos/page.tsx` (RSC shell with Supabase auth + initial data fetch)
- Create `loading.tsx` skeleton and `error.tsx` boundary
- Create `KudosKeyvisual` (hero background image + gradient overlay, same pattern as homepage)
- Reuse `HomepageHeader` with `activePath="sun-kudos"` (already supported, zero changes)
- Create `KudosBanner` (hero title "Hệ thống ghi nhận và cảm ơn" + KUDOS logo)
- Create `KudosActionBar` (Ghi nhận pill → `/write-kudo`, Search pill → search overlay)
- Create `SectionHeader` (reusable pattern for HIGHLIGHT KUDOS / SPOTLIGHT BOARD / ALL KUDOS section headers)
- Reuse `HomepageFooter` + `WidgetButton`
- **TDD**: Write tests for each component rendering; verify navigation links and active nav state

#### Phase 2: Kudo Post Card + Feed (US1 — Core Feed)
- Create `KudoUserInfo` (sender/receiver with avatar, name, dept, stars)
- Create `CategoryTag` component
- Create `HashtagList` with truncation
- Create `ImageGallery` (thumbnails + video play overlay)
- Create `HeartButton` with optimistic toggle (Supabase insert/delete `kudo_hearts`)
- Create `Toast` component (lightweight auto-dismiss notification, 3s duration)
- Create `CopyLinkButton` with Clipboard API + fallback (uses Toast for "Link copied — ready to share!")
- Assemble `KudoPostCard` from above sub-components
- Create `KudosFeed` with "load more" pagination via Supabase cursor query
- Wire data: RSC fetches first page → passes to client `KudosFeed`
- **TDD**: Unit tests for each sub-component; integration test for feed data flow

#### Phase 3: Highlighted Kudos Carousel (US2)
- Create `CarouselArrow` (shared button component: circle bg, arrow icon, disabled state — used for both B.2 inline and B.5 pagination arrows, sized via props)
- Create `FilterDropdown` (Hashtag / Department — fetches options from Supabase)
- Create `HighlightKudoCard` (reuses `KudoUserInfo`, `CategoryTag`, `HashtagList`, `HeartButton`; adds "Xem chi tiết" link)
- Create `CarouselPagination` (B.5: prev/page indicator "X/5"/next bar using `CarouselArrow`)
- Assemble `HighlightCarousel` — contains B.2.1/B.2.2 inline arrows (large, flanking cards) + card display + `CarouselPagination` below. Manages page state, filter state, data refetch on filter change
- **TDD**: Test dual navigation (inline arrows + pagination bar), disabled on boundaries, filter application

#### Phase 4: Stats Sidebar + Leaderboard (US4)
- Create `KudosStatsPanel` — fetches via `get_user_kudos_stats` RPC
- Create `OpenGiftButton` (disabled when 0 secret boxes; click opens dialog — dialog deferred to separate frame)
- Create `TopSunnerLeaderboard` + `LeaderboardItem`
- Wire sidebar into page layout (flex row with feed, responsive stack on mobile)
- **TDD**: Test stat rendering, button disabled state, leaderboard click navigation

#### Phase 5: Spotlight Board (US3)
- Create `SpotlightBoard` container (dark card with rounded border)
- Implement word cloud — start with CSS positioned `<span>` elements with varying font-size/opacity
- Add Kudos counter (live count from Supabase)
- Add live ticker (scrolling activity log)
- Add spotlight search input (client-side filter of visible names)
- Add pan/zoom toggle (if CSS approach, use CSS transform scale + translate)
- **TDD**: Test counter rendering, ticker append, search highlight

#### Phase 6: Real-Time + Polish (US6 + Edge Cases)
- Set up Supabase Realtime subscription on `kudos` table inserts
- On new Kudo: increment counter, add ticker entry, prepend to feed
- Implement all skeleton loading states
- Implement per-section error states with retry
- Implement empty states (no Kudos, no leaderboard data, no highlights)
- Responsive fine-tuning (mobile sidebar below feed, single-card carousel, etc.)
- Accessibility audit (keyboard nav, ARIA attributes, contrast check)
- **TDD**: Test real-time handler, loading/error/empty states, responsive layout

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Spotlight word cloud performance with 500+ names | Medium | Medium | Start with CSS positioning (limit to ~100 visible names with pagination). Defer canvas/D3 to optimization phase if needed |
| Supabase Realtime latency / connection drops | Low | Medium | Implement reconnection logic + fallback to 30s polling. Show "live" indicator |
| Database schema not ready (backend team dependency) | Medium | High | Use mock data + Supabase local dev. Define schema upfront in migration file and proceed |
| KUDOS logo font (SVN-Gotham) licensing | Low | Low | Use pre-rendered PNG/SVG image instead of web font |
| Large feed payload on initial load (many Kudos) | Medium | Medium | Limit initial SSR to 10 items. "Load more" fetches 10 at a time client-side |

### Estimated Complexity

- **Frontend**: High (many components, carousel, word cloud, real-time)
- **Backend**: Medium (Supabase schema + RLS + RPCs, no custom server)
- **Testing**: High (many interactive components, real-time, pagination states)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: Feed pagination, carousel + filter data flow, heart toggle optimistic update + server sync
- [x] **External dependencies**: Supabase auth, Supabase DB queries, Supabase Realtime
- [x] **Data layer**: Kudos feed query, highlighted query with filters, stats RPC, leaderboard RPC
- [x] **User workflows**: Browse → heart → copy link, carousel navigation, filter → carousel update

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Heart toggle state sync, carousel page state, filter → refetch |
| Service ↔ Service | No | N/A (no backend services) |
| App ↔ External API | Yes | Supabase queries (mock), Supabase Realtime (mock) |
| App ↔ Data Layer | Yes | Feed CRUD, heart insert/delete, stats RPC |
| Cross-platform | Yes | Mobile responsive (sidebar below feed), tablet 2-col |

### Test Environment

- **Environment type**: Local (Vitest jsdom), Playwright localhost:3000
- **Test data strategy**: Mock Supabase responses in unit/integration; fixture data for E2E
- **Isolation approach**: Fresh mock state per test; no shared mutable state

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase server client | Mock (vi.mock) | Consistent in unit tests; follows existing pattern |
| Supabase browser client | Mock (vi.mock) | Client-side interactions must be deterministic |
| Supabase Realtime | Mock (custom event emitter) | Cannot rely on live connection in tests |
| Clipboard API | Mock (vi.fn) | Not available in jsdom |
| next/navigation | Mock (vi.mock) | Standard Next.js testing pattern |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Page loads with feed data, highlighted Kudos, stats, and leaderboard
   - [x] User hearts a Kudo → heart turns red, count increments
   - [x] User copies link → clipboard has URL, toast appears
   - [x] Carousel prev/next navigates between highlighted Kudos
   - [x] Filter selects a hashtag → carousel updates with filtered data
   - [x] "Load more" appends next page of Kudos to feed

2. **Error Handling**
   - [x] Feed API fails → error banner with retry in feed zone only
   - [x] Heart toggle fails server-side → rollback optimistic UI
   - [x] Auth session expired → redirect to login
   - [x] Realtime connection drops → fallback to polling

3. **Edge Cases**
   - [x] Zero Kudos in feed → empty state message + CTA
   - [x] Zero highlighted Kudos → section hidden
   - [x] Carousel on first/last page → prev/next disabled
   - [x] Zero Secret Boxes → "Mở quà" button disabled
   - [x] Content exceeds 5 lines → truncated with "..."

### Tooling & Framework

- **Test framework**: Vitest (unit/integration), Playwright (E2E)
- **Supporting tools**: React Testing Library, vi.mock, page.route (Playwright)
- **CI integration**: `yarn test` (Vitest) + `yarn test:e2e` (Playwright) in PR checks

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Core components (KudoPostCard, HeartButton, CopyLink) | 90%+ | High |
| Carousel + Pagination | 85%+ | High |
| Stats/Leaderboard | 80%+ | Medium |
| Spotlight Board | 70%+ | Medium |
| Real-time handlers | 75%+ | Low |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved by stakeholders
- [x] Codebase research completed (this plan)
- [ ] Database migration designed (Phase 0 task)
- [ ] Supabase RPCs/Views defined (Phase 0 task)

### External Dependencies

- Supabase project with Realtime enabled (confirm with backend team)
- Keyvisual background image for Sun* Kudos (download from Figma)
- KUDOS logo SVG/PNG asset (download from Figma)

---

## Open Questions (from spec.md — decisions for planning)

These remain from the spec review. For planning purposes, the following **default assumptions** are used. If answers differ, adjust implementation accordingly:

| Question | Default Assumption | Impact if Different |
|----------|-------------------|---------------------|
| Q1: Video playback | Inline `<video>` with play/pause | Modal variant: add modal component |
| Q2: Heart own Kudos | Allowed | If restricted: add sender_id != user_id check in RLS |
| Q3: Feed pagination | "Load more" button | Infinite scroll: add IntersectionObserver instead |
| Q6: Real-time transport | Supabase Realtime | WebSocket/SSE: add custom server endpoint |
| Q7: Spotlight renderer | CSS positioned divs | Canvas/D3: add d3-cloud dependency in Phase 5 |
| Q8: Hashtag click | Filters HIGHLIGHT section (scroll up) | If filters feed: add feed filter state |

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown with dependencies and parallel opportunities
2. **Review** tasks.md for TDD test-first ordering
3. **Begin** Phase 0 (Foundation & Tokens) — can start immediately

---

## Notes

- The `HomepageHeader` already supports `activePath="sun-kudos"` — zero changes needed for header reuse.
- Many design tokens from design-style.md overlap with existing globals.css tokens (e.g., `--color-bg-dark`, `--color-accent-gold`, `--color-btn-kudos-bg`, `--spacing-page-px`). Only new/Kudos-specific tokens need to be added.
- The Spotlight Board is the highest-complexity component. Phase 5 isolates it so the page is fully functional (feed + carousel + stats) before tackling it.
- Database schema and RLS should be reviewed with the backend team before Phase 0 migration is run against production Supabase.
