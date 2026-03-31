# Screen: Viết Kudo

## Screen Info

| Property | Value |
|----------|-------|
| **Figma Frame ID** | 520:11602 |
| **Figma Link** | [Open](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=520:11602) |
| **Screen Group** | Main Application |
| **Status** | discovered |
| **Discovered At** | 2026-03-31 |
| **Last Updated** | 2026-03-31 |

---

## Description

Modal/overlay form for composing and sending a Kudos message to a colleague. Provides a rich-text editor with formatting toolbar, recipient search, hashtag tagging, image attachments, and an anonymous sending option. Overlays on top of the Sun* Kudos Live board or other screens.

---

## Navigation Analysis

### Incoming Navigations (From)

| Source Screen | Trigger | Condition |
|---------------|---------|-----------|
| FAB Expanded (313:9139) | Click "Viet KUDOS" button | FAB must be expanded |
| Thể lệ UPDATE (3204:6051) | Click "Viet KUDOS" button | Rules panel open |
| Sun* Kudos Live board (2940:13431) | Click "Button ghi nhận" CTA | Authenticated user |
| Profile người khác (362:5097) | Click "Send Kudos" | Viewing another user's profile |

### Outgoing Navigations (To)

| Target Screen | Trigger Element | Node ID | Confidence | Notes |
|---------------|-----------------|---------|------------|-------|
| Sun* Kudos Live board | H.2_Button "Gửi" (submit success) | I520:11647;520:9907 | high | After successful kudo submission |
| Previous screen | H.1_Button "Hủy" (cancel) | I520:11647;520:9906 | high | Closes modal, discards changes |
| Addlink Box (1002:12917) | C.5_link toolbar button | I520:11647;662:10507 | high | Opens "Add link" sub-modal |
| Dropdown list hashtag (1002:13013) | E.2_Tag Group "+ Hashtag" button | I520:11647;662:8911 | high | Opens hashtag dropdown |
| Ẩn danh (2099:9148) | G_Gửi ẩn danh checkbox | I520:11647;520:14099 | medium | Toggles anonymous name field |

### Navigation Rules
- **Back behavior**: "Hủy" closes modal, returns to underlying screen
- **Deep link support**: No - modal overlay triggered by user action
- **Auth required**: Yes

---

## Component Schema

### Layout Structure

```
┌─────────────────────────────────────────────┐
│  Header (shared sticky header)              │
├─────────────────────────────────────────────┤
│  Keyvisual background                       │
│  ┌─────────────────────────────────────┐    │
│  │  Bìa (User info card)              │    │
│  │  [Avatar] [Name] [Badge] [Stars]   │    │
│  │  [Danh hiệu badges row]            │    │
│  │  [Kudos count button]              │    │
│  │  [Awards header: SAA 2025 | KUDOS] │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │  Modal: Viết KUDO                   │    │
│  │  A  Title: "Gửi lời cám ơn..."     │    │
│  │  B  Người nhận (search dropdown)*   │    │
│  │     Campaign dropdown*              │    │
│  │  C  Toolbar: B | I | S | # | 🔗 | ❝ │    │
│  │  D  Textarea (rich text)*           │    │
│  │     Hint: "@ + tên" mention         │    │
│  │  E  Hashtag tags (max 5)*           │    │
│  │  F  Image attachments (max 5)       │    │
│  │  G  ☐ Gửi ẩn danh                  │    │
│  │  H  [Hủy]  [Gửi]                   │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### Component Hierarchy

```
Screen (520:11602)
├── Keyvisual (GROUP)
├── Header (INSTANCE) - shared sticky header
├── Cover (RECTANGLE) - overlay mask
├── Bìa (FRAME) - sender info card
│   ├── Infor (FRAME)
│   │   ├── Avatar (ELLIPSE)
│   │   ├── Name: "Huỳnh Dương Xuân Nhật" (TEXT)
│   │   ├── Badge + Stars (FRAME)
│   │   └── Danh hiệu badges row (7x Huy hiệu INSTANCE)
│   ├── Kudos count button (INSTANCE)
│   └── Awards header: "SAA 2025 | KUDOS" (FRAME)
├── Mask (RECTANGLE) - modal backdrop
└── Viết KUDO (INSTANCE) - main form modal
    ├── A_Title: "Gửi lời cám ơn và ghi nhận đến đồng đội" (TEXT)
    ├── B_Chọn người nhận (FRAME) - recipient search
    │   ├── B.1_Title: "Người nhận *" (INSTANCE)
    │   └── B.2_Search: autocomplete dropdown (INSTANCE)
    ├── Campaign dropdown (FRAME)
    │   ├── Title: label + "*" (INSTANCE)
    │   └── Button: dropdown selector (INSTANCE)
    ├── Content (FRAME)
    │   ├── Nhập kudo (FRAME)
    │   │   ├── C_Chức năng - formatting toolbar (FRAME)
    │   │   │   ├── C.1_bold (INSTANCE)
    │   │   │   ├── C.2_italic (INSTANCE)
    │   │   │   ├── C.3_Stroke (INSTANCE)
    │   │   │   ├── C.4_number (INSTANCE)
    │   │   │   ├── C.5_link (INSTANCE) → opens Addlink Box
    │   │   │   ├── C.6_quote (INSTANCE)
    │   │   │   ├── Word count display (FRAME)
    │   │   │   └── Title (INSTANCE)
    │   │   └── D_text filed: textarea (INSTANCE)
    │   ├── D.1_Gợi ý: hint text (FRAME)
    │   ├── E_Hashtag section (FRAME)
    │   │   ├── E.1_Title: "Hashtag *" (INSTANCE)
    │   │   └── E.2_Tag Group: chips + "+ Hashtag" button (FRAME)
    │   └── F_Image section (FRAME)
    │       ├── F.1_Title: "Image" (INSTANCE)
    │       ├── F.2-F.4_Image thumbnails (INSTANCE x5)
    │       └── F.5_Add image button: "+ Image" + "Tối đa 5" (FRAME)
    ├── G_Gửi ẩn danh: anonymous checkbox (INSTANCE)
    └── H_Action buttons (FRAME)
        ├── H.1_Button: "Hủy" (cancel) (INSTANCE)
        └── H.2_Button: "Gửi" (submit) (INSTANCE)
