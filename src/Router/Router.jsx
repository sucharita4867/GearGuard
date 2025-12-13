import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import HomeRoot from "../pages/Home/HomeRoot/HomeRoot";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import HrRegister from "../pages/Auth/HrRegister";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import EmployeeRegister from "../pages/Auth/EmployeeRegister";
import AssetList from "../pages/HrLinks/AssetList";
import AllRequests from "../pages/HrLinks/AllRequests";
import AllEmployee from "../pages/HrLinks/AllEmployee";
import AddAsset from "../pages/HrLinks/AddAsset";
import PrivateRoute from "./PrivateRoute";
import EmployeeRoute from "./EmployeeRoute";
import MyAssets from "../pages/EmployeeLinks.jsx/MyAssets";
import MyTeam from "../pages/EmployeeLinks.jsx/MyTeam";
import RequestAsset from "../pages/EmployeeLinks.jsx/RequestAsset";
import HrRouter from "./HrRouter";
import PackageUpdate from "../pages/HrLinks/PackageUpdate";
import PaymentSuccess from "../pages/HrLinks/Payment/PaymentSuccess";
import Profile from "../pages/Home/Profile";
import Recharts from "../pages/Home/Recharts";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomeRoot,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/recharts",
        element: (
          <HrRouter>
            <PrivateRoute>
              <Recharts />
            </PrivateRoute>
          </HrRouter>
        ),
      },
      // hr route
      {
        path: "/asset-list",
        element: (
          <HrRouter>
            <PrivateRoute>
              <AssetList />
            </PrivateRoute>
          </HrRouter>
        ),
      },
      {
        path: "/asset-add",
        element: (
          <HrRouter>
            <PrivateRoute>
              <AddAsset />
            </PrivateRoute>
          </HrRouter>
        ),
      },
      {
        path: "/all-requests",
        element: (
          <HrRouter>
            <PrivateRoute>
              <AllRequests />
            </PrivateRoute>
          </HrRouter>
        ),
      },
      {
        path: "/all-employee",
        element: (
          <HrRouter>
            <PrivateRoute>
              <AllEmployee />
            </PrivateRoute>
          </HrRouter>
        ),
      },
      {
        path: "/package-update",
        element: (
          <HrRouter>
            <PrivateRoute>
              <PackageUpdate />
            </PrivateRoute>
          </HrRouter>
        ),
      },

      {
        path: "/payment/payment-success",
        element: (
          <HrRouter>
            <PrivateRoute>
              <PaymentSuccess />
            </PrivateRoute>
          </HrRouter>
        ),
      },
      // employee route
      {
        path: "/my-assets",
        element: (
          <EmployeeRoute>
            <PrivateRoute>
              <MyAssets />
            </PrivateRoute>
          </EmployeeRoute>
        ),
      },
      {
        path: "/my-team",
        element: (
          <EmployeeRoute>
            <PrivateRoute>
              <MyTeam />
            </PrivateRoute>
          </EmployeeRoute>
        ),
      },
      {
        path: "/request-asset",
        element: (
          <EmployeeRoute>
            <PrivateRoute>
              <RequestAsset />
            </PrivateRoute>
          </EmployeeRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register-hr",
        Component: HrRegister,
      },
      {
        path: "register-employee",
        Component: EmployeeRegister,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
