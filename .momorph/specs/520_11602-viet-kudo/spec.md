# Feature Specification: Viết Kudo (Write Kudo Modal)

**Frame ID**: `520:11602`
**Frame Name**: `Viết Kudo`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-31
**Status**: Reviewed

---

## Overview

A modal dialog that allows users to compose and send a "Kudo" — a recognition/appreciation message — to a colleague. The modal includes fields for selecting a recipient, writing a title (danh hiệu), composing a rich-text message body, selecting hashtags, attaching images, and optionally sending anonymously. This is the primary user interaction for the Sun Kudos feature.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Send a Kudo to a colleague (Priority: P1)

A logged-in user wants to send a recognition message (Kudo) to a colleague by filling out the required fields and submitting the form.

**Why this priority**: This is the core functionality of the feature — without it, the Kudos system has no value.

**Independent Test**: Open the modal, fill in recipient, title, message body, select at least 1 hashtag, and click "Gửi". Verify the Kudo is submitted successfully and the modal closes.

**Acceptance Scenarios**:

1. **Given** the user opens the Write Kudo modal, **When** they fill in all required fields (Người nhận, Danh hiệu, message body, at least 1 hashtag) and click "Gửi", **Then** the Kudo is submitted, a success indicator is shown, and the modal closes.
2. **Given** the user opens the Write Kudo modal, **When** they click "Gửi" without filling required fields, **Then** validation errors are displayed on the empty required fields and the form is not submitted.
3. **Given** the user has filled all required fields, **When** they click "Gửi", **Then** the button shows a loading state and is disabled until the request completes.

---

### User Story 2 - Select a recipient via search (Priority: P1)

A user needs to find and select a colleague as the recipient of the Kudo using the search dropdown.

**Why this priority**: Selecting a recipient is a required step — the Kudo cannot be sent without it.

**Independent Test**: Click the "Người nhận" search input, type a colleague's name, and select from the dropdown suggestions.

**Acceptance Scenarios**:

1. **Given** the user focuses on the "Người nhận" search input, **When** they type at least 1 character, **Then** a dropdown list of matching colleagues appears.
2. **Given** the search dropdown is showing results, **When** the user clicks on a colleague, **Then** the recipient field is populated with the selected colleague's name.
3. **Given** no colleagues match the search query, **When** the user types a non-matching name, **Then** an empty state or "no results" message is shown.

---

### User Story 3 - Compose a rich-text message (Priority: P1)

A user wants to write a formatted appreciation message using the rich-text editor.

**Why this priority**: The message body is a required field and the formatting toolbar is part of the core editing experience.

**Independent Test**: Type text in the editor area, apply formatting (bold, italic, strikethrough, numbered list, link, quote), and verify the formatting is applied.

**Acceptance Scenarios**:

1. **Given** the user focuses on the text editor, **When** they type text, **Then** the text appears in the editor area.
2. **Given** the user selects text in the editor, **When** they click the Bold (B) button, **Then** the selected text becomes bold.
3. **Given** the user selects text, **When** they click the Link button, **Then** a dialog appears to enter a URL (see Addlink Box spec `1002:12917`).
4. **Given** the user types "@" followed by a name, **When** autocomplete suggestions appear, **Then** the user can select a colleague to mention.

---

### User Story 4 - Select hashtags (Priority: P1)

A user must select at least 1 hashtag (max 5) from a predefined list to categorize the Kudo.

**Why this priority**: Hashtags are a required field for submission.

**Independent Test**: Click the "+ Hashtag" button, select hashtags from the dropdown, verify chips appear, and verify max 5 limit.

**Acceptance Scenarios**:

1. **Given** the user clicks the "+ Hashtag" button, **When** the dropdown opens (see Dropdown list hashtag spec `1002:13013`), **Then** the user can select/deselect hashtags.
2. **Given** the user has selected 5 hashtags, **When** they try to select another, **Then** the selection is blocked (additional items are disabled).
3. **Given** hashtags are selected, **When** chips are displayed next to the label, **Then** the user can click "x" on a chip to remove it.

---

### User Story 5 - Attach images (Priority: P2)

A user optionally wants to attach images to the Kudo for visual context.

**Why this priority**: Images are optional and enhance but don't block the core submission flow.

**Independent Test**: Click "+ Image", select files, verify thumbnails appear with delete buttons, verify max 5 limit.

**Acceptance Scenarios**:

