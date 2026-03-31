# Design Style: Dropdown List Hashtag

**Frame ID**: `1002:13013`
**Frame Name**: `Dropdown list hashtag`
**Figma Link**: Figma file `9ypp4enmFmdK3YAFJLIu6C`, node `1002:13013`
**Extracted At**: 2026-03-31

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dropdown-bg | #00070C | 100% | Dropdown container background |
| --color-dropdown-border | #998C5F | 100% | Dropdown border |
| --color-item-selected-bg | rgba(255, 234, 158, 0.20) | 20% | Selected hashtag item background |
| --color-item-unselected-bg | transparent | 0% | Unselected hashtag item background |
| --color-item-text | #FFFFFF | 100% | Hashtag text color |
| --color-check-icon | #FFFFFF | 100% | Check icon color |
| --color-button-bg | #FFFFFF | 100% | + Hashtag button background |
| --color-button-border | #998C5F | 100% | + Hashtag button border |
| --color-button-text-secondary | #999999 | 100% | "Tối đa 5" hint text |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-hashtag-item | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-button-label | Montserrat | 11px | 700 | 16px | 0.5px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-dropdown-padding | 6px | Dropdown internal padding |
| --spacing-item-padding | 0px 16px | Hashtag item horizontal padding |
| --spacing-button-padding | 4px 8px | + Hashtag button padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-dropdown | 8px | Dropdown container |
| --radius-button | 8px | + Hashtag button |
| --radius-selected-item | 2px | Selected item border-radius |
| --border-dropdown | 1px solid #998C5F | Dropdown border |
| --border-button | 1px solid #998C5F | Button border |

---

## Layout Specifications

### Trigger Button (+ Hashtag)

| Property | Value | Notes |
|----------|-------|-------|
| width | 116px | Button width |
| height | 48px | Button height |
| padding | 4px 8px | Internal padding |
| border | 1px solid #998C5F | Border |
| border-radius | 8px | Rounded corners |
| background | #FFFFFF | White background |

### Dropdown Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 318px | Dropdown width |
| height | auto (content-driven) | ~332px in design |
| max-height | 360px | Scrollable if content exceeds |
| overflow-y | auto | Enables scrolling for long lists |
| padding | 6px | Internal padding |
| border | 1px solid #998C5F | Border |
| border-radius | 8px | Rounded corners |
| background | #00070C | Dark background |

### Dropdown Item

| Property | Value | Notes |
|----------|-------|-------|
| width | 306px | Full width minus padding |
| height | 40px | Fixed height per item |
| padding | 0px 16px | Horizontal padding |
| display | flex | Flex row |
| align-items | center | Vertical center |
| justify-content | flex-start | Left aligned |
| border-radius | 2px | Subtle rounding |

### Layout Structure (ASCII)

```
┌────────────────┐
│ + Hashtag      │  ← Trigger Button (116x48px)
│   Tối đa 5     │
└────────────────┘
        │
        ▼
┌──────────────────────────────────────────┐
│  Dropdown (318px, bg: #00070C, r:8px)     │
│  padding: 6px, border: 1px #998C5F        │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │ ✓ #High-performing        ✔        │  │  ← Selected (bg: rgba(255,234,158,0.2))
│  └─────────────────────────────────────┘  │
│  ┌─────────────────────────────────────┐  │
│  │ ✓ #BE PROFESSIONAL        ✔        │  │  ← Selected
│  └─────────────────────────────────────┘  │
│  ┌─────────────────────────────────────┐  │
│  │ ✓ #BE OPTIMISTIC          ✔        │  │  ← Selected
│  └─────────────────────────────────────┘  │
│  ┌─────────────────────────────────────┐  │
│  │   #BE A TEAM                       │  │  ← Unselected (transparent bg)
│  └─────────────────────────────────────┘  │
│  ┌─────────────────────────────────────┐  │
│  │   #THINK OUTSIDE THE BOX           │  │  ← Unselected
│  └─────────────────────────────────────┘  │
│  ┌─────────────────────────────────────┐  │
│  │   #GET RISKY                       │  │
│  └─────────────────────────────────────┘  │
│  ┌─────────────────────────────────────┐  │
│  │   #GO FAST                         │  │
│  └─────────────────────────────────────┘  │
│  ┌─────────────────────────────────────┐  │
│  │   #WASSHOI                         │  │
│  └─────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

---

## Component Style Details

### + Hashtag Trigger Button

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 1002:15115 | - |
| width | 116px | `width: 116px` |
| height | 48px | `height: 48px` |
| padding | 4px 8px | `padding: 4px 8px` |
| background | #FFFFFF | `background: white` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex; align-items: center` |
| icon | Plus (24x24) | Before text |
| text | "Hashtag\nTối đa 5" | Two lines, 11px/700 |

---

### Dropdown Container

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 1002:13102 | - |
| width | 318px | `width: 318px` |
| padding | 6px | `padding: 6px` |
| background | #00070C | `background: #00070C` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| display | flex | `display: flex; flex-direction: column` |

