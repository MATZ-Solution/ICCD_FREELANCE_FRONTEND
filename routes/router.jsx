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
import ActiveProjects from "../src/pages/superadmin_dashboard/manage-projects"
import UserDetailPage from "../src/pages/superadmin_dashboard/UserDetail"
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
const ProfessionalInfoStep = lazy(() => import("../src/pages/freelancer_profile/form3"));
const AccountSecurityStep = lazy(() => import("../src/pages/freelancer_profile/form4"));
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
import BrowseProjects from "../src/pages/browseProject";
import NotFound from '../src/component/NotFound';
import { ProjectDetail } from '../src/pages/projectDetail';
import TestingComponents from "../src/pages/testingComponent";
import Manage_freelancers from "../src/pages/superadmin_dashboard/manage_freelancers";
import Manage_gigs from "../src/pages/superadmin_dashboard/manage_gigs";
import DisputeDetailPageClient from "../src/component/client_order/DisputeDetailPageClient";
import AdminManageDisputes from "../src/pages/superadmin_dashboard/manage_disputes";
import DisputeDetailView from "../src/component/super_admin/DisputeDetailView";
import ClientDisputeLists from "../src/component/client_order/ClientDisputesList";
import FreelancerDisputeLists from "../src/pages/freelancer_dashboard/FreelancerDisputeLists";
import DisputeDetailPageFreelancer from "../src/pages/freelancer_dashboard/DisputeDetailPageFreelancer";
import ClientOrderDetail from "../src/component/client_order/ClientOrderDetail";
import IccdPrivacyPolicyUI from "../src/component/Home/IccdPrivacyPolicyUI";
import TermsOfService from '../src/component/Home/TermsOfService';
import CookiePolicy from '../src/component/Home/CookiePolicy';
import CommunityGuidelines from '../src/component/Home/CommunityGuidelines';
import BlogPage from '../src/component/Home/BlogPage';
import ReportIssueForm from '../src/component/Home/ReportIssueForm';
import ICCDAboutPage from '../src/component/Home/ICCDAboutPage';
import HowItWorks from '../src/component/Home/HowItWorks';
import FAQPage from '../src/component/Home/FAQPage';
import ContactForm from '../src/component/Home/ContactForm';
import FeedbackSection from '../src/component/Home/FeedbackSection';
import GoogleCallback from '../src/component/GoogleCallback';
import AdminTemplate from '../src/templates/adminTemplate';
import ActiveJobs from "../src/pages/superadmin_dashboard/manage-jobs";
import Feedbacks from "../src/pages/superadmin_dashboard/manage_feedbacks";
import Reports from "../src/pages/superadmin_dashboard/manage-reports";
import ManageContactform from "../src/pages/superadmin_dashboard/manage-contactform";
import MessageCheck from "../src/pages/messagesCheck";
import GigContactMe from "../src/component/client_order/GigContactMe";
import SuccessModal from "../src/component/SuccessModal";
import Portfolio from "../src/pages/freelancer_profile/form2";

