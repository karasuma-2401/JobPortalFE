# TODO - Đồng bộ hóa trạng thái Apply & Favorite qua LocalStorage

## Step 1
- [ ] Implement LocalStorage-based simulator in `src/services/jobseekerService.ts`:
  - [ ] Add keys: `job_portal_applied_jobs`, `job_portal_favorite_jobs`
  - [ ] Add helpers to read/write these arrays
  - [ ] Implement `toggleFavoriteJob(jobId)` and `getFavoriteJobIds()`
  - [ ] Update `applyJob()` to also persist applied job
  - [ ] Update `getDashboardOverview()`, `getAppliedJobs()`, `getFavoriteJobs()` to read from LocalStorage

## Step 2
- [ ] Update `src/pages/jobseeker/FindJob/hooks/useFindJobs.ts`:
  - [ ] Initialize `savedJobIds` from `JobseekerService.getFavoriteJobIds()`
  - [ ] Update `handleToggleSave` to call `JobseekerService.toggleFavoriteJob()` and then refresh `savedJobIds`

## Step 3
- [ ] TypeScript compile check:
  - [ ] Run `npm run build` (or `tsc --noEmit` if available)

## Step 4
- [ ] Manual verification:
  - [ ] Favorite: bookmark job on Find Job -> appears on Favorite Jobs
  - [ ] Favorite: unbookmark -> disappears
  - [ ] Apply: apply job -> appears on Applied Jobs + Overview Recently Applied

