# Screen: Dropdown-ngon-ngu

## Screen Info

| Property | Value |
|----------|-------|
| **Figma Frame ID** | 721:4942 |
| **Figma Link** | https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=721:4942 |
| **Screen Group** | Navigation / Localization |
| **Status** | discovered |
| **Discovered At** | 2026-03-31 |
| **Last Updated** | 2026-03-31 |

---

## Description

Language selector dropdown triggered from the header navigation on any authenticated screen. Provides two language options: VN (Vietnamese) and EN (English). Selecting a language updates the UI language across the application and closes the dropdown. Language preference is stored client-side via cookies -- no API calls are required.

---

## Navigation Analysis

### Incoming Navigations (From)

| Source Screen | Trigger | Condition |
|---------------|---------|-----------|
| Any screen with Header/Navbar | Click on language selector icon/button | User is authenticated |

### Outgoing Navigations (To)

| Target Screen | Trigger Element | Node ID | Confidence | Notes |
|---------------|-----------------|---------|------------|-------|
| Current Screen (self) | Select VN option | - | High | Updates UI language to Vietnamese, closes dropdown, stays on current page |
| Current Screen (self) | Select EN option | - | High | Updates UI language to English, closes dropdown, stays on current page |

### Navigation Rules
- **Back behavior**: Clicking outside the dropdown closes it (standard dropdown behavior)
- **Deep link support**: No - This is an overlay/dropdown component, not a routable screen
- **Auth required**: Yes - Only visible when user is authenticated (available via header)

---

## Component Schema

### Layout Structure

```
+---------------------------------+
|       Dropdown-List             |
|  +-------------------------+   |
|  |  VN (Vietnamese)        |   |  <-- Active if VN is selected
|  +-------------------------+   |
|  +-------------------------+   |
|  |  EN (English)           |   |  <-- Active if EN is selected
|  +-------------------------+   |
+---------------------------------+
```

### Component Hierarchy

```
Dropdown-ngon-ngu (Frame)
+-- Language-Dropdown-List (Instance - Organism)
    +-- VN Option (Instance - Molecule)
    |   +-- "VN" (Text - Atom)
    +-- EN Option (Instance - Molecule)
        +-- "EN" (Text - Atom)
```

### Main Components

| Component | Type | Node ID | Description | Reusable |
|-----------|------|---------|-------------|----------|
| Language-Dropdown-List | Organism | - | Container dropdown with VN and EN language options | Yes |
| VN Option | Molecule | - | Vietnamese language option, highlighted when active | Yes |
| EN Option | Molecule | - | English language option, highlighted when active | Yes |

---

## Form Fields (If Applicable)

N/A - This is a selection dropdown, no form fields.

---

## API Mapping

### On Screen Load

No API calls. Current language is read from the client-side cookie.

### On User Action

| Action | API | Method | Request Body | Response |
|--------|-----|--------|--------------|----------|
| Select VN | None | - | - | Set locale cookie to "vi", reload/rerender UI in Vietnamese |
| Select EN | None | - | - | Set locale cookie to "en", reload/rerender UI in English |

### Error Handling

No API error handling needed. Language switching is entirely client-side.

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| isOpen | boolean | false | Controls dropdown visibility |
| selectedLanguage | string | Read from cookie | Tracks currently selected language ("vi" or "en") |

### Global State (If Applicable)

| State | Store | Read/Write | Purpose |
|-------|-------|------------|---------|
| locale | i18n/cookie | Read/Write | Current application language, stored as cookie |

---

## UI States

### Loading State
- No loading state needed -- language switch is instantaneous (client-side only)

### Error State
- N/A -- no API calls to fail

### Success State
- Selected language option shows active/highlighted state
- UI text across the application updates to the selected language
- Dropdown closes after selection

### Empty State
- N/A for this component

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Focus management | Focus trapped within dropdown when open; Escape closes it and returns focus to trigger |
| Keyboard navigation | Arrow keys to navigate between VN and EN, Enter to select |
| Screen reader | `role="listbox"` on container, `role="option"` on items, `aria-selected` for active language, `aria-expanded` + `aria-haspopup="listbox"` on trigger |
| Color contrast | Light text (#FFF) on dark background (#00070C) — ratio > 19:1, passes WCAG AAA |

---

## Responsive Behavior

| Breakpoint | Layout Changes |
|------------|----------------|
| Mobile (<768px) | Dropdown may become full-width bottom sheet or maintain fixed width |
| Tablet (768-1024px) | Positioned below language selector, fixed width |
| Desktop (>1024px) | Positioned below language selector, fixed width |

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| --dropdown-bg | Dark (near black) | Dropdown background |
| --dropdown-item-active | Glow/light highlight | Active/selected language item |
| --text-primary | Light/white | Menu item text color |
| --dropdown-border-radius | ~8px | Rounded corners on dropdown |

---

## Implementation Notes

### Dependencies
- Cookie utility for reading/writing locale preference (existing: `document.cookie` in `LanguageSelector`)
- i18n framework for language switching (compatible with Next.js 15 App Router + Cloudflare Workers)
- No positioning library needed — existing code uses simple CSS absolute positioning

### Special Considerations
- Dropdown should close on outside click
- Dropdown should close on Escape key
- Currently selected language should be visually indicated (active/highlighted state)
- Language change should persist across page navigations via cookie
- No server round-trip required -- purely client-side cookie-based
- Consider showing the currently selected language (e.g., "VN" or "EN") on the trigger button in the header

---

## Analysis Metadata

| Property | Value |
|----------|-------|
| Analyzed By | Screen Flow Discovery |
| Analysis Date | 2026-03-31 |
| Needs Deep Analysis | No |
| Confidence Score | High |

### Next Steps
- [ ] Get detailed design items via list_frame_design_items for frame 721:4942
- [ ] Extract styles via list_frame_styles
- [ ] Confirm exact node IDs for VN and EN option elements
- [ ] Verify cookie name and value format used for locale storage
