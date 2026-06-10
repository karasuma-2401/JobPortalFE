---
phase: 1
title: "Contract Alignment And Routing"
status: pending
priority: P1
effort: "0.5-1d"
dependencies: []
---

# Phase 01: Contract Alignment And Routing

## Overview
Align the frontend auth and API layer with the real backend contracts before changing any seeker UI. This phase prevents us from building on top of the current mock and mismatched endpoint behavior.

## Requirements
- Functional: detect seeker profile existence from `/auth/me`.
- Functional: route seekers without profiles to `/jobseeker/setup`.
- Functional: adapt FE services to `/job-seeker`, `/resumes`, `/jobpost`, and `/job-seeker/apply`.
- Non-functional: keep changes centralized in service/auth/route utilities.

## Architecture
Auth state stays sourced from `localStorage.me`, but route decisions must use `hasProfile` for seekers. The service layer becomes the adapter between backend page wrappers and seeker page components.

## Related Code Files
- Modify: `src/contexts/auth/auth-utils.ts`
- Modify: `src/hooks/useAuth.ts`
- Modify: `src/routes/ProtectedRoute.tsx`
- Modify: `src/services/jobseekerService.ts`
- Modify: `src/types/jobseeker.ts`
- Modify: `src/App.tsx`
- Create: `src/pages/jobseeker/setup/*`

## Implementation Steps
1. Change default authenticated route for seekers from the stale candidate route to setup-or-dashboard logic.
2. Add a real route for `/jobseeker/setup`.
3. Replace incorrect seeker service endpoints and normalize pagination params.
4. Decide one response-shape adapter per API instead of letting pages guess raw backend data.

## Success Criteria
- [ ] Seeker login resolves to setup when `hasProfile` is false.
- [ ] FE no longer calls nonexistent seeker/resume endpoints.
- [ ] FE uses one apply endpoint intentionally.

## Risk Assessment
Main risk is partial migration, where old pages still hit legacy mock endpoints. Mitigation: treat the service layer as the migration boundary and update all seeker consumers in later phases.
