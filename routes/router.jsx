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
import ClientOrders from "../src/component/client_order/order";
import Gigs_details from "../src/pages/client_dashboard/gigs_details";
import MultiStepForm from "../src/pages/freelancer_profile/form1";
import ProfessionalInfoStep from "../src/pages/freelancer_profile/form2";
import AccountSecurityStep from "../src/pages/freelancer_profile/form3";
import ProjectForm from "../src/pages/client_dashboard/post_project";
import Payment from "../src/pages/payment/payment";
import PricingForm from "../src/component/gigs_pricing_scope";
import ClientHomepage from "../src/pages/clientHomepage/homePage";
import ClientProjects from "../src/pages/client_dashboard/client_projects";
import FreelancerEditProfile from "../src/pages/freelancer_profile/edit_profile";
import FreelancerProjects from "../src/pages/freelancer_dashboard/project";
import ProjectDetailClient from "../src/pages/client_dashboard/projectDetailClient";
import Check from "../src/pages/check";
import ProjectDetailFreelancer from "../src/pages/freelancer_dashboard/projectDetailFreelancer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentSuccess from "../src/pages/payment/PaymentSuccess";
import PaymentCancel from "../src/pages/payment/PaymentCancel";
import OrderOptions from "../src/component/client_order/OrderOptions";
import ClientJobs from "../src/pages/client_dashboard/client_jobs";
import WhatsAppClone from "../src/pages/messages";

const stripePromise = loadStripe("pk_test_51QCl1eCDh3RtIJ6XkYcN5vHd3KTO2f8enRSNv9Wx7Li0iCI7cr9khTDQx0vS5RmbazZoaECNW83FesOMwLeIgMLb00BJG4pPZR");

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
      // <AuthRoute>
      <Dashboard />
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer-profile",
    element: (
      // <AuthRoute>
      <FreelancerProfile />
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/overview",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Overview />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/overview/edit/:id",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Overview />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/description",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Description />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/description/edit/:id",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Description />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/requirements",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Requirement />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/gallery",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Gallery />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/gallery/edit/:id",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Gallery />
      </MainTemplate>
      // </AuthRoute>
    ),
  },

  {
    path: "/freelancer/manage-gigs/publish",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Publish />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/pricing",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Pricing />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/pricing/edit/:id",
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
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <FreelancerDashboard />
      </MainTemplate>
      // </AuthRoute>
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
    path: "/freelancer/profile-form/1",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <MultiStepForm />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/profile-form/2",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ProfessionalInfoStep />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/profile-form/3",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <AccountSecurityStep />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ManageGigsAndProjects />
      </MainTemplate>
      // </AuthRoute>
    ),
  },

  {
    path: "/freelancer/projects",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <FreelancerProjects />
      </MainTemplate>
      // </AuthRoute>
    ),
  },

  {
    path: "/freelancer/projects/:id",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ProjectDetailFreelancer />
      </MainTemplate>
      // </AuthRoute>
    ),
  },


  {
    path: "/freelancer/manage-jobs",
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
    path: "/freelancer/edit-profile",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <FreelancerEditProfile />
      </MainTemplate>
      // </AuthRoute>
    ),
  },

  {
    path: "/client",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ClientHomepage />
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
    path: "/client/profile",
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
  {
    path: "/client/post-project",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ProjectForm />
      </MainTemplate>
      // </AuthRoute>
    ),
  },

  {
    path: "/client/orders",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ClientOrders />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/client/projects",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ClientProjects />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/client/projects/:id",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ProjectDetailClient />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/client/jobs",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ClientJobs />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/client/gigs/gigs_details/:id",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Gigs_details />
      </MainTemplate>
      // </AuthRoute>
    ),
  },

  {
    path: "/payment",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Payment />
      </MainTemplate>
      // </AuthRoute>
    ),
  },

  {
    path: "/check",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Check />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/payment",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Elements stripe={stripePromise}>
          <Payment />
        </Elements>
      </MainTemplate>
      // </AuthRoute>
    ),
  },

  {
    path: "/success",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <PaymentSuccess />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/OrderOptions",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <OrderOptions />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/cancel",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <PaymentCancel />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/messages",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <WhatsAppClone />
      </MainTemplate>
      // </AuthRoute>
    ),
  }

]);
