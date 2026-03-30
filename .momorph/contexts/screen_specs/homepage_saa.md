# Screen: Homepage SAA

## Screen Info

| Property | Value |
|----------|-------|
| **Figma Frame ID** | 2167:9026 |
| **Figma Link** | [Open in Figma](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=2167:9026) |
| **Screen Group** | Main Application |
| **Status** | discovered |
| **Discovered At** | 2026-03-24 |
| **Last Updated** | 2026-03-24 |

---

## Description

The main post-login landing page for Sun Annual Awards 2025 (SAA 2025). Themed "ROOT FURTHER", this page serves as the central hub for authenticated users. It features a full-width hero section with a real-time countdown timer to the event, event time and venue details, two CTA buttons navigating to Awards Information and Sun* Kudos, a 6-card awards system grid, a Sun* Kudos promotional block, a persistent header with primary navigation, and a footer. A floating widget button provides quick access to write Kudos or view SAA rules.

![Homepage SAA](https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/2167:9026/e6b9526bed512d707db105ecd2e780dd.png)

---

## Navigation Analysis

### Incoming Navigations (From)

| Source Screen | Trigger | Condition |
|---------------|---------|-----------|
| Login | Google OAuth success | User authenticated successfully |
| Awards Information | Header logo click / "About SAA 2025" nav link | User navigates back to homepage |
| Sun* Kudos | Header logo click / "About SAA 2025" nav link | User navigates back to homepage |
| Any screen | Footer logo click | Always available in footer |

### Outgoing Navigations (To)

| Target Screen | Trigger Element | Node ID | Confidence | Notes |
|---------------|-----------------|---------|------------|-------|
| Awards Information | Header "Awards Information" nav link (A1.3) | I2167:9091;186:1587 | High | Nav link explicit text "Awards Information" |
| Awards Information | CTA "ABOUT AWARDS" button (B3.1) | 2167:9063 | High | Button label explicit; hover state shown |
| Awards Information | Award card "Chi tiết" link (C2.x) | Per card | High | Each of 6 cards links to Awards Info with slug anchor |
| Awards Information | Award card title text click | Per card | High | Spec states title click navigates to Awards Info |
| Awards Information | Award card image click | Per card | High | Spec states image click navigates to Awards Info |
| Sun* Kudos | Header "Sun* Kudos" nav link (A1.5) | I2167:9091;186:1593 | High | Nav link explicit text "Sun* Kudos" |
| Sun* Kudos | CTA "ABOUT KUDOS" button (B3.2) | 2167:9064 | High | Button label explicit; normal state shown |
| Sun* Kudos | D1_Sunkudos "Chi tiết" button (D2.1) | I3390:10349;313:8426 | High | Button label explicit "Chi tiết" |
| Dropdown-profile (721:5223) | Header user avatar (A1.8) | I2167:9091;186:1597 | High | Spec states linkedFrameId 721:5223 |
| Notification Panel | Header notification bell (A1.6) | I2167:9091;186:2101 | High | Bell icon + badge, opens notification panel |
| Language Dropdown | Header language toggle (A1.7) | I2167:9091;186:1696 | High | VN flag + chevron, opens language selection |
| Quick Action Menu | Floating Widget Button (6) | 5022:15169 | Medium | Pill button opens quick-action options |
| About SAA 2025 (anchor) | Header "About SAA 2025" nav link (A1.2) | I2167:9091;186:1579 | High | Selected state; scrolls to top when already selected |

### Navigation Rules
- **Back behavior**: Browser back returns to Login (first authenticated landing)
- **Deep link support**: Yes — `/` (homepage root)
- **Auth required**: Yes — redirects to Login if unauthenticated

---

