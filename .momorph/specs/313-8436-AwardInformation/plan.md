# Implementation Plan: Hệ thống giải thưởng (Award Information)

**Frame**: `313-8436-AwardInformation`
**Date**: 2026-03-25
**Spec**: `specs/313-8436-AwardInformation/spec.md`

---

## Summary

Xây dựng trang `/awards-information` hiển thị 6 hạng mục giải thưởng SAA 2025 với sidebar navigation scroll-spy. Đây là trang **tĩnh, protected** (SSR, dữ liệu hardcoded, yêu cầu đăng nhập). Công việc chính gồm: mở rộng `AwardDetail` type, cập nhật data file, tạo các component mới (`AwardSidebar` với Intersection Observer, `AwardEntry` với alternating image layout), và tái sử dụng `SunkudosSection` + `HomepageHeader` từ Homepage.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS v4, `next/image`, Supabase SSR
**Database**: N/A — static hardcoded data
**Testing**: Vitest (unit/integration), Playwright (E2E)
**State Management**: React `useState` + Intersection Observer (client-only in `AwardSidebar`)
**API Style**: N/A — no API calls

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case files, ≤40 lines per function)
- [x] Uses approved libraries only (no new dependencies needed)
- [x] Adheres to folder structure (`src/app/`, `src/libs/`)
- [x] Meets security requirements — protected route via existing middleware (all non-`/login`/`/auth` routes auto-protected)
- [x] Follows TDD — tests written before implementation code

**Violations**: None. All requirements are achievable within existing stack.

| Requirement | Constitution Rule | Status |
|-------------|------------------|--------|
| Route protection | Middleware auto-protects `/awards-information` | ✅ No change needed |
| RSC default | `page.tsx` is Server Component; only `AwardSidebar` needs `"use client"` | ✅ Compliant |
| Design tokens | New tokens added to `globals.css @theme` — NOT inline arbitrary values | ✅ Compliant |
| Images | `next/image` with `width={336} height={336}` | ✅ Compliant |
| Testing | TDD: unit → integration → E2E | ✅ Planned |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based under `src/app/_components/awards-information/`
- **Styling Strategy**: Tailwind v4 with tokens from `globals.css @theme`; add 2 missing tokens (`--radius-metadata`, `--text-award-page-title-size`)
- **Data Fetching**: No fetching — static `awardsData` array extended from existing `awardsData`
- **RSC Split**:
  - `page.tsx` → Server Component (session fetch, metadata)
  - `AwardSidebar` → `"use client"` (Intersection Observer + `useState`)
  - All other components → Server Components

### Integration Points

- **Reused components**: `SunkudosSection`, `HomepageHeader`, `layout/footer.tsx`
- **Extended data**: `src/libs/types/homepage.ts` (add `AwardDetail`), `src/libs/data/awards.ts` (add quantity/unit/prizeValue per award)
- **Existing tokens (no re-definition needed)**:
  - `--color-accent-gold` → `#FFEA9E` ✅
  - `--color-divider` → `#2E3940` (reuse as metadata-box BG) ✅
  - `--color-header-bg` → `rgba(16,20,23,0.8)` ✅
  - `--spacing-2xl` → `80px` (award-to-award gap) ✅
  - `--spacing-xl` → `40px` (image-to-content gap) ✅
  - `--spacing-lg` → `24px` ✅, `--spacing-md` → `16px` ✅
- **New tokens to add**:
  - `--radius-metadata: 16px` (metadata box border-radius)
  - `--text-award-page-title-size: 57px` (page heading)

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/313-8436-AwardInformation/
├── spec.md              ✅ approved
├── design-style.md      ✅ approved
├── plan.md              ← this file
├── tasks.md             (next: /momorph.tasks)
└── assets/frame.png     ✅ Figma reference
```

### Source Code

```text
# New files
src/app/awards-information/
└── page.tsx                                     # RSC — auth + metadata + layout

