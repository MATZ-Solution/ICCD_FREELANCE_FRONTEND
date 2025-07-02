// src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import Login from "../src/pages/signIn";
import Dashboard from "../src/pages/dashboard";
import AuthRoute from "../utils/authRoute";
import Signup from "../src/pages/signUp";
import Homepage from "../src/pages/homepage";
import ForgotPassword from "../src/pages/forgotPass";
import VerifyOtp from "../src/pages/otpVerification";
import ChangePassword from "../src/pages/changePass";
import ProtectedRoute from "../utils/protectRoute";
import FreelancerProfile from "../src/pages/freelancerProfile";
import Overview from "../src/pages/freelancer_gigs/overview";
import Description from "../src/pages/freelancer_gigs/description";
import Requirement from "../src/pages/freelancer_gigs/requirement";
import Gallery from "../src/pages/freelancer_gigs/gallery";
import Publish from "../src/pages/freelancer_gigs/publish";
import MainTemplate from "../src/templates/mainTemplate";
import Pricing from "../src/pages/freelancer_gigs/pricing";
import Orders from "../src/pages/freelancer_dashboard/orders";
import StartSelling from "../src/pages/freelancer_profile/guideline1";
import ManageGigsAndProjects from "../src/pages/freelancer_dashboard/gig_projects";
import Jobs from "../src/pages/freelancer_dashboard/jobs";
import ICCDProfileTipsPage from "../src/pages/freelancer_profile/guideline2";
import ICCDGuidelinesPage from "../src/pages/freelancer_profile/guideline3";

export const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Homepage />
    ,
  },
  {
    path: "/login",
    element:
      <Login />
    ,
  },
  {
    path: "/signUp",
    element:
      <Signup />
    ,
  },
  {
    path: "/forgot-password",
    element:
      <ForgotPassword />
    ,
  },
  {
    path: "/verify-otp",
    element:
      <ProtectedRoute>
        <VerifyOtp />
      </ProtectedRoute>
    ,
  },
  {
    path: "/change-password",
    element:
      <ProtectedRoute>
        <ChangePassword />
      </ProtectedRoute>
    ,
  },
  {
    path: "/dashboard",
    element: (
      <AuthRoute>
        <Dashboard />
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer-profile",
    element: (
      <AuthRoute>
        <FreelancerProfile />
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer-profile/overview",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Overview />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer-profile/description",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Description />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer-profile/requirements",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Requirement />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer-profile/gallery",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Gallery />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer-profile/publish",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Publish />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer-profile/pricing",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Pricing />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/orders",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Orders />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/start-selling/1",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <StartSelling />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/start-selling/2",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ICCDProfileTipsPage />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/start-selling/3",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ICCDGuidelinesPage />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs-projects",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ManageGigsAndProjects />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/jobs",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Jobs />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
]);
