# Design Style: Viết Kudo (Write Kudo Modal)

**Frame ID**: `520:11602`
**Frame Name**: `Viết Kudo`
**Figma Link**: Figma file `9ypp4enmFmdK3YAFJLIu6C`, node `520:11602`
**Extracted At**: 2026-03-31

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| --color-modal-bg | #FFF8E1 | 100% | Modal background |
| --color-overlay | #00101A | 80% | Page overlay behind modal |
| --color-text-primary | #00101A | 100% | Headings, labels, body text |
| --color-text-placeholder | #999999 | 100% | Placeholder text, hints |
| --color-border | #998C5F | 100% | Input borders, secondary button border |
| --color-input-bg | #FFFFFF | 100% | Input field backgrounds |
| --color-submit-bg | #FFEA9E | 100% | Submit button background |
| --color-secondary-btn-bg | rgba(255, 234, 158, 0.10) | 10% | Cancel button background |
| --color-error | #EF4444 | 100% | Error states (predicted) |
| --color-required | #FF0000 | 100% | Required asterisk (*) |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing |
|------------|-------------|------|--------|-------------|----------------|
| --text-modal-title | Montserrat | 32px | 700 | 40px | 0px |
| --text-field-label | Montserrat | 22px | 700 | 28px | 0px |
| --text-input | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-hint | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-button-primary | Montserrat | 22px | 700 | 28px | 0px |
| --text-button-secondary | Montserrat | 16px | 700 | 24px | 0.15px |
| --text-checkbox-label | Montserrat | 22px | 700 | 28px | 0px |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| --spacing-modal-padding | 40px | Modal internal padding |
| --spacing-section-gap | 32px | Gap between major sections |
| --spacing-field-gap | 16px | Gap between label and input |
| --spacing-content-gap | 24px | Gap between content sections (editor, hashtag, image) |
| --spacing-button-gap | 24px | Gap between Cancel and Submit buttons |
| --spacing-input-padding | 16px 24px | Input field padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| --radius-modal | 24px | Modal container |
| --radius-input | 8px | Input fields, text boxes |
| --radius-btn-primary | 8px | Submit button |
| --radius-btn-secondary | 4px | Cancel button |
| --radius-checkbox | 4px | Checkbox |
| --border-input | 1px solid #998C5F | Input borders |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| --shadow-modal | none (overlay handles depth) | Modal |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| width | 752px | Modal width |
| height | auto (content-driven) | Approx 1012px in design |
| padding | 40px | All sides |
| border-radius | 24px | Rounded corners |
| background | #FFF8E1 | Warm cream background |

### Flex Layout

