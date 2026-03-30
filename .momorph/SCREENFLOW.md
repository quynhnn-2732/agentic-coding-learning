# Screen Flow Overview

## Project Info
- **Project Name**: Sun Annual Awards 2025 (SAA 2025)
- **Figma File Key**: 9ypp4enmFmdK3YAFJLIu6C
- **Figma URL**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C
- **Created**: 2026-03-23
- **Last Updated**: 2026-03-25

---

## Discovery Progress

| Metric | Count |
|--------|-------|
| Total Screens | 28 |
| Discovered | 4 |
| Remaining | 24 |
| Completion | 14% |

---

## Screens

| # | Screen Name | Frame ID | Figma Link | Status | Detail File | Predicted APIs | Navigations To |
|---|-------------|----------|------------|--------|-------------|----------------|----------------|
| 1 | Login | 662:14387 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=662:14387) | discovered | — | POST /auth/google | Homepage SAA, Dropdown-ngôn ngữ |
| 2 | Homepage SAA | 2167:9026 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=2167:9026) | discovered | screen_specs/homepage_saa.md | GET /awards, GET /events/current | Awards Information, Sun* Kudos, Dropdown-profile, Notification Panel |
| 3 | Hệ thống giải thưởng (Awards Information) | 313:8436 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=313:8436) | discovered | [screen_specs/awards_information.md](screen_specs/awards_information.md) / [specs/313-8436-AwardInformation/](.momorph/specs/313-8436-AwardInformation/) | GET /awards | Homepage SAA (via header "Award Information" link), Sun* Kudos (via Kudos section CTA → /sun-kudos), Dropdown-profile, Tiêu chuẩn chung |
| 4 | Sun* Kudos - Live board | 2940:13431 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=2940:13431) | spec | [screen_specs/sun_kudos_live_board.md](screen_specs/sun_kudos_live_board.md) / [specs/2940-13431-SunKudosLiveBoard/](specs/2940-13431-SunKudosLiveBoard/) | GET /kudos/feed, GET /kudos/highlighted, GET /kudos/stats, GET /kudos/spotlight | Viết Kudo, View Kudo, Profile người khác, Homepage SAA, Awards Information, Dropdown-profile, Thể lệ |
| 5 | Viết Kudo | 520:11602 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=520:11602) | pending | — | POST /kudos | Sun* Kudos, Homepage SAA |
| 6 | View Kudo | 520:18779 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=520:18779) | pending | — | GET /kudos/:id | Sun* Kudos, Profile |
| 7 | Profile bản thân | 362:5037 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=362:5037) | pending | — | GET /users/me, GET /kudos?user= | Homepage SAA, Viết Kudo |
| 8 | Profile người khác | 362:5097 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=362:5097) | pending | — | GET /users/:id, GET /kudos?user= | Sun* Kudos, Viết Kudo |
| 9 | Tất cả thông báo | 589:9132 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=589:9132) | pending | — | GET /notifications | Homepage SAA, View thông báo |
| 10 | View thông báo | 589:9152 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=589:9152) | pending | — | GET /notifications/:id | Tất cả thông báo |
| 11 | Admin - Overview | 620:7712 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=620:7712) | pending | — | GET /admin/stats | Admin - Review content, Admin - Setting |
| 12 | Admin - Review content | 722:16251 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=722:16251) | pending | — | GET /admin/kudos, PUT /kudos/:id/status | Admin - Overview |
| 13 | Admin - Review content - Search | 832:13197 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=832:13197) | pending | — | GET /admin/kudos?search= | Admin - Review content |
| 14 | Admin - Setting | 820:10492 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=820:10492) | pending | — | GET /admin/campaigns | Admin - Overview, Admin - Setting - add Campaign |
| 15 | Admin - Setting - add Campaign | 832:12113 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=832:12113) | pending | — | POST /admin/campaigns | Admin - Setting |
| 16 | Admin - Setting - add new Campaign | 820:11445 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=820:11445) | pending | — | POST /admin/campaigns | Admin - Setting |
| 17 | Admin - Setting - Edit Campaign | 832:12299 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=832:12299) | pending | — | GET /admin/campaigns/:id, PUT /admin/campaigns/:id | Admin - Setting |
| 18 | Admin - User | 773:26403 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=773:26403) | pending | — | GET /admin/users, PUT /users/:id/role | Admin - Overview |
| 19 | Error page - 403 | 2182:9291 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=2182:9291) | pending | — | — | Homepage SAA |
| 20 | Error page - 404 | 1378:5063 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=1378:5063) | pending | — | — | Homepage SAA |
| 21 | Thể lệ UPDATE (Rules/T&C) | 3204:6051 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=3204:6051) | pending | — | GET /rules | Homepage SAA, Awards Information |
| 22 | Ẩn danh | 2099:9148 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=2099:9148) | pending | — | POST /kudos (anonymous) | Sun* Kudos |
| 23 | Màn Sửa bài viết - edit mode | 1949:13746 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=1949:13746) | pending | — | GET /kudos/:id, PUT /kudos/:id | View Kudo, Sun* Kudos |
| 24 | Gửi lời chúc Kudos | 828:13433 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=828:13433) | pending | — | POST /kudos | Sun* Kudos |
| 25 | Dropdown-profile | 721:5223 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=721:5223) | pending | — | POST /auth/logout | Homepage SAA, Profile, Login |
| 26 | Dropdown-profile Admin | 721:5277 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=721:5277) | pending | — | POST /auth/logout | Admin - Overview, Profile, Login |
| 27 | Dropdown-ngôn ngữ | 721:4942 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=721:4942) | pending | — | — | (same screen, locale change) |
| 28 | Alert Overlay | 3127:24672 | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=3127:24672) | pending | — | — | (same screen, confirmation) |

