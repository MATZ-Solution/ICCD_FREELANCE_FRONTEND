// src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import Login from "../src/pages/signIn";
import Dashboard from "../src/pages/dashboard";
import AuthRoute from "../utils/authRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element:
      <Login />
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
