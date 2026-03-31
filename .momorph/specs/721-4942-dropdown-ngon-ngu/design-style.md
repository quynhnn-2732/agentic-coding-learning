# Design Style: Dropdown Ngon Ngu (Language Selector)

**Frame ID**: `721:4942`
**Frame Name**: `Dropdown-ngon-ngu`
**Figma Link**: [Link](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=721:4942)
**Extracted At**: 2026-03-31

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dropdown-bg | #00070C | 100% | Dropdown container background (`var(--Details-Container-2)`) |
| --color-dropdown-border | #998C5F | 100% | Dropdown border (`var(--Details-Border)`) |
| --color-option-selected-bg | #FFEA9E | 20% | Selected language option background |
| --color-option-text | #FFFFFF | 100% | Language code text (VN, EN) |
| --color-frame-bg | #696969 | 100% | Outer frame background (design canvas only, not used in implementation) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-lang-code | Montserrat | 16px | 700 (Bold) | 24px | 0.15px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-dropdown-padding | 6px | Dropdown container internal padding |
| --spacing-option-padding | 16px | Language option internal padding (all sides) |
| --spacing-icon-text-gap | 4px | Gap between flag icon and language code text |
| --spacing-icon-label-gap | 2px | Inner button content gap |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-dropdown | 8px | Dropdown container border-radius |
| --radius-option | 4px | Language option border-radius |
| --radius-option-selected | 2px | Selected option outer border-radius |
| --border-dropdown | 1px solid #998C5F | Dropdown container border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-dropdown | 0 10px 15px rgba(0,0,0,0.1) | Dropdown elevation shadow (**predicted** — not in Figma data, apply if needed for visual separation) |

---

## Layout Specifications

### Dropdown Container

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Column layout |
| flex-direction | column | Options stacked vertically |
| padding | 6px | Internal padding around options |
| background | #00070C | Dark background |
| border | 1px solid #998C5F | Gold border |
| border-radius | 8px | Rounded corners |
| position | absolute | Positioned relative to trigger |
| z-index | 20 | Above page content |

### Language Option (Each)

| Property | Value | Notes |
|----------|-------|-------|
| width | 108-110px | Option width (VN=108px, EN=110px in Figma — normalize to 110px in implementation) |
| height | 56px | Option height |
| display | flex | Row layout |
| flex-direction | row | Horizontal: icon + text |
| align-items | center | Vertically centered |
| padding | 16px | All sides |
| justify-content | space-between | Spread content |
| border-radius | 4px | Subtle rounding |

### Layout Structure (ASCII)

```
┌─────────────────────────────────────────┐
│  Dropdown Container (p: 6px)             │
│  bg: #00070C, border: 1px solid #998C5F  │
│  border-radius: 8px                      │
│  ┌─────────────────────────────────────┐ │
│  │  Option VN (SELECTED)               │ │
│  │  w: 108px, h: 56px, p: 16px         │ │
│  │  bg: rgba(255,234,158,0.2)          │ │
│  │  border-radius: 2px                 │ │
│  │  ┌──────┐  ┌────┐                  │ │
│  │  │ 🇻🇳   │  │ VN │ (16px/700/white) │ │
│  │  │24x24 │  │    │                  │ │
│  │  └──────┘  └────┘                  │ │
│  │  gap: 4px                           │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  ┌─────────────────────────────────────┐ │
│  │  Option EN (DEFAULT)                │ │
│  │  w: 110px, h: 56px, p: 16px         │ │
│  │  bg: transparent                    │ │
│  │  border-radius: 0px                 │ │
│  │  ┌──────┐  ┌────┐                  │ │
│  │  │ 🇬🇧   │  │ EN │ (16px/700/white) │ │
│  │  │24x24 │  │    │                  │ │
│  │  └──────┘  └────┘                  │ │
│  │  gap: 4px                           │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## Component Style Details

### Trigger Button (Collapsed State — NOT in Figma frame, extracted from existing header)

> **Note**: Frame 721:4942 only shows the expanded dropdown panel. The trigger button styling is derived from the existing `LanguageSelector` component in `HomepageHeader` (`src/app/_components/homepage/header.tsx`).

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 4px | `gap: 4px` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 20px | `line-height: 20px` |
| letter-spacing | 0.1px | `letter-spacing: 0.1px` |
| color | #FFFFFF | `color: white` |
| border-radius | 2px | `border-radius: 2px` |

**States:**
| State | Changes |
|-------|---------|
| Hover | `background: rgba(255, 255, 255, 0.1)` |
| Focus | `outline: 2px solid #FFEA9E`, `border-radius: 2px` |

