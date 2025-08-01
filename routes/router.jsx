// src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import React, { lazy } from 'react';

const Login = lazy(() => import("../src/pages/signIn/signIn"));
const Dashboard = lazy(() => import("../src/pages/dashboard"));
const Homepage = lazy(() => import("../src/pages/homepage"));
const ForgotPassword = lazy(() => import("../src/pages/forgotPass"));
const VerifyOtp = lazy(() => import("../src/pages/otpVerification"));
const ChangePassword = lazy(() => import("../src/pages/changePass"));
const FreelancerProfile = lazy(() => import("../src/pages/freelancerProfile"));
const Overview = lazy(() => import("../src/pages/freelancer_gigs/overview"));
const Description = lazy(() => import("../src/pages/freelancer_gigs/description"));
const Requirement = lazy(() => import("../src/pages/freelancer_gigs/requirement"));
const Gallery = lazy(() => import("../src/pages/freelancer_gigs/gallery"));
const Publish = lazy(() => import("../src/pages/freelancer_gigs/publish"));
const Pricing = lazy(() => import("../src/pages/freelancer_gigs/pricing"));
const Orders = lazy(() => import("../src/pages/freelancer_dashboard/orders"));
const StartSelling = lazy(() => import("../src/pages/freelancer_profile/guideline1"));
const ManageGigsAndProjects = lazy(() => import("../src/pages/freelancer_dashboard/gig_projects"));
const Jobs = lazy(() => import("../src/pages/freelancer_dashboard/jobs"));
const ICCDProfileTipsPage = lazy(() => import("../src/pages/freelancer_profile/guideline2"));
const ICCDGuidelinesPage = lazy(() => import("../src/pages/freelancer_profile/guideline3"));
const Add_resume = lazy(() => import("../src/pages/freelancer_dashboard/add_resume"));
const Success = lazy(() => import("../src/component/freelancer_dashboard/success"));
const Job_experience = lazy(() => import("../src/component/freelancer_dashboard/job_experience"));
const ClientDashboard = lazy(() => import("../src/pages/client_dashboard/dashboard"));
const FreelancerDashboard = lazy(() => import("../src/pages/freelancer_dashboard/dashboard"));
const FreelancerAnalytics = lazy(() => import("../src/pages/freelancer_dashboard/analytics"));
const SignUp = lazy(() => import("../src/pages/signUp"));
const Post_job = lazy(() => import("../src/pages/client_dashboard/post_job"));
const ClientOrders = lazy(() => import("../src/component/client_order/order"));
const Gigs_details = lazy(() => import("../src/pages/client_dashboard/gigs_details"));
const MultiStepForm = lazy(() => import("../src/pages/freelancer_profile/form1"));
const ProfessionalInfoStep = lazy(() => import("../src/pages/freelancer_profile/form2"));
const AccountSecurityStep = lazy(() => import("../src/pages/freelancer_profile/form3"));
const ProjectForm = lazy(() => import("../src/pages/client_dashboard/post_project"));
const Payment = lazy(() => import("../src/pages/payment/payment"));
const PricingForm = lazy(() => import("../src/component/gigs_pricing_scope"));
const ClientHomepage = lazy(() => import("../src/pages/clientHomepage/homePage"));
const ClientProjects = lazy(() => import("../src/pages/client_dashboard/client_projects"));
const FreelancerEditProfile = lazy(() => import("../src/pages/freelancer_profile/edit_profile"));
const FreelancerProjects = lazy(() => import("../src/pages/freelancer_dashboard/project"));
const ProjectDetailClient = lazy(() => import("../src/pages/client_dashboard/projectDetailClient"));
const Check = lazy(() => import("../src/pages/check"));
const ProjectDetailFreelancer = lazy(() => import("../src/pages/freelancer_dashboard/projectDetailFreelancer"));
const PaymentSuccess = lazy(() => import("../src/pages/payment/PaymentSuccess"));
const PaymentCancel = lazy(() => import("../src/pages/payment/PaymentCancel"));
const OrderOptions = lazy(() => import("../src/component/client_order/OrderOptions"));
const ClientJobs = lazy(() => import("../src/pages/client_dashboard/client_jobs"));
const WhatsAppClone = lazy(() => import("../src/pages/messages"));
const JobDetailPage = lazy(() => import("../src/pages/client_dashboard/JobDetail"));
const SuperAdminDashboard = lazy(() => import("../src/pages/superadmin_dashboard/dashboard"));
const ManageUsers = lazy(() => import("../src/pages/superadmin_dashboard/manage_dispute"));
const ManageDispute = lazy(() => import("../src/pages/superadmin_dashboard/manage_dispute"));
const ReviewPage = lazy(() => import("../src/pages/superadmin_dashboard/review-page"));
const ContactPage = lazy(() => import("../src/pages/contactpage"));
const AboutUsPage = lazy(() => import("../src/pages/aboutuspage"));
const LoginController = lazy(() => import("../src/component/loginController"));
import { loadStripe } from '@stripe/stripe-js';
import ICCDLoader from "../src/component/loader";
import MainTemplate from '../src/templates/mainTemplate';
import { Elements } from '@stripe/react-stripe-js';
import SuperAdminAllOrders from '../src/component/super_admin/AdminAllOrders';

