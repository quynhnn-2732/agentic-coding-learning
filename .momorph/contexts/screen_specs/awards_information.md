# Screen: Hệ thống giải (Awards Information)

## Screen Info

| Property | Value |
|----------|-------|
| **Figma Frame ID** | 313:8436 |
| **Figma Link** | [Open in Figma](https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=313:8436) |
| **Route** | `/awards-information` |
| **Screen Group** | Main Application |
| **Status** | discovered |
| **Discovered At** | 2026-03-24 |
| **Last Updated** | 2026-03-24 |

---

## Description

The Awards Information screen is a dedicated page presenting the full SAA 2025 award system. It displays all 6 award categories — Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 Creator, and MVP — each with a 336×336px award image, title, description, recipient count, and monetary prize value. A left-side navigation menu lets users jump to any category section. The screen also includes a Sun* Kudos promotional block and the shared sticky header/footer.

---

## Navigation Analysis

### Incoming Navigations (From)

| Source Screen | Trigger | Condition |
|---------------|---------|-----------|
| Homepage SAA | Header nav "Awards Information" | Authenticated user |
| Homepage SAA | CTA button "ABOUT AWARDS" | Authenticated user |
| Homepage SAA | Award card "Chi tiết" / title / image click | Authenticated; URL hash targets specific award |
| Any screen | Footer nav "Awards Information" | Authenticated user |

### Outgoing Navigations (To)

| Target Screen | Trigger Element | Node ID | Confidence | Notes |
|---------------|-----------------|---------|------------|-------|
| Homepage SAA | Header "About SAA 2025" nav | I313:8440;186:1587 | high | → /dashboard |
| Sun* Kudos | Header "Sun* Kudos" nav | I313:8440;186:1593 | high | → /sun-kudos |
| Sun* Kudos | D1_Sunkudos "Chi tiết" button | I335:12023;313:8426 | high | → /sun-kudos |
| Dropdown-profile | Header user avatar icon | I313:8440;186:1597 | high | Opens profile dropdown overlay |
| Notification Panel | Header notification bell | I313:8440;186:2101 | high | Opens notification panel |
| Language Dropdown | Header language toggle | I313:8440;186:1696 | high | Opens language dropdown (721:4942) |
| Homepage SAA | Footer "About SAA 2025" link | I354:4323;342:1410 | high | → /dashboard |
| Sun* Kudos | Footer "Sun* Kudos" link | I354:4323;342:1412 | high | → /sun-kudos |
| Tiêu chuẩn chung | Footer "Tiêu chuẩn chung" (4th link) | I354:4323;1161:9487 | high | → /tieu-chuan-chung |
| (same page) | C_Menu list nav item click | 313:8459 | high | Smooth scroll to award anchor |

### Navigation Rules
- **Back behavior**: Browser back → previous page (typically Homepage SAA)
- **Deep link support**: Yes — `/awards-information` + `#top-talent`, `#top-project`, `#top-project-leader`, `#best-manager`, `#signature-2025-creator`, `#mvp`
- **Auth required**: Yes

---

