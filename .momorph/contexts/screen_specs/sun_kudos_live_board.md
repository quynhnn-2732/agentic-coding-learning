# Screen: Sun* Kudos - Live board

## Screen Info

| Property | Value |
|----------|-------|
| **Figma Frame ID** | 2940:13431 |
| **Figma Link** | [Open in Figma](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=2940:13431) |
| **Route** | `/sun-kudos` |
| **Screen Group** | Main Application |
| **Status** | discovered |
| **Discovered At** | 2026-03-24 |
| **Last Updated** | 2026-03-24 |

---

## Description

The Sun* Kudos Live board is the main hub for the peer-recognition (Kudos) feature of SAA 2025. It serves two concurrent purposes: (1) an interactive feed where authenticated users can send new Kudos and browse all submissions, and (2) a real-time event display board (like a live ceremony screen) showing highlighted Kudos, a spotlight with recipient avatars, a running Kudos counter, and a live ticker of new activity. The screen is split into four major zones: Hero/Action area (Bìa), Spotlight Board, All Kudos feed + right-sidebar stats.

---

## Navigation Analysis

### Incoming Navigations (From)

| Source Screen | Trigger | Condition |
|---------------|---------|-----------|
| Homepage SAA | Header nav "Sun* Kudos" | Authenticated user |
| Homepage SAA | D1_Sunkudos "Chi tiết" CTA button | Authenticated user |
| Awards Information | Header nav "Sun* Kudos" | Authenticated user |
| Awards Information | D1_Sunkudos "Chi tiết" button | Authenticated user |
| Any screen | Footer nav "Sun* Kudos" | Authenticated user |
| Viết Kudo | After successful kudo submission | Authenticated user |
| Ẩn danh | After successful anonymous kudo | Authenticated user |

### Outgoing Navigations (To)

| Target Screen | Trigger Element | Node ID | Confidence | Notes |
|---------------|-----------------|---------|------------|-------|
| Viết Kudo | A.1_Button ghi nhận | 2940:13449 | high | → /write-kudo; main CTA to create a Kudo |
| Tìm kiếm sunner | Tìm kiếm sunner button | 2940:13450 | high | Search overlay/filter for Sunners |
| View Kudo | Click Kudo post card in C.2 feed | 3127:21871 | high | → /kudos/:id |
| Profile người khác | Click user name/avatar in Kudo card | — | high | → /profile/:id |
| Homepage SAA | Header Logo / "About SAA 2025" nav | I2940:13433;186:1579 | high | → /dashboard |
| Awards Information | Header "Awards Information" nav | I2940:13433;186:1587 | high | → /awards-information |
| Dropdown-profile | Header user avatar button | I2940:13433;186:1597 | high | Opens profile dropdown overlay |
| Notification Panel | Header notification bell | I2940:13433;186:2101 | high | Opens notification panel |
| Language Dropdown | Header language toggle | I2940:13433;186:1696 | high | Opens language dropdown (721:4942) |
| Homepage SAA | Footer "About SAA 2025" link | I2940:13522;342:1410 | high | → /dashboard |
| Awards Information | Footer "Awards Information" link | I2940:13522;342:1411 | high | → /awards-information |
| Thể lệ / Rules | Footer "Tiêu chuẩn chung" link | I2940:13522;1161:9487 | high | → /tieu-chuan-chung |

### Navigation Rules
- **Back behavior**: Browser back → previous page (typically Homepage SAA)
- **Deep link support**: Yes — `/sun-kudos` (no anchor-based sub-navigation)
- **Auth required**: Yes — unauthenticated users redirected to `/`

---

