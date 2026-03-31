# Feature Specification: Addlink Box (Thêm đường dẫn)

**Frame ID**: `1002:12917`
**Frame Name**: `Addlink Box`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-31
**Status**: Reviewed

---

## Overview

A small dialog/popover that appears when the user clicks the "Link" button in the Write Kudo rich-text toolbar. It allows the user to enter a display text ("Nội dung") and a URL, then either save or cancel. The saved link is inserted into the rich-text editor as a hyperlink.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Insert a hyperlink into the Kudo message (Priority: P1)

A user is composing a Kudo and wants to insert a hyperlink that points to an external resource (e.g., a project page, article, or document).

**Why this priority**: This is the sole purpose of this dialog — inserting links into the rich-text editor.

**Independent Test**: Click the Link toolbar button in the Kudo editor, fill in "Nội dung" and "URL", click "Lưu", and verify the link is inserted into the editor.

**Acceptance Scenarios**:

1. **Given** the user clicks the Link button in the toolbar, **When** the Addlink Box dialog appears, **Then** it displays two input fields ("Nội dung" and "URL") and two buttons ("Hủy" and "Lưu").
2. **Given** the user fills in both "Nội dung" and "URL" with valid values, **When** they click "Lưu", **Then** the hyperlink is inserted into the editor at the cursor position and the dialog closes.
3. **Given** the user has selected text in the editor before clicking Link, **When** the dialog opens, **Then** the "Nội dung" field is pre-filled with the selected text.

---

### User Story 2 - Validate link inputs (Priority: P1)

The system must validate that both fields are filled and the URL is in a valid format before saving.

**Why this priority**: Prevents broken or empty links in the Kudo message.

**Independent Test**: Try submitting with empty fields or an invalid URL and verify error messages.

**Acceptance Scenarios**:

1. **Given** the "Nội dung" field is empty, **When** the user clicks "Lưu", **Then** an error is shown on the "Nội dung" field.
2. **Given** the "URL" field contains an invalid URL (missing http/https), **When** the user clicks "Lưu", **Then** an error is shown on the "URL" field.
3. **Given** the "URL" field is empty, **When** the user clicks "Lưu", **Then** an error is shown on the "URL" field.

---

### User Story 3 - Cancel link insertion (Priority: P2)

A user decides not to insert a link and wants to close the dialog without changes.

**Why this priority**: Secondary but necessary for usability.

**Independent Test**: Open the dialog, type something, click "Hủy", verify the dialog closes and nothing is inserted.

**Acceptance Scenarios**:

1. **Given** the dialog is open, **When** the user clicks "Hủy", **Then** the dialog closes without inserting any link.

---

### User Story 4 - Keyboard accessibility (Priority: P2)

The dialog must be fully navigable via keyboard.

**Why this priority**: Accessibility is required by the constitution (WCAG compliance).

**Independent Test**: Open the dialog using keyboard, Tab between fields, press Enter to save, press Escape to cancel.

**Acceptance Scenarios**:

1. **Given** the dialog opens, **When** it appears, **Then** focus is automatically set to the "Nội dung" input field.
2. **Given** the user is in the "Nội dung" field, **When** they press Tab, **Then** focus moves to the "URL" field.
3. **Given** the dialog is open, **When** the user presses Escape, **Then** the dialog closes without saving.

---

### Edge Cases

- **URL without protocol**: Given the user enters "example.com" (no http/https), When "Lưu" is clicked, Then the system should either auto-prepend "https://" or show an error "URL phải bắt đầu bằng http:// hoặc https://".
- **Very long URL**: Given the user pastes a URL >2048 characters, When validation runs, Then an error is shown "URL không được vượt quá 2048 ký tự".
- **Whitespace-only "Nội dung"**: Given the user enters only spaces, When "Lưu" is clicked, Then an error is shown "Nội dung không được để trống".

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Title | I1002:12682;1002:12500 | "Thêm đường dẫn" heading | Static display |
| Nội dung Input | I1002:12682;1002:12501 | Text field for link display text | Type text, required |
| URL Input | I1002:12682;1002:12652 | Text field for link URL | Type URL, required |
| Hủy Button | I1002:12682;1002:12544 | Cancel button with close icon | Click to close |
| Lưu Button | I1002:12682;1002:12545 | Save button with link icon | Click to validate & save |

### Navigation Flow

- From: Write Kudo modal → Rich text toolbar → Link button click
- To: Closes on "Lưu" (link inserted) or "Hủy" (canceled)
- Triggers: Click on Link icon in the rich-text toolbar

### Visual Requirements

- Dialog appears as a popover or inline dialog near the toolbar
- Warm cream background (#FFF8E1) matching the parent modal
- Rounded corners (24px)

> **See [design-style.md](design-style.md) for detailed visual specifications.**

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a dialog with "Nội dung" (text) and "URL" (link) input fields when the Link toolbar button is clicked.
- **FR-002**: System MUST validate that "Nội dung" is 1–100 characters and not only whitespace.
- **FR-003**: System MUST validate that "URL" is a valid URL format (http/https) and 5–2048 characters.
- **FR-004**: System MUST insert the link into the rich-text editor at the current cursor position on successful save.
- **FR-005**: System MUST close the dialog without changes when "Hủy" is clicked.
- **FR-006**: If text is selected in the editor before opening, "Nội dung" MUST be pre-populated with the selected text.

### Technical Requirements

- **TR-001**: URL validation should use a standard URL regex or `URL` constructor.
- **TR-002**: The dialog should be managed as part of the rich-text editor's plugin system (e.g., Tiptap link extension).
- **TR-003**: Dialog MUST trap focus within itself while open (Tab cycles through Nội dung → URL → Hủy → Lưu).
- **TR-004**: Escape key MUST close the dialog without saving.

### Key Entities

- **Link**: Display text (nội dung) + URL pair inserted into the rich-text content.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| None | - | Client-side only — no API calls needed | - |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Links are correctly inserted into the editor with the specified text and URL.
- **SC-002**: Invalid URLs are rejected with clear error messages.
- **SC-003**: Dialog opens and closes within 100ms.

---

## Out of Scope

- Link preview/unfurling
- Editing existing links (future enhancement)
- File upload links

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] Write Kudo modal spec (`.momorph/specs/520_11602-viet-kudo/spec.md`) — parent feature

---

## Notes

- This dialog is a sub-component of the Write Kudo modal's rich-text editor.
- The "Nội dung" label in the design translates to "Content" (the display text for the link).
- The "URL" field includes a link icon inside the input.