## Component Schema

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│                    HEADER (sticky)                   │
│  [Logo] [About SAA 2025 | Awards Info | Sun* Kudos] │
│  [Language][Notification Bell][Avatar]               │
├─────────────────────────────────────────────────────┤
│               3_KEYVISUAL (Hero Banner)              │
│  ROOT FURTHER artwork + "Sun* Annual Award 2025"    │
├─────────────────────────────────────────────────────┤
│           A_TITLE Hệ thống giải thưởng               │
│  "Sun* annual awards 2025" / "Hệ thống giải thưởng  │
│   SAA 2025" (gold, large)                           │
├─────────────────────────────────────────────────────┤
│  B_HỆ THỐNG GIẢI THƯỞNG                             │
│  ┌────────────────┬──────────────────────────────┐  │
│  │  C_MENU LIST   │   D_DANH SÁCH GIẢI THƯỞNG    │  │
│  │  (Left Nav)    │                              │  │
│  │  • Top Talent  │  D.1 Top Talent              │  │
│  │  • Top Project │  [Image 336×336] + content   │  │
│  │  • Top Proj.   │  D.2 Top Project             │  │
│  │    Leader      │  D.3 Top Project Leader      │  │
│  │  • Best Mgr    │  D.4 Best Manager            │  │
│  │  • Signature   │  D.5 Signature 2025 Creator  │  │
│  │  • MVP         │  D.6 MVP                     │  │
│  └────────────────┴──────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│               D1_SUNKUDOS (promo block)             │
│  "Phong trào ghi nhận" | "Sun* Kudos" | Chi tiết   │
├─────────────────────────────────────────────────────┤
│                    FOOTER                            │
│  [Logo] [Nav ×4]  "Bản quyền thuộc về Sun* © 2025" │
└─────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
Screen (Hệ thống giải)
├── Header (Organism) [shared]
│   ├── Logo (Atom) → /dashboard
│   ├── NavLinks (Molecule)
│   │   ├── "About SAA 2025" (NavScrollLink) — selected on /dashboard only
│   │   ├── "Awards Information" (Link) — active on this page
│   │   └── "Sun* Kudos" (Link)
│   └── RightActions (Molecule)
│       ├── LanguageSelector (Molecule) — VN/EN toggle
│       ├── NotificationBell (Atom) — with red badge
│       └── AvatarButton (Atom) — user profile
├── 3_Keyvisual (Organism)
│   └── HeroImage (Atom) 1200×871px — "ROOT FURTHER" artwork
├── A_Title (Molecule) — static heading
│   ├── Caption: "Sun* annual awards 2025"
│   └── Headline: "Hệ thống giải thưởng SAA 2025" (gold)
├── B_HệThốngGiảiThưởng (Organism)
│   ├── C_MenuList (Molecule) — left sticky navigation
│   │   └── NavItem ×6 (Atom) — icon + text, active state = gold underline
│   └── D_DanhSáchGiảiThưởng (Organism)
│       └── AwardSection ×6 (Molecule)
│           ├── Picture-Award (Atom) — 336×336px image
│           └── ContentBlock (Molecule)
│               ├── Title (Atom) — award name
│               ├── Description (Atom) — purpose & criteria
│               ├── Quantity (Atom) — count + unit (Cá nhân/Tập thể)
│               └── PrizeValue (Atom) — VNĐ amount
├── D1_Sunkudos (Organism) [shared section]
│   ├── TextContent (Molecule)
│   │   ├── Label: "Phong trào ghi nhận"
│   │   ├── Title: "Sun* Kudos"
│   │   ├── Description text
│   │   └── "Chi tiết" CTA button → /sun-kudos
│   └── KudosLogo (Atom) — decorative
└── Footer (Organism) [shared]
    ├── Logo (Atom)
    ├── NavLinks (Molecule) ×4 — About SAA 2025, Awards Information, Sun* Kudos, Tiêu chuẩn chung
    └── Copyright (Atom)
```

### Main Components

| Component | Type | Node ID | Description | Reusable |
|-----------|------|---------|-------------|----------|
| Header | Organism | 313:8440 | Shared sticky app header | Yes |
| 3_Keyvisual | Organism | 313:8437 | Hero banner — ROOT FURTHER artwork, non-interactive | No |
| A_Title | Molecule | 313:8453 | "Hệ thống giải thưởng SAA 2025" section heading | No |
| C_MenuList | Molecule | 313:8459 | Left-side sticky nav for 6 award categories | No |
| D_DanhSáchGiảiThưởng | Organism | 313:8466 | 6 award detail sections, each with image + info | No |
| Picture-Award | Atom | I313:8467;214:2525 | 336×336px award image per section | Yes |
| D1_Sunkudos | Organism | 335:12023 | Sun* Kudos promotional block | Yes (shared) |
| Footer | Organism | 354:4323 | Shared app footer | Yes |

---

## Award Categories Data

| # | Slug | Award Name | Count | Unit | Prize Value |
|---|------|------------|-------|------|-------------|
| 1 | `top-talent` | Top Talent | 10 | Cá nhân (Individual) | 7,000,000 VNĐ each |
| 2 | `top-project` | Top Project | 02 | Tập thể (Team) | 15,000,000 VNĐ each |
| 3 | `top-project-leader` | Top Project Leader | 03 | Cá nhân | 7,000,000 VNĐ each |
| 4 | `best-manager` | Best Manager | 01 | Cá nhân | 10,000,000 VNĐ |
| 5 | `signature-2025-creator` | Signature 2025 - Creator | 01 | Cá nhân or Tập thể | 5,000,000 VNĐ (individual) / 8,000,000 VNĐ (team) |
| 6 | `mvp` | MVP (Most Valuable Person) | 01 | Cá nhân | 15,000,000 VNĐ |

---

## Form Fields

N/A — Read-only information screen, no user input required.

---

## API Mapping

### On Screen Load

| API | Method | Purpose | Response Usage |
|-----|--------|---------|----------------|
| GET /awards | GET | Fetch all 6 award categories with details | Populate award cards (name, description, count, unit, prizeValue, imageUrl) |
| (Supabase auth) | GET | Validate session + get avatar_url | Header avatar display |

### On User Action

| Action | API | Method | Request Body | Response |
|--------|-----|--------|--------------|----------|
| Click left nav item | — | — | — | Client-side scroll to `#slug` anchor |
| Click "Chi tiết" (Kudos) | — | — | — | Navigate to /sun-kudos |
| Click header avatar | — | — | — | Open Dropdown-profile overlay |

