# Feature Specification: Thể lệ (Rules Panel)

**Frame ID**: `3204:6051`
**Frame Name**: `Thể lệ UPDATE`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-30
**Status**: Draft

---

## Overview

The "Thể lệ" (Rules) panel is a slide-in or modal panel that displays the complete rules of the Sun Kudos program as part of SAA 2025 (Sun* Annual Awards). It educates users about:

1. **Người nhận Kudos** (Kudos Recipients): Hero badge tiers based on how many people send you Kudos (New Hero → Rising Hero → Super Hero → Legend Hero).
2. **Người gửi Kudos** (Kudos Senders): Collecting 6 exclusive icons by earning hearts (❤️) on sent Kudos — every 5 hearts opens a Secret Box.
3. **Kudos Quốc Dân** (National Kudos): Top 5 Kudos with the most hearts win a special "Root Further" prize.

The panel has two footer action buttons: "Đóng" (Close) and "Viết KUDOS" (Write KUDOS).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Kudos recipient rules and Hero badges (Priority: P1)

As a Sunner, I want to read the rules about Hero badges so that I understand how many Kudos I need to receive to earn each badge tier.

**Why this priority**: Understanding the gamification/reward system is the primary purpose of this panel.

**Independent Test**: Open the rules panel and verify all 4 Hero badge tiers are displayed with correct thresholds and descriptions.

**Acceptance Scenarios**:

1. **Given** the rules panel is open, **When** the user reads the "Người nhận Kudos" section, **Then** they see 4 badge tiers: New Hero (1-4), Rising Hero (5-9), Super Hero (10-20), Legend Hero (20+).
2. **Given** each badge tier is displayed, **When** the user views a tier, **Then** they see the badge icon, tier name, threshold description, and motivational text.
3. **Given** the panel content exceeds viewport height, **When** the user scrolls within the panel, **Then** the content scrolls smoothly while the footer buttons remain fixed.

---

### User Story 2 - View Kudos sender icon collection rules (Priority: P1)

As a Sunner, I want to understand the icon collection system so that I know how sending Kudos earns me exclusive icons.

**Why this priority**: The sender reward system is the other core mechanic that drives engagement.

**Independent Test**: Open the rules panel and verify the 6 icon badges are displayed with correct names and the Secret Box mechanic is explained.

**Acceptance Scenarios**:

1. **Given** the rules panel is open, **When** the user reads the "Người gửi Kudos" section, **Then** they see the explanation that every 5 hearts (❤️) opens 1 Secret Box.
2. **Given** the icons section is visible, **When** the user views the icon grid, **Then** they see all 6 icons: REVIVAL, TOUCH OF LIGHT, STAY GOLD, FLOW TO HORIZON, BEYOND THE BOUNDARY, ROOT FURTHER.
3. **Given** the icons are displayed, **When** the user views each icon, **Then** they see a circular badge image (64x64px with 2px white border) and the icon name below.

---

### User Story 3 - View "Kudos Quốc Dân" rules (Priority: P2)

As a Sunner, I want to learn about the "Kudos Quốc Dân" award so that I know the top 5 Kudos with the most hearts receive a special prize.

**Why this priority**: This is an additional motivational element but not required to understand the basic Kudos flow.

**Independent Test**: Open the rules panel and scroll to the "Kudos Quốc Dân" section, verify the description matches.

**Acceptance Scenarios**:

1. **Given** the rules panel is open, **When** the user scrolls to "KUDOS QUỐC DÂN", **Then** they see the explanation that top 5 Kudos with most hearts become "Kudos Quốc Dân" and receive the "Root Further" prize.

---

### User Story 4 - Close rules panel (Priority: P1)

As a Sunner, I want to close the rules panel so that I can return to the main Kudos page.

**Why this priority**: Users must be able to dismiss the panel.

**Independent Test**: Open the rules panel, click "Đóng", verify the panel closes.

**Acceptance Scenarios**:

1. **Given** the rules panel is open, **When** the user clicks "Đóng" (Close button), **Then** the panel closes and the user returns to the previous view.
2. **Given** the rules panel is open, **When** the user presses Escape, **Then** the panel closes.

---

### User Story 5 - Navigate to write Kudos from rules panel (Priority: P2)

As a Sunner, I want to go directly to write Kudos after reading the rules so that I don't have to navigate back and find the write action again.

**Why this priority**: Convenience flow — after understanding rules, users are motivated to act.

**Independent Test**: Open the rules panel, click "Viết KUDOS", verify the kudos form opens.

**Acceptance Scenarios**:

1. **Given** the rules panel is open, **When** the user clicks "Viết KUDOS" button, **Then** the Kudos writing form (Frame 520:11602) opens.

---

### Edge Cases

