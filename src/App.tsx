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

import CompanyInfo from "./pages/employer/AccountSetup/CompanyInfo";
import FoundingInfo from "./pages/employer/AccountSetup/FoundingInfo";
import SocialLink from "./pages/employer/AccountSetup/SocialLinks";
import Contact from "./pages/employer/AccountSetup/Contact";
import SetupSuccess from "./pages/employer/AccountSetup/SetupSuccess";

import Overview from "./pages/employer/dashboard/Overview";
import PostJobPricing from "./pages/employer/dashboard/PostJobPricing";

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
        path: "profile",
        element: (
          <div className="text-2xl font-bold">Trang Employers Profile</div>
        ),
      },
      {
        path: "post-job",
        element: <PostJobPricing />,
      },
      {
        path: "checkout",
        element: (
          <div className="text-2xl font-bold">
            Trang Checkout (Đang xây dựng)
          </div>
        ),
      },
      {
        path: "my-jobs",
        element: (
          <div className="text-2xl font-bold">Trang Quản Lý Việc Làm</div>
        ),
      },
    ],
  },
  { path: "/verify-email", element: <VerifyEmail /> },
  { path: "/reset-password", element: <ResetPassword /> },
]);

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <RouterProvider router={router} />
    </>
  );
}
