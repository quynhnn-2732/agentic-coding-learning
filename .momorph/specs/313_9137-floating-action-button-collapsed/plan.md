# Implementation Plan: FAB + Thể lệ Flow

**Frames**: `313:9137` (FAB Collapsed) + `313:9139` (FAB Expanded) + `3204:6051` (Thể lệ Panel)
**Date**: 2026-03-30
**Specs**: `specs/313_9137-*/spec.md`, `specs/313_9139-*/spec.md`, `specs/3204_6051-*/spec.md`

---

## Summary

Extend the existing `WidgetButton` component to support an expanded menu state with two action buttons ("Thể lệ" and "Viết KUDOS"), and build a new slide-in rules panel ("Thể lệ") that displays Kudos program rules including Hero badge tiers, collectible icon badges, and Kudos Quốc Dân information.

**Key finding**: `WidgetButton` already exists at `src/app/_components/homepage/widget-button.tsx` with `isMenuOpen` state and an empty `<div role="menu">`. This plan extends it rather than creating from scratch.

**Discrepancy noted**: The existing `WidgetButton` uses `bottom-10` (40px) but the Figma spec shows `bottom: 130px`. The current positioning was accepted during Homepage implementation. This plan does NOT change the vertical position — it preserves the existing `bottom-10` to avoid regression. If repositioning is needed, it should be a separate task after verifying both homepage and sun-kudos contexts.

**Discrepancy noted**: The Figma design shows a "/" text divider between the pen and SAA icons in the collapsed FAB. The existing implementation omits this divider (just two icons side by side). This plan preserves the current behavior. If the "/" divider is required, add it as a follow-up enhancement.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4
**Database**: N/A (static content)
**Testing**: Vitest (unit), Playwright (E2E)
**State Management**: React `useState` + `useRef` (local only)
**API Style**: N/A (no API calls for this feature)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case files, PascalCase components)
- [x] Uses approved libraries and patterns (React, TailwindCSS, Next.js App Router)
- [x] Adheres to folder structure guidelines (`src/app/_components/` feature folders)
- [x] Meets security requirements (no user input, no API calls, no auth needed)
- [x] Follows testing standards (TDD: write tests first, then implement)
- [x] Uses `"use client"` only when browser APIs needed (interactivity → yes)
- [x] Responsive mobile-first design with Tailwind breakpoints
- [x] Icons in Icon Components, not raw SVG or img tags

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — extend `homepage/widget-button.tsx`, add new `sun-kudos/rules-panel.tsx`
- **Styling Strategy**: Tailwind utility classes with existing CSS variables from `globals.css`
- **Data Fetching**: None — all content is static (hardcoded Vietnamese text from Figma)

### State Management

```
WidgetButton (manages all state)
├── isMenuOpen: boolean      → toggles collapsed/expanded FAB
├── isRulesOpen: boolean     → toggles Thể lệ panel visibility
│
├── Collapsed state: isMenuOpen=false
├── Expanded state: isMenuOpen=true, renders FABMenu
└── Rules panel:   isRulesOpen=true, renders RulesPanel
```

- **No global state** — FAB state is self-contained within `WidgetButton`
- **Focus management** — on expand: focus first menu item; on close: return focus to FAB trigger
- **Click-outside** — reuse pattern from `highlight-carousel.tsx` (lines 42-53): `useEffect` + `mousedown` listener

### Reuse Existing Assets

| Existing Asset | Location | Reuse |
|----------------|----------|-------|
| `WidgetButton` | `src/app/_components/homepage/widget-button.tsx` | Extend with expanded menu |
| `WidgetPenIcon` | `src/app/_components/icons/widget-pen-icon.tsx` | "Viết KUDOS" button icon |
| `WidgetSaaIcon` | `src/app/_components/icons/widget-saa-icon.tsx` | "Thể lệ" button icon |
| `--color-accent-gold` | `globals.css:76` | #FFEA9E button backgrounds |
| `--color-bg-dark` | `globals.css:5` | #00101A text color |
| `--color-kudos-container-dark` | `globals.css:113` | #00070C panel background |
| `--color-btn-kudos-bg` | `globals.css:78` | rgba(255,234,158,0.10) secondary btn |
| `--color-btn-kudos-border` | `globals.css:79` | #998C5F secondary btn border |
| `--color-notification-badge` | `globals.css:80` | rgba(212,39,29,1) close button red |
| `--shadow-glow-gold` | `globals.css:103` | FAB golden glow shadow |
| Click-outside pattern | `highlight-carousel.tsx:42-53` | Dismiss expanded menu |
| CTA button styles | `cta-buttons.tsx:4-5` | Primary/secondary button patterns |
| Focus ring pattern | CTA_BASE class | `focus-visible:ring-2 focus-visible:ring-[#FFEA9E]` |

### Integration Points

