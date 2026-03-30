# Feature Specification: Sun* Kudos - Live Board

**Frame ID**: `2940:13431`
**Frame Name**: `Sun* Kudos - Live board`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-27
**Status**: Reviewed

---

## Overview

The Sun* Kudos Live Board is the main hub for peer-recognition within the SAA 2025 application. It serves as both an interactive feed where authenticated users browse and interact with Kudos (appreciation posts), and a real-time event display board showcasing highlighted Kudos, a spotlight board with recipient avatars, a live counter, and an activity ticker.

The screen is organized into four major zones:
1. **Hero / Action area** — Sun* Kudos branding, "Ghi nhận" CTA, and search
2. **Highlight Kudos** — Carousel of top-hearted Kudos with filters
3. **Spotlight Board** — Live interactive word-cloud of Kudos recipients with counter and ticker
4. **All Kudos + Stats Sidebar** — Full feed (left) and stats/leaderboard (right)

**Target Users**: All authenticated Sun* employees
**Route**: `/sun-kudos`

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse All Kudos Feed (Priority: P1)

A logged-in Sun* employee visits the Kudos Live Board to browse appreciation posts from colleagues. They scroll through the feed, see sender/receiver info, message content, hashtags, attached images, and heart counts.

**Why this priority**: The Kudos feed is the core feature — without it the page has no value. All other features build on top of the feed content.

**Independent Test**: Load `/sun-kudos` with mock feed data and verify Kudo cards render with all fields (sender, receiver, time, content, hashtags, images, hearts, copy link).

**Acceptance Scenarios**:

1. **Given** the user is authenticated and navigates to `/sun-kudos`, **When** the page loads, **Then** the ALL KUDOS section displays a paginated list of Kudo post cards ordered by most recent first.
2. **Given** a Kudo post has content longer than 5 lines, **When** displayed in the feed, **Then** the text is truncated with "..." and clicking the card navigates to the full Kudo detail page (`/kudos/:id`).
3. **Given** a Kudo post has attached images, **When** displayed, **Then** up to 5 thumbnail images are shown in a horizontal row; clicking an image opens it full-size.
4. **Given** a Kudo post has an attached video, **When** displayed, **Then** a play button overlay is shown on the video thumbnail; clicking it opens the video player (full-screen or inline — see Clarification Q1).
5. **Given** each Kudo post has a category tag (e.g., "IDOL GIỚI TRẺ"), **When** displayed, **Then** the tag is shown as a prominent gold-background label above the content text, distinct from the hashtag row.
6. **Given** the user clicks the heart icon on a Kudo, **When** they have not yet hearted it, **Then** the heart turns red, count increments by 1. Clicking again removes the heart (toggle). Each user can only give one heart per Kudo.
7. **Given** the user clicks "Copy Link" on a Kudo, **When** the link is copied, **Then** the Kudo URL is saved to clipboard and a toast notification "Link copied — ready to share!" appears.
8. **Given** the user clicks a hashtag tag on a Kudo, **When** clicked, **Then** the Highlight Kudos filter updates to show Kudos with that hashtag.

---

### User Story 2 - View Highlighted Kudos Carousel (Priority: P1)

The user sees the top 5 most-hearted Kudos displayed in a prominent carousel at the top of the page, with filter dropdowns for Hashtag and Phòng ban (Department).

**Why this priority**: Highlighted Kudos are a key engagement feature that surfaces the best content and drives user participation.

**Independent Test**: Load the page with highlighted Kudos mock data and verify carousel renders with navigation, pagination, and filter dropdowns.

**Acceptance Scenarios**:

