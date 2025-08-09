import { createBrowserRouter } from "react-router-dom";
import React, { lazy } from 'react';
// import ICCDLoader from "../src/component/loader";
import MainTemplate from '../src/templates/mainTemplate';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SuperAdminAllOrders from '../src/component/super_admin/AdminAllOrders';
import EditGallery from "../src/pages/freelancer_gigs/editGallery";
import IsFreelancerProfile from "../src/templates/IsfreelancerProfile";
import OrderDetailPage from "../src/pages/freelancer_dashboard/OrderDetailPage";
import { withSuspense } from "../utils/withSuspense";
import ICCDLoader from "../src/component/loader";

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
// const ManageUsers = lazy(() => import("../src/pages/superadmin_dashboard/manage_users"));
const ManageDispute = lazy(() => import("../src/pages/superadmin_dashboard/manage_dispute"));
const ReviewPage = lazy(() => import("../src/pages/superadmin_dashboard/review-page"));
const ContactPage = lazy(() => import("../src/pages/contactpage"));
const AboutUsPage = lazy(() => import("../src/pages/aboutuspage"));
const LoginController = lazy(() => import("../src/component/loginController"));
import AuthRoute from '../utils/authRoute';
import FindTalent from "../src/pages/clientHomepage/findTalent";
import EditPricingForm from "../src/pages/freelancer_gigs/editPricing";
import ManageUsers from "../src/pages/superadmin_dashboard/manage_users";

const stripePromise = loadStripe("pk_test_51QCl1eCDh3RtIJ6XkYcN5vHd3KTO2f8enRSNv9Wx7Li0iCI7cr9khTDQx0vS5RmbazZoaECNW83FesOMwLeIgMLb00BJG4pPZR");

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<Homepage />),
  },
  {
    path: "/loader",
    element: withSuspense(<ICCDLoader />),
  },
  {
    path: "/contactus",
    element: withSuspense(
      <MainTemplate isShowFooter={true}>
        <ContactPage />
      </MainTemplate>
    ),
  },
  {
    path: "/aboutus",
    element: withSuspense(
      <MainTemplate isShowFooter={true}>
        <AboutUsPage />
      </MainTemplate>
    ),
  },
  {
    path: "/browse-jobs",
    element: withSuspense(
        <MainTemplate isShowFooter={false}>
          <Jobs />
        </MainTemplate>
    ),
  },
  {
    path: "/browse-projects",
    element: withSuspense(
        <MainTemplate isShowFooter={false}>
          <FreelancerProjects />
        </MainTemplate>
    ),
  },
  {
    path: "/find-talent",
    element: withSuspense(
        <MainTemplate isShowFooter={true}>
          <FindTalent />
        </MainTemplate>
    ),
  },
  {
    path: "/post-job",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={true}>
          <Post_job />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/login",
    element: withSuspense(<LoginController />),
  },
  {
    path: "/signUp",
    element: withSuspense(<SignUp />),
  },
  {
    path: "/forgot-password",
    element: withSuspense(<ForgotPassword />),
  },
  {
    path: "/verify-otp",
    element: withSuspense(<VerifyOtp />),
  },
  {
    path: "/change-password",
    element: withSuspense(<ChangePassword />),
  },
  {
    path: "/dashboard",
    element: withSuspense(
      <AuthRoute>
        <Dashboard />
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer-profile",
    element: withSuspense(
      <AuthRoute>
        <FreelancerProfile />
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/overview",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Overview />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/overview/edit/:id",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Overview />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/description",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Description />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/description/edit/:id",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Description />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/requirements",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Requirement />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/gallery",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Gallery />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/gallery/edit/:id",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <EditGallery />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/publish",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Publish />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/pricing",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Pricing />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs/pricing/edit/:id",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <EditPricingForm />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/orders",
    element: withSuspense(
      <AuthRoute>
        <IsFreelancerProfile>
          <MainTemplate isShowFooter={false}>
            <Orders />
          </MainTemplate>
        </IsFreelancerProfile>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/orders/:orderId",
    element: withSuspense(
      <AuthRoute>
        <IsFreelancerProfile>
          <MainTemplate isShowFooter={true}>
            <OrderDetailPage />
          </MainTemplate>
        </IsFreelancerProfile>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/dashboard",
    element: withSuspense(
      <AuthRoute>
        <IsFreelancerProfile>
          <MainTemplate isShowFooter={false}>
            <FreelancerDashboard />
          </MainTemplate>
        </IsFreelancerProfile>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/analytics",
    element: withSuspense(
      <AuthRoute>
        <IsFreelancerProfile>
          <MainTemplate isShowFooter={false}>
            <FreelancerAnalytics />
          </MainTemplate>
        </IsFreelancerProfile>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/start-selling/1",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <StartSelling />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/start-selling/2",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ICCDProfileTipsPage />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/start-selling/3",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ICCDGuidelinesPage />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/profile-form/1",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <MultiStepForm />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/profile-form/2",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ProfessionalInfoStep />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/profile-form/3",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <AccountSecurityStep />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-gigs",
    element: withSuspense(
      <AuthRoute>
        <IsFreelancerProfile>
          <MainTemplate isShowFooter={false}>
            <ManageGigsAndProjects />
          </MainTemplate>
        </IsFreelancerProfile>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/projects",
    element: withSuspense(
      <AuthRoute>
        <IsFreelancerProfile>
          <MainTemplate isShowFooter={false}>
            <FreelancerProjects />
          </MainTemplate>
        </IsFreelancerProfile>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/projects/:id",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ProjectDetailFreelancer />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/manage-jobs",
    element: withSuspense(
      <AuthRoute>
        <IsFreelancerProfile>
          <MainTemplate isShowFooter={false}>
            <Jobs />
          </MainTemplate>
        </IsFreelancerProfile>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/add-resume",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Add_resume />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/success",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Success />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/job-experience",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Job_experience />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/edit-profile",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <FreelancerEditProfile />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ClientHomepage />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client/dashboard",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ClientDashboard />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client/profile",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ClientDashboard />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client/post-job",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Post_job />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client/edit-job/:id",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Post_job />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client/post-project",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ProjectForm />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client/edit-project/:id",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ProjectForm />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client/orders",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ClientOrders />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client/projects",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ClientProjects />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client/projects/:id",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ProjectDetailClient />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client/jobs",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ClientJobs />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client/jobs/:id",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <JobDetailPage />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client/gigs/gigs_details/:id",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Gigs_details />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client/jobdetail",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <JobDetailPage />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/superadmin/dashboard",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <SuperAdminDashboard />
        </MainTemplate>
      </AuthRoute>
    ),
  },

    {
    path: "/superadmin/orders",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
        <SuperAdminAllOrders/>
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/superadmin/orders/:orderId",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
        <OrderDetailPage/>
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/superadmin/manage-dispute",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ManageDispute />
        </MainTemplate>
      </AuthRoute>
    ),
  },
    {
    path: "/superadmin/manage-users",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
         <ManageUsers/>
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/superadmin/reviews",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ReviewPage />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/payment",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/check",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <Check />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/success",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <PaymentSuccess />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/OrderOptions",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <OrderOptions />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/cancel",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <PaymentCancel />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/client/messages",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <WhatsAppClone />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/messages",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <WhatsAppClone />
        </MainTemplate>
      </AuthRoute>
    ),
  }
]);