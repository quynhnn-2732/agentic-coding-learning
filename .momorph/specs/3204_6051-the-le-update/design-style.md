# Design Style: Thể lệ (Rules Panel)

**Frame ID**: `3204:6051`
**Frame Name**: `Thể lệ UPDATE`
**Figma Link**: https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/3204:6051
**Extracted At**: 2026-03-30

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-panel-bg | #00070C | 100% | Panel background (darker than page) |
| --color-page-bg | #00101A | 100% | Page/frame background |
| --color-gold | #FFEA9E | 100% | Title text, section headings, primary button bg |
| --color-white | #FFFFFF | 100% | Body text, descriptions |
| --color-badge-border | #FFEA9E | 100% | Hero badge pill border |
| --color-icon-border | #FFFFFF | 100% | Collectible icon circle border |
| --color-btn-secondary-bg | rgba(255, 234, 158, 0.10) | 10% | "Đóng" button background |
| --color-btn-secondary-border | #998C5F | 100% | "Đóng" button border |
| --color-btn-primary-bg | #FFEA9E | 100% | "Viết KUDOS" button background |
| --color-btn-primary-text | #00101A | 100% | "Viết KUDOS" button text |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-panel-title | Montserrat | 45px | 700 | 52px | 0px |
| --text-section-heading | Montserrat | 22px | 700 | 28px | 0px |
| --text-sub-heading | Montserrat | 24px | 700 | 32px | 0px |
| --text-body | Montserrat | 16px | 700 | 24px | 0.5px |
| --text-body-sm | Montserrat | 14px | 700 | 20px | 0.1px |
| --text-badge-name | Montserrat | 13px | 700 | 19px | 0.094px |
| --text-icon-label | Montserrat | 12px | 700 | 16px | 0.5px |
| --text-icon-label-sm | Montserrat | 11px | 700 | 16px | 0.5px |
| --text-button | Montserrat | 16px | 700 | 24px | 0.5px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-panel-top | 24px | Panel top padding |
| --spacing-panel-sides | 40px | Panel left/right padding |
| --spacing-panel-bottom | 40px | Panel bottom padding |
| --spacing-section-gap | 24px | Gap between content sections |
| --spacing-content-gap | 16px | Gap within sections |
| --spacing-badge-grid-gap | 16px | Gap between icon badges |
| --spacing-footer-gap | 16px | Gap between footer buttons |
| --spacing-inner-gap | 40px | Gap between content and footer |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-btn | 4px | Action buttons |
| --radius-badge-pill | 55.579px | Hero badge name pills |
| --radius-icon-circle | 100px | Collectible icon circles |
| --border-badge-pill | 0.579px solid #FFEA9E | Hero badge pill border |
| --border-icon-circle | 2px solid #FFFFFF | Collectible icon border |
| --border-btn-secondary | 1px solid #998C5F | "Đóng" button border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-badge-text | 0 0.447px 1.787px #000 | Hero badge text shadow |
| --shadow-legend-glow | 0 0 1.505px #FFF | Legend Hero text glow |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 553px | Panel total width |
| height | 1410px | Panel content height (scrollable) |
| padding | 24px 40px 40px 40px | Top, right, bottom, left |
| position | fixed | Right-anchored |
| right | 0 | Flush with right edge |
| top | 0 | Full height |
| background | #00070C | Dark panel bg |
| display | flex | Vertical layout |
| flex-direction | column | Content flows down |
| justify-content | space-between | Content top, buttons bottom |

### Layout Structure (ASCII)

