# Implementation Plan: Dropdown Ngon Ngu (Language Selector with i18n)

**Frame**: `721-4942-dropdown-ngon-ngu`
**Date**: 2026-03-31
**Spec**: `specs/721-4942-dropdown-ngon-ngu/spec.md`

---

## Summary

Implement a full i18n solution for the SAA application using `next-intl` in **non-routing mode** (no middleware, no `[locale]` folder, no URL prefixes). The locale is read from a `locale` cookie and defaults to `vi`. The existing `LanguageSelector` component is restyled to match Figma, a `GbFlagIcon` is created, and Phase 1 strings (header, footer, WidgetButton) are translated into English.

**Key architectural decision**: Use `next-intl` **without middleware or locale-based routing**. Instead, use `getRequestConfig` reading from `cookies()` to determine the locale. This avoids Cloudflare Workers middleware compatibility issues entirely.

---

## Technical Context

**Language/Framework**: TypeScript / Next.js 15 (App Router)
**Primary Dependencies**: React 19, TailwindCSS 4, Supabase, **next-intl** (NEW)
**Database**: N/A (no DB changes)
**Testing**: Vitest + @testing-library/react (unit), Playwright (E2E)
**State Management**: Cookie (`locale`) + next-intl context (automatic via `NextIntlClientProvider`)
**API Style**: N/A (client-side only — cookie read/write)

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] Follows project coding conventions — kebab-case files, single responsibility
- [x] Uses approved libraries and patterns — `next-intl` is a standard Next.js i18n library; justified below
- [x] Adheres to folder structure guidelines — `messages/` at root, `src/i18n/` for config
- [x] Meets security requirements — no user input involved, cookie is non-sensitive
- [x] Follows testing standards — TDD, unit tests before implementation

**New Library Justification:**

| Library | Version | Justification | Alternative Rejected |
|---------|---------|---------------|---------------------|
| `next-intl` | ^4.x | Industry-standard i18n for Next.js App Router. Supports Server + Client Components. Can run **without middleware** (cookie-based locale). | `react-i18next` — lacks native RSC support; `raw JSON + Context` — no ICU message format, manual boilerplate |

**Cloudflare Workers compatibility**: Using `next-intl` in **non-routing mode** avoids middleware entirely. The `getRequestConfig` function runs inside RSC (Server Components) using `cookies()` from `next/headers`, which is fully supported on Cloudflare Workers via OpenNext.

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based — update existing `LanguageSelector` in `src/app/_components/layout/`, add `GbFlagIcon` to icons
- **Styling Strategy**: Tailwind utilities with CSS variables (`var(--Details-Container-2)`, `var(--Details-Border)`) per design-style.md
- **Data Fetching**: No data fetching — locale from cookie, translations from static JSON imports
- **i18n Pattern**:
  - Server Components → `getTranslations('namespace')`
  - Client Components → `useTranslations('namespace')` (via `NextIntlClientProvider` in layout)
  - Locale resolution → `cookies().get('locale')?.value || 'vi'` in `src/i18n/request.ts`

### Integration Points

- **Existing Services**: `LanguageSelector` (update styling + flag logic), `HomepageHeader` (translate strings), `HomepageFooter` (translate strings), `WidgetButton` (translate labels), `RulesPanel` (translate labels)
- **Shared Components**: `VnFlagIcon` (existing), `ChevronDownIcon` (existing), `GbFlagIcon` (NEW)
- **Layout integration**: `NextIntlClientProvider` wraps `{children}` in `src/app/layout.tsx`

### How next-intl Works (No Middleware)

```
1. User selects "EN" → LanguageSelector sets cookie `locale=en` → router.refresh()
2. RSC re-renders → getRequestConfig reads cookie → returns locale="en" + messages/en.json
3. NextIntlClientProvider passes messages to Client Components
4. Server Components use getTranslations(), Client Components use useTranslations()
```

