<!--
SYNC IMPACT REPORT
==================
Version change: N/A → 1.0.0 (initial ratification)
Modified principles: N/A (initial creation)
Added sections:
  - Core Principles (I–V)
  - Tech Stack & Tooling
  - Development Workflow
  - Governance
Templates checked:
  - .momorph/templates/plan-template.md ✅ aligned (Constitution Compliance Check present)
  - .momorph/templates/spec-template.md ✅ aligned (responsive breakpoints, security TR-002)
  - .momorph/templates/tasks-template.md ✅ aligned (TDD task ordering enforced)
Deferred TODOs: none
-->

# Agentic Coding Hands-on Constitution

## Core Principles

### I. Clean Code & Source Organization

All source code MUST be written to be readable, concise, and maintainable.
Every file, module, and function MUST have a single, clear responsibility.

- File and folder names MUST be lowercase kebab-case (e.g., `user-profile.tsx`).
- Components MUST be placed under `src/app/` (Next.js App Router) or `src/libs/` for shared utilities.
- Barrel exports (`index.ts`) MUST be used only when they genuinely reduce import verbosity.
- Dead code, commented-out blocks, and unused imports MUST NOT be committed.
- Functions MUST be kept short (≤ 40 lines); extract helpers when logic grows complex.
- Magic numbers and strings MUST be replaced with named constants.

**Rationale**: Consistent structure reduces cognitive load, accelerates onboarding, and makes
AI-assisted code generation more predictable.

### II. Technology Stack Best Practices

All implementation MUST follow the conventions of the approved tech stack.

**Next.js (v15, App Router)**
- MUST use React Server Components (RSC) by default; add `"use client"` only when browser APIs
  or interactivity require it.
- Data fetching MUST happen in Server Components or Route Handlers — never in `useEffect` for
  server data.
- Route segments MUST follow Next.js file-based routing conventions (`page.tsx`, `layout.tsx`,
  `loading.tsx`, `error.tsx`).
- Environment variables exposed to the client MUST be prefixed `NEXT_PUBLIC_`.

**Cloudflare Workers (via OpenNext)**
- Workers code MUST remain stateless; no Node.js-only APIs that are unavailable in the
  Cloudflare runtime.
- Secrets and bindings MUST be declared in `wrangler.jsonc` and typed via `cloudflare-env.d.ts`.
- Edge-compatible packages MUST be preferred; verify compatibility before adding dependencies.

**Supabase**
- The server-side client (`src/libs/supabase/server.ts`) MUST be used in Server Components and
  Route Handlers; the browser client (`src/libs/supabase/client.ts`) only in Client Components.
- Row-Level Security (RLS) MUST be enabled on every table that stores user data.
- SQL migrations MUST be managed through the Supabase CLI (`supabase/migrations/`).
- Supabase auth tokens MUST NOT be stored in `localStorage`; use the SSR cookie helper provided
  by `@supabase/ssr`.

**TailwindCSS (v4)**
- Styling MUST use Tailwind utility classes; custom CSS is only permitted for animations or
  browser-specific overrides that Tailwind cannot express.
- Design tokens (colors, spacing) MUST be defined in the Tailwind config, not as inline
  arbitrary values spread across components.

**Rationale**: Each tool has sharp edges when misused; following official best practices avoids
subtle bugs (hydration errors, cold-start failures, auth leaks) and keeps upgrades manageable.

### III. Test-First Development (NON-NEGOTIABLE)

Development MUST follow the TDD red-green-refactor cycle:

1. Write a failing test that captures the acceptance criteria.
2. Obtain approval that the test correctly expresses intent.
3. Write the minimum code required to make the test pass.
4. Refactor, keeping all tests green.

- No implementation code MUST be merged without a corresponding test.
- Unit tests target pure functions and isolated components.
- Integration tests cover interactions between modules, the Supabase client, and Route Handlers.
- E2E tests (Playwright) cover complete user journeys end-to-end.
- Tests MUST be co-located or placed in a `tests/` mirror structure matching `src/`.

**Rationale**: Tests written after the fact verify existing behavior; tests written first drive
design. TDD produces smaller, more composable units and catches regressions early.

### IV. Responsive Design

Every UI feature MUST be usable and visually correct across all supported breakpoints.

| Breakpoint | Range        | Tailwind prefix |
|------------|-------------|-----------------|
| Mobile     | < 768 px    | (default)       |
| Tablet     | 768–1023 px | `md:`           |
| Desktop    | ≥ 1024 px   | `lg:`           |

- Layout MUST be implemented mobile-first (base styles target mobile; breakpoint prefixes
  progressively enhance for larger screens).
- Interactive touch targets MUST be ≥ 44 × 44 px on mobile.
- Images and media MUST use responsive sizing (`next/image` with `sizes` prop or CSS
  `max-width: 100%`).
