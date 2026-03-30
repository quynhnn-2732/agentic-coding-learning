# Design Style: Sun* Kudos - Live Board

**Frame ID**: `2940:13431`
**Frame Name**: `Sun* Kudos - Live board`
**Figma Link**: [Open in Figma](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=2940:13431)
**Extracted At**: 2026-03-27

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-page-bg | #00101A | 100% | Page background |
| --color-primary-gold | #FFEA9E | 100% | Section titles, highlight borders, dividers, button bg |
| --color-card-bg | #FFF8E1 | 100% | Kudo post card background (feed & highlight) |
| --color-container-dark | #00070C | 100% | Stats & leaderboard card background |
| --color-border | #998C5F | 100% | Card borders, button borders, input borders |
| --color-divider | #2E3940 | 100% | Section dividers, horizontal rules |
| --color-text-white | #FFFFFF | 100% | Body text, nav links, counter text |
| --color-text-secondary | #999999 | 100% | Pagination text, timestamps, labels |
| --color-header-bg | #101417 | 80% | Header background (semi-transparent) |
| --color-btn-secondary-bg | #FFEA9E | 10% | Secondary button/input background |
| --color-btn-secondary-hover | #FFEA9E | 40% | Secondary button hover state |
| --color-heart-active | #FF0000 | 100% | Active heart icon |
| --color-heart-inactive | #999999 | 100% | Inactive heart icon |
| --color-kudo-logo | #DBD1C1 | 100% | KUDOS logo text |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-hero-title | Montserrat | 36px | 700 | 44px | 0 |
| --text-kudos-logo | SVN-Gotham | 139.78px | 400 | 34.95px | -13% |
| --text-section-title | Montserrat | 57px | 700 | 64px | -0.25px |
| --text-section-subtitle | Montserrat | 24px | 700 | 32px | 0 |
| --text-body | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-body-label | Montserrat | 16px | 700 | 24px | 0.5px |
| --text-pagination | Montserrat | 28px | 700 | 36px | 0 |
| --text-counter | Montserrat | 36px | 700 | 44px | 0 |
| --text-btn-large | Montserrat | 22px | 700 | 28px | 0 |
| --text-footer-copyright | Montserrat Alternates | 16px | 700 | 24px | 0 |
| --text-spotlight-name | Montserrat | 6.66px | 700 | 6.36px | 0.21px |
| --text-search-small | Montserrat | 10.92px | 500 | 16.38px | 0.1px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-page-x | 144px | Page horizontal padding (desktop) |
| --spacing-section-gap | 40px | Gap between major sections |
| --spacing-card-padding | 40px 40px 16px 40px | Kudo post card internal padding |
| --spacing-card-gap | 16px | Gap between elements inside card |
| --spacing-feed-gap | 24px | Gap between Kudo cards in feed |
| --spacing-sidebar-gap | 24px | Gap between sidebar cards |
| --spacing-stats-padding | 24px | Stats card internal padding |
| --spacing-stats-row-gap | 16px | Gap between stat rows |
| --spacing-header-padding | 12px 144px | Header padding |
| --spacing-footer-padding | 40px 90px | Footer padding |
| --spacing-highlight-card-padding | 24px 24px 16px 24px | Highlight card padding |
| --spacing-btn-pill-padding | 24px 16px | Pill button padding |
| --spacing-btn-filter-padding | 16px | Filter button padding |
| --spacing-nav-gap | 24px | Header nav link gap |
| --spacing-content-feed-sidebar | 80px | Gap between feed and sidebar columns |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-card | 24px | Kudo post cards (feed) |
| --radius-highlight-card | 16px | Highlight Kudo cards |
| --radius-stats-card | 17px | Stats and leaderboard cards |
| --radius-pill | 68px | Pill-shaped CTA buttons |
| --radius-spotlight | 47.14px | Spotlight board container |
| --radius-btn | 4px | Standard buttons (filter, nav) |
| --radius-btn-gift | 8px | "Mở quà" button |
| --radius-content-block | 12px | Content text blocks |
| --border-width | 1px | Default card/button borders |
| --border-highlight | 4px | Highlight card border |
| --border-spotlight | 1px | Spotlight container border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| (none) | — | Design uses borders and backgrounds instead of shadows |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Desktop design width |
| height | 5862px | Full page height |
| padding-x | 144px | Content area padding |
| content-width | 1152px | Effective content width (1440 - 2×144) |
| background | #00101A | Dark page background |