- **Sun Kudos page** (`src/app/sun-kudos/page.tsx:97`): `<WidgetButton />` already rendered — no changes needed there
- **Homepage** (`src/app/(home)/page.tsx`): Also uses `<WidgetButton />` — shared component, both pages benefit

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/313_9137-floating-action-button-collapsed/
├── spec.md              # FAB collapsed spec
├── design-style.md      # FAB collapsed design
└── plan.md              # This file (shared plan for entire flow)

.momorph/specs/313_9139-floating-action-button-expanded/
├── spec.md              # FAB expanded spec
└── design-style.md      # FAB expanded design

.momorph/specs/3204_6051-the-le-update/
├── spec.md              # Rules panel spec
└── design-style.md      # Rules panel design
```

### Source Code (affected areas)

```text
src/app/_components/
├── homepage/
│   └── widget-button.tsx          # MODIFY — extend with expanded menu + rules panel trigger
├── sun-kudos/
│   ├── rules-panel.tsx            # NEW — slide-in rules panel component
│   ├── rules-panel-content.tsx    # NEW — static content for rules (Hero badges, icons, etc.)
│   ├── hero-badge.tsx             # NEW — Hero badge pill component (New/Rising/Super/Legend)
│   └── collectible-icon.tsx       # NEW — collectible icon badge component (6 icons)
├── icons/
│   └── close-icon.tsx             # NEW — X close icon (24x24, configurable color)
└── (no other files affected)

public/images/rules/
├── badge-new-hero.png             # NEW — Hero badge assets (from Figma)
├── badge-rising-hero.png
├── badge-super-hero.png
├── badge-legend-hero.png
├── icon-revival.png               # NEW — Collectible icon assets (from Figma)
├── icon-touch-of-light.png
├── icon-stay-gold.png
├── icon-flow-to-horizon.png
├── icon-beyond-the-boundary.png
└── icon-root-further.png

tests/
├── unit/
│   └── homepage/
│       └── widget-button.test.tsx     # MODIFY — extend existing tests with expanded menu + rules panel tests
├── unit/
│   └── sun-kudos/
│       ├── rules-panel.test.tsx       # NEW — Rules panel unit tests
│       ├── hero-badge.test.tsx        # NEW — Badge component unit tests
│       └── collectible-icon.test.tsx  # NEW — Collectible icon unit tests
└── e2e/
    └── fab-rules-flow.spec.ts         # NEW — E2E test for full FAB → Rules flow
```

### Modified Files

| File | Changes |
|------|---------|
| `src/app/_components/homepage/widget-button.tsx` | Add expanded menu (3 buttons), rules panel state, click-outside, focus trap, keyboard nav |
| `src/app/globals.css` | Add 3 new CSS variables: `--spacing-fab-expanded-gap: 20px`, `--color-fab-close: rgba(212, 39, 29, 1)` (alias of notification-badge), `--radius-fab-btn: 4px` |
| `tests/unit/homepage/widget-button.test.tsx` | MODIFY — extend existing 4 tests with new test cases for expanded menu, rules panel trigger, keyboard nav, ARIA roles |

### New Files

| File | Purpose |
|------|---------|
| `src/app/_components/sun-kudos/rules-panel.tsx` | Slide-in panel container with scroll + sticky footer |
| `src/app/_components/sun-kudos/rules-panel-content.tsx` | Static Vietnamese content: Hero badges, icons, Kudos Quốc Dân |
| `src/app/_components/sun-kudos/hero-badge.tsx` | Reusable Hero badge pill (4 tiers) |
| `src/app/_components/sun-kudos/collectible-icon.tsx` | Reusable collectible icon badge (6 icons) |
| `src/app/_components/icons/close-icon.tsx` | X close icon component |
| `tests/unit/sun-kudos/rules-panel.test.tsx` | Rules panel unit tests |
| `tests/unit/sun-kudos/hero-badge.test.tsx` | Hero badge unit tests |
| `tests/unit/sun-kudos/collectible-icon.test.tsx` | Collectible icon unit tests |
| `tests/e2e/fab-rules-flow.spec.ts` | E2E test for full FAB → Thể lệ flow |

### Dependencies

No new npm packages needed. All functionality can be built with React 19 + TailwindCSS 4.

---

## Implementation Strategy

### Phase 0: Asset Preparation

- Download 4 Hero badge images from Figma using `get_media_files` (component set `3007:17505`)
- Download 6 collectible icon images from Figma using `get_media_files` (component set `737:20452`)
- Save to `public/images/rules/`
- Verify asset quality and naming conventions

### Phase 1: Foundation — Icons & Shared Components

**Goal**: Create building blocks needed by both FAB and Rules Panel

1. **Create `close-icon.tsx`** — 24x24 X icon with configurable color (white for close button, inherits for "Đóng" button)
2. **Create `hero-badge.tsx`** — Component that renders a badge pill with tier name, accepts `tier: 'new' | 'rising' | 'super' | 'legend'`
3. **Create `collectible-icon.tsx`** — Component that renders a circular badge image + name label
4. **Add 3 CSS variables** to `globals.css` under the Kudos-specific section:
   ```css
   --spacing-fab-expanded-gap: 20px;  /* gap between FAB expanded menu buttons */
   --color-fab-close: rgba(212, 39, 29, 1);  /* close button red (same as --color-notification-badge) */
   --radius-fab-btn: 4px;  /* FAB expanded button border-radius */
   ```
   All other tokens already exist: `--color-accent-gold`, `--color-bg-dark`, `--color-kudos-container-dark`, `--color-btn-kudos-bg`, `--color-btn-kudos-border`, `--shadow-glow-gold`

### Phase 2: Core Feature — FAB Expanded Menu (US1 of 313:9137, all US of 313:9139)

**Goal**: Extend `WidgetButton` with expanded menu

1. **Modify `widget-button.tsx`**:
   - Keep existing collapsed button (already correct: 106x64, #FFEA9E, pill shape, golden glow)
   - Replace empty `<div role="menu">` with actual menu content:
     - Button A: "Thể lệ" (149x64, icon + label, `border-radius: 4px`)
     - Button B: "Viết KUDOS" (214x64, icon + label, `border-radius: 4px`)
     - Button C: Close (56x56, red circle, X icon)
   - Add `isRulesOpen` state for rules panel
   - Add click-outside handler (collapse on outside click)
   - Add Escape key handler (collapse on Escape)
   - Add focus trap within expanded menu
   - Add `role="menu"` / `role="menuitem"` ARIA attributes
   - Add stagger animation for button appearance

2. **Wire navigation**:
   - "Thể lệ" click → `setIsRulesOpen(true)`, `setIsMenuOpen(false)`
   - "Viết KUDOS" click → **stub behavior**: collapse menu and scroll to top of Sun Kudos page (the Viết Kudo form at Frame 520:11602 is not yet implemented). When the form is implemented, update this to open it. Add a `// TODO: navigate to Viết Kudo form when implemented` comment.
   - Close click → `setIsMenuOpen(false)`