**Children**: `FlagIcon (24x24)` + `Label "VN"/"EN"` + `ChevronDownIcon (24x24, rotates 180deg when open)`

---

### Dropdown Container (`A_Dropdown-List`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `525:11713` | — |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| padding | 6px | `padding: 6px` |
| background | #00070C | `background: var(--Details-Container-2, #00070C)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| border-radius | 8px | `border-radius: 8px` |
| position | absolute | `position: absolute` |
| align-items | flex-start | `align-items: flex-start` |

**Component ID**: `362:6179` (instance of component set `563:8216`)

---

### Language Option - VN Selected (`A.1_tieng Viet`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I525:11713;362:6085` | — |
| width | 108px | `width: 108px` |
| height | 56px | `height: 56px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| border-radius | 2px | `border-radius: 2px` |
| background | rgba(255, 234, 158, 0.2) | `background: rgba(255, 234, 158, 0.2)` |

**Inner Button** (Node `I525:11713;362:6085;186:1821`):

| Property | Value | CSS |
|----------|-------|-----|
| padding | 16px | `padding: 16px` |
| gap | 2px | `gap: 2px` |
| justify-content | space-between | `justify-content: space-between` |
| border-radius | 4px | `border-radius: 4px` |

**Content Frame** (Node `I525:11713;362:6085;186:1821;186:1937`):

| Property | Value | CSS |
|----------|-------|-----|
| width | 53px | `width: 53px` |
| height | 24px | `height: 24px` |
| gap | 4px | `gap: 4px` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |

**Flag Icon** (Node `I525:11713;362:6085;186:1821;186:1709`):
- Size: 24x24px (icon frame), inner flag: 20x15px
- Component: `VnFlagIcon` (component ID `178:1019`)

**Text "VN"** (Node `I525:11713;362:6085;186:1821;186:1439`):

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| text-align | center | `text-align: center` |
| color | #FFFFFF | `color: white` |

**Component ID**: `186:1692` (instance of set `186:1695`)

---

### Language Option - EN Default (`A.2_tieng Anh`)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I525:11713;362:6128` | — |
| width | 110px | `width: 110px` |
| height | 56px | `height: 56px` |
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| border-radius | 0px | `border-radius: 0px` |
| background | transparent | (no background) |

**Inner Button** (Node `I525:11713;362:6128;186:1903`):

| Property | Value | CSS |
|----------|-------|-----|
| padding | 16px | `padding: 16px` |
| justify-content | space-between | `justify-content: space-between` |
| border-radius | 4px | `border-radius: 4px` |

**Content Frame** (Node `I525:11713;362:6128;186:1903;186:1937`):

| Property | Value | CSS |
|----------|-------|-----|
| width | 52px | `width: 52px` |
| height | 24px | `height: 24px` |
| gap | 4px | `gap: 4px` |

**Flag Icon** (Node `I525:11713;362:6128;186:1903;186:1709`):
- Size: 24x24px (icon frame), inner flag: 20x15px
- Component: `GbFlagIcon` (component ID `178:967`)

**Text "EN"** (Node `I525:11713;362:6128;186:1903;186:1439`):

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| text-align | center | `text-align: center` |
| color | #FFFFFF | `color: white` |

**Component ID**: `186:1694` (instance of set `186:1695`)

---

### States

| State | Component | Property | Value |
|-------|-----------|----------|-------|
| **Selected** | Language Option | background | `rgba(255, 234, 158, 0.2)` |
| **Selected** | Language Option | border-radius | `2px` |
| **Default** | Language Option | background | `transparent` |
| **Default** | Language Option | border-radius | `0px` |
| **Hover** | Language Option | background | `rgba(255, 234, 158, 0.1)` (predicted) |
| **Hover** | Language Option | cursor | `pointer` |
| **Focus** | Language Option | outline | `2px solid #FFEA9E`, offset `2px` |