### Feed + Sidebar Layout

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Horizontal layout |
| flex-direction | row | Side-by-side |
| gap | 80px | Between feed and sidebar |
| feed-width | 680px | Left column |
| sidebar-width | 422px | Right column |
| padding-x | 144px | Same as container |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────┐
│ Page (w: 1440px, bg: #00101A)                                     │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ Header (w: 1440, h: 80, px: 144, bg: rgba(16,20,23,0.8))   │  │
│ │ [Logo 52×48] ←gap:64→ [Nav ×3 gap:24] ···· [Lang|Bell|Avt] │  │
│ └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ Keyvisual (w: 1440, h: 512) — Background artwork image       │  │
│ │ + gradient overlay (25deg, #00101A → transparent)             │  │
│ └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ A_KV Kudos (w: 1152, h: 160, px: 144)                        │  │
│ │ ┌──────────────────────────────────────────────┐              │  │
│ │ │ "Hệ thống ghi nhận và cảm ơn" (36px, gold)  │              │  │
│ │ │ [KUDOS logo 593×104 SVN-Gotham 139px]        │              │  │
│ │ └──────────────────────────────────────────────┘              │  │
│ │ ┌──────────────────────┐ ┌───────────────────┐                │  │
│ │ │ A.1 Ghi nhận (738×72)│ │ Search (381×72)   │                │  │
│ │ │ pill, border #998C5F │ │ pill, border same  │                │  │
│ │ └──────────────────────┘ └───────────────────┘                │  │
│ └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ B_Highlight (w: 1440, h: 786, gap: 40)                        │  │
│ │ ┌────────────────────────────────────────────────────────┐    │  │
│ │ │ B.1_header (w: 1440, h: 129, px: 144)                  │    │  │
│ │ │ "Sun* Annual Awards 2025" (24px) + hr + "HIGHLIGHT..."  │    │  │
│ │ │ [Hashtag btn] [Phòng ban btn]                           │    │  │
│ │ └────────────────────────────────────────────────────────┘    │  │
│ │ ┌────────────────────────────────────────────────────────┐    │  │
│ │ │ B.2 Carousel (w: 1440, h: 525) — 5 cards              │    │  │
│ │ │ [←] [Card 528w, border 4px gold, r:16] [→]            │    │  │
│ │ └────────────────────────────────────────────────────────┘    │  │
│ │ ┌────────────────────────────────────────────────────────┐    │  │
│ │ │ B.5 Pagination (w: 1440, h: 52, justify: center)       │    │  │
│ │ │ [← 48×48] ←gap:32→ "2/5" (28px) ←gap:32→ [→ 48×48]   │    │  │
│ │ └────────────────────────────────────────────────────────┘    │  │
│ └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ B.6 Header (w: 1440, h: 129, px: 144)                        │  │
│ │ "Sun* Annual Awards 2025" + hr + "SPOTLIGHT BOARD" (57px)     │  │
│ └──────────────────────────────────────────────────────────────┘  │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ B.7 Spotlight (w: 1157, h: 548, border 1px #998C5F, r:47)    │  │
│ │ ┌──────┐                                                      │  │
│ │ │388   │  [word cloud / avatar grid]                          │  │
│ │ │KUDOS │  [Search 219×39] [Pan/Zoom]                          │  │
│ │ └──────┘  [Ticker: "HH:MM user đã nhận Kudos mới"]           │  │
│ └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ C.1 Header (w: 1440, h: 129, px: 144)                        │  │
│ │ "Sun* Annual Awards 2025" + hr + "ALL KUDOS" (57px gold)      │  │
│ └──────────────────────────────────────────────────────────────┘  │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ Frame 502 (w: 1440, px: 144, gap: 80, flex-row)               │  │
│ │ ┌────────────────────┐ ┌──────────────────────────┐           │  │
│ │ │ C.2 Feed (w: 680)  │ │ D Sidebar (w: 422)       │           │  │
│ │ │ gap: 24             │ │ gap: 24                  │           │  │
│ │ │ ┌────────────────┐  │ │ ┌──────────────────────┐│           │  │
│ │ │ │ KudoPost card  │  │ │ │ D.1 Stats (p: 24)    ││           │  │
│ │ │ │ w:680, r:24    │  │ │ │ bg: #00070C, r: 17   ││           │  │
│ │ │ │ bg: #FFF8E1    │  │ │ │ border: 1px #998C5F  ││           │  │
│ │ │ │ p: 40 40 16 40 │  │ │ │ [6 stat rows]        ││           │  │
│ │ │ └────────────────┘  │ │ │ [Mở quà btn 374×60]  ││           │  │
│ │ │ (×4 cards)          │ │ └──────────────────────┘│           │  │
│ │ │                     │ │ ┌──────────────────────┐│           │  │
│ │ │                     │ │ │ D.3 Top 10 (p: 24)   ││           │  │
│ │ │                     │ │ │ bg: #00070C, r: 17   ││           │  │
│ │ │                     │ │ │ [10 sunner items]    ││           │  │
│ │ │                     │ │ └──────────────────────┘│           │  │
│ │ └────────────────────┘ └──────────────────────────┘           │  │
│ └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ Footer (w: 1440, p: 40px 90px, border-top: 1px #2E3940)      │  │
│ │ [Logo 69×64] ←gap:80→ [Nav ×4 gap:48] ··· "© 2025"          │  │
│ └──────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Header (Shared)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13433 | — |
| width | 1440px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(16, 20, 23, 0.8) | `background-color: rgba(16, 20, 23, 0.8)` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| position | sticky (top) | `position: sticky; top: 0; z-index: 50` |
| nav-gap | 24px | Nav links: `gap: 24px` |
| nav-link-font | Montserrat 16px/700/24px, white | `font-weight: 700` |
| logo-size | 52×48 | `width: 52px; height: 48px` |
| avatar-btn | 40×40, border: 1px #998C5F, radius: 4px | See button styles |

**Nav Link States:**
| State | Changes |
|-------|---------|
| Default | color: white; text-decoration: none |
| Hover | color: #FFEA9E |
| Active (current page) | color: #FFEA9E; border-bottom: 2px solid #FFEA9E ("Sun* Kudos" on this page) |

---

### A.1_Button ghi nhận (Primary CTA)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13449 | — |
| width | 738px | `width: 738px` (flex-grow in responsive) |
| height | 72px | `height: 72px` |
| padding | 24px 16px | `padding: 24px 16px` |
| background | rgba(255, 234, 158, 0.10) | `background: rgba(255, 234, 158, 0.10)` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 68px | `border-radius: 68px` |
| display | flex, gap: 8px | `display: flex; gap: 8px; align-items: center` |
| icon | Pen 24×24 | Left icon |
| text | Montserrat 16px/700/24px, white | Placeholder text |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(255, 234, 158, 0.40) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### Tìm kiếm sunner (Search Button)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13450 | — |
| width | 381px | `width: 381px` |
| height | 72px | `height: 72px` |
| padding | 24px 16px | `padding: 24px 16px` |
| background | rgba(255, 234, 158, 0.10) | Same as ghi nhận |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 68px | `border-radius: 68px` |
| icon | Search 24×24 | Left icon |
| text | Montserrat 16px/700/24px, white | Placeholder text |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(255, 234, 158, 0.40) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### B.1.1_ButtonHashtag / B.1.2_Button Phòng ban (Filter Buttons)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13459 / 2940:13460 | — |
| padding | 16px | `padding: 16px` |
| background | rgba(255, 234, 158, 0.10) | `background: rgba(255, 234, 158, 0.10)` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 4px | `border-radius: 4px` |
| gap | 8px (outer), 4px (inner) | `gap: 8px` |
| text | Montserrat 16px/700/24px, white | Label + chevron-down icon |
| icon | Down chevron 24×24 | Right side |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(255, 234, 158, 0.40) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |
| Active (filter applied) | background: rgba(255, 234, 158, 0.40); border-color: #FFEA9E |

---

### B.3_KUDO Highlight Card

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13465 | — |
| width | 528px | `width: 528px; flex-shrink: 0` |
| padding | 24px 24px 16px 24px | `padding: 24px 24px 16px 24px` |
| background | #FFF8E1 | `background-color: #FFF8E1` |
| border | 4px solid #FFEA9E | `border: 4px solid #FFEA9E` |
| border-radius | 16px | `border-radius: 16px` |
| gap | 16px | `gap: 16px` |
| display | flex, column | `display: flex; flex-direction: column` |
| content-width | 480px | Internal content area (528 - 2×24) |
| divider | 1px solid #FFEA9E | Between user info and content |
| user-info | 480×123, flex row, gap: 24px, justify: space-between | Sender → arrow → Receiver |
| time-text | Montserrat 16px/700/24px, ls: 0.5px, #999 | "10:00 - 10/30/2025" |
| hashtag-text | Montserrat 16px/700/24px, ls: 0.5px, #00101A | "#Dedicated #Inspiring..." |
| action-bar | 480×56, flex row, gap: 24px, justify: space-between | Hearts + Buttons |

**Highlight Card States:**
| State | Changes |
|-------|---------|
| Hover | box-shadow: 0 4px 16px rgba(255, 234, 158, 0.2); cursor: pointer |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### B.2.1 / B.2.2 Carousel Inline Arrows

Large arrows flanking the carousel cards (distinct from B.5 pagination arrows below).

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13468 (prev) / 2940:13470 (next) | — |
| size | ~56×56 (estimated from visual) | `width: 56px; height: 56px` |
| shape | Circle | `border-radius: 50%` |
| background | rgba(0, 0, 0, 0.3) | Semi-transparent dark |
| color | white | Arrow icon color |
| position | Vertically centered, flanking carousel | `position: absolute; top: 50%; transform: translateY(-50%)` |
| left arrow | left: 16px | `left: 16px` |
| right arrow | right: 16px | `right: 16px` |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(0, 0, 0, 0.5) |
| Disabled (first/last page) | opacity: 0.3; pointer-events: none |

---

### B.5_Pagination

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13471 | — |
| width | 1440px (full) | `width: 100%` |
| height | 52px | `height: 52px` |
| padding | 0 144px | `padding: 0 144px` |
| display | flex, center | `display: flex; justify-content: center; align-items: center` |
| gap | 32px | `gap: 32px` |
| btn-prev/next | 48×48, padding: 10px, radius: 4px | Arrow buttons |
| page-text | Montserrat 28px/700/36px, color: #999 | "2/5" |

**Arrow Button States:**
| State | Changes |
|-------|---------|
| Default | background: transparent; color: white |
| Hover | background: rgba(255, 234, 158, 0.10) |
| Disabled (first/last page) | opacity: 0.3; cursor: not-allowed; pointer-events: none |

---

### B.7_Spotlight Board

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:14174 | — |
| width | 1157px | `width: 1157px` |
| height | 548px | `height: 548px` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 47.14px | `border-radius: 47.14px` |
| overflow | hidden | `overflow: hidden` (contains images/canvas) |
| counter | Montserrat 36px/700/44px, white | "388 KUDOS" |
| search | 219×39, pill (r: 46.4px), border: 0.682px #998C5F | Mini search bar |

---

### C.3_KUDO Post Card (Feed)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 3127:21871 | — |
| width | 680px | `width: 680px` (fill container) |
| padding | 40px 40px 16px 40px | `padding: 40px 40px 16px 40px` |
| background | #FFF8E1 | `background-color: #FFF8E1` |
| border-radius | 24px | `border-radius: 24px` |
| gap | 16px | `gap: 16px` |
| display | flex, column | `display: flex; flex-direction: column` |
| content-width | 600px | Internal content area (680 - 2×40) |
| user-info | 600×123, flex row, gap: 24px, justify: space-between | Sender + Icon + Receiver |
| user-card | 235×123, flex column, gap: 13px, center | Avatar + Name + Dept + Stars |
| divider | 1px solid #FFEA9E | Between sections |
| time-text | Montserrat 16px/700/24px, ls: 0.5px, #999 | Timestamp |
| content-text | Montserrat (body), max 5 lines, overflow: ellipsis | Kudo message |
| content-block | border: 1px #FFEA9E, padding: 16px 24px, radius: 12px, bg: rgba(255,234,158,0.40) | Styled content container |
| images | 600×88, flex row, gap: 16px | Attached image thumbnails |
| hashtags | flex row, gap: ~30px | "#Dedicated #Inspiring..." |
| action-bar | 600×56, flex row, gap: 24px, justify: space-between | Hearts + Copy Link |
| hearts | flex row, gap: 4px, 101×32 | Heart icon + count |
| copy-link-btn | 145×56, padding: 16px, radius: 4px | "Copy Link" + icon |

**Kudo Card States:**
| State | Changes |
|-------|---------|
| Hover | cursor: pointer (on clickable areas: card body, avatars, names) |

**Heart Button States:**
| State | Changes |
|-------|---------|
| Default (not hearted) | icon: heart outline, color: #999999 |
| Active (hearted) | icon: heart filled, color: #FF0000 |
| Hover | transform: scale(1.1) |

**Copy Link Button States:**
| State | Changes |
|-------|---------|
| Default | background: transparent; color: inherit |
| Hover | background: rgba(255, 234, 158, 0.10) |
| Active (just copied) | brief flash: background: rgba(255, 234, 158, 0.20) |

---

### Category Tag (e.g., "IDOL GIỚI TRẺ")

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I2940:13465;1810:19718 (highlight) / I3127:21871;2234:33038 (feed) | — |
| display | inline-block | `display: inline-block` |
| font | Montserrat 16px/700/24px, ls: 0.5px | `font-weight: 700; font-size: 16px; line-height: 24px` |
| color (highlight) | #00101A | Dark text on gold context |
| color (feed) | #00101A | Dark text |
| position | Above content text, below time | Distinct from hashtag row at bottom |

---

### Video Play Button Overlay

| Property | Value | CSS |
|----------|-------|-----|
| icon | Play triangle | SVG icon component |
| size | ~48×48 | `width: 48px; height: 48px` |
| background | rgba(0, 0, 0, 0.5) | Semi-transparent dark circle |
| border-radius | 50% | `border-radius: 50%` |
| position | Centered on video thumbnail | `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)` |
| color | white | `color: white` |

---

### D.1_Stats Panel

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13489 | — |
| width | 422px (fill sidebar) | `width: 100%` |
| padding | 24px | `padding: 24px` |
| background | #00070C | `background-color: #00070C` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 17px | `border-radius: 17px` |
| display | flex, column | `display: flex; flex-direction: column` |
| gap | 10px (outer), 16px (rows) | `gap: 10px` |
| stat-row | 374×40, flex row, justify: space-between | Label + Value |
| stat-label | Montserrat 16px/400/24px, #FFFFFF | Left text: "Số Kudos bạn nhận được:" |
| stat-value | Montserrat 22px/700/28px, #FFEA9E | Right number: "25" (gold, bold) |
| stat-label-emoji | 16px inline | Heart emoji 👍 on "Số tim bạn nhận được" row |
| divider | 374×1, bg: #2E3940 | Between kudos stats and secret box stats |

---

### D.1.8_Button mở quà

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13497 | — |
| width | 374px | `width: 100%` |
| height | 60px | `height: 60px` |
| padding | 16px | `padding: 16px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex, center | `display: flex; align-items: center; justify-content: center` |
| text | Montserrat 22px/700/28px, #00101A | "Mở Secret Box" |
| icon | Gift icon 24×24 | Right of text |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: #FFE082 (slightly darker gold) |
| Active | background: #FFD54F |
| Disabled | opacity: 0.5, cursor: not-allowed |

---

### D.3_Top 10 SUNNER nhận quà

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13510 | — |
| width | 422px (fill sidebar) | `width: 100%` |
| padding | 24px 16px 24px 24px | `padding: 24px 16px 24px 24px` |
| background | #00070C | `background-color: #00070C` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 17px | `border-radius: 17px` |
| display | flex, column | `display: flex; flex-direction: column` |
| title | "10 SUNNER NHẬN QUÀ MỚI NHẤT" | Section heading |
| item-list | 382×456, flex column, gap: 16px | 10 sunner items |
| item | ❤️ icon (red) + avatar (circle) + name + gift description | Clickable row |
| item-icon | Heart icon, ~16px, color: #FF0000 | Left indicator |
| item-avatar | Circle, ~32px | User avatar |
| item-name | Montserrat 14px/700, white | "Huỳnh Dương Xuân" |
| item-desc | Montserrat 12px/400, #999 | "Nhận được 1 cá phòng SAA" |

**Leaderboard Item States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(255, 234, 158, 0.10); cursor: pointer |

---

### Footer (Shared)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 2940:13522 | — |
| width | 1440px | `width: 100%` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid var(--color-divider)` |
| display | flex, justify: space-between | `display: flex; justify-content: space-between; align-items: center` |
| logo | 69×64 | Footer logo |
| nav-gap | 48px | `gap: 48px` between nav links |
| copyright | Montserrat Alternates 16px/700/24px, white | "Bản quyền thuộc về Sun* © 2025" |

---

## Section Header Pattern

All section headers (B.1, B.6, C.1) share the same pattern:

| Property | Value | CSS |
|----------|-------|-----|
| width | 1440px | `width: 100%` |
| height | 129px | `height: 129px` |
| padding | 0 144px | `padding: 0 144px` |
| gap | 16px | `gap: 16px` |
| subtitle | Montserrat 24px/700/32px, white | "Sun* Annual Awards 2025" |
| divider | 1152×1, bg: #2E3940 | Horizontal rule |
| title | Montserrat 57px/700/64px, ls: -0.25px, gold #FFEA9E | Section name |

---

## Component Hierarchy with Styles

```
Screen (bg: #00101A, w: 1440)
├── Header (h: 80, px: 144, bg: rgba(16,20,23,0.8), sticky top)
│   ├── Logo (52×48)
│   ├── NavLinks (gap: 24, font: Montserrat 16px/700, white)
│   │   └── Active: "Sun* Kudos" (underline gold)
│   └── RightActions (gap: 16)
│       ├── Language (108×56)
│       ├── Notification (40×40)
│       └── Avatar (40×40, border: 1px #998C5F, r: 4)
│
├── Keyvisual (w: 1440, h: 512, bg-image + gradient overlay)
│
├── A_KV Kudos (w: 1152, h: 160, mx: 144)
│   ├── Title "Hệ thống ghi nhận và cảm ơn" (36px/700, gold)
│   └── KUDOS logo (593×104, SVN-Gotham 139px, #DBD1C1)
│
├── Button chức năng (mx: 144, flex-row)
│   ├── A.1_Ghi nhận (738×72, pill r:68, bg: gold/10%, border: #998C5F)
│   └── Tìm kiếm (381×72, pill r:68, same style)
│
├── B_Highlight (w: 1440, h: 786, gap: 40)
│   ├── B.1_header (w: 1440, h: 129, px: 144)
│   │   ├── Subtitle (24px, white)
│   │   ├── Divider (1152×1, #2E3940)
│   │   └── Title Row (flex, justify: space-between)
│   │       ├── "HIGHLIGHT KUDOS" (57px, gold)
│   │       └── Filters: [Hashtag btn] [Phòng ban btn]
│   ├── B.2_Carousel (w: 1440, h: 525)
│   │   ├── [←] Arrow
│   │   ├── B.3_Cards ×5 (528w, p: 24, bg: #FFF8E1, border: 4px gold, r: 16)
│   │   └── [→] Arrow
│   └── B.5_Pagination (h: 52, center, gap: 32)
│       ├── Prev (48×48)
│       ├── "2/5" (28px/700, #999)
│       └── Next (48×48)
│
├── B.6_Header "SPOTLIGHT BOARD" (w: 1440, h: 129, px: 144)
│
├── B.7_Spotlight (w: 1157, h: 548, border: 1px #998C5F, r: 47)
│   ├── Counter "388 KUDOS" (36px/700, white)
│   ├── Word cloud (canvas/interactive)
│   ├── Search (219×39, pill r:46)
│   └── Ticker (live activity line)
│
├── C.1_Header "ALL KUDOS" (w: 1440, h: 129, px: 144)
│
├── Frame 502 (w: 1440, px: 144, flex-row, gap: 80)
│   ├── C.2_Feed (w: 680, gap: 24, flex-col)
│   │   └── KudoPost ×N (w: 680, p: 40/40/16/40, bg: #FFF8E1, r: 24)
│   │       ├── UserInfo (600×123, flex-row, gap: 24)
│   │       ├── Divider (600×1, #FFEA9E)
│   │       ├── Content (600, gap: 16)
│   │       │   ├── Time (16px, #999)
│   │       │   ├── Hashtag label (16px, #00101A)
│   │       │   ├── Text block (p: 16 24, bg: gold/40%, r: 12)
│   │       │   ├── Images (gap: 16, 88h thumbnails)
│   │       │   └── Hashtags (gap: ~30)
│   │       ├── Divider (600×1, #FFEA9E)
│   │       └── Actions (600×56, flex-row, justify: space-between)
│   │           ├── Hearts (gap: 4, 101×32)
│   │           └── CopyLink (145×56, p: 16, r: 4)
│   │
│   └── D_Sidebar (w: 422, gap: 24, flex-col)
│       ├── D.1_Stats (p: 24, bg: #00070C, border: 1px #998C5F, r: 17)
│       │   ├── Stat rows ×3 (374×40, flex-row, justify: space-between)
│       │   ├── Divider (374×1, #2E3940)
│       │   ├── Stat rows ×2
│       │   └── Button mở quà (374×60, bg: #FFEA9E, r: 8, 22px/700 #00101A)
│       └── D.3_Top10 (p: 24 16 24 24, bg: #00070C, border: 1px #998C5F, r: 17)
│           ├── Title (bold)
│           └── Items ×10 (avatar + name + desc, gap: 16)
│
└── Footer (w: 1440, p: 40 90, border-top: 1px #2E3940)
    ├── Logo (69×64)
    ├── NavLinks ×4 (gap: 48)
    └── Copyright (Montserrat Alternates 16px/700, white)
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
| Container | padding: 16px |
| Header | padding: 12px 16px; hamburger menu replaces nav links |
| A.1_Ghi nhận | width: 100% |
| Tìm kiếm | width: 100%; stack below Ghi nhận |
| B_Highlight | Single card carousel, full-width |
| B.7_Spotlight | width: 100%, reduced height |
| C.2 + D layout | Single column; D sidebar moves below C.2 feed |
| C.3 KudoPost | width: 100%, padding: 24px 16px 12px 16px |
| D.1/D.3 | width: 100% |
| Footer | Stack vertically, padding: 24px 16px |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Container | padding: 48px |
| Feed + Sidebar | Two-column at reduced widths; gap: 32px |
| B_Highlight | 2-3 visible cards |
| B.7_Spotlight | Scaled proportionally |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| Container | max-width: 1440px, margin: 0 auto |
| All components | Use Figma design values as specified |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| Pen icon | 24×24 | white | A.1 Ghi nhận button prefix |
| Search icon | 24×24 | white | Search button prefix |
| Search icon (small) | 16×16 | white | B.7.3 Spotlight search |
| Down chevron | 24×24 | white | Filter dropdown suffix |
| Left arrow | 28×28 | white | Carousel/pagination prev |
| Right arrow | 28×28 | white | Carousel/pagination next |
| Heart (filled) | 32px | #FF0000 | Active heart state |
| Heart (outline) | 32px | #999999 | Inactive heart state |
| Copy link icon | 24×24 | inherit | Copy link button |
| Sent arrow | 32×32 | inherit | Between sender & receiver |
| Gift icon | 24×24 | #00101A | "Mở quà" button |
| Play button | 48×48 | white on rgba(0,0,0,0.5) | Video attachment overlay |
| Pan/Zoom | — | white | Spotlight board control |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Pill buttons | background-color | 150ms | ease-in-out | Hover |
| Filter buttons | background-color | 150ms | ease-in-out | Hover |
| Heart icon | color, transform | 200ms | ease-out | Click (scale bounce) |
| Carousel | transform (translateX) | 300ms | ease-in-out | Prev/Next click |
| Ticker | transform (translateY) | 500ms | ease-in | New entry |
| Spotlight names | opacity, scale | 300ms | ease-out | New Kudo received |
| Toast notification | opacity, translateY | 200ms | ease-out | Copy link success |
| "Mở quà" button | background-color | 150ms | ease-in-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Page container | 2940:13431 | `bg-[#00101A] min-h-screen` | `<SunKudosPage>` |
| Header | 2940:13433 | `sticky top-0 z-50 bg-[#101417]/80 backdrop-blur` | `<Header>` (shared) |
| Keyvisual | 2940:13432 | `w-full h-[512px] bg-cover relative` | `<Keyvisual>` |
| A_KV Kudos | 2940:13437 | `px-[144px] flex flex-col gap-2.5` | `<KudosBanner>` |
| A.1_Ghi nhận | 2940:13449 | `rounded-[68px] border border-[#998C5F] bg-[#FFEA9E]/10 px-4 py-6 h-[72px]` | `<KudosWriteButton>` |
| Search sunner | 2940:13450 | Same pill style as above | `<SearchSunnerButton>` |
| B_Highlight | 2940:13451 | `w-full flex flex-col gap-10` | `<HighlightKudos>` |
| B.1.1 Hashtag filter | 2940:13459 | `rounded border border-[#998C5F] bg-[#FFEA9E]/10 p-4` | `<FilterDropdown variant="hashtag">` |
| B.1.2 Dept filter | 2940:13460 | Same as hashtag filter | `<FilterDropdown variant="department">` |
| B.3_Highlight Card | 2940:13465 | `w-[528px] rounded-2xl border-4 border-[#FFEA9E] bg-[#FFF8E1] p-6` | `<HighlightKudoCard>` |
| B.5_Pagination | 2940:13471 | `flex justify-center items-center gap-8` | `<CarouselPagination>` |
| B.6_Header | 2940:13476 | Section header pattern | `<SectionHeader title="SPOTLIGHT BOARD">` |
| B.7_Spotlight | 2940:14174 | `rounded-[47px] border border-[#998C5F] overflow-hidden` | `<SpotlightBoard>` |
| C.1_Header | 2940:14221 | Section header pattern | `<SectionHeader title="ALL KUDOS">` |
| C.3_KUDO Post | 3127:21871 | `w-[680px] rounded-3xl bg-[#FFF8E1] p-10 pt-10 pb-4` | `<KudoPostCard>` |
| D.1_Stats | 2940:13489 | `rounded-[17px] border border-[#998C5F] bg-[#00070C] p-6` | `<KudosStatsPanel>` |
| D.1.8_Mở quà | 2940:13497 | `w-full h-[60px] rounded-lg bg-[#FFEA9E] text-[#00101A] font-bold` | `<OpenGiftButton>` |
| D.3_Top 10 | 2940:13510 | `rounded-[17px] border border-[#998C5F] bg-[#00070C] p-6` | `<TopSunnerLeaderboard>` |
| Category Tag | I2940:13465;1810:19718 | `font-bold text-base text-[#00101A]` | `<CategoryTag>` |
| Video Play Overlay | — | `absolute inset-0 flex items-center justify-center` | `<VideoPlayOverlay>` |
| B.2 Carousel Arrows | 2940:13468/2940:13470 | `absolute top-1/2 -translate-y-1/2 rounded-full bg-black/30` | `<CarouselArrow>` |
| Footer | 2940:13522 | `border-t border-[#2E3940] px-[90px] py-10` | `<Footer>` (shared) |

---

## Notes

- All colors should use CSS variables defined in Tailwind config for theming support.
- Prefer Tailwind utility classes; custom CSS only for carousel animations, word cloud canvas, and ticker transitions.
- Icons MUST be implemented as Icon Components (React SVG), not img tags.
- Font Montserrat and Montserrat Alternates must be loaded (Google Fonts or local).
- SVN-Gotham is used only for the KUDOS logo — consider using a pre-rendered image if font licensing is an issue.
- Ensure gold (#FFEA9E) on dark (#00101A) meets WCAG AA contrast ratio (4.5:1 for normal text).
- The Spotlight Board word cloud may require a canvas-based renderer (e.g., D3.js or HTML5 Canvas) for performance with many names.

### Constitution Compliance

- **Tailwind Config Tokens**: The inline arbitrary values in the Implementation Mapping (e.g., `bg-[#00101A]`) are for illustration only. All design tokens from this document MUST be added to the Tailwind config as named tokens per Constitution Principle II. Example: `--color-page-bg: #00101A` → `theme.extend.colors.kudos['page-bg']`.
- **Mobile-First**: This document specifies desktop Figma values. Implementation MUST invert to mobile-first: base styles target mobile, then `md:` for tablet, `lg:` for desktop per Constitution Principle IV.
- **Touch Targets**: All interactive elements (buttons, links, carousel arrows) MUST be ≥ 44×44px on mobile per Constitution Principle IV. The 48×48 pagination arrows already comply; filter buttons and nav links may need padding adjustments on mobile.
