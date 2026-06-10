---
title: "Job Seeker Onboarding And Application Flow"
status: pending
createdAt: "2026-06-08"
scope: project
---

# Job Seeker Onboarding And Application Flow

## Overview
Implement the seeker onboarding, resume upload, job discovery, job detail, and apply flow against the current backend contracts. Do not start coding until the contract mismatches below are accepted or the backend is adjusted.

## Requirement Summary
- New seekers must be redirected to `/jobseeker/setup` after login when `/auth/me.hasProfile === false`.
- Setup and profile editing must use the actual backend `JobSeekerProfile` fields and validation rules.
- Resume upload must use backend APIs only.
- Apply flow must block anonymous users, non-seekers, and seekers without profiles.
- Job discovery/detail pages must consume backend pagination and response shapes instead of mock fallbacks.

## Backend Contract Findings
### Ready enough to use now
- `GET /auth/me` returns `roles` and `hasProfile`.
- `POST /job-seeker` creates seeker profile with `multipart/form-data`.
- `GET /job-seeker` and `PATCH /job-seeker` exist for seeker profile fetch/update.
- `GET /jobpost` and `GET /jobpost/{id}` exist for job listing and job detail.
- `POST /resumes/upload` and `GET /resumes/me` exist for resume upload/list.
- `POST /job-seeker/apply` exists for seeker-side apply with `{ jobId, resumeId, coverLetter }`.

### Missing or inconsistent in backend
- Resume responses do not include original file name, size, or MIME type, which makes a real resume manager UI weak.
- No dedicated resume replace endpoint exists. FE can upload a new resume and optionally delete the old one, but true replace is not modeled.
- No visible resume file-size validation is present in the provided backend code. FE cannot mirror an authoritative max-size rule yet.
- Two different job application create flows exist:
  - `/job-seeker/apply` with `ApplyJobRequest`
  - `/job-application` with `CreateJobApplicationDto`
  This is inconsistent and should be normalized or FE must intentionally choose one path.
- Saved-jobs contracts do not match current FE service names:
  - FE expects `/job-seeker/favorite-job-ids` and `/job-seeker/favorite-jobs/toggle`
  - BE exposes `/job-seeker/saved-jobs` and `/job-seeker/saved-jobs/{jobId}/toggle`
- Resume persistence likely has a bug: `ResumeService.uploadResume` stores a resolved file URL, then `mapToResponse` resolves it again.
- Resume delete does not remove the MinIO object, so storage cleanup is incomplete.
- Job seeker phone validation is inconsistent:
  - DTO accepts `0xxxxxxxxx` or `+84xxxxxxxxx`
  - service helper only accepts `0xxxxxxxxx`

### Decision for FE implementation
- Use `/auth/me.hasProfile` as the onboarding gate.
- Use `/job-seeker` create/get/update for seeker profile.
- Use `/resumes/*` for resume APIs.
- Use `/job-seeker/apply` for apply submission and avoid `/job-application` creation for now.
- Convert FE pagination from `page` to backend `offset`.
- Remove mock/local fallback paths from the new seeker flow where backend endpoints already exist.

## Phases
| Phase | Title | Goal |
|---|---|---|
| 01 | Contract Alignment And Routing | Normalize routes, auth redirects, API adapters, and payload mapping |
| 02 | Setup And Profile Sync | Build `/jobseeker/setup` and align dashboard settings with backend profile fields |
| 03 | Resume Integration And Guards | Replace mock resume UI with real upload/list/default/delete flow and enforce apply prerequisites |
| 04 | Job Discovery, Detail, And Apply UX | Use backend list/detail contracts, add routeable detail page, and complete apply decision tree |
| 05 | Verification And Performance | Remove stale mock behavior, verify edge cases, and harden rendering/data fetching |

## Blockers Before Coding
- Confirm whether FE should proceed with the current backend resume contract, or wait for backend to add filename and size fields.
- Confirm whether FE should implement “replace resume” as upload-new + delete-old, or backend will add a true replace API.
- Confirm whether backend cleanup for duplicate application APIs is deferred; current FE plan assumes `/job-seeker/apply`.

## Success Criteria
- A seeker without a profile is always redirected to `/jobseeker/setup` after login and before applying.
- Setup/profile forms match backend fields and validation rules exactly.
- Resume upload works through backend only.
- Job detail is reachable by URL, not just in-page state.
- Apply flow respects auth, role, profile existence, and resume availability.

## Unresolved Questions
- Should we display non-backend fields like “education select” and “experience select” on the profile page, or remove them entirely since the seeker profile model stores summaries instead of enums?
- Is backend going to fix resume metadata and storage cleanup now, or should FE ship with a thinner resume manager first?
