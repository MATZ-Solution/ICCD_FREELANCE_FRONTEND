// src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import Login from "../src/pages/signIn/signIn";
import Dashboard from "../src/pages/dashboard";
import AuthRoute from "../utils/authRoute";
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
import Add_resume from "../src/pages/freelancer_dashboard/add_resume";
import Success from "../src/component/freelancer_dashboard/success";
import Job_experience from "../src/component/freelancer_dashboard/job_experience";
import ClientDashboard from "../src/pages/client_dashboard/dashboard";
import FreelancerDashboard from "../src/pages/freelancer_dashboard/dashboard";
import FreelancerAnalytics from "../src/pages/freelancer_dashboard/analytics";
import SignUp from "../src/pages/signUp";
import Post_job from "../src/pages/client_dashboard/post_job";

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
      <SignUp />
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
    path: "/freelancer/dashboard",
    element: (
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <FreelancerDashboard />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/analytics",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <FreelancerAnalytics />
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
  {
    path: "/freelancer/add-resume",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Add_resume />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/success",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Success />
      </MainTemplate>
      // </AuthRoute>
    ),
  },

  {
    path: "/freelancer/job-experience",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Job_experience />
      </MainTemplate>
      // </AuthRoute>
    ),
  },

  {
    path: "/client/dashboard",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ClientDashboard />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
    {
    path: "/client/post-job",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Post_job />
      </MainTemplate>
      // </AuthRoute>
    ),
  },

]);
