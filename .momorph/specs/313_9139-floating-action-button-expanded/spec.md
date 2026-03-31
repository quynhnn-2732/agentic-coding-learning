# Feature Specification: Floating Action Button - Expanded State

**Frame ID**: `313:9139`
**Frame Name**: `Floating Action Button - phim nổi chức năng 2`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-30
**Status**: Draft

---

## Overview

The expanded state of the Floating Action Button (FAB). When the user clicks the collapsed FAB, it expands vertically to reveal two action buttons — "Thể lệ" (Rules) and "Viết KUDOS" (Write KUDOS) — along with a red circular close button. This state serves as the action menu for the Sun Kudos feature, allowing users to navigate to the rules page or start writing kudos.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Navigate to "Thể lệ" (Rules) (Priority: P1)

As a Sunner, I want to click "Thể lệ" from the expanded FAB so that I can view the program rules and understand how the Kudos system works.

**Why this priority**: Understanding the rules is essential for first-time users and provides context for the entire Kudos feature.

**Independent Test**: Expand the FAB, click "Thể lệ", and verify the rules panel (Frame 3204:6051) opens.

**Acceptance Scenarios**:

1. **Given** the FAB is expanded, **When** the user clicks the "Thể lệ" button, **Then** the rules panel/modal (Thể lệ UPDATE) opens.
2. **Given** the FAB is expanded, **When** the user hovers over "Thể lệ", **Then** a subtle shadow/brightness change indicates interactivity.

---

### User Story 2 - Navigate to "Viết KUDOS" (Write KUDOS) (Priority: P1)

As a Sunner, I want to click "Viết KUDOS" from the expanded FAB so that I can write and send kudos to a colleague.

**Why this priority**: Writing kudos is the core action of the feature. This is equally critical as viewing rules.

**Independent Test**: Expand the FAB, click "Viết KUDOS", and verify the Viết Kudo form (Frame 520:11602) opens.

**Acceptance Scenarios**:

1. **Given** the FAB is expanded, **When** the user clicks "Viết KUDOS", **Then** the kudos writing form/modal opens.
2. **Given** the FAB is expanded, **When** the user hovers over "Viết KUDOS", **Then** a subtle shadow/brightness change indicates interactivity.

---

### User Story 3 - Close expanded FAB (Priority: P1)

As a Sunner, I want to close the expanded FAB so that I can return to browsing the page without the menu obstructing my view.

**Why this priority**: Users must be able to dismiss the expanded state. Without this, the menu would permanently cover page content.

**Independent Test**: Expand the FAB, click the red close button, and verify the FAB returns to its collapsed state.

**Acceptance Scenarios**:

1. **Given** the FAB is expanded, **When** the user clicks the red close button (X), **Then** the FAB collapses back to the compact pill state (Frame 313:9137).
2. **Given** the FAB is expanded, **When** the user clicks outside the FAB area, **Then** the FAB collapses back.
3. **Given** the FAB is expanded, **When** the user presses Escape, **Then** the FAB collapses back.

---

### Edge Cases

- What happens when the user rapidly clicks expand/collapse? Animation should complete or be interrupted gracefully.
- What happens if the "Viết KUDOS" form is already open? The button should still work (navigate or focus the existing form).
- What happens on small screens where the expanded menu might overflow? Buttons should remain within viewport.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Button "Thể lệ" (A) | Yellow button with lightning icon + "Thể lệ" label, 149x64px | Click: open rules panel. Hover: shadow increase |
| Button "Viết KUDOS" (B) | Yellow button with pen icon + "Viết KUDOS" label, 214x64px | Click: open kudos form. Hover: shadow increase |
| Button "Hủy" / Close (C) | Red circular button with X icon, 56x56px | Click: collapse FAB. Hover: darken |

### Navigation Flow

- From: Collapsed FAB (Frame 313:9137)
- To (option A): Thể lệ panel (Frame 3204:6051) — via "Thể lệ" button
- To (option B): Viết Kudo form (Frame 520:11602) — via "Viết KUDOS" button
- To (option C): Back to collapsed FAB (Frame 313:9137) — via close button
- Triggers: Click on respective buttons

### Visual Requirements

- Responsive breakpoints: Maintain layout on all breakpoints; stack vertically
- Animations/Transitions: Smooth expand animation from collapsed state, buttons appear with stagger
- Accessibility: Container MUST have `role="menu"`, each button MUST have `role="menuitem"` with descriptive `aria-label`. Keyboard navigable: Tab/Arrow keys between buttons, Enter/Space to activate, Escape to close. Focus MUST be trapped within expanded state.

> See [design-style.md](./design-style.md) for detailed visual specifications.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display three buttons vertically stacked when FAB is expanded: "Thể lệ", "Viết KUDOS", and close (X)
- **FR-002**: "Thể lệ" button MUST open the rules panel (Frame 3204:6051)
- **FR-003**: "Viết KUDOS" button MUST open the kudos writing form (Frame 520:11602)
- **FR-004**: Close button MUST collapse the FAB back to its compact state
- **FR-005**: Pressing Escape key MUST collapse the expanded FAB
- **FR-006**: The expanded FAB container MUST be 214px wide and 224px tall with 20px gap between buttons

### Technical Requirements

- **TR-001**: Expand/collapse animation must complete within 300ms
- **TR-002**: Component must trap focus within expanded state for accessibility
- **TR-003**: Component must use `"use client"` directive (requires state management and event handlers)

### Key Entities *(if feature involves data)*

- No data entities — this is a purely UI interaction component

### State Management

- **Shared with collapsed FAB**: `isExpanded: boolean` — when `true`, renders this expanded state
- **Focus management**: On expand, focus moves to first button ("Thể lệ"). On close, focus returns to the collapsed FAB trigger.
- **No overlay/backdrop**: The expanded FAB does NOT use a backdrop overlay. Clicking outside the FAB container collapses it via a `mousedown` event listener on `document`.
- **No loading/error states** — component is purely presentational

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| N/A | N/A | No API calls needed for FAB menu | N/A |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All three buttons are clickable and trigger correct navigation
- **SC-002**: Expand/collapse transition is smooth (no jank, < 300ms)
- **SC-003**: Keyboard navigation works: Tab cycles through buttons, Escape closes

---

## Out of Scope

- The collapsed FAB state (covered in Frame 313:9137 spec)
- The "Thể lệ" panel content (covered in Frame 3204:6051 spec)
- The "Viết KUDOS" form (linked to Frame 520:11602, separate feature)

---

## Dependencies

- [ ] Constitution document exists (`.momorph/constitution.md`) ✅
- [ ] Collapsed FAB spec (`.momorph/specs/313_9137-floating-action-button-collapsed/`)
- [ ] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- The expanded FAB uses the same bottom-right positioning as the collapsed state.
- The "Viết KUDOS" button is the widest (214px) and determines the container width.
- The close button is red (#D4271D) to clearly differentiate it from the yellow action buttons.
- Buttons are right-aligned within the container (`align-items: flex-end`).
