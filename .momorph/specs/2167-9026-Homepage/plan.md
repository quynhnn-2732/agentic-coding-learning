# Implementation Plan: Homepage SAA

**Frame**: `2167-9026-Homepage`
**Date**: 2026-03-24
**Spec**: `specs/2167-9026-Homepage/spec.md`

---

## Summary

Xây dựng màn hình Homepage SAA (Sun Annual Awards 2025) tại route `/` — trang landing chính sau khi người dùng đăng nhập thành công. Màn hình gồm header navigation đầy đủ, hero section với countdown realtime, section giải thưởng (6 award cards), section Sun* Kudos, floating widget button, và footer có nav links. Tất cả section tĩnh là RSC; chỉ Countdown, WidgetButton, và NavScrollLink là Client Components. Awards data dùng static data file (không cần API). Middleware hiện tại đã redirect authenticated user đến `/` — không cần thay đổi middleware.

---

## Implementation Status (as of 2026-03-24)

> **~90% implemented.** This plan is in **patch/polish mode** — most components exist and 66 tests pass. Only remaining work is listed below.

| Area | Status | Notes |
|------|--------|-------|
| All 12 homepage components | ✅ Implemented | `src/app/_components/homepage/` |
| All 5 new icons | ✅ Implemented | arrow, notification-bell, account, widget-pen, widget-saa |
| `src/libs/types/homepage.ts` | ✅ Implemented | `Award`, `CountdownState` types |
| `src/libs/data/awards.ts` | ✅ Implemented | 6 static award records |
| `next.config.ts` — `remotePatterns` | ✅ Done | `lh3.googleusercontent.com` added |
| `globals.css` — homepage tokens | ✅ Done | All tokens + `@font-face` block present |
| `vitest.config.ts` — env vars | ✅ Done | `NEXT_PUBLIC_EVENT_DATETIME` + `NEXT_PUBLIC_EVENT_LOCATION` |
| All 8 unit test files | ✅ Done | `tests/unit/homepage/` |
| Integration test | ✅ Done | `tests/integration/dashboard-page.test.tsx` |
| E2E test | ✅ Done | `tests/e2e/homepage.spec.ts` |
| Figma assets (images) | ✅ Done | All images present in `public/images/homepage/` |
| **Digital Numbers font file** | ❌ MISSING | `public/fonts/digital-numbers/digital-numbers.woff2` not present — countdown falls back to monospace |
| **Countdown digit split** | ❌ BUG | `countdown.tsx` renders "07" as ONE tile; design requires TWO tiles `[0][7]` with 4px gap (see Phase 2 bug fix) |
| Unit tests for static RSC | ⚠️ PARTIAL | `cta-buttons`, `hero-section`, `b4-content`, `awards-section`, `sunkudos-section` have no unit tests — justified below |

**Justified exclusions (unit tests for static RSC):** `hero-section.tsx`, `b4-content.tsx`, `awards-section.tsx`, `sunkudos-section.tsx`, and `cta-buttons.tsx` are pure Server Components with zero conditional logic, no state, and no event handlers — they are covered implicitly by the integration test (`dashboard-page.test.tsx` renders the full page and asserts all sections). Adding isolated unit tests for wrapper RSCs would produce zero additional coverage and violate "avoid over-engineering" principle. Navigation from `cta-buttons.tsx` is covered by the E2E test.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, @supabase/ssr, next/image, next/font
**Database**: Supabase (Auth only — awards dùng static data)
**Testing**: Vitest + @testing-library/react (unit/integration), Playwright (E2E)
**State Management**: Local component state only (`useState`, `useEffect`)
**API Style**: N/A for this screen (static data + env vars)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

