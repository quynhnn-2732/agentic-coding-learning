# Tasks: Sun* Kudos - Live Board

**Frame**: `2940-13431-SunKudosLiveBoard`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1–US6)
- **|**: File path affected by this task
- **TDD**: Constitution requires test-first. Within each story phase, write failing tests BEFORE implementing the component.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Design tokens, types, database schema, query helpers, assets

- [x] T001 Register Kudos-specific design tokens into globals.css: `--color-kudos-card-bg` (#FFF8E1), `--color-kudos-container-dark` (#00070C), `--color-kudos-heart-active` (#FF0000), `--radius-kudos-card` (24px), `--radius-kudos-highlight` (16px), `--radius-kudos-stats` (17px), `--radius-kudos-pill` (68px), `--radius-kudos-spotlight` (47.14px) — skip tokens already present (--color-bg-dark, --color-accent-gold, --color-btn-kudos-bg, --spacing-page-px) | src/app/globals.css
- [x] T002 [P] Create TypeScript types: Kudo (with isHearted, categoryTag, videoUrl), User (extended from AuthUser with department, starCount, title), KudosStats, SecretBox, Hashtag, Department | src/libs/types/kudos.ts
- [x] T003 [P] Create Zod validation schemas for: kudoSchema, kudosFeedResponseSchema, heartToggleResponseSchema, kudosStatsSchema, leaderboardResponseSchema | src/libs/validations/kudos-schemas.ts
- [x] T004 [P] Extend AuthUser type with optional fields: department (string), starCount (number), title (string) | src/libs/types/auth.ts
- [x] T005 Create Supabase migration: tables (kudos, kudo_hashtags, kudo_images, kudo_hearts, hashtags, departments, secret_boxes) + RLS policies (auth required, one heart per user per kudo, own stats only) + views (kudos_feed_view, kudos_highlighted_view, kudos_spotlight_view) + RPCs (get_user_kudos_stats, get_leaderboard) | supabase/migrations/YYYYMMDD_create_kudos_tables.sql
- [x] T006 Create Supabase query helpers with zod validation: fetchKudosFeed(page, limit), fetchHighlightedKudos(hashtag?, department?), fetchUserStats(), fetchLeaderboard(), fetchSpotlight(), toggleHeart(kudoId), fetchHashtags(), fetchDepartments(), searchUsers(query) — export server and client variants | src/libs/data/kudos-queries.ts
- [x] T007 [P] Add `/sun-kudos` to protected routes matcher (already protected by default — middleware protects all non-public routes) | src/middleware.ts
- [x] T008 [P] Download static assets from Figma via get_media_files: Keyvisual background image, KUDOS logo SVG → save to public/images/sun-kudos/ | public/images/sun-kudos/
- [x] T009 [P] Create icon components: PenIcon (24×24), SearchIcon (24×24), HeartIcon (filled + outline, 32px), CopyLinkIcon (24×24), SentArrowIcon (32×32), GiftIcon (24×24), PlayIcon (48×48), LeftArrowIcon (28×28), RightArrowIcon (28×28), PanZoomIcon | src/app/_components/icons/{pen,search,heart,copy-link,sent-arrow,gift,play,left-arrow,right-arrow,pan-zoom}-icon.tsx

**Checkpoint**: Foundation infrastructure ready — all types, queries, tokens, and icons available.

---

## Phase 2: Foundation (Page Shell — US5 Navigation)

**Purpose**: Page structure, static layout, and navigation links. Blocking prerequisite for all story phases.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T010 Write failing tests for KudosBanner (renders title + logo), KudosActionBar (renders pills with correct hrefs), SectionHeader (renders subtitle + divider + title) | tests/unit/sun-kudos/kudos-banner.test.tsx, tests/unit/sun-kudos/kudos-action-bar.test.tsx, tests/unit/sun-kudos/section-header.test.tsx
- [x] T011 [P] Create KudosKeyvisual: full-width hero background image (1440×512) with gradient overlay (25deg, #00101A → transparent), same pattern as homepage keyvisual. RSC. | src/app/_components/sun-kudos/kudos-keyvisual.tsx
- [x] T012 [P] Create KudosBanner: "Hệ thống ghi nhận và cảm ơn" title (Montserrat 36px/700/44px, gold) + KUDOS logo image (593×104). RSC. | src/app/_components/sun-kudos/kudos-banner.tsx
- [x] T013 [P] Create KudosActionBar: two pill-shaped buttons — "Ghi nhận" (738×72, pen icon, Link to /write-kudo) + "Tìm kiếm sunner" (381×72, search icon). Pill style: rounded-[68px], border 1px #998C5F, bg rgba(255,234,158,0.10). RSC. | src/app/_components/sun-kudos/kudos-action-bar.tsx
- [x] T014 [P] Create SectionHeader: reusable RSC for section headers — subtitle (24px/700, white) + 1px divider (#2E3940) + title (57px/700, -0.25px ls, gold #FFEA9E). Used for HIGHLIGHT KUDOS, SPOTLIGHT BOARD, ALL KUDOS. Padding 0 144px. | src/app/_components/sun-kudos/section-header.tsx
- [x] T015 Create page.tsx RSC shell: async function, Supabase auth (getUser), fetch initial data (feed, highlighted, stats, leaderboard, spotlight) via kudos-queries.ts server helpers, compose layout with: KudosKeyvisual → HomepageHeader(activePath="sun-kudos") → KudosBanner → KudosActionBar → SectionHeaders → placeholder divs for carousel/spotlight/feed/sidebar → HomepageFooter → WidgetButton | src/app/sun-kudos/page.tsx
- [x] T016 [P] Create loading.tsx: skeleton screen matching page zones — header skeleton, hero area, carousel skeleton cards, spotlight skeleton, feed skeleton (3 cards with avatar+text placeholders), sidebar skeleton | src/app/sun-kudos/loading.tsx
- [x] T017 [P] Create error.tsx: error boundary with "Something went wrong" message + retry button. Dark bg matching page style. | src/app/sun-kudos/error.tsx

**Checkpoint**: Page shell renders at /sun-kudos with header (Sun* Kudos active), keyvisual, banner, action bar, section headers, and footer. Navigation links work.

---

## Phase 3: User Story 1 — Browse All Kudos Feed (Priority: P1) 🎯 MVP

**Goal**: Display paginated Kudo post cards with heart toggle, copy link, avatars, category tags, hashtags, and images.

**Independent Test**: Load /sun-kudos with mock feed data → ALL KUDOS section shows Kudo cards with all fields.

### Tests First (US1)

- [x] T018 [US1] Write failing unit tests for: KudoUserInfo (renders sender/receiver avatars, names, departments, stars, sent arrow), CategoryTag (renders gold label), HashtagList (renders up to 5 tags, truncation), ImageGallery (renders thumbnails, video overlay when videoUrl present) | tests/unit/sun-kudos/kudo-user-info.test.tsx, tests/unit/sun-kudos/category-tag.test.tsx, tests/unit/sun-kudos/hashtag-list.test.tsx, tests/unit/sun-kudos/image-gallery.test.tsx
- [x] T019 [US1] Write failing unit tests for: HeartButton (toggle red/gray, count ±1, optimistic update), Toast (renders message, auto-dismiss 3s), CopyLinkButton (copies URL, shows toast) | tests/unit/sun-kudos/heart-button.test.tsx, tests/unit/sun-kudos/toast.test.tsx, tests/unit/sun-kudos/copy-link-button.test.tsx
- [x] T020 [US1] Write failing unit tests for: KudoPostCard (assembles sub-components, 5-line truncation, click navigates to /kudos/:id), KudosFeed (renders list, "load more" button appends next page) | tests/unit/sun-kudos/kudo-post-card.test.tsx, tests/unit/sun-kudos/kudos-feed.test.tsx

### Implementation (US1)

- [x] T021 [P] [US1] Create KudoUserInfo: sender (left) + SentArrowIcon + receiver (right). Each shows avatar (circle, 48px), name (bold), department, star count. Click avatar/name → Link to /profile/:id. Flex row, gap 24px, 600×123 (feed) / 480×123 (highlight via prop). | src/app/_components/sun-kudos/kudo-user-info.tsx
- [x] T022 [P] [US1] Create CategoryTag: renders category string (e.g., "IDOL GIỚI TRẺ") as inline-block, Montserrat 16px/700/24px, ls 0.5px, color #00101A. Positioned above content, below time. | src/app/_components/sun-kudos/category-tag.tsx
- [x] T023 [P] [US1] Create HashtagList: renders hashtag strings as flex row, gap ~30px, max 5 visible, truncation "..." for overflow. Text Montserrat 16px/700, color #00101A. Click tag → scroll to highlight section + apply hashtag filter (callback prop). | src/app/_components/sun-kudos/hashtag-list.tsx
- [x] T024 [P] [US1] Create ImageGallery: renders up to 5 image thumbnails (flex row, gap 16px, 88px height). When videoUrl present, shows PlayIcon overlay (48×48 circle, rgba(0,0,0,0.5) bg, centered). Click image → full-size view. | src/app/_components/sun-kudos/image-gallery.tsx
- [x] T025 [P] [US1] Create HeartButton: "use client". Toggle heart (filled red / outline gray). Optimistic: instant UI update (color + count ±1) → call toggleHeart(kudoId) from kudos-queries.ts → rollback on error. Props: kudoId, initialCount, initialIsHearted. | src/app/_components/sun-kudos/heart-button.tsx
- [x] T026 [P] [US1] Create Toast: "use client". Lightweight auto-dismiss notification (3s). Fixed position bottom-center. Accept message string. Animate: fadeIn + slideUp on mount, fadeOut on dismiss. | src/app/_components/sun-kudos/toast.tsx
- [x] T027 [P] [US1] Create CopyLinkButton: "use client". Copies Kudo URL to clipboard (navigator.clipboard.writeText, fallback for unsupported). Shows Toast "Link copied — ready to share!" on success. 145×56, padding 16px, radius 4px. | src/app/_components/sun-kudos/copy-link-button.tsx
- [x] T028 [US1] Assemble KudoPostCard: "use client". Composes KudoUserInfo + divider (1px #FFEA9E) + time (16px, #999, format HH:mm - MM/DD/YYYY) + CategoryTag + content block (border 1px #FFEA9E, p 16 24, r 12, bg gold/40%, max 5 lines truncation) + ImageGallery + HashtagList + divider + action bar (HeartButton left, CopyLinkButton right). Card: 680px, r 24, bg #FFF8E1, p 40 40 16 40. Click card body → navigate to /kudos/:id. | src/app/_components/sun-kudos/kudo-post-card.tsx
- [x] T029 [US1] Create KudosFeed: "use client". Receives initial feedKudos[] from RSC props. Renders KudoPostCard list (gap 24px). "Load more" button at bottom → calls fetchKudosFeed(nextPage) → appends results. Manages feedPage, feedHasMore state. | src/app/_components/sun-kudos/kudos-feed.tsx
- [x] T030 [US1] Wire KudosFeed into page.tsx: replace feed placeholder with KudosFeed component, pass initial data from RSC fetch | src/app/sun-kudos/page.tsx

**Checkpoint**: ALL KUDOS feed displays Kudo cards with sender/receiver, time, category tag, content, images, hashtags, heart toggle, and copy link. "Load more" pagination works.

---

## Phase 4: User Story 2 — Highlighted Kudos Carousel (Priority: P1)

**Goal**: Display top 5 most-hearted Kudos in a carousel with dual navigation and filter dropdowns.

**Independent Test**: Load page with highlighted data → carousel shows cards, prev/next works, filters refetch data.

### Tests First (US2)

- [ ] T031 [US2] Write failing unit tests for: CarouselArrow (renders, disabled state, click callback), FilterDropdown (renders options, select triggers callback), HighlightKudoCard (renders card with "Xem chi tiết" link), CarouselPagination (page indicator "X/5", arrow disabled on boundaries), HighlightCarousel (dual nav, filter state) | tests/unit/sun-kudos/highlight-carousel.test.tsx, tests/unit/sun-kudos/carousel-pagination.test.tsx, tests/unit/sun-kudos/filter-dropdown.test.tsx

### Implementation (US2)

- [ ] T032 [P] [US2] Create CarouselArrow: shared arrow button — circle bg (default transparent / hover rgba(0,0,0,0.5)), configurable size (56px for B.2 inline / 48px for B.5 pagination), disabled state (opacity 0.3, pointer-events none). Props: direction, size, disabled, onClick. | src/app/_components/sun-kudos/carousel-arrow.tsx
- [ ] T033 [P] [US2] Create FilterDropdown: "use client". Dropdown button (padding 16px, border 1px #998C5F, bg gold/10%, r 4px) with chevron icon. Fetches options from Supabase (hashtags or departments). Active state: bg gold/40%, border gold. Props: variant ("hashtag" | "department"), onSelect. | src/app/_components/sun-kudos/filter-dropdown.tsx
- [ ] T034 [P] [US2] Create HighlightKudoCard: reuses KudoUserInfo (480px variant), CategoryTag, HashtagList, HeartButton. Adds "Xem chi tiết" Link to /kudos/:id. Card: 528px, border 4px #FFEA9E, r 16, bg #FFF8E1, p 24 24 16 24. Content truncated at 3 lines. | src/app/_components/sun-kudos/highlight-kudo-card.tsx
- [ ] T035 [P] [US2] Create CarouselPagination: B.5 bar. Centered flex row, gap 32px, padding 0 144px. Prev/next CarouselArrows (48px) + page indicator (Montserrat 28px/700/36px, #999, "2/5"). | src/app/_components/sun-kudos/carousel-pagination.tsx
- [ ] T036 [US2] Assemble HighlightCarousel: "use client". Contains SectionHeader("HIGHLIGHT KUDOS") + filter row (Hashtag + Phòng ban dropdowns) + carousel area (B.2 inline CarouselArrows flanking cards, 56px) + CarouselPagination below. State: highlightPage, highlightFilter. Filter change → refetch via fetchHighlightedKudos(). | src/app/_components/sun-kudos/highlight-carousel.tsx
- [ ] T037 [US2] Wire HighlightCarousel into page.tsx: replace carousel placeholder, pass initial highlighted data + hashtags + departments from RSC | src/app/sun-kudos/page.tsx

**Checkpoint**: HIGHLIGHT KUDOS carousel shows up to 5 cards with dual navigation. Hashtag/Department filters work.

---

## Phase 5: User Story 4 — Stats Sidebar & Leaderboard (Priority: P2)

**Goal**: Display personal Kudos stats and Top 10 Sunner leaderboard in right sidebar.

**Independent Test**: Load sidebar with mock data → 6 stat rows + "Mở quà" button + 10 leaderboard items render.

### Tests First (US4)

- [ ] T038 [US4] Write failing unit tests for: KudosStatsPanel (6 stat rows with labels + values, divider), OpenGiftButton (renders, disabled when 0 boxes), LeaderboardItem (avatar + name + desc, click navigates), TopSunnerLeaderboard (renders 10 items) | tests/unit/sun-kudos/kudos-stats-panel.test.tsx, tests/unit/sun-kudos/open-gift-button.test.tsx, tests/unit/sun-kudos/top-sunner-leaderboard.test.tsx, tests/unit/sun-kudos/leaderboard-item.test.tsx

### Implementation (US4)

- [ ] T039 [P] [US4] Create LeaderboardItem: heart icon (red, 16px) + avatar (circle, 32px) + name (Montserrat 14px/700, white) + description (12px/400, #999). Click → Link to /profile/:id. Hover: bg gold/10%. | src/app/_components/sun-kudos/leaderboard-item.tsx
- [ ] T040 [P] [US4] Create OpenGiftButton: "Mở Secret Box" + GiftIcon. 374×60, bg #FFEA9E, r 8, text Montserrat 22px/700 #00101A. Disabled state (opacity 0.5) when secretBoxUnopened === 0. Click → open dialog (dialog implementation deferred). | src/app/_components/sun-kudos/open-gift-button.tsx
- [ ] T041 [US4] Create KudosStatsPanel: "use client". Dark card (bg #00070C, border 1px #998C5F, r 17, p 24). 6 stat rows (374×40, flex, space-between): Số Kudos bạn nhận được, Số Kudos bạn đã gửi, Số tim bạn nhận được 👍, divider (#2E3940), Số Secret Box bạn đã mở, Số Secret Box chưa mở. Labels: 16px/400 white, values: 22px/700 gold. + OpenGiftButton at bottom. | src/app/_components/sun-kudos/kudos-stats-panel.tsx
- [ ] T042 [US4] Create TopSunnerLeaderboard: dark card (same style as stats). Title "10 SUNNER NHẬN QUÀ MỚI NHẤT". List of 10 LeaderboardItems (gap 16px). | src/app/_components/sun-kudos/top-sunner-leaderboard.tsx
- [ ] T043 [US4] Wire sidebar into page.tsx: Frame 502 layout — flex row, gap 80px, px 144. Left: KudosFeed (680px). Right: D_Sidebar column (422px, gap 24px) with KudosStatsPanel + TopSunnerLeaderboard. Responsive: stack vertically on mobile (< 768px). | src/app/sun-kudos/page.tsx

**Checkpoint**: Right sidebar shows personal stats (6 rows + Mở quà button) and Top 10 leaderboard. Layout is feed (left) + sidebar (right) on desktop, stacked on mobile.

---

## Phase 6: User Story 3 — Spotlight Board (Priority: P2)

**Goal**: Display interactive word cloud with live Kudos counter, activity ticker, and search.

**Independent Test**: Load spotlight data → counter shows total, word cloud renders names at varying sizes, ticker shows activity.

### Tests First (US3)

- [ ] T044 [US3] Write failing unit tests for: SpotlightBoard (renders counter, renders names, ticker appends entries, search highlights matching name) | tests/unit/sun-kudos/spotlight-board.test.tsx

### Implementation (US3)

- [ ] T045 [US3] Create SpotlightBoard: "use client". Dark card (1157×548, border 1px #998C5F, r 47.14px, overflow hidden). Contains: (1) Counter "388 KUDOS" (Montserrat 36px/700, white, top-left), (2) Word cloud: CSS positioned spans with varying font-size/opacity based on Kudos count, (3) Search input (219×39, pill r 46px, border 0.682px #998C5F, bg gold/10%) — client-side filter highlighting, (4) Pan/Zoom toggle (CSS transform scale + translate), (5) Ticker at bottom: "HH:MM [User] đã nhận được một Kudos mới" — vertical scroll animation (translateY 500ms). Props: initialSpotlightData, initialKudosCount. | src/app/_components/sun-kudos/spotlight-board.tsx
- [ ] T046 [US3] Wire SpotlightBoard into page.tsx: after SPOTLIGHT BOARD SectionHeader, pass initial spotlight data and count from RSC | src/app/sun-kudos/page.tsx

**Checkpoint**: Spotlight Board renders word cloud with names, counter, search, and ticker. Pan/zoom works.

---

## Phase 7: User Story 6 — Real-Time Updates (Priority: P3) + Polish

**Goal**: Live updates when new Kudos are submitted. Loading/error/empty states. Responsive. Accessibility.

**Independent Test**: Simulate Supabase Realtime event → counter increments, ticker updates, new Kudo appears in feed.

### Real-Time (US6)

- [ ] T047 [US6] Set up Supabase Realtime subscription on `kudos` table inserts inside SpotlightBoard: on new Kudo → increment counter, push to ticker queue | src/app/_components/sun-kudos/spotlight-board.tsx
- [ ] T048 [US6] Set up Supabase Realtime subscription inside KudosFeed: on new Kudo → prepend to feed list | src/app/_components/sun-kudos/kudos-feed.tsx

### Loading States

- [ ] T049 [P] Update loading.tsx with refined skeleton matching all page zones: header skeleton, keyvisual gradient, banner placeholder, carousel skeleton (3 cards), spotlight dark rectangle, feed skeleton (3 KudoPost skeletons with avatar+text lines), sidebar skeleton (stats card + leaderboard card) | src/app/sun-kudos/loading.tsx

### Error & Empty States

- [ ] T050 [P] Add per-section error banners with retry button to KudosFeed (feed API fail → inline error), HighlightCarousel (highlight fail → section hidden or error), KudosStatsPanel (stats fail → error banner), SpotlightBoard (spotlight fail → dark placeholder) | src/app/_components/sun-kudos/kudos-feed.tsx, highlight-carousel.tsx, kudos-stats-panel.tsx, spotlight-board.tsx
- [ ] T051 [P] Add empty states: KudosFeed → "Chưa có lời cảm ơn nào — hãy là người đầu tiên ghi nhận!" + CTA button, TopSunnerLeaderboard → "Chưa có dữ liệu", HighlightCarousel → hide section when no data | src/app/_components/sun-kudos/kudos-feed.tsx, top-sunner-leaderboard.tsx, highlight-carousel.tsx

### Responsive

- [ ] T052 Responsive fine-tuning: mobile (<768px) — container px 16, A.1/Search stack vertically (w 100%), carousel single card, feed/sidebar stack (sidebar below), KudoPostCard p 24 16 12 16, footer stack. Tablet (768–1023px) — px 48, feed+sidebar 2-col reduced widths, gap 32. Desktop (≥1024px) — max-width 1440, Figma values. | src/app/_components/sun-kudos/*.tsx, src/app/sun-kudos/page.tsx

### Accessibility

- [ ] T053 Accessibility audit: add `role="feed"` on KudosFeed, `aria-label` on each KudoPostCard, `aria-live="polite"` on ticker, keyboard nav (Tab through buttons + cards), focus-visible rings (#FFEA9E), carousel arrow aria-labels, WCAG AA contrast verification (gold #FFEA9E on dark #00101A) | src/app/_components/sun-kudos/*.tsx

### Integration & E2E Tests

- [ ] T054 Write integration test: page loads with mocked Supabase data → all 4 zones render (carousel, spotlight, feed, sidebar), heart toggle works, "load more" works | tests/integration/sun-kudos-page.test.tsx
- [ ] T055 Write E2E test (Playwright): navigate to /sun-kudos (mock Supabase API), verify page renders, click heart, click copy link, navigate carousel, verify responsive layout on mobile viewport | tests/e2e/sun-kudos.spec.ts

**Checkpoint**: Full page complete with real-time updates, all UI states (loading/error/empty/success), responsive layout, and accessibility compliance.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ────────────→ Phase 2 (Foundation/US5) ──→ Phase 3 (US1) ──→ Phase 4 (US2)
                                                             ↓                    ↓
                                                           Phase 5 (US4) ←──── (can parallel after US1)
                                                             ↓
                                                           Phase 6 (US3) ←──── (can parallel after US1)
                                                             ↓
                                                           Phase 7 (US6 + Polish) ←── (after all stories)
```

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundation)**: Depends on Phase 1 — BLOCKS all user stories
- **Phase 3 (US1)**: Depends on Phase 2 — provides KudoPostCard and sub-components reused by US2
- **Phase 4 (US2)**: Depends on Phase 3 (reuses KudoUserInfo, CategoryTag, HashtagList, HeartButton)
- **Phase 5 (US4)**: Depends on Phase 2 only — CAN run in parallel with Phase 3/4 (independent sidebar components)
- **Phase 6 (US3)**: Depends on Phase 2 only — CAN run in parallel with Phase 3/4/5 (independent spotlight)
- **Phase 7 (Polish)**: Depends on all story phases being complete

### Within Each Story Phase

1. **Tests MUST be written and FAIL** before implementation (TDD per constitution)
2. Sub-components before composite components
3. Composite components before page wiring
4. Page wiring completes the story

### Parallel Opportunities

**Phase 1**: T002, T003, T004, T007, T008, T009 can all run in parallel
**Phase 2**: T011, T012, T013, T014, T016, T017 can run in parallel (after T010 tests)
**Phase 3**: T021–T027 can run in parallel (after T018–T020 tests)
**Phase 4**: T032–T035 can run in parallel (after T031 tests)
**Phase 5**: T039, T040 can run in parallel (after T038 tests)
**Phase 7**: T049, T050, T051 can run in parallel

**Cross-phase parallelism**: If 2+ developers, one can work Phase 5 (sidebar) while another works Phase 3→4 (feed → carousel).

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + Phase 2
2. Complete Phase 3 (US1: Core Feed only)
3. **STOP and VALIDATE**: Page shows feed with all card features working
4. Deploy if ready — page is usable with just the feed

### Incremental Delivery

1. Setup + Foundation → Deploy skeleton page
2. US1 (Feed) → Test → Deploy (MVP)
3. US2 (Carousel) → Test → Deploy
4. US4 (Sidebar) → Test → Deploy
5. US3 (Spotlight) → Test → Deploy
6. US6 (Real-time + Polish) → Test → Deploy (Final)

---

## Summary

| Metric | Count |
|--------|-------|
| **Total tasks** | 55 |
| **Phase 1 (Setup)** | 9 tasks |
| **Phase 2 (Foundation/US5)** | 8 tasks |
| **Phase 3 (US1 Feed)** | 13 tasks (3 test + 10 impl) |
| **Phase 4 (US2 Carousel)** | 7 tasks (1 test + 6 impl) |
| **Phase 5 (US4 Sidebar)** | 6 tasks (1 test + 5 impl) |
| **Phase 6 (US3 Spotlight)** | 3 tasks (1 test + 2 impl) |
| **Phase 7 (US6 + Polish)** | 9 tasks |
| **Parallel opportunities** | 28 tasks marked [P] or parallelizable |
| **MVP scope** | Phase 1 + 2 + 3 (30 tasks) |

---

## Notes

- Commit after each task or logical group
- Run `yarn test` before moving to next phase
- Run `yarn lint` before any PR
- Mark tasks complete as you go: `[x]`
- Update spec.md if requirements change during implementation
- The constitution requires TDD — write failing tests BEFORE implementation in each story phase