```
┌────────────────────────────────────────────────────────────────────┐
│  Page (1440x1796, bg: #00101A)                                     │
│                                                                    │
│                         ┌──────────────────────────────────────┐   │
│                         │  Panel (553px, bg: #00070C)          │   │
│                         │  padding: 24px 40px 40px 40px        │   │
│                         │                                      │   │
│                         │  ┌──────────────────────────────┐    │   │
│                         │  │ Title: "Thể lệ"              │    │   │
│                         │  │ Montserrat 700, 45px, gold    │    │   │
│                         │  └──────────────────────────────┘    │   │
│                         │                                      │   │
│                         │  ┌──────────────────────────────┐    │   │
│                         │  │ Section: Người nhận Kudos     │    │   │
│                         │  │ ┌────────┐                    │    │   │
│                         │  │ │New Hero│ 1-4 người gửi      │    │   │
│                         │  │ └────────┘                    │    │   │
│                         │  │ ┌──────────┐                  │    │   │
│                         │  │ │Rising Hero│ 5-9 người gửi   │    │   │
│                         │  │ └──────────┘                  │    │   │
│                         │  │ ┌───────────┐                 │    │   │
│                         │  │ │Super Hero │ 10-20 người gửi │    │   │
│                         │  │ └───────────┘                 │    │   │
│                         │  │ ┌────────────┐                │    │   │
│                         │  │ │Legend Hero │ 20+ người gửi  │    │   │
│                         │  │ └────────────┘                │    │   │
│                         │  └──────────────────────────────┘    │   │
│                         │                                      │   │
│                         │  ┌──────────────────────────────┐    │   │
│                         │  │ Section: Người gửi Kudos      │    │   │
│                         │  │ Description + Secret Box      │    │   │
│                         │  │ ┌──────┐ ┌──────┐ ┌──────┐   │    │   │
│                         │  │ │REVIVL│ │TOUCH│ │STAY │    │    │   │
│                         │  │ │      │ │LIGHT│ │GOLD │    │    │   │
│                         │  │ └──────┘ └──────┘ └──────┘   │    │   │
│                         │  │ ┌──────┐ ┌──────┐ ┌──────┐   │    │   │
│                         │  │ │FLOW │ │BEYND│ │ROOT │    │    │   │
│                         │  │ │HORZN│ │BNDY │ │FRTHR│    │    │   │
│                         │  │ └──────┘ └──────┘ └──────┘   │    │   │
│                         │  └──────────────────────────────┘    │   │
│                         │                                      │   │
│                         │  ┌──────────────────────────────┐    │   │
│                         │  │ Section: Kudos Quốc Dân       │    │   │
│                         │  │ Description                   │    │   │
│                         │  └──────────────────────────────┘    │   │
│                         │                                      │   │
│                         │  ┌──────────────────────────────┐    │   │
│                         │  │ Footer: [Đóng] [Viết KUDOS]  │    │   │
│                         │  └──────────────────────────────┘    │   │
│                         └──────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Panel Container - `3204:6052`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:6052 | - |
| width | 553px | `width: 553px` |
| height | 1410px | `height: 100vh` (scrollable) |
| padding | 24px 40px 40px 40px | `padding: 24px 40px 40px 40px` |
| background | #00070C | `background-color: #00070C` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| align-items | flex-end (Figma) → stretch (impl, content fills width) | `align-items: stretch` |
| justify-content | space-between | `justify-content: space-between` |
| gap | 40px | `gap: 40px` |
| overflow-y | auto | `overflow-y: auto` |

---

### Title "Thể lệ" - `3204:6055`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:6055 | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 45px | `font-size: 45px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 52px | `line-height: 52px` |
| color | #FFEA9E | `color: #FFEA9E` |
| text-align | left | `text-align: left` |

---

### Section Heading (e.g., "NGƯỜI NHẬN KUDOS...") - `3204:6132`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:6132 | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #FFEA9E | `color: #FFEA9E` |

---

### Body Text (white) - `3204:6133`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:6133 | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | justified | `text-align: justify` |

---

### Small Body Text - `3204:6168`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:6168 | - |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 20px | `line-height: 20px` |
| letter-spacing | 0.1px | `letter-spacing: 0.1px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | justified | `text-align: justify` |

---

### Hero Badge Pill (e.g., "New Hero") - `3204:6163`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:6163 (New Hero), 3204:6172 (Rising Hero), 3204:6181 (Super Hero), 3204:6190 (Legend Hero) | - |
| width | 126.211px | `width: 126px` |
| height | 22px | `height: 22px` |
| border | 0.579px solid #FFEA9E | `border: 1px solid #FFEA9E` |
| border-radius | 55.579px | `border-radius: 56px` |
| background | gradient overlay on image | Complex background (see Figma) |
| Component Set | 3007:17505 | MM_MEDIA badge component |

