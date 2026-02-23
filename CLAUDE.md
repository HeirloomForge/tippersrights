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
- Wrangler CLI and Supabase CLI installed
- Static website content largely built (React + Vite)
- Research reference material in `reference/`

---

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Routing**: React Router DOM 7
- **Backend**: Supabase (planned)
- **Hosting**: Cloudflare Pages
- **CLI Tools**: Wrangler, Supabase CLI

---

## Design Philosophy

- **Tone**: Rebellious, bold, polished, tongue-in-cheek. "Modern tech startup meets historical revolutionary documents."
- **Typography**: Brutalist oversized sans-serif for headlines, elegant serif for Bill of Rights text
- **Color Palette**: Deep dark backgrounds (slate/charcoal), neon/white interactive elements, emerald/electric blue for certification badges
- **Mobile-first**: 80%+ traffic expected on phones

---

## Project Structure

- `src/` - React application source
  - `components/` - Reusable UI components
  - `pages/` - Route pages
  - `data/` - Static data/content
  - `hooks/` - Custom React hooks
- `public/` - Static assets
- `reference/` - Research material (tipping culture resources)
- `email/` - Email-related assets

---

## Build & Development

```bash
npm run dev       # Start dev server
npm run build     # TypeScript check + Vite build
npm run lint      # ESLint
npm run preview   # Preview production build
```

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

## MCP Servers & Skills

### YouTrack (via Skills)

Use `youtrack-operations` skill:
```bash
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py search "project: TBOR State: {Ready Build}"
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py issue TBOR-1
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py state TBOR-1 "Ready Test"
```