---

## Navigation Graph

```mermaid
flowchart TD
    subgraph Auth["Authentication"]
        Login["Login\n(662:14387)"]
        LangDropdown["Dropdown - Ngôn ngữ\n(721:4942)"]
    end

    subgraph Main["Main Application"]
        Homepage["Homepage SAA\n(2167:9026)"]
        AwardsInfo["Awards Information\n(313:8436)"]
        SunKudos["Sun* Kudos - Live board\n(2940:13431)"]
        WritKudo["Viết Kudo\n(520:11602)"]
        ViewKudo["View Kudo\n(520:18779)"]
        EditKudo["Màn Sửa bài viết\n(1949:13746)"]
        ProfileOwn["Profile bản thân\n(362:5037)"]
        ProfileOther["Profile người khác\n(362:5097)"]
        Notif["Tất cả thông báo\n(589:9132)"]
        ViewNotif["View thông báo\n(589:9152)"]
        Rules["Thể lệ UPDATE\n(3204:6051)"]
        Anonymous["Ẩn danh\n(2099:9148)"]
    end

    subgraph Admin["Admin Panel"]
        AdminOverview["Admin - Overview\n(620:7712)"]
        AdminReview["Admin - Review content\n(722:16251)"]
        AdminSearch["Admin - Review - Search\n(832:13197)"]
        AdminSetting["Admin - Setting\n(820:10492)"]
        AdminAddCamp["Admin - Add Campaign\n(832:12113)"]
        AdminEditCamp["Admin - Edit Campaign\n(832:12299)"]
        AdminUsers["Admin - User\n(773:26403)"]
    end

    subgraph Overlays["Overlays / Modals"]
        ProfileDropdown["Dropdown-profile\n(721:5223)"]
        AdminDropdown["Dropdown-profile Admin\n(721:5277)"]
        AlertOverlay["Alert Overlay\n(3127:24672)"]
    end

    subgraph Errors["Error Pages"]
        E403["Error 403\n(2182:9291)"]
        E404["Error 404\n(1378:5063)"]
    end

    AppLaunch([Unauthenticated]) --> Login
    Login -- "Google OAuth success" --> Homepage
    Login -- "Language toggle" --> LangDropdown
    LangDropdown -- "Select/dismiss" --> Login

    Homepage -- "Awards Information nav/CTA/card" --> AwardsInfo
    Homepage -- "Sun* Kudos nav/CTA/Kudos Chi tiết" --> SunKudos
    Homepage -- "User avatar" --> ProfileDropdown
    Homepage -- "Notification bell" --> Notif
    Homepage -- "Widget Button" --> WritKudo

    AwardsInfo -- "About SAA 2025 nav" --> Homepage
    AwardsInfo -- "Sun* Kudos nav/Chi tiết" --> SunKudos
    AwardsInfo -- "Footer: Tiêu chuẩn chung" --> Rules
    AwardsInfo -- "User avatar" --> ProfileDropdown

    SunKudos -- "Viết Kudo button / Widget" --> WritKudo
    SunKudos -- "Kudos card click" --> ViewKudo
    SunKudos -- "Avatar hover" --> ProfileOther

    WritKudo -- "Submit success" --> SunKudos
    WritKudo -- "Anonymous toggle" --> Anonymous

    ViewKudo -- "Edit" --> EditKudo
    EditKudo -- "Save" --> ViewKudo

    ProfileDropdown -- "Profile" --> ProfileOwn
    ProfileDropdown -- "Sign out" --> Login
    AdminDropdown -- "Admin Dashboard" --> AdminOverview
    AdminDropdown -- "Sign out" --> Login

    ProfileOwn -- "Back" --> Homepage
    ProfileOther -- "Send Kudos" --> WritKudo

    Notif -- "Click notification" --> ViewNotif
    ViewNotif -- "Back" --> Notif

    AdminOverview --> AdminReview
    AdminOverview --> AdminSetting
    AdminOverview --> AdminUsers
    AdminReview --> AdminSearch
    AdminSetting --> AdminAddCamp
    AdminSetting --> AdminEditCamp
```

