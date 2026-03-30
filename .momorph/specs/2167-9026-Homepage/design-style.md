# Design Style: Homepage SAA

**Frame ID**: `2167:9026`
**Frame Name**: `Homepage SAA`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=2167:9026
**Extracted At**: 2026-03-24

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-dark | #00101A | 100% | Page background |
| --color-header-bg | rgba(16, 20, 23, 0.8) | 80% | Header background |
| --color-text-white | #FFFFFF | 100% | Primary text, nav links, body |
| --color-accent-gold | #FFEA9E | 100% | Primary CTA bg, section headings, borders |
| --color-accent-gold-glow | #FAE287 | 100% | Glow / box-shadow on cards & logo |
| --color-btn-kudos-bg | rgba(255, 234, 158, 0.10) | 10% | Secondary CTA button background |
| --color-btn-kudos-border | #998C5F | 100% | Secondary CTA button border |
| --color-divider | #2E3940 | 100% | Footer top border |
| --color-gradient-hero | linear-gradient(12deg, #00101A 23.7%, rgba(0,18,29,0.46) 38.34%, rgba(0,19,32,0) 48.92%) | — | Hero overlay (bottom-left → transparent) |
| --color-notification-badge | rgba(212, 39, 29, 1) | 100% | Notification dot (red) |
| --color-kudos-text | rgba(219, 209, 193, 1) | 100% | KUDOS logotype text (#DBD1C1) |
| --color-nav-selected | #FFEA9E | 100% | Active nav link + text-shadow glow |
| --color-countdown-digit | #FFFFFF | 100% | Countdown digit characters |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| --text-hero-heading | SVN-Gotham (local) | ~100px | 400 | auto | — | "ROOT FURTHER" hero image (rendered as image) |
| --text-section-heading | Montserrat | 57px | 700 | 64px | -0.25px | Section titles ("Hệ thống giải thưởng") |
| --text-countdown-digit | Digital Numbers (local) | ~49px | 400 | auto | 0% | Countdown timer digits |
| --text-body-lg | Montserrat | 24px | 700 | 32px | 0px | "Coming soon" label, section caption, body paragraphs |
| --text-cta-btn | Montserrat | 22px | 700 | 28px | 0px | CTA button labels ("ABOUT AWARDS", "ABOUT KUDOS") |
| --text-countdown-unit | Montserrat | 24px | 700 | 32px | 0px | Countdown unit labels ("DAYS", "HOURS", "MINUTES") |
| --text-nav-link | Montserrat | 14px | 700 | 20px | 0.1px | Header navigation links |
| --text-award-card-title | Montserrat | 24px | 400 | 32px | 0px | Award card title (#FFEA9E gold) |
| --text-award-card-desc | Montserrat | 16px | 400 | 24px | 0.5px | Award card description (white) |
| --text-link-detail | Montserrat | 16px | 500 | 24px | 0.15px | "Chi tiết" link in award cards |
| --text-footer-nav | Montserrat | 16px | 700 | 24px | 0.15px | Footer navigation links |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0% | Footer copyright |
| --text-kudos-brand | SVN-Gotham (local) | 96px | 400 | 24px | -13% | "KUDOS" logotype in Sunkudos section |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-xs | 4px | Icon gaps in nav links |
| --spacing-sm | 8px | Button icon-text gap, event info row gap |
| --spacing-md | 16px | Button padding-y, CTA button padding-y, countdown gap, nav link padding |
| --spacing-lg | 24px | Button padding-x, award card gap |
| --spacing-xl | 40px | Footer padding-y, CTA button gap, countdown unit gap |
| --spacing-2xl | 80px | Awards section gap (header ↔ grid), footer inner gap |
| --spacing-section | 120px | Main section gap (Bìa → Awards → Sunkudos) |
| --spacing-page-px | 144px | Page & header horizontal padding |
| --spacing-page-py | 96px | Page vertical padding |
| --spacing-footer-px | 90px | Footer horizontal padding |
| --spacing-header-h | 80px | Header height |
| --spacing-content-w | 1224px | Inner content max-width |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-sm | 4px | Nav link hover background |
| --radius-md | 8px | CTA buttons, award card image container |
| --radius-full | 100px | Notification badge |
| --border-footer | 1px solid #2E3940 | Footer top border |
| --border-kudos-btn | 1px solid #998C5F | Secondary CTA "ABOUT KUDOS" border |
| --border-award-card | 1px solid #FFEA9E | Award card image border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-glow-gold | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Award card image, widget button glow |
| --shadow-nav-selected | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Selected nav link text-shadow |
| --shadow-countdown-tile | *(not a shadow — see B1_Countdown section)* `border: 0.5px solid #FFEA9E` + `backdrop-filter: blur(17px)` combined | Countdown digit tile visual treatment |

---

## Layout Specifications

### Page Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1512px | Desktop baseline |
| height | 4480px | Full page scroll |
| background | #00101A | Dark navy |
| position | relative | Stacking context |

### Grid/Flex Layout

| Layer | Display | Direction | Notes |
|-------|---------|-----------|-------|
| A1_Header | flex | row | space-between, h: 80px, position: absolute top 0 |
| Bìa (content wrapper) | flex | column | gap: 120px, padding: 96px 144px, position: absolute |
| Frame 487 (hero inner) | flex | column | gap: 40px, 1224×596px |
| B1 Countdown | flex | column | gap: 16px, 1224×176px |
| B1.3 Countdown digits | flex | row | gap: 40px |
| B2 Event info | flex | column | gap: 8px, 637×64px |
| B3 CTA buttons | flex | row | gap: 40px, 570×60px |
| Awards section | flex | column | gap: 80px, 1224×1353px |
| C2 Award grid | flex | 2 rows (each flex-row, space-between) | row-gap: 80px; effective col-gap: ~108px; each card 336×504px |
| D1 Sunkudos outer | flex | column | align-items: center, justify-content: center, 1224×500px |
| D1 Sunkudos inner | flex | row | text-left + KUDOS-right, 1120×500px |
| Footer | flex | row | justify-between, padding: 40px 90px |

### Layout Structure (ASCII)

```
┌───────────────────────────────────────────── 1512px ─────────────────────────────────────────────┐
│  A1_Header  (position: absolute, top: 0, h: 80px, bg: rgba(16,20,23,0.8), px: 144px, py: 12px)   │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │ [LOGO 52×48] [About SAA 2025 ★] [Awards Information] [Sun* Kudos]    [🔔] [VN ▾] [👤]        │ │
│  └──────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                    │
│  3.5_Keyvisual  (position: absolute, full bg image 1512×1392px)                                   │
│  Cover  (gradient overlay: #00101A 23.7% → transparent)                                           │
│                                                                                                    │
│  Bìa  (position: absolute, 1512×4220px, px: 144px, py: 96px, flex-col, gap: 120px)               │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │  Frame 487  (1224×596px, flex-col, gap: 40px)                                                │ │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────┐ │ │
│  │  │  B.1_Key Visual image  (ROOT FURTHER logo, 451×200px)                                   │ │ │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────┐ │ │
│  │  │  B1_Countdown  (1224×176px, flex-col, gap: 16px)                                        │ │ │
│  │  │  ├── B1.2 "Coming soon"  (24px/700 Montserrat white)                                    │ │ │
│  │  │  └── B1.3 [00 DAYS] [00 HOURS] [00 MINUTES]  (Digital Numbers ~49px, gap: 40px)         │ │ │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────┐ │ │
│  │  │  B2 Event Info  (637×64px, flex-col, gap: 8px)                                          │ │ │
│  │  │  ├── "Thời gian: 26/12/2025  18h30  Địa điểm: Âu Cơ Art Center"                          │ │ │
│  │  │  └── "Tường thuật trực tiếp qua sóng Livestream"                                         │ │ │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────┐ │ │
│  │  │  B3 CTA  (570×60px, flex-row, gap: 40px)                                                │ │ │
│  │  │  ├── [ABOUT AWARDS ↗]  276×60px, bg:#FFEA9E, radius:8px                                 │ │ │
│  │  │  └── [ABOUT KUDOS ↗]   border:#998C5F, bg:rgba(255,234,158,0.1), radius:8px             │ │ │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                    │
│  B4 (3204:10152)  (1152px, padding: 120px 104px, radius: 8px, flex-col center, gap: 32px)         │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │  [ROOT FURTHER centered image 290×134px]                                                     │ │
│  │  [Paragraph text 1152px wide, Montserrat 24px/700 white, justified]                          │ │
│  └──────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                    │
│  Widget Button  (position: absolute, top: 830px, right: 19px, 106×64px)                           │
│                                                                                                    │
│  Awards section  (1224×1353px, flex-col, gap: 80px)                                               │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │  C1_Header  (1224×129px, flex-col, gap: 16px)                                                │ │
│  │  ├── "Sun* annual awards 2025"  (Montserrat 24px/700 white)                                  │ │
│  │  ├── ─────────────────────────────── (1px divider #2E3940)                                  │ │
│  │  └── [row] "Hệ thống giải thưởng"  (637px, Montserrat 57px/700 #FFEA9E, left-aligned)       │ │
│  │                                                                                               │ │
│  │  C2 Award Grid  (3 × 336×504px cards, gap: 24px)                                             │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                                                      │ │
│  │  │ TOP      │ │ TOP      │ │ TOP PRJ  │                                                      │ │
│  │  │ TALENT   │ │ PROJECT  │ │ LEADER   │                                                      │ │
│  │  │ [Chi tiết]│ │ [Chi tiết]│ │ [Chi tiết]│                                                   │ │
│  │  └──────────┘ └──────────┘ └──────────┘                                                      │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                                                      │ │
│  │  │ BEST     │ │ SIGNATURE│ │  MVP     │                                                      │ │
│  │  │ MANAGER  │ │ 2025     │ │          │                                                      │ │
│  │  └──────────┘ └──────────┘ └──────────┘                                                      │ │
│  └──────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                    │
│  D1 Sunkudos  (1224×500px, flex-col)                                                              │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │  [Phong trào ghi nhận]  [Sun* Kudos title]  [desc]  [Chi tiết ↗]   [KUDOS logo image]        │ │
│  └──────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                    │
│  7_Footer  (position: absolute, bottom: 0, px: 90px, py: 40px, border-top: 1px solid #2E3940)    │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │  [LOGO]  [About SAA 2025] [Awards Information] [Sun* Kudos] [Tiêu chuẩn chung]  [Copyright]  │ │
│  └──────────────────────────────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A1_Header — Navigation Header

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9091 | — |
| width | 1512px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(16, 20, 23, 0.8) | `background-color: rgba(16,20,23,0.8)` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| justify-content | space-between | `justify-content: space-between` |
| align-items | center | `align-items: center` |
| position | sticky | `position: sticky` (use sticky in implementation so header stays visible during scroll; Figma uses `absolute` at design-time) |
| top | 0 | `top: 0` |
| z-index | 10 | `z-index: 10` |

---

### A1.1_Logo

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I2167:9091;178:1033 | — |
| width | 52px | `width: 52px` |
| height | 48px | `height: 48px` |
| interaction | Click → scroll to top | `cursor: pointer` |

---

### A1_Header — Left & Right Group Gaps

| Group | Node ID | Width | Gap | Contents |
|-------|---------|-------|-----|----------|
| Left group | I2167:9091;186:2166 | 606px | 64px | Logo (52px) + Nav links group (490px) |
| Nav links group | I2167:9091;178:653 | 490px | 24px | 3 nav link items |
| Right group | I2167:9091;186:1601 | 220px | 16px | Language selector (108px) + Notification (40px) + Avatar (40px) |

---

### A1.2–A1.5 Navigation Links

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I2167:9091;186:1579 (selected), I2167:9091;186:1587 (hover), I2167:9091;186:1593 (normal) | — |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| font-family | Montserrat | — |
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 20px | `line-height: 20px` |
| letter-spacing | 0.1px | `letter-spacing: 0.1px` |

**States:**
| State | Changes |
|-------|---------|
| Normal | `color: #FFFFFF; background: transparent` |
| Hover | `background: rgba(255,255,255,0.1); border-radius: 4px` |
| Selected/Active | `color: #FFEA9E; border-bottom: 1px solid #FFEA9E; text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` |

---

### A1.6 Notification Bell

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I2167:9091;186:2101 | — |
| width | 40px | `width: 40px` |
| height | 40px | `height: 40px` |
| cursor | pointer | `cursor: pointer` |

**Bell icon:**
| Property | Value |
|----------|-------|
| size | 24×24px |
| color | #FFFFFF |

**Badge (red dot):**
| Property | Value | CSS |
|----------|-------|-----|
| Node ID | I2167:9091;186:2101;186:2089 | — |
| position | absolute, top-right of bell button | `position: absolute; top: 0; right: 0` |
| width | ~8px | `width: 8px` |
| height | ~8px | `height: 8px` |
| background | rgba(212, 39, 29, 1) = #D4271D | `background-color: #D4271D` |
| border-radius | 100px | `border-radius: 9999px` |
| visibility | hidden when notifications = 0; visible when ≥ 1 | conditional render |

**States:**
| State | Changes |
|-------|---------|
| Default | icon white, badge visible if count ≥ 1 |
| Hover | `background: rgba(255,255,255,0.1); border-radius: 4px` |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 2px` |

---

### A1.7 Language Selector

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I2167:9091;186:1696 | — |
| width | 108px | `width: 108px` |
| height | 56px | `height: 56px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 4px (between flag + label + chevron) | `gap: 4px` |
| cursor | pointer | `cursor: pointer` |

**Inner button (I2167:9091;186:1696;186:1821):**
| Property | Value |
|----------|-------|
| layout | flex row, items-center, gap: 4px |
| padding | 16px |

**Content elements:**
| Element | Size | Color | Font |
|---------|------|-------|------|
| VN Flag icon | 24×24px | — | image |
| "VN" label | Montserrat 14px/700 white | #FFFFFF | — |
| Chevron Down icon | 24×24px | #FFFFFF | SVG icon |

**States:**
| State | Changes |
|-------|---------|
| Default | `background: transparent` |
| Hover | `background: rgba(255,255,255,0.1); border-radius: 4px` |
| Open (dropdown active) | chevron rotates 180deg |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 2px` |

---

### A1.8 Avatar Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I2167:9091;186:1597 | — |
| width | 40px | `width: 40px` |
| height | 40px | `height: 40px` |
| border-radius | 50% (circle) | `border-radius: 50%` |
| overflow | hidden | `overflow: hidden` |
| cursor | pointer | `cursor: pointer` |

**Avatar image:**
| Property | Value |
|----------|-------|
| source | `user.user_metadata.avatar_url` from Supabase session |
| fallback | default person icon (white SVG) on dark bg |
| size | 40×40px |

**States:**
| State | Changes |
|-------|---------|
| Default | avatar image displayed |
| Hover | `opacity: 0.85; outline: 2px solid rgba(255,255,255,0.3)` |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 2px` |

---

### B1_Countdown Section

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9035 | — |
| width | 1224px | `width: 100%` |
| height | 176px | `height: 176px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 16px | `gap: 16px` |

**B1.2 "Coming soon" text:**
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | #FFFFFF | `color: white` |

**B1.3 Countdown group structure (per unit — e.g. "07 DAYS"):**
Each unit group is a `flex-col` with the digit row on top and unit label below.

| Property | Value | CSS |
|----------|-------|-----|
| layout | flex-column | `flex-direction: column` |
| gap (digit row ↔ label) | 4px | `gap: 4px` |

**B1.3 Digit row (the "07" part — two digit tiles):**
| Property | Value | CSS |
|----------|-------|-----|
| layout | flex-row | `flex-direction: row` |
| gap between tiles | 4px | `gap: 4px` |

**B1.3 Countdown digit tile (per individual digit tile — e.g. one "0" or one "7"):**
| width | ~51px | each digit tile |
| height | ~82px | each digit tile |
| border | 0.5px solid #FFEA9E | `border: 0.5px solid #FFEA9E` |
| border-radius | 8px | `border-radius: 8px` |
| backdrop-filter | blur(16.64px) | `backdrop-filter: blur(17px)` |
| font-family | Digital Numbers | `font-family: 'Digital Numbers'` |
| font-size | ~49px | `font-size: 49px` |
| font-weight | 400 | `font-weight: 400` |
| color | #FFFFFF | `color: white` |
| display | flex, center content | `display: flex; align-items: center; justify-content: center` |

> ⚠️ Each digit tile displays **one character** (e.g. "0" or "7"). Two tiles side by side form the 2-digit display (e.g. "07"). Implement with two separate `<span>` elements, not a single "07" string in one tile.

**B1.3 Unit label ("DAYS" / "HOURS" / "MINUTES"):**
| font-family | Montserrat | — |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| color | #FFFFFF | `color: white` |
| text-align | center | `text-align: center` |

---

### B2_Event Info Section

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9053 | — |
| width | 637px | `width: 637px` |
| height | 64px | `height: 64px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 8px | `gap: 8px` |

**Row 1 — Time & Venue (2167:9054, flex-row, gap: 60px):**

| Sub-element | Font Family | Size | Weight | Line Height | Letter Spacing | Color |
|-------------|-------------|------|--------|-------------|----------------|-------|
| "Thời gian: " label | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF |
| "26/12/2025" value | Montserrat | 24px | 700 | 32px | 0px | #FFEA9E |
| "Địa điểm: " label | Montserrat | 16px | 700 | 24px | 0.15px | #FFFFFF |
| Venue value (e.g. "Âu Cơ Art Center") | Montserrat | 24px | 700 | 32px | 0px | #FFEA9E |

**Row 2 — Livestream note (2167:9061):**

| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 16px |
| font-weight | 700 |
| line-height | 24px |
| letter-spacing | 0.5px |
| color | #FFFFFF |
| content | "Tường thuật trực tiếp qua sóng Livestream" |

---

### B3_CTA Buttons

**B3.1 — ABOUT AWARDS (hover/filled state):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9063 | — |
| width | 276px | `width: 276px` |
| height | 60px | `height: 60px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 8px | `border-radius: 8px` |
| font-family | Montserrat | — |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #00101A | `color: #00101A` |

**B3.2 — ABOUT KUDOS (normal/outlined state):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9064 | — |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| background | rgba(255, 234, 158, 0.10) | `background-color: rgba(255,234,158,0.10)` |
| border-radius | 8px | `border-radius: 8px` |
| padding | 16px 24px | `padding: 16px 24px` |
| font-family | Montserrat | — |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| color | #FFFFFF | `color: white` |

> Both buttons share the same hover/normal swap — hover = filled yellow, normal = outlined. Two separate states, same components.

**States (both CTA buttons):**
| State | Changes |
|-------|---------|
| Normal | outlined: border #998C5F, bg rgba(255,234,158,0.1), text white |
| Hover | filled: bg #FFEA9E, text #00101A |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 3px` |
| Active | `opacity: 0.8; transform: scale(0.98)` |

---

### B4_Content Section

The B4 section is a full-width content block below the hero CTA buttons, containing a centered "ROOT FURTHER" logo image and the descriptive paragraph text.

**Outer container — Node ID: 3204:10152:**
| Property | Value | CSS |
|----------|-------|-----|
| width | 1152px | `width: 1152px` |
| height | 1219px | `height: auto` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| gap | 32px | `gap: 32px` |
| padding | 120px 104px | `padding: 120px 104px` |
| border-radius | 8px | `border-radius: 8px` |
| background | transparent (no fill; keyvisual bleeds through) | — |

**Child 1 — Centered "ROOT FURTHER" logo/image — Node ID: 3204:10153:**
| Property | Value |
|----------|-------|
| width | 290px |
| height | 134px |
| position | centered in container |
| Note | Contains 2 overlapping image layers (290×67px + 189×67px) |

**Child 2 — Paragraph text container — Node ID: 5001:14827:**
| Property | Value |
|----------|-------|
| width | 1152px |
| height | 1090px |
| Note | Contains two large text blocks (512px + 448px tall) |

**Paragraph text style:**
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 24px |
| font-weight | 700 |
| line-height | 32px |
| letter-spacing | 0px |
| color | #FFFFFF |
| text-align | justified |

---

### C1_Awards Section Header

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9069 | — |
| width | 1224px | `width: 100%` |
| height | 129px | `height: auto` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 16px | `gap: 16px` |

**Child layout:**
1. Caption text (row 1, 32px tall)
2. Divider line (row 2, 1px, #2E3940, full width) — Node ID: 2167:9071
3. Heading row (row 3, 64px tall, flex-row, `justify-content: flex-start`) — Node ID: 2167:9072

> ⚠️ The section heading and caption are **NOT** stacked below each other in a simple column. There is a 1px divider between them. The heading row (`flex-row`) contains only the heading text (637px wide, left-aligned) with no description column beside it.

**Caption ("Sun* annual awards 2025") — Node ID: 2167:9070:**
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 24px |
| font-weight | 700 |
| line-height | 32px |
| letter-spacing | 0px |
| color | #FFFFFF |

**Divider line — Node ID: 2167:9071:**
| Property | Value |
|----------|-------|
| width | 1224px (full) |
| height | 1px |
| background | rgba(46, 57, 64, 1) = #2E3940 |

**Section Heading ("Hệ thống giải thưởng") — Node ID: 2167:9073:**
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 57px |
| font-weight | 700 |
| line-height | 64px |
| letter-spacing | -0.25px |
| color | #FFEA9E |
| width | 637px (left-aligned in 1224px row) |

---

### C2_Award Grid Container — Node ID: 5005:14974

| Property | Value | CSS |
|----------|-------|-----|
| width | 1224px | `width: 100%` |
| height | 1144px | `height: auto` |
| layout | 2 flex-rows, each `justify-content: space-between` | see below |

> ⚠️ The award grid is **NOT a CSS grid** — Figma uses two flex rows. Implement with CSS flex or grid:
> - Each row: `display: flex; flex-direction: row; justify-content: space-between;`
> - Row 1 (2167:9074): 3 cards, each 336px; effective horizontal gap ≈ 108px `(1224 - 3×336) / 2`
> - Row gap between row 1 and row 2: **80px** — Node ID: 2167:9078 (row 2)
> - **Recommended CSS Grid equivalent**: `display: grid; grid-template-columns: repeat(3, 336px); column-gap: 108px; row-gap: 80px;`

### C2_Award Card — Individual Card

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2167:9075 (Top Talent example) | — |
| width | 336px | `width: 336px` |
| height | 504px (min; can grow with long title) | `min-height: 504px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 24px | `gap: 24px` |

**Card image area:**
| width | 336px | `width: 100%` |
| height | 336px | `height: 336px` |
| box-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | `box-shadow: var(--shadow-glow-gold)` |
| border | 1px solid #FFEA9E | `border: 1px solid #FFEA9E` (approx.) |
| border-radius | 8px | `border-radius: 8px` |

**Card info container — Node ID: I2167:9075;214:1020:**
| Property | Value |
|----------|-------|
| width | 336px |
| height | 144px |
| display | flex-column |
| gap | 4px |

**Card title (e.g. "Top Talent") — Node ID: I2167:9075;214:1021:**
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 24px |
| font-weight | 400 |
| line-height | 32px |
| letter-spacing | 0px |
| color | #FFEA9E |

> ⚠️ Card title is **gold (#FFEA9E) at 24px/weight 400** — not white/bold as might be expected.

**Card description (2 lines, max 48px height) — Node ID: I2167:9075;214:1022:**
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 16px |
| font-weight | 400 |
| line-height | 24px |
| letter-spacing | 0.5px |
| color | rgba(255, 255, 255, 1) — full white |
| max height | 48px (2 lines × 24px; overflow: ellipsis) |

**"Chi tiết →" link:**
| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 16px |
| font-weight | 500 |
| line-height | 24px |
| letter-spacing | 0.15px |
| color | #FFFFFF |
| icon | Arrow icon 20×20px, white, inline-end of text |

**States:**
| State | Changes |
|-------|---------|
| Default | `box-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` |
| Hover | `transform: translateY(-4px); box-shadow: 0 8px 16px rgba(0,0,0,0.4), 0 0 12px #FAE287` |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 2px` |

---

### D1_Sunkudos Section

**Outer wrapper (3390:10349):**
| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3390:10349 | — |
| width | 1224px | `width: 100%` |
| height | 500px | `height: 500px` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` (centering wrapper) |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |

**Inner content frame (I3390:10349;313:8415) — 2-column horizontal layout:**
| Property | Value |
|----------|-------|
| width | 1120px |
| height | 500px |
| layout | flex-row (text left, KUDOS image right) |

**Left text column (D2_Content — I3390:10349;313:8419):**
| Property | Value |
|----------|-------|
| width | 457px |
| height | 408px |
| display | flex |
| flex-direction | column |
| gap | 32px |

| Text Element | Font Family | Size | Weight | Line Height | Letter Spacing | Color |
|--------------|-------------|------|--------|-------------|----------------|-------|
| "Phong trào ghi nhận" (label) | Montserrat | 24px | 700 | 32px | 0px | #FFFFFF |
| "Sun* Kudos" (heading) | Montserrat | 57px | 700 | 64px | -0.25px | #FFEA9E |
| Description body | Montserrat | 16px | 700 | 24px | 0.5px | #FFFFFF |
| "Chi tiết" button label | Montserrat | 22px | 700 | 28px | 0px | #00101A |

**"Chi tiết" CTA button in Sunkudos:**
| Property | Value |
|----------|-------|
| background | #FFEA9E |
| border-radius | 8px |
| padding | 16px 24px |
| display | flex row |
| icon | Arrow icon 24×24px, #00101A |

**States:**
| State | Changes |
|-------|---------|
| Default | `bg: #FFEA9E; color: #00101A` |
| Hover | `opacity: 0.9; transform: scale(1.02)` |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 3px` |
| Active | `opacity: 0.8; transform: scale(0.98)` |

**Right — KUDOS logotype image:**
| Property | Value |
|----------|-------|
| font-family | SVN-Gotham (local custom font) — render as image |
| font-size | 96px |
| font-weight | 400 |
| letter-spacing | -13% (`letter-spacing: -0.13em`) |
| color | #DBD1C1 |

---

### 7_Footer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 5001:14800 | — |
| width | 1512px | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid #2E3940` |
| display | flex | `display: flex` |
| justify-content | space-between | `justify-content: space-between` |
| align-items | center | `align-items: center` |

**Footer nav inner group:**
| gap | 80px | `gap: 80px` |
| height | 64px | `height: 64px` |

**Footer nav links — 4 items (in order):**

| # | Label | Node ID | Route |
|---|-------|---------|-------|
| 7.2 | About SAA 2025 | I5001:14800;342:1410 | `/` |
| 7.3 | Awards Information | I5001:14800;342:1411 | `/awards-information` |
| 7.4 | Sun* Kudos | I5001:14800;342:1412 | `/sun-kudos` |
| 7.5 | Tiêu chuẩn chung | I5001:14800;1161:9487 | `/tieu-chuan-chung` |

> ⚠️ Footer has **4 nav links** — one more than the header (which has 3). "Tiêu chuẩn chung" is footer-only.

**Footer nav link typography (applies to all 4 footer nav links):**
| Node IDs | I5001:14800;342:1410, I5001:14800;342:1411, I5001:14800;342:1412, I5001:14800;1161:9487 | — |
| font-family | Montserrat | — |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFFFFF | `color: white` |

**Footer nav link states:**
| State | Changes |
|-------|---------|
| Default | `color: #FFFFFF; text-decoration: none` |
| Hover | `color: #FFEA9E; text-decoration: underline` |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 2px` |

**Copyright text:**
| Node ID | I5001:14800;342:1413 | — |
| font-family | Montserrat Alternates | — |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #FFFFFF | `color: white` |

---

### 6_Widget Button — Floating Action

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 5022:15169 | — |
| position | absolute in Figma | `position: fixed` in implementation (stays on screen during scroll) |
| right | 19px | `right: 19px` |
| bottom | ~40px (design-equivalent; Figma uses absolute `top: 830px` in hero context) | `bottom: 40px` |
| width | ~106px | `width: 106px` |
| height | ~64px | `height: 64px` |
| box-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | `box-shadow: var(--shadow-glow-gold)` |
| border-radius | full (pill) | `border-radius: 9999px` |
| background | #FFEA9E | (yellow pill) |

**Widget button internal layout:**
| Property | Value |
|----------|-------|
| layout | flex-row, align-items: center, gap: 8px |
| icon 1 | Pen/pencil icon (~24×24px, dark #00101A) |
| icon 2 | SAA logo icon (~24×24px, dark #00101A) |

**States:**
| State | Changes |
|-------|---------|
| Default (closed) | `bg: #FFEA9E; box-shadow: var(--shadow-glow-gold)` |
| Hover | `box-shadow: 0 8px 16px rgba(0,0,0,0.4), 0 0 12px #FAE287; transform: scale(1.04)` |
| Active/Pressed | `transform: scale(0.97); opacity: 0.9` |
| Open (menu visible) | same as default (button itself doesn't change appearance when menu is open) |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 3px` |

---

## Component Hierarchy with Styles

```
Homepage Page (1512×4480px, bg: #00101A)
├── 3.5_Keyvisual  (position: absolute, 1512×1392px, bg image cover)
├── Cover  (position: absolute, gradient overlay bottom-left → transparent)
├── A1_Header  (position: absolute, top: 0, h: 80px, bg: rgba(16,20,23,0.8), px: 144px)
│   ├── [Left group]
│   │   ├── A1.1_Logo  (52×48px, clickable)
│   │   └── [Nav links]  (flex row, gap: 24px)
│   │       ├── "About SAA 2025"  (selected: #FFEA9E + underline + glow)
│   │       ├── "Awards Information"  (hover state)
│   │       └── "Sun* Kudos"  (normal state)
│   └── [Right group]  (flex row, gap: 16px)
│       ├── A1.6_Notification  (40×40px, badge: red dot)
│       ├── A1.7_Language  (108×56px, "VN" + flag + chevron)
│       └── A1.8_Account  (40×40px, avatar icon)
│
├── Bìa  (position: absolute, px: 144px, py: 96px, flex-col, gap: 120px)
│   ├── Frame 487  (1224×596px, flex-col, gap: 40px)
│   │   ├── B.1_Key Visual  (ROOT FURTHER logo image, 451×200px)
│   │   ├── B1_Countdown  (flex-col, gap: 16px)
│   │   │   ├── "Coming soon"  (Montserrat 24px/700 white)
│   │   │   └── B1.3  (flex-row, gap: 40px)
│   │   │       ├── [00] DAYS
│   │   │       ├── [00] HOURS
│   │   │       └── [00] MINUTES
│   │   ├── B2_Event Info  (flex-col, gap: 8px)
│   │   └── B3_CTA  (flex-row, gap: 40px)
│   │       ├── [ABOUT AWARDS ↗]  (276×60px, bg: #FFEA9E)
│   │       └── [ABOUT KUDOS ↗]  (border: #998C5F, bg: rgba(255,234,158,0.1))
│   │
│   ├── B4 (1152px, padding: 120px 104px, radius: 8px, flex-col center, gap: 32px)
│   │   ├── ROOT FURTHER centered image (290×134px)
│   │   └── Paragraph text (1152px, Montserrat 24px/700 white, justified)
│   │
│   ├── 6_Widget Button  (position: fixed, right: 19px, pill shape, bg: #FFEA9E)
│   │
│   ├── Awards section  (flex-col, gap: 80px)
│   │   ├── C1_Header  (flex-col, gap: 16px)
│   │   │   ├── "Sun* annual awards 2025"  (24px/700 white)
│   │   │   ├── ── (1px divider #2E3940)
│   │   │   └── [row] "Hệ thống giải thưởng"  (637px, 57px/700 #FFEA9E, left)
│   │   └── C2_Award Grid  (5005:14974, 1224×1144px)
│   │       ├── Row 1 (2167:9074, flex-row, space-between, gap:80px)  [3 cards]
│   │       └── Row 2 (2167:9078, flex-row, space-between, gap:80px)  [3 cards]
│   │           [Each card: 336×504px, flex-col, gap:24px]
│   │           ├── Award image  (336×336px, glow border)
│   │           ├── Title  (Montserrat 24px/400 #FFEA9E)
│   │           ├── Description  (Montserrat 16px/400 white, ls:0.5px, max 2 lines)
│   │           └── "Chi tiết →"  (16px/500 white)
│   │
│   └── D1_Sunkudos  (1224×500px)
│       ├── [Left: text content + Chi tiết button]
│       └── [Right: KUDOS logotype image (96px SVN-Gotham #DBD1C1)]
│
└── 7_Footer  (position: absolute, bottom: 0, px: 90px, py: 40px, border-top: #2E3940)
    ├── [Left: LOGO (7.1)]
    ├── [Center: nav links (gap: 80px) — 4 links]
    │   ├── "About SAA 2025" (7.2) → /
    │   ├── "Awards Information" (7.3) → /awards-information
    │   ├── "Sun* Kudos" (7.4) → /sun-kudos
    │   └── "Tiêu chuẩn chung" (7.5) → /tieu-chuan-chung  ← footer-only link
    └── [Right: copyright "Bản quyền thuộc về Sun* © 2025" (Montserrat Alternates 16px/700)]
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
| A1_Header | padding: 12px 16px; nav links hidden; hamburger icon (☰) replaces nav links group |
| Hamburger button | 40×40px icon button, top-right; opens/closes mobile nav drawer |
| Mobile nav drawer | *(clarification needed — see Open Questions)* |
| Bìa | padding: 80px 16px; gap: 40px |
| B3 CTA buttons | flex-col; width: 100% |
| C2 Award grid | 2 columns; card width: calc(50% - 8px) |
| D1 Sunkudos | flex-col; text + button stacked above image |
| Footer | flex-col; center-aligned; font-size: 14px; padding: 20px 16px |

#### Tablet (768px–1023px)

| Component | Changes |
|-----------|---------|
| A1_Header | padding: 12px 48px |
| Bìa | padding: 88px 48px; gap: 60px |
| C2 Award grid | 2 columns |
| Footer | padding: 32px 48px |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| All | As specified above |

---

## Icon Specifications

| Icon Name | Node ID | Size | Color | Usage |
|-----------|---------|------|-------|-------|
| Logo (SAA) | I2167:9091;178:1033 | 52×48px | — | Header & Footer logo |
| VN Flag | I2167:9091;186:1696;186:1821;186:1709 | 24×24px | — | Language selector |
| Chevron Down | I2167:9091;186:1696;186:1821;186:1441 | 24×24px | white | Language dropdown toggle |
| Notification Bell | I2167:9091;186:2101;186:2020;186:1420 | 24×24px | white | Notifications |
| Account Avatar | I2167:9091;186:1597 | 40×40px | white | User menu |
| Arrow (↗) | in B3.1, B3.2 | 24×24px | dark/white | CTA button icon |
| Arrow (→) | in Chi tiết buttons | 20×20px | white | Detail link icon |
| Widget pencil/SAA | I5022:15169 | — | dark | Floating action button |

> All icons MUST be implemented as React Icon Components, not as `<img>` tags or inline SVG files.

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Nav link | background-color | 150ms | ease-in-out | Hover |
| B3 CTA buttons | background, color, border | 200ms | ease-out | Hover |
| Award card | transform (translateY), box-shadow | 200ms | ease-out | Hover |
| Widget button | box-shadow | 150ms | ease-in-out | Hover |
| Countdown digits | opacity | 300ms | ease-in-out | Value change |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|------------------|-----------------|
| Page | 2167:9026 | `relative w-full bg-bg-dark overflow-x-hidden` | `<HomePage />` |
| Header | 2167:9091 | `absolute top-0 w-full h-20 flex items-center justify-between px-36 py-3 bg-header-bg` | `<Header />` |
| Logo | I2167:9091;178:1033 | `w-[52px] h-[48px] cursor-pointer` | `<Logo />` |
| Nav link (normal) | I2167:9091;186:1593 | `px-4 py-4 rounded text-white font-bold text-sm` | `<NavLink />` |
| Nav link (selected) | I2167:9091;186:1579 | `px-4 py-4 text-accent-gold font-bold text-sm border-b border-accent-gold` | `<NavLink active />` |
| Keyvisual BG | 2167:9028 | `absolute inset-0 object-cover` | `<Image fill />` |
| Cover gradient | 2167:9029 | `absolute inset-0 bg-[linear-gradient(12deg,...)]` | `<div>` |
| Countdown section | 2167:9035 | `flex flex-col gap-4` | `<CountdownSection />` |
| Countdown timer | 2167:9037 | `flex flex-row gap-10` | `<Countdown />` |
| CTA buttons | 2167:9062 | `flex flex-row gap-10` | `<CTAButtons />` |
| B4 container | 3204:10152 | `flex flex-col items-center justify-center gap-8 px-[104px] py-[120px] rounded-lg` | `<B4Content />` |
| Award grid | 5005:14974 | `grid grid-cols-3 gap-x-[108px] gap-y-20 lg:grid-cols-3 md:grid-cols-2` | `<AwardGrid />` |
| Award card | 2167:9075 | `flex flex-col gap-6 w-[336px]` | `<AwardCard />` |
| Award card title | I2167:9075;214:1021 | `text-2xl font-normal text-accent-gold` | `<AwardCard>` title |
| Award card desc | I2167:9075;214:1022 | `text-base font-normal text-white tracking-[0.5px] line-clamp-2` | `<AwardCard>` description |
| C1 section header | 2167:9069 | `flex flex-col gap-4` | `<AwardsSectionHeader />` |
| C1 divider | 2167:9071 | `w-full h-px bg-divider` | `<hr>` |
| Footer nav link (About SAA 2025) | I5001:14800;342:1410 | `text-base font-bold text-white tracking-[0.15px]` | `<FooterNavLink href="/" />` |
| Footer nav link (Awards Information) | I5001:14800;342:1411 | `text-base font-bold text-white tracking-[0.15px]` | `<FooterNavLink href="/awards-information" />` |
| Footer nav link (Sun* Kudos) | I5001:14800;342:1412 | `text-base font-bold text-white tracking-[0.15px]` | `<FooterNavLink href="/sun-kudos" />` |
| Footer nav link (Tiêu chuẩn chung) | I5001:14800;1161:9487 | `text-base font-bold text-white tracking-[0.15px]` | `<FooterNavLink href="/tieu-chuan-chung" />` |
| Footer | 5001:14800 | `w-full flex justify-between items-center px-[90px] py-10 border-t border-divider` | `<Footer />` |

---

## Notes

- **Nav label discrepancy**: Figma renders the second nav item as "Award Information" (no 's') in the hover button character, but all design items consistently name it "Awards Information". **Use "Awards Information"** (with 's') in implementation — the Figma rendering appears to be a typo in one variant.
- **SVN-Gotham** is a custom/proprietary font used for the "KUDOS" logotype. It is NOT available via Google Fonts. Must be self-hosted in `/public/fonts/` if used as text, OR rendered as an image (recommended).
- **Digital Numbers** font for countdown digits is also a custom font. Must be self-hosted in `/public/fonts/` or use an alternative (e.g. `font-variant-numeric: tabular-nums` with Montserrat as fallback).
- **Montserrat** and **Montserrat Alternates** MUST be loaded via `next/font/google`.
- ROOT FURTHER hero text is rendered as an image (B.1_Key Visual) — not actual text.
- **B4 section** contains a second smaller ROOT FURTHER image (centered, 290×134px) above the paragraph text. This is inside a container with `padding: 120px 104px` and `border-radius: 8px`.
- **C1 section header has NO description text** — Figma confirmed: caption → 1px divider → heading. There is no "description" paragraph in this section. Do NOT implement one.
- **Award card title is gold (#FFEA9E), 24px/weight 400** — not white/bold. This is intentional branding.
- **Award card description is full white (100%)** — not white/70%. `letter-spacing: 0.5px`.
- **Footer nav links** use 16px/700/Montserrat/#FFFFFF — same font-size as body/copyright but different family (Montserrat vs Montserrat Alternates for copyright only).
- Countdown timer must update in real-time (client component with `setInterval`).
- "Coming soon" label must be hidden once the event time has passed.
- Award cards scroll to anchor `#award-slug` on Awards Information page when clicked.
- Widget button should be `position: fixed` in implementation (not absolute) so it stays on screen during scroll.
- Ensure WCAG AA compliance: white on #00101A ✅, #00101A on #FFEA9E ✅.

---

## Open Questions

The following design details could not be resolved from the Figma data and require clarification before implementation:

### Design / Visual

- **Q1 — Mobile hamburger menu appearance**: When nav links collapse to a hamburger on mobile (< 768px), what does the opened menu look like? Is it a full-screen overlay, a slide-in drawer, or a dropdown below the header? What items does it contain (just the same 3 nav links: About SAA 2025 / Awards Information / Sun* Kudos)?

- **Q2 — Notification badge visibility**: Should the red dot badge on A1.6 be hidden when the user has 0 unread notifications, or always visible regardless of count?

### Content

- **Q3 — B4 paragraph text**: The `B4_content` section contains a long Vietnamese paragraph describing the "ROOT FURTHER" spirit. What is the approved text content? Should it be stored as a static string, an i18n key, or fetched from a CMS?

### Technical / Behavior

- **Q4 — Widget button menu items**: Even if the menu content is Out of Scope, the toggle behavior needs to know what elements appear so the open/close animation can be designed correctly. What items (at minimum) does the quick-action menu contain?
