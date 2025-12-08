import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useRole from "../Hooks/useRole";
import Forbidden from "../Components/Forbidden ";
import Loading from "../Components/Loading";

const EmployeeRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, roleLoading] = useRole();

  // Still signing in (firebase loading)
  if (loading || roleLoading) {
    return <Loading />;
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
