# Design Style: Addlink Box (Thêm đường dẫn)

**Frame ID**: `1002:12917`
**Frame Name**: `Addlink Box`
**Figma Link**: Figma file `9ypp4enmFmdK3YAFJLIu6C`, node `1002:12917`
**Extracted At**: 2026-03-31

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-dialog-bg | #FFF8E1 | 100% | Dialog background |
| --color-text-primary | #00101A | 100% | Title, labels, input text |
| --color-border | #998C5F | 100% | Input borders, cancel button border |
| --color-input-bg | #FFFFFF | 100% | Input field backgrounds |
| --color-submit-bg | #FFEA9E | 100% | Save button background |
| --color-secondary-btn-bg | rgba(255, 234, 158, 0.10) | 10% | Cancel button background |
| --color-error | #EF4444 | 100% | Error border and error text |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-dialog-title | Montserrat | 32px | 700 | 40px | 0px |
| --text-field-label | Montserrat | 22px | 700 | 28px | 0px |
| --text-input | Montserrat | 16px | 400 | 24px | 0.15px |
| --text-button-primary | Montserrat | 22px | 700 | 28px | 0px |
| --text-button-secondary | Montserrat | 16px | 700 | 24px | 0.15px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-dialog-padding | 40px | Dialog internal padding |
| --spacing-section-gap | 32px | Gap between sections |
| --spacing-field-gap | 16px | Gap between label and input |
| --spacing-button-gap | 24px | Gap between buttons |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-dialog | 24px | Dialog container |
| --radius-input | 8px | Input fields |
| --radius-btn-primary | 8px | Save button |
| --radius-btn-secondary | 4px | Cancel button |
| --border-input | 1px solid #998C5F | Input borders |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 752px | Dialog width |
| height | 388px | Content-driven |
| padding | 40px | All sides |
| border-radius | 24px | Rounded corners |
| background | #FFF8E1 | Warm cream |