```

### Main Components

| Component | Type | Node ID | Description | Reusable |
|-----------|------|---------|-------------|----------|
| Header | Organism | 520:11606 | Shared sticky header with nav, notification, avatar | Yes |
| Viết KUDO modal | Organism | 520:11647 | Main form modal for writing a Kudo | No |
| B_Chọn người nhận | Molecule | I520:11647;520:9871 | Recipient search with autocomplete dropdown | No |
| C_Chức năng toolbar | Molecule | I520:11647;520:9877 | Rich text formatting toolbar (B/I/S/#/link/quote) | Yes |
| D_text filed | Atom | I520:11647;520:9886 | Textarea for kudo content | Yes |
| E_Tag Group | Molecule | I520:11647;662:8595 | Hashtag chip group with add button | Yes |
| F_Image section | Molecule | I520:11647;520:9896 | Image upload thumbnails with add/remove | Yes |
| G_Gửi ẩn danh | Atom | I520:11647;520:14099 | Anonymous send checkbox toggle | No |
| H_Action buttons | Molecule | I520:11647;520:9905 | Cancel + Submit button pair | Yes |

---

## Form Fields

| Field | Type | Required | Validation | Placeholder |
|-------|------|----------|------------|-------------|
| Người nhận (Recipient) | autocomplete/search | Yes | Must select from suggestions | "Tìm kiếm" |
| Campaign | dropdown | Yes | Must select a campaign | — |
| Nội dung (Content) | rich textarea | Yes | Min 1 char; supports @mention, bold, italic, strikethrough, numbered list, link, quote | "Hãy gửi gắm lời cám ơn và ghi nhận đến đồng đội tại đây nhé!" |
| Hashtag | tag selector | Yes | Min 1, Max 5 hashtags | Click "+ Hashtag" |
| Image | file upload | No | Max 5 images | Click "+ Image" |
| Gửi ẩn danh | checkbox (boolean) | No | — | Unchecked by default |

### Validation Rules

```typescript
const schema = {
  recipient: z.string().min(1, "Vui lòng chọn người nhận"),
  campaign: z.string().min(1, "Vui lòng chọn campaign"),
  content: z.string().min(1, "Vui lòng nhập nội dung"),
  hashtags: z.array(z.string()).min(1, "Vui lòng chọn ít nhất 1 hashtag").max(5, "Tối đa 5 hashtag"),
  images: z.array(z.any()).max(5, "Tối đa 5 ảnh").optional(),
  anonymous: z.boolean().default(false),
};
```

---

## API Mapping

### On Screen Load

| API | Method | Purpose | Response Usage |
|-----|--------|---------|----------------|
| GET /users/search?q= | GET | Search recipients by name | Populate autocomplete suggestions |
| GET /campaigns/active | GET | Load active campaigns | Populate campaign dropdown |
| GET /hashtags | GET | Load available hashtags | Populate hashtag dropdown list |

### On User Action

| Action | API | Method | Request Body | Response |
|--------|-----|--------|--------------|----------|
| Submit Kudo | /kudos | POST | `{recipientId, campaignId, content, hashtags[], images[], anonymous}` | `{id, status}` |
| Search recipient | /users/search?q={query} | GET | — | `[{id, name, avatar, badge}]` |
| Upload image | /media/upload | POST | `FormData(file)` | `{url, id}` |

### Error Handling

| Error Code | Message | UI Action |
|------------|---------|-----------|
| 400 | Validation failed | Show field-level errors (red borders + messages) |
| 401 | Unauthorized | Redirect to Login |
| 413 | Image too large | Show toast error |
| 500 | Server error | Show retry toast |

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| recipientId | string | null | Selected recipient |
| campaignId | string | null | Selected campaign |
| content | string | "" | Rich text content |
| hashtags | string[] | [] | Selected hashtag list (max 5) |
| images | File[] | [] | Attached images (max 5) |
| anonymous | boolean | false | Anonymous toggle |
| isSubmitting | boolean | false | Submit loading state |
| errors | object | {} | Validation errors |

### Global State (If Applicable)

| State | Store | Read/Write | Purpose |
|-------|-------|------------|---------|
| user | authStore | Read | Current user info for sender card |
| kudosFeed | kudosStore | Write | Prepend new kudo after submit |

---

## UI States

### Loading State
- Show spinner on "Gửi" button during submission
- Disable all form inputs and buttons during submit

### Error State
- Red border on required fields when empty on submit
- Inline error messages below fields
- Toast notification for API errors

### Success State
- Close modal
- Return to Sun* Kudos Live board
- New kudo appears at top of feed
- Success toast

### Empty State
- N/A (form starts empty by design)

---

## Analysis Metadata

| Property | Value |
|----------|-------|
| Analyzed By | Screen Flow Discovery |
| Analysis Date | 2026-03-31 |
| Needs Deep Analysis | No |
| Confidence Score | High |

### Next Steps
- [ ] Confirm campaign dropdown data source with backend
- [ ] Confirm image upload size/format limits
- [ ] Define @mention search debounce/threshold
- [ ] Review anonymous mode UX with design team