const stripePromise = loadStripe("pk_test_51QCl1eCDh3RtIJ6XkYcN5vHd3KTO2f8enRSNv9Wx7Li0iCI7cr9khTDQx0vS5RmbazZoaECNW83FesOMwLeIgMLb00BJG4pPZR");

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(
      <MainTemplate isShowFooter={true}>
        <Homepage />
      </MainTemplate >
    ),
  },
    {
    path: "/google-callback",
    element: withSuspense(
      <MainTemplate isShowFooter={true}>
        <GoogleCallback />
      </MainTemplate >
    ),
  },
    {
    path: "/GigContactMe",
    element: withSuspense(
      <MainTemplate isShowFooter={true}>
        <GigContactMe />
      </MainTemplate >
    ),
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
    path: "/SuccessModal",
    element: withSuspense(
      <MainTemplate isShowFooter={true}>
        <SuccessModal />
      </MainTemplate>
    ),
  },
  
  {
    path: "/aboutus",
    element: withSuspense(
      <MainTemplate isShowFooter={true}>
        <ICCDAboutPage />
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
        <BrowseProjects />
      </MainTemplate>
    ),
  },
  {
    path: "/browse-projects/:id",
    element: withSuspense(
      <MainTemplate isShowFooter={false}>
        <ProjectDetail />
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
    path: "/find-talent/:id",
    element: withSuspense(
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Gigs_details />
      </MainTemplate>
      // </AuthRoute>
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
    path: "/signup",
    element: withSuspense(<LoginController linker="signup" />),
  },
  // {
  //   path: "/signUp",
  //   element: withSuspense(<SignUp />),
  // },
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
    path: "/freelancer/DisputesList",
    element: withSuspense(
      <AuthRoute>
          <MainTemplate isShowFooter={true}>
            <FreelancerDisputeLists />
          </MainTemplate>
      </AuthRoute>
    ),
  },
    {
    path: "/freelancer/Disputes/:id",
    element: withSuspense(
      <AuthRoute>
          <MainTemplate isShowFooter={true}>
            <DisputeDetailPageFreelancer />
          </MainTemplate>
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
          <Portfolio />
        </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/freelancer/profile-form/3",
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
    path: "/client/orderDetail/:id",
    element: withSuspense(
      <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ClientOrderDetail />
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
      // <AuthRoute>
      <MainTemplate isShowFooter={false}>
        <Gigs_details />
      </MainTemplate>
      // </AuthRoute>
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
    path: "/client/DisputesList",
    element: withSuspense(
      // <AuthRoute>
        <MainTemplate isShowFooter={false}>
          <ClientDisputeLists />
        </MainTemplate>
      // </AuthRoute>
    ),
  },
      {
    path: "/client/Disputes/:id",
    element: withSuspense(
      <AuthRoute>
          <MainTemplate isShowFooter={true}>
            <DisputeDetailPageClient />
          </MainTemplate>
      </AuthRoute>
    ),
  },
  {
    path: "/superadmin/dashboard",
    element: withSuspense(
      // <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <SuperAdminDashboard />
        </AdminTemplate>
      // </AuthRoute>
    ),
  },
    {
    path: "/superadmin/manage-disputes",
    element: withSuspense(
      <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <AdminManageDisputes />
        </AdminTemplate>
      </AuthRoute>
    ),
  },
    {
    path: "/superadmin/admindisputedetail/:id",
    element: withSuspense(
      <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <DisputeDetailView />
        </AdminTemplate>
      </AuthRoute>
    ),
  },

  {
    path: "/superadmin/orders",
    element: withSuspense(
      // <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <SuperAdminAllOrders />
        </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/orders/:orderId",
    element: withSuspense(
      // <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <OrderDetailPage />
        </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/manage-dispute",
    element: withSuspense(
      // <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <ManageDispute />
        </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/manage-users",
    element: withSuspense(
      // <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <ManageUsers />
        </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "superadmin/manage-contactform",
    element: withSuspense(
      // <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <ManageContactform />
        </AdminTemplate>
      // </AuthRoute>
    ),
  },
    {
    path: "superadmin/manage-feedbacks",
    element: withSuspense(
      // <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <Feedbacks />
        </AdminTemplate>
      // </AuthRoute>
    ),
  },
    {
    path: "/superadmin/manage-reports",
    element: withSuspense(
      // <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <Reports />
        </AdminTemplate>
      // </AuthRoute>
    ),
  },
    {
    path: "superadmin/user/:id",
    element: withSuspense(
      // <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <UserDetailPage />
        </AdminTemplate>
      // </AuthRoute>
    ),
  },
    {
    path: "/superadmin/Active-freelancers",
    element: withSuspense(
      // <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <Manage_freelancers />
        </AdminTemplate>
      // </AuthRoute>
    ),
  },
      {
    path: "/superadmin/manage-gigs",
    element: withSuspense(
      // <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <Manage_gigs />
        </AdminTemplate>
      // </AuthRoute>
    ),
  },

    {
    path: "superadmin/manage-projects",
    element: withSuspense(
      // <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <ActiveProjects />
        </AdminTemplate>
      // </AuthRoute>
    ),
  },

    {
    path: "/superadmin/manage-jobs",
    element: withSuspense(
      // <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <ActiveJobs />
        </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/superadmin/reviews",
    element: withSuspense(
      // <AuthRoute>
        <AdminTemplate isShowFooter={false}>
          <ReviewPage />
        </AdminTemplate>
      // </AuthRoute>
    ),
  },
  {
    path: "/client/payment",
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
    path: "/testingCompoent",
    element: withSuspense(
      <TestingComponents />
    ),
  },
  {
    path: "/client/payment/success",
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
    path: "/client/payment/cancel",
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
          {/* <WhatsAppClone /> */}
          <MessageCheck />
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
  },
  {
    path: "/privacy-policy",
    element: withSuspense(
        <MainTemplate isShowFooter={true}>
          <IccdPrivacyPolicyUI />
        </MainTemplate>
    ),
  },
    {
    path: "/terms-of-service",
    element: withSuspense(
        <MainTemplate isShowFooter={true}>
          <TermsOfService />
        </MainTemplate>
    ),
  },

   {
    path: "/cookies",
    element: withSuspense(
        <MainTemplate isShowFooter={true}>
          <CookiePolicy />
        </MainTemplate>
    ),
  }
  ,
   {
    path: "/CommunityGuidelines",
    element: withSuspense(
        <MainTemplate isShowFooter={true}>
          <CommunityGuidelines />
        </MainTemplate>
    ),
  },

    {
    path: "/blog",
    element: withSuspense(
        <MainTemplate isShowFooter={true}>
          <BlogPage />
        </MainTemplate>
    ),
  },
  {
    path: "/report",
    element: withSuspense(
        <MainTemplate isShowFooter={true}>
          <ReportIssueForm />
        </MainTemplate>
    ),
  },
  
    {
    path: "/feedback",
    element: withSuspense(
        <MainTemplate isShowFooter={true}>
          <FeedbackSection />
        </MainTemplate>
    ),
  },
  {
    path: "/how-it-works",
    element: withSuspense(
        <MainTemplate isShowFooter={true}>
          <HowItWorks />
        </MainTemplate>
    ),
  },
  {
    path: "/faqs",
    element: withSuspense(
        <MainTemplate isShowFooter={true}>
          <FAQPage />
        </MainTemplate>
    ),
  },
  
  
  {
    path: "*",
    element: withSuspense(
      <MainTemplate isShowFooter={true}>
        <NotFound />
      </MainTemplate>
    ),
  }

]);