**File flow:**
```
next.config.ts                    ← wrap with createNextIntlPlugin()
  ↓
src/i18n/request.ts               ← getRequestConfig: read cookie, load messages/{locale}.json
  ↓
src/app/layout.tsx                 ← <NextIntlClientProvider>{children}</NextIntlClientProvider>
  ↓
Server Components                  ← const t = await getTranslations('Header')
Client Components                  ← const t = useTranslations('Header')
```

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/721-4942-dropdown-ngon-ngu/
├── spec.md              # Feature specification ✅
├── design-style.md      # Design style document ✅
├── plan.md              # This file
├── tasks.md             # Task breakdown (next step)
└── assets/
    └── frame.png        # Figma screenshot ✅
```

### Source Code (affected areas)

```text
# NEW files
messages/
├── vi.json                                    # Vietnamese translations (Phase 1: header, footer, widget)
└── en.json                                    # English translations (Phase 1: header, footer, widget)

src/
├── i18n/
│   └── request.ts                             # next-intl getRequestConfig (cookie-based locale)
└── app/
    └── _components/
        └── icons/
            └── gb-flag-icon.tsx                # NEW — UK flag SVG icon component

# MODIFIED files
next.config.ts                                 # Wrap with createNextIntlPlugin('./src/i18n/request.ts')
src/app/layout.tsx                             # Make async, add NextIntlClientProvider, dynamic <html lang={locale}>
src/app/_components/layout/language-selector.tsx  # Restyle dropdown panel + dynamic flag per option + useTranslations('Language')
src/app/_components/homepage/header.tsx         # Make async, use getTranslations('Header') for nav links + aria-labels
src/app/_components/homepage/footer.tsx         # Make async, use getTranslations('Footer'), restructure NAV_LINKS to use t()
src/app/_components/homepage/widget-button.tsx  # Add useTranslations('Widget') for 4 labels
src/app/_components/sun-kudos/rules-panel.tsx   # Add useTranslations('RulesPanel') for 3 labels

# TEST files — NEW
tests/helpers/intl-wrapper.tsx                  # NEW — shared IntlWrapper for unit tests
tests/unit/i18n-setup.test.tsx                  # NEW — verify locale resolution from cookie

