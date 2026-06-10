---
phase: 4
title: "Job Discovery Detail And Apply UX"
status: pending
priority: P1
effort: "1-1.5d"
dependencies: [1, 3]
---

# Phase 04: Job Discovery Detail And Apply UX

## Overview
Move the seeker job browsing flow onto stable backend data contracts and make job detail pages routeable so login-return and setup-return behavior are possible.

## Requirements
- Functional: use backend pagination and filter params correctly.
- Functional: expose a routeable job detail page such as `/job/:jobId`.
- Functional: keep search, filters, loading, empty, and error states.
- Functional: after login, return users to the job detail they came from.

## Architecture
Replace the current “selected row renders detail inline” pattern with a route-driven detail page. Keep list and detail data fetching separated but share apply guard utilities.

## Related Code Files
- Modify: `src/App.tsx`
- Modify: `src/pages/jobseeker/FindJob/FindJobPage.tsx`
- Modify: `src/pages/jobseeker/FindJob/JobDetailPage.tsx`
- Modify: `src/pages/jobseeker/FindJob/hooks/useFindJobs.ts`
- Modify: `src/pages/jobseeker/FindJob/hooks/useJobDetail.ts`
- Modify: `src/components/ui/CandidateTopbar.tsx`

## Implementation Steps
1. Add real public/detail routes.
2. Convert job list API calls from `page` to backend `offset`.
3. Remove list/detail mock fallback behavior where backend already supports the use case.
4. Preserve intended return navigation for login and setup redirects.

## Success Criteria
- [ ] Job detail is reachable by URL.
- [ ] Find job page consumes backend pagination correctly.
- [ ] Apply flow from both list and detail follows the same decision tree.

## Risk Assessment
Route migration can break current in-page state assumptions. Mitigation: keep a thin compatibility layer during the transition and remove it after verification.