| Rule | Constitution Section | Status |
|------|---------------------|--------|
| Kebab-case file names | I. Clean Code | ✅ Compliant |
| Functions ≤ 40 lines; extract helpers | I. Clean Code | ✅ app/page.tsx delegates to section components |
| No magic numbers/strings (use named constants) | I. Clean Code | ✅ Design tokens in globals.css |
| Dead code / commented blocks not committed | I. Clean Code | ✅ Planned |
| RSC by default; `"use client"` only when needed | II. Next.js | ✅ Only Countdown, WidgetButton, NavScrollLink |
| NEXT_PUBLIC_ prefix for client-exposed env vars | II. Next.js | ✅ NEXT_PUBLIC_EVENT_DATETIME, NEXT_PUBLIC_EVENT_LOCATION |
| Approved libraries (next/image, TailwindCSS v4, @supabase/ssr) | II. Tech Stack | ✅ Compliant |
| Design tokens in `@theme inline {}`, no arbitrary values | II. TailwindCSS | ✅ Compliant |
| Supabase server client in RSC; never localStorage | II. Supabase | ✅ Using createClient from server.ts |
| TDD: failing tests before implementation | III. Test-First | ✅ Tests written at start of each phase |
| No implementation merged without test | III. Test-First | ✅ Planned |
| Mobile-first responsive (base = mobile, md/lg enhance) | IV. Responsive | ✅ Planned |
| No horizontal scrollbar on any breakpoint | IV. Responsive | ✅ `overflow-x-hidden` on page container |
| OWASP: no dangerouslySetInnerHTML | V. Security | ✅ Static data only |
| Security headers set in next.config.ts | V. Security | ✅ Already configured |
| Folder structure: src/app/ and src/libs/ | Tech Stack | ✅ Compliant |

**Violations (if any)**:

| Violation | Justification | Alternative Rejected |
|-----------|---------------|---------------------|
| Không có violation | — | — |

---

## Architecture Decisions

### Frontend Approach

- **Routing**: Homepage SAA tại `/`. Middleware redirect unauthenticated users → `/login` và redirect authenticated users trên `/login` → `/`. Không cần thay đổi middleware.
- **Component Structure**: Feature-based — tất cả components cho homepage nằm trong `src/app/_components/homepage/`.
- **Styling Strategy**: TailwindCSS utility classes với design tokens từ `globals.css`. Design tokens mới chỉ thêm những gì chưa tồn tại (xem "Design Tokens to Add" bên dưới — có danh sách rõ ràng EXISTING vs NEW).
- **Data Fetching**: Awards data từ static TypeScript file `src/libs/data/awards.ts` (RSC-friendly, zero latency). Event config từ env vars (`NEXT_PUBLIC_EVENT_DATETIME`, `NEXT_PUBLIC_EVENT_LOCATION`).
- **Fonts**: Montserrat và Montserrat Alternates đã setup trong `layout.tsx`. Digital Numbers font (countdown) cần self-host tại `public/fonts/`. ROOT FURTHER và KUDOS logotype dùng `next/image` (không dùng SVN-Gotham proprietary font trong text).

### Critical: Header RSC vs Client Component split

`homepage/header.tsx` là **RSC** (const TR-003). Không dùng `usePathname()` trong header:

- "About SAA 2025" nav link **luôn ở trạng thái selected** khi header này render (vì nó chỉ render trên `/`). Hardcode active state — không cần dynamic check.
- FR-011 (click "About SAA 2025" → scrollToTop): cần `onClick`, tức cần Client Component. Giải pháp: tạo `homepage/nav-scroll-link.tsx` — Client Component nhỏ bọc **duy nhất** nav item "About SAA 2025". Toàn bộ phần còn lại của header vẫn là RSC.

```
homepage/header.tsx (RSC)
└── homepage/nav-scroll-link.tsx ("use client") ← chỉ bọc "About SAA 2025" link
```

### Separation from Login Screen

