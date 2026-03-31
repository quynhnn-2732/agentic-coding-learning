# Feature Specification: Dropdown Ngon Ngu (Language Selector with i18n)

**Frame ID**: `721:4942`
**Frame Name**: `Dropdown-ngon-ngu`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-03-31
**Status**: Draft

---

## Overview

A language selector dropdown enabling users to switch the application UI language between Vietnamese (VN) and English (EN). The dropdown is rendered in the site header across all authenticated screens. Selecting a language triggers a full i18n locale change — updating all translatable strings, persisting the preference, and refreshing content in the chosen language.

**Design Reference**: ![Dropdown ngon ngu](assets/frame.png)

**Existing Component**: `src/app/_components/layout/language-selector.tsx` — currently renders a dropdown with locale cookie storage but does NOT implement actual i18n text translation. This spec extends it to a full i18n solution.

**Scope Note**: This spec covers TWO concerns: (1) the dropdown UI component itself (styling, behavior), and (2) the i18n infrastructure it triggers. Phase 1 (P1 stories) focuses on the dropdown + i18n plumbing. Translating all existing hardcoded strings across the app is a **separate, ongoing effort** — not a prerequisite for the dropdown to function. The dropdown should work end-to-end with at least header/nav strings translated as proof of concept.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Switch Language via Dropdown (Priority: P1)

A user clicks the language selector in the header to switch from Vietnamese to English (or vice-versa). All translatable UI text on the current page updates to the selected language without a full page reload (or with a minimal refresh). The selected language persists across sessions.

**Why this priority**: Core functionality — without this, the i18n feature has no value.

**Independent Test**: Render any authenticated page → click language dropdown → select "EN" → verify visible UI text switches to English. Refresh page → verify English is still selected.

**Acceptance Scenarios**:

1. **Given** the user is on any page with language set to VN, **When** the user clicks the language dropdown and selects "EN", **Then** all translatable text on the page switches to English, the dropdown displays the EN flag + "EN", and a `locale=en` cookie is set.
2. **Given** the user previously selected EN and refreshes the page, **When** the page loads, **Then** the language remains EN (read from cookie) and all text renders in English.
3. **Given** the user is on the EN locale, **When** the user clicks the dropdown and selects "VN", **Then** all text switches back to Vietnamese and the cookie updates to `locale=vi`.

---

### User Story 2 - Dropdown Open/Close Behavior (Priority: P1)

The dropdown opens on click, displays two language options (VN, EN), and closes when the user selects an option, clicks outside, or presses Escape.

**Why this priority**: Core UX interaction — must work reliably.

**Independent Test**: Click the language button → dropdown opens with 2 options → click outside → dropdown closes. Repeat with Escape key.

**Acceptance Scenarios**:

1. **Given** the dropdown is closed, **When** the user clicks the language button, **Then** the dropdown opens showing VN and EN options with flag icons.
2. **Given** the dropdown is open, **When** the user clicks outside the dropdown, **Then** the dropdown closes.
3. **Given** the dropdown is open, **When** the user presses the Escape key, **Then** the dropdown closes and focus returns to the trigger button.
4. **Given** the dropdown is open, **When** the user selects a language, **Then** the dropdown closes and the selected language is applied.

---

### User Story 3 - Visual Selected State (Priority: P2)

The currently active language option is visually highlighted (with a distinct background) to differentiate it from unselected options.

**Why this priority**: Enhances UX clarity but not blocking for core functionality.

**Independent Test**: Open dropdown when VN is selected → VN row has highlighted background (`rgba(255, 234, 158, 0.2)`), EN row has default dark background.

**Acceptance Scenarios**:

1. **Given** VN is the current language, **When** the dropdown is opened, **Then** the VN option displays a highlighted background (`rgba(255, 234, 158, 0.2)`) and the EN option has a dark background (`#00070C`).
2. **Given** the user switches to EN, **When** the dropdown is opened again, **Then** the EN option shows the highlighted background and VN shows the default.

---

### User Story 4 - Keyboard Accessibility (Priority: P2)

Users can navigate and select languages using keyboard only.

**Why this priority**: Accessibility compliance (WCAG 2.1 AA).

**Independent Test**: Tab to language button → press Enter to open → use Arrow keys to navigate → press Enter to select.

**Acceptance Scenarios**:

1. **Given** the language button is focused, **When** the user presses Enter or Space, **Then** the dropdown opens.
2. **Given** the dropdown is open, **When** the user presses ArrowDown/ArrowUp, **Then** focus moves between VN and EN options.
3. **Given** an option is focused, **When** the user presses Enter, **Then** the language is selected and the dropdown closes.

---

### User Story 5 - Default Language Detection (Priority: P3)

When a new user visits for the first time (no locale cookie), the application defaults to Vietnamese (VN).

**Why this priority**: Nice-to-have — fallback behavior.

**Independent Test**: Clear cookies → visit any page → verify language is VN and dropdown shows VN flag.

**Acceptance Scenarios**:

1. **Given** no `locale` cookie exists, **When** the user loads any page, **Then** the UI renders in Vietnamese and the dropdown displays the VN flag + "VN".

---

### Edge Cases