---

## Component Hierarchy with Styles

```
LanguageSelector (relative container)
├── Trigger Button (flex, items-center, gap-1)
│   ├── FlagIcon (24x24)
│   ├── Label "VN"/"EN" (Montserrat 14px/700, white)
│   └── ChevronDownIcon (24x24, rotate-180 when open)
│
└── Dropdown Panel (absolute, top-full, right-0, z-20)
    │  bg: #00070C, border: 1px solid #998C5F
    │  border-radius: 8px, p: 6px
    │
    ├── Option VN (w: 108px, h: 56px, p: 16px, flex, items-center)
    │   │  selected: bg rgba(255,234,158,0.2), rounded-sm
    │   ├── VnFlagIcon (24x24)
    │   └── "VN" (Montserrat 16px/700/white, tracking: 0.15px)
    │
    └── Option EN (w: 110px, h: 56px, p: 16px, flex, items-center)
        │  default: bg transparent
        ├── GbFlagIcon (24x24)
        └── "EN" (Montserrat 16px/700/white, tracking: 0.15px)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | --- |

### Responsive Changes

The dropdown is compact and does not change across breakpoints. The trigger button and dropdown panel remain the same size.

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Dropdown Panel | Same styling — positioned absolute right-0 |
| Touch targets | Each option is 56px tall (> 44px minimum) |

#### Tablet & Desktop (>= 768px)

| Component | Changes |
|-----------|---------|
| No changes | Dropdown is identical across all breakpoints |

---

## Icon Specifications

| Icon Name | Size | Color | Usage | Node/Component ID |
|-----------|------|-------|-------|-------------------|
| VnFlagIcon | 24x24 (flag: 20x15) | Multicolor (flag) | Vietnam flag in VN option | `178:1019` (set `178:1020`) |
| GbFlagIcon | 24x24 (flag: 20x15) | Multicolor (flag) | UK flag in EN option | `178:967` (set `178:1020`) |
| ChevronDownIcon | 24x24 | #FFFFFF | Dropdown trigger indicator | (existing) |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Dropdown Panel | opacity, transform(translateY) | 150ms | ease-out | Open |
| Dropdown Panel | opacity, transform(translateY) | 100ms | ease-in | Close |
| ChevronDown | transform(rotate) | 150ms | ease-in-out | Toggle |
| Option hover | background-color | 150ms | ease-in-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Trigger Button | (header) | `flex items-center gap-1 font-montserrat font-bold text-sm leading-5 tracking-[0.1px] text-white rounded-sm hover:bg-white/10` | `<button>` inside `LanguageSelector` |
| Dropdown Container | `525:11713` | `absolute right-0 top-full p-1.5 bg-[var(--Details-Container-2,#00070C)] border border-[var(--Details-Border,#998C5F)] rounded-lg z-20` | `<ul role="listbox">` inside `LanguageSelector` |
| Option VN (selected) | `I525:11713;362:6085` | `w-[110px] h-14 p-4 flex items-center gap-1 rounded-sm bg-[rgba(255,234,158,0.2)]` | `<li role="option" aria-selected="true">` |
| Option EN (default) | `I525:11713;362:6128` | `w-[110px] h-14 p-4 flex items-center gap-1` | `<li role="option" aria-selected="false">` |
| VN Flag | `178:1019` | `w-6 h-6` | `<VnFlagIcon size={24} />` |
| GB Flag | `178:967` | `w-6 h-6` | `<GbFlagIcon size={24} />` (NEW — needs creation) |
| Lang Code Text | `I525:...;186:1439` | `font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white text-center` | `<span>` |

---

## Notes

- All colors should use CSS variables where project tokens exist (e.g., `var(--Details-Container-2)`, `var(--Details-Border)`).
- Flag icons MUST be SVG icon components per constitution (no `<img>` tags).
- The `GbFlagIcon` component needs to be created — `VnFlagIcon` already exists at `src/app/_components/icons/vn-flag-icon.tsx`.
- Font: Montserrat is already loaded globally via `next/font/google` in `layout.tsx`.
- The dropdown dimensions are compact (~120px wide) and do not need responsive adjustments.