1. **Given** highlighted Kudos data is loaded, **When** the page renders, **Then** the HIGHLIGHT KUDOS carousel shows up to 5 cards with TWO navigation mechanisms: (a) large prev/next arrows flanking the cards (B.2.1/B.2.2), and (b) a bottom pagination bar with smaller prev/next arrows and a page indicator "X/5" (B.5).
2. **Given** the carousel is on page 1, **When** the user clicks any "prev" button, **Then** it is disabled. Same for "next" on the last page.
3. **Given** the user clicks the "Hashtag" dropdown, **When** they select a hashtag, **Then** the carousel filters to show only Kudos with that hashtag. The dropdown list is queried from the database.
4. **Given** the user clicks the "Phòng ban" dropdown, **When** they select a department, **Then** the carousel filters to show Kudos from that department. The dropdown list is queried from the database.
5. **Given** a highlight Kudo card, **When** displayed, **Then** it shows: sender info (avatar, name, department, star count), receiver info, time, category tag (e.g., "IDOL GIỚI TRẺ"), content (max 3 lines), hashtags (max 5), heart count, "Copy Link" button, and "Xem chi tiết" link that navigates to `/kudos/:id`.

---

### User Story 3 - View Spotlight Board (Priority: P2)

The user views the Spotlight Board — a live, interactive visualization of all Kudos recipients displayed as a word cloud / avatar grid, with a total Kudos counter and a live activity ticker.

**Why this priority**: The Spotlight Board provides the "live event" feel and real-time engagement, but is secondary to the core feed browsing.

**Independent Test**: Load the page with spotlight data and verify the counter, word cloud, and ticker render correctly.

**Acceptance Scenarios**:

1. **Given** the Spotlight Board loads, **When** rendered, **Then** the header shows "Sun* Annual Awards 2025 | SPOTLIGHT BOARD" and the board displays a "388 KUDOS" counter (real value from API).
2. **Given** the board has recipient data, **When** displayed, **Then** names are shown in varying sizes (word-cloud style) representing Kudos received.
3. **Given** the ticker area, **When** a new Kudo is submitted, **Then** a new ticker entry appears: "HH:MM [User] đã nhận được một Kudos mới".
4. **Given** the search input on the Spotlight, **When** the user types a name, **Then** the matching name is highlighted/focused in the word cloud.
5. **Given** the Pan/Zoom control, **When** clicked, **Then** the user can toggle between pan and zoom modes on the word cloud.

---

### User Story 4 - View Personal Stats & Leaderboard (Priority: P2)

The user sees their personal Kudos statistics in the right sidebar, including received/sent counts, heart count, Secret Box status, and a "Mở quà" (Open gift) button. Below the stats is the Top 10 Sunner leaderboard.

**Why this priority**: Stats and leaderboard drive engagement and gamification but aren't core to the browsing experience.

**Independent Test**: Load the sidebar with mock stats and leaderboard data; verify all 6 stat rows, the "Mở quà" button, and the Top 10 list render correctly.

**Acceptance Scenarios**:

1. **Given** the user is authenticated, **When** the sidebar loads, **Then** it displays 6 stat rows: Số Kudos bạn nhận được, Số Kudos bạn đã gửi, Số tim bạn nhận được, (divider), Số Secret Box bạn đã mở, Số Secret Box chưa mở.
2. **Given** Secret Boxes are available, **When** the user clicks "Mở Secret Box" button, **Then** a dialog/overlay opens to reveal the Secret Box content.
3. **Given** the Top 10 leaderboard, **When** displayed, **Then** it shows 10 Sunner items with avatar, name, and gift description.
4. **Given** a leaderboard item, **When** the user clicks the avatar or name, **Then** they navigate to that Sunner's profile page.

---

### User Story 5 - Write a New Kudo (Priority: P1)

The user initiates writing a new Kudo via the prominent "Ghi nhận" CTA button in the hero area.

**Why this priority**: Creating Kudos is the primary write action and the reason the page exists.

**Independent Test**: Verify clicking the "Ghi nhận" button navigates to `/write-kudo`.

**Acceptance Scenarios**:

1. **Given** the user is on the Kudos Live Board, **When** they click the "Ghi nhận" button (pill-shaped input), **Then** they navigate to the Viết Kudo screen (`/write-kudo`).
2. **Given** the user is on the Kudos Live Board, **When** they click the "Tìm kiếm sunner" button, **Then** a search overlay/filter opens to find a Sunner.

