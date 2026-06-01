import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import SettingsPage from "./pages/employer/settings/SettingsPage";
import EmployerProfilePage from "./pages/employer/profile/EmployerProfilePage";
import AdminLayout from "./layouts/AdminLayout";
import PaymentManagementPage from "./pages/admin/payments/PaymentManagementPage";
import EmployerApprovalPage from "./pages/admin/employer-approvals/EmployerApprovalPage";
import EmployerReviewPage from "./pages/admin/employer-approvals/EmployerReviewPage";
import UserManagementPage from "./pages/admin/users/UserManagementPage";
import AuditLogPage from "./pages/admin/audit-logs/AuditLogPage";
import IndustryManagementPage from "./pages/admin/industry/IndustryManagementPage";
import DashboardPage from "./pages/admin/dashboard/DashboardPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: "/home", element: <Home /> }],
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
      { index: true, element: <Overview /> },
      { path: "dashboard", element: <Overview /> },
      {
        path: "post-job",
        element: <PostJobPricing />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "my-jobs",
        element: <MyJobsPage />,
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
        element: <SettingsPage />,
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
      { index: true, element: <div>Admin Dashboard</div> },
      { path: "dashboard", element: <DashboardPage/> },
      { path: "payments", element: <PaymentManagementPage /> },
      { path: "employer-approvals", element: <EmployerApprovalPage /> },
      { path: "employer-approvals/:id", element: <EmployerReviewPage /> },
      { path: "users", element: <UserManagementPage /> },
      { path: "audit-logs", element: <AuditLogPage /> },
      { path: "industries", element: <IndustryManagementPage /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <RouterProvider router={router} />
    </>
  );
}