## Component Schema

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  A1_HEADER                                                   │
│  [Logo] [About SAA 2025] [Awards Info] [Sun* Kudos]         │
│                              [Notification] [VN] [Avatar]   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  HERO / BÌIA                                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  [ROOT FURTHER Key Visual + Logo]                   │    │
│  │  [B1 Countdown: DAYS | HOURS | MINUTES]             │    │
│  │  [B2 Event Info: Time + Venue + Livestream note]    │    │
│  │  [B3 CTAs: ABOUT AWARDS] [ABOUT KUDOS]             │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  [B4 ROOT FURTHER description paragraph]                     │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  C1_HEADER - HỆ THỐNG GIẢI THƯỞNG                           │
│  "Sun* annual awards 2025" | "Hệ thống giải thưởng"         │
│                                                              │
│  C2_AWARD GRID (3 col Desktop / 2 col Mobile+Tablet)        │
│  ┌────────┐ ┌────────┐ ┌────────┐                          │
│  │Top     │ │Top     │ │Top     │                          │
│  │Talent  │ │Project │ │Project │                          │
│  │        │ │        │ │Leader  │                          │
│  └────────┘ └────────┘ └────────┘                          │
│  ┌────────┐ ┌────────┐ ┌────────┐                          │
│  │Best    │ │Sig2025 │ │MVP     │                          │
│  │Manager │ │Creator │ │        │                          │
│  └────────┘ └────────┘ └────────┘                          │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  D1_SUN* KUDOS PROMO BLOCK                                   │
│  [Background Image] + [Title + Description + Chi tiết CTA]  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  7_FOOTER                                                    │
│  [Logo] [About SAA] [Awards Info] [Sun* Kudos] [Tiêu chuẩn] │
│                           [Bản quyền thuộc vè Sun* © 2025]  │
└─────────────────────────────────────────────────────────────┘
                                          [6_Widget Button ●] (fixed)
```

### Component Hierarchy

```
Homepage SAA (FRAME 2167:9026)
├── 3.5_Keyvisual (GROUP) — Hero background
│   └── MM_MEDIA_Keyvisual BG (RECTANGLE)
├── Cover (RECTANGLE) — Overlay cover layer
├── A1_Header (INSTANCE: Organism)
│   ├── A1.1_LOGO (INSTANCE: Atom) — Logo → homepage
│   ├── A1.2_Button-Selected state (INSTANCE: Atom) — "About SAA 2025" [selected]
│   ├── A1.3_Button Hover State (INSTANCE: Atom) — "Awards Information" [hover]
│   ├── A1.5_Button-Normal state (INSTANCE: Atom) — "Sun* Kudos" [normal]
│   ├── A1.6_Notification (INSTANCE: Atom) — Bell icon + badge
│   ├── A1.7_Language (INSTANCE: Molecule) — VN flag + chevron dropdown
│   └── A1.8_Button-IC (INSTANCE: Atom) — User avatar → Dropdown-profile
├── Bìa (FRAME: Hero Organism)
│   ├── Frame 487 (FRAME)
│   │   ├── Frame 482 — Root Further Logo
│   │   └── Frame 523
│   │       ├── B1_Countdown time (FRAME: Molecule)
│   │       │   ├── B1.2_Coming soon (TEXT) — Hidden when countdown = 0
│   │       │   └── B1.3_Countdown (FRAME)
│   │       │       ├── B1.3.1_Days (FRAME: Atom) — 2-digit day counter
│   │       │       ├── B1.3.2_Hours (FRAME: Atom) — 2-digit hour counter
│   │       │       └── B1.3.3_Minutes (FRAME: Atom) — 2-digit minute counter
│   │       └── B2_Thông tin sự kiện (FRAME: Molecule) — Time + Venue + Note
│   └── B3_Call-To-Action (FRAME: Molecule)
│       ├── B3.1_Button-IC About (INSTANCE: Atom) — "ABOUT AWARDS" [hover]
│       └── B3.2_Button-IC Kudos (INSTANCE: Atom) — "ABOUT KUDOS" [normal]
├── Frame 486 (FRAME)
│   ├── Group 434 — ROOT FURTHER text imagery
│   └── B4_content (GROUP: Molecule) — Description paragraphs
├── 6_Widget Button (INSTANCE: Atom) — Floating FAB (fixed position)
├── Hệ thống giải thưởng (FRAME: Organism)
│   ├── C1_Header Giải thưởng (FRAME: Molecule) — Section header
│   └── C2_Award list (GROUP: Organism)
│       ├── Frame 491 (row 1)
│       │   ├── C2.1_Top Talent Award (INSTANCE: Card Molecule)
│       │   ├── C2.2_Top Project Award (INSTANCE: Card Molecule)
│       │   └── C2.3_Top Project Leader Award (INSTANCE: Card Molecule)
│       └── Frame 493 (row 2)
│           ├── C2.4_Best Manager Award (INSTANCE: Card Molecule)
│           ├── C2.5_Signature 2025 - Creator Award (INSTANCE: Card Molecule)
│           └── C2.6_MVP Award (INSTANCE: Card Molecule)
├── D1_Sunkudos (INSTANCE: Organism)
│   ├── MM_MEDIA_Kudos Background (RECTANGLE)
│   ├── D2_Content (FRAME: Molecule) — Title + description + CTA
│   │   └── D2.1_Button-IC (INSTANCE: Atom) — "Chi tiết" → Sun* Kudos
│   └── MM_MEDIA_Logo/Kudos (GROUP) — Kudos logo
└── 7_Footer (INSTANCE: Organism)
    ├── 7.1_LOGO (INSTANCE: Atom) — Logo → homepage top
    ├── 7.2_Button-IC (INSTANCE: Atom) — "About SAA 2025"
    ├── 7.3_Button-IC (INSTANCE: Atom) — "Awards Information"
    ├── 7.4_Button-IC (INSTANCE: Atom) — "Sun* Kudos"
    ├── 7.5_Button-IC (INSTANCE: Atom) — "Tiêu chuẩn chung"
    └── Copyright text (TEXT)
