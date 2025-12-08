import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import HomeRoot from "../pages/Home/HomeRoot/HomeRoot";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import HrRegister from "../pages/Auth/HrRegister";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import EmployeeRegister from "../pages/Auth/EmployeeRegister";
import AssetList from "../pages/AssetList";
import AllRequests from "../pages/AllRequests";
import AllEmployee from "../pages/AllEmployee";
import AddAsset from "../pages/AddAsset";
import PrivateRoute from "./PrivateRoute";
import EmployeeRoute from "./EmployeeRoute";

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
        path: "/asset-list",
        element: (
          <PrivateRoute>
            <AssetList />
          </PrivateRoute>
        ),
      },
      {
        path: "/asset-add",
        element: (
          <EmployeeRoute>
            <PrivateRoute>
              <AddAsset />
            </PrivateRoute>
          </EmployeeRoute>
        ),
      },
      {
        path: "/all-requests",
        element: (
          <PrivateRoute>
            <AllRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-employee",
        element: (
          <PrivateRoute>
            <AllEmployee />
          </PrivateRoute>
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
