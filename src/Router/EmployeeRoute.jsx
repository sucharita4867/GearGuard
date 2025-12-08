import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useRole from "../Hooks/useRole";
import Forbidden from "../Components/Forbidden ";

const EmployeeRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, roleLoading] = useRole();

  // Still signing in (firebase loading)
  if (loading || roleLoading) {
    return <p className="text-center">Loading...</p>;
  }

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // logged in but not employee
  if (role !== "employee") {
    return <Forbidden />;
  }

  // valid employee
  return children;
};

export default EmployeeRoute;