### Flex Layout

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Main layout |
| flex-direction | column | Vertical stack |
| gap | 32px | Between sections |
| align-items | flex-start | Left-aligned |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────┐
│  Dialog Container (752px, padding: 40px, bg: #FFF8E1, r: 24px)   │
│  gap: 32px                                                        │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  A: Title "Thêm đường dẫn" (672px, 32px/700)             │     │
│  └──────────────────────────────────────────────────────────┘     │
│                                                                   │
│  ┌──────────┐  ┌────────────────────────────────────────────┐     │
│  │ B.1 Label│  │ B.2 Text Input (flex:1, h:56px)             │     │
│  │ "Nội dung"│  │ (border: 1px #998C5F, r:8px, bg:white)     │     │
│  └──────────┘  └────────────────────────────────────────────┘     │
│                                                                   │
│  ┌──────────┐  ┌────────────────────────────────────────────┐     │
│  │ C.1 Label│  │ C.2 URL Input (flex:1, h:56px)              │     │
│  │ "URL"    │  │ (border: 1px #998C5F, r:8px, bg:white)      │     │
│  └──────────┘  └──────────────────────────[link-icon]────────┘     │
│                                                                   │
│  ┌────────────┐  ┌──────────────────────────────────────────┐     │
│  │ D.1: Hủy ✕ │  │ D.2: Lưu 🔗 (502px, h:60px, bg:#FFEA9E) │     │
│  │ (146x60px) │  │                                           │     │
│  └────────────┘  └──────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Dialog Title (A)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I1002:12682;1002:12500 | - |
| width | 672px | `width: 672px` |
| height | 40px | `height: auto` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 32px | `font-size: 32px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 40px | `line-height: 40px` |
| text-align | left | `text-align: left` |
| color | #00101A | `color: #00101A` |

---

### Field Label (B.1, C.1)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID (B.1)** | I1002:12682;1002:12502 | - |
| **Node ID (C.1)** | I1002:12682;1002:12653 | - |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #00101A | `color: #00101A` |

---

### Text Input (B.2)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I1002:12682;1002:12503 | - |
| flex | 1 0 0 | `flex: 1 0 0` |
| height | 56px | `height: 56px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFFFFF | `background: white` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |

**States:**
| State | Changes |
|-------|---------|
| Default | border: 1px solid #998C5F |
| Focus | border: 2px solid #FFEA9E, box-shadow: 0 0 0 2px rgba(255,234,158,0.3) |
| Error | border: 1px solid #EF4444 |

---

### URL Input (C.2)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I1002:12682;1002:12654 | - |
| flex | 1 0 0 | `flex: 1 0 0` |
| height | 56px | `height: 56px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFFFFF | `background: white` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| icon | Link icon (24x24px) inside, right side | Absolute positioned |

**States:**
| State | Changes |
|-------|---------|
| Default | border: 1px solid #998C5F |
| Focus | border: 2px solid #FFEA9E, box-shadow: 0 0 0 2px rgba(255,234,158,0.3) |
| Error | border: 1px solid #EF4444 |

---

### Cancel Button (D.1)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I1002:12682;1002:12544 | - |
| padding | 16px 40px | `padding: 16px 40px` |
| background | rgba(255, 234, 158, 0.10) | `background: rgba(255,234,158,0.1)` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 4px | `border-radius: 4px` |
| align-self | stretch | `align-self: stretch` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #00101A | `color: #00101A` |
| icon | Close ✕ (24x24) | After text |

---

### Save Button (D.2)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I1002:12682;1002:12545 | - |
| width | 502px | `width: 502px` |
| height | 60px | `height: 60px` |
| padding | 16px | `padding: 16px` |
| background | #FFEA9E | `background: #FFEA9E` |
| border | none | `border: none` |
| border-radius | 8px | `border-radius: 8px` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| color | #00101A | `color: #00101A` |
| icon | Link 🔗 (24x24) | After text |
| justify-content | center | `justify-content: center` |

**States:**
| State | Changes |
|-------|---------|
| Default | background: #FFEA9E |
| Hover | background: #FFE082 (predicted) |
| Disabled | opacity: 0.5, cursor: not-allowed |

---

## Component Hierarchy with Styles

```
Dialog (w: 752px, p: 40px, bg: #FFF8E1, r: 24px, flex-col, gap: 32px)
├── A: Title "Thêm đường dẫn" (672px, Montserrat 32px/700, color: #00101A)
├── B: Nội dung Row (672px, flex-row, gap: 16px, items-center)
│   ├── B.1: Label "Nội dung" (107px, 22px/700)
│   └── B.2: Text Input (flex:1, h:56px, p:16px 24px, border:1px #998C5F, r:8px)
├── C: URL Row (672px, flex-row, gap: 16px, items-center)
│   ├── C.1: Label "URL" (47px, 22px/700)
│   └── C.2: URL Input (flex:1, h:56px, p:16px 24px, border:1px #998C5F, r:8px, link icon)
└── D: Button Row (672px, flex-row, gap: 24px)
    ├── D.1: Cancel (p:16px 40px, border:1px #998C5F, r:4px, bg:rgba(255,234,158,0.1))
    └── D.2: Save (502px, h:60px, bg:#FFEA9E, r:8px, 22px/700)
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
| Dialog | width: 100%, padding: 24px |
| Field rows | Stack vertically (label above input) |
| Save button | width: 100% |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Dialog | width: 90vw, max-width: 752px |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| Dialog | width: 752px |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| Close (✕) | 24x24 | #00101A | Cancel button icon |
| Link (🔗) | 24x24 | #00101A | Save button icon, URL input suffix |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Dialog | opacity, transform | 150ms | ease-out | Open/Close |
| Button | background-color | 150ms | ease-in-out | Hover |
| Input | border-color | 150ms | ease-in-out | Focus |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Dialog Container | 1002:12682 | `w-[752px] p-10 bg-[#FFF8E1] rounded-3xl flex flex-col gap-8` | `<AddLinkDialog>` |
| Title | I1002:12682;1002:12500 | `text-[32px] font-bold leading-10 text-[#00101A] font-montserrat` | Text node |
| Text Input | I1002:12682;1002:12503 | `flex-1 h-14 px-6 py-4 border border-[#998C5F] rounded-lg bg-white` | `<Input>` |
| URL Input | I1002:12682;1002:12654 | `flex-1 h-14 px-6 py-4 border border-[#998C5F] rounded-lg bg-white` | `<Input type="url">` |
| Cancel Button | I1002:12682;1002:12544 | `px-10 py-4 border border-[#998C5F] rounded bg-[#FFEA9E]/10` | `<Button variant="secondary">` |
| Save Button | I1002:12682;1002:12545 | `w-[502px] h-15 bg-[#FFEA9E] rounded-lg font-bold text-[22px]` | `<Button variant="primary">` |

---

## Notes

- All colors should use CSS variables for theming support
- Prefer Tailwind utility classes as per project constitution (TailwindCSS v4)
- Font: Montserrat
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags.
