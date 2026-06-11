# JobPortalFE - TODO

## Admin pages: replace direct service/mocks with hooks
- [x] EmployerApprovalPage: use `useAdminEmployers` instead of `AdminService.getEmployers` + manual loading

- [ ] EmployerReviewPage: use `useAdminEmployerById` + `useAdminEmployerApprovalMutation` instead of `MOCK_DETAIL`
- [ ] AuditLogPage: use `useAdminAuditLogs` instead of `MOCK_LOGS` + client filtering
- [x] DashboardPage: use `useAdminDashboardSummary` instead of calling `AdminService` directly


- [ ] Build/typecheck the FE project to ensure no TS/import regressions

