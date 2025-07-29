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
import JobDetailPage from "../src/pages/client_dashboard/JobDetail";
import SuperAdminDashboard from "../src/pages/superadmin_dashboard/dashboard";
import ManageUsers from "../src/pages/superadmin_dashboard/manage_dispute";
import ManageDispute from "../src/pages/superadmin_dashboard/manage_dispute";
import ReviewPage from "../src/pages/superadmin_dashboard/review-page";
import ContactPage from '../src/pages/contactpage';
import AboutUsPage from '../src/pages/aboutuspage';
import LoginController from "../src/component/loginController";
import ICCDLoader from '../src/component/loader';
import EditGallery from "../src/pages/freelancer_gigs/editGallery";
import IsFreelancerProfile from "../src/templates/IsfreelancerProfile";

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
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Overview />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/overview/edit/:id",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Overview />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/description",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Description />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/description/edit/:id",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Description />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/requirements",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Requirement />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/gallery",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Gallery />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/gallery/edit/:id",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <EditGallery />
        </MainTemplate>
      </IsFreelancerProfile>
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
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Pricing />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/pricing/edit/:id",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Pricing />
        </MainTemplate>
      </IsFreelancerProfile>
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
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <ProjectDetailFreelancer />
        </MainTemplate>
      </IsFreelancerProfile>

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
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Add_resume />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/success",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Success />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },

  {
    path: "/freelancer/job-experience",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <Job_experience />
        </MainTemplate>
      </IsFreelancerProfile>
      // </AuthRoute>
    ),
  },
  {
    path: "/freelancer/edit-profile",
    element: (
      // <AuthRoute>
      <IsFreelancerProfile>
        <MainTemplate isShowFooter={false}>
          <FreelancerEditProfile />
        </MainTemplate>
      </IsFreelancerProfile>
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