| Concern | Login Screen | Homepage SAA |
|---------|-------------|--------------|
| Header | `layout/header.tsx` (logo + lang selector, `absolute`) | `homepage/header.tsx` (logo + nav + bell + avatar + lang, `sticky top-0`) |
| Footer | `layout/footer.tsx` (copyright only, `absolute`) | `homepage/footer.tsx` (logo + nav + copyright, normal flow) |
| Page | `src/app/login/page.tsx` | `src/app/page.tsx` |
| Background | Full-page keyvisual image | Sectioned layout (hero bg + dark sections) |

> Login components (`layout/header.tsx`, `layout/footer.tsx`) **KHÔNG thay đổi** — chúng chỉ được dùng cho Login screen.

### Header Position: `sticky` vs `absolute`

Design-style.md chỉ định `position: sticky; top: 0` cho header (ghi chú: Figma dùng `absolute` ở design-time nhưng implementation phải dùng `sticky` để header luôn hiển thị khi scroll). Đây khác với Login header dùng `absolute`.

### Backend Approach

- **Awards API**: Không cần — dùng static data. Nếu sau này cần dynamic, swap sang `fetch('/api/awards')` trong RSC.
- **Auth validation**: Handled bởi middleware (đã có). Homepage page có thể trust session đã valid.
- **Supabase session**: Đọc user info (avatar URL) từ Supabase server client trong `app/page.tsx` để truyền xuống Header component qua props. Avatar URL từ `user.user_metadata.avatar_url` (Google: `lh3.googleusercontent.com`).

### Integration Points

- **Existing**: `src/libs/supabase/server.ts` — đọc user session trong homepage page RSC
- **Existing**: `src/middleware.ts` — không thay đổi
- **Existing**: `src/app/globals.css` — thêm design tokens mới (chỉ những gì chưa có)
- **Existing**: `src/app/layout.tsx` — không thay đổi (fonts đã config)
- **Existing**: `src/app/_components/icons/` — thêm icon mới tại đây (không tạo folder mới)
- **Modified**: `next.config.ts` — thêm `images.remotePatterns` cho Google avatar
- **New**: `src/libs/data/awards.ts` — static awards data
- **New**: `public/fonts/digital-numbers/` — countdown font

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/2167-9026-Homepage/
├── spec.md              # Feature specification (done)
├── design-style.md      # Design specifications (done)
├── plan.md              # This file
└── tasks.md             # Task breakdown (next step)
```

### Source Code (affected areas)

> **Status legend**: ✅ = already exists and implemented; ❌ = still missing; ⚠️ = exists but has a bug.

```text
# All source files (✅ already exist)
src/app/
└── page.tsx ✅                        # Homepage SAA (RSC) — fetches user session, renders sections

src/app/_components/homepage/
├── header.tsx ✅                      # A1_Header (RSC: logo + nav links + right icons)
├── nav-scroll-link.tsx ✅             # "About SAA 2025" nav item ("use client" — onClick scrollToTop)
├── hero-section.tsx ✅                # B section container (RSC: bg image + content)
├── countdown.tsx ⚠️ BUG              # B1_Countdown ("use client") — renders "07" as 1 tile; needs 2 tiles
├── event-info.tsx ✅                  # B2_Event info (RSC — static text from env vars)
├── cta-buttons.tsx ✅                 # B3_CTA buttons (RSC — next/link)
├── b4-content.tsx ✅                  # B4_ROOT FURTHER description block (RSC)
├── awards-section.tsx ✅              # C1 header + C2 grid container (RSC)
├── award-card.tsx ✅                  # C2 single award card (RSC — next/link)
├── sunkudos-section.tsx ✅            # D1_Sunkudos (RSC)
├── footer.tsx ✅                      # 7_Footer with nav links (RSC)
└── widget-button.tsx ✅               # 6_Widget Button ("use client" — toggle menu state)

src/app/_components/icons/
├── arrow-icon.tsx ✅                  # Arrow ↗ (CTA buttons, 24×24) & → ("Chi tiết", 20×20)
├── notification-bell-icon.tsx ✅      # Bell icon (header, 24×24)
├── account-icon.tsx ✅                # User avatar placeholder (header, 40×40)
├── widget-pen-icon.tsx ✅             # Pen icon (widget button)
└── widget-saa-icon.tsx ✅             # SAA mini logo icon (widget button)

