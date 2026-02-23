# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tipper's Bill of Rights (TBOR)** is a tongue-in-cheek consumer advocacy site that functionally operates as a B2B certification directory. It masquerades as a viral movement fighting "tipping fatigue" while connecting consumers with businesses that practice fair compensation.

**Domain**: tippersbillofrights.com
**Email**: dave@tippersbillofrights.com (Zoho)
**Project ID**: TBOR
**YouTrack**: https://anvil.heirloomforge.com/projects/TBOR
**Lead**: dave@heirloomforge.com

---

## Current State

- DNS and domain configured
- Custom email via Zoho (dave@tippersbillofrights.com)
- Cloudflare Pages deployment set up
- Wrangler CLI installed
- Frontend ~90% complete (10 pages, 49 components, all mock data)
- Backend not yet implemented (D1, Workers, KV pending)
- Research reference material in `reference/`

---

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Routing**: React Router DOM 7
- **Backend**: Cloudflare D1 (SQLite) + Workers (Pages Functions) + KV
- **Payments**: Stripe Checkout Sessions
- **Fulfillment**: Printful (print-on-demand)
- **Hosting**: Cloudflare Pages
- **CLI Tools**: Wrangler (deployment, D1, KV, secrets)

---

## Design Philosophy

- **Tone**: Rebellious, bold, polished, tongue-in-cheek. "Modern tech startup meets historical revolutionary documents."
- **Typography**: Brutalist oversized sans-serif for headlines, elegant serif for Bill of Rights text
- **Color Palette**: Deep dark backgrounds (slate/charcoal), neon/white interactive elements, emerald/electric blue for certification badges
- **Mobile-first**: 80%+ traffic expected on phones

---

## Project Structure

- `src/` - React application source
  - `components/` - Reusable UI components (organized by feature domain)
  - `pages/` - Route pages
  - `data/` - Static data/content (mock data that becomes curated content)
  - `hooks/` - Custom React hooks
- `functions/` - Cloudflare Pages Functions (Workers API endpoints)
  - `api/` - API routes (file-based routing)
- `migrations/` - D1 database migrations (SQL files)
- `public/` - Static assets
- `reference/` - Research material (tipping culture resources)
- `email/` - Email-related assets
- `.claude/agents/` - Custom agent team definitions

---

## Build & Development

```bash
npm run dev       # Start dev server
npm run build     # TypeScript check + Vite build
npm run lint      # ESLint
npm run preview   # Preview production build
```

---

## Deployment (MANDATORY PROCESS)

**Hosting**: Cloudflare Pages
**Project Name**: `tippersrights`
**Domains**: tippersbillofrights.com, www.tippersbillofrights.com, tippersrights.pages.dev

### Pre-Deploy Testing (MANDATORY before every deploy):

```bash
# 1. Build must pass (TypeScript + Vite)
npm run build

# 2. Smoke-test the production build locally
npm run preview
```

Then verify in the local preview (localhost:4173):
- **Homepage loads** — not a white page, no console errors
- **Navigate to every major route** — `/billofrights`, `/directory`, `/education`, `/shop`, `/hall-of-absurdity`, `/movement`
- **Check for runtime crashes** — especially from missing env vars, uninitialized services, or null references at module level
- **Mobile viewport** — resize to 344px width (Galaxy Z Fold 5), check layout

**Why this matters**: On 2026-02-23, a module-level `createClient()` call with undefined env vars crashed the entire app — white page, zero feedback. A `npm run build` pass does NOT catch runtime errors. You must verify the app actually renders.

### Deploy Steps (after testing passes):

```bash
wrangler pages deploy dist --project-name tippersrights
```

### When to Deploy:
- After committing fixes or features
- After user requests deployment
- **Never deploy without passing pre-deploy testing**

### Post-Deploy Verification:
- Check https://tippersbillofrights.com loads (hard refresh)
- Verify on mobile viewport (Galaxy Z Fold 5 width ~344px)
- Check browser console for errors

---

## Coding Constraints

- Write modular, reusable React components
- Mobile responsiveness is mandatory
- Avoid standard bootstrap-style layouts
- Push boundaries with Tailwind CSS (custom shadows, backdrop blurs, irregular borders)
- File size target: 200-500 lines per module

---

## YouTrack Development Workflow (MANDATORY)

**All work is tracked in YouTrack under project TBOR.**

```
Ready Build → Building → Ready Test → Testing → Ready Review → Done
     ▲                         │           │
     └─────────────────────────┴───────────┘
              Tests FAIL: Add Bug label, return with failure details
```

### Developer Agent Responsibilities:
1. **Before starting**: Read issue description AND all comments (comments contain test feedback, clarifications, prior attempts)
2. **Before coding**: Move issue → `Building`
3. **After completing**: Add build comment (files, commit, summary) → Move to `Ready Test`
4. **Spawn QA agent** to validate completed work

### QA Agent Responsibilities:
1. Search for issues in `Ready Test` state
2. **Before testing**: Move issue → `Testing`
3. Read issue + build comments for context
4. Build test cases from Acceptance Criteria
5. Execute tests (browser, API, database)
6. **On PASS**: Add test comment → Move to `Ready Review`
7. **On FAIL**: Add failure comment + Bug label → Move to `Ready Build`

