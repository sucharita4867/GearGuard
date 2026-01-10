import { createBrowserRouter } from "react-router";

// layouts
import RootLayout from "../Layouts/RootLayout";
import AuthLayout from "../Layouts/AuthLayout";
import DashboardLayout from "../Layouts/DashboardLayout";

// public pages
import HomeRoot from "../pages/Home/HomeRoot/HomeRoot";
import About from "../pages/Home/About";
import FAQ from "../pages/Home/FAQ";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

// auth pages
import Login from "../pages/Auth/Login";
import HrRegister from "../pages/Auth/HrRegister";
import EmployeeRegister from "../pages/Auth/EmployeeRegister";

// dashboard common
import DashboardHome from "../Components/DashboardHome";
import Profile from "../pages/Home/Profile";

// hr pages
import AssetList from "../pages/HrLinks/AssetList";
import AddAsset from "../pages/HrLinks/AddAsset";
import AllRequests from "../pages/HrLinks/AllRequests";
import AllEmployee from "../pages/HrLinks/AllEmployee";
import PackageUpdate from "../pages/HrLinks/PackageUpdate";
import PaymentSuccess from "../pages/HrLinks/Payment/PaymentSuccess";

// employee pages
import MyAssets from "../pages/EmployeeLinks.jsx/MyAssets";
import MyTeam from "../pages/EmployeeLinks.jsx/MyTeam";
import RequestAsset from "../pages/EmployeeLinks.jsx/RequestAsset";

// route guards
import PrivateRoute from "./PrivateRoute";
import HrRouter from "./HrRouter";
import EmployeeRoute from "./EmployeeRoute";
import Recharts from "../pages/Home/Recharts";
import Contact from "../pages/Home/Contact";

export const router = createBrowserRouter([
  // ================= PUBLIC LAYOUT =================
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomeRoot /> },
      { path: "about", element: <About /> },
      {
        path: "contact",
        element: <Contact />,
      },
      { path: "faq", element: <FAQ /> },
    ],
  },

  // ================= AUTH LAYOUT =================
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register-hr", element: <HrRegister /> },
      { path: "register-employee", element: <EmployeeRegister /> },
    ],
  },

  // ================= DASHBOARD LAYOUT =================
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // overview
      { index: true, element: <DashboardHome /> },

      // profile (common)
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      // -------- HR ROUTES --------
      {
        path: "asset-list",
        element: (
          <HrRouter>
            <AssetList />
          </HrRouter>
        ),
      },
      {
        path: "asset-add",
        element: (
          <HrRouter>
            <AddAsset />
          </HrRouter>
        ),
      },
      {
        path: "all-requests",
        element: (
          <HrRouter>
            <AllRequests />
          </HrRouter>
        ),
      },
      {
        path: "all-employee",
        element: (
          <HrRouter>
            <AllEmployee />
          </HrRouter>
        ),
      },
      {
        path: "package-update",
        element: (
          <HrRouter>
            <PackageUpdate />
          </HrRouter>
        ),
      },
      {
        path: "payment/payment-success",
        element: (
          <HrRouter>
            <PaymentSuccess />
          </HrRouter>
        ),
      },
      {
        path: "recharts",
        element: (
          <HrRouter>
            <Recharts />
          </HrRouter>
        ),
      },

      // -------- EMPLOYEE ROUTES --------
      {
        path: "my-assets",
        element: (
          <EmployeeRoute>
            <MyAssets />
          </EmployeeRoute>
        ),
      },
      {
        path: "my-team",
        element: (
          <EmployeeRoute>
            <MyTeam />
          </EmployeeRoute>
        ),
      },
      {
        path: "request-asset",
        element: (
          <EmployeeRoute>
            <RequestAsset />
          </EmployeeRoute>
        ),
      },
    ],
  },

  // ================= FALLBACK =================

  {
    path: "*",
    element: <ErrorPage />,
  },
]);