---

### Selected Hashtag Item (A, B, C)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 1002:13185 | - |
| width | 306px | `width: 100%` |
| height | 40px | `height: 40px` |
| padding | 0px 16px | `padding: 0 16px` |
| background | rgba(255, 234, 158, 0.20) | `background: rgba(255,234,158,0.2)` |
| border-radius | 2px | `border-radius: 2px` |
| display | flex | `display: flex; align-items: center` |
| gap | 2px | `gap: 2px` |

| Sub-element | Style |
|-------------|-------|
| Text | 16px/700, #FFFFFF, letter-spacing: 0.15px |
| Check Icon | 24x24px, right-aligned (justify-content: flex-end or margin-left: auto) |

**States:**
| State | Changes |
|-------|---------|
| Default (selected) | background: rgba(255, 234, 158, 0.20), check visible |
| Hover | background: rgba(255, 234, 158, 0.30) |
| Focus (keyboard) | outline: 2px solid #FFEA9E, outline-offset: -2px |

---

### Unselected Hashtag Item (D, E, F, G, H)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 1002:13104 | - |
| width | 306px | `width: 100%` |
| height | 40px | `height: 40px` |
| padding | 0px 16px | `padding: 0 16px` |
| background | transparent | `background: transparent` |
| border-radius | 0px | `border-radius: 0` |
| display | flex | `display: flex; align-items: center` |

| Sub-element | Style |
|-------------|-------|
| Text | 16px/700, #FFFFFF, letter-spacing: 0.15px |
| Check Icon | Hidden (not rendered) |

**States:**
| State | Changes |
|-------|---------|
| Default (unselected) | background: transparent, no check |
| Hover | background: rgba(255, 234, 158, 0.10) |
| Focus (keyboard) | outline: 2px solid #FFEA9E, outline-offset: -2px |
| Disabled (max reached) | opacity: 0.5, cursor: not-allowed, pointer-events: none |

---

### Check Icon

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | 1002:13204 | - |
| width | 24px | `width: 24px` |
| height | 24px | `height: 24px` |
| appearance | White checkmark in circle | SVG icon |

---

## Component Hierarchy with Styles

```
Hashtag Section
├── Trigger Button (w:116px, h:48px, p:4px 8px, bg:white, border:1px #998C5F, r:8px)
│   ├── Plus Icon (24x24)
│   └── Text "Hashtag\nTối đa 5" (11px/700, color: #999)
│
└── Dropdown (w:318px, p:6px, bg:#00070C, border:1px #998C5F, r:8px, flex-col)
    ├── Selected Item (306px, h:40px, px:16px, bg:rgba(255,234,158,0.2), r:2px)
    │   ├── Text "#High-performing" (16px/700, white)
    │   └── Check Icon (24x24, white)
    ├── Selected Item (same style)
    ├── Selected Item (same style)
    ├── Unselected Item (306px, h:40px, px:16px, bg:transparent)
    │   └── Text "#BE A TEAM" (16px/700, white)
    ├── Unselected Item (same)
    ├── Unselected Item (same)
    ├── Unselected Item (same)
    └── Unselected Item (same)
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
| Dropdown | width: 100% of parent, max-width: 318px |
| Items | Same sizing, scrollable if needed |

#### Tablet & Desktop

| Component | Changes |
|-----------|---------|
| Dropdown | width: 318px, positioned relative to trigger button |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| Plus (+) | 24x24 | #00101A | Trigger button icon |
| Checkmark (✔) | 24x24 | #FFFFFF | Selected item indicator |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Dropdown | opacity, transform | 150ms | ease-out | Open/Close |
| Item | background-color | 100ms | ease | Hover/Select |
| Check Icon | opacity | 100ms | ease | Select/Deselect |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Trigger Button | 1002:15115 | `w-[116px] h-12 px-2 py-1 border border-[#998C5F] rounded-lg bg-white` | `<HashtagTrigger>` |
| Dropdown | 1002:13102 | `w-[318px] p-1.5 bg-[#00070C] border border-[#998C5F] rounded-lg` | `<HashtagDropdown>` |
| Selected Item | 1002:13185 | `w-full h-10 px-4 bg-[#FFEA9E]/20 rounded-sm flex items-center` | `<HashtagItem selected>` |
| Unselected Item | 1002:13104 | `w-full h-10 px-4 bg-transparent flex items-center` | `<HashtagItem>` |
| Check Icon | 1002:13204 | `w-6 h-6 ml-auto` | `<CheckIcon>` |

---

## Notes

- All colors should use CSS variables for theming support
- Prefer Tailwind utility classes as per project constitution (TailwindCSS v4)
- Font: Montserrat
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags.
- The dropdown should be rendered using a portal to avoid z-index issues within the modal.
- Consider using Radix UI or Headless UI for accessible dropdown behavior.
