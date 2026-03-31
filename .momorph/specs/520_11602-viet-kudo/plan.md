# Implementation Plan: Viết Kudo (Write Kudo Flow)

**Frames**: `520:11602` (Viết Kudo) + `1002:12917` (Addlink Box) + `1002:13013` (Dropdown Hashtag)
**Date**: 2026-03-31
**Spec**: `specs/520_11602-viet-kudo/spec.md`, `specs/1002_12917-addlink-box/spec.md`, `specs/1002_13013-dropdown-list-hashtag/spec.md`

---

## Summary

Implement the Write Kudo modal — a form-based dialog allowing users to compose and send recognition messages (Kudos) to colleagues. The modal includes recipient search (autocomplete), danh hiệu (title) input, rich-text editor with formatting toolbar, hashtag multi-select dropdown, image upload (max 5), anonymous checkbox, and submit/cancel actions. This is a single unified feature implemented as one plan since the Addlink Box and Hashtag Dropdown are sub-components of the Write Kudo modal.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, Supabase, Zod
**Database**: Supabase (PostgreSQL)
**Testing**: Vitest (unit), Playwright (E2E)
**State Management**: React hooks (useState, useCallback) — no external library
**API Style**: Next.js Route Handlers (REST-like)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions (kebab-case files, single responsibility)
- [x] Uses approved libraries and patterns (TailwindCSS, Supabase, Zod)
- [x] Adheres to folder structure (`src/app/_components/`, `src/libs/`)
- [x] Meets security requirements (server-side validation, RLS, no raw SQL)
- [x] Follows testing standards (TDD red-green-refactor)
- [x] Mobile-first responsive design
- [x] `"use client"` only when browser APIs or interactivity required

**New Dependency Required:**

| Package | Justification | Alternative Rejected |
|---------|---------------|---------------------|
| `@tiptap/react` + extensions | Rich-text editor with formatting toolbar, @ mentions, link insertion. No existing rich-text library in project. | Slate.js (heavier, steeper learning curve), ContentEditable (too manual, accessibility issues) |
| `@tiptap/starter-kit` | Core editor extensions (bold, italic, strike, list, blockquote) | N/A |
| `@tiptap/extension-link` | Link insertion/editing in editor | N/A |
| `@tiptap/extension-mention` | @mention autocomplete | N/A |
| `@tiptap/extension-placeholder` | Placeholder text | N/A |

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — all Write Kudo components under `src/app/_components/sun-kudos/write-kudo/`
- **Styling Strategy**: Tailwind utilities using existing CSS variables (`--color-kudos-card-bg`, `--color-accent-gold`, `--color-btn-kudos-border`, etc.)
- **Data Fetching**: Server Components fetch initial data (hashtags); Client Components handle form state and mutations
- **Modal Pattern**: Follow existing `RulesPanel` pattern — `isOpen` + `onClose` props, focus trap, Escape key, click-outside

### Backend Approach

- **API Design**: Next.js Route Handlers at `src/app/api/`
- **Data Access**: Supabase client queries in `src/libs/data/kudos-queries.ts` (extend existing file)
- **Validation**: Zod schemas in `src/libs/validations/kudos-schemas.ts` (extend existing file)
- **Image Upload**: Server-side route handler (`POST /api/upload/image`) receives multipart form data, validates file type/size, uploads to Supabase Storage, returns public URL. Client sends FormData — avoids exposing Supabase Storage credentials to browser.

### Integration Points

- **Existing Services**: `kudos-queries.ts` (has `fetchHashtags`, `searchUsers` — currently mock data)
- **Shared Components**: Icon components (`close-icon`, `search-icon`, `sent-arrow-icon`), Toast component, Button pattern from widget-button
- **Design Tokens**: Existing CSS variables in `globals.css` — most colors already defined
- **Parent Page**: `src/app/sun-kudos/page.tsx` — needs to integrate modal trigger

---

## Project Structure

### Documentation

```text
.momorph/specs/520_11602-viet-kudo/
├── spec.md              # Feature specification (all 3 frames)
├── design-style.md      # Visual specs
├── plan.md              # This file
└── tasks.md             # Task breakdown (next step)
```

### New Files to Create