| Property | Value | Notes |
|----------|-------|-------|
| display | flex | Main layout |
| flex-direction | column | Vertical stack |
| gap | 32px | Between major sections |
| align-items | flex-start | Left-aligned content |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Overlay (1440x1024, bg: rgba(0,16,26,0.8))                             │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  Modal Container (752px, padding: 40px, bg: #FFF8E1, r: 24px)     │  │
│  │  gap: 32px between sections                                       │  │
│  │                                                                    │  │
│  │  ┌────────────────────────────────────────────────────────────┐    │  │
│  │  │  A: Title (672px, text-center, 32px/700)                   │    │  │
│  │  │  "Gửi lời cám ơn và ghi nhận đến đồng đội"                │    │  │
│  │  └────────────────────────────────────────────────────────────┘    │  │
│  │                                                                    │  │
│  │  ┌──────────┐ ┌──────────────────────────────────────────────┐    │  │
│  │  │ B.1 Label│ │ B.2 Search Input (flex:1, h:56px, r:8px)     │    │  │
│  │  │ "Người   │ │ placeholder: "Tìm kiếm" + dropdown icon      │    │  │
│  │  │  nhận *" │ └──────────────────────────────────────────────┘    │  │
│  │  └──────────┘                                                      │  │
│  │                                                                    │  │
│  │  ┌──────────┐ ┌──────────────────────────────────────────────┐    │  │
│  │  │ Label    │ │ Danh hiệu Input (514x56px, r:8px)            │    │  │
│  │  │"Danh     │ │ placeholder: "Dành tặng một danh hiệu..."    │    │  │
│  │  │ hiệu *" │ └──────────────────────────────────────────────┘    │  │
│  │  └──────────┘  Hint: "Ví dụ: Người truyền động lực cho tôi..."   │  │
│  │                                                                    │  │
│  │  ┌────────────────────────────────────────────────────────────┐    │  │
│  │  │  C: Toolbar [B] [I] [S] [≡] [🔗] [❝] + "Tiêu chuẩn..."  │    │  │
│  │  ├────────────────────────────────────────────────────────────┤    │  │
│  │  │  D: Text Editor (672px, min-h:~180px)                      │    │  │
│  │  │  placeholder: "Hãy gửi gắm lời cám ơn..."                 │    │  │
│  │  └────────────────────────────────────────────────────────────┘    │  │
│  │  D.1: Hint "Bạn có thể '@ + tên' để nhắc tới đồng nghiệp khác"  │  │
│  │                                                                    │  │
│  │  ┌──────────┐ ┌────────────────┐                                  │  │
│  │  │ E.1 Label│ │ E.2 + Hashtag  │  [chip] [chip] ...              │  │
│  │  │"Hashtag*"│ │   Tối đa 5     │                                  │  │
│  │  └──────────┘ └────────────────┘                                  │  │
│  │                                                                    │  │
│  │  ┌──────────┐ [thumb][thumb][thumb][thumb][thumb] ┌────────────┐  │  │
│  │  │ F: Image │  (each with x button)                │ + Image   │  │  │
│  │  │          │                                      │  Tối đa 5 │  │  │
│  │  └──────────┘                                      └────────────┘  │  │
│  │                                                                    │  │
│  │  ☐ G: "Gửi lời cám ơn và ghi nhận ẩn danh"                       │  │
│  │                                                                    │  │
│  │  ┌────────────┐  ┌────────────────────────────────────────────┐   │  │
│  │  │ H.1: Hủy ✕ │  │ H.2: Gửi ▷ (502px, bg: #FFEA9E, r:8px)  │   │  │
│  │  │ (border,4px)│  │                                            │   │  │
│  │  └────────────┘  └────────────────────────────────────────────┘   │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Modal Title (A)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9870 | - |
| width | 672px | `width: 672px` |
| height | 80px (2 lines) | `height: auto` |
| font-family | Montserrat | `font-family: 'Montserrat', sans-serif` |
| font-size | 32px | `font-size: 32px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 40px | `line-height: 40px` |
| text-align | center | `text-align: center` |
| color | #00101A | `color: #00101A` |

---

### Recipient Search Input (B.2)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9873 | - |
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
| Filled | Same as default, text color: #00101A |

---

### Field Label (B.1, E.1)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9872 | - |
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | #00101A | `color: #00101A` |
| required marker | red "*" | `color: red` for asterisk |

---

### Danh hiệu Input (Frame 552)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647 (Frame 552) | - |
| width | 514px | `width: 514px` |
| height | 56px | `height: 56px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFFFFF | `background: white` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |

**Hint text below:**
| Property | Value | CSS |
|----------|-------|-----|
| content | "Ví dụ: Người truyền động lực cho tôi.\nDanh hiệu sẽ hiển thị làm tiêu đề Kudos của bạn." | - |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 24px | `line-height: 24px` |
| color | #999999 | `color: #999` |

**States:**
| State | Changes |
|-------|---------|
| Default | border: 1px solid #998C5F |
| Focus | border: 2px solid #FFEA9E, box-shadow: 0 0 0 2px rgba(255,234,158,0.3) |
| Error | border: 1px solid #EF4444 |

---

### Community Standards Link ("Tiêu chuẩn cộng đồng")

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: 'Montserrat'` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #C4A35A (golden/brown) | `color: #C4A35A` |
| text-decoration | none | `text-decoration: none` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Hover | text-decoration: underline |

---

### Rich Text Toolbar (C)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9877 | - |
| width | 672px | `width: 100%` |
| buttons | B, I, S, ≡, 🔗, ❝ | Toggle buttons, each ~48px wide |
| border | 1px solid #998C5F | Toolbar border |
| layout | flex, row | `display: flex; flex-direction: row` |

---

### Text Editor (D)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9886 | - |
| width | 672px | `width: 100%` |
| min-height | ~180px | `min-height: 180px` |
| padding | 16px 24px | `padding: 16px 24px` |
| background | #FFFFFF | `background: white` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 0 0 8px 8px | Bottom corners only (toolbar has top) |
| placeholder color | #999999 | `color: #999` |

---

### Hashtag Button (E.2)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;662:8595 | - |
| display | flex, row | `display: flex; align-items: center` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| padding | 4px 8px | `padding: 4px 8px` |
| icon | "+" (24x24px) | Plus icon before text |
| text | "Hashtag\nTối đa 5" | Two-line text |

---

### Image Thumbnails (F.2–F.4)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;662:9197 | - |
| width | ~80px | Thumbnail width |
| height | ~80px | Thumbnail height |
| border-radius | 4px (predicted) | `border-radius: 4px` |
| delete button | Red circle "x" at top-right | Absolute positioned |

---

### Add Image Button (F.5)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;662:9132 | - |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 8px | `border-radius: 8px` |
| icon | "+" (24x24px) | Plus icon |
| text | "Image\nTối đa 5" | Two-line label |

---

### Anonymous Checkbox (G)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:14099 | - |
| checkbox size | 24x24px | `width: 24px; height: 24px` |
| border | 1px solid #999 | `border: 1px solid #999` |
| border-radius | 4px | `border-radius: 4px` |
| background | #FFFFFF | `background: white` |
| label font-size | 22px | `font-size: 22px` |
| label font-weight | 700 | `font-weight: 700` |
| label color | #999999 | `color: #999` |
| gap | 16px | Gap between checkbox and label |

---

### Cancel Button (H.1)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9906 | - |
| padding | 16px 40px | `padding: 16px 40px` |
| background | rgba(255, 234, 158, 0.10) | `background: rgba(255,234,158,0.1)` |
| border | 1px solid #998C5F | `border: 1px solid #998C5F` |
| border-radius | 4px | `border-radius: 4px` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| color | #00101A | `color: #00101A` |
| icon | Close "✕" (24x24px) | After text |
| align-self | stretch | `align-self: stretch` |

---

### Submit Button (H.2)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | I520:11647;520:9907 | - |
| width | 502px | `width: 502px` |
| height | 60px | `height: 60px` |
| padding | 16px | `padding: 16px` |
| background | #FFEA9E | `background: #FFEA9E` |
| border | none | `border: none` |
| border-radius | 8px | `border-radius: 8px` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: 700` |
| color | #00101A | `color: #00101A` |
| icon | Send "▷" | After text |
| justify-content | center | `justify-content: center` |

**States:**
| State | Changes |
|-------|---------|
| Default | background: #FFEA9E |
| Hover | background: slightly darker (predicted: #FFE082) |
| Disabled | opacity: 0.5, cursor: not-allowed |

---

## Component Hierarchy with Styles

```
Overlay (bg: rgba(0,16,26,0.8), full-screen)
└── Modal (w: 752px, p: 40px, bg: #FFF8E1, r: 24px, flex-col, gap: 32px)
    ├── A: Title (672px, text-center, Montserrat 32px/700, color: #00101A)
    ├── B: Recipient Row (672px, flex-row, gap: 16px, items-center)
    │   ├── B.1: Label "Người nhận *" (146px, 22px/700)
    │   └── B.2: Search Input (flex:1, h:56px, p:16px 24px, border: 1px #998C5F, r:8px)
    ├── Danh hiệu Row (672px, flex-row, gap: 16px)
    │   ├── Label "Danh hiệu *" (139px, 22px/700)
    │   ├── Input (514px, h:56px, same style as B.2)
    │   └── Hint text (16px/700, color: #999)
    ├── Content (672px, flex-col, gap: 24px)
    │   ├── Editor Block (672px, flex-col)
    │   │   ├── C: Toolbar (flex-row, border: 1px #998C5F)
    │   │   │   ├── Bold [B], Italic [I], Stroke [S], List [≡], Link [🔗], Quote [❝]
    │   │   │   └── "Tiêu chuẩn cộng đồng" link
    │   │   └── D: Textarea (min-h:180px, p:16px 24px, bg: white, border: 1px #998C5F)
    │   ├── D.1: Hint "Bạn có thể '@ + tên'..." (16px/700, color: #999)
    │   ├── E: Hashtag Row (flex-row, gap: 16px)
    │   │   ├── E.1: Label "Hashtag *" (22px/700)
    │   │   └── E.2: "+ Hashtag" button (border: 1px #998C5F, r:8px)
    │   └── F: Image Row (flex-row, gap: 16px, items-center)
    │       ├── F.1: Label "Image" (22px/700)
    │       ├── F.2–F.4: Thumbnails (~80x80px each, with x delete)
    │       └── F.5: "+ Image" button (border: 1px #998C5F, r:8px)
    ├── G: Anonymous Checkbox (flex-row, gap: 16px, items-center)
    │   ├── Checkbox (24x24px, border: 1px #999, r:4px, bg: white)
    │   └── Label (22px/700, color: #999)
    └── H: Action Buttons (flex-row, gap: 24px)
        ├── H.1: Cancel (p:16px 40px, border: 1px #998C5F, r:4px, bg: rgba(255,234,158,0.1))
        └── H.2: Submit (502px, h:60px, bg: #FFEA9E, r:8px, 22px/700)
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
| Modal | width: 100%, border-radius: 0 or 16px, padding: 24px |
| Field rows | Stack vertically (label above input) |
| Submit button | width: 100% |
| Image thumbnails | Smaller size, horizontal scroll if needed |

#### Tablet (768px - 1023px)

| Component | Changes |
|-----------|---------|
| Modal | width: 90vw, max-width: 752px |

#### Desktop (≥ 1024px)

| Component | Changes |
|-----------|---------|
| Modal | width: 752px, centered |

---

## Icon Specifications

| Icon Name | Size | Color | Usage |
|-----------|------|-------|-------|
| Dropdown arrow | 24x24 | #00101A | Recipient search dropdown indicator |
| Bold (B) | 24x24 | #00101A | Toolbar bold toggle |
| Italic (I) | 24x24 | #00101A | Toolbar italic toggle |
| Strikethrough (S) | 24x24 | #00101A | Toolbar strikethrough toggle |
| Numbered list | 24x24 | #00101A | Toolbar list toggle |
| Link | 24x24 | #00101A | Toolbar link insert |
| Quote | 24x24 | #00101A | Toolbar quote toggle |
| Plus (+) | 24x24 | #00101A | Add hashtag / add image buttons |
| Close (✕) | 24x24 | #00101A | Cancel button icon, image delete |
| Send (▷) | 24x24 | #00101A | Submit button icon |
| Delete (red circle x) | 20x20 | #EF4444 | Image thumbnail delete |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Modal | opacity, transform | 200ms | ease-out | Open/Close |
| Overlay | opacity | 200ms | ease-out | Open/Close |
| Button | background-color | 150ms | ease-in-out | Hover |
| Input | border-color | 150ms | ease-in-out | Focus |
| Toolbar button | background-color | 100ms | ease | Toggle |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS Class | React Component |
|----------------|---------------|---------------------|-----------------|
| Modal Overlay | 520:11602 (Mask) | `fixed inset-0 bg-[#00101A]/80` | `<ModalOverlay>` |
| Modal Container | I520:11647 | `w-[752px] p-10 bg-[#FFF8E1] rounded-3xl flex flex-col gap-8` | `<WriteKudoModal>` |
| Title | I520:11647;520:9870 | `text-[32px] font-bold leading-10 text-center text-[#00101A] font-montserrat` | Text node |
| Recipient Input | I520:11647;520:9873 | `flex-1 h-14 px-6 py-4 border border-[#998C5F] rounded-lg bg-white` | `<RecipientSearch>` |
| Text Editor | I520:11647;520:9886 | `w-full min-h-[180px] p-4 border border-[#998C5F] bg-white` | `<RichTextEditor>` |
| Hashtag Button | I520:11647;662:8595 | `border border-[#998C5F] rounded-lg px-2 py-1` | `<HashtagSelector>` |
| Image Upload | I520:11647;520:9896 | `flex flex-row gap-4 items-center` | `<ImageUpload>` |
| Cancel Button | I520:11647;520:9906 | `px-10 py-4 border border-[#998C5F] rounded bg-[#FFEA9E]/10` | `<Button variant="secondary">` |
| Submit Button | I520:11647;520:9907 | `w-[502px] h-15 bg-[#FFEA9E] rounded-lg font-bold text-[22px]` | `<Button variant="primary">` |

---

## Notes

- All colors should use CSS variables for theming support
- Prefer Tailwind utility classes as per project constitution (TailwindCSS v4)
- Font: Montserrat (must be loaded via Google Fonts or local files)
- All icons **MUST BE** in **Icon Component** instead of svg files or img tags.
- Ensure color contrast meets WCAG AA (4.5:1 for normal text)