src/libs/data/
└── awards.ts ✅                       # Static award data: Award[] (id, slug, name, desc, imageUrl)

src/libs/types/
└── homepage.ts ✅                     # TypeScript types: Award, CountdownState

public/
├── fonts/
│   └── digital-numbers/
│       └── digital-numbers.woff2 ❌  # MISSING — countdown falls back to monospace; must be acquired
└── images/homepage/ ✅
    ├── hero-keyvisual.png             # Hero background (PNG, not JPG)
    ├── root-further-hero.png          # "ROOT FURTHER" logo for hero section (B.1_Key Visual)
    ├── root-further-b4-1.png          # "ROOT FURTHER" image for B4 content (variant 1)
    ├── root-further-b4-2.png          # "ROOT FURTHER" image for B4 content (variant 2)
    ├── kudos-section-bg.png           # Sun* Kudos section background (PNG)
    ├── kudos-logo.svg                 # KUDOS logotype (SVG, not PNG)
    ├── widget-pen-icon.svg            # Pen SVG (also has .tsx component)
    ├── widget-saa-icon.svg            # SAA SVG (also has .tsx component)
    ├── award-top-talent.png           # Award card images (PNG, not JPG — 6 total)
    ├── award-top-project.png
    ├── award-top-project-leader.png
    ├── award-best-manager.png
    ├── award-signature-creator.png
    └── award-mvp.png

# Already modified (✅ done)
src/app/globals.css ✅                 # Homepage tokens + @font-face already added
next.config.ts ✅                      # images.remotePatterns for lh3.googleusercontent.com already added
vitest.config.ts ✅                    # NEXT_PUBLIC_EVENT_DATETIME + NEXT_PUBLIC_EVENT_LOCATION already added
```

> **ROOT FURTHER images**: There are 3 separate files (not 1). `root-further-hero.png` used in hero (B.1_Key Visual); `root-further-b4-1.png` and `root-further-b4-2.png` used in B4 content section. Check actual components to confirm which files are referenced.

> **Mobile header nav**: Design-style specifies nav links hidden on mobile (hamburger pattern). Hamburger menu is **Out of Scope for this MVP** — on mobile, header shows logo + right icons only; nav links hidden via `hidden md:flex`. Full hamburger drawer is a separate feature.

### Dependencies

| Package | Status | Purpose |
|---------|--------|---------|
| All existing | Already installed | No new runtime dependencies needed |

> Không cần install package mới. Tất cả dependencies (next/image, TailwindCSS, Supabase) đã có.

---

## Implementation Strategy

### Phase Breakdown

> **TDD Rule**: Mỗi phase BẮT ĐẦU bằng việc viết failing tests, SAU ĐÓ mới implement để pass. Tuân thủ Constitution Section III (Test-First Development, NON-NEGOTIABLE).

#### Phase 0: Acquire Missing Font ❌ REMAINING BLOCKER
> **All other assets are already in place.** Only the Digital Numbers font file is missing.

- Source Digital Numbers font `.woff2` (open-source, e.g. search [Google Fonts](https://fonts.google.com) or fontlibrary.org for "Digital Numbers" or "DSEG7") → save to `public/fonts/digital-numbers/digital-numbers.woff2`
- Verify font renders correctly in browser for countdown digits
- `@font-face` block already exists in `globals.css` — no CSS change needed; just the `.woff2` file

#### Phase 1: Foundation ✅ COMPLETE
- Design tokens: already in `globals.css` (lines 71–114)
- `@font-face`: already in `globals.css` (lines 108–114)
- Types: `src/libs/types/homepage.ts` exists
- Data: `src/libs/data/awards.ts` exists (6 awards)
- `next.config.ts`: `remotePatterns` for `lh3.googleusercontent.com` already added
- `vitest.config.ts`: env vars already added
- `src/app/page.tsx`: exists with user session fetch + all section components

#### Phase 2: P1 Core — Bug Fix (Countdown digit tiles) ⚠️ BUG FIX NEEDED

> **All Phase 2 components are implemented EXCEPT the countdown digit tile layout is wrong.**

**Countdown digit tile bug** (design requires two separate tiles per digit group):

Current behavior: `DigitTile` receives `value="07"` and renders ONE tile containing "07".

Required behavior: Each character gets its own tile. For value "07", render:
```tsx
// Split the 2-char padded string into individual digit tiles
function DigitGroup({ value, label }: { value: string; label: string }) {
  const [d1, d2] = value.split('') // "07" → ["0", "7"]
  return (
    <div className="flex flex-col items-center gap-[16px]">
      <div className="flex flex-row gap-[4px]">
        <SingleDigitTile char={d1} />
        <SingleDigitTile char={d2} />
      </div>
      <span className="font-montserrat font-bold text-[24px] leading-[32px] text-white">
        {label}
      </span>
    </div>
  )
}
```

Each `SingleDigitTile` is a `51×82px` div with `border: 0.5px solid #FFEA9E`, `backdrop-filter: blur(17px)`, showing ONE character. Gap between tiles: `4px`. Gap between groups (DAYS/HOURS/MINUTES): `40px`.