src/app/_components/awards-information/
├── keyvisual-banner.tsx                         # Hero banner (ROOT FURTHER artwork)
├── award-title-section.tsx                      # "Sun* annual awards 2025" heading block
├── award-sidebar.tsx                            # "use client" — sticky nav + scroll spy
├── award-entry.tsx                              # Single award row (alternating image/content)
├── award-content-block.tsx                      # Title + description + metadata boxes
└── award-metadata-box.tsx                       # Quantity / prize value box (bg divider)

tests/unit/awards-information/
├── award-sidebar.test.tsx                       # scroll spy state logic, active state transitions
├── award-entry.test.tsx                         # image position alternation, section id, alt text
├── award-content-block.test.tsx                 # h2 heading, description, metadata boxes rendering
├── award-metadata-box.test.tsx                  # quantity box, single prize, dual prize + "Hoặc" divider
└── award-title-section.test.tsx                 # h1 heading, subtitle, gold styling

tests/integration/
└── awards-information-page.test.tsx             # page load with mocked session

tests/e2e/
└── awards-information.spec.ts                   # full user journey

# Modified files
src/libs/types/homepage.ts                       # Add AwardDetail interface (extends Award)
src/libs/data/awards.ts                          # Change type to AwardDetail[], add quantity/unit/prizeValue to all 6 awards
src/app/globals.css                              # Add --radius-metadata, --text-award-page-title-size
src/app/_components/homepage/header.tsx          # Add activePath prop + conditional nav rendering (see Phase 4.4)
```

### Dependencies

No new packages required. All needed capabilities exist in the current stack.

---

## Implementation Strategy

### Phase 0: Foundation — Types, Data & Tokens

Update the shared data layer and design tokens before any UI work. All subsequent components depend on these.

**0.1 — Extend TypeScript types** (`src/libs/types/homepage.ts`)
```typescript
export interface AwardDetail extends Award {
  quantity: number
  unit: 'Cá nhân' | 'Tập thể' | 'Đơn vị'
  prizeValue: string | { individual: string; team: string }
}
```

**0.2 — Update awards data** (`src/libs/data/awards.ts`)

- Change `awardsData` type annotation from `Award[]` → `AwardDetail[]`
- **Keep the export name `awardsData`** (backward compatible — `AwardsSection` on homepage imports it and only uses `Award` fields)
- Add `quantity`, `unit`, `prizeValue` to all 6 entries:

| Award | quantity | unit | prizeValue |
|-------|----------|------|------------|
| Top Talent | 10 | `'Đơn vị'` | `'7.000.000 VNĐ'` |
| Top Project | 2 | `'Tập thể'` | `'15.000.000 VNĐ'` |
| Top Project Leader | 3 | `'Cá nhân'` | `'7.000.000 VNĐ'` |
| Best Manager | 1 | `'Cá nhân'` | `'10.000.000 VNĐ'` |
| Signature 2025 - Creator | 1 | `'Cá nhân'` | `{ individual: '5.000.000 VNĐ', team: '8.000.000 VNĐ' }` |
| MVP | 1 | `'Cá nhân'` | `'15.000.000 VNĐ'` |

**0.3 — Add missing design tokens** (`src/app/globals.css`)
```css
--radius-metadata: 16px;
--text-award-page-title-size: 57px;
```

---

### Phase 1: US1 — Display All 6 Awards (P1, Core Content)

Build the static layout with all award entries fully rendered.

**1.1 — `award-metadata-box.tsx`** — Smallest leaf component first (TDD)
- Props: `type: 'quantity' | 'prize'`, `quantity?: number`, `unit?: string`, `prizeValue?: AwardDetail['prizeValue']`
- **Quantity case** (`type='quantity'`): renders label "Số lượng giải thưởng:" + `quantity` (36px white bold) + `unit` (14px white)
- **Prize case — single** (`type='prize'`, `prizeValue` is string): renders label "Giá trị giải thưởng:" + value + "cho mỗi giải thưởng"
- **Prize case — dual** (`type='prize'`, `prizeValue` is object): renders two rows separated by "Hoặc" divider:
  ```
  Giá trị giải thưởng:  5.000.000 VNĐ  (cho giải cá nhân)
  ──── Hoặc ────   (bg: #2E3940, white text, centered, full-width)
                   8.000.000 VNĐ   (cho giải tập thể)
  ```
- Styling: `bg-divider rounded-[var(--radius-metadata)] p-[var(--spacing-md)] flex flex-col gap-2`

**1.2 — `award-content-block.tsx`**
- Props: `name: string`, `description: string`, `quantity: number`, `unit: AwardDetail['unit']`, `prizeValue: AwardDetail['prizeValue']`
- Renders:
  1. `<h2>` — award name, `text-[#FFEA9E] font-montserrat font-bold text-[24px] leading-[32px]`
  2. `<p>` — description, `text-white font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.5px] text-justify`
  3. `<AwardMetadataBox type="quantity" quantity={quantity} unit={unit} />`
  4. `<AwardMetadataBox type="prize" prizeValue={prizeValue} />`
- Width: `w-[480px]`, `flex flex-col gap-[var(--spacing-lg)] rounded-[16px]`
- Note: `<h2>` here is correct — `<h1>` lives in `AwardTitleSection`, `<h2>` per award section establishes heading hierarchy

**1.3 — `award-entry.tsx`**
- Props: `award: AwardDetail`, `imagePosition: 'left' | 'right'`
- Layout: `flex flex-row gap-[var(--spacing-xl)]` — image renders first when `imagePosition='left'`, last when `'right'`
- Image: `<Image src={award.imageUrl} alt="{award.name} award" width={336} height={336} className="flex-shrink-0" />`
- **Image load failure**: wrap in a div `w-[336px] h-[336px] bg-gray-800 rounded flex-shrink-0` as fallback container
- Wraps inside `<section id={award.slug}>` for anchor + deep links
- Passes award fields to `<AwardContentBlock />` as props

**1.4 — `award-title-section.tsx`**
- Static: subtitle (white Montserrat 24/700) + heading (gold `#FFEA9E` Montserrat 57/700)
- Render as `<h1>` for page title — heading hierarchy requirement (spec TR-007 / accessibility)
- No props — purely presentational

**1.5 — `keyvisual-banner.tsx`**
- Reuse pattern from homepage keyvisual: `next/image` with `fill`, gradient overlay
- Source image: same `hero-keyvisual.png` (or dedicated awards keyvisual if design differs)
- Height: fits content, no min-height constraint

**1.6 — `page.tsx`** (RSC)

> ⚠️ `SunkudosSection` manages its own horizontal padding (`px-4 md:px-[144px]`). It must be placed **outside** the `px-[144px]` content wrapper to avoid double-padding.

```typescript
export const metadata: Metadata = {
  title: 'Hệ thống giải thưởng — Sun* Annual Awards 2025',
}

export default async function AwardsInformationPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="bg-bg-dark min-h-screen">
      <HomepageHeader avatarUrl={user?.user_metadata?.avatar_url} activePath="awards-information" />
      <KeyvisualBanner />

      {/* Main content: padded wrapper for title + sidebar + awards */}
      <div className="px-4 md:px-[144px] py-[96px] flex flex-col gap-[80px]">
        <AwardTitleSection />
        <div className="flex flex-row gap-[80px]">
          <AwardSidebar />   {/* "use client" */}
          <div className="flex flex-col gap-[80px]">
            {awardsData.map((award, i) => (
              <AwardEntry
                key={award.id}
                award={award}
                imagePosition={i % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SunkudosSection: handles its own px padding — must be outside padded wrapper */}
      <div className="pb-[96px]">
        <SunkudosSection />
      </div>

      <Footer />
    </main>
  )
}
```

---

### Phase 2: US2 — Sidebar Scroll Navigation (P2, Interactive)

Implement `AwardSidebar` with Intersection Observer.

**2.1 — `award-sidebar.tsx`** (`"use client"`)
```typescript
'use client'
export function AwardSidebar() {
  const [activeSlug, setActiveSlug] = useState('top-talent')

  useEffect(() => {
    const sections = awardsData.map(a => document.getElementById(a.slug))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSlug(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  function scrollTo(slug: string) {
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav role="navigation" aria-label="Award categories" className="w-[178px] sticky top-[96px] self-start flex flex-col gap-[16px]">
      {awardsData.map(award => (
        <button
          key={award.slug}
          onClick={() => scrollTo(award.slug)}
          aria-current={activeSlug === award.slug ? 'true' : undefined}
          className={[
            'text-left font-montserrat font-bold transition-colors duration-150',
            'focus-visible:outline-2 focus-visible:outline-accent-gold focus-visible:outline-offset-2',
            activeSlug === award.slug
              ? 'text-[#FFEA9E] text-[16px] leading-[24px] tracking-[0.15px] underline'
              : 'text-white text-[14px] leading-[20px] tracking-[0.25px] hover:text-[rgba(255,234,158,0.7)]',
          ].join(' ')}
        >
          {award.name}
        </button>
      ))}
    </nav>
  )
}
```

**Active state styles**: gold (#FFEA9E), 16px, underline + left indicator
**Normal state styles**: white, 14px
**Hover**: `rgba(255,234,158,0.7)`, `transition-colors duration-150`
**Focus**: `outline-2 outline-accent-gold outline-offset-2`

---

### Phase 3: US3 — Sun* Kudos CTA (P3, Reuse)

- `SunkudosSection` already exists and is complete
- **No new code needed** — import and place at bottom of awards content area
- Verify "Chi tiết" button navigates to `/sun-kudos`

---

### Phase 4: Polish, Responsive & Cleanup

**4.1 — Mobile responsiveness** (`< 768px`)
- Hide sidebar: `hidden md:flex` on `<AwardSidebar />`
- Award rows: `flex-col md:flex-row` in `<AwardEntry />`
- Award images: `w-full max-w-[280px] md:w-[336px] md:h-[336px] flex-shrink-0`
- Award content: `w-full md:w-[480px]`
- Page heading: `text-[32px] md:text-[57px]` in `AwardTitleSection`
- Page padding: already set `px-4 md:px-[144px]` in page.tsx wrapper

**4.2 — Tablet responsiveness** (`768px–1023px`)
- Keep `flex-row` for awards layout (sidebar + content)
- Sidebar: stays visible at `w-[178px]`
- Content area: narrows to fill remaining space (`flex-1 min-w-0`)
- Award rows: keep `flex-row` but content block width adapts with `flex-1`
- Tailwind: use `md:flex-row`, `md:w-[178px]`, `lg:w-[856px]` where appropriate

**4.3 — `HomepageHeader` active state** (`src/app/_components/homepage/header.tsx`)

Current issue: header has no `activePath` awareness — "Awards Information" link always shows as inactive.

Changes to `HomepageHeader`:
1. Add prop: `activePath?: 'awards-information' | 'sun-kudos'`
2. "About SAA 2025": render `<NavScrollLink>` when `!activePath` (homepage only); render `<Link href="/">` otherwise
3. Apply active styles to matching nav link:
   ```typescript
   // active nav link class (gold + bottom border + glow matching NavScrollLink)
   const activeClass = 'px-4 py-4 rounded-sm font-montserrat font-bold text-[14px] leading-[20px] tracking-[0.1px] text-[#FFEA9E] border-b-2 border-[#FFEA9E]'
   const normalClass = 'px-4 py-4 rounded-sm font-montserrat font-bold text-[14px] leading-[20px] tracking-[0.1px] text-white hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E]'
   ```
4. Pass `activePath="awards-information"` from `awards-information/page.tsx`

**4.4 — Metadata for page** (already in Phase 1.6 `page.tsx` — confirmed here)
```typescript
export const metadata: Metadata = {
  title: 'Hệ thống giải thưởng — Sun* Annual Awards 2025',
}
```

**4.5 — Remove debug `console.log`** in `middleware.ts` (line 15) — logs user session data on every request.

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Intersection Observer fires incorrectly for sidebar | Medium | Low | Use `threshold: 0.4` + `rootMargin: '-80px 0px 0px 0px'` to offset sticky header height |
| `HomepageHeader` active state — header is shared, must not break homepage/dashboard | Low | Low | Phase 4.3: `activePath` prop is optional, defaults to undefined → existing homepage behavior unchanged |
| `SunkudosSection` uses hardcoded padding inconsistent with awards page layout | Low | Low | Wrap in `<div className="w-full">` to override if needed |
| Award images use `flex-shrink-0` but are not `next/image` `fill` — may need explicit width on mobile | Low | Medium | Set `className="flex-shrink-0 w-[336px] md:w-[336px] max-w-full"` |
| `--color-divider: #2E3940` reuse as metadata-bg may be semantically confusing | Low | Low | Add explicit comment in CSS; or add `--color-metadata-bg` alias |

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: `AwardSidebar` scroll spy ↔ `AwardEntry` section visibility
- [x] **Auth flow**: unauthenticated user → redirect to `/login`
- [x] **Deep links**: `/awards-information#top-project` scrolls to correct section on load
- [x] **Navigation**: "Chi tiết" CTA → `/sun-kudos`

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Sidebar active state updates on scroll; click scrolls to section |
| App ↔ Auth | Yes | Unauthenticated → redirect; authenticated → page renders |
| Component render | Yes | All 6 awards render; Signature shows dual prize + "Hoặc" divider |
| Responsive | Yes | Mobile: sidebar hidden, award rows stacked |

### Mocking Strategy

| Dependency | Strategy | Rationale |
|-----------|----------|-----------|
| Supabase session (unit tests) | Mock | Isolate component logic from auth |
| Supabase session (integration) | Real Supabase test instance | Match production auth flow |
| IntersectionObserver (unit) | Mock (vitest `vi.fn()`) | jsdom doesn't support IO natively |
| `next/navigation` | Mock via `next-router-mock` | Needed for link assertions |

### Test Scenarios

1. **Happy Path**
   - [x] Page renders all 6 award entries with correct name, image, quantity, prize value
   - [x] Signature 2025 shows "5.000.000 VNĐ", "Hoặc", "8.000.000 VNĐ"
   - [x] Sidebar has 6 items; first item active on load
   - [x] Click sidebar item → smooth scroll to section, active state updates

2. **Error Handling**
   - [x] Award image fails to load → placeholder renders at 336×336px
   - [x] Unauthenticated user visiting `/awards-information` → redirect to `/login`

3. **Edge Cases**
   - [x] Mobile viewport → sidebar hidden, award rows stacked vertically
   - [x] Deep link `/awards-information#mvp` → page loads with MVP section in view

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Component rendering | 90%+ | High |
| Scroll spy logic | 80%+ | High |
| Auth redirect | 100% | High |
| Responsive layout | Visual (E2E) | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed
- [x] `spec.md` approved (review complete 2026-03-25)
- [x] `design-style.md` approved (review complete 2026-03-25)
- [x] Award images exist in `public/images/homepage/` — confirmed
- [x] `SunkudosSection` implemented — confirmed reusable
- [x] Middleware auto-protects `/awards-information` — confirmed
- [ ] `AwardDetail` type — to be created in Phase 0.1
- [ ] `awardsData` extended with `quantity`, `unit`, `prizeValue` — Phase 0.2

### External Dependencies

None — all assets, images, and auth infrastructure already exist.

---

## Notes

- **`console.log` in middleware.ts** (line 15) should be removed as a separate cleanup task — it logs user session data on every request.
- **`HomepageHeader` nav active state**: Handled in Phase 4.3 — adding `activePath` prop + conditional `NavScrollLink`/`Link` rendering for "About SAA 2025".
- **Image position rule**: `index % 2 === 0 ? 'left' : 'right'` — matches Figma extraction (D.1/3/5 = LEFT, D.2/4/6 = RIGHT).
- **keyvisual banner**: The spec says it shows "ROOT FURTHER" artwork + "Sun* Annual Award 2025". This may be a separate cropped version of the homepage keyvisual or a frame from Figma node `313:8437`. Verify with `/mcp__momorph__get_design_item_image` if the same image can be reused.
- **Sidebar sticky offset**: `top-[96px]` (= `--spacing-hero-py`) accounts for the 80px header height + 16px buffer so the sidebar never hides under the header.

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Begin with Phase 0** (types + data) since all UI depends on it
3. **Follow TDD**: write test → implement → green → next task

---