- What happens when an unsupported locale value is in the cookie? → Fall back to `vi`.
- What happens if translation keys are missing for a given locale? → Display the default (Vietnamese) string as fallback.
- How does the dropdown behave on mobile? → Same behavior, touch-friendly sizing (min 44x44px touch targets per option, each option is 56px tall).
- What if both language dropdown and profile dropdown are open? → Opening one MUST close the other (only one dropdown open at a time).
- What happens during `router.refresh()` after language switch? → Brief re-render may occur; the dropdown should already be closed before refresh triggers.
- Does the language selector appear on the login page? → Only on pages using `HomepageHeader`. Login page has a different header — language selector is NOT available there (out of scope for this spec).

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Language Trigger Button (Collapsed) | Flag icon (current locale) + locale code ("VN"/"EN") + ChevronDown icon, in header right group. 14px/700 Montserrat white text. ChevronDown rotates 180deg when open. | Click to toggle dropdown. Hover: `bg-white/10` |
| Dropdown Container (Expanded) | Dark panel (`#00070C`) with gold border (`#998C5F`), rounded 8px, padding 6px. Contains 2 language option rows stacked vertically. | Opens below trigger button, positioned absolute right-0 |
| Language Option - VN | Vietnam flag icon (24x24) + "VN" text (16px/700 white). When selected: bg `rgba(255,234,158,0.2)`, rounded 2px. | Click to select Vietnamese |
| Language Option - EN | UK flag icon (24x24) + "EN" text (16px/700 white). When selected: bg `rgba(255,234,158,0.2)`, rounded 2px. | Click to select English |

> **Full visual specs**: See [design-style.md](design-style.md)

### Navigation Flow

- From: Any authenticated page (language selector is in the global header)
- To: Same page (language changes in place, no navigation)
- Triggers: Click on language option

### Visual Requirements

- Responsive breakpoints: Same across mobile/tablet/desktop (compact dropdown)
- Animations: Dropdown open/close with `opacity` + `translateY` transition (150ms ease-out)
- Accessibility: WCAG 2.1 AA — `role="listbox"`, `aria-selected`, `aria-expanded`, `aria-haspopup="listbox"`, keyboard navigation

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support two locales: Vietnamese (`vi`) and English (`en`).
- **FR-002**: System MUST use an i18n library compatible with Next.js 15 App Router AND Cloudflare Workers runtime (e.g., `next-intl` if middleware is not required, or a lightweight alternative). The chosen library MUST support both Server and Client Components.
- **FR-003**: System MUST store the user's locale preference in a cookie (`locale`) with `path=/`, `max-age=31536000`, `SameSite=Lax`.
- **FR-004**: System MUST render all translatable UI text in the selected locale.
- **FR-005**: System MUST fall back to `vi` when no locale cookie exists or when the cookie value is invalid.
- **FR-006**: Language switch MUST NOT require a full browser page reload. Use `router.refresh()` (React Server Component re-render) or equivalent client-side re-render to update translations in place.
- **FR-007**: The language dropdown MUST be visible and functional on all pages where the header is rendered.

### Technical Requirements

- **TR-001**: Translation files MUST be organized as `messages/vi.json` and `messages/en.json` at the project root.
- **TR-002**: All user-facing strings MUST eventually use translation keys (e.g., `t('header.login')`). **Phase 1 minimum**: header/nav strings, WidgetButton labels, and the language selector itself. Remaining pages are translated incrementally — see Scope Note in Overview.
- **TR-003**: The `LanguageSelector` component MUST be a Client Component (`"use client"`).
- **TR-004**: i18n configuration MUST be compatible with Next.js App Router (server + client components).
- **TR-005**: Flag icons MUST be SVG icon components (VnFlagIcon, GbFlagIcon) — no `<img>` tags.
- **TR-006**: **Cloudflare Workers compatibility**: The i18n solution MUST NOT rely on Node.js-only APIs or Next.js middleware that is incompatible with the Cloudflare Workers runtime (via OpenNext). Verify edge compatibility before selecting the library. If `next-intl` middleware is needed, confirm it runs on Cloudflare or use a cookie-only approach without middleware.

### Key Entities

- **Locale**: `vi` | `en` — the supported language codes.
- **Translation Messages**: JSON files with nested key-value pairs for each locale.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| N/A | — | No API needed — locale is client-side cookie only | — |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of translatable UI strings render correctly in both VN and EN.
- **SC-002**: Language preference persists across page refreshes and browser sessions.
- **SC-003**: Dropdown open/close interaction completes within 150ms (animation duration).
- **SC-004**: All dropdown interactions are accessible via keyboard (Tab, Enter, Escape, Arrow keys).

---

## Out of Scope

- Server-side locale detection based on `Accept-Language` header (future enhancement).
- URL-based locale routing (e.g., `/en/dashboard`) — using cookie-based approach only.
- Additional languages beyond VN and EN.
- Translation of user-generated content (kudos messages, comments).
- RTL language support.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] Translation files created (`messages/vi.json`, `messages/en.json`)
- [ ] `next-intl` package installed and configured
- [x] Screen flow documented (`.momorph/contexts/SCREENFLOW.md`)
- [x] Existing `LanguageSelector` component at `src/app/_components/layout/language-selector.tsx`

---

## Notes

- The existing `LanguageSelector` component already handles dropdown open/close, click-outside, Escape key, and cookie storage. The main work is:
  1. Install and configure `next-intl` for Next.js App Router
  2. Create translation JSON files for all existing hardcoded strings
  3. Replace hardcoded strings with `t()` calls throughout the app
  4. Add GB/UK flag icon component (VN flag already exists)
  5. Update dropdown styling to match Figma (selected state highlight, border, sizing)
- The Figma design shows the dropdown in an expanded (open) state with VN selected (highlighted) and EN as an option.
- Component set ID `563:8216` suggests multiple dropdown variants may exist in Figma (e.g., collapsed state, EN-selected state).
