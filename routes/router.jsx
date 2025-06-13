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
]);