**Test to write first** (`countdown.test.tsx`): assert that for `days=7`, the rendered output contains TWO separate tile elements each with one character ("0" and "7"), not a single element with "07".

Other Phase 2 components:
- `header.tsx` ✅ | `nav-scroll-link.tsx` ✅ | `hero-section.tsx` ✅ | `event-info.tsx` ✅ | `cta-buttons.tsx` ✅
- All icons ✅ (arrow, notification-bell, account, widget-pen, widget-saa)

#### Phase 3: P2 Content ✅ COMPLETE
- `b4-content.tsx` ✅ | `award-card.tsx` ✅ | `awards-section.tsx` ✅
- `sunkudos-section.tsx` ✅ | `footer.tsx` ✅

#### Phase 4: P3 & Polish ✅ SUBSTANTIALLY COMPLETE
- `widget-button.tsx` ✅
- Accessibility ARIA labels: verify `aria-label="Thông báo"` (bell), `aria-label="Tài khoản"` (avatar), `aria-label="Thao tác nhanh"` (widget), `aria-expanded` attribute on widget button ✅
- Countdown digit transition: `key={value}` pattern for opacity transition — verify or add
- No horizontal scrollbar: `<main className="overflow-x-hidden">` — verify on homepage page ✅
- `app/page.tsx`: verify `export const metadata: Metadata = { title: 'SAA 2025 — Homepage' }` present
- **TR-007 Lighthouse ≥ 90**: Achieved via: (1) `next/image` for all images; (2) hero keyvisual `priority` (TR-004); (3) award card images `loading="lazy"` (TR-005); (4) `font-display: swap` in @font-face; (5) static data. Verify with `yarn build && npx lighthouse` before marking done.
- Responsive verification: 2-col mobile award grid, nav `hidden md:flex`, test at 320px (no horizontal scroll)

#### Phase 5: Integration & E2E Tests ✅ COMPLETE
- Integration: `tests/integration/dashboard-page.test.tsx` ✅
- Middleware redirect tests: `tests/unit/middleware.test.ts` ✅
- E2E: `tests/e2e/homepage.spec.ts` ✅ — all scenarios (countdown, award count, nav clicks, widget toggle, unauth redirect)

### Test File Locations