---

## Screen Details (Discovered)

### 1. Login (Frame ID: 662:14387)

![Login Screen](https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/662:14387/9b6a80531ed3a0744c2a0c2ed06a55af.png)

**Purpose**: Entry point of the SAA 2025 application. Authenticates users via Google OAuth before granting access to the main application.

#### Entry Points
- App launch (unauthenticated users are redirected here)
- Session expiry / logout

#### Exit Points
- Successful Google login → Homepage SAA
- Language dropdown → Dropdown overlay (Dropdown-ngôn ngữ, Frame 721:4942)

#### Key UI Elements

| No | Component | Type | Description |
|----|-----------|------|-------------|
| A | A_Header | Navigation | Top bar: SAA 2025 logo (non-interactive) + language toggle (top-right) |
| A.1 | A.1_Logo | Logo | "Sun Annual Awards 2025" logo — non-interactive |
| A.2 | A.2_Language | Toggle Button | Current language "VN" with flag. Click opens Dropdown-ngôn ngữ |
| B | B_Bìa | Hero Frame | Full-width hero with key visual, headline, subtitle, and login CTA |
| B.1 | B.1_Key Visual | Hero Banner | Decorative "ROOT FURTHER" background artwork |
| B.2 | B.2_content | Info Block | "Bắt đầu hành trình của bạn cùng SAA 2025." + "Đăng nhập để khám phá!" |
| B.3 | B.3_Login | CTA Button | "LOGIN With Google" → Google OAuth. Loading state on click |
| D | D_Footer | Footer Label | "Bản quyền thuộc về Sun* © 2025" — non-interactive |

---

### 2. Homepage SAA (Frame ID: 2167:9026)

![Homepage SAA Screen](https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/2167:9026/e6b9526bed512d707db105ecd2e780dd.png)

**Purpose**: Main landing page for authenticated users. Introduces SAA 2025 ("ROOT FURTHER"), shows a real-time countdown, presents the 6-award system grid, and promotes Sun* Kudos.

#### Entry Points
- Successful Google login
- Header/footer logo click from any screen

#### Key UI Elements

| No | Component | Type | Description |
|----|-----------|------|-------------|
| A1 | A1_Header | Organism | Sticky header: logo + nav links + notification bell + language + avatar |
| B | Bìa (Hero) | Organism | "ROOT FURTHER" key visual + countdown + event info + CTA buttons |
| B1 | B1_Countdown | Molecule | Real-time DAYS/HOURS/MINUTES countdown. Updates per minute |
| B2 | B2_EventInfo | Molecule | Event time (18h30), venue, Facebook live note |
| B3 | B3_CTA | Molecule | "ABOUT AWARDS" + "ABOUT KUDOS" buttons |
| B4 | B4_content | Molecule | "ROOT FURTHER" descriptive paragraph |
| C1 | C1_Header | Molecule | Section heading for awards system |
| C2 | C2_Award list | Organism | 6 award cards (2-col mobile, 3-col desktop) — each links to `/awards-information#{slug}` |
| D1 | D1_Sunkudos | Organism | Sun* Kudos promo: label + title + desc + "Chi tiết" CTA |
| 6 | Widget Button | FAB | Fixed gold pill (bottom-right): pen icon + SAA logo. Toggles quick-action menu |
| 7 | Footer | Organism | Logo + nav links + copyright |

---

### 4. Sun* Kudos - Live board (Frame ID: 2940:13431)

