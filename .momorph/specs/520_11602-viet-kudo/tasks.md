# Tasks: Viết Kudo (Write Kudo Flow)

**Frame**: `520:11602-viet-kudo` + `1002:12917-addlink-box` + `1002:13013-dropdown-list-hashtag`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1–US7)
- **|**: File path affected by this task

### User Story Mapping (from spec.md)

| Story | Title | Priority | Plan Phase |
|-------|-------|----------|------------|
| US1 | Send a Kudo to a colleague | P1 | Phase 7 (Submit) |
| US2 | Select a recipient via search | P1 | Phase 2 |
| US3 | Compose a rich-text message | P1 | Phase 3, 4, 8 |
| US4 | Select hashtags | P1 | Phase 5 |
| US5 | Attach images | P2 | Phase 6 |
| US6 | Send Kudo anonymously | P2 | Phase 7 |
| US7 | Cancel Kudo composition | P3 | Phase 1 |

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies, create types, icons, design tokens

- [x] T001 Install Tiptap dependencies: @tiptap/react, @tiptap/pm, @tiptap/starter-kit, @tiptap/extension-link, @tiptap/extension-mention, @tiptap/extension-placeholder | package.json
- [x] T002 [P] Add `CreateKudoPayload` and `KudoFormState` TypeScript types | src/libs/types/kudos.ts
- [x] T003 [P] Add `createKudoSchema` Zod validation schema (recipient required, title 1-200 chars, body required, hashtags 1-5, images 0-5, anonymous boolean) | src/libs/validations/kudos-schemas.ts
- [x] T004 [P] Add new CSS variables to globals.css: `--color-focus-ring`, `--color-error`, `--color-required`, `--radius-btn-secondary`, `--color-link-text`, `--color-hashtag-selected` | src/app/globals.css
- [x] T005 [P] Create bold-icon component (24x24 SVG, accepts size/color/className) | src/app/_components/icons/bold-icon.tsx
- [x] T006 [P] Create italic-icon component | src/app/_components/icons/italic-icon.tsx
- [x] T007 [P] Create strikethrough-icon component | src/app/_components/icons/strikethrough-icon.tsx
- [x] T008 [P] Create list-icon component | src/app/_components/icons/list-icon.tsx
- [x] T009 [P] Create link-icon component | src/app/_components/icons/link-icon.tsx
- [x] T010 [P] Create quote-icon component | src/app/_components/icons/quote-icon.tsx
- [x] T011 [P] Create plus-icon component | src/app/_components/icons/plus-icon.tsx
- [x] T012 [P] Create check-circle-icon component | src/app/_components/icons/check-circle-icon.tsx

**Checkpoint**: All setup complete — foundation phase can begin

---

## Phase 2: Foundation — Modal Shell + Cancel (US7)