---

### User Story 6 - Real-Time Updates (Priority: P3)

The page receives real-time updates when new Kudos are submitted by other users.

**Why this priority**: Real-time is a "nice-to-have" enhancement; the page works fine with periodic refresh.

**Independent Test**: Simulate a WebSocket/SSE event for a new Kudo and verify the counter increments, ticker updates, and feed prepends the new Kudo.

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** another user submits a new Kudo, **Then** the B.7.1 counter increments, a ticker entry appears, and the new Kudo appears at the top of the C.2 feed.
2. **Given** the Spotlight Board, **When** a new Kudo is received, **Then** the recipient name appears/grows in the word cloud.

---

### Edge Cases

- What happens when the feed has zero Kudos? → Show empty state: "Chưa có lời cảm ơn nào — hãy là người đầu tiên ghi nhận!" with CTA button.
- What happens when the highlight carousel has zero Kudos? → Hide the entire B_Highlight section or show a placeholder message.
- What happens when the leaderboard has no data? → Show "Chưa có dữ liệu" placeholder.
- What happens when API calls fail? → Show error banner with retry button in the affected zone (per-section, not full-page).
- What happens when the user's session expires? → Redirect to `/` (login).
- What happens when the user tries to heart their own Kudo? → Allowed (no restriction indicated in design — see Clarification Q2).
- What happens when hashtags exceed 1 line? → Truncate with "..." (max 5 hashtags visible per line).
- What happens when the user has zero Secret Boxes? → "Mở Secret Box" button is disabled; secret box counts show "0".
- What happens when a Kudo has no images or video? → Image/video gallery section is hidden; content area fills the space.
- What happens when the Spotlight word cloud has hundreds of names? → Canvas-based renderer handles overflow; pan/zoom enables navigation.

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| feedKudos | Kudo[] | [] | Loaded Kudo posts for C.2 feed |
| highlightedKudos | Kudo[] | [] | Highlighted Kudos for B_Highlight carousel |
| statsData | KudosStats \| null | null | Current user's personal stats for D.1 |
| leaderboard | User[] | [] | Top 10 Sunners for D.3 |
| highlightPage | number | 1 | Current page in B_Highlight carousel |
| highlightFilter | { hashtag?: string, department?: string } | {} | Active filters for highlighted Kudos |
| feedPage | number | 1 | Current page/cursor of C.2 Kudos feed |
| feedHasMore | boolean | true | Whether more feed pages exist |
| kudosCount | number | 0 | Live total Kudos count (B.7.1) |
| tickerQueue | { time: string, userName: string }[] | [] | Queue of live ticker messages |
| spotlightUsers | User[] | [] | Currently shown spotlight recipients |
| userHearts | Set\<string\> | new Set() | Set of Kudo IDs the current user has hearted |

### Global State

| State | Store | Read/Write | Purpose |
|-------|-------|------------|---------|
| user | authStore / Supabase | Read | Display avatar in header, check auth |
| locale | i18nStore | Read | VN/EN language state |

### UI States

**Loading**: Skeleton placeholders per section — B_Highlight (skeleton cards), C.2 (skeleton Kudo cards with avatar + text lines), D.1 (skeleton stat rows), D.3 (skeleton list items), B.7.1 counter shows "—".

**Error**: Per-zone error banners with retry button. Auth failure (401) redirects to `/`. Network failure shows inline error in affected section only.

**Empty**: C.2 feed — "Chưa có lời cảm ơn nào — hãy là người đầu tiên ghi nhận!" with CTA. D.3 leaderboard — "Chưa có dữ liệu". B_Highlight — section hidden if no highlighted Kudos.