### Phase 3: Core Feature — Rules Panel (all US of 3204:6051)

**Goal**: Build the Thể lệ slide-in panel

1. **Create `rules-panel.tsx`**:
   - Props: `isOpen: boolean`, `onClose: () => void`
   - Fixed position, right-anchored, full height (`position: fixed, right: 0, top: 0, h-screen`)
   - Width: 553px desktop, 100vw mobile, 450px tablet
   - Background: `var(--color-kudos-container-dark)` (#00070C)
   - Padding: 24px 40px 40px 40px
   - **No backdrop overlay** — page content remains visible but non-interactive (use `pointer-events-none` on body or `inert` attribute on main content)
   - Slide-in animation from right (300ms ease-out) using `transform: translateX(100%)` → `translateX(0)`
   - Slide-out animation (250ms ease-in) on close
   - Content area with `overflow-y: auto`, **scroll position resets to top on open** (useEffect with scrollTop = 0)
   - Sticky footer with "Đóng" and "Viết KUDOS" buttons (use `flex-col justify-between` pattern)
   - Focus trap (`role="dialog"`, `aria-modal="true"`, `aria-labelledby="rules-panel-title"`)
   - Escape key calls `onClose`
   - z-index: 60 (above FAB at z-50)

2. **Create `rules-panel-content.tsx`**:
   - Section 1: "Người nhận Kudos" — heading + description + 4 `<HeroBadge>` tiers
   - Section 2: "Người gửi Kudos" — heading + description + 3×2 grid of `<CollectibleIcon>`
   - Section 3: "Kudos Quốc Dân" — heading + description
   - All text hardcoded in Vietnamese from Figma design

3. **Footer buttons**:
   - "Đóng": secondary style (reuse `--color-btn-kudos-bg` + `--color-btn-kudos-border`)
   - "Viết KUDOS": primary style (reuse `--color-accent-gold`)

### Phase 4: Polish & Accessibility

1. **Animations**:
   - FAB expand: stagger buttons 50ms/100ms/150ms delay
   - Rules panel: slide from right with translateX
   - Transitions on hover states (150ms ease-in-out)
2. **Keyboard navigation**:
   - Tab between FAB menu items
   - Arrow keys for menu navigation
   - Escape to close at each level
   - Focus return to trigger on close
3. **Responsive**:
   - Mobile: FAB right-16px bottom-80px, panel full-width
   - Tablet: FAB right-16px, panel 450px
   - Desktop: as designed (right-19px, panel 553px)
4. **Edge cases**:
   - Rapid click handling (debounce or animation guard)
   - Badge image fallback (placeholder circle)

---

## Testing Strategy

### TDD Approach (Constitution: NON-NEGOTIABLE)

For each component, follow red-green-refactor:
1. Write failing test
2. Get approval that test expresses intent
3. Write minimum code to pass
4. Refactor

| Type | Focus | Coverage |
|------|-------|----------|
| Unit | `WidgetButton` expand/collapse, keyboard nav, ARIA | 80%+ |
| Unit | `RulesPanel` render, scroll, close, footer buttons | 80%+ |
| Unit | `HeroBadge` render 4 tiers correctly | 80%+ |
| Unit | `CollectibleIcon` render with image + label, fallback on error | 80%+ |
| Unit | `CloseIcon` renders with correct size and color props | 80%+ |
| Integration | FAB → Rules panel open/close flow | Key flows |
| E2E | Full user journey: click FAB → expand → click Thể lệ → scroll rules → close | Critical path |

### Key Test Scenarios

**Unit — WidgetButton:**
- Renders collapsed FAB with pen + SAA icons
- Click toggles `isMenuOpen` → renders 3 menu buttons
- "Thể lệ" click opens rules panel
- Close button collapses menu
- Escape key collapses menu
- Click outside collapses menu
- `aria-expanded` toggles correctly
- Menu has `role="menu"`, buttons have `role="menuitem"`

**Unit — RulesPanel:**
- Renders title "Thể lệ" in gold
- Renders 4 Hero badge tiers with correct thresholds
- Renders 6 collectible icons in 3×2 grid
- Renders "Kudos Quốc Dân" section
- Footer has "Đóng" and "Viết KUDOS" buttons
- "Đóng" click calls onClose
- Escape key calls onClose
- Content area is scrollable
- Has `role="dialog"` and `aria-modal="true"`

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Badge images too heavy (10 images) | Low | Medium | Lazy-load with `next/image`, use WebP format, optimize with Figma export settings |
| Focus trap conflicts with other modals | Low | Medium | Use a shared focus trap utility; ensure only one modal active at a time |
| Expanded FAB overflows on very small screens | Low | Low | Min viewport check; ensure buttons fit within 360px width |
| Existing WidgetButton tests break | Medium | Low | 4 existing tests in `tests/unit/homepage/widget-button.test.tsx` use Vitest + @testing-library/react. Test #3 checks empty menu div renders on click — must update to expect 3 menu buttons instead. Test #4 checks SVG count — may need adjustment if new icons are added. Modify tests BEFORE changing code (TDD). |

### Estimated Complexity

- **Frontend**: Medium (extending existing component + new panel with static content)
- **Backend**: None
- **Testing**: Medium (multiple interaction states, keyboard nav, focus management)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: WidgetButton ↔ RulesPanel open/close flow
- [ ] **External dependencies**: None
- [ ] **Data layer**: None
- [x] **User workflows**: FAB click → expand → Thể lệ → scroll → close

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | FAB toggle, panel open/close, focus management |
| Service ↔ Service | No | N/A |
| App ↔ External API | No | N/A |
| App ↔ Data Layer | No | N/A |
| Cross-platform | Yes | Mobile/tablet/desktop responsive behavior |

### Test Environment

- **Environment type**: Local (Vitest + @testing-library/react for unit, Playwright for E2E)
- **Test data strategy**: Static fixtures (no dynamic data)
- **Isolation approach**: Fresh render per test

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Next.js router | Mock | Needed for "Viết KUDOS" navigation link |
| Images | Mock | Badge/icon images mocked as placeholders in unit tests |

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| FAB expand/collapse interactions | 90%+ | High |
| Rules panel content rendering | 85%+ | High |
| Keyboard navigation | 80%+ | High |
| Responsive behavior | E2E only | Medium |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (3 specs reviewed and validated)
- [x] `design-style.md` complete with concrete values (no placeholders)
- [x] Codebase research completed (existing patterns identified)
- [ ] Badge/icon assets downloaded from Figma (Phase 0)

### External Dependencies

- None — fully self-contained frontend feature with static content

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following task order (Phase 0 → 1 → 2 → 3 → 4)

---

## Notes

- The existing `WidgetButton` already has the correct collapsed state implementation (position, size, colors, shadow, aria-expanded). We only need to fill in the empty menu div and add the rules panel.
- All design tokens except panel-specific ones already exist in `globals.css`. Only 2-3 new CSS variables may be needed (e.g., `--spacing-fab-expanded-gap: 20px`).
- The "Viết KUDOS" navigation target (Frame 520:11602) is not yet implemented. Both the FAB "Viết KUDOS" button and the rules panel footer "Viết KUDOS" button should be stubs that collapse the menu/panel. Add `// TODO` comments for future wiring.
- This plan covers all 3 frames as a single implementation flow since they share state and are tightly coupled.
- Symlink this plan from the other spec directories for discoverability.
