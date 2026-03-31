# Feature Specification: Floating Action Button - Collapsed State

**Frame ID**: `313:9137`
**Frame Name**: `Floating Action Button - phim nổi chức năng`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-30
**Status**: Draft

---

## Overview

A floating action button (FAB) positioned at the bottom-right corner of the screen. In its collapsed state, it displays two icons (pen + lightning/rules) separated by a "/" divider on a yellow pill-shaped background. Clicking the FAB expands it to reveal two action options: "Thể lệ" (Rules) and "Viết KUDOS" (Write KUDOS).

This FAB is the primary entry point for two key user actions in the Sun Kudos feature: viewing the program rules and writing kudos to colleagues.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Expand FAB to reveal actions (Priority: P1)

As a Sunner (employee), I want to click the floating action button so that I can see the available quick actions (view rules or write kudos).

**Why this priority**: This is the sole entry point for the FAB interaction flow. Without it, users cannot access "Thể lệ" or "Viết KUDOS" from the main page.

**Independent Test**: Render the page with the FAB visible. Click the FAB and verify the expanded state (Frame 313:9139) appears with "Thể lệ" and "Viết KUDOS" options.

**Acceptance Scenarios**:

1. **Given** the user is on the Sun Kudos page, **When** the page loads, **Then** the collapsed FAB is visible in the bottom-right corner showing pen and lightning icons with "/" separator.
2. **Given** the collapsed FAB is visible, **When** the user clicks the FAB, **Then** the FAB expands to show "Thể lệ" and "Viết KUDOS" buttons along with a red close button.
3. **Given** the collapsed FAB is visible, **When** the user hovers over the FAB, **Then** a subtle shadow effect appears indicating interactivity.

---

### User Story 2 - FAB visibility and positioning (Priority: P2)

As a Sunner, I want the FAB to always be visible and accessible so that I can quickly access actions regardless of scroll position.

**Why this priority**: The FAB must be persistently visible for discoverability, but the core click-to-expand interaction (P1) is more critical.

**Independent Test**: Scroll the page content and verify the FAB remains fixed in the bottom-right corner.

**Acceptance Scenarios**:

1. **Given** the user is on the Sun Kudos page, **When** they scroll the page content, **Then** the FAB remains fixed at the bottom-right corner of the viewport.
2. **Given** the FAB is displayed, **When** rendered on mobile viewport, **Then** the FAB remains accessible and does not overlap critical content.

---

### Edge Cases

- **Page loading state**: FAB MUST be visible even while main page content is loading (it has no data dependencies).
- **Very small screens (< 360px)**: FAB MUST maintain position without overflowing the viewport.
- **Multiple rapid clicks**: Animation should complete or be interrupted gracefully without glitching.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Widget Button (A) | Pill-shaped yellow FAB with pen icon, "/" divider, and lightning icon | Click: expand to show options. Hover: subtle shadow increase |
| Pen Icon (A.1) | 24x24px pen icon representing "Viết KUDOS" | Part of FAB, not independently clickable in collapsed state |
| "/" Divider | Text divider between icons, Montserrat 700, 24px | Visual separator only |
| Lightning/Rules Icon (A.2) | 24x24px icon representing "Thể lệ" | Part of FAB, not independently clickable in collapsed state |

### Navigation Flow

- From: Sun Kudos main page (any scroll position)
- To: Expanded FAB state (Frame 313:9139)
- Triggers: Click on the collapsed FAB

### Visual Requirements

- Responsive breakpoints: FAB should be visible on all breakpoints (mobile, tablet, desktop)
- Animations/Transitions: Smooth expand/collapse animation when toggling FAB state
- Accessibility: FAB MUST have `aria-label="Mở menu hành động"`, `role="button"`, `aria-expanded="false"` (toggled to `"true"` when expanded), keyboard accessible via Tab + Enter/Space

> See [design-style.md](./design-style.md) for detailed visual specifications.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a floating action button at the bottom-right corner of the viewport
- **FR-002**: System MUST expand the FAB to show "Thể lệ" and "Viết KUDOS" options when clicked
- **FR-003**: FAB MUST remain fixed position during page scroll
- **FR-004**: FAB MUST have a box-shadow effect: `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`
- **FR-005**: FAB MUST display pen icon (left), "/" separator, and rules icon (right)

### Technical Requirements

- **TR-001**: FAB must render without layout shift (CLS = 0)
- **TR-002**: FAB must be keyboard accessible (focusable, activatable with Enter/Space)
- **TR-003**: FAB component must use `"use client"` directive (requires browser interactivity)

### Key Entities *(if feature involves data)*

- No data entities — this is a purely UI interaction component

### State Management

- **Local state**: `isExpanded: boolean` — controls whether FAB shows collapsed (this spec) or expanded (Frame 313:9139) state
- **Initial value**: `false` (collapsed)
- **Toggles**: Click FAB → `true`; Click close / Escape / click outside → `false`
- **No global state needed** — FAB state is self-contained
- **No loading/error states** — component is purely presentational with no data fetching

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| N/A | N/A | No API calls needed for FAB toggle | N/A |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: FAB is visible on page load within 1 second
- **SC-002**: FAB expand/collapse transitions complete within 300ms
- **SC-003**: FAB is accessible via keyboard navigation (Tab, Enter/Space)

---

## Out of Scope

- The expanded FAB state and its sub-actions (covered in Frame 313:9139 spec)
- The "Thể lệ" panel content (covered in Frame 3204:6051 spec)
- The "Viết KUDOS" form (linked to Frame 520:11602, separate feature)

---

## Dependencies

- [ ] Constitution document exists (`.momorph/constitution.md`) ✅
- [ ] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- The FAB is a shared component across the Sun Kudos page, always visible regardless of which section the user is viewing.
- The collapsed state shows a compact pill with two icons, while the expanded state (separate spec) reveals labeled buttons.
- The golden yellow color (#FFEA9E) is consistent with the Sun* brand identity used throughout the SAA (Sun* Annual Awards) theme.