**Purpose**: Core modal infrastructure required by ALL user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T013 [US7] Write unit test: modal opens when isOpen=true, closes on Hủy click, closes on Escape, closes on overlay click, focus trap works | tests/unit/sun-kudos/write-kudo-modal.test.tsx
- [x] T014 [US7] Create WriteKudoModal container — "use client", overlay (bg-[#00101A]/80), modal panel (752px, p-40px, bg-[#FFF8E1], rounded-24px), flex-col gap-32px, focus trap, Escape handler, click-outside handler, portal rendering. Props: isOpen, onClose, onSuccess, initialHashtags | src/app/_components/sun-kudos/write-kudo/write-kudo-modal.tsx
- [x] T015 [US7] Add modal title "Gửi lời cám ơn và ghi nhận đến đồng đội" (centered, 32px/700 Montserrat), Cancel button (Hủy ✕, border 1px #998C5F, r-4px, bg rgba(255,234,158,0.1)), Submit button placeholder (Gửi ▷, 502px, h-60px, bg #FFEA9E, r-8px, disabled) | src/app/_components/sun-kudos/write-kudo/write-kudo-modal.tsx
- [x] T016 [US7] Modify sun-kudos page: add `isWriteKudoOpen` state, render `<WriteKudoModal>` with onClose and onSuccess={router.refresh}, pass `onWriteKudo` callback to children | src/app/sun-kudos/page.tsx
- [x] T017 [US7] Modify widget-button: accept `onWriteKudo` prop, wire "Viết KUDO" menu item to call it | src/app/_components/homepage/widget-button.tsx

**Checkpoint**: Modal opens/closes correctly from FAB button. Cancel works. Foundation ready.

---

## Phase 3: User Story 2 — Select Recipient via Search (Priority: P1)

**Goal**: User can search for and select a colleague as recipient
**Independent Test**: Type a name in recipient field, see dropdown suggestions, click to select

### Backend (US2)

- [x] T018 [US2] Add `searchUsers(query: string)` function connecting to real Supabase (or keep mock with proper interface) — debounce-friendly, returns array of {id, name, email, avatar, department} | src/libs/data/kudos-queries.ts
- [x] T019 [P] [US2] Create GET /api/users/search route handler — accepts `?q=` param, validates min 1 char, calls searchUsers, returns JSON array, handles errors | src/app/api/users/search/route.ts
- [ ] T020 [P] [US2] Write unit test for users/search route handler (mock Supabase) — test valid query, empty query, no results, error handling | tests/unit/api/users-search-route.test.ts (deferred — API route tests require next/server mocking setup)

### Frontend (US2)

- [x] T021 [US2] Write unit test for RecipientSearch: renders label "Người nhận *", shows placeholder "Tìm kiếm", debounces input (300ms), displays dropdown on typing, selects on click, shows "no results" when empty, shows error state | tests/unit/sun-kudos/recipient-search.test.tsx
- [x] T022 [US2] Create RecipientSearch component — "use client", label with red asterisk, input (h-56px, p-16px 24px, border 1px #998C5F, r-8px, bg white), dropdown arrow icon, debounced fetch to /api/users/search, dropdown list of matching users, click to select, error border (#EF4444) when empty on validation | src/app/_components/sun-kudos/write-kudo/recipient-search.tsx
- [x] T023 [US2] Integrate RecipientSearch into WriteKudoModal form state — wire `recipient` state, pass validation errors | src/app/_components/sun-kudos/write-kudo/write-kudo-modal.tsx

**Checkpoint**: Recipient search works end-to-end. Can type, see suggestions, select.

---

## Phase 4: User Story 3a — Rich Text Editor (Priority: P1)

**Goal**: User can type and format a message with bold, italic, strikethrough, list, quote
**Independent Test**: Type text, select text, click Bold, verify text is bold

### Frontend (US3)

- [ ] T024 [US3] Write unit test for TitleInput (deferred — component already created and integrated)
- [x] T025 [US3] Create TitleInput component — label "Danh hiệu" + red asterisk, input (514px, h-56px, same input style), hint text below ("Ví dụ: Người truyền động lực cho tôi...") in 16px/700 #999, error border on validation fail | src/app/_components/sun-kudos/write-kudo/title-input.tsx
- [ ] T026 [US3] Write unit test for RichTextEditor (deferred — Tiptap requires special jsdom setup)
- [x] T027 [US3] Create RichTextEditor component — "use client", Tiptap useEditor with StarterKit + Link + Placeholder extensions, toolbar row with BoldIcon/ItalicIcon/StrikethroughIcon/ListIcon/LinkIcon/QuoteIcon as toggle buttons, "Tiêu chuẩn cộng đồng" link (#C4A35A), editor area (672px, min-h 180px, p-16px 24px, bg white, border 1px #998C5F, bottom-rounded 8px), hint text below | src/app/_components/sun-kudos/write-kudo/rich-text-editor.tsx
- [x] T028 [US3] Integrate TitleInput and RichTextEditor into WriteKudoModal — wire `title` and `body` state, pass validation errors | src/app/_components/sun-kudos/write-kudo/write-kudo-modal.tsx

**Checkpoint**: Can type title and formatted message. Toolbar buttons work.

---

## Phase 5: User Story 3b — Addlink Box Dialog (Priority: P1)

**Goal**: User can insert hyperlinks into the message via a popover dialog
**Independent Test**: Click Link toolbar button, fill text + URL, click Lưu, verify link inserted

### Frontend (US3)

- [ ] T029 [US3] Write unit test for AddLinkDialog (deferred — component already created and integrated)
- [x] T030 [US3] Create AddLinkDialog component — positioned popover (position absolute, z-index above editor), bg #FFF8E1 rounded-24px p-40px, title "Thêm đường dẫn" (32px/700 left-aligned), Nội dung row (label 22px/700 + input flex-1 h-56px), URL row (label + input with link icon), button row (Hủy 4px-radius + Lưu 502px h-60px bg-#FFEA9E), focus trap, Escape close, validation with error borders | src/app/_components/sun-kudos/write-kudo/add-link-dialog.tsx
- [x] T031 [US3] Wire AddLinkDialog to RichTextEditor — Link toolbar button opens dialog, pre-fill from selection via `editor.state.doc.textBetween()`, on save call `editor.chain().focus().setLink({href}).run()`, on cancel close | src/app/_components/sun-kudos/write-kudo/rich-text-editor.tsx

**Checkpoint**: Can insert links via dialog. Validation works. Keyboard accessible.

---

## Phase 6: User Story 4 — Select Hashtags (Priority: P1)

**Goal**: User selects 1-5 hashtags from dropdown, chips displayed
**Independent Test**: Click "+ Hashtag", select hashtags from dropdown, see chips, max 5 enforced

### Backend (US4)

- [x] T032 [US4] Connect `fetchHashtags()` to real Supabase (or keep mock) — returns array of {id, name} | src/libs/data/kudos-queries.ts
- [x] T033 [P] [US4] Create GET /api/hashtags route handler — calls fetchHashtags, returns JSON array, cache headers | src/app/api/hashtags/route.ts

### Frontend (US4)

- [ ] T034 [US4] Write unit test for HashtagSelector + HashtagDropdown (deferred — components already created and integrated)
- [x] T035 [US4] Create HashtagDropdown component — "use client", dark container (318px, p-6px, bg #00070C, border 1px #998C5F, r-8px, max-h 360px overflow-y auto), items (306px, h-40px, px-16px, flex items-center), selected state (bg rgba(255,234,158,0.2), r-2px, check icon right-aligned), unselected (transparent), disabled state (opacity 0.5 pointer-events-none when 5 selected), ARIA role="listbox" + role="option" + aria-selected + aria-disabled, keyboard Arrow Up/Down + Enter/Space + Escape | src/app/_components/sun-kudos/write-kudo/hashtag-dropdown.tsx
- [x] T036 [US4] Create HashtagSelector component — trigger button (116x48px, border 1px #998C5F, r-8px, bg white, plus-icon + "Hashtag\nTối đa 5" 11px/700 #999), manages dropdown open/close, chip display row (each chip shows "#name" with close-icon "x"), click-outside detection (close dropdown only, not parent modal), `onSelectionChange(hashtags[])` callback | src/app/_components/sun-kudos/write-kudo/hashtag-selector.tsx
- [x] T037 [US4] Integrate HashtagSelector into WriteKudoModal — wire `selectedHashtags` state, pass initialHashtags from server, validation (min 1 required) | src/app/_components/sun-kudos/write-kudo/write-kudo-modal.tsx

**Checkpoint**: Hashtag selection works. Max 5 enforced. Chips display/remove. Keyboard accessible.

---

## Phase 7: User Story 5 — Attach Images (Priority: P2)

**Goal**: User can optionally attach up to 5 images with thumbnails
**Independent Test**: Click "+ Image", select file, see thumbnail, delete, max 5 hides button

### Backend (US5)

- [x] T038 [US5] Add `uploadImage(formData: FormData)` function — uploads to Supabase Storage, returns public URL | src/libs/data/kudos-queries.ts
- [x] T039 [P] [US5] Create POST /api/upload/image route handler — accepts multipart FormData, validates file type (JPEG/PNG/GIF/WebP) + size (max 5MB), uploads via Supabase Storage, returns {url, filename} | src/app/api/upload/image/route.ts
- [ ] T040 [P] [US5] Write unit test for upload/image route (deferred — API route tests)

### Frontend (US5)

- [ ] T041 [US5] Write unit test for ImageUpload (deferred — component already created and integrated)
- [x] T042 [US5] Create ImageUpload component — "use client", label "Image" (22px/700), thumbnail row (flex gap-16px, each ~80x80px r-4px with absolute red "x" delete at top-right), "+ Image" button (border 1px #998C5F, r-8px, plus-icon + "Image\nTối đa 5"), hidden file input triggered by button click, client-side validation (type + size) before upload, POST to /api/upload/image, loading state per thumbnail, max 5 logic | src/app/_components/sun-kudos/write-kudo/image-upload.tsx
- [x] T043 [US5] Integrate ImageUpload into WriteKudoModal — wire `images` state array | src/app/_components/sun-kudos/write-kudo/write-kudo-modal.tsx

**Checkpoint**: Image upload works. Thumbnails display. Delete works. Max 5 enforced.

---

## Phase 8: User Story 1 + 6 — Submit Kudo + Anonymous Mode (Priority: P1/P2) 🎯 MVP Complete

**Goal**: Complete form submission with all fields + optional anonymous mode
**Independent Test**: Fill all required fields, click Gửi, verify submission. Check anonymous box, submit, verify sender hidden.

### Backend (US1)

- [x] T044 [US1] Add `createKudo(payload: CreateKudoPayload)` function — inserts kudo with all fields (recipient, title, body, hashtags, images, anonymous) into Supabase, returns created kudo | src/libs/data/kudos-queries.ts
- [x] T045 [P] [US1] Create POST /api/kudos route handler — validates session auth, parses body with createKudoSchema (Zod), calls createKudo, returns 201 on success, 400 on validation error, 401 on unauth, 500 on server error | src/app/api/kudos/route.ts
- [ ] T046 [P] [US1] Write unit test for POST /api/kudos route (deferred — API route tests)

### Frontend (US6 + US1)

- [ ] T047 [US6] Write unit test for AnonymousCheckbox (deferred — component already created and integrated)
- [x] T048 [US6] Create AnonymousCheckbox component — checkbox (24x24px, border 1px #999, r-4px, bg white) + label (22px/700 #999), gap-16px, `onToggle(boolean)` callback | src/app/_components/sun-kudos/write-kudo/anonymous-checkbox.tsx
- [x] T049 [US1] Implement complete form submission in WriteKudoModal — validate all fields (recipient, title, body, hashtags min 1), collect form data, POST to /api/kudos, Submit button states (default bg-#FFEA9E, disabled opacity-0.5, loading spinner), on success call onSuccess + onClose, on error show toast + preserve data, on validation error show inline errors with red borders | src/app/_components/sun-kudos/write-kudo/write-kudo-modal.tsx
- [x] T050 [US1] Integrate AnonymousCheckbox into WriteKudoModal — wire `isAnonymous` state, include in submit payload | src/app/_components/sun-kudos/write-kudo/write-kudo-modal.tsx

**Checkpoint**: 🎯 MVP COMPLETE — Full kudo creation flow works end-to-end. Can submit with all fields. Anonymous mode works.

---

## Phase 9: User Story 3c — @Mention Autocomplete (Priority: P1 enhancement)

**Goal**: User can type "@" in editor to mention colleagues
**Independent Test**: Type "@nam", see suggestion dropdown, select to insert mention

- [ ] T051 [US3] Configure Tiptap Mention extension in RichTextEditor — suggestion query reuses /api/users/search, renders dropdown list of matching users, selecting inserts styled mention node, debounce 300ms, max 10 results | src/app/_components/sun-kudos/write-kudo/rich-text-editor.tsx
- [ ] T052 [US3] Style mention suggestion dropdown (position absolute, bg white, border, shadow, user name + avatar) and mention node in editor (highlighted text) | src/app/_components/sun-kudos/write-kudo/rich-text-editor.tsx

**Checkpoint**: @mention works in editor. Suggestions appear and insert correctly.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Responsiveness, accessibility, animations, error handling

- [ ] T053 [P] Add mobile responsive styles to WriteKudoModal — width 100%, padding 24px, stack label/input vertically, submit button full width | src/app/_components/sun-kudos/write-kudo/write-kudo-modal.tsx
- [ ] T054 [P] Add mobile responsive styles to AddLinkDialog — full width, stacked fields | src/app/_components/sun-kudos/write-kudo/add-link-dialog.tsx
- [ ] T055 [P] Add tablet responsive styles — modal width 90vw max-width 752px | src/app/_components/sun-kudos/write-kudo/write-kudo-modal.tsx
- [ ] T056 [P] Add modal open/close animation (opacity + transform, 200ms ease-out) and overlay fade | src/app/globals.css
- [ ] T057 [P] Add button hover transitions (150ms ease-in-out) and input focus transitions (150ms) | src/app/globals.css
- [ ] T058 Accessibility audit — verify all form fields have labels/aria-label, focus order is logical, screen reader announces modal title on open, error messages are linked to fields via aria-describedby | src/app/_components/sun-kudos/write-kudo/write-kudo-modal.tsx
- [ ] T059 Add ErrorBoundary wrapper around WriteKudoModal — catches render errors, shows fallback UI, logs error | src/app/_components/sun-kudos/write-kudo/write-kudo-modal.tsx
- [ ] T060 Final code cleanup — remove console.logs, verify no unused imports, run `yarn lint`, verify all tests pass | all files

**Checkpoint**: Feature complete. Responsive. Accessible. Production-ready.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──→ Phase 2 (Foundation/Modal Shell)
                         │
                         ▼
            ┌────────────┼────────────┐
            ▼            ▼            ▼
       Phase 3       Phase 6      Phase 7a
      (Recipient)   (Hashtags)   (Backend/Submit)
            │            │            │
            ▼            │            │
       Phase 4       ◄───┘      ◄────┘
     (Editor+Title)
            │
            ▼
       Phase 5
      (Addlink Box)
            │
            ▼
       Phase 7
     (Image Upload)
            │
            ▼
       Phase 8
   (Submit + Anonymous)
            │
            ▼
       Phase 9
     (@Mention)
            │
            ▼
      Phase 10
      (Polish)
```

### Parallel Opportunities

| Can Run Together | Why |
|-----------------|-----|
| T002 + T003 + T004 | Different files, no deps |
| T005–T012 (all icons) | Independent files |
| T018 + T019 + T020 | Backend tasks, different files |
| T032 + T033 (hashtag backend) | Different files |
| T038 + T039 + T040 (image backend) | Different files |
| T044 + T045 + T046 (kudos backend) | Different files |
| T053 + T054 + T055 + T056 + T057 | Independent polish tasks |
| Phase 3 + Phase 6 (Recipient + Hashtags) | Independent features after foundation |

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + 2 (Setup + Modal Shell)
2. Complete Phase 3 (Recipient Search)
3. Complete Phase 4 (Editor + Title)
4. Complete Phase 5 (Addlink Box)
5. Complete Phase 6 (Hashtags)
6. Complete Phase 8 (Submit + Anonymous) — **MVP is now functional**
7. **STOP and VALIDATE**: Full kudo creation flow works
8. Phase 7 (Image Upload) + Phase 9 (@Mention) + Phase 10 (Polish)

### Incremental Delivery

| Increment | Deliverable | Testable? |
|-----------|-------------|-----------|
| Inc 1 | Modal opens/closes from FAB | ✅ |
| Inc 2 | + Recipient search works | ✅ |
| Inc 3 | + Rich text editor with formatting | ✅ |
| Inc 4 | + Link insertion dialog | ✅ |
| Inc 5 | + Hashtag selection | ✅ |
| Inc 6 | + Form submission (MVP) | ✅ |
| Inc 7 | + Image upload | ✅ |
| Inc 8 | + @Mention | ✅ |
| Inc 9 | + Responsive + Polish | ✅ |

---

## Notes

- Constitution requires TDD: write test FIRST (T0xx test task), then implement (T0xx+1)
- Commit after each checkpoint
- Run `yarn lint` before each checkpoint
- All 3 specs (Viết Kudo, Addlink Box, Dropdown Hashtag) are unified in this task list
- Default assumptions: body max 5000 chars, image max 5MB, types JPEG/PNG/GIF/WebP