## Component Schema

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│                    HEADER (sticky)                   │
│  [Logo] [About SAA 2025 | Awards Info | Sun* Kudos] │
│  [Language][Notification Bell][Avatar]               │
├─────────────────────────────────────────────────────┤
│              Keyvisual (Hero Background)             │
│  Background artwork for Sun* Kudos                  │
├─────────────────────────────────────────────────────┤
│  Bìa (Cover Section)                                │
│  ┌─────────────────────────────────────────────┐   │
│  │  A_KV Kudos  │  Sun* Kudos logo/branding    │   │
│  │  Button chuc nang:                          │   │
│  │  [Ghi nhận]  [Tìm kiếm sunner]             │   │
│  └─────────────────────────────────────────────┘   │
│  B_Highlight (Highlighted Kudos Carousel)           │
│  ┌──────────────────────────────────────────────┐  │
│  │ B.1_header | B.2_HIGHLIGHT KUDOS cards       │  │
│  │ [← Prev]  [Page X/N]  [Next →]              │  │
│  └──────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│  B.6_Header + B.7_Spotlight Board                   │
│  ┌──────────────────────────────────────────────┐  │
│  │ "Sun* Annual Awards 2025 | SPOTLIGHT BOARD"  │  │
│  │ [388 KUDOS counter] [Pan-zoom avatar grid]   │  │
│  │ [Search sunner] [Live recipient avatars]     │  │
│  │ [Ticker: 08:30PM user đã nhận Kudos mới…]   │  │
│  └──────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│  C_All kudos + D_Thống kê (Right sidebar)           │
│  ┌─────────────────────┬────────────────────────┐  │
│  │ C.1 "ALL KUDOS"    │ D.1 Thống kê tổng quát │  │
│  │ C.2 Kudos posts    │ D.3 Top 10 Sunner       │  │
│  │ (scrollable feed)  │     nhận quà           │  │
│  └─────────────────────┴────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│                    FOOTER                            │
│  [Logo] [Nav ×4]  "Bản quyền thuộc về Sun* © 2025" │
└─────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
Screen (Sun* Kudos - Live board)
├── Header (Organism) [shared] — 2940:13433
│   ├── Logo (Atom) → /dashboard
│   ├── NavLinks (Molecule)
│   │   ├── "About SAA 2025" (Link) — I2940:13433;186:1579
│   │   ├── "Awards Information" (Link) — I2940:13433;186:1587
│   │   └── "Sun* Kudos" (Link) — I2940:13433;186:1593 [ACTIVE]
│   └── RightActions (Molecule)
│       ├── LanguageSelector — I2940:13433;186:1696
│       ├── NotificationBell (with badge) — I2940:13433;186:2101
│       └── AvatarButton — I2940:13433;186:1597
├── Keyvisual (Organism) — 2940:13432
│   └── Background artwork (RECTANGLE)
├── Bìa (Organism) — 2940:13434
│   ├── Frame 532 — 2940:13435
│   │   ├── A_KV Kudos (Molecule) — 2940:13437
│   │   │   └── Sun* Kudos logo/branding
│   │   ├── Button chuc nang (Molecule) — 2940:13448
│   │   │   ├── A.1_Button ghi nhận (Atom) — 2940:13449 → Viết Kudo
│   │   │   └── Tìm kiếm sunner (Atom) — 2940:13450
│   │   └── B_Highlight (Organism) — 2940:13451
│   │       ├── B.1_header — 2940:13452
│   │       ├── B.2_HIGHLIGHT KUDOS (Carousel) — 2940:13462
│   │       └── B.5_slide (Pagination) — 2940:13471
│   │           ├── B.5.1_Button lùi (Atom) — 2940:13472
│   │           ├── B.5.2_số trang (Text) — 2940:13473
│   │           └── B.5.3_Button tiến (Atom) — 2940:13474
│   └── Frame 552 — 2940:14170
│       ├── B.6_Header Giải thưởng — 2940:13476
│       │   ├── "Sun* Annual Awards 2025" (Text)
│       │   └── "SPOTLIGHT BOARD" (Frame) — 2940:13479
│       └── B.7_Spotlight (Organism) — 2940:14174
│           ├── B.7.1_388 KUDOS (Counter) — 3007:17482
│           ├── B.7.2_Pan zoom (Frame) — 3007:17479
│           ├── B.7.3_Tìm kiếm sunner — 2940:14833
│           ├── Recipient avatars/names (multiple TEXT nodes)
│           └── Live ticker: "HH:MM Nguyễn X đã nhận một Kudos mới" — 3004:15999
├── C_All kudos (Organism) — 2940:13475
│   ├── C.1_Header "ALL KUDOS" — 2940:14221
│   └── Frame 502 — 2940:13481
│       ├── C.2_Danh sách lời cảm ơn (Feed) — 2940:13482
│       │   └── KUDOpost ×N (Molecule) [C.3–C.7 instances]
│       └── D_Thống menu phải (Sidebar) — 2940:13488
│           ├── D.1_Thống kê tổng quát (Stats) — 2940:13489
│           └── D.3_10 SUNNER nhận quà (Leaderboard) — 2940:13510
└── Footer (Organism) [shared] — 2940:13522
    ├── Logo (Atom)
    ├── NavLinks ×4 (About SAA 2025 / Awards Info / Sun* Kudos / Tiêu chuẩn chung)
    └── Copyright (Atom)
