# Design Style: Login

**Frame ID**: `662:14387`
**Frame Name**: `Login`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=662:14387
**Extracted At**: 2026-03-23

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-bg-dark | #00101A | 100% | Page background, gradient anchor |
| --color-header-bg | #0B0F12 | 80% | Header bar background |
| --color-btn-login-bg | #FFEA9E | 100% | Login button background (yellow) |
| --color-btn-login-text | #00101A | 100% | Login button label text |
| --color-text-white | #FFFFFF | 100% | All white text on dark bg |
| --color-divider | #2E3940 | 100% | Footer top border |
| --color-gradient-left | linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0,16,26,0) 100%) | — | Left-to-right overlay on hero bg |
| --color-gradient-bottom | linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0) 51.74%) | — | Bottom-to-top overlay on hero bg |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-btn-language | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-btn-login | Montserrat | 22px | 700 | 28px | 0px |
| --text-hero-content | Montserrat | 20px | 700 | 40px | 0.5px |
| --text-footer | Montserrat Alternates | 16px | 700 | 24px | 0% |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-xs | 4px | Icon-text gap inside language button |
| --spacing-sm | 8px | Icon-text gap inside login button |
| --spacing-md | 16px | Button login padding-y; content block left padding |
| --spacing-lg | 24px | Button login padding-x; content block gap |
| --spacing-xl | 40px | Footer padding-y |
| --spacing-2xl | 80px | Hero inner column gap |
| --spacing-hero-px | 144px | Hero & header horizontal padding |
| --spacing-hero-py | 96px | Hero vertical padding |
| --spacing-footer-px | 90px | Footer horizontal padding |
| --spacing-header-py | 12px | Header vertical padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-sm | 4px | Language selector button |
| --radius-md | 8px | Login button |
| --border-footer | 1px solid #2E3940 | Footer top border |

### Shadows

No explicit drop-shadows defined in frame styles. Hover states (described below) use a subtle `transform: translateY(-2px)` lift effect per design specs.

---

## Layout Specifications

### Page Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 1440px | Desktop baseline |
| height | 1024px | Desktop baseline |
| background | #00101A | Dark navy |
| position | relative | Stacking context for abs children |

### Grid/Flex Layout

