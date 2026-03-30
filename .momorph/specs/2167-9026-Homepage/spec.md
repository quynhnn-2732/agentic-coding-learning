# Feature Specification: Homepage SAA

**Frame ID**: `2167:9026`
**Frame Name**: `Homepage SAA`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-24
**Status**: Draft

---

## Overview

Trang chủ của hệ thống SAA 2025 (Sun Annual Awards 2025) — màn hình đầu tiên người dùng nhìn thấy sau khi đăng nhập thành công. Trang truyền tải tinh thần chủ đề "ROOT FURTHER", hiển thị đồng hồ đếm ngược đến ngày sự kiện, giới thiệu các hạng mục giải thưởng, và quảng bá phong trào Sun* Kudos.

Người dùng mục tiêu: Nhân viên Sun* đã đăng nhập vào hệ thống SAA 2025.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Xem tổng quan Homepage và điều hướng (Priority: P1)

Người dùng sau khi đăng nhập được chuyển đến Homepage. Họ nhìn thấy hero section với hình nền, tiêu đề "ROOT FURTHER", đồng hồ đếm ngược, thông tin sự kiện, và các nút CTA. Header hiển thị logo, nav links, và các nút chức năng.

**Why this priority**: Đây là màn hình landing chính — mọi người dùng đều thấy nó đầu tiên. Điều hướng từ đây đến các tính năng khác là core flow.

**Independent Test**: Truy cập `/` sau khi đăng nhập → verify các section hiển thị đúng.

**Acceptance Scenarios**:

1. **Given** người dùng đã đăng nhập, **When** họ truy cập trang chủ `/`, **Then** header, hero section (ROOT FURTHER bg + đồng hồ đếm ngược + thông tin sự kiện + CTA buttons), award section, Sunkudos section, và footer hiển thị đầy đủ.
2. **Given** người dùng ở trang chủ, **When** họ click logo, **Then** trang scroll về đầu.
3. **Given** người dùng đang ở trang chủ và nav link "About SAA 2025" đang ở trạng thái selected, **When** họ click nav link "About SAA 2025", **Then** trang scroll về đầu trang (scrollToTop), không navigate sang trang khác.
4. **Given** người dùng ở trang chủ, **When** họ click nav link "Awards Information", **Then** điều hướng đến trang Awards Information.
5. **Given** người dùng ở trang chủ, **When** họ click nav link "Sun* Kudos", **Then** điều hướng đến trang Sun* Kudos.
6. **Given** người dùng ở trang chủ, **When** họ click nút "ABOUT AWARDS", **Then** điều hướng đến trang Awards Information.
7. **Given** người dùng ở trang chủ, **When** họ click nút "ABOUT KUDOS", **Then** điều hướng đến trang Sun* Kudos.
8. **Given** người dùng ở trang chủ, **When** họ click icon chuông thông báo (A1.6) trong header, **Then** notification panel mở ra (nội dung panel là feature riêng — Out of Scope cho màn hình này).
9. **Given** người dùng ở trang chủ, **When** họ click icon avatar (A1.8) trong header, **Then** Dropdown-profile overlay (Frame 721:5223) mở ra (nội dung dropdown là feature riêng — Out of Scope cho màn hình này).

---

### User Story 2 - Xem đồng hồ đếm ngược sự kiện (Priority: P1)

Người dùng muốn biết còn bao nhiêu thời gian đến khi sự kiện bắt đầu. Đồng hồ hiển thị realtime số ngày / giờ / phút còn lại, kèm thông tin thời gian và địa điểm cụ thể.

**Why this priority**: Đây là tính năng interactive cốt lõi trên hero, tạo cảm giác hứng khởi và urgency cho sự kiện.

**Independent Test**: Render component CountdownSection với `targetDate` prop → verify digits cập nhật theo thời gian thực.

**Acceptance Scenarios**:

1. **Given** người dùng truy cập trang chủ trước ngày sự kiện, **When** trang load, **Then** đồng hồ hiển thị số ngày/giờ/phút còn lại (zero-padded, e.g. "03", "14", "07"), label "Coming soon" hiện ra.
2. **Given** người dùng giữ trang mở, **When** đủ 1 phút trôi qua, **Then** giá trị MINUTES tự động giảm 1 mà không cần refresh trang.
3. **Given** thời điểm sự kiện đã qua, **When** trang load, **Then** label "Coming soon" bị ẩn; tất cả digits hiển thị "00".
4. **Given** thời gian còn lại < 1 ngày, **When** đồng hồ hiển thị, **Then** DAYS = "00", HOURS và MINUTES hiển thị đúng.
5. **Given** thông tin sự kiện, **When** B2 section render, **Then** hiển thị "Thời gian: 26/12/2025 / 18h30", "Địa điểm: Âu Cơ Art Center", và dòng "Tường thuật trực tiếp qua sóng Livestream".

---

### User Story 3 - Khám phá hệ thống giải thưởng (Priority: P2)

Người dùng muốn xem tổng quan các hạng mục giải thưởng. Section C hiển thị grid 6 thẻ giải thưởng với hình ảnh, tên, mô tả ngắn và link "Chi tiết".

**Why this priority**: Giúp người dùng hiểu hệ thống giải thưởng trước khi tham gia, nhưng không block các tính năng chính.

**Independent Test**: Render AwardCard component với mock data → verify click điều hướng đúng anchor.

**Acceptance Scenarios**:

1. **Given** người dùng scroll đến section giải thưởng, **When** section render, **Then** caption "Sun* annual awards 2025" (white), đường kẻ ngang phân cách (#2E3940), và tiêu đề "Hệ thống giải thưởng" (màu vàng, 57px) hiển thị — **không có description text** bên dưới heading.
2. **Given** 6 hạng mục giải thưởng, **When** section render, **Then** grid 3 cột (desktop) hiển thị đủ 6 thẻ: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP.
3. **Given** người dùng hover vào award card, **When** hover, **Then** card nổi lên nhẹ (`translateY(-4px)`) và box-shadow tăng cường.
4. **Given** người dùng click vào hình ảnh / tên giải / "Chi tiết", **When** click, **Then** điều hướng đến `/awards-information#{award-slug}` (scroll đến đúng section của giải đó).
5. **Given** màn hình tablet/mobile, **When** render, **Then** grid chuyển thành 2 cột (tablet & mobile).

---

### User Story 4 - Khám phá Sun* Kudos (Priority: P2)

Người dùng được giới thiệu về phong trào Sun* Kudos qua section D với description text, logo KUDOS, và nút "Chi tiết".

**Why this priority**: Quảng bá tính năng Kudos là mục tiêu business quan trọng của SAA 2025 nhưng không phải core navigation.

**Independent Test**: Render SunkudosSection → verify button click điều hướng đúng.

**Acceptance Scenarios**:

1. **Given** người dùng scroll đến section Sunkudos, **When** render, **Then** label "Phong trào ghi nhận", tiêu đề "Sun* Kudos", đoạn mô tả, nút "Chi tiết", và logo KUDOS hiển thị.
2. **Given** người dùng click "Chi tiết" trong section Sunkudos, **When** click, **Then** điều hướng đến trang Sun* Kudos (tab tương ứng).

---

### User Story 5 - Floating Widget Button (Priority: P3)

Nút widget nổi ở góc dưới phải màn hình cho phép người dùng truy cập nhanh các tính năng phụ.

**Why this priority**: Tính năng phụ, tiện ích. Không block core user journey.

**Independent Test**: Verify widget button hiển thị đúng vị trí và mở menu khi click.

**Acceptance Scenarios**:

1. **Given** người dùng đang scroll trên trang, **When** widget button render, **Then** button luôn hiện ở vị trí fixed góc phải (không cuộn theo trang).
2. **Given** người dùng click widget button, **When** click, **Then** menu các action nhanh mở ra.

---

### Edge Cases

- Nếu `EVENT_DATETIME` env var không được set hoặc sai format ISO-8601: countdown hiển thị "00:00:00" và ẩn "Coming soon".
- Nếu data giải thưởng load failed: hiển thị skeleton/fallback, không crash trang.
- Nếu user chưa đăng nhập: middleware redirect về trang Login (xử lý ở `src/middleware.ts`).
- Màn hình rất nhỏ (< 375px): layout co lại nhưng không có horizontal scroll.
- Countdown khi tab bị ẩn (background): timer vẫn chính xác khi tab được focus lại (dùng `Date.now()` thay vì `setInterval` counter).
- JavaScript disabled: countdown section hiển thị "00 DAYS / 00 HOURS / 00 MINUTES" (static fallback); trang vẫn render đủ các section tĩnh (header, awards grid, footer) vì chúng là Server Components.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| A1_Header | Thanh điều hướng cố định trên cùng (80px), logo + nav links + controls | Click logo → top; click nav link → navigate; hover → highlight |
| 3.5_Keyvisual | Background image toàn màn hình (hero bg) | None (decorative) |
| Cover | Gradient overlay lên bg image | None (decorative) |
| B.1_Key Visual | ROOT FURTHER logo image (451×200px) | None (decorative) |
| B1_Countdown | Đồng hồ đếm ngược realtime (Days/Hours/Minutes) | Auto-update mỗi phút |
| B2_Event Info | Thông tin thời gian & địa điểm sự kiện | Static display |
| B3_CTA | 2 nút hành động chính (About Awards, About Kudos) | Click → navigate; hover → fill/outline swap |
| B4_content | Đoạn mô tả tinh thần "ROOT FURTHER" | Static display |
| 6_Widget Button | FAB button cố định góc phải | Click → open action menu |
| C1_Awards Header | Tiêu đề section giải thưởng | Static |
| C2_Award Grid | 6 thẻ giải thưởng dạng grid | Click card/title/Chi tiết → navigate to anchor |
| D1_Sunkudos | Section quảng bá Sun* Kudos | Click Chi tiết → navigate |
| 7_Footer | Footer với logo, 4 nav links (About SAA 2025 / Awards Information / Sun* Kudos / Tiêu chuẩn chung), và copyright | Click nav → navigate |

### Navigation Flow

- **Vào**: Redirect từ `/auth/callback` sau khi đăng nhập thành công; middleware redirect từ bất kỳ protected route nào sau khi login
- **Ra**:
  - Header nav "Awards Information" → `/awards-information`
  - Header nav "Sun* Kudos" → `/sun-kudos`
  - Header nav "About SAA 2025" (khi đang ở trang khác) → `/`; khi đang ở `/` → scrollToTop (FR-011)
  - Header avatar (A1.8) → mở Dropdown-profile overlay (Frame 721:5223)
  - Header notification bell (A1.6) → mở notification panel
  - CTA "ABOUT AWARDS" → `/awards-information`; CTA "ABOUT KUDOS" → `/sun-kudos`
  - Award card (click hình / tên / "Chi tiết") → `/awards-information#{award-slug}`
  - Sunkudos "Chi tiết" → `/sun-kudos`
  - Footer "About SAA 2025" → `/`; "Awards Information" → `/awards-information`; "Sun* Kudos" → `/sun-kudos`; "Tiêu chuẩn chung" → `/tieu-chuan-chung`
  - Widget button click → toggles quick-action menu (menu content Out of Scope)
- **Auth guard**: Unauthenticated users → redirect to `/login` (login page) via middleware

### Visual Requirements

- Xem chi tiết trong [design-style.md](./design-style.md)
- Responsive breakpoints: Mobile (< 768px), Tablet (768–1023px), Desktop (≥ 1024px)
- Animations: card hover lift, CTA button fill/outline swap (200ms ease-out)
- Accessibility: WCAG AA contrast, keyboard nav, ARIA labels, focus rings

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST hiển thị đồng hồ đếm ngược realtime (cập nhật mỗi phút) tính từ thời điểm hiện tại đến mốc thời gian sự kiện được cấu hình qua env var.
- **FR-002**: System MUST ẩn label "Coming soon" khi thời điểm sự kiện đã qua và giữ tất cả digits ở "00".
- **FR-003**: Users MUST được điều hướng đến trang "Awards Information" khi click nút "ABOUT AWARDS" hoặc click vào award card.
- **FR-004**: Users MUST được điều hướng đến trang "Sun* Kudos" khi click nút "ABOUT KUDOS" hoặc "Chi tiết" trong Sunkudos section.
- **FR-005**: Award card click MUST điều hướng đến `/awards-information#{award-slug}` để scroll đến đúng section.
- **FR-006**: System MUST hiển thị đúng thông tin sự kiện: thời gian, địa điểm, ghi chú Livestream.
- **FR-007**: Nav link tương ứng với trang hiện tại MUST hiển thị trạng thái selected (màu vàng + underline + text-shadow glow).
- **FR-008**: Widget button MUST luôn hiển thị ở vị trí fixed góc phải (không scroll theo trang).
- **FR-009**: Footer MUST chứa 4 navigation links: "About SAA 2025" (→ `/`), "Awards Information" (→ `/awards-information`), "Sun* Kudos" (→ `/sun-kudos`), "Tiêu chuẩn chung" (→ `/tieu-chuan-chung`); cùng logo và copyright text.
- **FR-010**: Unauthenticated users MUST bị redirect về login page (handled by middleware).
- **FR-011**: Khi người dùng đang ở Homepage và nav link "About SAA 2025" đang ở trạng thái selected, click vào nav link đó MUST scroll trang về đầu (window.scrollTo(0,0)) thay vì navigate.

### Technical Requirements

- **TR-001**: Countdown component MUST là Client Component (`"use client"`) vì cần `setInterval` / `useState`. Logic tính toán thời gian còn lại MUST dùng `Date.now()` để tránh drift khi tab background.
- **TR-002**: Event target datetime MUST được đọc từ env var `NEXT_PUBLIC_EVENT_DATETIME` (ISO-8601 format) — không hardcode trong code.
- **TR-003**: Header, Footer, và các section tĩnh MUST là Server Components (RSC).
- **TR-004**: Background image (keyvisual) MUST dùng `next/image` với `fill` và `priority`.
- **TR-005**: Award card images MUST dùng `next/image` với kích thước cụ thể và `loading="lazy"` (không phải LCP).
- **TR-006**: Custom fonts (SVN-Gotham, Digital Numbers) MUST được self-hosted trong `/public/fonts/` hoặc render KUDOS/digits dưới dạng image nếu không có bản quyền font.
- **TR-007**: Trang MUST pass Lighthouse Performance ≥ 90 trên desktop.
- **TR-008**: Security headers MUST được set qua `next.config.ts` (CSP, X-Frame-Options, etc.).

### Key Entities *(if feature involves data)*

- **Event**: Singleton entity — ngày giờ, địa điểm, ghi chú (từ env vars hoặc CMS/config)
- **Award**: `{ id, slug, name, description, imageUrl }` — 6 hạng mục cố định (có thể từ static data hoặc API)
- **User session**: Auth session từ Supabase (kiểm tra bởi middleware)

**Award data (6 hạng mục cố định):**

| # | Slug | Award Name | Route Anchor |
|---|------|------------|--------------|
| 1 | `top-talent` | Top Talent | `/awards-information#top-talent` |
| 2 | `top-project` | Top Project | `/awards-information#top-project` |
| 3 | `top-project-leader` | Top Project Leader | `/awards-information#top-project-leader` |
| 4 | `best-manager` | Best Manager | `/awards-information#best-manager` |
| 5 | `signature-2025-creator` | Signature 2025 - Creator | `/awards-information#signature-2025-creator` |
| 6 | `mvp` | MVP (Most Valuable Person) | `/awards-information#mvp` |

---

## State Management

### Local Component State

| Component | State | Type | Description |
|-----------|-------|------|-------------|
| `<Countdown />` | `timeLeft` | `{ days, hours, minutes }` | Số ngày/giờ/phút còn lại, cập nhật mỗi phút |
| `<Countdown />` | `isEventPast` | `boolean` | `true` khi `Date.now() >= targetDate`; ẩn "Coming soon" |
| `<Header />` | `activeLink` | `string` | Link đang active — xác định qua `usePathname()` |
| `<LanguageSelector />` | `isOpen` | `boolean` | Trạng thái mở/đóng dropdown ngôn ngữ |
| `<WidgetButton />` | `isMenuOpen` | `boolean` | Trạng thái mở/đóng quick-action menu |

### Global / Server State

| State | Source | Usage |
|-------|--------|-------|
| User session | Supabase Auth (SSR cookie) | Kiểm tra auth trong middleware; hiển thị user avatar trong header |
| Awards data | Static data file hoặc `GET /api/awards` | List 6 award cards — fetch một lần, không thay đổi runtime |
| Event config | `NEXT_PUBLIC_EVENT_DATETIME`, `NEXT_PUBLIC_EVENT_LOCATION` | Countdown target + event info hiển thị |

### Loading / Error States

| Scenario | Behavior |
|----------|----------|
| Awards data loading | Hiển thị 6 skeleton cards (gray boxes giữ layout) |
| Awards data fetch failed | Hiển thị fallback message "Không thể tải danh sách giải thưởng. Vui lòng thử lại." |
| `NEXT_PUBLIC_EVENT_DATETIME` không hợp lệ | Countdown hiển thị "00 DAYS / 00 HOURS / 00 MINUTES"; ẩn "Coming soon" |
| Countdown về 0 | "Coming soon" ẩn; digits freeze ở "00" |

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/auth/callback` | GET | OAuth callback, set session cookie | Exists |
| `/api/awards` | GET | Lấy danh sách 6 hạng mục giải thưởng | Predicted (New) |
| Supabase Auth | — | Session validation in middleware | Exists |

> API `/api/awards` có thể được thay bằng static data file nếu danh sách giải thưởng không thay đổi thường xuyên.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Trang load và hiển thị đầy đủ trong < 3 giây trên kết nối 4G (Lighthouse FCP < 1.8s).
- **SC-002**: Countdown timer đồng bộ với server time, sai số < 60 giây.
- **SC-003**: Tất cả navigation links dẫn đến đúng trang/section, zero broken links.
- **SC-004**: Trang hiển thị đúng trên tất cả breakpoints (Mobile/Tablet/Desktop) không có horizontal overflow.
- **SC-005**: Lighthouse Accessibility score ≥ 90 — ARIA labels, focus rings, color contrast đạt WCAG AA.
- **SC-006**: Unauthenticated access bị block 100% bởi middleware.

---

## Out of Scope

- Authentication flow (đã implement ở Login screen)
- Notification panel (bell icon — chỉ hiển thị icon, chức năng panel là feature riêng: `Tất cả thông báo` screen)
- User profile dropdown content (avatar icon hiển thị và click mở Dropdown-profile overlay Frame 721:5223, nhưng nội dung dropdown là feature riêng)
- Language switching (chỉ hiển thị VN flag + "VN", chức năng i18n là feature riêng hoặc đã implement ở Login)
- Widget button menu content (chỉ implement nút với `isMenuOpen` toggle, menu content là feature riêng)
- Admin dashboard link trong account dropdown (admin-only, feature riêng)
- Real-time notification badge count (số lượng thông báo chưa đọc — feature riêng)
- Tiêu chuẩn chung page content (footer link hiển thị và navigate `/tieu-chuan-chung`, nhưng page content là feature riêng)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available — cần tạo nếu có API `/api/awards`
- [ ] Database design — cần nếu awards data từ DB
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`) — 28 screens identified, Homepage SAA = discovered
- [x] Login screen implemented (prerequisite — user phải đăng nhập trước)
- [ ] Custom fonts (SVN-Gotham, Digital Numbers) — cần bản font file hoặc quyết định dùng image