# TEST files — MODIFY (add IntlWrapper)
tests/unit/language-selector.test.tsx           # Update: new styling assertions + flag logic + IntlWrapper
tests/unit/homepage/header.test.tsx             # Update: mock getTranslations for Server Component
tests/unit/homepage/widget-button.test.tsx      # Update: wrap with IntlWrapper
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next-intl` | ^4.x | i18n for Next.js App Router (Server + Client Components) |

---

## Implementation Strategy

### Phase 0: Setup — next-intl Infrastructure

**Goal**: Install `next-intl`, configure cookie-based locale resolution, wrap layout.

1. `yarn add next-intl`
2. Create `src/i18n/request.ts`:
   ```ts
   import { cookies } from 'next/headers'
   import { getRequestConfig } from 'next-intl/server'

   export default getRequestConfig(async () => {
     const store = await cookies()
     const locale = store.get('locale')?.value || 'vi'
     const validLocale = ['vi', 'en'].includes(locale) ? locale : 'vi'

     return {
       locale: validLocale,
       messages: (await import(`../../messages/${validLocale}.json`)).default,
     }
   })
   ```
3. Update `next.config.ts` — wrap with `createNextIntlPlugin()`:
   ```ts
   import createNextIntlPlugin from 'next-intl/plugin'
   const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
   export default withNextIntl(nextConfig)
   ```
4. Update `src/app/layout.tsx` — **IMPORTANT: multiple changes**:
   - Convert `RootLayout` from sync to **async** function (`export default async function RootLayout`)
   - Add `getMessages()` and `getLocale()` calls
   - Add `NextIntlClientProvider` wrapping all children
   - Change `<html lang="vi">` to **dynamic** `<html lang={locale}>` (accessibility + SEO)
   - **Nesting order**: `NextIntlClientProvider` must be the outermost provider (wraps `WriteKudoProvider` + `WidgetButton`)
   ```tsx
   import { NextIntlClientProvider } from 'next-intl'
   import { getMessages, getLocale } from 'next-intl/server'

   export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
     const locale = await getLocale()
     const messages = await getMessages()

     return (
       <html lang={locale}>
         {/* ... head ... */}
         <body className={...}>
           <NextIntlClientProvider messages={messages}>
             <WriteKudoProvider>
               {children}
               <WidgetButton />
             </WriteKudoProvider>
           </NextIntlClientProvider>
         </body>
       </html>
     )
   }
   ```
   > Note: `<noscript>` text ("Vui lòng bật JavaScript...") remains hardcoded Vietnamese — cannot use i18n in a no-JS context. Explicitly out of scope.

5. Create `messages/vi.json` and `messages/en.json` with Phase 1 keys (header, footer, widget, rules-panel).

6. **Update test setup**: All existing unit tests that render Client Components from layout (e.g., `widget-button.test.tsx`, `language-selector.test.tsx`, `header.test.tsx`) will need a `NextIntlClientProvider` wrapper with test messages. Create a shared test helper:
   ```ts
   // tests/helpers/intl-wrapper.tsx
   import { NextIntlClientProvider } from 'next-intl'
   import messages from '../../messages/vi.json'
   export function IntlWrapper({ children }: { children: React.ReactNode }) {
     return <NextIntlClientProvider locale="vi" messages={messages}>{children}</NextIntlClientProvider>
   }
   ```

**Verification**: App still builds and runs. Existing pages render normally with `vi` as default locale. All existing tests pass with updated wrapper.

### Phase 1: Core Feature — Language Switch (US1 + US2)

**Goal**: Clicking VN/EN in dropdown actually switches all Phase 1 strings.

1. **Create `GbFlagIcon`** (`src/app/_components/icons/gb-flag-icon.tsx`) — UK Union Jack SVG, same interface as `VnFlagIcon` (`size` prop, `aria-hidden`).

2. **Restyle `LanguageSelector`** to match Figma design-style.md:
   - Dropdown panel: `bg-[var(--Details-Container-2,#00070C)]`, `border border-[var(--Details-Border,#998C5F)]`, `rounded-lg`, `p-1.5`
   - Options: `w-[110px] h-14 p-4 flex items-center gap-1`
   - Selected state: `bg-[rgba(255,234,158,0.2)] rounded-sm`
   - Dynamic flag: show `VnFlagIcon` for VN option, `GbFlagIcon` for EN option
   - Trigger button: show flag icon matching current locale (not always VN)

3. **Translate header strings** (`HomepageHeader` — **Server Component**, no `'use client'`):
   - Use `await getTranslations('Header')` (async, server-side)
   - Make `HomepageHeader` an **async function** to support `await`
   - Keys: `Header.goToHomepage`, `Header.aboutSaa`, `Header.awardsInfo`, `Header.sunKudos`, `Header.notification`
   - The `NavScrollLink` child receives translated text as `children` prop (no change to NavScrollLink itself)

4. **Translate footer strings** (`HomepageFooter` — **Server Component**, no `'use client'`):
   - Use `await getTranslations('Footer')` (async, server-side)
   - Make `HomepageFooter` an **async function**
   - Restructure `NAV_LINKS` const: replace hardcoded `label` strings with translation keys, then resolve via `t()` inside the component
   - Keys: `Footer.aboutSaa`, `Footer.awardsInfo`, `Footer.sunKudos`, `Footer.standards`, `Footer.copyright`

5. **Translate WidgetButton labels** (`'use client'` — **Client Component**):
   - Use `useTranslations('Widget')` hook
   - Keys: `Widget.quickAction`, `Widget.rules`, `Widget.writeKudos`, `Widget.closeMenu`

6. **Translate RulesPanel labels** (`'use client'` — **Client Component**):
   - Use `useTranslations('RulesPanel')` hook
   - Keys: `RulesPanel.title` ("Thể lệ"), `RulesPanel.close` ("Đóng"), `RulesPanel.writeKudos` ("Viết KUDOS")
   - Note: `RulesPanelContent` (long descriptive text) is **out of Phase 1 scope** — only the 3 button/header labels are translated

**Verification**: Switch to EN → header/footer/widget/rules-panel labels change to English. Refresh → stays English. Switch to VN → returns to Vietnamese.

### Phase 2: Visual Polish — Selected State (US3)

**Goal**: Currently selected locale highlighted in dropdown.

1. Add `aria-selected` attribute to the active option.
2. Apply conditional styling: selected → `bg-[rgba(255,234,158,0.2)] rounded-sm`, default → `bg-transparent`.

### Phase 3: Accessibility — Keyboard Navigation (US4)

**Goal**: Full keyboard support for the dropdown.

1. Add `role="listbox"` to dropdown panel, `role="option"` to each item.
2. Add ArrowUp/ArrowDown navigation between options.
3. Enter/Space to select, Escape to close + return focus to trigger.
4. `aria-expanded`, `aria-haspopup="listbox"` on trigger button.

### Phase 4: Edge Cases & Polish (US5 + edge cases)

**Goal**: Default locale fallback, invalid cookie handling, concurrent dropdown prevention.

1. Invalid/missing cookie → defaults to `vi` (handled in `src/i18n/request.ts`).
2. **Concurrent dropdown prevention**: Opening language dropdown must close profile dropdown (and vice-versa). **Approach**: Both `LanguageSelector` and `ProfileDropdown` already use click-outside handlers (`mousedown` on `document`). When one dropdown opens, a click on the other's trigger fires the first's click-outside handler, naturally closing it. **Verify** this works correctly in testing — if not, add a shared `CustomEvent('dropdown-open')` that both dropdowns listen to.
3. Verify all Phase 1 strings have fallback behavior (missing key → show Vietnamese via `next-intl` default message config).

---

## Translation Files — Phase 1 Keys

### messages/vi.json
```json
{
  "Header": {
    "goToHomepage": "Về trang chủ",
    "aboutSaa": "About SAA 2025",
    "awardsInfo": "Awards Information",
    "sunKudos": "Sun* Kudos",
    "notification": "Thông báo"
  },
  "Footer": {
    "aboutSaa": "About SAA 2025",
    "awardsInfo": "Awards Information",
    "sunKudos": "Sun* Kudos",
    "standards": "Tiêu chuẩn chung",
    "copyright": "Bản quyền thuộc về Sun* © 2025"
  },
  "Widget": {
    "quickAction": "Thao tác nhanh",
    "rules": "Thể lệ",
    "writeKudos": "Viết KUDOS",
    "closeMenu": "Đóng menu"
  },
  "RulesPanel": {
    "title": "Thể lệ",
    "close": "Đóng",
    "writeKudos": "Viết KUDOS"
  },
  "Language": {
    "selectLanguage": "Chọn ngôn ngữ"
  }
}
```

### messages/en.json
```json
{
  "Header": {
    "goToHomepage": "Go to homepage",
    "aboutSaa": "About SAA 2025",
    "awardsInfo": "Awards Information",
    "sunKudos": "Sun* Kudos",
    "notification": "Notifications"
  },
  "Footer": {
    "aboutSaa": "About SAA 2025",
    "awardsInfo": "Awards Information",
    "sunKudos": "Sun* Kudos",
    "standards": "General Standards",
    "copyright": "Copyright Sun* © 2025"
  },
  "Widget": {
    "quickAction": "Quick actions",
    "rules": "Rules",
    "writeKudos": "Write KUDOS",
    "closeMenu": "Close menu"
  },
  "RulesPanel": {
    "title": "Rules",
    "close": "Close",
    "writeKudos": "Write KUDOS"
  },
  "Language": {
    "selectLanguage": "Select language"
  }
}
```

> **Note**: "About SAA 2025", "Awards Information", and "Sun* Kudos" are brand names kept identical in both locales. Only functional text is translated.

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: LanguageSelector → cookie → layout re-render → translated strings
- [x] **User workflows**: Select EN → verify header changes → refresh → verify persistence
- [ ] ~~External dependencies~~: N/A
- [ ] ~~Data layer~~: N/A

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Language switch updates all Phase 1 strings; cookie persists across refresh |
| Service ↔ Service | No | — |
| App ↔ External API | No | — |
| App ↔ Data Layer | No | — |
| Cross-platform | Yes | Mobile touch targets (56px > 44px min), dropdown positioning |

### Test Environment

- **Environment type**: Local (Vitest for unit, Playwright for E2E)
- **Test data strategy**: Mock `NextIntlClientProvider` with test messages in unit tests
- **Isolation approach**: Fresh render per test

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| next-intl | Real (with test messages) | Need to verify actual translation behavior |
| cookies() | Mock | Server-only API, mock in unit tests |
| router.refresh() | Mock | Verify it's called after locale switch |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Select EN → all Phase 1 strings switch to English
   - [x] Select VN → all Phase 1 strings switch to Vietnamese
   - [x] Cookie `locale=en` set after selecting EN
   - [x] Page refresh retains selected locale

2. **Error Handling**
   - [x] Invalid cookie value (`locale=fr`) → falls back to `vi`
   - [x] Missing cookie → defaults to `vi`

3. **Edge Cases**
   - [x] Opening language dropdown closes profile dropdown
   - [x] Keyboard navigation: ArrowDown/Up, Enter, Escape
   - [x] Selected option shows highlighted background

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| i18n config + locale resolution | 90%+ | High |
| LanguageSelector component | 85%+ | High |
| Translated string rendering | 80%+ | Medium |
| Keyboard accessibility | 75%+ | Medium |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| `next-intl` plugin incompatible with OpenNext/Cloudflare | Low | High | Using non-routing mode (no middleware). If plugin fails, fall back to manual `getRequestConfig` without plugin wrapper. Test deploy to Cloudflare early in Phase 0. |
| Dynamic imports of JSON fail on Cloudflare Workers | Low | High | Use static imports with a locale switch (`if/else`) instead of `import()` if dynamic imports fail in Workers runtime. |
| Breaking existing tests after adding NextIntlClientProvider to layout | Medium | Medium | Update test setup to wrap components in `NextIntlClientProvider` with test messages. Do this in Phase 0 before modifying any components. |
| Scope creep — translating all strings in one PR | Medium | Medium | Strict Phase 1 scope: only header, footer, WidgetButton, and language selector. All other pages translated incrementally in future PRs. |
| `HomepageHeader` is RSC — cannot use `useTranslations` hook | Medium | Low | Use `getTranslations` (async, server-side) instead. Header is already a Server Component. Only WidgetButton/LanguageSelector need `useTranslations` (they're Client Components). |

---

## Estimated Complexity

- **Frontend**: Medium (i18n setup + 5-6 component updates + new icon)
- **Backend**: None
- **Testing**: Medium (test setup needs NextIntlClientProvider wrapper)

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (reviewed status)
- [x] `design-style.md` verified
- [ ] Verify `next-intl` installs without conflicts (`yarn add next-intl`)
- [ ] Verify Cloudflare Workers deploy still works after adding next-intl plugin

### External Dependencies

- `next-intl` npm package (MIT license, actively maintained, 4k+ GitHub stars)

---

## Open Questions

- [x] ~~Which i18n library?~~ → `next-intl` in non-routing mode (cookie-based, no middleware)
- [ ] Should the login page header also have a language selector? (Currently it has `<Header>` with `<LanguageSelector>` — so it already does. But login page strings like "Đăng nhập bằng Google" are not in Phase 1 scope.)
- [ ] Are "About SAA 2025", "Awards Information", "Sun* Kudos" brand names that stay the same in English, or should they be translated? (Current assumption: keep identical)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** implementation following TDD (test-first) per constitution

---

## Notes

- The login page already has `LanguageSelector` via its `<Header>` component — language switching works there too, but login page strings are out of Phase 1 scope.
- **Server vs Client Component translation API**:
  - **RSC** (`HomepageHeader`, `HomepageFooter`): `const t = await getTranslations('Namespace')` — must be `async function`
  - **Client** (`WidgetButton`, `LanguageSelector`, `RulesPanel`): `const t = useTranslations('Namespace')` — hook, requires `NextIntlClientProvider` ancestor
- The `NextIntlClientProvider` in layout automatically passes messages to all Client Components. No need for manual message passing.
- Existing `LanguageSelector` already sets the correct cookie (`locale={code}; path=/; max-age=31536000; SameSite=Lax`) and calls `router.refresh()` — this matches exactly what `next-intl` non-routing mode needs.
- `<noscript>` text in layout ("Vui lòng bật JavaScript...") cannot be translated via i18n (no JS = no runtime). Kept as hardcoded Vietnamese — explicitly out of scope.
- `RulesPanelContent` (long descriptive text about Kudos rules) is out of Phase 1 scope — only the 3 UI labels in `RulesPanel` are translated.
- `src/app/_components/layout/header.tsx` (login page header) has no user-facing strings beyond the logo alt text — no translation changes needed.
