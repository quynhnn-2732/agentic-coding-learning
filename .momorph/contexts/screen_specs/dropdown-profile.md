# Screen: Dropdown-profile

## Screen Info

| Property | Value |
|----------|-------|
| **Figma Frame ID** | 721:5223 |
| **Figma Link** | https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=721:5223 |
| **Screen Group** | Navigation / User Account |
| **Status** | discovered |
| **Discovered At** | 2026-03-31 |
| **Last Updated** | 2026-03-31 |

---

## Description

Dropdown menu triggered from the user's profile avatar/icon in the header navigation. It provides two primary actions: navigating to the user's Profile page and logging out of the application. The dropdown has a dark-themed background with a glow effect on the active/hovered Profile item.

---

## Navigation Analysis

### Incoming Navigations (From)

| Source Screen | Trigger | Condition |
|---------------|---------|-----------|
| Any screen with Header/Navbar | Click on user avatar/profile icon | User is authenticated |

### Outgoing Navigations (To)

| Target Screen | Trigger Element | Node ID | Confidence | Notes |
|---------------|-----------------|---------|------------|-------|
| Profile Page | Button: "Profile" (icon_text) | I666:9601;563:7844 | High | Label is "Profile" with user icon, description confirms "Click: Mo trang Ho so nguoi dung" |
| Login / Landing Page | Button: "Logout" (icon_text) | I666:9601;563:7868 | High | Label is "Logout" with chevron-right icon, triggers logout action and redirects |

### Navigation Rules
- **Back behavior**: Clicking outside the dropdown closes it (standard dropdown behavior)
- **Deep link support**: No - This is an overlay/dropdown component, not a routable screen
- **Auth required**: Yes - Only visible when user is authenticated

---

## Component Schema

### Layout Structure

```
┌─────────────────────────────────┐
│       Dropdown-List             │
│  ┌─────────────────────────┐   │
│  │  Profile          [IC]  │   │  <-- Active/glow state
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │  Logout            >    │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

### Component Hierarchy

```
Dropdown-profile (Frame)
└── A_Dropdown-List (Instance - Organism)
    ├── A.1_Profile (Instance - Molecule)
    │   ├── Frame 486 (Frame)
    │   │   └── "Profile" (Text - Atom)
    │   └── IC (Instance - Atom: user icon)
    └── A.2_Logout (Instance - Molecule)
        ├── Frame 485 (Frame)
        │   └── "Logout" (Text - Atom)
        └── IC (Instance - Atom: chevron-right icon)
```

### Main Components

| Component | Type | Node ID | Description | Reusable |
|-----------|------|---------|-------------|----------|
| A_Dropdown-List | Organism | 666:9601 | Container dropdown menu with Profile and Logout items | Yes |
| A.1_Profile | Molecule | I666:9601;563:7844 | Profile menu item with user icon, glow effect on active | Yes |
| A.2_Logout | Molecule | I666:9601;563:7868 | Logout menu item with chevron-right icon | Yes |
| IC (user icon) | Atom | I666:9601;563:7844;186:1498 | User silhouette icon | Yes |
| IC (chevron) | Atom | I666:9601;563:7868;186:1441 | Chevron-right arrow icon | Yes |

---

## Form Fields (If Applicable)

N/A - This is a navigation dropdown, no form fields.

---

## API Mapping

### On Screen Load

| API | Method | Purpose | Response Usage |
|-----|--------|---------|----------------|
| /users/me | GET | Get current user info (name, avatar) | Display in dropdown header or profile icon |

### On User Action

| Action | API | Method | Request Body | Response |
|--------|-----|--------|--------------|----------|
| Click Profile | - | - | Navigation only | Redirect to Profile page |
| Click Logout | /auth/logout | POST | `{}` or `{refreshToken}` | `{success: true}` - Clear tokens and redirect to login |

### Error Handling

| Error Code | Message | UI Action |
|------------|---------|-----------|
| 401 | Unauthorized / Token expired | Redirect to login |
| 500 | Server error on logout | Show error toast, allow retry |

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| isOpen | boolean | false | Controls dropdown visibility |
| isLoggingOut | boolean | false | Loading state during logout API call |

### Global State (If Applicable)

| State | Store | Read/Write | Purpose |
|-------|-------|------------|---------|
| user | authStore | Read | Display user info in dropdown context |
| token | authStore | Write (clear) | Clear JWT token on logout |
| isAuthenticated | authStore | Write | Set to false on logout |

---

## UI States

### Loading State
- Show spinner or disabled state on "Logout" item while logout API is in progress
- "Profile" click is instant navigation, no loading needed

### Error State
- Toast notification if logout API fails
- Dropdown remains open for retry

### Success State
- Logout: Clear tokens, close dropdown, redirect to Login page
- Profile: Navigate to Profile page, close dropdown

### Empty State
- N/A for this component

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Focus management | Focus trapped within dropdown when open; Escape closes it |
| Keyboard navigation | Arrow keys to navigate between items, Enter to select |
| Screen reader | role="menu" on container, role="menuitem" on items |
| Error announcement | Live region for logout errors |
| Color contrast | Light text on dark background, glow effect for active state |

---

## Responsive Behavior

| Breakpoint | Layout Changes |
|------------|----------------|
| Mobile (<768px) | Dropdown may become full-width bottom sheet or maintain fixed width |
| Tablet (768-1024px) | Positioned below profile icon, fixed width ~119px |
| Desktop (>1024px) | Positioned below profile icon, fixed width ~119px |

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| --dropdown-bg | Dark (near black) | Dropdown background |
| --dropdown-item-active | Glow/light highlight | Active Profile item |
| --text-primary | Light/white | Menu item text color |
| --dropdown-border-radius | ~8px | Rounded corners on dropdown |

---

## Implementation Notes

### Dependencies
- Dropdown positioning library (e.g., Floating UI / Radix Popover)
- Auth store/context for logout action
- Router for navigation

### Special Considerations
- Dropdown should close on outside click
- Dropdown should close on Escape key
- Profile item appears to have an active/glow state (currently selected or hovered)
- Logout should handle token invalidation on both client and server side
- Consider adding a user name/email display at the top of the dropdown for context

---

## Analysis Metadata

| Property | Value |
|----------|-------|
| Analyzed By | Screen Flow Discovery |
| Analysis Date | 2026-03-31 |
| Needs Deep Analysis | No |
| Confidence Score | High |

### Next Steps
- [ ] Get detailed design items via list_frame_design_items
- [ ] Extract styles via list_frame_styles
- [ ] Confirm Profile page frame ID for navigation linking
- [ ] Confirm Login page frame ID for post-logout redirect
