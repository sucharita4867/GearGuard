import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Components/LoadingSpinner";
import Forbidden from "../Components/Forbidden ";

const EmployeeRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, roleLoading] = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "Employee") {
    return <Forbidden />;
  }

  return children;
};

export default EmployeeRoute;