**Badge tier label:**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 13px | `font-size: 13px` |
| font-weight | 700 | `font-weight: 700` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-shadow | 0 0.447px 1.787px #000 | `text-shadow: 0 0.5px 1.8px #000` |

**Badge variants:**
| Badge | Component ID | Special Styles |
|-------|-------------|---------------|
| New Hero | 3007:17506 | Standard gradient bg |
| Rising Hero | 3007:17509 | Standard gradient bg + text-shadow |
| Super Hero | 3007:17512 | Standard gradient bg + text-shadow |
| Legend Hero | 3007:17516 | Glow effect: text-shadow 0 0 1.505px #FFF, screen blend bg |

---

### Badge Tier Content Row - `3204:6161` (example)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:6161 | - |
| width | 400px | `width: 100%` |
| height | 72px | `height: auto` |
| layout | Inline: badge pill + threshold text on first line, description below | Flex or inline layout |

**Threshold text** (e.g., "Có 1-4 người gửi Kudos cho bạn"):
| Property | Value |
|----------|-------|
| font-size | 16px |
| font-weight | 700 |
| line-height | 24px |
| letter-spacing | 0.5px |
| color | #FFFFFF |

**Description text** (e.g., "Hành trình lan tỏa điều tốt đẹp..."):
| Property | Value |
|----------|-------|
| font-size | 14px |
| font-weight | 700 |
| line-height | 20px |
| letter-spacing | 0.1px |
| color | #FFFFFF |

---

### Collectible Icon Badge - `3204:6082` (REVIVAL example)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:6082 (REVIVAL), 3204:6087 (TOUCH OF LIGHT), 3204:6086 (STAY GOLD), 3204:6083 (FLOW TO HORIZON), 3204:6084 (BEYOND THE BOUNDARY), 3204:6088 (ROOT FURTHER) | - |
| width | 80px | `width: 80px` |
| height | 88-120px | `height: auto` (varies by label lines) |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |
| Component Set | 737:20452 | MM_MEDIA Badge component |

**Icon circle:**
| Property | Value | CSS |
|----------|-------|-----|
| width | 64px | `width: 64px` |
| height | 64px | `height: 64px` |
| border | 2px solid #FFFFFF | `border: 2px solid white` |
| border-radius | 100px | `border-radius: 100%` |
| background | image cover | `background-size: cover` |

**Icon label:**
| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 11-12px | `font-size: 11px` / `12px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 16px | `line-height: 16px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | center | `text-align: center` |

**Icon grid layout:**
| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| flex-wrap | wrap | `flex-wrap: wrap` |
| gap | 16px | `gap: 16px` |
| justify-content | space-between | `justify-content: space-between` |
| padding | 0 24px | `padding: 0 24px` (inner grid padding) |
| columns | 3 | 3 items per row |
| row width | 377px | Each row is 377px wide |

---

### Sub-heading "KUDOS QUỐC DÂN" - `3204:6090`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:6090 | - |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #FFEA9E | `color: #FFEA9E` |

---

### Footer Button "Đóng" (Close) - `3204:6093`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:6093 | - |
| padding | 16px | `padding: 16px` |
| background | rgba(255, 234, 158, 0.10) | `background: rgba(255, 234, 158, 0.10)` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 4px | `border-radius: 4px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| cursor | pointer | `cursor: pointer` |

**Inner content:**
- Close icon (X): 24x24px, Component `214:3851` (MM_MEDIA_Close)
- Label "Đóng": Montserrat 700, 16px/24px, letter-spacing 0.5px, color #FFFFFF

**States:**
| State | Changes |
|-------|---------|
| Default | bg: rgba(255, 234, 158, 0.10), border: 1px solid #998C5F |
| Hover | bg: rgba(255, 234, 158, 0.20), increased opacity |
| Active | bg: rgba(255, 234, 158, 0.30) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Disabled | opacity: 0.5, cursor: not-allowed |

---

### Footer Button "Viết KUDOS" (Primary) - `3204:6094`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:6094 | - |
| width | 363px | `width: 363px` / `flex: 1` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 4px | `border-radius: 4px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| cursor | pointer | `cursor: pointer` |

**Inner content:**
- Pen icon: 24x24px, Component `214:3812` (MM_MEDIA_Pen)
- Label "Viết KUDOS": Montserrat 700, 16px/24px, letter-spacing 0.5px, color #00101A