**Success**: All sections populated with live data. B.7 Spotlight rotating. Ticker scrolling live activity.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Header (shared) | 2940:13433 | Sticky header: logo + nav (About SAA 2025, Awards Information, **Sun\* Kudos** active) + language + notification + avatar | Nav clicks, dropdown triggers |
| Keyvisual | 2940:13432 | Full-width hero background artwork | Non-interactive |
| A_KV Kudos | 2940:13437 | "Hệ thống ghi nhận và cảm ơn" title + KUDOS logo | Read-only |
| A.1_Button ghi nhận | 2940:13449 | Pill-shaped CTA: "Hôm nay, bạn muốn gửi lời cảm ơn..." | Click → /write-kudo |
| Tìm kiếm sunner | 2940:13450 | Pill-shaped search: "Tìm kiếm profile Sunner" | Click → search overlay |
| B.1.1_ButtonHashtag | 2940:13459 | Dropdown filter for hashtags | Click → dropdown |
| B.1.2_Button Phòng ban | 2940:13460 | Dropdown filter for departments | Click → dropdown |
| B_Highlight carousel | 2940:13451 | 5 highlighted Kudo cards with prev/next | Swipe/click arrows |
| B.3_KUDO Highlight | 2940:13465 | Single highlight Kudo card | Click card → detail, click avatar → profile |
| B.5_Pagination | 2940:13471 | Carousel page controls (prev/page/next) | Click arrows |
| B.6_Header Spotlight | 2940:13476 | "SPOTLIGHT BOARD" heading | Read-only |
| B.7_Spotlight | 2940:14174 | Interactive word cloud + counter + ticker | Pan/zoom, search |
| B.7.1_Counter | 3007:17482 | "388 KUDOS" live counter | Real-time updates |
| B.7.3_Search | 2940:14833 | Spotlight search input | Type to search |
| C.1_Header | 2940:14221 | "ALL KUDOS" section heading | Read-only |
| C.3_KUDO Post | 3127:21871 | Individual Kudo card in feed | Click card, heart toggle, copy link, click avatar/name |
| D.1_Stats | 2940:13489 | Personal stats panel (6 metrics) | Read-only (except "Mở quà" button) |
| D.1.8_Button mở quà | 2940:13497 | "Mở Secret Box" CTA | Click → open gift dialog |
| D.3_Top 10 Sunner | 2940:13510 | Leaderboard of 10 Sunners | Click avatar/name → profile |
| Footer (shared) | 2940:13522 | Logo + nav links + copyright | Nav clicks |

### Navigation Flow

- **From**: Homepage SAA (header nav, D1_Sunkudos CTA), Awards Information (header nav), Footer (any page), Viết Kudo (after submit)
- **To**: Viết Kudo (/write-kudo), View Kudo (/kudos/:id), Profile (/profile/:id), Homepage SAA, Awards Information, Thể lệ (Rules)
- **Triggers**: Button clicks, card clicks, avatar/name clicks, nav links

### Visual Requirements