1. **Given** the user clicks "+ Image", **When** the file picker opens and the user selects an image, **Then** a thumbnail preview appears in the image row.
2. **Given** 5 images are attached, **When** the limit is reached, **Then** the "+ Image" button is hidden.
3. **Given** images are attached, **When** the user clicks the "x" button on a thumbnail, **Then** the image is removed from the list.

---

### User Story 6 - Send Kudo anonymously (Priority: P2)

A user optionally wants to send the Kudo anonymously so the recipient doesn't know who sent it.

**Why this priority**: Anonymous sending is an optional enhancement.

**Independent Test**: Check the "Gửi lời cám ơn và ghi nhận ẩn danh" checkbox before submitting.

**Acceptance Scenarios**:

1. **Given** the checkbox is unchecked (default), **When** the user checks it, **Then** the anonymous mode is enabled and an anonymous name field may appear.
2. **Given** anonymous mode is enabled, **When** the Kudo is submitted, **Then** the recipient sees the Kudo without the sender's real identity.

---

### User Story 7 - Cancel Kudo composition (Priority: P3)

A user wants to discard the current Kudo and close the modal.

**Why this priority**: Secondary action, but necessary for good UX.

**Independent Test**: Fill in some fields, click "Hủy", verify the modal closes without saving.

**Acceptance Scenarios**:

1. **Given** the user has entered data in the form, **When** they click "Hủy", **Then** the modal closes and all entered data is discarded.

---

### Edge Cases

- **Network failure during submission**: Given the user clicks "Gửi" and the network fails, When the API returns an error, Then a toast/error message is shown and the form remains open with data preserved.
- **Very long message content**: Given the user types beyond the max character limit (TBD), When the limit is exceeded, Then the editor shows a character counter and prevents further input or warns.
- **Invalid recipient**: Given the selected recipient's account has been deactivated after selection, When the form is submitted, Then the API returns a validation error and the user is prompted to select a different recipient.
- **Image file size exceeded**: Given the user selects an image exceeding the max file size, When the upload is attempted, Then an inline error is shown on the image section (e.g., "Ảnh vượt quá kích thước cho phép").
- **"@" mention with special characters**: Given a colleague's name contains special characters, When the user types "@" followed by the name, Then the autocomplete normalizes the search and displays matching results.
- **Concurrent modal interaction**: Given the Addlink Box or Hashtag Dropdown is open, When the user clicks outside both, Then only the sub-dialog closes (not the parent modal).

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Modal Title | I520:11647;520:9870 | "Gửi lời cám ơn và ghi nhận đến đồng đội" | Static display, centered |
| Người nhận (Recipient) | I520:11647;520:9871 | Search dropdown to select recipient | Type to search, click to select |
| Danh hiệu (Title) | I520:11647;520:9877 (Frame 552) | Text input for custom title with hint text | Free text input, required |
| Rich Text Toolbar | I520:11647;520:9881–662:10647 | Bold, Italic, Strikethrough, List, Link, Quote | Toggle buttons |
| Community Standards Link | (within toolbar) | "Tiêu chuẩn cộng đồng" link | Click opens community guidelines |
| Text Editor | I520:11647;520:9886 | Textarea for message body | Rich text input, @ mentions |
| Hashtag Field | I520:11647;520:9890 | Hashtag selector with chips | Click to open dropdown, max 5 |
| Image Upload | I520:11647;520:9896 | Image attachment section | Click to upload, x to remove, max 5 |
| Anonymous Checkbox | I520:11647;520:14099 | "Gửi lời cám ơn và ghi nhận ẩn danh" | Toggle checkbox |
| Cancel Button | I520:11647;520:9906 | "Hủy" with close icon | Click to close modal |
| Submit Button | I520:11647;520:9907 | "Gửi" with send icon | Click to submit, disabled when invalid |

### Navigation Flow

- From: Sun Kudos page (floating action button or write button)
- To: Closes modal on success or cancel; stays open on validation error
- Triggers: Click "Viết Kudo" button on the main page

### Visual Requirements

