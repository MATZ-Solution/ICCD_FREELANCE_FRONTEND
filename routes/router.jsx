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
import Overview from "../src/pages/freelancer/overview";
import Description from "../src/pages/freelancer/description";
import Requirement from "../src/pages/freelancer/requirement";
import Gallery from "../src/pages/freelancer/gallery";
import Publish from "../src/pages/freelancer/publish";
import MainTemplate from "../src/templates/mainTemplate";

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
]);
