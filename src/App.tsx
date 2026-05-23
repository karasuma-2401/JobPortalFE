import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import EmployerSetupLayout from "./layouts/EmployerSetupLayout";
import EmployerLayout from "./layouts/EmployerLayout";

import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import CompanyInfo from "./pages/Employer/AccountSetup/CompanyInfo";
import FoundingInfo from "./pages/Employer/AccountSetup/FoundingInfo";
import SocialLink from "./pages/Employer/AccountSetup/SocialLinks";
import Contact from "./pages/Employer/AccountSetup/Contact";
import SetupSuccess from "./pages/Employer/AccountSetup/SetupSuccess";
import { Navigate } from "react-router-dom";
import CandidateLayout from "./layouts/CandidateLayout";
import SettingsPage from "./pages/jobseeker/dashboard/Settings/Settings";
import JobAlertPage from "./pages/jobseeker/dashboard/JobAlert/JobAlert";
import FavoriteJobsPage from "./pages/jobseeker/dashboard/FavoriteJob/FavoriteJobs";
import AppliedJobsPage from "./pages/jobseeker/dashboard/AppliedJob/AppliedJobs";
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> }, 
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
      { path: "company", element: <CompanyInfo /> },
      { path: "founding", element: <FoundingInfo /> },
      { path: "social", element: <SocialLink /> },
      { path: "contact", element: <Contact /> },
      { path: "success", element: <SetupSuccess /> },
    ],
  },
  {
    element: <EmployerLayout />,
    children: [],
  },
  { path: "/verify-email", element: <VerifyEmail /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    path: "/candidate",
    element: <CandidateLayout />,
    children: [
      { path: "settings", element: <SettingsPage /> },
      { path: "jobalerts", element: <JobAlertPage /> },
      { path: "favorites", element: <FavoriteJobsPage /> },
      { path: "applied", element: <AppliedJobsPage /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to="/candidate/settings" /> }, 
      { path: "/home", element: <Home /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <RouterProvider router={router} />;
    </>
  );
}