```

### Main Components

| Component | Type | Node ID | Description | Reusable |
|-----------|------|---------|-------------|----------|
| A1_Header | Organism | 2167:9091 | Primary navigation bar with logo, nav links, notification, language, user avatar | Yes |
| Bìa (Hero) | Organism | 2167:9030 | Full-width hero with countdown, event info, and CTAs | No |
| B1_Countdown time | Molecule | 2167:9035 | Real-time countdown timer (Days/Hours/Minutes) | No |
| B3_Call-To-Action | Molecule | 2167:9062 | "ABOUT AWARDS" + "ABOUT KUDOS" CTA buttons | No |
| C2_Award list | Organism | 5005:14974 | 6-card awards grid with image, title, description, "Chi tiết" link | No |
| Award Card (generic) | Molecule | Per instance | Thumbnail + title + description + "Chi tiết" link button | Yes |
| D1_Sunkudos | Organism | 3390:10349 | Sun* Kudos promo block with background, content, CTA | Yes |
| 6_Widget Button | Atom | 5022:15169 | Fixed floating action pill button (bottom-right) | Yes |
| 7_Footer | Organism | 5001:14800 | Footer nav + logo + copyright | Yes |

---

## Form Fields (If Applicable)

No form fields on this screen. All interactions are navigational or display-only.

---

## API Mapping

### On Screen Load

| API | Method | Purpose | Response Usage |
|-----|--------|---------|----------------|
| /events/current (predicted) | GET | Fetch event details for countdown calculation | Populate event datetime, venue, time display |
| /awards (predicted) | GET | Fetch award categories for the awards grid | Populate C2 award cards (title, description, slug, image) |
| /notifications (predicted) | GET | Fetch user notification count/status | Display badge count on A1.6 notification bell |

### On User Action

| Action | API | Method | Request Body | Response |
|--------|-----|--------|--------------|----------|
| Countdown tick (per minute) | — | — | Client-side timer using event datetime from env/API | Update displayed DAYS/HOURS/MINUTES |
| Click "ABOUT AWARDS" / award card | — | — | Navigation only → Awards Information page | — |
| Click "ABOUT KUDOS" / Kudos CTA | — | — | Navigation only → Sun* Kudos page | — |
| Click notification bell | /notifications (predicted) | GET | — | Fetch notifications for panel |
| Click user avatar | — | — | Navigation only → open Dropdown-profile overlay | — |
| Widget button click | — | — | Navigation only → open quick-action menu | — |

### Error Handling

| Error Code | Message | UI Action |
|------------|---------|-----------|
| 401 | Unauthenticated | Redirect to Login screen |
| 500 | Server error fetching awards/events | Show fallback/empty state for affected section |

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| countdownDays | number | Calculated | Days remaining until event |
| countdownHours | number | Calculated | Hours remaining until event |
| countdownMinutes | number | Calculated | Minutes remaining until event |
| isComingSoonVisible | boolean | true | Whether to show "Coming soon" label |
| isNotificationOpen | boolean | false | Notification panel open/closed |
| isProfileDropdownOpen | boolean | false | Profile dropdown open/closed |
| isLanguageDropdownOpen | boolean | false | Language dropdown open/closed |

### Global State (If Applicable)

| State | Store | Read/Write | Purpose |
|-------|-------|------------|---------|
| user | authStore | Read | Display user avatar, determine admin role for profile dropdown |
| currentLanguage | i18nStore | Read/Write | Current UI language (VN/EN) |
| notifications | notificationStore | Read/Write | Notification count and list |

---

## UI States

### Loading State
- Award grid shows skeleton cards while `/awards` API loads
- Event countdown shows placeholder "—" or skeleton while event data loads
- Notification badge hidden until count is fetched

### Error State
- If `/awards` fails: award grid section shows a retry option or empty fallback
- If `/events/current` fails: countdown shows "--" values or hides the countdown section
- Network errors: toast notification

### Success State
- Countdown timer animates/updates smoothly
- Award cards render with images, titles, descriptions, and "Chi tiết" links
- Notification badge shows count if unread notifications exist

### Empty State
- If no awards returned: award grid section is hidden or shows "No awards available" message
- If countdown reaches zero: "Coming soon" hidden, all time units display "00"

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Focus management | Header nav links are keyboard-focusable; CTA buttons have clear focus states |
| Keyboard navigation | Tab through header links, CTA buttons, award card links, footer links |
| Screen reader | ARIA labels on icon buttons (notification, language, user avatar, widget FAB) |
| Countdown | Live region (`aria-live="polite"`) for countdown timer updates |
| Award cards | Alt text on award thumbnail images; "Chi tiết" links have accessible names including award name |
| Color contrast | WCAG AA compliant on all text/background combinations |

---

## Responsive Behavior

| Breakpoint | Layout Changes |
|------------|----------------|
| Mobile (<768px) | Award grid: 2 columns; hero text/CTA stacked; header collapses nav (hamburger or scrollable) |
| Tablet (768-1024px) | Award grid: 2 columns; hero layout partially compressed |
| Desktop (>1024px) | Award grid: 3 columns; full header nav visible; hero at full scale |

---

## Analytics Events (Optional)

| Event | Trigger | Properties |
|-------|---------|------------|
| screen_view | On mount | `{screen: "homepage_saa"}` |
| cta_click | "ABOUT AWARDS" clicked | `{cta: "about_awards"}` |
| cta_click | "ABOUT KUDOS" clicked | `{cta: "about_kudos"}` |
| award_card_click | Award card clicked | `{award_slug, element: "image|title|chi_tiet"}` |
| kudos_cta_click | Sun* Kudos "Chi tiết" clicked | `{section: "sunkudos"}` |
| widget_button_click | Floating widget FAB clicked | `{}` |
| notification_open | Bell icon clicked | `{}` |
| profile_dropdown_open | User avatar clicked | `{}` |

---

## Implementation Notes

### Dependencies
- Countdown timer: Client-side interval (setInterval, 60s tick)
- Event datetime source: Environment variable (ISO-8601) or `/events/current` API
- HTTP client: fetch / axios
- i18n: next-intl or similar (VN/EN support)
- Image assets: Figma media (keyvisual BG, Root Further logo, award thumbnails, Kudos background)

### Special Considerations
- Countdown must handle timezone correctly — event datetime should be in UTC or include timezone offset.
- Award card "Chi tiết" links use URL hash (`/awards-information#{award-slug}`) for in-page anchoring on the Awards Information page.
- The floating Widget Button (6_Widget Button) is `position: fixed` and should sit above all page content (high z-index).
- User avatar button (A1.8) is role-aware: admin users see an additional "Admin Dashboard" option in the dropdown.
- The header is likely `position: sticky` or `fixed` to remain visible during scroll.
- The "ROOT FURTHER" text in the hero is a media asset (image), not editable text.

---

## Analysis Metadata

| Property | Value |
|----------|-------|
| Analyzed By | Screen Flow Discovery |
| Analysis Date | 2026-03-24 |
| Needs Deep Analysis | Yes |
| Confidence Score | High |

### Next Steps
- [ ] Run `list_frame_design_items` for detailed design token extraction
- [ ] Run `list_frame_styles` for typography and color system
- [ ] Confirm event datetime env variable key/format with backend team
- [ ] Confirm award slug format for URL hash anchoring with backend team
- [ ] Discover Awards Information screen to map outgoing navigation targets
- [ ] Discover Sun* Kudos screen to map outgoing navigation targets
- [ ] Discover Dropdown-profile (Frame 721:5223) details
- [ ] Confirm admin role detection mechanism
- [ ] Review countdown timezone handling with dev team
