# Feature Specification: Dropdown Profile

**Frame ID**: `721:5223`
**Frame Name**: `Dropdown-profile`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-31
**Status**: Draft

---

## Overview

A profile dropdown menu that appears when the user interacts with their profile avatar/icon in the application header. The dropdown provides two primary actions: navigating to the user's profile page and logging out of the application. The design features a dark theme with a gold-accented border and a subtle glow effect on the active/selected item, consistent with the application's premium visual style.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Navigate to Profile Page (Priority: P1)

A logged-in user clicks on their profile avatar to open the dropdown menu, then selects "Profile" to navigate to their profile page where they can view and edit their account information.

**Why this priority**: This is the primary navigation pathway for users to access their personal profile settings. It is core functionality for any authenticated user experience.

**Independent Test**: Render the dropdown component, click the "Profile" item, and verify navigation to the profile page occurs.

**Acceptance Scenarios**:

1. **Given** the user is logged in and the dropdown is open, **When** the user clicks "Profile", **Then** the user is navigated to the profile page and the dropdown closes.
2. **Given** the user is logged in and the dropdown is open, **When** the user hovers over the "Profile" item, **Then** a visual highlight/hover effect is displayed on the item.
3. **Given** the dropdown is open, **When** the user presses Enter or Space on the focused "Profile" item, **Then** the user is navigated to the profile page (keyboard accessibility).

---

### User Story 2 - Logout from Application (Priority: P1)

A logged-in user clicks on their profile avatar to open the dropdown menu, then selects "Logout" to sign out of the application securely.

**Why this priority**: Logout is a critical security function. Users must be able to terminate their session at any time, especially on shared or public devices.

**Independent Test**: Render the dropdown component, click the "Logout" item, and verify the user session is terminated and the user is redirected to the login/home page.

**Acceptance Scenarios**:

1. **Given** the user is logged in and the dropdown is open, **When** the user clicks "Logout", **Then** the user session is terminated, the dropdown closes, and the user is redirected to the login page.
2. **Given** the user is logged in and the dropdown is open, **When** the user hovers over "Logout", **Then** a visual highlight/hover effect is displayed on the item.
3. **Given** the logout action fails (network error), **When** the user clicks "Logout", **Then** an error notification is shown and the user remains logged in.

---

### User Story 3 - Open and Close Dropdown (Priority: P1)

A logged-in user can open the profile dropdown by clicking their profile avatar and close it by clicking outside the dropdown or selecting an option.

**Why this priority**: The dropdown toggle mechanism is the entry point for both Profile and Logout actions. Without it, neither P1 story above can function.

**Independent Test**: Click the profile trigger to open the dropdown, verify it appears, then click outside to verify it closes.

**Acceptance Scenarios**:

1. **Given** the user is logged in and the dropdown is closed, **When** the user clicks the profile avatar/trigger, **Then** the dropdown menu appears with "Profile" and "Logout" options.
2. **Given** the dropdown is open, **When** the user clicks outside the dropdown area (overlay), **Then** the dropdown closes.
3. **Given** the dropdown is open, **When** the user presses the Escape key, **Then** the dropdown closes and focus returns to the trigger element.
4. **Given** the dropdown is open, **When** the user selects any menu item, **Then** the dropdown closes after the action is initiated.

---

### Edge Cases

