// src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import Login from "../src/pages/signIn";
import Dashboard from "../src/pages/dashboard";
import AuthRoute from "../utils/authRoute";
import Signup from "../src/pages/signUp";
import Homepage from "../src/pages/homepage";

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
    path: "/dashboard",
    element: (
      <AuthRoute>
        <Dashboard />
      </AuthRoute>
    ),
  },
]);