| File | Purpose |
|------|---------|
| `src/app/_components/sun-kudos/write-kudo/write-kudo-modal.tsx` | Main modal container (Client Component) |
| `src/app/_components/sun-kudos/write-kudo/recipient-search.tsx` | Autocomplete search for recipient |
| `src/app/_components/sun-kudos/write-kudo/title-input.tsx` | Danh hiệu text input with hint |
| `src/app/_components/sun-kudos/write-kudo/rich-text-editor.tsx` | Tiptap editor with toolbar |
| `src/app/_components/sun-kudos/write-kudo/add-link-dialog.tsx` | Link insertion dialog (Addlink Box) |
| `src/app/_components/sun-kudos/write-kudo/hashtag-selector.tsx` | Hashtag trigger + dropdown |
| `src/app/_components/sun-kudos/write-kudo/hashtag-dropdown.tsx` | Dropdown list with checkmarks |
| `src/app/_components/sun-kudos/write-kudo/image-upload.tsx` | Image attachment with thumbnails |
| `src/app/_components/sun-kudos/write-kudo/anonymous-checkbox.tsx` | Anonymous toggle |
| `src/app/_components/icons/bold-icon.tsx` | Toolbar icon |
| `src/app/_components/icons/italic-icon.tsx` | Toolbar icon |
| `src/app/_components/icons/strikethrough-icon.tsx` | Toolbar icon |
| `src/app/_components/icons/list-icon.tsx` | Toolbar icon |
| `src/app/_components/icons/link-icon.tsx` | Toolbar icon |
| `src/app/_components/icons/quote-icon.tsx` | Toolbar icon |
| `src/app/_components/icons/plus-icon.tsx` | Add hashtag / add image icon |
| `src/app/_components/icons/check-circle-icon.tsx` | Hashtag selected indicator |
| `src/app/api/kudos/route.ts` | POST handler for creating a kudo |
| `src/app/api/users/search/route.ts` | GET handler for user search |
| `src/app/api/upload/image/route.ts` | POST handler for image upload |
| `src/app/api/hashtags/route.ts` | GET handler for hashtag list (cache-friendly) |
| `tests/unit/sun-kudos/write-kudo-modal.test.tsx` | Unit tests for modal container |
| `tests/unit/sun-kudos/recipient-search.test.tsx` | Unit tests for search |
| `tests/unit/sun-kudos/title-input.test.tsx` | Unit tests for danh hiệu input |
| `tests/unit/sun-kudos/rich-text-editor.test.tsx` | Unit tests for editor + toolbar |
| `tests/unit/sun-kudos/hashtag-selector.test.tsx` | Unit tests for hashtag |
| `tests/unit/sun-kudos/add-link-dialog.test.tsx` | Unit tests for link dialog |
| `tests/unit/sun-kudos/image-upload.test.tsx` | Unit tests for image upload |
| `tests/unit/sun-kudos/anonymous-checkbox.test.tsx` | Unit tests for anonymous toggle |
| `tests/unit/api/kudos-route.test.ts` | Unit tests for POST /api/kudos handler |
| `tests/unit/api/users-search-route.test.ts` | Unit tests for GET /api/users/search handler |
| `tests/unit/api/upload-image-route.test.ts` | Unit tests for POST /api/upload/image handler |

### Files to Modify

| File | Changes |
|------|---------|
| `src/app/sun-kudos/page.tsx` | Add `isWriteKudoOpen` state, pass hashtags + onWriteKudo to children, render `<WriteKudoModal>` with `onSuccess={() => router.refresh()}` |
| `src/app/_components/homepage/widget-button.tsx` | Accept `onWriteKudo` prop callback, wire "Viết KUDO" menu item to call it |
| `src/libs/data/kudos-queries.ts` | Add `createKudo()`, `uploadImage()`, connect `searchUsers()` and `fetchHashtags()` to real Supabase |
| `src/libs/validations/kudos-schemas.ts` | Add `createKudoSchema` validation |
| `src/libs/types/kudos.ts` | Add `CreateKudoPayload`, `KudoFormState` types |
| `src/app/globals.css` | Add modal overlay animation, focus ring token if missing |
| `package.json` | Add tiptap dependencies |

### Dependencies to Add

| Package | Version | Purpose |
|---------|---------|---------|
| `@tiptap/react` | ^2.x | React bindings for Tiptap editor |
| `@tiptap/pm` | ^2.x | ProseMirror core (peer dep) |
| `@tiptap/starter-kit` | ^2.x | Bold, italic, strike, blockquote, list |
| `@tiptap/extension-link` | ^2.x | Link mark with href attribute |
| `@tiptap/extension-mention` | ^2.x | @mention with autocomplete |
| `@tiptap/extension-placeholder` | ^2.x | Placeholder text in empty editor |

---

## Implementation Strategy

### Phase 0: Asset Preparation & Setup
- Install Tiptap dependencies
- Download required icons from Figma using MoMorph tools
- Create icon components for toolbar (bold, italic, strikethrough, list, link, quote, plus, check-circle)
- Add any missing CSS variables to globals.css
- Add TypeScript types for kudo creation