- **Session expiry while dropdown is open**: The dropdown should close and redirect to login.
- **Rapid trigger clicks**: The dropdown should toggle without flickering or duplicate renders (debounce or state guard).
- **Mobile touch events**: The dropdown should support both click and touch interactions with the same behavior.
- **Multiple tabs**: If the user logs out in another tab, this tab should detect the session change and redirect to login.
- **Logout API failure**: The dropdown remains open with an error toast; the "Logout" item returns to its default state for retry.
- **Network offline**: If the user is offline when clicking "Logout", show an appropriate error message (session cannot be invalidated server-side).

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Dropdown Container (`666:9601`) | Dark-themed container with gold border, holds menu items | Appears/disappears on trigger |
| Profile Item (`I666:9601;563:7844`) | Menu item with "Profile" label and user icon, golden glow when active | Click to navigate, hover highlight |
| Logout Item (`I666:9601;563:7868`) | Menu item with "Logout" label and chevron-right icon | Click to logout, hover highlight |
| Overlay Background | Invisible full-viewport click target behind dropdown (Figma shows #696969 for design context only) | Click to dismiss dropdown |

### Navigation Flow

- **From**: Any page with the header/profile avatar (trigger element)
- **To (Profile)**: Profile page (`/profile` or equivalent)
- **To (Logout)**: Login page (after session termination)
- **Triggers**: Click on profile avatar opens dropdown; click on menu items triggers navigation/action

### Visual Requirements

- Responsive breakpoints: mobile (< 768px), tablet (768-1023px), desktop (>= 1024px)
- Animations/Transitions: Dropdown open/close with opacity + transform (150ms ease-out); hover background transition (150ms ease-in-out)
- Accessibility: WCAG AA compliance - keyboard navigation (Arrow Up/Down between items, Enter/Space to activate, Escape to close), visible focus indicators, `aria-expanded` on trigger, `role="menu"` on dropdown, `role="menuitem"` on items, `aria-live` region for logout error announcements
- See [design-style.md](./design-style.md) for complete visual specifications

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a dropdown menu with "Profile" and "Logout" options when the user clicks the profile trigger
- **FR-002**: System MUST navigate to the profile page when the user clicks "Profile"
- **FR-003**: System MUST terminate the user session and redirect to login when the user clicks "Logout"
- **FR-004**: System MUST close the dropdown when the user clicks outside the dropdown area
- **FR-005**: System MUST close the dropdown when the user presses the Escape key
- **FR-006**: System MUST close the dropdown after any menu item action is initiated
- **FR-007**: System MUST visually indicate the currently active/selected page in the dropdown (Profile item with glow effect when on profile page)
- **FR-008**: System MUST support keyboard navigation per WAI-ARIA menu pattern (Arrow Up/Down between items, Enter/Space to select, Tab moves focus out of menu)
- **FR-009**: System MUST show a loading state on the "Logout" item while the signOut API call is in progress, preventing duplicate submissions
- **FR-010**: System MUST display an error toast notification if the logout API call fails, keeping the dropdown open for retry

### Technical Requirements

- **TR-001**: Dropdown open/close animation MUST complete within 150ms to feel responsive
- **TR-002**: Logout MUST invalidate the session server-side via Supabase Auth signOut; session tokens MUST NOT persist after logout (OWASP compliance)
- **TR-003**: Dropdown MUST use `@supabase/ssr` cookie-based session management for auth state checking
- **TR-004**: Component MUST be a Client Component (`"use client"`) since it requires browser interactivity (click handlers, state management)

### Key Entities *(if feature involves data)*

- **User Session**: Represents the authenticated user's session; key attributes: user ID, email, avatar URL. Used to determine dropdown visibility and profile navigation target.

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| `isOpen` | boolean | `false` | Controls dropdown visibility |
| `isLoggingOut` | boolean | `false` | Loading state during logout API call |

### Global State

| State | Store/Context | Read/Write | Purpose |
|-------|---------------|------------|---------|
| `user` | Supabase Auth context | Read | User info (ID, email, avatar) for determining dropdown visibility |
| `session` | Supabase Auth context | Write (clear) | Clear session on logout via `@supabase/ssr` |

### Loading & Error States

- **Logout loading**: Disable "Logout" item, show spinner/loading indicator while `signOut()` is in progress
- **Logout error**: Display toast notification with error message; dropdown remains open for retry
- **Session expired**: If auth context detects expired session while dropdown is open, close dropdown and redirect to login

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase Auth `signOut()` | POST | Terminate user session and clear cookies | Exists (Supabase SDK) |
| Supabase Auth `getUser()` | GET | Get current user info for auth state | Exists (Supabase SDK) |
| `/profile` | GET | Profile page (navigation target) | Predicted/New |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Dropdown opens and closes within 150ms without visual glitches on all supported breakpoints
- **SC-002**: All menu items are accessible via keyboard navigation (Arrow Up/Down, Enter/Space to activate, Escape to close)
- **SC-003**: Logout successfully terminates session and clears all auth tokens 100% of the time
- **SC-004**: Dropdown correctly positions relative to trigger without overflow on all breakpoints

---

## Out of Scope

- Profile page implementation (only the navigation to it is in scope)
- Profile avatar/trigger button design (this spec covers only the dropdown that appears after clicking)
- User settings or preferences within the dropdown
- Notification badges or counts on the dropdown trigger
- Additional menu items beyond "Profile" and "Logout"

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/contexts/SCREENFLOW.md`)

---

## Notes

- The dropdown uses Figma component instances from component set `563:8216` (Dropdown-List) and `186:1426` (menu items), suggesting these are reusable design system components
- The golden glow text-shadow effect on the Profile item (`0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287`) indicates this is the currently active/selected page state
- The icon component set `178:1020` is shared between the user icon and chevron icon, suggesting a unified icon system
- Supabase Auth integration is required per constitution (Section II & V) - use `@supabase/ssr` for session management