| Test Type | File | Status |
|-----------|------|--------|
| Unit | `tests/unit/homepage/awards-data.test.ts` | ✅ Done |
| Unit | `tests/unit/homepage/countdown.test.tsx` | ⚠️ Needs tile-split assertion added |
| Unit | `tests/unit/homepage/header.test.tsx` | ✅ Done |
| Unit | `tests/unit/homepage/nav-scroll-link.test.tsx` | ✅ Done |
| Unit | `tests/unit/homepage/event-info.test.tsx` | ✅ Done |
| Unit | `tests/unit/homepage/award-card.test.tsx` | ✅ Done |
| Unit | `tests/unit/homepage/footer.test.tsx` | ✅ Done |
| Unit | `tests/unit/homepage/widget-button.test.tsx` | ✅ Done |
| Integration | `tests/integration/dashboard-page.test.tsx` | ✅ Done |
| E2E | `tests/e2e/homepage.spec.ts` | ✅ Done |

> **Note**: No unit tests for `cta-buttons.tsx`, `hero-section.tsx`, `b4-content.tsx`, `awards-section.tsx`, `sunkudos-section.tsx` — justified: these are pure RSC with zero logic; covered by integration test + E2E. See "Justified exclusions" in Implementation Status section.

### Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Countdown digit tile layout wrong (OPEN BUG)** | High (already happening) | Medium | Fix: split `pad(n)` into 2 individual `<SingleDigitTile>` components with 4px gap. Add test asserting 2 tile elements per digit group. |
| Digital Numbers font không có bản woff2 free | High (file missing) | Medium | Fallback already works (monospace). Acquire font from open-source. If unavailable, keep monospace fallback with `font-variant-numeric: tabular-nums`. |
| SVN-Gotham proprietary — ROOT FURTHER & KUDOS text | High | Low | Đã plan: render dưới dạng `next/image` (assets từ Figma) — zero runtime dependency on font |
| Award card images chưa có từ Figma | Medium | Medium | Download bằng Figma MCP tool Phase 0; placeholder: `bg-[#1A2832]` div với `next/image` fallback |
| `NEXT_PUBLIC_EVENT_DATETIME` format sai ở môi trường khác | Low | Low | `try { new Date(env) } catch` → fallback "00 00 00" trong countdown.tsx |
| `lh3.googleusercontent.com` không config trong next.config.ts | Low | High | Đã plan: thêm `images.remotePatterns` trong Phase 1 — non-optional |
| Header sticky có thể bị z-index conflict với hero image | Low | Low | Set `z-index: 10` on header (đã documented); hero background uses `position: relative` |
| B4 content padding 120px 104px — width overflow on tablet | Medium | Medium | Cap container at `max-w-[1152px]`; reduce padding on tablet: `md:px-12 md:py-16` |

### Estimated Complexity

- **Frontend**: High (12 components, responsive layout, countdown logic, animations, icon set)
- **Backend**: None (static data + existing auth)
- **Testing**: Medium (unit + integration; E2E auth mock)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: Header + page (avatar prop flow); Countdown với env var
- [x] **External dependencies**: Supabase Auth session (read user in RSC → pass to header)
- [ ] **Data layer**: N/A — static data, no DB queries
- [x] **User workflows**: Login → redirect → `/` → navigate to awards/kudos

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Countdown update, nav active state, award card click, widget toggle |
| Service ↔ Service | Yes | Supabase session → user avatar display in header |
| App ↔ External API | No | Static data; no external API calls |
| App ↔ Data Layer | No | Awards từ static file |
| Cross-platform | Yes | Mobile 2-col vs Desktop 3-col award grid; header nav hidden mobile |

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth (getUser) | Mock via `vi.mock` | Không cần real DB; chỉ verify user data flows đúng |
| `Date.now()` / time | `vi.setSystemTime()` | Kiểm soát countdown state (before/after event) |
| `NEXT_PUBLIC_EVENT_DATETIME` | Test env var in `vitest.config.ts` | Deterministic test |
| `window.scrollTo` (NavScrollLink) | `Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true })` in test setup | NavScrollLink uses `window.scrollTo`, NOT Next.js router — `vi.mock('next/navigation')` is wrong here |
| `next/navigation` (useRouter) | `vi.mock('next/navigation')` | Only needed for Link navigation tests (award-card, cta-buttons, footer) |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Homepage page render đủ sections khi có valid session
   - [ ] Countdown hiển thị đúng days/hours/minutes với mock date 30 days before event
   - [ ] Award card 6 items render với correct slugs
   - [ ] "ABOUT AWARDS" button → `/awards-information`; "ABOUT KUDOS" → `/sun-kudos`
   - [ ] Award card click → `/awards-information#top-talent`
   - [ ] "Chi tiết" trong Sunkudos → `/sun-kudos`