```

### Main Components

| Component | Type | Node ID | Description | Reusable |
|-----------|------|---------|-------------|----------|
| Header | Organism | 2940:13433 | Shared sticky app header | Yes |
| Keyvisual | Organism | 2940:13432 | Sun* Kudos hero background | No |
| A.1_Button ghi nhận | Atom | 2940:13449 | Primary CTA: write/send a Kudo → /write-kudo | No |
| Tìm kiếm sunner | Atom | 2940:13450 | Search sunner button/input | No |
| B_Highlight | Organism | 2940:13451 | Highlighted Kudos carousel with pagination | No |
| B.7_Spotlight | Organism | 2940:14174 | Live spotlight board: Kudos counter, avatar grid, ticker | No |
| C.2_Danh sách lời cảm ơn | Organism | 2940:13482 | Scrollable feed of all Kudo posts | No |
| D.1_Thống kê tổng quát | Molecule | 2940:13489 | General Kudos stats (total count, etc.) | No |
| D.3_10 SUNNER nhận quà | Molecule | 2940:13510 | Top 10 Sunner leaderboard (most kudos received) | No |
| Footer | Organism | 2940:13522 | Shared app footer | Yes |

---

## Form Fields

N/A — This screen is primarily a display board. The "Ghi nhận" button navigates to a separate Viết Kudo screen. Search input may open an overlay.

---

## API Mapping

### On Screen Load

| API | Method | Purpose | Response Usage |
|-----|--------|---------|----------------|
| GET /kudos/feed | GET | Fetch paginated Kudos for C.2 feed | Populate KUDOpost cards |
| GET /kudos/highlighted | GET | Fetch highlighted Kudos for B_Highlight carousel | Populate B.2_HIGHLIGHT KUDOS |
| GET /kudos/stats | GET | Fetch total Kudos count + top-10 recipients | B.7.1 counter, D.1 stats, D.3 leaderboard |
| GET /kudos/spotlight | GET | Fetch spotlight recipients + live ticker events | B.7_Spotlight avatars, ticker |
| (Supabase auth) | GET | Validate session + get avatar_url | Header avatar display |

### On User Action

| Action | API | Method | Request Body | Response |
|--------|-----|--------|--------------|----------|
| Click "Ghi nhận" | — | — | — | Navigate to /write-kudo |
| Click Kudo post card | — | — | — | Navigate to /kudos/:id |
| Click user avatar/name | — | — | — | Navigate to /profile/:id |
| Pagination prev/next (B_Highlight) | GET /kudos/highlighted?page= | GET | — | Update carousel |
| Search sunner | GET /users?search= | GET | — | Filter results |

### Real-time Updates

| Event | Transport | Purpose |
|-------|-----------|---------|
| New Kudo submitted | WebSocket / SSE | Update B.7.1 counter, append to ticker, refresh C.2 feed |
| Spotlight rotation | Interval / WebSocket | Rotate B.7 spotlight avatars |

### Error Handling

| Error Code | Message | UI Action |
|------------|---------|-----------|\
| 401 | Unauthorized | Redirect to / (login) |
| 404 | Not found | Show 404 error page |
| 500 | Server error | Show error state with retry button |

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| highlightPage | number | 1 | Current page in B_Highlight carousel |
| feedPage | number | 1 | Current page of C.2 Kudos feed |
| kudosCount | number | 0 | Live total Kudos count (B.7.1) |
| tickerQueue | string[] | [] | Queue of live ticker messages |
| spotlightUsers | User[] | [] | Currently shown spotlight recipients |

### Global State (If Applicable)

| State | Store | Read/Write | Purpose |
|-------|-------|------------|---------|
| user | authStore/Supabase | Read | Display avatar in header |
| locale | i18nStore | Read | VN/EN language state |

---

## UI States

### Loading State
- B_Highlight carousel: skeleton cards while fetching highlighted Kudos
- C.2 feed: skeleton Kudo post cards (avatar placeholder + text lines)
- D.1 stats + D.3 leaderboard: skeleton numbers while fetching stats
- B.7.1 counter: shows "—" until count loaded

### Error State
- Feed/stats API failure: error banner with retry button in respective zone
- Auth failure: redirect to / (login)

### Success State
- All sections fully populated with live data
- B.7 Spotlight rotating automatically
- Ticker scrolling live activity

### Empty State
- C.2 feed: "Chưa có lời cảm ơn nào — hãy là người đầu tiên ghi nhận!" with CTA button
- D.3 leaderboard: "Chưa có dữ liệu" placeholder

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Keyboard navigation | Tab through action buttons and Kudo cards |
| Screen reader | `role="feed"` on C.2 list; `aria-label` on each KUDOpost |
| Live region | `aria-live="polite"` on ticker for screen readers |
| Color contrast | WCAG AA — gold (#FFEA9E) on dark (#00101A) background |
| Focus management | Focus "Ghi nhận" button on page load |

---

## Responsive Behavior

| Breakpoint | Layout Changes |
|------------|----------------|
| Mobile (<768px) | B_Highlight becomes full-width single card; C.2 feed full-width; D sidebar moves below feed |
| Tablet (768–1024px) | Two-column layout at reduced width |
| Desktop (>1024px) | Full layout as designed; max-width 1224px centered |

---

## Analysis Metadata

| Property | Value |
|----------|-------|
| Analyzed By | Screen Flow Discovery |
| Analysis Date | 2026-03-24 |
| Needs Deep Analysis | Yes — real-time update mechanism (WebSocket vs SSE vs polling) to confirm |
| Confidence Score | High |

### Next Steps
- [ ] Confirm real-time transport: WebSocket, SSE, or polling interval for live Kudos updates
- [ ] Confirm `/write-kudo` route for Viết Kudo screen (vs modal/overlay)
- [ ] Confirm `Tìm kiếm sunner` behavior: overlay panel, inline input, or route change
- [ ] Confirm B.7 Spotlight rotation interval
- [ ] Confirm D.3 leaderboard top-N (design shows top-10)
