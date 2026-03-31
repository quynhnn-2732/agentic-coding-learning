# Feature Specification: Dropdown List Hashtag

**Frame ID**: `1002:13013`
**Frame Name**: `Dropdown list hashtag`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-31
**Status**: Reviewed

---

## Overview

A dropdown list component that appears when the user clicks the "+ Hashtag" button in the Write Kudo modal. It displays all available hashtags with checkmark indicators for selected items. Users can select up to 5 hashtags from the predefined list. Selected hashtags are highlighted with a different background and a check icon.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Select hashtags from dropdown (Priority: P1)

A user composing a Kudo opens the hashtag dropdown and selects one or more hashtags to categorize their recognition.

**Why this priority**: Hashtag selection is a required field for Kudo submission.

**Independent Test**: Click "+ Hashtag" button, verify dropdown opens with all available hashtags, select 1–5 hashtags, verify check icons appear and chips are added in the parent form.

**Acceptance Scenarios**:

1. **Given** the user clicks the "+ Hashtag" button, **When** the dropdown opens, **Then** all available hashtags are listed with their current selection state.
2. **Given** the dropdown is open, **When** the user clicks an unselected hashtag, **Then** a check icon appears on that item and a chip is added to the hashtag field in the parent form.
3. **Given** a hashtag is already selected (check icon visible), **When** the user clicks it again, **Then** the check icon disappears and the chip is removed from the parent form.

---

### User Story 2 - Enforce maximum 5 hashtags (Priority: P1)

The system must prevent the user from selecting more than 5 hashtags.

**Why this priority**: Business rule — max 5 hashtags per Kudo.

**Independent Test**: Select 5 hashtags, attempt to select a 6th, verify it is blocked.

**Acceptance Scenarios**:

1. **Given** the user has selected 5 hashtags, **When** they try to click an unselected hashtag, **Then** the selection is blocked (item appears disabled or click is ignored).
2. **Given** 5 hashtags are selected, **When** the user deselects one, **Then** they can select a new one again.

---

### User Story 3 - Close dropdown (Priority: P2)

The user can close the dropdown after making selections.

**Why this priority**: Standard dropdown behavior.

**Independent Test**: Open dropdown, click outside or press Escape, verify it closes.

**Acceptance Scenarios**:

1. **Given** the dropdown is open, **When** the user clicks outside the dropdown, **Then** it closes.
2. **Given** the dropdown is open, **When** the user presses Escape, **Then** it closes.

---

### User Story 4 - Keyboard navigation (Priority: P2)

The dropdown must support keyboard navigation for accessibility.

**Why this priority**: Accessibility compliance per constitution.

**Independent Test**: Open dropdown with Enter/Space on trigger, navigate with arrow keys, select with Enter, close with Escape.

**Acceptance Scenarios**:

1. **Given** the trigger button is focused, **When** the user presses Enter or Space, **Then** the dropdown opens and focus moves to the first item.
2. **Given** the dropdown is open, **When** the user presses Arrow Down/Up, **Then** focus moves between hashtag items.
3. **Given** a hashtag item is focused, **When** the user presses Enter or Space, **Then** the item is toggled (selected/deselected).

---

### Edge Cases

- **No hashtags from API**: Given the API returns an empty list, When the dropdown opens, Then an empty state "Không có hashtag nào" is displayed.
- **Rapid clicking**: Given the user rapidly clicks the same hashtag, When the clicks occur, Then each click is debounced (50ms) to prevent double-toggling.
- **Scrolled parent modal**: Given the parent modal is scrolled, When the dropdown is open, Then it remains anchored to the trigger button (positioned with `position: absolute` relative to the trigger).
- **Long hashtag list overflow**: Given there are more hashtags than fit in the viewport, When the dropdown renders, Then it shows a scrollbar (max-height with overflow-y: auto).

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| + Hashtag Button | 1002:15115 | Trigger button with "+" icon and "Tối đa 5" text | Click to open dropdown |
| Dropdown Container | 1002:13102 | Dark background dropdown list | Contains hashtag items |
| Selected Hashtag Item | 1002:13185 | Item with highlighted bg and check icon | Click to deselect |
| Unselected Hashtag Item | 1002:13104 | Item without check icon | Click to select |
| Check Icon | 1002:13204 | Circle checkmark icon (24x24) | Indicates selection |

### Available Hashtags (from design)

The predefined hashtag list includes:
- #High-performing
- #BE PROFESSIONAL
- #BE OPTIMISTIC
- #BE A TEAM
- #THINK OUTSIDE THE BOX
- #GET RISKY
- #GO FAST
- #WASSHOI

*Note: Full list from design items includes additional Vietnamese hashtags: Toàn diện, Giỏi chuyên môn, Hiệu suất cao, Truyền cảm hứng, Cống hiến, Aim High, Be Agile, Wasshoi, Hướng mục tiêu, Hướng khách hàng, Chuẩn quy trình, Giải pháp sáng tạo, Quản lý xuất sắc.*

### Navigation Flow

- From: Write Kudo modal → Hashtag field → "+ Hashtag" button click
- To: Closes on outside click, Escape, or after selections made
- Triggers: Click "+ Hashtag" button

### Visual Requirements

- Dark dropdown background (#00070C) with border
- Selected items have golden highlight background
- Unselected items have transparent background
- Dropdown positioned below/near the "+ Hashtag" button

> **See [design-style.md](design-style.md) for detailed visual specifications.**

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a dropdown list of all available hashtags when the "+ Hashtag" button is clicked.
- **FR-002**: System MUST allow toggling selection of individual hashtags by clicking them.
- **FR-003**: System MUST show a check icon on selected hashtags and highlight them with a distinct background.
- **FR-004**: System MUST enforce a maximum of 5 selected hashtags.
- **FR-005**: System MUST close the dropdown when clicking outside or pressing Escape.
- **FR-006**: System MUST sync selected hashtags with the parent form's hashtag chips.
- **FR-007**: System MUST fetch the hashtag list from an API endpoint.

### Technical Requirements

- **TR-001**: Dropdown MUST use proper ARIA attributes: `role="listbox"` on container, `role="option"` on items, `aria-selected` for state, `aria-disabled` when max reached.
- **TR-002**: Hashtag list should be fetched once and cached for the session.
- **TR-003**: Dropdown MUST support keyboard navigation: Arrow keys for focus, Enter/Space to toggle, Escape to close.
- **TR-004**: Dropdown container MUST have `max-height: 360px; overflow-y: auto` to handle long lists with scrolling.

### Key Entities

- **Hashtag**: A predefined tag with an ID and display name, fetched from the backend.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /api/hashtags | GET | Fetch list of available hashtags | Predicted |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can select/deselect hashtags with immediate visual feedback (< 50ms).
- **SC-002**: Max 5 limit is enforced with clear feedback when reached.
- **SC-003**: Dropdown opens within 100ms of button click.

---

## Out of Scope

- Creating custom/new hashtags
- Searching/filtering hashtags within the dropdown
- Reordering selected hashtags

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] Write Kudo modal spec (`.momorph/specs/520_11602-viet-kudo/spec.md`) — parent feature

---

## Notes

- This is a sub-component of the Write Kudo modal's hashtag field.
- The dropdown appears anchored to the "+ Hashtag" button.
- Hashtag data comes from the backend; the Figma design shows example values.