| Layer | Display | Direction | Notes |
|-------|---------|-----------|-------|
| A_Header | flex | row | space-between, 80px h, abs top |
| B_Bìa | flex | column | gap 120px, padding 96px 144px |
| Frame 487 (inner) | flex | column | gap 80px |
| Frame 550 (content) | flex | column | gap 24px, pl 16px |
| B.3_Login (wrapper, 662:14425) | flex | row | gap: 40px declared but single child — effectively unused |
| B.3_Login (button, 662:14426) | flex | row | justify-content: space-between; padding: 16px 24px |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────── 1440px ──────────────────────────────────────────────────────┐
│  A_Header  (position: absolute, top: 0, h: 80px, bg: rgba(11,15,18,0.8), px: 144px, py: 12px)                        │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │  A.1_Logo (52×56px)                                              A.2_Language (108×56px, radius: 4px)           │  │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                                       │
│  C_Keyvisual (position: absolute, full screen background image)                                                       │
│  Rectangle 57 (gradient overlay L→R: #00101A solid → transparent)                                                    │
│  Cover (gradient overlay B→T: #00101A 22% → transparent)                                                             │
│                                                                                                                       │
│  B_Bìa  (position: absolute, top: 88px, h: 845px, px: 144px, py: 96px, flex-col, gap: 120px)                        │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │  Frame 487  (1152×653px, flex-col, gap: 80px)                                                                   │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐    │  │
│  │  │  B.1_Key Visual  (451×200px) — "ROOT FURTHER" logo image                                                │    │  │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘    │  │
│  │                                                                                                                  │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐    │  │
│  │  │  Frame 550  (496×164px, flex-col, gap: 24px, pl: 16px)                                                  │    │  │
│  │  │  ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐  │    │  │
│  │  │  │  B.2_content (TEXT, 480×80px)                                                                      │  │    │  │
│  │  │  │  "Bắt đầu hành trình của bạn cùng SAA 2025."                                                       │  │    │  │
│  │  │  │  "Đăng nhập để khám phá!"                                                                          │  │    │  │
│  │  │  └────────────────────────────────────────────────────────────────────────────────────────────────────┘  │    │  │
│  │  │                                                                                                          │    │  │
│  │  │  ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐  │    │  │
│  │  │  │  B.3_Login  (305×60px, bg: #FFEA9E, radius: 8px, px: 24px, py: 16px, flex-row)                     │  │    │  │
│  │  │  │  [ "LOGIN With Google"  22px/700 #00101A ]  [ Google icon 24×24px ]                                │  │    │  │
│  │  │  └────────────────────────────────────────────────────────────────────────────────────────────────────┘  │    │  │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘    │  │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                                       │
│  D_Footer  (position: absolute, bottom: 0, h: 91px, px: 90px, py: 40px, border-top: 1px solid #2E3940)               │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │  "Bản quyền thuộc về Sun* © 2025"  (Montserrat Alternates 16px/700 #FFF, centered)                              │  │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A_Header — Navigation Header

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14391 | — |
| width | 1440px | `width: 100%` |
| height | 80px | `height: 80px` |
| padding | 12px 144px | `padding: 12px 144px` |
| background | rgba(11,15,18,0.8) | `background-color: rgba(11,15,18,0.8)` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| justify-content | space-between | `justify-content: space-between` |
| align-items | center | `align-items: center` |
| position | absolute | `position: absolute` |
| top | 0 | `top: 0` |
| z-index | 1 | `z-index: 1` |

---

### A.1_Logo — Site Logo

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14391;186:2166 | — |
| width | 52px | `width: 52px` |
| height | 56px | `height: 56px` |
| interaction | none | Non-interactive |

---

### A.2_Language — Language Selector

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I662:14391;186:1601 | — |
| width | 108px | `width: 108px` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| border-radius | 4px | `border-radius: 4px` |
| display | flex | `display: flex` |
| gap | 4px | `gap: 4px` |
| align-items | center | `align-items: center` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| color | #FFFFFF | `color: #FFFFFF` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Default | Transparent background |
| Hover | `background-color: rgba(255,255,255,0.08)`, cursor pointer |
| Focus | `outline: 2px solid #FFFFFF; outline-offset: 2px` |
| Active (dropdown open) | Chevron rotated 180°, `aria-expanded: true` |

**Linked frame (on click)**: `721:4942` (Dropdown-ngôn ngữ)

---

### B.1_Key Visual — ROOT FURTHER Logo Image

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14395 | — |
| width | 451px | `width: 451px` |
| height | 200px | `height: 200px` |
| type | Image | `next/image` (use `priority` for LCP) |
| object-fit | contain | `object-fit: contain` (logo — must not be cropped) |
| alt | `""` | Decorative; empty alt for screen readers |

---

### B.2_content — Hero Description Text

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14753 | — |
| width | 480px | `width: 480px` |
| height | 80px | `height: 80px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 20px | `font-size: 20px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 40px | `line-height: 40px` |
| letter-spacing | 0.5px | `letter-spacing: 0.5px` |
| color | #FFFFFF | `color: #FFFFFF` |
| text-align | left | `text-align: left` |

**Content** (2 lines):
- Line 1: `Bắt đầu hành trình của bạn cùng SAA 2025.`
- Line 2: `Đăng nhập để khám phá!`

---

### B.3_Login — Login with Google Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14425 / 662:14426 | — |
| width | 305px | `width: 305px` |
| height | 60px | `height: 60px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| cursor | pointer | `cursor: pointer` |

**Button Label:**
| Property | Value |
|----------|-------|
| text | `LOGIN With Google` |
| font-family | Montserrat |
| font-size | 22px |
| font-weight | 700 |
| line-height | 28px |
| color | #00101A |
| text-align | center |

**Google Icon:**
| Property | Value |
|----------|-------|
| Node ID | I662:14426;186:1766 (MM_MEDIA_Google) |
| width | 24px |
| height | 24px |

**States:**
| State | Changes |
|-------|---------|
| Default | `background: #FFEA9E` |
| Hover | `transform: translateY(-2px); box-shadow: 0 4px 12px rgba(255,234,158,0.3)` |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 3px` (keyboard nav) |
| Active (processing) | `opacity: 0.7; cursor: not-allowed; pointer-events: none` — spinner shown, label hidden |
| Disabled | `opacity: 0.5; cursor: not-allowed; pointer-events: none` |

**Loading Spinner (Active/processing state):**
| Property | Value |
|----------|-------|
| Size | 20×20px |
| Color | #00101A (dark, matches button text) |
| Animation | `spin` — 360° rotation, 0.8s linear infinite |
| Position | Centered inside the button, replacing the text+icon |
| Tailwind | `animate-spin w-5 h-5 border-2 border-[#00101A] border-t-transparent rounded-full` |

---

### E_ErrorMessage — OAuth Error Banner *(added in review)*

> Not explicitly in the Figma frame (it's an error state). Spec inferred from FR-006 and design token
> palette. Confirm exact visual with design team.

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | N/A (error state, not in Figma frame) | — |
| width | 100% (full-width banner) | `width: 100%` |
| position | absolute, below header | `position: absolute; top: 80px` |
| padding | 12px 144px | `padding: 12px 144px` (matches header px) |
| background | #EF4444 | `background-color: #EF4444` |
| color | #FFFFFF | `color: #FFFFFF` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 600 | `font-weight: 600` |
| line-height | 20px | `line-height: 20px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | space-between | `justify-content: space-between` |
| z-index | 10 | `z-index: 10` |

**Content**: `"Đăng nhập thất bại. Vui lòng thử lại sau."` (default message)
**Dismiss**: Close icon (×) on right; auto-dismiss after 5 seconds.

> **Open question**: Confirm with design team — banner (below header) or toast (top-right corner)?

---

### D_Footer — Copyright Footer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 662:14447 | — |
| width | 1440px | `width: 100%` |
| position | absolute | `position: absolute` |
| bottom | 0 | `bottom: 0` |
| padding | 40px 90px | `padding: 40px 90px` |
| border-top | 1px solid #2E3940 | `border-top: 1px solid #2E3940` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |

**Footer Text:**
| Property | Value |
|----------|-------|
| Node ID | I662:14447;342:1413 |
| text | `Bản quyền thuộc về Sun* © 2025` |
| font-family | Montserrat Alternates |
| font-size | 16px |
| font-weight | 700 |
| line-height | 24px |
| color | #FFFFFF |
| text-align | center |

---

## Component Hierarchy with Styles

```
Login Page (1440×1024px, bg: #00101A, position: relative)
├── C_Keyvisual  (position: absolute, full-screen bg image)
├── Rectangle 57  (position: absolute, gradient overlay left→right)
├── Cover  (position: absolute, gradient overlay bottom→top)
├── A_Header  (position: absolute, top: 0, h: 80px, bg: rgba(11,15,18,0.8), flex row space-between, px: 144px)
│   ├── A.1_Logo  (52×56px, non-interactive)
│   └── A.2_Language  (108×56px, radius: 4px, clickable → dropdown)
│       ├── VN Flag Icon  (24×24px)
│       ├── "VN" text  (Montserrat 16px/700 white)
│       └── Chevron Down icon  (24×24px)
├── B_Bìa  (position: absolute, top: 88px, 1440×845px, px: 144px, py: 96px, flex-col, gap: 120px)
│   └── Frame 487  (1152×653px, flex-col, gap: 80px)
│       ├── B.1_Key Visual  (451×200px, ROOT FURTHER logo image)
│       └── Frame 550  (496×164px, flex-col, gap: 24px, pl: 16px)
│           ├── B.2_content  (TEXT, 480×80px, Montserrat 20px/700 white)
│           └── B.3_Login  (305×60px, bg: #FFEA9E, radius: 8px, flex row space-between)
│               ├── "LOGIN With Google"  (Montserrat 22px/700 #00101A)
│               └── Google Icon  (24×24px)
└── D_Footer  (position: absolute, bottom: 0, px: 90px, py: 40px, border-top: 1px solid #2E3940)
    └── "Bản quyền thuộc về Sun* © 2025"  (Montserrat Alternates 16px/700 white, centered)
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
| A_Header | padding: 12px 16px |
| A.2_Language | Keep visible |
| B_Bìa | padding: 80px 16px; flex-col, gap: 40px |
| B.1_Key Visual | width: 100%; max-width: 280px |
| B.2_content | width: 100%; font-size: 16px; line-height: 28px |
| B.3_Login | width: 100%; font-size: 18px |
| D_Footer | padding: 20px 16px; font-size: 14px |

#### Tablet (768px–1023px)

| Component | Changes |
|-----------|---------|
| A_Header | padding: 12px 48px |
| B_Bìa | padding: 88px 48px; gap: 60px |
| B.1_Key Visual | width: 320px; height: auto |
| B.2_content | width: 100%; font-size: 18px |
| B.3_Login | width: 100%; max-width: 305px |
| D_Footer | padding: 32px 48px |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| All | As specified in design tokens above |
| A_Header | padding: 12px 144px |

---

## Icon Specifications

| Icon Name | Node ID | Size | Color | Usage |
|-----------|---------|------|-------|-------|
| VN Flag | I662:14391;186:1696;186:1821;186:1709 | 24×24px | — | Language selector flag |
| Chevron Down | I662:14391;186:1696;186:1821;186:1441 | 24×24px | white | Language dropdown toggle |
| Google | I662:14426;186:1766 (MM_MEDIA_Google) | 24×24px | — | Login button |

> All icons MUST be implemented as Icon Components, not as `<img>` tags or inline SVG files.

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| A.2_Language | background-color | 150ms | ease-in-out | Hover |
| A.2_Language chevron | transform (rotate 180°) | 150ms | ease-in-out | Dropdown open |
| B.3_Login | transform (translateY), box-shadow | 200ms | ease-out | Hover |
| B.3_Login | opacity | 150ms | ease-in-out | Disabled/loading |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind Classes | React Component |
|----------------|---------------|------------------|-----------------|
| Page | 662:14387 | `relative w-full h-screen bg-[#00101A] overflow-hidden` | `<LoginPage />` |
| Header | 662:14391 | `absolute top-0 w-full h-20 flex items-center justify-between px-36 py-3 bg-[rgba(11,15,18,0.8)]` | `<Header />` |
| Logo | I662:14391;186:2166 | `w-[52px] h-[56px]` | `<Logo />` |
| Language selector | I662:14391;186:1601 | `flex items-center gap-1 px-4 py-4 rounded cursor-pointer text-white font-bold text-base` | `<LanguageSelector />` |
| Hero section | 662:14393 | `absolute top-[88px] w-full px-36 py-24 flex flex-col gap-[120px]` | `<HeroSection />` |
| Key Visual | 662:14395 | `w-[451px] h-[200px] object-contain` | `<KeyVisual />` |
| Hero text | 662:14753 | `w-[480px] text-white font-bold text-xl leading-10 tracking-[0.5px]` | `<p>` |
| Login button | 662:14425 | `flex items-center justify-between px-6 py-4 bg-[#FFEA9E] rounded-lg cursor-pointer hover:-translate-y-0.5 transition-transform` | `<LoginButton />` |
| Footer | 662:14447 | `absolute bottom-0 w-full flex items-center justify-center px-[90px] py-10 border-t border-[#2E3940]` | `<Footer />` |

---

## Notes

- Font `Montserrat` and `Montserrat Alternates` MUST be loaded via `next/font/google`.
- **Constitution II compliance**: All colors and spacing values in the Implementation Mapping table
  shown as Tailwind arbitrary values (e.g., `bg-[#00101A]`) MUST be moved to the Tailwind config
  (`tailwind.config.ts`) as named tokens before implementation. Example:
  ```ts
  // tailwind.config.ts
  theme: { extend: { colors: { 'brand-dark': '#00101A', 'btn-login': '#FFEA9E', 'divider': '#2E3940' } } }
  ```
  Then use `bg-brand-dark`, `bg-btn-login`, `border-divider` in components.
- Ensure text contrast ratio meets WCAG AA (4.5:1): white (#FFF) on dark (#00101A) = ✅ >21:1.
- Button label `#00101A` on `#FFEA9E` = ✅ passes WCAG AA.
- Error message text `#FFFFFF` on `#EF4444` = ✅ passes WCAG AA (4.5:1).
- Background image (C_Keyvisual) MUST be loaded via `next/image` with `fill` layout and
  appropriate `sizes` for responsive handling.
- B.1_Key Visual (ROOT FURTHER logo) MUST use `object-fit: contain` (not `cover`) to avoid
  cropping the logo artwork.
- Google icon MUST come from the Icon Component library, not from an external CDN URL.
