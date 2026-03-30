# Design Style: Hệ thống giải thưởng (Award Information)

**Frame ID**: `313:8436`
**Frame Name**: `Hệ thống giải thưởng`
**Figma File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Extracted At**: 2026-03-25

---

## Design Tokens

### Colors

| Token Name | Hex Value | Usage |
|------------|-----------|-------|
| `--color-bg-page` | `#00101A` | Page background |
| `--color-header-bg` | `rgba(16,20,23,0.8)` | Header background |
| `--color-accent-gold` | `#FFEA9E` | Active nav items, section titles, metadata labels |
| `--color-text-white` | `#FFFFFF` | Body text, award descriptions, counts, prize values |
| `--color-metadata-bg` | `#2E3940` | Background of quantity/value metadata boxes |
| `--color-divider` | `#2E3940` | Horizontal dividers / "Hoặc" separator in Signature award |
| `--color-cover-gradient` | `linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0) 52.79%)` | Keyvisual bottom fade overlay |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| `--text-page-subtitle` | Montserrat | 24px | 700 | 32px | 0px | "Sun* Annual Awards 2025" label |
| `--text-page-title` | Montserrat | 57px | 700 | 64px | -0.25px | "Hệ thống giải thưởng SAA 2025" heading |
| `--text-nav-item` | Montserrat | 16px | 700 | 24px | 0.15px | Sidebar navigation items (active) |
| `--text-nav-item-sm` | Montserrat | 14px | 700 | 20px | 0.25px | Sidebar navigation items (normal state) |
| `--text-award-title` | Montserrat | 24px | 700 | 32px | — | Award name headings |
| `--text-award-body` | Montserrat | 16px | 700 | 24px | 0.5px | Award description paragraphs (justified) |
| `--text-metadata-value` | Montserrat | 36px | 700 | 44px | 0px | Quantity number + Prize amount |
| `--text-metadata-unit` | Montserrat | 14px | 700 | 20px | 0.1px | Unit label (Cá nhân, Tập thể, Đơn vị) |
| `--text-metadata-label` | Montserrat | 16px | 700 | 24px | 0.15px | "Số lượng giải thưởng:", "Giá trị giải thưởng:" |
| `--text-footer-copy` | Montserrat Alternates | 16px | 700 | 24px | 0% | Footer copyright |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| `--spacing-page-px` | 144px | Horizontal page padding (desktop) |
| `--spacing-page-py` | 96px | Vertical page padding |
| `--spacing-section-gap` | 80px | Gap between B section (sidebar + content area) |
| `--spacing-award-gap` | 80px | Gap between award entries in D section |
| `--spacing-content-gap` | 32px | Gap inside each award content block |
| `--spacing-title-gap` | 16px | Gap inside A_Title section |
| `--spacing-metadata-gap` | 24px | Gap between metadata boxes |
| `--spacing-nav-gap` | 16px | Gap between sidebar nav items |
| `--spacing-header-px` | 144px | Header horizontal padding |
| `--spacing-header-py` | 12px | Header vertical padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| `--radius-metadata` | 16px | Award metadata boxes (quantity/value boxes) |
| `--radius-nav-active` | 4px | Active nav item indicator |
| `--radius-award-image` | 100px | Award image container (circular look) — Note: image itself has glow built-in |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| *(none extracted)* | — | No CSS shadows; award glow effects are baked into images |

---

## Layout Specifications

### Page Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Desktop baseline |
| height | 6410px | Full page scroll |
| background | #00101A | Dark navy |

### Grid/Flex Layout

