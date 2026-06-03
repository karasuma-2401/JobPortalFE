import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import EmployerSetupLayout from "./layouts/EmployerSetupLayout";
import EmployerDashboardLayout from "./layouts/EmployerDashboardLayout";

import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import CompanyInfo from "./pages/employer/account-setup/CompanyInfo";
import FoundingInfo from "./pages/employer/account-setup/FoundingInfo";
import SocialLink from "./pages/employer/account-setup/SocialLinks";
import Contact from "./pages/employer/account-setup/Contact";
import SetupSuccess from "./pages/employer/account-setup/SetupSuccess";

import Overview from "./pages/employer/dashboard/Overview";
import PostJobPricing from "./pages/employer/post-job/PostJobPricing";
import CheckoutPage from "./pages/employer/post-job/Checkout";
import CreateJobForm from "./pages/employer/post-job/CreateJobForm";
import MyJobsPage from "./pages/employer/my-jobs/MyJobsPage";
import ApplicationsPage from "./pages/employer/applications/ApplicationsPage";
import SavedCandidatesPage from "./pages/employer/saved-candidates/SavedCandidatesPage";
import PlansBillingPage from "./pages/employer/plans-billing/PlansBillingPage";
import EmployerSettingsPage from "./pages/employer/settings/SettingsPage";
import EmployerProfilePage from "./pages/employer/profile/EmployerProfilePage";

import AdminLayout from "./layouts/AdminLayout";
import PaymentManagementPage from "./pages/admin/payments/PaymentManagementPage";
import EmployerApprovalPage from "./pages/admin/employer-approvals/EmployerApprovalPage";
import EmployerReviewPage from "./pages/admin/employer-approvals/EmployerReviewPage";
import UserManagementPage from "./pages/admin/users/UserManagementPage";
import AuditLogPage from "./pages/admin/audit-logs/AuditLogPage";
import IndustryManagementPage from "./pages/admin/industry/IndustryManagementPage";
import DashboardPage from "./pages/admin/dashboard/DashboardPage";
import AdminProfilePage from "./pages/admin/profile/AdminProfilePage";
import AdminSettingsPage from "./pages/admin/settings/AdminSettingsPage";
import { NotificationProvider } from "./contexts/NotificationProvider";

import CandidateLayout from "./layouts/CandidateDashBoardLayout";
import SettingsPage from "./pages/jobseeker/dashboard/Settings/Settings";
import JobAlertPage from "./pages/jobseeker/dashboard/JobAlert/JobAlert";
import FindJobPage from "./pages/jobseeker/FindJob/FindJobPage";
import FavoriteJobsPage from "./pages/jobseeker/dashboard/FavoriteJob/FavoriteJobs";
import AppliedJobsPage from "./pages/jobseeker/dashboard/AppliedJob/AppliedJobs";
import OverviewPage from "./pages/jobseeker/dashboard/Overview/Overview";
import CandidateFullLayout from "./layouts/CandidateFullLayout";
import JobDetailPage from "./pages/employer/my-jobs/JobDetailPage";
import EditJobPage from "./pages/employer/my-jobs/components/EditJobPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to="/candidate/settings" /> },
      { path: "/job-alerts", element: <JobAlertPage /> },
      { path: "/home", element: <Home /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
    ],
  },
  {
    path: "/employer/setup",
    element: <EmployerSetupLayout />,
    children: [
      { index: true, element: <CompanyInfo /> },
      { path: "company", element: <CompanyInfo /> },
      { path: "founding", element: <FoundingInfo /> },
      { path: "social", element: <SocialLink /> },
      { path: "contact", element: <Contact /> },
      { path: "success", element: <SetupSuccess /> },
    ],
  },
  {
    path: "/employer",
    element: <EmployerDashboardLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Overview /> },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "my-jobs",
        children: [
          { index: true, element: <MyJobsPage /> },
          { path: ":id", element: <JobDetailPage /> },
          { path: ":id/edit", element: <EditJobPage /> },
        ],
      },
      {
        path: "post-job",
        children: [
          { index: true, element: <PostJobPricing /> },
          { path: "create", element: <CreateJobForm /> },
        ],
      },
      {
        path: "applications",
        element: <ApplicationsPage />,
      },
      {
        path: "saved-candidates",
        element: <SavedCandidatesPage />,
      },
      {
        path: "plans-billing",
        element: <PlansBillingPage />,
      },
      {
        path: "settings",
        element: <EmployerSettingsPage />,
      },
      {
        path: "profile",
        element: <EmployerProfilePage />,
      },
    ],
  },
  { path: "/verify-email", element: <VerifyEmail /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "payments", element: <PaymentManagementPage /> },
      { path: "employer-approvals", element: <EmployerApprovalPage /> },
      { path: "employer-approvals/:id", element: <EmployerReviewPage /> },
      { path: "users", element: <UserManagementPage /> },
      { path: "audit-logs", element: <AuditLogPage /> },
      { path: "industries", element: <IndustryManagementPage /> },
      { path: "profile", element: <AdminProfilePage /> },
      { path: "settings", element: <AdminSettingsPage /> },
    ],
  },
  {
    element: <CandidateFullLayout />,
    children: [
      { path: "/job-alerts", element: <JobAlertPage /> },
      { path: "/find-job", element: <FindJobPage /> },
    ],
  },
  {
    path: "/candidate",
    element: <CandidateLayout />,
    children: [
      { path: "settings", element: <SettingsPage /> },
      { path: "jobalerts", element: <JobAlertPage /> },
      { path: "favorites", element: <FavoriteJobsPage /> },
      { path: "applied", element: <AppliedJobsPage /> },
      { path: "overview", element: <OverviewPage /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </>
  );
}
