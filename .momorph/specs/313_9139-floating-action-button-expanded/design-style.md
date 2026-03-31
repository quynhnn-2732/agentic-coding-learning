# Design Style: Floating Action Button - Expanded State

**Frame ID**: `313:9139`
**Frame Name**: `Floating Action Button - phim nổi chức năng 2`
**Figma Link**: https://momorph.ai/files/Z9KFZ0aAoOfkVEIPuwwkZl/frames/313:9139
**Extracted At**: 2026-03-30

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-fab-bg | #FFEA9E | 100% | Action button background (Thể lệ, Viết KUDOS) |
| --color-close-bg | #D4271D | 100% | Close button background (red) |
| --color-page-bg | #00101A | 100% | Page background (dark) |
| --color-btn-text | #00101A | 100% | Button label text color |
| --color-close-icon | #FFFFFF | 100% | Close button X icon color (implied) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-fab-label | Montserrat | 24px | 700 | 32px | 0px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-fab-gap | 20px | Gap between buttons in expanded container |
| --spacing-btn-padding | 16px | Internal padding of each button |
| --spacing-btn-icon-gap | 8px | Gap between icon and label in button |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-btn | 4px | Action buttons border radius |
| --radius-close | 100px | Close button (circle) |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-fab-hover | 0 2px 8px 0 rgba(0,0,0,0.2) | Button hover state |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 214px | Matches widest button |
| height | 224px | Total expanded height |
| position | fixed | Bottom-right of viewport |
| display | flex | Vertical stack |
| flex-direction | column | Top to bottom |
| align-items | flex-end | Right-aligned buttons |
| gap | 20px | Between buttons |

### Layout Structure (ASCII)

```
┌─────────────────────────────────────────────────────────────────┐
│  Page (1440x1024, bg: #00101A)                                  │
│                                                                 │
│                                                                 │
│                                                                 │
│                                                                 │
│                                 ┌────────────────────────┐      │
│                                 │  Container (214x224)   │      │
│                                 │  flex-col, gap: 20px   │      │
│                                 │  align: flex-end       │      │
│                                 │                        │      │
│                                 │   ┌────────────────┐   │      │
│                                 │   │ A: Thể lệ      │   │      │
│                                 │   │ 149x64, #FFEA9E│   │      │
│                                 │   │ ⚡ Thể lệ      │   │      │
│                                 │   └────────────────┘   │      │
│                                 │                        │      │
│                                 │   ┌────────────────────┤      │
│                                 │   │ B: Viết KUDOS      │      │
│                                 │   │ 214x64, #FFEA9E    │      │
│                                 │   │ ✎ Viết KUDOS       │      │
│                                 │   └────────────────────┤      │
│                                 │                  ┌──┐  │      │
│                                 │                  │X │  │      │
│                                 │                  │56│  │      │
│                                 │                  │px│  │      │
│                                 │                  └──┘  │      │
│                                 └────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Expanded Container - `313:9140`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 313:9140 | - |
| width | 214px | `width: 214px` |
| height | 224px | `height: auto` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| align-items | flex-end | `align-items: flex-end` |
| gap | 20px | `gap: 20px` |
| position | fixed | `position: fixed` |

---

### A: Button "Thể lệ" - `I313:9140;214:3799`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9140;214:3799 | - |
| width | 149px | `width: 149px` |
| height | 64px | `height: 64px` |
| padding | 16px | `padding: 16px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 4px | `border-radius: 4px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |
| cursor | pointer | `cursor: pointer` |

**Inner content:**
- Icon (lightning/rules): 24x24px, Node `I313:9140;214:3799;186:1763`, Component `214:3752`
- Label "Thể lệ": Montserrat 700, 24px/32px, color #00101A, Node `I313:9140;214:3799;186:1568`

**States:**
| State | Changes |
|-------|---------|
| Default | bg: #FFEA9E, box-shadow: none |
| Hover | bg: #F5E08E, box-shadow: 0 2px 8px 0 rgba(0,0,0,0.2) |
| Active | bg: #EBD67E, transform: scale(0.98) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### B: Button "Viết KUDOS" - `I313:9140;214:3732`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9140;214:3732 | - |
| width | 214px | `width: 214px` |
| height | 64px | `height: 64px` |
| padding | 16px | `padding: 16px` |
| background | #FFEA9E | `background-color: #FFEA9E` |
| border-radius | 4px | `border-radius: 4px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| gap | 8px | `gap: 8px` |
| cursor | pointer | `cursor: pointer` |

**Inner content:**
- Icon (pen): 24x24px, Node `I313:9140;214:3732;186:1763`, Component `214:3812` (MM_MEDIA_Pen)
- Label "Viết KUDOS": Montserrat 700, 24px/32px, color #00101A, Node `I313:9140;214:3732;186:1568`

**States:**
| State | Changes |
|-------|---------|
| Default | bg: #FFEA9E, box-shadow: none |
| Hover | bg: #F5E08E, box-shadow: 0 2px 8px 0 rgba(0,0,0,0.2) |
| Active | bg: #EBD67E, transform: scale(0.98) |
| Focus | outline: 2px solid #FFEA9E, outline-offset: 2px |

---

### C: Close Button - `I313:9140;214:3827`

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I313:9140;214:3827 | - |
| width | 56px | `width: 56px` |
| height | 56px | `height: 56px` |
| padding | 16px | `padding: 16px` |
| background | #D4271D | `background-color: #D4271D` |
| border-radius | 100px | `border-radius: 100px` |
| display | flex | `display: flex` |
| flex-direction | row | `flex-direction: row` |
| align-items | center | `align-items: center` |
| justify-content | center | `justify-content: center` |
| cursor | pointer | `cursor: pointer` |