2. **Error Handling**
   - [ ] `NEXT_PUBLIC_EVENT_DATETIME` invalid string → countdown shows "00 00 00"
   - [ ] Countdown past event date → "Coming soon" hidden, digits "00"
   - [ ] Unauthenticated access `/` → redirect `/login`
   - [ ] User has no avatar URL → render default account icon placeholder

3. **Edge Cases**
   - [ ] DAYS = "00" khi < 24h còn lại; HOURS/MINUTES vẫn đúng
   - [ ] Countdown re-check on tab focus (Date.now() re-evaluated on each interval tick)
   - [ ] Award grid: 2 col on mobile (<768px), 3 col on desktop (≥1024px)
   - [ ] Nav link "About SAA 2025" click → `window.scrollTo` called
   - [ ] Viewport < 375px → no horizontal scrollbar (overflow-x-hidden verified)
   - [ ] event-info date format: "26/12/2025" and "18h30" parsed correctly from ISO-8601 env var

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Countdown component | 90%+ | High |
| AwardCard component | 85%+ | High |
| Homepage page render | 80%+ | High |
| Navigation flows (E2E) | Key paths | High |

---

## Design Tokens Reference (globals.css) ✅ ALREADY ADDED

> All tokens below are **already present** in `src/app/globals.css` (lines 71–114). No CSS changes needed. This section is kept for reference only.

```css
/* === Homepage: NEW tokens only === */

/* Colors */
--color-accent-gold: #FFEA9E;          /* semantic alias — distinct from btn-login-bg */
--color-accent-gold-glow: #FAE287;
--color-btn-kudos-bg: rgba(255, 234, 158, 0.10);
--color-btn-kudos-border: #998C5F;
--color-notification-badge: rgba(212, 39, 29, 1);
--color-kudos-text: #DBD1C1;
--color-nav-selected: #FFEA9E;
--color-countdown-digit: #FFFFFF;
--color-homepage-header-bg: rgba(16, 20, 23, 0.8);  /* Homepage header: #101417@80%;
                                                         DIFFERENT from Login --color-header-bg:
                                                         rgba(11,15,18,0.8) = #0B0F12@80% */

/* Spacing — Homepage specific */
--spacing-section: 120px;
--spacing-page-px: 144px;
--spacing-page-py: 96px;
--spacing-content-w: 1224px;

/* Typography — Homepage specific */
--text-section-heading-size: 57px;
--text-section-heading-weight: 700;
--text-section-heading-line: 64px;
--text-cta-btn-size: 22px;
--text-cta-btn-weight: 700;
--text-award-card-title-size: 24px;
--text-award-card-title-weight: 400;
--text-award-card-desc-size: 16px;

/* Shadow */
--shadow-glow-gold: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287;
--shadow-nav-selected: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287;

/* Font — self-hosted Digital Numbers */
--font-digital: 'Digital Numbers', monospace;
```

Also add `@font-face` block **outside** `@theme inline {}`:

```css
@font-face {
  font-family: 'Digital Numbers';
  src: url('/fonts/digital-numbers/digital-numbers.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### `next.config.ts` — images.remotePatterns ✅ ALREADY DONE

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  async headers() { /* ... existing, unchanged ... */ },
}
```

