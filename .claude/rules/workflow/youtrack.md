# YouTrack Workflow Rules

## Core Principle

**All work is in YouTrack** - Issues and articles. Nothing stays in chat.

## State Progression Diagram

```
┌─────────┐   ┌─────────────┐   ┌──────────┐   ┌────────────┐   ┌─────────┐   ┌──────────────┐   ┌──────┐
│ Backlog │ → │ Ready Build │ → │ Building │ → │ Ready Test │ → │ Testing │ → │ Ready Review │ → │ Done │
└─────────┘   └─────────────┘   └──────────┘   └────────────┘   └─────────┘   └──────────────┘   └──────┘
                    ▲                               │                │
                    │                               │                │
                    └───────────────────────────────┴────────────────┘
                              Tests FAIL: Add Bug label, return with failure details
```

## State Definitions

- **Blocked** - Dependency or need clarification. Add comment explaining blocker
- **Backlog** - PO working on AC. Holding place for ideas
- **Ready Build** - Issue ready to start development
- **Building** - Developer actively working (set BEFORE starting)
- **Ready Test** - Build complete, awaiting QA validation
- **Testing** - QA actively validating (set BEFORE starting tests)
- **Ready Review** - Tests pass, awaiting final review
- **Reviewing** - PO checks tests, AC, PRs
- **Done** - All AC validated, value delivered

## State Transition Requirements (MANDATORY)

### Ready Build → Building (Developer starts work)

**Developer MUST** before writing any code:

1. **Read the issue description AND all comments** - Comments contain:
   - Previous implementation attempts and what was tried
   - Test feedback and failure details
   - Additional requirements or clarifications from the user
   - Context that may not be in the original description

2. **Set state to Building**:
```bash
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py state TBOR-XXXX Building
```

**CRITICAL**: Never start implementation based only on the issue title or description. Comments are where the real context lives.

### Building → Ready Test (Developer completes work)

**Developer MUST** add build comment with:
- Files created/modified (list each file)
- Git commit hash
- Brief summary of what was built

```bash
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py comment TBOR-XXXX "**Build Complete**\n\n**Files:**\n- path/to/file.tsx\n\n**Commit:** abc1234\n\n**Summary:** Implemented X"
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py state TBOR-XXXX "Ready Test"
```

### Ready Test → Testing (QA Agent starts validation)

```bash
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py state TBOR-XXXX Testing
```

### Testing → Ready Review (Tests PASS)

```bash
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py comment TBOR-XXXX "**QA Validation PASSED**\n\n**Tested:**\n- Scenario 1: ✓\n- Scenario 2: ✓\n\n**Evidence:** [details]"
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py state TBOR-XXXX "Ready Review"
```

### Testing → Ready Build (Tests FAIL)

```bash
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py comment TBOR-XXXX "**QA Validation FAILED**\n\n**Failed Test:** Scenario X\n**Expected:** Y\n**Actual:** Z\n\n**Recommendation:** Check the handler in path/to/file.tsx line 42"
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py tag-add TBOR-XXXX Bug
python ~/.claude/skills/youtrack-operations/scripts/youtrack_api.py state TBOR-XXXX "Ready Build"
```

### Ready Review → Done

Required evidence before marking Done:
- Build comment exists (files, commit)
- Test comment exists (what tested, results)
- All AC (Acceptance Criteria) met

**Without ALL of these, issue cannot be marked Done**

## Linking

- Issues link to related issues
- Articles link from issues
- Decisions are traceable
- Review links before work to ensure context

## Comments

Add to issue comments:
- Git Commit #
- Code Files Changed
- Brief Summaries

Comments must be BRIEF and CONCISE - facts only.

## Articles

Create articles for substance:
- Architecture/Design decisions
- Test results
- Requirements/PRD
- Implementation guides

Link back to issue: "See [Article Title] ([ARTICLE_ID])"