- **Long content on small screens**: Panel MUST scroll internally with sticky footer buttons.
- **Badge icon load failure**: Show a fallback circular placeholder (bg: #1a1a2e) with the badge name text centered.
- **Panel opened while Kudos form is active**: Panel MUST overlay on top without destroying the form state underneath.
- **Rapid open/close**: Slide animation should complete or be interrupted gracefully.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Panel Container | Dark panel (553x1410px, bg: #00070C) anchored to right side | Scrollable content area |
| Title "Thể lệ" | Large heading, Montserrat 700, 45px, gold color | Display only |
| Section "Người nhận Kudos" | Heading + description + 4 badge tiers | Display only, scrollable |
| Badge Tier (×4) | Badge icon + tier name + threshold + description | Display only |
| Section "Người gửi Kudos" | Heading + description + 6 icon grid + completion note | Display only |
| Icon Badge (×6) | 64x64 circular badge + name label | Display only |
| Section "Kudos Quốc Dân" | Heading + description | Display only |
| Button "Đóng" (B.1) | Secondary button with X icon + "Đóng" label | Click: close panel |
| Button "Viết KUDOS" (B.2) | Primary yellow button with pen icon + label | Click: open Kudos form |

### Navigation Flow

- From: Expanded FAB "Thể lệ" button (Frame 313:9139)
- To (option 1): Close → back to previous view
- To (option 2): "Viết KUDOS" → Kudos form (Frame 520:11602)
- Triggers: Button clicks

### Visual Requirements

- Responsive breakpoints: Panel should adapt width on mobile (full-width), maintain right-anchored on desktop
- Animations/Transitions: Slide-in from right on open, slide-out on close
- Accessibility: Panel MUST trap focus with `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title. Scrollable content area must be keyboard-scrollable. Escape key closes the panel. Focus returns to trigger element ("Thể lệ" button) on close.

> See [design-style.md](./design-style.md) for detailed visual specifications.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the rules panel with title "Thể lệ" and three content sections
- **FR-002**: Panel MUST show 4 Hero badge tiers: New Hero (1-4 senders), Rising Hero (5-9), Super Hero (10-20), Legend Hero (20+)
- **FR-003**: Panel MUST show 6 collectible icon badges: REVIVAL, TOUCH OF LIGHT, STAY GOLD, FLOW TO HORIZON, BEYOND THE BOUNDARY, ROOT FURTHER
- **FR-004**: Panel MUST explain the Secret Box mechanic: every 5 hearts opens 1 Secret Box
- **FR-005**: Panel MUST show "Kudos Quốc Dân" section explaining top 5 Kudos award
- **FR-006**: "Đóng" button MUST close the panel
- **FR-007**: "Viết KUDOS" button MUST navigate to the Kudos writing form
- **FR-008**: Panel content MUST be scrollable when exceeding viewport height
- **FR-009**: Footer buttons MUST remain fixed at the bottom of the panel

### Technical Requirements

- **TR-001**: Panel must render without blocking the main page content (use overlay/modal pattern)
- **TR-002**: Badge and icon images must be lazy-loaded for performance
- **TR-003**: Panel must use `"use client"` directive for scroll handling and close interactions

### Key Entities *(if feature involves data)*

- **Hero Badge Tier**: name (New Hero/Rising Hero/Super Hero/Legend Hero), min_senders, max_senders, description, badge_image
- **Collectible Icon**: name (REVIVAL/TOUCH OF LIGHT/STAY GOLD/FLOW TO HORIZON/BEYOND THE BOUNDARY/ROOT FURTHER), image

---

### State Management

- **Panel visibility**: `isRulesOpen: boolean` — controlled by parent or FAB component
- **Scroll position**: Internal scroll state within the panel content area (resets on open)
- **No overlay/backdrop**: Based on the Figma frame, the panel slides in from the right WITHOUT a dimming backdrop behind it. The rest of the page remains visible but non-interactive.
- **Focus trap**: Active when panel is open; released when closed
- **No loading/error states** — content is static

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| N/A | N/A | Rules content is static — no API needed for MVP | N/A |

> **Note**: If rules content becomes dynamic in the future, a `GET /api/rules` endpoint would be needed. For MVP, all text is hardcoded from the design.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 4 Hero badge tiers render correctly with icons and descriptions
- **SC-002**: All 6 collectible icons render with images and labels
- **SC-003**: Panel scrolls smoothly and footer buttons remain fixed
- **SC-004**: "Đóng" and "Viết KUDOS" buttons function correctly

---

## Out of Scope

- The FAB that triggers this panel (covered in Frame 313:9137 and 313:9139 specs)
- The "Viết KUDOS" form (linked to Frame 520:11602, separate feature)
- Dynamic content management for rules text (assumed static for MVP)
- Badge/icon collection progress display (this panel shows rules only, not user progress)

---

## Dependencies

- [ ] Constitution document exists (`.momorph/constitution.md`) ✅
- [ ] Expanded FAB spec (`.momorph/specs/313_9139-floating-action-button-expanded/`)
- [ ] Badge icon assets available (6 icons + 4 hero badges)
- [ ] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- The rules content is in Vietnamese. All text should be rendered as-is from the design.
- Hero badge tiers use special styled components with gradient backgrounds and borders — these are Figma component instances (`3007:17505` component set).
- The 6 collectible icons are displayed in a 3×2 grid layout with 16px gap.
- The panel background (#00070C) is slightly darker than the page background (#00101A) to create depth.
- Footer buttons are arranged horizontally: "Đóng" (secondary, outlined) on the left, "Viết KUDOS" (primary, yellow) on the right.