### Commands for State Transitions:
```bash
# Developer moves to Building
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py state TBOR-XXXX Building

# Developer adds build comment and moves to Ready Test
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py comment TBOR-XXXX "**Build**\n**Files:** ...\n**Commit:** ...\n**Summary:** ..."
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py state TBOR-XXXX "Ready Test"

# QA moves to Testing
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py state TBOR-XXXX Testing

# QA on pass
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py comment TBOR-XXXX "**QA PASSED**\n**Tested:** ...\n**Evidence:** ..."
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py state TBOR-XXXX "Ready Review"

# QA on fail
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py comment TBOR-XXXX "**QA FAILED**\n**Issue:** ...\n**Recommendation:** ..."
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py tag-add TBOR-XXXX Bug
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py state TBOR-XXXX "Ready Build"
```

See `.claude/rules/workflow/youtrack.md` for complete workflow rules.

---

## Agent Team (MANDATORY for Implementation)

Custom agents are defined in `.claude/agents/`. Agent teams are enabled globally (`enableAgentTeams: true` in settings).

**When implementing features — especially via `/implement-feature` — ALWAYS create an agent team rather than writing code directly or spawning individual subagents.**

### Team Roster

| Agent | Model | Role |
|-------|-------|------|
| `tbor-lead` | Opus | Team lead / orchestrator. Reads YouTrack, creates shared tasks, coordinates teammates, tracks progress. Does NOT write code. |
| `cloudflare-backend` | Sonnet | Backend: Workers, D1, KV, wrangler, API endpoints, Stripe, Printful, rate limiting, security |
| `tbor-frontend` | Sonnet | Frontend: React components, form wiring, mock→API migration, Tailwind, Framer Motion |
| `tbor-qa` | Sonnet | QA: Build validation, API testing, security audit, mobile check, YouTrack state transitions |
| `tbor-legal` | Opus | Legal content: Privacy Policy, Terms of Service, compliance. Writes legally sound content in TBOR's satirical tone. |

### Agent Teams vs. Subagents

Agent teams are **separate Claude Code instances** that coordinate via a shared task list and direct messaging — NOT subagents running inside the main context. This means:
- Each teammate gets their own context window (no context bloat)
- Teammates communicate with each other directly (not just through the lead)
- Work is truly parallel — each agent works independently
- Shared task list enables self-coordination

### Implementation Execution Rules

1. **`/implement-feature` triggers team creation.** Create an agent team with `tbor-lead` as orchestrator and the relevant specialists as teammates.

2. **Never implement directly.** The team lead reads YouTrack issues and coordinates. Specialist teammates write the code.

3. **Team composition varies by feature:**
   - **Full-stack feature** (e.g., petition signup): lead + backend + frontend + QA
   - **Backend-only** (e.g., D1 schema setup): lead + backend + QA
   - **Frontend-only** (e.g., SEO meta tags): lead + frontend + QA
   - **QA validation**: lead + QA

4. **Shared task list drives coordination.** The lead creates tasks, teammates pick them up, mark progress, and communicate blockers through the task list.

5. **QA is mandatory.** No issue moves to Ready Review without `tbor-qa` passing validation.

### Typical `/implement-feature` Flow

```
User: /implement-feature TBOR-13

→ Create agent team:
    Lead: tbor-lead
    Teammates: cloudflare-backend, tbor-frontend, tbor-qa

→ Team lead (tbor-lead):
    1. Reads TBOR-13 issue + comments + reference articles (TBOR-A-3)
    2. Sets TBOR-13 → Building in YouTrack
    3. Creates shared tasks for teammates:
       - "Implement POST /api/petition/sign endpoint" → cloudflare-backend
       - "Wire JoinMovement form to petition API" → tbor-frontend
       - "Validate petition feature against AC" → tbor-qa (blocked until build tasks done)
    4. Teammates work in parallel on their tasks
    5. Once build tasks complete, QA teammate validates
    6. Lead commits changes, adds build comment, transitions YouTrack state

→ Result:
    QA passes → TBOR-13 → Ready Review
    QA fails → TBOR-13 → Ready Build + Bug label + failure details
```

### When to Skip Teams (Use Subagents Instead)

For small, isolated tasks that don't need inter-agent coordination:
- **Quick backend-only fix**: Spawn `cloudflare-backend` as a subagent directly
- **Quick frontend-only fix**: Spawn `tbor-frontend` as a subagent directly
- **Quick QA check**: Spawn `tbor-qa` as a subagent directly

Use teams for any work that touches both frontend and backend, or involves multiple features.

---

## Reference Articles

- **TBOR-A-2**: Ideation Hub — all product decisions, workstreams, open challenges
- **TBOR-A-3**: Technical Design — API contracts, D1 schema, deployment pipeline, rate limits
- **TBOR-A-4**: Architecture Decisions — rationale for Cloudflare over Supabase, Printful, static-first, etc.

---

## MCP Servers & Skills

### YouTrack (via Skills)

Use `youtrack-operations` skill:
```bash
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py search "project: TBOR State: {Ready Build}"
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py issue TBOR-1
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py state TBOR-1 "Ready Test"
```
