# Design Style: Dropdown Profile

**Frame ID**: `721:5223`
**Frame Name**: `Dropdown-profile`
**Figma Link**: https://www.figma.com/file/9ypp4enmFmdK3YAFJLIu6C?node-id=721:5223
**Extracted At**: 2026-03-31

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dropdown-bg | #00070C | 100% | Dropdown container background (var: Details-Container-2) |
| --color-dropdown-border | #998C5F | 100% | Dropdown border (var: Details-Border) |
| --color-profile-item-bg | #FFEA9E | 10% | Profile menu item background highlight |
| --color-text-primary | #FFFFFF | 100% | Menu item text (var: Details-Text-Secondary-1) |
| --color-text-glow | #FAE287 | — | Text glow effect color |
| --color-overlay-bg | #696969 | 100% | Background overlay behind dropdown |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-menu-item | Montserrat | 16px | 700 | 24px (150%) | 0.15px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-dropdown-padding | 6px | Dropdown container internal padding |
| --spacing-item-padding | 16px | Menu item internal padding |
| --spacing-item-gap | 4px | Gap between icon and label inside menu item |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-dropdown | 8px | Dropdown container border radius |
| --radius-item | 4px | Menu item border radius |
| --border-dropdown | 1px solid #998C5F | Dropdown container border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-text-glow | 0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287 | Profile text glow effect |

---

## Layout Specifications

### Container (Dropdown)

| Property | Value | Notes |
|----------|-------|-------|
| width | 215px | Frame width |
| height | 304px | Frame height (including overlay area) |
| background | rgba(105, 105, 105, 1) | Overlay/dimmed background |

### Dropdown List Container

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Flex container |
| flex-direction | column | Vertical stack |
| width | auto (hug content) | Approx ~133px based on item widths + padding. In implementation, use `width: auto` |
| padding | 6px | Internal padding |
| background | #00070C | Dark background |
| border | 1px solid #998C5F | Gold border |
| border-radius | 8px | Rounded corners |
| z-index | 50 | Above page content, below modals |
| position | absolute | Positioned relative to trigger |

### Overlay