// pull code
import EditGallery from "../src/pages/freelancer_gigs/editGallery";
import IsFreelancerProfile from "../src/templates/IsfreelancerProfile";
import OrderDetailPage from "../src/pages/freelancer_dashboard/OrderDetailPage";



const stripePromise = loadStripe("pk_test_51QCl1eCDh3RtIJ6XkYcN5vHd3KTO2f8enRSNv9Wx7Li0iCI7cr9khTDQx0vS5RmbazZoaECNW83FesOMwLeIgMLb00BJG4pPZR");

export const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Homepage />
    ,
  },
  {
    path: "/loader",
    element:
      <ICCDLoader />
    ,
  },

  {
    path: "/contactus",
    element:

      <MainTemplate isShowFooter={true}>
        <ContactPage />
      </MainTemplate>
    ,
  },
  {
    path: "/aboutus",
    element:
      <MainTemplate isShowFooter={true}>
        <AboutUsPage />
      </MainTemplate>
    ,
  },
  {
    path: "/browse-jobs",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Jobs />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/browse-projects",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <FreelancerProjects />
      </MainTemplate>
      // </AuthRoute>
    ),
  },

  {
    path: "/find-talent",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={true}>
        <ClientHomepage />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/post-job",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={true}>
        <Post_job />
      </MainTemplate>
      // </AuthRoute>
    ),
  },





  {
    path: "/login",
    element:
      <LoginController />
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
      // <ProtectedRoute>
      <VerifyOtp />
    // </ProtectedRoute>
    ,
  },
  {
    path: "/change-password",
    element:
      // <ProtectedRoute>
      <ChangePassword />
    // </ProtectedRoute>
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
      // <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Overview />
        </MainTemplate>
      // </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/description",
    element: (
      // <AuthRoute>
      // <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Description />
        </MainTemplate>
      // </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/description/edit/:id",
    element: (
      // <AuthRoute>
      // <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Description />
        </MainTemplate>
      // </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/requirements",
    element: (
      // <AuthRoute>
      // <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Requirement />
        </MainTemplate>
      // </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/gallery",
    element: (
      // <AuthRoute>
      // <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Gallery />
        </MainTemplate>
      // </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/gallery/edit/:id",
    element: (
      // <AuthRoute>
      // <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <EditGallery />
        </MainTemplate>
      // </IsFreelancerProfile>
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
      // <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Pricing />
        </MainTemplate>
      // </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/pricing/edit/:id",
    element: (
      // <AuthRoute>
      // <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Pricing />
        </MainTemplate>
      // </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/orders",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Orders />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
   {
    path: "/freelancer/orders/:orderId",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={true}>
          <OrderDetailPage />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/dashboard",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <FreelancerDashboard />
        </MainTemplate>
      </IsFreelancerProfile>

      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/analytics",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <FreelancerAnalytics />
        </MainTemplate>
      </IsFreelancerProfile>
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
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <ManageGigsAndProjects />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },

  {
    path: "/freelancer/projects",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <FreelancerProjects />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },

  {
    path: "/freelancer/projects/:id",
    element: (
      // <AuthRoute>
      // <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <ProjectDetailFreelancer />
        </MainTemplate>
      // </IsFreelancerProfile>

      // </AuthRoute>
    ),
  },


  {
    path: "/freelancer/manage-jobs",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Jobs />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/add-resume",
    element: (
      // <AuthRoute>
      // <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Add_resume />
        </MainTemplate>
      // </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/success",
    element: (
      // <AuthRoute>
      // <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Success />
        </MainTemplate>
      // </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },

  {
    path: "/freelancer/job-experience",
    element: (
      // <AuthRoute>
      // <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Job_experience />
        </MainTemplate>
      // </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/edit-profile",
    element: (
      // <AuthRoute>
      // <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <FreelancerEditProfile />
        </MainTemplate>
      // </IsFreelancerProfile>
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
    path: "/client/edit-job/:id",
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
    path: "/client/edit-project/:id",
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
    path: "/client/jobs/:id",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <JobDetailPage />
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
    path: "/client/jobdetail",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <JobDetailPage />
      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/dashboard",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <SuperAdminDashboard />

      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/manage-dispute",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ManageDispute />

      </MainTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/reviews",
    element: (
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <ReviewPage />

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