- **Design style**: See [design-style.md](design-style.md) for complete visual specifications
- **Responsive breakpoints**: Mobile (<768px), Tablet (768–1024px), Desktop (>1024px)
- **Animations/Transitions**: Carousel slide transitions, heart toggle animation, ticker scroll, spotlight rotation
- **Accessibility**: WCAG AA contrast (gold #FFEA9E on dark #00101A), `role="feed"` on C.2, `aria-live="polite"` on ticker, keyboard navigation for all interactive elements

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a paginated feed of all Kudos posts, ordered by most recent first.
- **FR-002**: System MUST display a carousel of the top 5 most-hearted Kudos with prev/next navigation.
- **FR-003**: Users MUST be able to toggle a heart on any Kudo post (one heart per user per Kudo).
- **FR-004**: System MUST display a live Kudos counter on the Spotlight Board, updated in real-time.
- **FR-005**: System MUST display the user's personal stats (received, sent, hearts, Secret Boxes) in the sidebar.
- **FR-006**: System MUST display a Top 10 leaderboard of Sunners who received gifts most recently.
- **FR-007**: Users MUST be able to navigate to the Viết Kudo screen via the "Ghi nhận" button.
- **FR-008**: Users MUST be able to copy a Kudo's URL via the "Copy Link" button.
- **FR-009**: System MUST display a live activity ticker showing new Kudo receipts with timestamp.
- **FR-010**: System MUST support filtering highlighted Kudos by Hashtag and Phòng ban (Department).
- **FR-011**: Users MUST be able to click sender/receiver avatars/names to navigate to their profile.
- **FR-012**: Kudo post content MUST truncate at 5 lines in the feed and 3 lines in the highlight carousel.
- **FR-013**: Kudo post hashtags MUST truncate at 5 tags per line; overflow shows "...".
- **FR-014**: Users MUST be able to open Secret Boxes via the "Mở Secret Box" button (disabled when 0 unopened boxes).
- **FR-015**: Each Kudo post MUST display its category tag (e.g., "IDOL GIỚI TRẺ") as a prominent label above the content, visually distinct from hashtags.
- **FR-016**: Kudo posts with video attachments MUST display a play button overlay on the video thumbnail.
- **FR-017**: The Highlight Kudos carousel MUST have two navigation mechanisms: inline prev/next arrows on the carousel AND a bottom pagination bar with arrows and page indicator.

### Technical Requirements

- **TR-001**: Page MUST load initial feed within 2 seconds on a standard connection (LCP < 2s).
- **TR-002**: All API requests MUST require authenticated session; return 401 if unauthorized.
- **TR-003**: Real-time updates SHOULD use WebSocket or SSE; fallback to polling at 30-second intervals.
- **TR-004**: Feed pagination MUST use cursor-based or offset-based pagination to support infinite scroll or "load more".
- **TR-005**: Heart toggle MUST be optimistic (instant UI update, server sync in background).
- **TR-006**: Clipboard API MUST be used for "Copy Link" with fallback for unsupported browsers.

### Key Entities *(if feature involves data)*

- **Kudo**: id, sender (User), receiver (User), content (text, max 5 lines in feed / 3 lines in highlight), categoryTag (string, e.g. "IDOL GIỚI TRẺ"), hashtags (string[], max 5 displayed per line), images (url[], max 5 thumbnails), videoUrl (url?, optional), heartCount (number), isHearted (boolean, whether current user has hearted this Kudo — returned by API per-user), createdAt (datetime, format: "HH:mm - MM/DD/YYYY")
- **User**: id, name (string), avatarUrl (url, from Google account), department (string), starCount (number, represents recognition level), title/badge (string)
- **SecretBox**: id, userId, status (opened/unopened), content
- **KudosStats**: userId, receivedCount (number), sentCount (number), heartCount (number, hearts received), secretBoxOpened (number), secretBoxUnopened (number)
- **Hashtag**: id, name (string) — available hashtags for filter dropdown
- **Department**: id, name (string) — available departments for filter dropdown

---

## API Dependencies

| Endpoint | Method | Query Params | Purpose | Status |
|----------|--------|-------------|---------|--------|
| GET /kudos/feed | GET | `?page=&limit=` or `?cursor=&limit=` | Paginated Kudos feed for C.2 section. Returns: Kudo[] with `isHearted` per user | New |
| GET /kudos/highlighted | GET | `?hashtag=&department=&page=&limit=5` | Top 5 highlighted Kudos for carousel, filtered by hashtag/dept | New |
| GET /kudos/stats | GET | — (uses auth user) | User personal stats (received, sent, hearts, secret boxes) | New |
| GET /kudos/leaderboard | GET | `?limit=10` | Top 10 Sunners who received gifts most recently | New |
| GET /kudos/spotlight | GET | — | Spotlight recipients (names + sizes) + live ticker events | New |
| POST /kudos/:id/heart | POST | — | Toggle heart on a Kudo. Returns: { hearted: boolean, heartCount: number } | New |
| GET /hashtags | GET | — | List available hashtags for filter dropdown | New |
| GET /departments | GET | — | List departments for filter dropdown | New |
| GET /users?search= | GET | `?search=&limit=10` | Search Sunners by name (for spotlight search) | New |
| (Supabase auth) | GET | — | Validate session + get user profile | Exists |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Page loads with visible feed content within 2 seconds (LCP metric).
- **SC-002**: Users can complete the "browse → heart → copy link" flow without errors.
- **SC-003**: Real-time counter updates within 5 seconds of a new Kudo submission.
- **SC-004**: Carousel navigation (prev/next) responds within 200ms.
- **SC-005**: All interactive elements are keyboard-accessible and pass WCAG AA contrast.

---

## Out of Scope

- Writing/editing Kudos (handled by Viết Kudo / Màn Sửa bài viết screens)
- Anonymous Kudos mode (handled by Ẩn danh screen)
- Notification panel content (handled by Tất cả thông báo screen)
- Admin moderation features (handled by Admin screens)
- Profile page content (handled by Profile screens)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- The Spotlight Board word cloud / avatar grid is the most technically complex component — may require a canvas-based or D3.js visualization.
- Real-time transport (WebSocket vs SSE vs polling) needs backend team confirmation.
- The "Mở Secret Box" dialog/overlay design is referenced but not fully specified in this frame — may link to a separate frame (Open secret box - chưa mở).
- The header and footer are shared components already implemented for Homepage SAA and Awards Information screens.
- Hashtag and Phòng ban dropdown list data sources need backend API confirmation.
- The Kudo Highlight card (B.3) has a "Xem chi tiết" action that navigates to the full Kudo detail view.

### Constitution Compliance Notes

- **Tailwind Config Tokens (Principle II)**: All color, spacing, and typography tokens listed in design-style.md MUST be registered in the Tailwind config as named design tokens (e.g., `colors.kudos.page-bg`, `colors.kudos.primary-gold`). Inline arbitrary values like `bg-[#00101A]` in the Implementation Mapping are illustrative only — production code MUST use named tokens.
- **Mobile-First (Principle IV)**: Implementation MUST use mobile-first styling. Base Tailwind classes target mobile; `md:` and `lg:` prefixes progressively enhance for tablet/desktop. The design-style.md documents desktop-first Figma values — developers must invert the approach.
- **RSC Default (Principle II)**: The page layout and static sections (Keyvisual, headers, footer) SHOULD be Server Components. Interactive sections (carousel, heart toggle, spotlight, real-time feed) require `"use client"`.
- **TDD (Principle III)**: Failing tests MUST be written before implementing any component.

---

## Clarification Needed

**Business Logic:**
- **Q1**: Video attachments on Kudo posts — the Figma shows a play button overlay on some cards. What is the video playback behavior? (a) Inline player, (b) full-screen modal, or (c) navigate to a separate video view?
- **Q2**: Can users heart their own Kudos? The design doesn't restrict this, but it may be a business rule.
- **Q3**: Feed pagination UX — should it be (a) infinite scroll, (b) "Load more" button, or (c) traditional page navigation?
- **Q8**: Clicking a hashtag tag in the ALL KUDOS feed — the Figma spec says "chỉnh filter Hashtag thành tag đã chọn". Does this (a) scroll up and apply the filter to the HIGHLIGHT KUDOS carousel, (b) filter the ALL KUDOS feed itself, or (c) both?

**Design / Visual:**
- **Q4**: The "Mở Secret Box" dialog — is there a separate Figma frame for this overlay? What content/animation does it show when opening a box?
- **Q5**: When a Hashtag or Phòng ban filter is active, how is the selected state displayed? (active background, checkmark, pill tag?)

**Technical:**
- **Q6**: Real-time transport — WebSocket, SSE, or Supabase Realtime subscriptions? This affects architecture significantly.
- **Q7**: Should the Spotlight word cloud use HTML/CSS positioning or a canvas renderer (e.g., D3.js)?