- No horizontal scrollbar MUST appear on any supported breakpoint.
- Responsive behaviour MUST be verified in browser DevTools before marking a task complete.

**Rationale**: The application serves users on diverse devices. Mobile-first ensures the
critical path works on constrained screens and is enhanced upward, never degraded downward.

### V. Security — OWASP Compliance

All code MUST adhere to OWASP Top 10 secure coding practices.

- **Input Validation**: Every user-supplied input MUST be validated and sanitised server-side
  (use `zod` or equivalent schema validation in Route Handlers).
- **Output Encoding**: Data rendered in the UI MUST be HTML-escaped; never use
  `dangerouslySetInnerHTML` unless the content is explicitly sanitised.
- **Authentication & Session Management**: Authentication MUST be handled exclusively through
  Supabase Auth with RLS enforcement; session tokens MUST be stored in HttpOnly cookies
  (managed by `@supabase/ssr`).
- **Access Control**: Every Route Handler MUST verify the caller's session before processing
  the request; missing auth MUST return `401 Unauthorized`.
- **Sensitive Data Exposure**: Secrets MUST be stored only in environment variables/Cloudflare
  secrets; MUST NOT be logged, committed, or exposed in client bundles.
- **Security Headers**: The application MUST set `Content-Security-Policy`,
  `X-Frame-Options`, `X-Content-Type-Options`, and `Strict-Transport-Security` headers.
- **Dependency Management**: Dependencies MUST be kept up to date; known vulnerabilities
  reported by `yarn audit` MUST be resolved before release.
- **SQL Injection**: All Supabase queries MUST use the typed query builder or parameterised
  RPC calls — raw SQL string interpolation is forbidden.

**Rationale**: Security flaws discovered in production are costly to remediate and damage user
trust. Shifting security left (design and code review) is far cheaper than patching after
deployment.

## Tech Stack & Tooling

| Layer            | Technology                              | Version  |
|------------------|-----------------------------------------|----------|
| Framework        | Next.js (App Router)                    | 15.x     |
| Runtime          | React                                   | 19.x     |
| Language         | TypeScript (strict mode)                | 5.x      |
| Styling          | TailwindCSS                             | 4.x      |
| Backend-as-a-Service | Supabase (PostgreSQL + Auth + Storage) | 2.x  |
| Edge Deployment  | Cloudflare Workers via OpenNext         | 1.x      |
| Package Manager  | Yarn Classic                            | 1.22.x   |
| Node.js          | v24.x                                   | LTS      |
| Linting          | ESLint (eslint-config-next)             | 9.x      |

**Approved folder structure**:

```
src/
├── app/              # Next.js App Router pages, layouts, API routes
│   └── (route)/
│       ├── page.tsx
│       ├── layout.tsx
│       └── route.ts
└── libs/             # Shared utilities and service clients
    └── supabase/
        ├── client.ts
        ├── server.ts
        └── middleware.ts

supabase/
└── migrations/       # Supabase CLI-managed SQL migrations

tests/
├── unit/
├── integration/
└── e2e/
```

New top-level `src/` directories MUST be justified against this structure before creation.

## Development Workflow

1. **Spec first**: A `spec.md` MUST exist and be approved before implementation begins.
2. **Plan second**: A `plan.md` MUST pass the Constitution Compliance Check before coding.
3. **Test before code**: Failing tests MUST be written and reviewed before implementation (TDD).
4. **Small commits**: Each commit MUST represent a single logical change; use Conventional
   Commits format (`feat:`, `fix:`, `chore:`, `docs:`, `test:`).
5. **Lint gate**: `yarn lint` MUST pass with zero errors before any PR is opened.
6. **Review**: All PRs require at least one peer review verifying constitution compliance.
7. **Deploy**: Deployment to Cloudflare Workers is performed via `yarn deploy` after all
   quality gates pass.

## Governance

This constitution supersedes all other project guidelines. When a conflict exists between this
document and a spec, plan, or comment in code, the constitution takes precedence.

**Amendment procedure**:
1. Propose the change with rationale in a PR targeting this file.
2. At least one team member MUST review and approve.
3. Bump `CONSTITUTION_VERSION` following semantic versioning (MAJOR/MINOR/PATCH rules above).
4. Update `LAST_AMENDED_DATE` to the merge date.
5. Propagate impact to dependent templates and the Sync Impact Report comment at the top.

**Compliance review**: Every PR MUST include a Constitution Compliance Check (see
`plan-template.md`). Non-compliance MUST be explicitly justified or remediated before merge.

All runtime development guidance lives in `.momorph/guidelines/`.

**Version**: 1.0.0 | **Ratified**: 2026-03-23 | **Last Amended**: 2026-03-23