### Phase 1: Foundation — Modal Shell + Form Skeleton (US7: Cancel)
- Create `WriteKudoModal` container with overlay, open/close, focus trap, Escape key
- Implement basic form layout matching design-style.md ASCII diagram
- Add Cancel button functionality (close modal, discard data)
- **Modal trigger pattern**: `WriteKudoModal` accepts `isOpen` + `onClose` props. Parent page holds `const [isWriteKudoOpen, setIsWriteKudoOpen] = useState(false)` and passes it down. The `WidgetButton` component calls `onWriteKudo` prop which sets this state.
- **Success callback**: `onSuccess` prop triggers `router.refresh()` on parent page to revalidate the kudo feed server component data.
- Wire up modal trigger from widget-button and sun-kudos page
- **Test**: Modal opens, closes on Hủy, closes on Escape, closes on overlay click

### Phase 2: Core Form Fields — Recipient + Title (US1 partial, US2)
- Create `RecipientSearch` with debounced search and dropdown
- Create API route `GET /api/users/search?q=` backed by Supabase
- Create `TitleInput` with hint text
- Add Zod validation schema for form
- Add inline error display for required fields
- **Test**: Type to search, select recipient, title input with validation

### Phase 3: Rich Text Editor (US3)
- Integrate Tiptap with StarterKit extensions
- Create formatting toolbar with 6 buttons (B, I, S, ≡, 🔗, ❝)
- Add "Tiêu chuẩn cộng đồng" link in toolbar
- Style editor to match design tokens
- **Test**: Type text, apply formatting, toolbar toggles work

### Phase 4: Addlink Box Dialog (US3 continued)
- Create `AddLinkDialog` as a **positioned popover** anchored below the Link toolbar button (not a separate modal overlay — to avoid double-overlay with parent modal)
- Render using `position: absolute` relative to the toolbar container; z-index above editor
- Wire Link toolbar button → open dialog
- Implement text + URL inputs with validation (Nội dung: 1-100 chars, URL: 5-2048 chars, http/https)
- Insert link into Tiptap editor via `editor.chain().focus().setLink({ href }).run()`
- Pre-fill "Nội dung" from editor's current text selection
- Focus trap: Tab cycles through Nội dung → URL → Hủy → Lưu
- Escape to close without saving
- Auto-focus "Nội dung" input on open
- **Test**: Insert link, validation errors, pre-fill from selection, keyboard nav, Escape

