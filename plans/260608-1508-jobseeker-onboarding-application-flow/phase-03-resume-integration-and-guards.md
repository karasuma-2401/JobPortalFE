---
phase: 3
title: "Resume Integration And Guards"
status: pending
priority: P1
effort: "1d"
dependencies: [1, 2]
---

# Phase 03: Resume Integration And Guards

## Overview
Replace the mocked resume manager with backend-driven upload/list/default/delete behavior and wire the auth-role-profile guards that gate applying to jobs.

## Requirements
- Functional: upload resume via backend only.
- Functional: fetch seeker resumes from backend.
- Functional: set default and delete resume.
- Functional: enforce apply prerequisites for anonymous users, non-seekers, and seekers without profiles.
- Non-functional: show loading, upload, and error states clearly.

## Architecture
Resume operations should live in one service/hook layer and be reused by both settings and apply modal flows. Guard logic should be shared between list and detail apply entry points.

## Related Code Files
- Modify: `src/services/jobseekerService.ts`
- Modify: `src/pages/jobseeker/dashboard/Settings/components/ResumeManager.tsx`
- Modify: `src/pages/jobseeker/dashboard/Settings/components/AddResume.tsx`
- Modify: `src/pages/jobseeker/dashboard/Settings/components/ResumeCard.tsx`
- Modify: `src/pages/jobseeker/FindJob/components/ApplyJobModal.tsx`
- Create: `src/pages/jobseeker/shared/*`

## Implementation Steps
1. Replace local resume state with real backend fetch/mutation hooks.
2. Build upload flow using `FormData` and show pending state.
3. Decide FE workaround for “replace resume” using upload-new + optional delete-old.
4. Centralize apply precondition checks and user messaging.

## Success Criteria
- [ ] Resume list is backend-backed.
- [ ] Users can upload and delete resumes.
- [ ] Apply modal opens only when the user is eligible to continue.

## Risk Assessment
Resume metadata is thin in the backend response. Mitigation: ship a simpler file card UI first unless backend adds filename/size fields.