- Modal overlay with dark background (rgba(0, 16, 26, 0.8))
- Modal container: 752px wide, rounded corners (24px), warm background (#FFF8E1)
- Responsive: modal should adapt on smaller screens
- Accessibility: all form fields must have labels, focus states, keyboard navigation support

> **See [design-style.md](design-style.md) for detailed visual specifications.**

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a modal dialog with form fields for composing a Kudo.
- **FR-002**: System MUST require "Người nhận" (recipient), "Danh hiệu" (title), message body, and at least 1 hashtag before allowing submission.
- **FR-003**: System MUST provide a search/autocomplete dropdown for selecting the recipient from a list of colleagues.
- **FR-004**: System MUST provide a rich-text editor with Bold, Italic, Strikethrough, Numbered list, Link, and Quote formatting.
- **FR-005**: System MUST support "@" mention autocomplete in the text editor to tag colleagues.
- **FR-006**: System MUST allow selecting 1–5 hashtags from a predefined list via a dropdown.
- **FR-007**: System MUST allow attaching 0–5 images with preview thumbnails and individual delete buttons.
- **FR-008**: System MUST provide an anonymous sending option via checkbox.
- **FR-009**: System MUST validate all required fields before submission and show inline errors for empty/invalid fields.
- **FR-010**: System MUST disable the "Gửi" button when required fields are incomplete.
- **FR-011**: System MUST close the modal and discard data when "Hủy" is clicked.
- **FR-012**: The "Danh hiệu" field serves as the Kudo title displayed publicly.

### Technical Requirements

- **TR-001**: Rich-text editor should use a lightweight library (e.g., Tiptap or similar) compatible with React Server Components architecture.
- **TR-002**: Image uploads MUST be validated for file type (JPEG, PNG, GIF, WebP) and file size (max TBD) before upload.
- **TR-003**: Form submission MUST use an API route handler with server-side validation (zod schema).
- **TR-004**: Recipient search MUST debounce API calls (300ms minimum).
- **TR-005**: Modal MUST be keyboard-accessible: Tab to navigate fields, Escape to close modal, Enter to submit when focused on "Gửi".
- **TR-006**: All form fields MUST have associated `<label>` elements or `aria-label` for screen reader support.

### Key Entities *(if feature involves data)*

- **Kudo**: The recognition message entity — contains recipient, sender, title (danh hiệu), body (rich text), hashtags, images, anonymous flag.
- **User/Colleague**: The recipient and sender — searched and selected from the user directory.
- **Hashtag**: Predefined categorization tags for Kudos.

---

## State Management

### Local Component State
- `recipient`: Selected user object (null | User)
- `title`: Danh hiệu text string
- `body`: Rich-text content (HTML/JSON from editor)
- `selectedHashtags`: Array of hashtag IDs (max 5)
- `images`: Array of uploaded image objects (max 5)
- `isAnonymous`: Boolean (default: false)
- `isSubmitting`: Boolean — loading state for submit button
- `errors`: Record of field-level validation errors

### Global State
- None required — modal is self-contained. Kudo list refresh on parent page after successful submission.

### Loading / Error States
- **Submitting**: "Gửi" button shows spinner, disabled; all fields become read-only.
- **Upload in progress**: Image thumbnail shows progress indicator.
- **API error**: Toast notification with retry option; form remains open with data preserved.
- **Validation error**: Inline error messages below each invalid field; red border on field.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /api/kudos | POST | Submit a new Kudo | Predicted |
| /api/users/search | GET | Search colleagues for recipient autocomplete | Predicted |
| /api/hashtags | GET | Fetch available hashtag list | Predicted |
| /api/campaigns/active | GET | Fetch active campaign context | Predicted |
| /api/upload/image | POST | Upload attached images | Predicted |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully submit a Kudo with all required fields filled — submission success rate > 95%.
- **SC-002**: Recipient search returns results within 500ms of typing.
- **SC-003**: Form validation provides clear, immediate feedback on all required fields.
- **SC-004**: Image upload and preview completes within 2 seconds per image.

---

## Out of Scope

- Editing or deleting an already-submitted Kudo
- Kudo notification system (push/email notifications to recipient)
- Kudo display/feed rendering (covered by other specs)
- Admin management of hashtag list

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- The "Danh hiệu" field has a helper text: "Ví dụ: Người truyền động lực cho tôi. Danh hiệu sẽ hiển thị làm tiêu đề Kudos của bạn."
- The link insertion toolbar button opens the Addlink Box modal (see spec `1002_12917-addlink-box`)
- The hashtag button opens the Dropdown list hashtag (see spec `1002_13013-dropdown-list-hashtag`)
- Text in the design is in Vietnamese (vi-VN locale)