---

## Notes

- **Event datetime**: `NEXT_PUBLIC_EVENT_DATETIME=2025-12-26T18:30:00+07:00` (theo design: hiển thị "26/12/2025")
- **Địa điểm sự kiện**: "Âu Cơ Art Center" (theo Figma frame) — hardcode hoặc từ env var `NEXT_PUBLIC_EVENT_LOCATION`
- **"Coming soon"**: Figma typo là "Comming soon" — implementation nên dùng "Coming soon" (đúng chính tả)
- **ROOT FURTHER**: Rendered dưới dạng image (không phải text) — font SVN-Gotham là proprietary
- **B4 content text**: Đoạn văn dài về tinh thần "ROOT FURTHER" — nên đặt trong i18n string hoặc CMS
- **Award slugs**: Top Talent → `top-talent`, Top Project → `top-project`, etc. (kebab-case)
- **Footer nav links**: 4 links — About SAA 2025, Awards Information, Sun* Kudos, **Tiêu chuẩn chung** (→ `/tieu-chuan-chung`). Footer has MORE links than header (which has 3).
- **A1.8 Avatar button**: Click → mở Dropdown-profile overlay (Frame 721:5223). Dropdown content (Profile, Sign out, Admin Dashboard) là feature riêng.
- **Screenflow cross-reference**: Awards Information → `.momorph/contexts/screen_specs/awards_information.md`; Sun* Kudos → `.momorph/contexts/screen_specs/` (pending discovery)
- Xem visual specs chi tiết tại [design-style.md](./design-style.md)
