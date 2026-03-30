# Feature Specification: Hệ thống giải thưởng (Award Information)

**Frame ID**: `313:8436`
**Frame Name**: `Hệ thống giải thưởng`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-25
**Status**: Draft

---

## Overview

Màn hình giới thiệu chi tiết hệ thống giải thưởng của Sun* Annual Awards (SAA) 2025. Người dùng có thể xem danh sách 6 hạng mục giải, mô tả tiêu chí xét thưởng, số lượng giải, và giá trị tiền thưởng tương ứng. Có navigation sidebar bên trái để điều hướng nhanh đến từng hạng mục.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Xem tổng quan hệ thống giải thưởng (Priority: P1)

Người dùng truy cập trang Award Information để hiểu cơ cấu giải thưởng SAA 2025 trước khi đăng ký hoặc tìm hiểu thêm.

**Why this priority**: Đây là nội dung cốt lõi của màn hình — mọi tương tác khác đều phụ thuộc vào việc hiển thị đúng danh sách 6 hạng mục giải.

**Independent Test**: Load trang `/awards-information`, kiểm tra tất cả 6 hạng mục giải được hiển thị đầy đủ với ảnh, tiêu đề, mô tả, số lượng và giá trị.

**Acceptance Scenarios**:

1. **Given** người dùng truy cập `/awards-information`, **When** trang load xong, **Then** hiển thị đầy đủ 6 award cards: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP — mỗi card có ảnh (336×336), tiêu đề vàng, mô tả, số lượng và giá trị giải.
2. **Given** trang đã load, **When** scroll xuống, **Then** tất cả 6 hạng mục có thể đọc đầy đủ mà không bị cắt.
3. **Given** trang trên mobile, **When** xem màn hình < 768px, **Then** layout chuyển sang column, sidebar ẩn, content full-width.

---

### User Story 2 - Điều hướng nhanh đến hạng mục giải (Priority: P2)

Người dùng click vào một item trong sidebar navigation để nhảy thẳng đến phần thông tin hạng mục giải tương ứng.

**Why this priority**: Sidebar navigation cải thiện UX cho trang dài — nhưng trang vẫn dùng được nếu không có scroll navigation.

**Independent Test**: Click từng item trong sidebar, kiểm tra viewport scroll đến đúng section với active state trên nav item.

**Acceptance Scenarios**:

1. **Given** sidebar đang hiện mục "Top Talent" là active, **When** click "Best Manager", **Then** trang scroll đến section Best Manager và nav item "Best Manager" có active state (màu vàng #FFEA9E + indicator).
2. **Given** đang scroll trang bình thường, **When** một section vào viewport, **Then** nav item tương ứng trong sidebar tự động đổi sang active state.
3. **Given** hover lên nav item, **When** chuột di vào, **Then** item highlight nhẹ (hover state).

---

### User Story 3 - Xem thông tin Sun* Kudos (Priority: P3)

Người dùng xem phần Sun* Kudos ở cuối trang và click "Chi tiết" để đến trang Kudos.

**Why this priority**: Đây là thông tin bổ sung, không phải nội dung chính của màn hình.

**Independent Test**: Scroll xuống cuối trang, click nút "Chi tiết" trong Sun* Kudos section, kiểm tra điều hướng đến `/sun-kudos`.

**Acceptance Scenarios**:

1. **Given** ở cuối trang Award Information, **When** click "Chi tiết", **Then** điều hướng đến trang `/sun-kudos`.
2. **Given** hover nút "Chi tiết", **When** chuột di vào, **Then** hiện hover effect (opacity hoặc scale nhẹ).

---

### Edge Cases

- Nếu ảnh award image không load được: hiển thị placeholder với dimensions 336×336px.
- Trên mobile (<768px): sidebar bị ẩn hoàn toàn (`display: none`); không có scroll-to-section navigation từ sidebar (fallback: user scroll thường). Deep link anchor vẫn hoạt động qua URL hash.
- Signature 2025 - Creator có 2 giá trị thưởng (cá nhân và tập thể): hiển thị cả hai với dấu phân cách "Hoặc".

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Keyvisual Banner | `313:8437` | Hero banner với ảnh nền, tiêu đề "ROOT FURTHER", phụ đề "Sun* Annual Award 2025" | None (decorative) |
| A_Title Section | `313:8453` | Tiêu đề section: "Sun* annual awards 2025" + "Hệ thống giải thưởng SAA 2025" | None |
| C_Menu List (Sidebar) | `313:8459` | Navigation sidebar trái, 6 items: Top Talent → Top Project → Top Project Leader → Best Manager → Signature 2025 - Creator → MVP | Click: scroll-to-section + active state |
| D.1 Top Talent | `313:8467` | Award info: ảnh + content block (mô tả + metadata) | None |
| D.2 Top Project | `313:8468` | Award info: ảnh + content block | None |
| D.3 Top Project Leader | `313:8469` | Award info: ảnh + content block | None |
| D.4 Best Manager | `313:8470` | Award info: ảnh + content block | None |
| D.5 Signature 2025 - Creator | `313:8471` | Award info: ảnh + content block (special: 2 prize values) | None |
| D.6 MVP | `313:8510` | Award info: ảnh + content block | None |
| D1 Sun* Kudos | `335:12023` | Khối quảng bá Kudos ở cuối trang | Click "Chi tiết" → `/sun-kudos` |

### Award Card Data

| # | Slug (section `id`) | Award Name | Image File | Layout | Quantity | Unit | Prize Value |
|---|---------------------|------------|------------|--------|----------|------|-------------|
| 1 | `top-talent` | Top Talent | `award-top-talent.png` | Image LEFT | 10 | Đơn vị | 7.000.000 VNĐ (mỗi giải) |
| 2 | `top-project` | Top Project | `award-top-project.png` | Image RIGHT | 02 | Tập thể | 15.000.000 VNĐ |
| 3 | `top-project-leader` | Top Project Leader | `award-top-project-leader.png` | Image LEFT | 03 | Cá nhân | 7.000.000 VNĐ |
| 4 | `best-manager` | Best Manager | `award-best-manager.png` | Image RIGHT | 01 | Cá nhân | 10.000.000 VNĐ |
| 5 | `signature-2025-creator` | Signature 2025 - Creator | `award-signature-creator.png` | Image LEFT | 01 | Cá nhân hoặc tập thể | 5.000.000 VNĐ (cá nhân) / 8.000.000 VNĐ (tập thể) |
| 6 | `mvp` | MVP (Most Valuable Person) | `award-mvp.png` | Image RIGHT | 01 | Cá nhân | 15.000.000 VNĐ |

> **Image files** are in `public/images/homepage/`. Layout alternates starting from LEFT for odd entries (1, 3, 5) and RIGHT for even entries (2, 4, 6) — see [design-style.md](./design-style.md) Award Row section for full layout details.

### Navigation Flow

- **From**: Header nav "Award Information" link hoặc Homepage CTA "About Awards"
- **To**:
  - Click "Chi tiết" trong Kudos → `/sun-kudos`
  - Header nav "Sun* Kudos" → `/sun-kudos`
  - Header nav "About SAA 2025" → `/` (homepage)
- **Triggers**: Header navigation, in-page sidebar scroll navigation

### Visual Requirements

- **Responsive breakpoints**: Mobile (<768px), Tablet (768–1023px), Desktop (≥1024px)
- **Animations/Transitions**: Sidebar active state transition (150ms), smooth scroll khi click nav item
- **Accessibility**: `aria-current="true"` trên active nav item; `role="navigation"` trên C_MenuList; ảnh award có `alt="{awardName} award"` (e.g., `alt="Top Talent award"`); semantic heading hierarchy (h1 cho page title → h2 per award section); focus state trên nav items (`outline: 2px solid #FFEA9E`); keyboard nav qua Tab + Enter để scroll đến section.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Trang PHẢI hiển thị đầy đủ thông tin của tất cả 6 hạng mục giải thưởng SAA 2025.
- **FR-002**: Mỗi hạng mục giải PHẢI hiển thị: tên giải, mô tả tiêu chí, số lượng giải, đơn vị nhận, và giá trị tiền thưởng.
- **FR-003**: Sidebar navigation PHẢI cho phép click để scroll đến từng section tương ứng.
- **FR-004**: Sidebar navigation PHẢI tự động cập nhật active state theo section đang trong viewport (scroll spy).
- **FR-005**: Hạng mục Signature 2025 - Creator PHẢI hiển thị 2 mức giải thưởng (cá nhân + tập thể) với phân cách "Hoặc".
- **FR-006**: Nút "Chi tiết" trong Sun* Kudos section PHẢI điều hướng đến `/sun-kudos`.

### Technical Requirements

- **TR-001**: Trang PHẢI render tĩnh (SSR/SSG) — dữ liệu awards là hardcoded, không cần API call.
- **TR-002**: Scroll spy sử dụng Intersection Observer API (không dùng scroll event listener).
- **TR-003**: `<section>` tags PHẢI có `id` cho mỗi award để sidebar navigation và anchor links hoạt động.
- **TR-004**: Ảnh award PHẢI dùng `next/image` với `width={336} height={336}`.
- **TR-005**: Trang `/awards-information` là **protected route** — user chưa đăng nhập PHẢI được redirect về `/` (login). Auth check thực hiện qua middleware (Supabase session).
- **TR-006**: Mỗi award section PHẢI có `id` khớp với slug anchor được dùng ở Homepage SAA (e.g., `id="top-talent"`) để deep link hoạt động.
- **TR-007**: Ảnh award PHẢI có `alt` text theo format `"{awardName} award"` (e.g., `alt="Top Talent award"`).
- **TR-008**: Sidebar navigation với scroll spy PHẢI là **Client Component** (`"use client"`) vì dùng Intersection Observer API và React state. `page.tsx` vẫn là Server Component; chỉ `<AwardSidebar />` cần `"use client"`.
- **TR-009**: `AwardDetail` type phải được extend từ `Award` (hoặc tạo mới trong `src/libs/types/homepage.ts`) với `quantity`, `unit`, `prizeValue`. Data file `src/libs/data/awards.ts` cũng phải được cập nhật với các field mới.

### Key Entities

- **AwardDetail** (extended for this page): `{ id, slug, name, imageUrl, description, quantity: number, unit: 'Cá nhân' | 'Tập thể' | 'Đơn vị', prizeValue: string | { individual: string, team: string } }`
- **NavItem**: `{ id, label, href: string }` — href is anchor e.g. `#top-talent`

> ⚠️ **Implementation note**: The existing `Award` type in `src/libs/types/homepage.ts` only has `{ id, slug, name, description, imageUrl }`. For the Awards Information page, extend this type (or create `AwardDetail`) to include `quantity`, `unit`, and `prizeValue`. Existing `awardsData` in `src/libs/data/awards.ts` must be updated with these fields.

### Award Descriptions (from existing `src/libs/data/awards.ts`)

| Award | Description |
|-------|-------------|
| Top Talent | Vinh danh cá nhân xuất sắc với năng lực vượt trội và cống hiến đặc biệt cho tổ chức. |
| Top Project | Tôn vinh dự án tiêu biểu đạt thành tựu xuất sắc về chất lượng, hiệu quả và tác động. |
| Top Project Leader | Ghi nhận nhà lãnh đạo dự án xuất sắc với khả năng dẫn dắt đội nhóm đạt kết quả vượt mong đợi. |
| Best Manager | Tôn vinh quản lý xuất sắc có tầm nhìn chiến lược, năng lực phát triển đội ngũ và kết quả kinh doanh nổi bật. |
| Signature 2025 - Creator | Vinh danh cá nhân sáng tạo nổi bật, tạo dấu ấn đặc biệt trong năm 2025 qua các sản phẩm và giải pháp độc đáo. |
| MVP | Most Valuable Player — Vinh danh cá nhân có đóng góp giá trị nhất, tạo tác động lớn nhất cho tổ chức trong năm. |

---

## State Management

### Local State (Client Component — `<AwardSidebar />`)

| State | Type | Initial Value | Purpose |
|-------|------|---------------|---------|
| `activeCategory` | `string` | `'top-talent'` | Tracks which award section is currently in viewport; drives active nav item highlight |

### Global State

| State | Source | Read/Write | Purpose |
|-------|--------|------------|---------|
| `user` (session) | Supabase SSR cookie | Read | Display user avatar in header; redirect to login if null |
| `locale` | i18nStore | Read | VN/EN language for UI labels |

### Loading & Error States

| State | Trigger | UI Behavior |
|-------|---------|-------------|
| Page load | SSR — no async data fetch needed | No loading skeleton (data is static/hardcoded) |
| Image load failure | `next/image` onError | Show 336×336 placeholder (gray box) |
| Auth failure (401) | Middleware session check | Redirect to `/` (login) |
| 404 | Invalid route | Next.js 404 page |

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| — | — | Không cần API — dữ liệu tĩnh | Static |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Tất cả 6 hạng mục giải hiển thị đúng thông tin (quantity, value) theo Figma design.
- **SC-002**: Sidebar navigation scroll-to-section hoạt động chính xác cho tất cả 6 items.
- **SC-003**: Trang pass visual regression với độ sai lệch < 5% so với Figma screenshot.
- **SC-004**: Lighthouse Performance score ≥ 90 trên desktop.

---

## Out of Scope

- Chức năng đăng ký ứng cử (nomination/application form) — đây chỉ là trang thông tin tĩnh.
- Trang chi tiết riêng cho từng hạng mục giải.
- Filter / search awards.
- API backend để quản lý awards content (CMS).

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available — N/A (static content)
- [ ] Database design completed — N/A (static content)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- Ảnh award images (6 files) đã có trong `public/images/homepage/` từ màn Homepage SAA (award-top-talent.png, award-top-project.png, v.v.)
- Layout sidebar + content giống dạng documentation page (sticky sidebar, scrollable content)
- Sidebar navigation nên sticky khi scroll để luôn visible
- Màn hình này là target của header nav "Award Information" (route: `/awards-information`)
