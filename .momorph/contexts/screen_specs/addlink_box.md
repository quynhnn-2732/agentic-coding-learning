# Screen: Addlink Box

## Screen Info

| Property | Value |
|----------|-------|
| **Figma Frame ID** | 1002:12917 |
| **Figma Link** | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=1002:12917) |
| **Screen Group** | Overlays / Modals |
| **Status** | discovered |
| **Discovered At** | 2026-03-31 |
| **Last Updated** | 2026-03-31 |

---

## Description

Small modal/popover dialog for inserting a hyperlink into the rich-text editor within the "Viet Kudo" form. Provides two input fields: "Text" (the display text) and "Link" (the URL), plus "Huy" (Cancel) and "Luu" (Save) action buttons.

---

## Navigation Analysis

### Incoming Navigations (From)

| Source Screen | Trigger | Condition |
|---------------|---------|-----------|
| Viết Kudo (520:11602) | Click C.5_link toolbar button | Rich text editor active |
| Man Sửa bài viết (1949:13746) | Click link toolbar button | Editing an existing kudo |

### Outgoing Navigations (To)

| Target Screen | Trigger Element | Node ID | Confidence | Notes |
|---------------|-----------------|---------|------------|-------|
| Viết Kudo (520:11602) | D.1_Button "Hủy" (cancel) | I1002:12682;1002:12544 | high | Closes modal, discards link |
| Viết Kudo (520:11602) | D.2_Button "Lưu" (save) | I1002:12682;1002:12545 | high | Inserts link into editor, closes modal |

### Navigation Rules
- **Back behavior**: "Hủy" closes modal, returns to Viết Kudo editor
- **Deep link support**: No - sub-modal of Viết Kudo
- **Auth required**: Yes (inherits from parent)

---

## Component Schema

### Layout Structure

```
┌─────────────────────────────────────┐
│  A_Title: "Add link"                │
├─────────────────────────────────────┤
│  B_Text                             │
│    B.1_Title: "Text"                │
│    B.2_Text box: [input field]      │
├─────────────────────────────────────┤
│  C_Link                             │
│    C.1_Title: "Link"                │
│    C.2_Text box: [input field] 🔗   │
├─────────────────────────────────────┤
│  D_Button                           │
│    [Hủy]           [Lưu]           │
└─────────────────────────────────────┘
```

### Component Hierarchy

```
Screen (1002:12917)
└── Add link box (INSTANCE)
    ├── A_Title: "Add link" (TEXT)
    ├── B_Text (FRAME)
    │   ├── B.1_Title: "Text" label (INSTANCE)
    │   └── B.2_Text box: text input (INSTANCE)
    ├── C_Link (FRAME)
    │   ├── C.1_Title: "Link" label (INSTANCE)
    │   └── C.2_Text box: URL input with link icon (INSTANCE)
    └── D_Button (FRAME)
        ├── D.1_Button Hủy: cancel with X icon (INSTANCE)
        └── D.2_Button Lưu: save with link icon, yellow bg (INSTANCE)
```

### Main Components

| Component | Type | Node ID | Description | Reusable |
|-----------|------|---------|-------------|----------|
| Add link box | Organism | 1002:12682 | Complete link insertion dialog | Yes |
| B_Text | Molecule | I1002:12682;1002:12501 | Text display field with label | Yes |
| C_Link | Molecule | I1002:12682;1002:12652 | URL input field with label | Yes |
| D_Button | Molecule | I1002:12682;1002:12543 | Cancel + Save button pair | Yes |

---

## Form Fields

| Field | Type | Required | Validation | Placeholder |
|-------|------|----------|------------|-------------|
| Text | text | Yes | 1-100 chars, not only whitespace | — |
| Link | url | Yes | Valid URL (http/https), 5-2048 chars | — |

### Validation Rules

```typescript
const schema = {
  text: z.string()
    .min(1, "Text is required")
    .max(100, "Text must be at most 100 characters")
    .refine(val => val.trim().length > 0, "Text cannot be only whitespace"),
  link: z.string()
    .min(5, "Link is too short")
    .max(2048, "Link is too long")
    .url("Please enter a valid URL"),
};
```

---

## API Mapping

### On Screen Load

No API calls - all data is local.

### On User Action

| Action | API | Method | Request Body | Response |
|--------|-----|--------|--------------|----------|
| Save link | — | — | N/A (local insertion into editor) | — |

### Error Handling

| Error Code | Message | UI Action |
|------------|---------|-----------|
| — | Text empty | Inline field error, red border |
| — | Invalid URL | Inline field error, red border |

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| text | string | "" (or selected text from editor) | Display text for the link |
| link | string | "" | URL for the hyperlink |
| errors | object | {} | Field validation errors |

### Global State (If Applicable)

None - purely local modal.

---

## UI States

### Loading State
- N/A (no API calls)

### Error State
- Red border on fields when validation fails
- Error message below invalid field

### Success State
- Modal closes
- Link inserted into rich text editor at cursor position

### Empty State
- Both fields empty on open (unless text was selected in editor)

---

## Analysis Metadata

| Property | Value |
|----------|-------|
| Analyzed By | Screen Flow Discovery |
| Analysis Date | 2026-03-31 |
| Needs Deep Analysis | No |
| Confidence Score | High |

### Next Steps
- [ ] Confirm URL validation rules (allow relative links?)
- [ ] Define behavior when editing an existing link vs. inserting new
- [ ] Confirm "open in new tab" checkbox (mentioned in C.5_link spec but not visible in this frame)