### Error Handling

| Error Code | Message | UI Action |
|------------|---------|-----------|
| 401 | Unauthorized | Redirect to / (login) |
| 404 | Not found | Show 404 error page |
| 500 | Server error | Show error state with retry button |

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| activeCategory | string | `'top-talent'` | Highlighted item in C_MenuList, updated on scroll |
| scrollY | number | 0 | Tracked to sync active nav item with viewport position |

### Global State (If Applicable)

| State | Store | Read/Write | Purpose |
|-------|-------|------------|---------|
| user | authStore/Supabase | Read | Display avatar in header |
| locale | i18nStore | Read | VN/EN language state |

---

## UI States

### Loading State
- Award sections: skeleton cards (image placeholder + text lines) while GET /awards is in-flight
- Header: renders immediately from cached Supabase session

### Error State
- Awards API failure: error banner in D_DanhSáchGiảiThưởng with retry button
- Auth failure: redirect to / (login)

### Success State
- Award cards fully populated with image, title, description, count, prize value

### Empty State
- N/A — award data is static/seeded; fallback to hardcoded data if API unavailable

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Focus management | Focus first nav item or heading on load |
| Keyboard navigation | Tab through C_MenuList items; Enter to scroll to section |
| Screen reader | `role="navigation"` on C_MenuList; `aria-current="true"` on active nav item |
| Deep links | `id={slug}` on each award section for anchor navigation |
| Images | `alt="{awardName} award"` on Picture-Award |
| Color contrast | WCAG AA — gold (#FFEA9E) on dark (#00101A) background |

---

## Responsive Behavior

| Breakpoint | Layout Changes |
|------------|----------------|
| Mobile (<768px) | C_MenuList collapses to horizontal scrollable tabs or select dropdown; award sections stack vertically |
| Tablet (768–1024px) | C_MenuList visible at reduced width; content area adapts |
| Desktop (>1024px) | Two-column layout: sticky left nav + scrollable award list; max-width 1224px centered |

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent-gold` | #FFEA9E | Award section titles, active nav indicator |
| `--color-homepage-header-bg` | rgba(16,20,23,0.8) | Header background |
| `--shadow-glow-gold` | 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287 | Active nav item + award image hover |
| `--spacing-content-w` | 1224px | Max content width |
| `--spacing-page-px` | 144px | Page horizontal padding |

---

## Implementation Notes

### Dependencies
- Intersection Observer API (for active nav sync on scroll)
- `next/image` for award images (`loading="lazy"`, `width=336`, `height=336`)
- Supabase server client for session (RSC)

### Special Considerations
- **Left nav scroll sync**: Use `IntersectionObserver` on each `#slug` section — when section enters viewport, update `activeCategory` state (Client Component)
- **URL hash**: Each award section must have `id={slug}` attribute matching Homepage SAA anchor links (e.g., `#top-talent`)
- **Award data source**: Currently implemented as static data in `src/libs/data/awards.ts`; may later migrate to GET /awards API
- **Signature 2025 prize split**: Unique dual-value display (5M individual / 8M team) — requires special layout vs other cards

---

## Analysis Metadata

| Property | Value |
|----------|-------|
| Analyzed By | Screen Flow Discovery |
| Analysis Date | 2026-03-24 |
| Needs Deep Analysis | No |
| Confidence Score | High |

### Next Steps
- [ ] Confirm `/awards-information` route implementation with backend
- [ ] Confirm award data is served via API or remains static
- [ ] Review C_MenuList scroll sync behavior (IntersectionObserver threshold)
- [ ] Design responsive C_MenuList for mobile breakpoint (tabs vs dropdown)