**Purpose**: Main hub for the peer-recognition feature. Serves as an interactive Kudos feed (users send/browse Kudos) and a real-time live board (spotlight, live counter, ticker). Split into 4 zones: Hero/Action area, Spotlight Board, All Kudos feed, Right stats sidebar.

#### Entry Points
- Homepage SAA: "Sun* Kudos" header nav, D1_Sunkudos "Chi tiết" button
- Awards Information: "Sun* Kudos" header nav, D1_Sunkudos "Chi tiết"
- Any footer: "Sun* Kudos" link
- After submitting a Kudo (Viết Kudo → back here)

#### Key UI Elements

| No | Component | Type | Description |
|----|-----------|------|-------------|
| Header | Header | Organism | Shared sticky header; "Sun* Kudos" nav item ACTIVE |
| Keyvisual | Keyvisual | Organism | Sun* Kudos hero background |
| A.1 | Button ghi nhận | CTA Button | Primary action: write/send a Kudo → /write-kudo |
| A.2 | Tìm kiếm sunner | Search | Search for Sunner — opens search overlay/filter |
| B_Highlight | B_Highlight | Organism | Highlighted Kudos carousel (prev/next/page navigation) |
| B.6 | Header Spotlight | Heading | "Sun* Annual Awards 2025 \| SPOTLIGHT BOARD" |
| B.7 | B.7_Spotlight | Organism | Live board: Kudos counter (388), avatar grid (pan/zoom), live ticker |
| C.1 | ALL KUDOS header | Heading | Section heading for full feed |
| C.2 | Kudos feed | Feed | Scrollable list of all Kudo posts (C.3–C.7 card instances) |
| D.1 | Thống kê tổng quát | Stats | General Kudos statistics |
| D.3 | Top 10 Sunner | Leaderboard | Top 10 Sunners who received the most Kudos |
| Footer | Footer | Organism | Shared footer with 4 nav links |

**Real-time Features**:
- Live Kudos counter (B.7.1): updates when new Kudo submitted
- Live ticker (B.7): "HH:MM [user] đã nhận được một Kudos mới"
- Live feed (C.2): new Kudos appear at top

---

### 3. Hệ thống giải thưởng / Awards Information (Frame ID: 313:8436)

- **Frame Name**: Hệ thống giải thưởng
- **File Key**: 9ypp4enmFmdK3YAFJLIu6C
- **Route**: `/awards-information`
- **Spec Directory**: `.momorph/specs/313-8436-AwardInformation/`

**Purpose**: Giới thiệu 6 hạng mục giải thưởng SAA 2025 với tiêu chí, số lượng, giá trị tiền thưởng. Dedicated page displaying all 6 SAA 2025 award categories with full details (description, recipient count, prize value). Left sticky nav for in-page navigation.

#### Entry Points
- Homepage SAA: "Awards Information" header nav, "ABOUT AWARDS" CTA, award card click
- Any screen footer: "Awards Information" link

#### Navigation
- **From**: Header "Award Information" link (from any authenticated screen)
- **Links to**: `/sun-kudos` via Kudos section CTA (D1_Sunkudos block)
- **Links to**: Homepage SAA via header logo or nav
- **Links to**: Tiêu chuẩn chung (Rules) via footer link

#### Key UI Elements

| No | Component | Type | Description |
|----|-----------|------|-------------|
| Header | Header | Organism | Shared sticky header |
| 3_KV | 3_Keyvisual | Organism | ROOT FURTHER hero banner — non-interactive |
| A | A_Title | Molecule | "Hệ thống giải thưởng SAA 2025" section heading (gold) |
| C | C_MenuList | Molecule | Left sticky nav: 6 award items with icon + text; active = gold underline |
| D | D_DanhSách | Organism | 6 award sections (D.1–D.6): image 336×336 + title + desc + count + value |
| D1 | D1_Sunkudos | Organism | Sun* Kudos promo block (shared with Homepage SAA) |
| Footer | Footer | Organism | Shared footer with 4 nav links including "Tiêu chuẩn chung" |

**Award Data**:
- Top Talent: 10 cá nhân — 7,000,000 VNĐ/each
- Top Project: 02 tập thể — 15,000,000 VNĐ/each
- Top Project Leader: 03 cá nhân — 7,000,000 VNĐ/each
- Best Manager: 01 cá nhân — 10,000,000 VNĐ
- Signature 2025 Creator: 01 — 5,000,000 VNĐ (cá nhân) / 8,000,000 VNĐ (tập thể)
- MVP: 01 cá nhân — 15,000,000 VNĐ