### `vitest.config.ts` — test env vars ✅ ALREADY DONE

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    globals: true,
    env: {
      NEXT_PUBLIC_EVENT_DATETIME: '2025-12-26T18:30:00+07:00',
      NEXT_PUBLIC_EVENT_LOCATION: 'Âu Cơ Art Center',
    },
  },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
})
```

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed — compliant
- [x] `spec.md` approved (4 review passes, route refs fixed)
- [x] `design-style.md` approved (4 review passes)
- [x] Figma assets downloaded — all images present in `public/images/homepage/`
- [x] Env vars in `vitest.config.ts` — `NEXT_PUBLIC_EVENT_DATETIME`, `NEXT_PUBLIC_EVENT_LOCATION`
- [x] Env vars in `.env.example` — verify `NEXT_PUBLIC_EVENT_DATETIME` and `NEXT_PUBLIC_EVENT_LOCATION` listed
- [ ] Digital Numbers font sourced — `public/fonts/digital-numbers/digital-numbers.woff2` MISSING (Phase 0 blocker)
- [ ] Countdown digit tile bug fixed (Phase 2 bug fix)

### External Dependencies

- Figma MCP tool (`mcp__momorph__get_media_files`) — download award card images, hero keyvisual, KUDOS assets
- `NEXT_PUBLIC_EVENT_DATETIME=2025-12-26T18:30:00+07:00` — phải set trong `.env.local`
- `NEXT_PUBLIC_EVENT_LOCATION=Âu Cơ Art Center` — phải set trong `.env.local`

---

## Notes

- **Route `/`**: Homepage SAA nằm ở `/`. Middleware đã xử lý đúng: unauthenticated → `/login`, authenticated on `/login` → `/`. Không thay đổi middleware.
- **Header sticky**: Implement `position: sticky; top: 0` (khác với Figma `absolute`; khác với Login header `absolute`). Có `z-index: 10`.
- **Header tách biệt**: Login header (`layout/header.tsx`) và Homepage header (`homepage/header.tsx`) — 2 RSC riêng biệt, không chia sẻ props.
- **Footer tách biệt**: Login footer (`layout/footer.tsx`, `absolute`) vs Homepage footer (`homepage/footer.tsx`, normal flow + logo + nav links).
- **app/page.tsx ≤ 40 lines**: Chỉ import + JSX shell gọi `<HomepageHeader>`, `<HeroSection>`, `<B4Content>`, `<AwardsSection>`, `<SunkudosSection>`, `<HomepageFooter>`, `<WidgetButton>`.
- **ROOT FURTHER image**: Một file `root-further.png`, dùng ở 2 nơi với `width/height` khác nhau via `next/image`.
- **KUDOS logotype**: Dùng `next/image` từ `kudos-logo.png` — không render text bằng SVN-Gotham.
- **Award card images**: `loading="lazy"` (không phải LCP element — TR-005).
- **Hero keyvisual**: `priority={true}` + `fill` (LCP element — TR-004).
- **Award slugs**: `top-talent`, `top-project`, `top-project-leader`, `best-manager`, `signature-2025-creator`, `mvp` (kebab-case).
- **Notification bell + Avatar**: Chỉ render icon, no functionality (Out of Scope). Avatar: nếu `user.user_metadata.avatar_url` null → render `<AccountIcon>` placeholder.
- **Widget button menu**: Empty `<div>` khi `isMenuOpen = true` (Out of Scope).
- **Mobile nav links**: Hidden on mobile via `hidden md:flex`. No hamburger for MVP (Out of Scope).
- **B4 background**: Transparent — page background `#00101A` shows through (keyvisual không kéo dài đến B4).

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` để tạo task breakdown chi tiết
2. **Review** `tasks.md` — xác nhận thứ tự và phân chia task
3. **Begin** implementation theo thứ tự Phase 0 → Phase 5 (TDD: viết test trước mỗi phase)