| Layer | Display | Direction | Dimensions | Notes |
|-------|---------|-----------|------------|-------|
| Page wrapper | flex | column | 1440px | Full page scroll container |
| Header | flex | row | 1440×80px | `justify-content: space-between`, `position: absolute` |
| A_Title | flex | column | 1152×129px | `gap: 16px` |
| B_Main | flex | row | 1152×4833px | `gap: 80px` — sidebar left + content right |
| C_Menu (sidebar) | flex | column | 178×448px | `gap: 16px`, sticky |
| D content area | flex | column | 856px | `gap: 80px` between award entries |
| Each award (D.x) | flex | column | 856×631–1047px | `gap: 80px` — image row + metadata row |
| Award image | fixed | — | 336×336px | Square with circular effect baked-in |
| Award content | flex | column | 480px | `gap: 24px`, `border-radius: 16px` |
| Sun* Kudos | flex | row | 1120×500px | `justify-content: space-between` |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────── 1440px ───────────────────────────────────────────────┐
│  Header  (h: 80px, pos: absolute, bg: rgba(16,20,23,0.8), px: 144px, py: 12px)                        │
│                                                                                                        │
│  3_Keyvisual  (hero banner with ROOT FURTHER artwork + title overlay)                                  │
│                                                                                                        │
│  Content wrapper  (px: 144px, py: 96px)                                                               │
│  ┌──────────────────────────────────────────── 1152px ───────────────────────────────────────────────┐ │
│  │                                                                                                   │ │
│  │  A_Title (1152×129px, flex-col, gap: 16px)                                                       │ │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐ │ │
│  │  │  "Sun* annual awards 2025"  (Montserrat 24/700 white, center)                               │ │ │
│  │  │  "Hệ thống giải thưởng SAA 2025"  (Montserrat 57/700 #FFEA9E, 931px wide)                   │ │ │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                                                   │ │
│  │  B_Main (1152px, flex-row, gap: 80px)                                                            │ │
│  │  ┌──── C_Menu (178px) ────┐  ┌────────────── D_Content area (856px) ──────────────────────────┐ │ │
│  │  │  [● Top Talent       ] │  │  D.1 Top Talent  (856×631px, flex-col, gap:80px)               │ │ │
│  │  │  [  Top Project      ] │  │  ┌──────────────────────────────────────────────────────────┐ │ │ │
│  │  │  [  Top Proj. Leader ] │  │  │  [Image 336×336]  [Content 480px flex-col gap:32px]      │ │ │ │
│  │  │  [  Best Manager     ] │  │  │    Title: "Top Talent" (Montserrat 24/700 #FFEA9E)        │ │ │ │
│  │  │  [  Signature 2025   ] │  │  │    Description (Montserrat 16/700 white justified)        │ │ │ │
│  │  │  [  MVP              ] │  │  │    [Metadata box bg:#2E3940 r:16px]                       │ │ │ │
│  │  └───────────────────────┘  │  │      Qty: "10" + "Cá nhân" + "Số lượng giải thưởng:"       │ │ │ │
│  │                              │  │      Value: "7.000.000 VNĐ" + "cho mỗi giải thưởng"        │ │ │ │
│  │                              │  └──────────────────────────────────────────────────────────┘ │ │ │
│  │                              │  ── (gap: 80px) ──                                             │ │ │
│  │                              │  D.2 Top Project  (similar structure, qty: 02, val: 15M)       │ │ │
│  │                              │  D.3 Top Project Leader  (qty: 03, val: 7M)                   │ │ │
│  │                              │  D.4 Best Manager  (qty: 01, val: 10M)                        │ │ │
│  │                              │  D.5 Signature 2025 - Creator  (qty: 01, dual value)          │ │ │
│  │                              │  D.6 MVP  (qty: 01, val: 15M)                                 │ │ │
│  │                              └───────────────────────────────────────────────────────────────┘ │ │
│  │                                                                                                   │ │
│  │  D1_SunKudos  (1120×500px, flex-row, space-between, bg-image + rounded)                          │ │
│  │  ┌──────────────────────────── 1120px ──────────────────────────────────────────────────────────┐ │ │
│  │  │  [Left: text + CTA]  [Right: KUDOS logo SVG]                                                 │ │ │
│  │  └──────────────────────────────────────────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                        │
│  Footer  (px: 90px, py: 40px, border-top: 1px #2E3940)                                               │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A_Title Section — Node `313:8453`

| Property | Value | Tailwind |
|----------|-------|----------|
| Node ID | `313:8453` | — |
| width | 1152px | `max-w-[1152px]` |
| height | 129px | `h-auto` |
| display | flex | `flex flex-col` |
| gap | 16px | `gap-[16px]` |
| padding | 0 | — |

**Child: "Sun* annual awards 2025"**
- Font: Montserrat 24px/700, `color: #FFFFFF`, `text-align: center`
- Tailwind: `font-montserrat font-bold text-[24px] leading-[32px] text-white text-center`

**Child: "Hệ thống giải thưởng SAA 2025"**
- Font: Montserrat 57px/700, `color: #FFEA9E`, `text-align: left`
- Width: 931px
- Tailwind: `font-montserrat font-bold text-[57px] leading-[64px] tracking-[-0.25px] text-[#FFEA9E]`

---

### C_Menu Sidebar — Node `313:8459`

| Property | Value | Tailwind |
|----------|-------|----------|
| Node ID | `313:8459` | — |
| width | 178px | `w-[178px]` |
| height | 448px | `h-auto` |
| display | flex column | `flex flex-col` |
| gap | 16px | `gap-[16px]` |
| position | sticky | `sticky top-[96px]` |

**Nav Item — Normal State:**
- Font: Montserrat 14px/700 white, `ls: 0.25px`
- Has small bullet/icon indicator on left
- Tailwind: `font-montserrat font-bold text-[14px] leading-[20px] tracking-[0.25px] text-white cursor-pointer`

**Nav Item — Active State:**
- Color: `#FFEA9E`
- Font: Montserrat 16px/700, `ls: 0.15px`
- Left indicator: colored dot/bar `bg-[#FFEA9E] rounded`
- Tailwind: `text-[#FFEA9E] text-[16px] leading-[24px] tracking-[0.15px] underline`

**Nav Item — Hover State:**
- Color: `rgba(255,234,158,0.7)` (gold at 70%)
- Transition: `150ms ease-in-out`

---

### Award Entry (D.x) — Layout Pattern

Each of the 6 award entries follows the same structure:

| Property | Value | Tailwind |
|----------|-------|----------|
| width | 856px | `w-full max-w-[856px]` |
| display | flex column | `flex flex-col` |
| gap | 80px | `gap-[80px]` |
| padding | 0 | — |

**Award Row (Image + Content):**
- Layout: `flex flex-row`, `gap: 40px`
- Image position **alternates** per entry (extracted from Figma children order):

| Entry | Award Name | Image Position | Flex Children Order |
|-------|-----------|----------------|---------------------|
| D.1 | Top Talent | **LEFT** | `[Picture-Award, Content]` |
| D.2 | Top Project | **RIGHT** | `[Content, Picture-Award]` |
| D.3 | Top Project Leader | **LEFT** | `[Picture-Award, Content]` |
| D.4 | Best Manager | **RIGHT** | `[Content, Picture-Award]` |
| D.5 | Signature 2025 - Creator | **LEFT** | `[Picture-Award, Content]` |
| D.6 | MVP | **RIGHT** | `[Content, Picture-Award]` |

Implementation: pass `imagePosition: 'left' | 'right'` prop to `<AwardEntry />` or use index parity (`index % 2 === 0 ? 'left' : 'right'`).

**Award Image — `D.1.1_Picture-Award` — Node `I313:8467;214:2525`:**
| Property | Value | Tailwind |
|----------|-------|----------|
| width | 336px | `w-[336px]` |
| height | 336px | `h-[336px]` |
| shape | Circular glow baked in | `flex-shrink-0` |

**Award Content Block — `D.1.2_Content` — Node `I313:8467;214:2526`:**
| Property | Value | Tailwind |
|----------|-------|----------|
| width | 480px | `w-[480px]` |
| border-radius | 16px | `rounded-[16px]` |
| display | flex column | `flex flex-col` |
| gap | 32px | `gap-[32px]` |

Content block children:
1. **Award title**: `font-montserrat font-bold text-[24px] leading-[32px] text-[#FFEA9E]`
2. **Description paragraph**: `font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.5px] text-white text-justify`
3. **Metadata boxes**: `bg-[#2E3940] rounded-[16px]`

---

### Metadata Box (Quantity & Value)

Used inside award content to show "Số lượng giải thưởng" and "Giá trị giải thưởng":

| Property | Value | Tailwind |
|----------|-------|----------|
| background | `#2E3940` | `bg-[#2E3940]` |
| border-radius | 16px | `rounded-[16px]` |
| padding | 16px | `p-[16px]` |
| display | flex row | `flex flex-row items-center gap-[8px]` |

**Metadata Label** ("Số lượng giải thưởng:", "Giá trị giải thưởng:"):
- Font: Montserrat 16px/700, `color: #FFEA9E`, `ls: 0.15px`
- Tailwind: `font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.15px] text-[#FFEA9E]`

**Metadata Value** (number + unit):
- Number: Montserrat 36px/700 white → `font-montserrat font-bold text-[36px] leading-[44px] text-white`
- Unit: Montserrat 14px/700 white → `font-montserrat font-bold text-[14px] leading-[20px] tracking-[0.1px] text-white`

---

### Signature 2025 Special Layout (D.5)

Has TWO prize value rows separated by "Hoặc" divider:

```
Giá trị giải thưởng:  5.000.000 VNĐ  (cho giải cá nhân)
──── Hoặc ────  (bg: #2E3940, text: white, centered)
                8.000.000 VNĐ  (cho giải tập thể)
```

---

### Sidebar Nav Item — Node `313:8460` pattern

| State | Property | Value |
|-------|----------|-------|
| Normal | color | `#FFFFFF` |
| Normal | font-size | 14px |
| Normal | font-weight | 700 |
| Active | color | `#FFEA9E` |
| Active | font-size | 16px |
| Active | text-decoration | underline |
| Active | indicator | left dot `bg-[#FFEA9E]` |
| Hover | color | `rgba(255,234,158,0.7)` |
| Hover | transition | 150ms ease-in-out |
| Focus | outline | `2px solid #FFEA9E` |
| Focus | outline-offset | `2px` |

---

## Component Hierarchy with Styles

```
AwardInformation Page (1440×6410px, bg: #00101A)
├── Header (pos: absolute, h: 80px, bg: rgba(16,20,23,0.8), px: 144px)  ← shared component
│
├── 3_Keyvisual (hero banner, pos: relative)
│   ├── Background artwork image (cover)
│   └── Cover overlay (gradient: linear-gradient(0deg, #00101A -4.23%, transparent 52.79%))
│
├── Content Wrapper (px: 144px, py: 96px, flex-col, gap: 80px)
│   │
│   ├── A_Title (1152×129px, flex-col, gap: 16px)
│   │   ├── subtitle: "Sun* annual awards 2025"  (Montserrat 24/700 white)
│   │   └── title: "Hệ thống giải thưởng SAA 2025"  (Montserrat 57/700 #FFEA9E)
│   │
│   ├── B_Main (1152px, flex-row, gap: 80px)
│   │   ├── C_Menu Sidebar (178px, flex-col, gap: 16px, sticky)
│   │   │   ├── C.1 Top Talent  (active: #FFEA9E 16px, normal: white 14px)
│   │   │   ├── C.2 Top Project
│   │   │   ├── C.3 Top Project Leader
│   │   │   ├── C.4 Best Manager
│   │   │   ├── C.5 Signature 2025 - Creator
│   │   │   └── C.6 MVP
│   │   │
│   │   └── D_Awards Content (856px, flex-col, gap: 80px)
│   │       ├── D.1 Top Talent (856×631px)
│   │       │   ├── [Image 336×336]
│   │       │   └── Content (480px, flex-col, gap: 32px, r: 16px)
│   │       │       ├── title: "Top Talent"  (Montserrat 24/700 #FFEA9E)
│   │       │       ├── description  (Montserrat 16/700 white justified ls:0.5px)
│   │       │       ├── qty-box (bg: #2E3940 r:16px): "Số lượng: 10 Đơn vị"
│   │       │       └── val-box (bg: #2E3940 r:16px): "Giá trị: 7.000.000 VNĐ"
│   │       ├── D.2 Top Project  (qty: 02 Tập thể, val: 15.000.000)
│   │       ├── D.3 Top Project Leader  (qty: 03 Cá nhân, val: 7.000.000)
│   │       ├── D.4 Best Manager  (qty: 01 Cá nhân, val: 10.000.000)
│   │       ├── D.5 Signature 2025 - Creator  (qty: 01, val: 5M cá nhân / 8M tập thể)
│   │       └── D.6 MVP  (qty: 01 Cá nhân, val: 15.000.000)
│   │
│   └── D1_SunKudos (1120×500px, flex-row, bg-image, rounded)  ← shared component
│
└── Footer (px: 90px, py: 40px, border-top: #2E3940)  ← shared component
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width | Tailwind |
|------|-----------|-----------|---------|
| Mobile | 0 | 767px | (default) |
| Tablet | 768px | 1023px | `md:` |
| Desktop | 1024px | ∞ | `lg:` |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Content Wrapper | `px: 16px`, `py: 40px` |
| A_Title heading | `font-size: 32px` |
| B_Main layout | `flex-col` (sidebar stacks above content) |
| C_Menu Sidebar | `position: static`, horizontal scroll or hidden |
| Award Row (image + content) | `flex-col`, image above content |
| Award Image | `width: 100%`, `max-width: 280px` |
| Award Content | `width: 100%` |

#### Tablet (768px–1023px)

| Component | Changes |
|-----------|---------|
| Content Wrapper | `px: 40px` |
| B_Main | Keep `flex-row` but sidebar width reduced |
| Award Row | Keep `flex-row` but content area narrower |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| Content Wrapper | `px: 144px`, `py: 96px` |
| B_Main | `flex-row`, sidebar 178px, content 856px, gap 80px |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|-----------------|-----------------|
| Page wrapper | `313:8436` | `bg-[#00101A] min-h-screen` | `<main>` |
| A_Title section | `313:8453` | `flex flex-col gap-[16px] max-w-[1152px]` | `<AwardTitle />` |
| Section heading | — | `font-montserrat font-bold text-[57px] leading-[64px] tracking-[-0.25px] text-[#FFEA9E]` | `<h1>` |
| Sidebar | `313:8459` | `flex flex-col gap-[16px] w-[178px] sticky top-[96px]` | `<AwardSidebar />` |
| Sidebar nav item (normal) | `313:8460` | `font-montserrat font-bold text-[14px] leading-[20px] tracking-[0.25px] text-white cursor-pointer` | `<SidebarNavItem />` |
| Sidebar nav item (active) | — | `text-[#FFEA9E] text-[16px] leading-[24px] tracking-[0.15px] underline` | `<SidebarNavItem active />` |
| Award section wrapper | `313:8467`–`313:8510` | `flex flex-col gap-[80px]` | `<AwardEntry />` |
| Award row (image + content) | — | `flex flex-row gap-[40px]` (order per `imagePosition` prop) | `<AwardEntry />` |
| Award image | `I313:8467;214:2525` | `w-[336px] h-[336px] flex-shrink-0` | `<Image />` |
| Award content | `I313:8467;214:2526` | `flex flex-col gap-[32px] rounded-[16px] w-[480px]` | `<AwardContent />` |
| Award title | — | `font-montserrat font-bold text-[24px] leading-[32px] text-[#FFEA9E]` | `<h2>` |
| Award description | — | `font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.5px] text-white text-justify` | `<p>` |
| Metadata box | — | `bg-[#2E3940] rounded-[16px] p-[16px] flex items-center gap-[8px]` | `<AwardMetadataBox />` |
| Metadata label | — | `font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.15px] text-[#FFEA9E]` | `<span>` |
| Metadata count | — | `font-montserrat font-bold text-[36px] leading-[44px] text-white` | `<span>` |
| Metadata unit | — | `font-montserrat font-bold text-[14px] leading-[20px] tracking-[0.1px] text-white` | `<span>` |
| Sun* Kudos section | `335:12023` | (see Homepage design-style.md for full spec) | `<SunkudosSection />` |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Sidebar nav item | color, font-size | 150ms | ease-in-out | Active state change (scroll spy) |
| Sidebar nav item | color | 150ms | ease-in-out | Hover |
| Page scroll | scroll-behavior | smooth | — | Click sidebar nav item |

---

## Constitution Compliance Notes

> Per **Constitution §II (TailwindCSS)**: Design tokens MUST be defined in the Tailwind config, not as inline arbitrary values. The Tailwind classes listed in this document use arbitrary values for reference/documentation purposes. Before implementation, add these tokens to `tailwind.config.ts`:
>
> ```ts
> // tailwind.config.ts — suggested additions
> theme: {
>   extend: {
>     colors: {
>       'award-gold': '#FFEA9E',
>       'metadata-bg': '#2E3940',
>       'page-bg': '#00101A',
>     },
>     fontSize: {
>       'award-title': ['24px', { lineHeight: '32px', fontWeight: '700' }],
>       'award-meta-value': ['36px', { lineHeight: '44px', fontWeight: '700' }],
>       'page-title': ['57px', { lineHeight: '64px', fontWeight: '700', letterSpacing: '-0.25px' }],
>     },
>   }
> }
> ```

---

## Notes

- The award images already exist at `public/images/homepage/award-*.png` (336×336px with glow effect baked in — no CSS border needed)
- The keyvisual banner at the top of this page reuses the same ROOT FURTHER artwork as the homepage hero (different cropping/presentation)
- Sidebar uses Intersection Observer for scroll spy — no scroll event listener
- All `font-montserrat` classes rely on the global Montserrat font configured in `globals.css`
- Signature 2025 award (D.5) is the only one with dual prize values; the "Hoặc" divider should be styled as `bg-[#2E3940]` with white text `Hoặc`, centered