---

## Screen Groups

### Group: Authentication
| Screen | Purpose | Entry Points |
|--------|---------|--------------|
| Login | Google OAuth entry point | App launch, session expiry, logout |
| Dropdown-ngôn ngữ | Language selection overlay | Login + Homepage SAA header |

### Group: Main Application
| Screen | Purpose | Entry Points |
|--------|---------|--------------|
| Homepage SAA | Event landing hub; countdown, awards overview, Sun* Kudos promo | After login, logo click |
| Awards Information | Full awards system details | Homepage, footer |
| Sun* Kudos - Live board | Kudos feed + write/view kudos | Homepage, nav, widget button |
| Viết Kudo | Write a new Kudos | Sun* Kudos, widget button |
| View Kudo | Read a single Kudos post | Sun* Kudos feed |
| Màn Sửa bài viết | Edit own Kudos post | View Kudo |
| Profile bản thân | Own profile with stats/kudos | Dropdown-profile |
| Profile người khác | Other user's profile | Kudos card click |
| Tất cả thông báo | All notifications list | Header notification bell |
| View thông báo | Single notification detail | Notification list |
| Thể lệ UPDATE | Rules/T&C page | Footer "Tiêu chuẩn chung" |
| Error 403 | Forbidden access page | Protected route without permission |
| Error 404 | Not found page | Invalid URL |
| Ẩn danh | Anonymous kudos mode | Viết Kudo (toggle) |

### Group: Admin Panel
| Screen | Purpose | Entry Points |
|--------|---------|--------------|
| Admin - Overview | Admin dashboard hub | Dropdown-profile Admin |
| Admin - Review content | Review/moderate kudos | Admin overview |
| Admin - Review content - Search | Search kudos for review | Admin review |
| Admin - Setting | Campaign management | Admin overview |
| Admin - Setting - add Campaign | Add new campaign | Admin setting |
| Admin - Setting - add new Campaign | Alternative add campaign flow | Admin setting |
| Admin - Setting - Edit Campaign | Edit existing campaign | Admin setting |
| Admin - User | User role management | Admin overview |

---

## API Endpoints Summary

| Endpoint | Method | Screens Using | Purpose |
|----------|--------|---------------|---------|
| Google OAuth (external) | — | Login | Authenticate via Google account |
| POST /auth/google | POST | Login | Exchange Google token for app session |
| POST /auth/logout | POST | Dropdown-profile | Sign out user |
| GET /awards | GET | Homepage SAA, Awards Information | Fetch award categories |
| GET /events/current | GET | Homepage SAA | Fetch event datetime, venue |
| GET /kudos/feed | GET | Sun* Kudos | Paginated kudos feed |
| GET /kudos/highlighted | GET | Sun* Kudos | Highlighted Kudos for carousel |
| GET /kudos/spotlight | GET | Sun* Kudos | Real-time spotlight recipients + ticker events |
| GET /kudos/stats | GET | Sun* Kudos | Kudos statistics/counters + top-10 leaderboard |
| POST /kudos | POST | Viết Kudo, Gửi lời chúc, Ẩn danh | Create new kudos |
| GET /kudos/:id | GET | View Kudo | Fetch single kudos |
| PUT /kudos/:id | PUT | Màn Sửa bài viết | Update own kudos |
| GET /users/me | GET | Profile bản thân | Own profile data |
| GET /users/:id | GET | Profile người khác | Other user profile |
| GET /notifications | GET | Tất cả thông báo | Notifications list |
| GET /notifications/:id | GET | View thông báo | Single notification |
| GET /admin/stats | GET | Admin - Overview | Admin dashboard stats |
| GET /admin/kudos | GET | Admin - Review content | Kudos list for moderation |
| PUT /kudos/:id/status | PUT | Admin - Review content | Approve/reject kudos |
| GET /admin/campaigns | GET | Admin - Setting | Campaign list |
| POST /admin/campaigns | POST | Admin - add Campaign | Create campaign |
| PUT /admin/campaigns/:id | PUT | Admin - Edit Campaign | Update campaign |
| GET /admin/users | GET | Admin - User | User management list |
| PUT /users/:id/role | PUT | Admin - User | Update user role |

---

## Technical Notes

