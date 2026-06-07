import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from 'react-router-dom';
import { Toaster } from 'sonner';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import EmployerSetupLayout from './layouts/EmployerSetupLayout';
import EmployerDashboardLayout from './layouts/EmployerDashboardLayout';

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
import { Navigate } from "react-router-dom";
import CandidateLayout from "./layouts/CandidateDashBoardLayout";
import SettingsPage from "./pages/jobseeker/dashboard/Settings/Settings";
import JobAlertPage from "./pages/jobseeker/dashboard/JobAlert/JobAlert";
import FindJobPage from "./pages/jobseeker/FindJob/FindJobPage";
import FavoriteJobsPage from "./pages/jobseeker/dashboard/FavoriteJob/FavoriteJobs";
import AppliedJobsPage from "./pages/jobseeker/dashboard/AppliedJob/AppliedJobs";
import OverviewPage from "./pages/jobseeker/dashboard/Overview/Overview";
import CandidateFullLayout from "./layouts/CandidateFullLayout";
const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            { path: '/job-alerts', element: <JobAlertPage /> },
            { path: '/', element: <Home /> },
        ],
    },
    {
        element: <AuthLayout />,
        children: [
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/forgot-password', element: <ForgotPassword /> },
            { path: '/verify', element: <VerifyPage /> },
        ],
    },
    {
        path: '/employer/setup',
        element: <EmployerSetupLayout />, //Phai dang nhap thi moi cho vao cai route nay
        children: [
            { index: true, element: <CompanyInfo /> },
            { path: 'company', element: <CompanyInfo /> },
            { path: 'founding', element: <FoundingInfo /> },
            { path: 'social', element: <SocialLink /> },
            { path: 'contact', element: <Contact /> },
            { path: 'success', element: <SetupSuccess /> },
        ],
    },
    {
        path: '/employer',
        element: <EmployerDashboardLayout />, //Phai dang nhap thi moi cho vao cai route nay dcm
        children: [
            { index: true, element: <Navigate to='dashboard' replace /> },
            { path: 'dashboard', element: <Overview /> },
            {
                path: 'checkout',
                element: <CheckoutPage />,
            },
            {
                path: 'my-jobs',
                children: [
                    { index: true, element: <MyJobsPage /> },
                    { path: ':id', element: <JobDetailPage /> },
                    { path: ':id/edit', element: <EditJobPage /> },
                ],
            },
            {
                path: 'post-job',
                children: [
                    { index: true, element: <PostJobPricing /> },
                    { path: 'create', element: <CreateJobForm /> },
                ],
            },
            {
                path: 'applications',
                element: <ApplicationsPage />,
            },
            { path: 'find-candidates', element: <FindCandidatesPage /> },
            {
                path: 'saved-candidates',
                element: <SavedCandidatesPage />,
            },
            {
                path: 'plans-billing',
                element: <PlansBillingPage />,
            },
            {
                path: 'settings',
                element: <EmployerSettingsPage />,
            },
            {
                path: 'profile',
                element: <EmployerProfilePage />,
            },
        ],
    },
    { path: '/reset-password', element: <ResetPassword /> },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { index: true, element: <Navigate to='dashboard' replace /> },
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'payments', element: <PaymentManagementPage /> },
            { path: 'employer-approvals', element: <EmployerApprovalPage /> },
            { path: 'employer-approvals/:id', element: <EmployerReviewPage /> },
            { path: 'users', element: <UserManagementPage /> },
            { path: 'audit-logs', element: <AuditLogPage /> },
            { path: 'industries', element: <IndustryManagementPage /> },
            { path: 'settings', element: <AdminSettingsPage /> },
        ],
    },
    {
        element: <CandidateFullLayout />,
        children: [
            { path: '/job-alerts', element: <JobAlertPage /> },
            { path: '/find-job', element: <FindJobPage /> },
        ],
    },
    {
        path: '/candidate',
        element: <CandidateLayout />,
        children: [
            { path: 'settings', element: <SettingsPage /> },
            { path: 'jobalerts', element: <JobAlertPage /> },
            { path: 'favorites', element: <FavoriteJobsPage /> },
            { path: 'applied', element: <AppliedJobsPage /> },
            { path: 'overview', element: <OverviewPage /> },
        ],
    },
]);

export default function App() {
    return (
        <>
            <Toaster position='bottom-right' richColors />
            <NotificationProvider>
                <RouterProvider router={router} />
            </NotificationProvider>
        </>
    );
}
