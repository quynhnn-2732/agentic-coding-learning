# Screen: Dropdown list hashtag

## Screen Info

| Property | Value |
|----------|-------|
| **Figma Frame ID** | 1002:13013 |
| **Figma Link** | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=1002:13013) |
| **Screen Group** | Overlays / Modals |
| **Status** | discovered |
| **Discovered At** | 2026-03-31 |
| **Last Updated** | 2026-03-31 |

---

## Description

Dropdown overlay for selecting hashtags when writing a Kudo. Displays a scrollable list of predefined hashtag options with toggle selection (checkmark for selected items). Supports multi-select up to a maximum of 5 hashtags. Appears below the "+ Hashtag" button in the Viet Kudo form.

---

## Navigation Analysis

### Incoming Navigations (From)

| Source Screen | Trigger | Condition |
|---------------|---------|-----------|
| Viết Kudo (520:11602) | Click E.2_Tag Group "+ Hashtag" button | Form is open |
| Man Sửa bài viết (1949:13746) | Click "+ Hashtag" button | Edit mode active |

### Outgoing Navigations (To)

| Target Screen | Trigger Element | Node ID | Confidence | Notes |
|---------------|-----------------|---------|------------|-------|
| Viết Kudo (520:11602) | Click outside dropdown / selection complete | — | high | Dropdown closes, selected hashtags appear as chips |

### Navigation Rules
- **Back behavior**: Click outside or press Escape to close
- **Deep link support**: No - inline dropdown component
- **Auth required**: Yes (inherits from parent)

---

## Component Schema

### Layout Structure

```
┌─────────────────────────────────────┐
│  [+ Hashtag] button (trigger)       │
├─────────────────────────────────────┤
│  Dropdown-List                      │
│  ┌─────────────────────────────┐    │
│  │ A  #High-performing    ✓   │    │
│  │ B  #BE PROFESSIONAL    ✓   │    │
│  │ C  #BE OPTIMISTIC      ✓   │    │
│  │ D  #Be A Team              │    │
│  │    #Hashtag 5               │    │
│  │    #Hashtag 6               │    │
│  │    #Hashtag 7               │    │
│  │    #Hashtag 8               │    │
│  │    ...                      │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### Component Hierarchy

```
Screen (1002:13013)
├── Frame 541 (FRAME) - trigger button container
│   └── Button: "+ Hashtag" (INSTANCE)
└── Dropdown-List (FRAME) - scrollable list
    ├── A_Hashtag đã chọn 1 (FRAME) - selected item
    │   ├── A.1_Hashtag: "#High-performing" (FRAME)
    │   └── A.2_icon đã chọn: checkmark (INSTANCE)
    ├── B_Hashtag đã chọn 2 (FRAME) - selected item
    │   ├── B.1_Hashtag: "#BE PROFESSIONAL" (FRAME)
    │   └── B.2_icon đã chọn: checkmark (INSTANCE)
    ├── C_Hashtag đã chọn 3 (FRAME) - selected item
    │   ├── C.1_Hashtag: "#BE OPTIMISTIC" (FRAME)
    │   └── C.2_icon đã chọn: checkmark (INSTANCE)
    ├── D_Hashtag chưa chọn (INSTANCE) - unselected item
    └── ... (more unselected items)
```

### Main Components

| Component | Type | Node ID | Description | Reusable |
|-----------|------|---------|-------------|----------|
| Dropdown-List | Organism | 1002:13102 | Scrollable hashtag selection list | Yes |
| Hashtag đã chọn (selected) | Molecule | 1002:13185 | Selected hashtag row with checkmark | Yes |
| Hashtag chưa chọn (unselected) | Molecule | 1002:13104 | Unselected hashtag row without checkmark | Yes |
| icon đã chọn | Atom | 1002:13204 | Checkmark icon (24x24px circle) | Yes |

---

## Form Fields

| Field | Type | Required | Validation | Placeholder |
|-------|------|----------|------------|-------------|
| Hashtag selection | multi-select | Yes (min 1) | Min 1, Max 5 selections | — |

### Available Hashtags (from spec)

| # | Hashtag |
|---|---------|
| 1 | Toàn diện |
| 2 | Giỏi chuyên môn |
| 3 | Hiệu suất cao |
| 4 | Truyền cảm hứng |
| 5 | Cống hiến |
| 6 | Aim High |
| 7 | Be Agile |
| 8 | Wasshoi |
| 9 | Hướng mục tiêu |
| 10 | Hướng khách hàng |
| 11 | Chuẩn quy trình |
| 12 | Giải pháp sáng tạo |
| 13 | Quản lý xuất sắc |

---

## API Mapping

### On Screen Load

| API | Method | Purpose | Response Usage |
|-----|--------|---------|----------------|
| GET /hashtags | GET | Load all available hashtags | Populate dropdown list |

### On User Action

| Action | API | Method | Request Body | Response |
|--------|-----|--------|--------------|----------|
| Toggle hashtag | — | — | N/A (local state update) | — |

No server-side calls on selection -- hashtags are stored locally and sent with the Kudo on submit.

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| selectedHashtags | string[] | [] (or pre-selected from form) | Currently selected hashtags |
| isOpen | boolean | false | Dropdown visibility |

### Global State (If Applicable)

None - state is managed by parent Viết Kudo form.

---

## UI States

### Loading State
- Skeleton items while hashtags load from API

### Error State
- N/A (predefined list, unlikely to fail)

### Success State
- Selected items show checkmark icon on the right
- Corresponding chips appear in the Hashtag section of the parent form

### Empty State
- N/A (predefined list always has items)

### Max Selection State
- When 5 hashtags are selected, remaining unselected items become disabled (cannot select more)
- Visual: dimmed/grayed-out rows

---

## Behavior Notes

- **Toggle**: Click on a selected item deselects it (removes checkmark); click on unselected item selects it (adds checkmark)
- **Hover**: Row background color changes slightly on hover
- **Max limit**: After 5 selections, unselected items are disabled until one is deselected
- **Close**: Dropdown closes when clicking outside or when the "+ Hashtag" trigger is clicked again

---

## Analysis Metadata

| Property | Value |
|----------|-------|
| Analyzed By | Screen Flow Discovery |
| Analysis Date | 2026-03-31 |
| Needs Deep Analysis | No |
| Confidence Score | High |

### Next Steps
- [ ] Confirm full hashtag list with product team
- [ ] Confirm if hashtags are fetched from API or hardcoded
- [ ] Define behavior when editing existing kudo with pre-selected hashtags