### Phase 5: Hashtag Selector + Dropdown (US4)
- Create `HashtagSelector` trigger button + chip display
- Create `HashtagDropdown` with dark theme (#00070C bg), checkmarks, max-height 360px with overflow scroll
- Create API route `GET /api/hashtags` backed by Supabase; server-side page pre-fetches and passes as props for initial load
- Implement max 5 limit: unselected items get `opacity: 0.5; pointer-events: none` when 5 reached
- Sync selected hashtags with parent form state via `onSelectionChange(hashtags[])` callback
- Chip display: each chip shows hashtag name with "x" button to remove
- ARIA: `role="listbox"` on container, `role="option"` + `aria-selected` on items, `aria-disabled` when max
- Keyboard: Arrow Up/Down to navigate, Enter/Space to toggle, Escape to close
- Click-outside closes dropdown (not parent modal)
- **Test**: Open dropdown, select/deselect, max 5, chips appear/remove, keyboard nav, click-outside

### Phase 6: Image Upload (US5)
- Create `ImageUpload` component with thumbnails
- Create API route `POST /api/upload/image` for Supabase Storage
- File picker, thumbnail preview, delete button
- Max 5 limit (hide button when full)
- Client-side validation (file type, size)
- **Test**: Upload image, preview, delete, max 5, invalid file type

### Phase 7: Anonymous + Submit (US1 complete, US6)
- Create `AnonymousCheckbox` component
- Implement form submission logic with all fields
- Create API route `POST /api/kudos` with Zod server-side validation
- Submit button: disabled state, loading spinner
- Success: close modal, refresh parent kudo list
- Error: toast notification, preserve form data
- **Test**: Submit with all fields, validation errors, anonymous mode, API error handling

### Phase 8: @ Mention Autocomplete (US3 enhancement)
- Configure Tiptap Mention extension
- Reuse `searchUsers` API for suggestions
- Style mention dropdown
- **Test**: Type @, suggestions appear, select inserts mention

### Phase 9: Polish & Responsiveness
- Mobile responsive layout (stack labels above inputs)
- Tablet/desktop width adjustments
- Accessibility audit (screen reader, keyboard-only flow)
- Animation/transition polish (modal open/close, button hover)
- Error boundary around modal
- **Test**: Full flow on mobile viewport, accessibility checks

---

## Testing Strategy

| Type | Focus | Coverage |
|------|-------|----------|
| Unit | Individual components (RecipientSearch, HashtagDropdown, AddLinkDialog, ImageUpload, AnonymousCheckbox) | 80%+ |
| Unit | Form validation (Zod schemas) | 100% |
| Unit | API route handlers (mock Supabase) | 90% |
| Integration | Full modal form flow (fill all fields → submit) | Key flows |
| E2E | Happy path: open modal → fill fields → submit → verify | Critical path |
| E2E | Error path: submit empty → see errors → fix → submit | Error handling |

### Test-First Approach (per Constitution)

Each phase follows TDD:
1. Write failing test for acceptance scenario
2. Implement minimum code to pass
3. Refactor, keeping tests green

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Tiptap bundle size too large | Medium | Medium | Use tree-shakeable imports; lazy-load editor component |
| Tiptap incompatible with RSC | Low | High | Editor is always a Client Component (`"use client"`); parent can be Server Component |
| Image upload Supabase Storage not configured | Medium | Medium | Use local file upload fallback; document Storage setup in prerequisites |
| @mention performance with many users | Low | Medium | Debounce search (300ms), limit results to 10, server-side filtering |
| Modal z-index conflicts with FAB/header | Low | Low | Use portal rendering (`createPortal`) with explicit z-index layers |

### Estimated Complexity

- **Frontend**: **High** — Rich text editor integration, multiple sub-components, accessibility
- **Backend**: **Low** — Simple CRUD API routes with Supabase
- **Testing**: **Medium** — Tiptap editor testing requires specific setup

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: Modal ↔ RecipientSearch ↔ RichTextEditor ↔ HashtagSelector ↔ ImageUpload
- [x] **External dependencies**: Supabase API (users, hashtags, kudos, storage)
- [x] **Data layer**: Kudo creation, image storage
- [x] **User workflows**: Complete kudo composition flow

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Form validation → error display, Submit → API call → close modal |
| App ↔ External API | Yes | User search, hashtag fetch, kudo create, image upload |
| App ↔ Data Layer | Yes | Supabase insert kudo, upload to Storage |

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase client | Mock | Constitution says unit tests must be isolated; real DB in integration |
| File picker | Mock | Browser API, not testable in unit |
| Tiptap editor | Real (in jsdom) | Need to verify actual formatting behavior |

---

## Design Token Mapping

### Existing Tokens (reuse)

| Design Spec | CSS Variable | Already Exists? |
|------------|-------------|-----------------|
| Modal bg #FFF8E1 | `--color-kudos-card-bg` | ✅ Yes |
| Overlay #00101A/80% | `--color-bg-dark` | ✅ Yes (need opacity variant) |
| Border #998C5F | `--color-btn-kudos-border` | ✅ Yes |
| Submit bg #FFEA9E | `--color-accent-gold` | ✅ Yes |
| Cancel bg 10% | `--color-btn-kudos-bg` | ✅ Yes |
| Placeholder #999 | `--color-kudos-text-secondary` | ✅ Yes |
| Modal radius 24px | `--radius-kudos-card` | ✅ Yes |
| Input radius 8px | `--radius-kudos-btn-gift` | ✅ Yes |
| Dropdown bg #00070C | `--color-kudos-container-dark` | ✅ Yes |
| Font Montserrat | `--font-montserrat` | ✅ Yes |

### New Tokens Needed

| Token | Value | Purpose |
|-------|-------|---------|
| `--color-focus-ring` | #FFEA9E | Input focus border color |
| `--color-error` | #EF4444 | Validation error border/text |
| `--color-required` | #FF0000 | Required asterisk |
| `--radius-btn-secondary` | 4px | Cancel button border-radius |
| `--color-link-text` | #C4A35A | Community standards link |
| `--color-hashtag-selected` | rgba(255, 234, 158, 0.20) | Hashtag selected bg |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (3 specs reviewed)
- [x] Codebase research completed
- [ ] Supabase Storage bucket configured for image uploads
- [ ] Supabase tables: `kudos`, `users`, `hashtags` must exist with RLS policies

### External Dependencies

- Supabase project with Storage enabled
- Google Fonts: Montserrat (already loaded)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown from this plan
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following phase order (TDD)

---

## Notes

- The 3 specs (Viết Kudo, Addlink Box, Dropdown Hashtag) are implemented as one unified feature since Addlink Box and Hashtag Dropdown are sub-components of the Write Kudo modal.
- All existing Supabase queries in `kudos-queries.ts` currently use mock data — they need to be connected to real tables as part of this work or in a parallel backend setup task.
- The Tiptap dependency is the only significant new addition; everything else leverages existing patterns and libraries.
- Open questions from spec review (message body max length, image file size limit) should be resolved before Phase 7 (Submit). **Default assumptions used**: 5000 chars for body, 5MB per image, accepted types: JPEG/PNG/GIF/WebP.
- The `/api/campaigns/active` endpoint from the spec API table is **deferred** — campaign context is not required for MVP kudo creation. Can be added later when campaign-specific kudo flows are implemented.
- The Addlink Box is rendered as a **popover** (not a separate modal) to avoid double-overlay UX issues. It uses `position: absolute` anchored to the toolbar.