| Property | Value | Notes |
|----------|-------|-------|
| position | fixed | Covers entire viewport |
| inset | 0 | Full coverage |
| background | transparent | Invisible click target (bg: #696969 in Figma is for design context only) |
| z-index | 49 | Below dropdown, above page content |

### Layout Structure (ASCII)

```
┌─────────────────────────────────────────────────────┐
│  Overlay Background (215x304, bg: #696969)          │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  Dropdown Container (padding: 6px)             │  │
│  │  bg: #00070C, border: 1px solid #998C5F        │  │
│  │  border-radius: 8px                            │  │
│  │                                                │  │
│  │  ┌─────────────────────────────────────────┐   │  │
│  │  │  Profile Item (119x56, padding: 16px)    │   │  │
│  │  │  bg: rgba(255,234,158, 0.1)              │   │  │
│  │  │  border-radius: 4px                      │   │  │
│  │  │  ┌──────────┐  ┌──────┐                  │   │  │
│  │  │  │ "Profile" │  │ Icon │                  │   │  │
│  │  │  │  16px/700 │  │24x24 │                  │   │  │
│  │  │  └──────────┘  └──────┘                  │   │  │
│  │  └─────────────────────────────────────────┘   │  │
│  │                                                │  │
│  │  ┌─────────────────────────────────────────┐   │  │
│  │  │  Logout Item (121x56, padding: 16px)     │   │  │
│  │  │  bg: transparent                         │   │  │
│  │  │  border-radius: 4px                      │   │  │
│  │  │  ┌──────────┐  ┌──────┐                  │   │  │
│  │  │  │ "Logout"  │  │ Icon │                  │   │  │
│  │  │  │  16px/700 │  │24x24 │                  │   │  │
│  │  │  └──────────┘  └──────┘                  │   │  │
│  │  └─────────────────────────────────────────┘   │  │
│  │                                                │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Component Style Details

### A. Dropdown List Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `666:9601` | - |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| padding | 6px | `padding: 6px` |
| background | #00070C | `background-color: var(--Details-Container-2, #00070C)` |
| border | 1px solid #998C5F | `border: 1px solid var(--Details-Border, #998C5F)` |
| border-radius | 8px | `border-radius: 8px` |
| align-items | flex-start | `align-items: flex-start` |

**Component Set ID**: `563:8216`

---

### A.1. Profile Menu Item

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I666:9601;563:7844` | - |
| width | 119px | `width: 119px` |
| height | 56px | `height: 56px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| justify-content | flex-start | `justify-content: flex-start` |
| padding | 16px | `padding: 16px` |
| background | rgba(255, 234, 158, 0.1) | `background-color: rgba(255, 234, 158, 0.1)` |
| border-radius | 4px | `border-radius: 4px` |
| gap | 4px | `gap: 4px` |

**Text "Profile":**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I666:9601;563:7844;186:1497` | - |
| color | #FFFFFF | `color: var(--Details-Text-Secondary-1, #FFF)` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px (150%) | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| text-align | center | `text-align: center` |
| text-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | `text-shadow: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` |

**Icon (User):**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I666:9601;563:7844;186:1498` | - |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| Component ID | `186:1611` | - |
| Component Set ID | `178:1020` | - |

**States:**
| State | Property | Value |
|-------|----------|-------|
| Default (Active) | background | rgba(255, 234, 158, 0.1) |
| Default (Active) | text-shadow | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 |
| Default (Active) | cursor | pointer |
| Hover | background | rgba(255, 234, 158, 0.15) *(predicted - verify in Figma)* |
| Focus | outline | 2px solid #FFEA9E, outline-offset: -2px |
| Inactive | background | transparent |
| Inactive | text-shadow | none |
| Inactive | cursor | pointer |

---

### A.2. Logout Menu Item

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I666:9601;563:7868` | - |
| width | 121px | `width: 121px` |
| height | 56px | `height: 56px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| justify-content | flex-start | `justify-content: flex-start` |
| padding | 16px | `padding: 16px` |
| background | transparent | `background-color: transparent` |
| border-radius | 4px | `border-radius: 4px` |
| gap | 4px | `gap: 4px` |

**Text "Logout":**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I666:9601;563:7868;186:1439` | - |
| width | 61px | `width: 61px` |
| height | 24px | `height: 24px` |
| color | #FFFFFF | `color: rgba(255, 255, 255, 1)` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| letter-spacing | 0.15px | `letter-spacing: 0.15px` |
| text-align | center | `text-align: center` |

**Icon (Chevron Right):**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `I666:9601;563:7868;186:1441` | - |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| Component ID | `335:10890` | - |
| Component Set ID | `178:1020` | - |

**States:**
| State | Property | Value |
|-------|----------|-------|
| Default | background | transparent |
| Default | cursor | pointer |
| Hover | background | rgba(255, 234, 158, 0.1) *(predicted - verify in Figma)* |
| Focus | outline | 2px solid #FFEA9E, outline-offset: -2px |
| Loading | opacity | 0.6 |
| Loading | cursor | not-allowed |
| Disabled | opacity | 0.5 |
| Disabled | cursor | not-allowed |

---

## Component Hierarchy with Styles

```
Dropdown-profile (721:5223, 215x304, bg: #696969 overlay)
└── A_Dropdown-List (666:9601, flex-col, p: 6px, bg: #00070C, border: 1px solid #998C5F, radius: 8px)
    ├── A.1_Profile (I666:9601;563:7844, 119x56, flex-row, p: 16px, gap: 4px, bg: rgba(255,234,158,0.1), radius: 4px)
    │   ├── Frame 486 (flex-row, gap: 4px, items-center)
    │   │   └── "Profile" (Montserrat 16px/700, #FFF, text-shadow glow)
    │   └── IC - User Icon (24x24, component: 186:1611)
    │
    └── A.2_Logout (I666:9601;563:7868, 121x56, flex-row, p: 16px, gap: 4px, bg: transparent, radius: 4px)
        ├── Frame 485 (flex-row, gap: 4px, items-center)
        │   └── "Logout" (Montserrat 16px/700, #FFF)
        └── IC - Chevron Right (24x24, component: 335:10890)
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

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Dropdown Container | Positioned relative to trigger, may use full-width on small screens |
| Menu Items | Touch targets maintained at 56px height (meets 44px minimum) |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Dropdown Container | Same as desktop, positioned relative to trigger |

#### Desktop (>= 1024px)

| Component | Changes |
|-----------|---------|
| Dropdown Container | Positioned below profile avatar/trigger, aligned right |

---

## Icon Specifications

| Icon Name | Size | Color | Node ID | Component ID | Usage |
|-----------|------|-------|---------|--------------|-------|
| User (Profile) | 24x24 | #FFEA9E (golden, matches glow theme) | I666:9601;563:7844;186:1498 | 186:1611 | Profile menu item icon |
| Chevron Right | 24x24 | #FFEA9E (golden, matches glow theme) | I666:9601;563:7868;186:1441 | 335:10890 | Logout menu item icon |

> **Note**: Icon colors are inferred from the visual reference (golden/warm tone matching the glow theme). Verify exact color values from the icon component set `178:1020` in Figma.

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Dropdown | opacity, transform | 150ms | ease-out | Toggle open/close |
| Menu Item | background-color | 150ms | ease-in-out | Hover |
| Text Glow | text-shadow | 150ms | ease-in-out | Active state |
| Overlay | opacity | 150ms | ease-in-out | Dropdown open/close |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Overlay | — | `fixed inset-0 z-[49]` | Part of `<DropdownMenu />` (click-away layer) |
| Dropdown Container | `666:9601` | `absolute z-50 flex flex-col p-1.5 bg-[#00070C] border border-[#998C5F] rounded-lg` | `<DropdownMenu />` |
| Profile Item | `I666:9601;563:7844` | `flex items-center gap-1 p-4 rounded cursor-pointer bg-[rgba(255,234,158,0.1)] focus:outline-2 focus:outline-[#FFEA9E]` | `<DropdownMenuItem variant="profile" />` |
| Logout Item | `I666:9601;563:7868` | `flex items-center gap-1 p-4 rounded cursor-pointer hover:bg-[rgba(255,234,158,0.1)] focus:outline-2 focus:outline-[#FFEA9E]` | `<DropdownMenuItem variant="logout" />` |
| Profile Text | `I666:9601;563:7844;186:1497` | `font-montserrat text-base font-bold text-white [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]` | Text within `<DropdownMenuItem>` |
| Logout Text | `I666:9601;563:7868;186:1439` | `font-montserrat text-base font-bold text-white` | Text within `<DropdownMenuItem>` |
| User Icon | `I666:9601;563:7844;186:1498` | `w-6 h-6` | `<Icon name="user" />` |
| Chevron Icon | `I666:9601;563:7868;186:1441` | `w-6 h-6` | `<Icon name="chevron-right" />` |

---

## Notes

- All colors should use CSS variables for theming support (Figma variables: `--Details-Border`, `--Details-Container-2`, `--Details-Text-Secondary-1`)
- The Profile item has an active/selected state with a subtle golden glow background and text shadow effect
- Font Montserrat must be loaded via Google Fonts or local files
- Icons **MUST BE** in **Icon Component** instead of svg files or img tags
- The dropdown should dismiss when clicking outside (on the overlay area)
- Component Set IDs indicate these are Figma component instances - reuse the same React components with different props/variants
- **Item widths**: Figma shows Profile at 119px and Logout at 121px (slight difference due to text length). In implementation, both items SHOULD use `width: 100%` to stretch to the container width for visual consistency
- **Overlay**: The #696969 background in the Figma frame is for design context only. In implementation, the overlay should be `transparent` (invisible click target) or optionally a very subtle `rgba(0,0,0,0.1)` backdrop
