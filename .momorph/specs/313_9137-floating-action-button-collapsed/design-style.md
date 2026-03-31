# Design Style: Floating Action Button - Collapsed State

**Frame ID**: `313:9137`
**Frame Name**: `Floating Action Button - phim nổi chức năng`
**Figma Link**: https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/313:9137
**Extracted At**: 2026-03-30

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-fab-bg | #FFEA9E | 100% | FAB button background |
| --color-page-bg | #00101A | 100% | Page background (dark) |
| --color-icon-text | #00101A | 100% | "/" divider text color |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-fab-divider | Montserrat | 24px | 700 | 32px | 0px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-fab-padding | 16px | Internal padding of FAB button |
| --spacing-fab-icon-gap | 8px | Gap between icons and divider |
| --spacing-fab-right | 19px | Distance from right edge |
| --spacing-fab-bottom | 130px | Distance from bottom edge (frame: 1024 - top:830 - height:64 = 130) |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-fab | 100px | Pill shape for collapsed FAB |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-fab | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | FAB elevation + golden glow |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| position | fixed | Always visible on viewport |
| bottom | 130px | From bottom of viewport (1024 - 830 - 64) |
| right | 19px | From right edge |
| z-index | 50+ | Above all page content |

### Layout Structure (ASCII)

```
┌─────────────────────────────────────────────────────────────────┐
│  Page (1440x1024, bg: #00101A)                                  │
│                                                                 │
│                                                                 │
│                                                                 │
│                                                                 │
│                                                                 │
│                                          ┌──────────────────┐   │
│                                          │  FAB (106x64)    │   │
│                                          │  bg: #FFEA9E     │   │
│                                          │  radius: 100px   │   │
│                                          │  ┌──┐ ┌─┐ ┌──┐  │   │
│                                          │  │✎│ │/│ │⚡│  │   │
│                                          │  │24│ │ │ │24│  │   │
│                                          │  └──┘ └─┘ └──┘  │   │
│                                          └──────────────────┘   │
│                                            shadow: golden glow  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Widget Button (FAB Container) - `313:9138`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:9138 | - |
| position | absolute (Figma) → fixed (impl) | `position: fixed` |
| right | 19px | `right: 19px` |
| bottom | 130px (derived: 1024 - 830 - 64) | `bottom: 130px` |
| display | flex | `display: flex` |
| align-items | flex-start (Figma) → center (impl) | `align-items: center` |
| box-shadow | 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 | `box-shadow: 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287` |

**States:**
| State | Changes |
|-------|---------|
| Default | box-shadow: 0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287 |
| Hover | box-shadow: 0 4px 8px 0 rgba(0,0,0,0.35), 0 0 10px 0 #FAE287 |
| Active | Expands to show options (transition to Frame 313:9139) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### FAB Button (Inner Pill) - `I313:9138;214:3839`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9138;214:3839 | - |
| width | 106px | `width: 106px` |
| height | 64px | `height: 64px` |
| padding | 16px | `padding: 16px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 100px | `border-radius: 100px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |
| cursor | pointer | `cursor: pointer` |

---

### Icon Container (A.1) - `I313:9138;214:3839;186:1935`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9138;214:3839;186:1935 | - |
| width | 42px | `width: 42px` |
| height | 32px | `height: 32px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |

---

### Pen Icon (A.1 icon) - `I313:9138;214:3839;186:1763`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9138;214:3839;186:1763 | - |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| Component ID | 214:3812 | MM_MEDIA_Pen |

---

### "/" Divider Text - `I313:9138;214:3839;186:1568`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9138;214:3839;186:1568 | - |
| width | 10px | `width: auto` |
| height | 32px | `height: 32px` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| text-align | center | `text-align: center` |
| color | #00101A | `color: #00101A` |
| content | "/" | - |

---

### Rules Icon (A.2) - `I313:9138;214:3839;186:1766`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9138;214:3839;186:1766 | - |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| Component ID | 214:3752 | MM_MEDIA (lightning/rules icon) |

---

## Component Hierarchy with Styles

```
Screen (bg: #00101A, position: relative)
└── Widget Button [313:9138] (position: fixed, bottom-right, shadow: golden glow)
    └── Button [I313:9138;214:3839] (w: 106px, h: 64px, bg: #FFEA9E, radius: 100px, p: 16px, flex, gap: 8px)
        ├── Icon Container [I313:9138;214:3839;186:1935] (w: 42px, h: 32px, flex, gap: 8px)
        │   ├── Pen Icon [I313:9138;214:3839;186:1763] (w: 24px, h: 24px)
        │   └── "/" Text [I313:9138;214:3839;186:1568] (Montserrat 700, 24px, color: #00101A)
        └── Rules Icon [I313:9138;214:3839;186:1766] (w: 24px, h: 24px)
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
| FAB | right: 16px, bottom: 80px (avoid mobile nav) |
| FAB size | Maintain 106x64px |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| FAB | right: 16px |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| FAB | right: 19px (as designed) |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| MM_MEDIA_Pen (214:3812) | 24x24 | Dark (inherits from context) | Represents "Viết KUDOS" action |
| MM_MEDIA Rules (214:3752) | 24x24 | Dark (inherits from context) | Represents "Thể lệ" action |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| FAB | box-shadow | 150ms | ease-in-out | Hover |
| FAB | transform (scale) | 200ms | ease-out | Click (expand to Frame 313:9139) |
| FAB | opacity | 200ms | ease-in-out | Appear/disappear |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| FAB Container | 313:9138 | `fixed bottom-[130px] right-[19px] z-50` | `<FloatingActionButton />` |
| FAB Button | I313:9138;214:3839 | `flex items-center gap-2 bg-[#FFEA9E] rounded-full px-4 py-4 cursor-pointer` | Inner button element |
| Pen Icon | I313:9138;214:3839;186:1763 | `w-6 h-6` | `<PenIcon />` |
| Divider | I313:9138;214:3839;186:1568 | `font-montserrat font-bold text-2xl text-[#00101A]` | `<span>/</span>` |
| Rules Icon | I313:9138;214:3839;186:1766 | `w-6 h-6` | `<RulesIcon />` |

---

## Notes

- All colors should use CSS variables for theming support
- Prefer Tailwind utility classes where project uses Tailwind
- Icons should be SVG for scalability
- Font should be loaded via Google Fonts or local files
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags.
- The golden glow shadow (#FAE287) is a key brand element — do not omit.