### Authentication Flow
- Google OAuth 2.0 — no password form
- On success: application session via HttpOnly cookie (Supabase)
- Unauthenticated users → redirect to Login
- Admin role users see extra "Admin Dashboard" option in profile dropdown

### Language / Localisation
- Language selector on Login + all app headers
- Supports Vietnamese (VN) minimum; EN optional via dropdown

### Routing (Next.js App Router)
- `/` — Login (public)
- `/dashboard` — Homepage SAA (protected)
- `/awards-information` — Awards Information (protected)
- `/sun-kudos` — Sun* Kudos (protected)
- `/dashboard` redirects to login if unauthenticated (middleware)

### Countdown Timer
- Event datetime: `NEXT_PUBLIC_EVENT_DATETIME` env var (ISO-8601)
- Updates every 60 seconds; zero-padded 2-digit DAYS / HOURS / MINUTES
- "Coming soon" label hidden when countdown reaches zero

### Award Navigation
- Each award section: `id="{slug}"` for anchor linking (`#top-talent`, etc.)
- Left nav uses IntersectionObserver to sync active item with scroll position

### Role-Based Access
- Regular users: full app except Admin Panel
- Admin role: additional "Admin Dashboard" in profile dropdown
- Admin routes protected by role check → 403 for unauthorized access

---

## Navigation Flows

### 1. Successful Login
1. User on Login → clicks "LOGIN With Google" → Google OAuth → on success → redirect to Homepage SAA

### 2. Awards Information (direct)
1. Homepage SAA → click "Awards Information" header nav → `/awards-information`
2. Homepage SAA → click "ABOUT AWARDS" CTA → `/awards-information`
3. Homepage SAA → click award card → `/awards-information#top-talent` (anchored)

### 3. Awards Information → in-page navigation
1. User on Awards Information → clicks left nav item (e.g., "MVP") → smooth scroll to D.6_MVP section
2. Active nav item updates as user scrolls through sections

### 4. Sun* Kudos flow
1. Homepage/Awards Info → "Sun* Kudos" nav → Sun* Kudos Live board
2. Sun* Kudos → click "Viết Kudo" → Viết Kudo form → submit → back to Sun* Kudos
3. Sun* Kudos → click kudos card → View Kudo → edit → Màn Sửa bài viết

### 5. Admin flow
1. Any screen → header avatar → Dropdown-profile Admin → "Admin Dashboard" → Admin Overview
2. Admin Overview → Review content / Setting / User management

---

## Discovery Log

| Date | Action | Screens | Notes |
|------|--------|---------|-------|
| 2026-03-23 | Initial discovery | Login (662:14387) | Auth entry point; Google OAuth only |
| 2026-03-24 | Screen discovery | Homepage SAA (2167:9026) | Main post-login landing page; countdown, 6 awards, Sun* Kudos, widget |
| 2026-03-24 | Frame list expansion | All 28 screens identified | list_frames revealed full app scope: main screens + admin + overlays |
| 2026-03-24 | Screen discovery | Awards Information (313:8436) | Full awards detail page; left nav + 6 award sections + Sunkudos promo |
| 2026-03-24 | Screen discovery | Sun* Kudos Live board (2940:13431) | Main Kudos hub: live board + full feed + spotlight + stats; 12 outgoing navigations |
| 2026-03-27 | Spec created | Sun* Kudos Live board (2940:13431) | spec.md + design-style.md in specs/2940-13431-SunKudosLiveBoard/ |

---

## Next Steps

- [x] Discover Sun* Kudos - Live board (2940:13431) — screen_specs/sun_kudos_live_board.md
- [x] Create spec for Sun* Kudos - Live board (2940:13431) — specs/2940-13431-SunKudosLiveBoard/
- [ ] **Next**: Discover **Viết Kudo** (520:11602)
- [ ] Discover Profile bản thân (362:5037)
- [ ] Discover Admin - Overview (620:7712)
- [ ] Discover Dropdown-profile (721:5223) and Dropdown-profile Admin (721:5277)
- [ ] Discover Tất cả thông báo (589:9132)
- [ ] Discover Thể lệ UPDATE (3204:6051)
- [ ] Discover Error pages (403: 2182:9291, 404: 1378:5063)
- [ ] Discover Ẩn danh (2099:9148)
- [ ] Confirm `/awards-information` route and award slug format with backend team
- [ ] Confirm Google OAuth callback endpoint
- [ ] Verify left nav scroll sync implementation approach