**Inner content:**
- Close icon (X): 24x24px, white, Node `I313:9140;214:3827;186:1766`, Component `214:3851` (MM_MEDIA_Close)

**States:**
| State | Changes |
|-------|---------|
| Default | bg: #D4271D |
| Hover | bg: darken(#D4271D, 10%) ≈ #B8221A |
| Active | bg: darken(#D4271D, 20%) |
| Focus | outline: 2px solid #D4271D, outline-offset: 2px |

---

## Component Hierarchy with Styles

```
Screen (bg: #00101A, position: relative)
└── Widget Button Container [313:9140] (w: 214px, h: 224px, flex-col, gap: 20px, align: flex-end, fixed bottom-right)
    ├── A: Button "Thể lệ" [I313:9140;214:3799] (w: 149px, h: 64px, bg: #FFEA9E, radius: 4px, p: 16px, flex, gap: 8px)
    │   ├── Lightning Icon [I313:9140;214:3799;186:1763] (w: 24px, h: 24px)
    │   └── "Thể lệ" Text [I313:9140;214:3799;186:1568] (Montserrat 700, 24px, color: #00101A)
    │
    ├── B: Button "Viết KUDOS" [I313:9140;214:3732] (w: 214px, h: 64px, bg: #FFEA9E, radius: 4px, p: 16px, flex, gap: 8px)
    │   ├── Pen Icon [I313:9140;214:3732;186:1763] (w: 24px, h: 24px)
    │   └── "Viết KUDOS" Text [I313:9140;214:3732;186:1568] (Montserrat 700, 24px, color: #00101A)
    │
    └── C: Close Button [I313:9140;214:3827] (w: 56px, h: 56px, bg: #D4271D, radius: 100px, p: 16px)
        └── X Icon [I313:9140;214:3827;186:1766] (w: 24px, h: 24px, white)
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
| Container | right: 16px, bottom: 80px |
| Button widths | Maintain fixed widths (149px, 214px) |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Container | right: 16px |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| Container | As designed |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| MM_MEDIA Rules (214:3752) | 24x24 | Dark (#00101A context) | "Thể lệ" button icon |
| MM_MEDIA_Pen (214:3812) | 24x24 | Dark (#00101A context) | "Viết KUDOS" button icon |
| MM_MEDIA_Close (214:3851) | 24x24 | White | Close button icon |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Container | transform (scaleY), opacity | 250ms | ease-out | Expand from collapsed |
| Button A | opacity, translateY | 150ms | ease-out | Stagger appear (delay: 50ms) |
| Button B | opacity, translateY | 150ms | ease-out | Stagger appear (delay: 100ms) |
| Button C | opacity, scale | 150ms | ease-out | Stagger appear (delay: 150ms) |
| All buttons | background-color, box-shadow | 150ms | ease-in-out | Hover |
| Container | transform, opacity | 200ms | ease-in | Collapse |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| FAB Container | 313:9140 | `fixed bottom-[130px] right-[19px] z-50 flex flex-col items-end gap-5` | `<FloatingActionButton expanded />` |
| Thể lệ Button | I313:9140;214:3799 | `flex items-center gap-2 bg-[#FFEA9E] rounded px-4 py-4 w-[149px] h-16 cursor-pointer` | `<FABOption label="Thể lệ" icon={<RulesIcon />} />` |
| Viết KUDOS Button | I313:9140;214:3732 | `flex items-center gap-2 bg-[#FFEA9E] rounded px-4 py-4 w-[214px] h-16 cursor-pointer` | `<FABOption label="Viết KUDOS" icon={<PenIcon />} />` |
| Close Button | I313:9140;214:3827 | `flex items-center justify-center bg-[#D4271D] rounded-full w-14 h-14 cursor-pointer` | `<FABCloseButton />` |

---

## Notes

- All colors should use CSS variables for theming support
- Prefer Tailwind utility classes where project uses Tailwind
- Icons should be SVG for scalability
- Font should be loaded via Google Fonts or local files
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags.
- The close button uses a distinctly different color (red #D4271D) to differentiate from action buttons (yellow #FFEA9E).
- Buttons are right-aligned (`flex-end`) so the close button aligns with the right edge of the wider "Viết KUDOS" button.
