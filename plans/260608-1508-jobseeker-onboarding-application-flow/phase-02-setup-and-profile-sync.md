---
phase: 2
title: "Setup And Profile Sync"
status: pending
priority: P1
effort: "1-1.5d"
dependencies: [1]
---

# Phase 02: Setup And Profile Sync

## Overview
Build the new seeker setup page and refactor the existing dashboard settings page so both map to the real backend seeker profile contract.

## Requirements
- Functional: create `/jobseeker/setup`.
- Functional: submit `multipart/form-data` for avatar-capable create/update requests.
- Functional: reflect backend required fields: `fullName`, `address`, `phone`.
- Functional: support optional backend fields without inventing new domain fields.
- Non-functional: validation messages must mirror backend constraints where visible.

## Architecture
Use one shared profile form model for create and edit. Split phone editing if needed, because primary phone update is not part of `UpdateJobSeekerRequest`.

## Related Code Files
- Create: `src/pages/jobseeker/setup/page.tsx`
- Create: `src/pages/jobseeker/setup/components/*`
- Create: `src/pages/jobseeker/setup/hooks/*`
- Modify: `src/pages/jobseeker/dashboard/Settings/Settings.tsx`
- Modify: `src/pages/jobseeker/dashboard/Settings/components/BasicInfoForm.tsx`
- Modify: `src/pages/jobseeker/dashboard/Settings/components/ProfileTab.tsx`
- Modify: `src/pages/jobseeker/dashboard/Settings/components/SocialLinksTab.tsx`
- Modify: `src/pages/jobseeker/dashboard/Overview/components/ProfileAlert.tsx`

## Implementation Steps
1. Define FE form values from backend DTOs, not from current mock UI labels.
2. Build create-profile submit flow with multipart payload support.
3. Load existing seeker profile into settings and split create vs edit behavior.
4. Remove or rewrite fields that do not exist in backend as first-class fields.

## Success Criteria
- [ ] Setup page can create a seeker profile successfully.
- [ ] Settings page reads and updates backend profile data accurately.
- [ ] Unsupported mock fields are removed or converted into real backend-backed fields.

## Risk Assessment
Biggest risk is keeping mock-only education/experience widgets that do not match backend storage. Mitigation: treat those as summaries or remove them from Phase 2.