**States:**
| State | Changes |
|-------|---------|
| Default | bg: #FFEA9E |
| Hover | bg: darken(#FFEA9E, 5%) ≈ #F5E08E |
| Active | bg: darken(#FFEA9E, 10%) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Disabled | opacity: 0.5, cursor: not-allowed |

---

### Footer Container - `3204:6092`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3204:6092 | - |
| width | 473px | `width: 100%` |
| height | 56px | `height: 56px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| gap | 16px | `gap: 16px` |

---

## Component Hierarchy with Styles

```
Panel [3204:6052] (w: 553px, bg: #00070C, p: 24px 40px 40px 40px, flex-col, justify: space-between, gap: 40px)
├── Content Area [3204:6053] (w: 473px, flex-col, gap: 24px, overflow-y: auto)
│   ├── Title Section [3204:6054] (flex-col, gap: 16px)
│   │   └── "Thể lệ" [3204:6055] (Montserrat 700, 45px/52px, color: #FFEA9E)
│   │
│   └── Content Sections [3204:6076] (flex-col, gap: 16px)
│       ├── Người nhận Section [3204:6131] (flex-col, gap: 16px)
│       │   ├── Heading [3204:6132] (22px/28px, gold)
│       │   ├── Description [3204:6133] (16px/24px, white)
│       │   ├── Tier: New Hero [3204:6161] (badge pill + threshold + desc)
│       │   ├── Tier: Rising Hero [3204:6170]
│       │   ├── Tier: Super Hero [3204:6179]
│       │   └── Tier: Legend Hero [3204:6188]
│       │
│       ├── Heading "Người gửi..." [3204:6077] (22px/28px, gold)
│       ├── Description [3204:6078] (16px/24px, white)
│       ├── Icon Grid [3204:6079] (flex-wrap, gap: 16px, p: 0 24px)
│       │   ├── Row 1 [3204:6081] (flex-row, gap: 16px, justify: space-between)
│       │   │   ├── REVIVAL [3204:6082] (80px, circle 64px + label)
│       │   │   ├── TOUCH OF LIGHT [3204:6087] (80px, circle 64px + label)
│       │   │   └── STAY GOLD [3204:6086] (80px, circle 64px + label)
│       │   └── Row 2 [3204:6085] (flex-row, gap: 16px, justify: space-between)
│       │       ├── FLOW TO HORIZON [3204:6083] (80px, circle 64px + label)
│       │       ├── BEYOND THE BOUNDARY [3204:6084] (80px, circle 64px + label)
│       │       └── ROOT FURTHER [3204:6088] (80px, circle 64px + label)
│       │
│       ├── Completion note [3204:6089] (16px/24px, white)
│       ├── "KUDOS QUỐC DÂN" [3204:6090] (24px/32px, gold)
│       └── KQD description [3204:6091] (16px/24px, white)
│
└── Footer [3204:6092] (w: 473px, h: 56px, flex-row, gap: 16px)
    ├── "Đóng" Button [3204:6093] (secondary, outlined, p: 16px, border: 1px solid #998C5F)
    │   ├── Close Icon (24x24, white)
    │   └── "Đóng" (Montserrat 700, 16px, white)
    └── "Viết KUDOS" Button [3204:6094] (primary, w: 363px, h: 56px, bg: #FFEA9E, p: 16px)
        ├── Pen Icon (24x24, dark)
        └── "Viết KUDOS" (Montserrat 700, 16px, #00101A)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | ∞ |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Panel | width: 100vw, full-screen overlay |
| Panel padding | padding: 16px 20px 20px 20px |
| Title | font-size: 32px |
| Icon grid | 3 columns maintained, smaller gap (12px) |
| Footer | Sticky bottom, full width |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Panel | width: 450px |
| Panel padding | padding: 20px 32px 32px 32px |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| Panel | width: 553px (as designed) |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| MM_MEDIA_Close (214:3851) | 24x24 | White | "Đóng" button icon |
| MM_MEDIA_Pen (214:3812) | 24x24 | Dark (#00101A) | "Viết KUDOS" button icon |
| MM_MEDIA_New Hero (3007:17506) | 126x22 | Gradient + white text | New Hero badge pill |
| MM_MEDIA_Rising Hero (3007:17509) | 126x22 | Gradient + white text | Rising Hero badge pill |
| MM_MEDIA_Super Hero (3007:17512) | 126x22 | Gradient + white text | Super Hero badge pill |
| MM_MEDIA_Legend Hero (3007:17516) | 126x22 | Glow + gradient + white text | Legend Hero badge pill |
| Badge REVIVAL (737:20446) | 64x64 circle | Image | Collectible icon |
| Badge TOUCH OF LIGHT (737:20450) | 64x64 circle | Image | Collectible icon |
| Badge STAY GOLD (737:20449) | 64x64 circle | Image | Collectible icon |
| Badge FLOW TO HORIZON (737:20447) | 64x64 circle | Image | Collectible icon |
| Badge BEYOND THE BOUNDARY (737:20448) | 64x64 circle | Image | Collectible icon |
| Badge ROOT FURTHER (737:20451) | 64x64 circle | Image | Collectible icon |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Panel | transform (translateX) | 300ms | ease-out | Open (slide from right) |
| Panel | transform (translateX) | 250ms | ease-in | Close (slide to right) |
| Overlay | opacity | 200ms | ease-in-out | Open/Close |
| Buttons | background-color, box-shadow | 150ms | ease-in-out | Hover |
| Content | opacity | 200ms | ease-out | Panel opened (fade in) |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Panel Container | 3204:6052 | `fixed right-0 top-0 h-screen w-[553px] bg-[#00070C] flex flex-col justify-between p-[24px_40px_40px]` | `<RulesPanel />` |
| Title | 3204:6055 | `font-montserrat font-bold text-[45px] leading-[52px] text-[#FFEA9E]` | `<h1>` |
| Section Heading | 3204:6132 | `font-montserrat font-bold text-[22px] leading-7 text-[#FFEA9E]` | `<h2>` |
| Body Text | 3204:6133 | `font-montserrat font-bold text-base leading-6 tracking-[0.5px] text-white text-justify` | `<p>` |
| Small Text | 3204:6168 | `font-montserrat font-bold text-sm leading-5 tracking-[0.1px] text-white text-justify` | `<p>` |
| Hero Badge Pill | 3204:6163 | `inline-flex items-center h-[22px] border border-[#FFEA9E] rounded-full px-2` | `<HeroBadge tier="new" />` |
| Icon Badge | 3204:6082 | `flex flex-col items-center gap-2 w-20` | `<CollectibleIcon name="REVIVAL" />` |
| Icon Circle | child of above | `w-16 h-16 rounded-full border-2 border-white bg-cover` | `<img>` inside badge |
| Footer | 3204:6092 | `flex gap-4 w-full` | `<footer>` |
| Close Button | 3204:6093 | `flex items-center justify-center gap-2 px-4 py-4 bg-[rgba(255,234,158,0.1)] border border-[#998C5F] rounded` | `<Button variant="secondary">` |
| Viết KUDOS Button | 3204:6094 | `flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-[#FFEA9E] rounded h-14` | `<Button variant="primary">` |

---

## Overlay / Backdrop

Based on the Figma frame analysis, the Rules panel does **NOT** use a dimming backdrop overlay. The panel slides in from the right edge and the page content behind remains visible (but non-interactive). No overlay styles are needed.

If a backdrop is added later for UX improvement:
| Property | Value | CSS |
|----------|-------|-----|
| background | rgba(0, 0, 0, 0.5) | `background: rgba(0,0,0,0.5)` |
| position | fixed | `position: fixed; inset: 0` |
| z-index | 49 | Below panel (z-50), above page content |

---

## Notes

- All colors should use CSS variables for theming support
- Prefer Tailwind utility classes where project uses Tailwind
- Icons should be SVG for scalability
- Font should be loaded via Google Fonts or local files
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags.
- Hero badge pills have complex gradient backgrounds with image overlays — use Figma component images as assets.
- The panel uses `justify-content: space-between` to push footer buttons to the bottom.
- All body text uses `font-weight: 700` (bold) throughout the design.
- The "Đóng" button uses a semi-transparent gold background with a muted gold border for the secondary style.
