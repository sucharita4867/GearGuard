import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useRole from "../Hooks/useRole";
import Forbidden from "../Components/Forbidden ";
import { Navigate } from "react-router";

const HrRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, roleLoading] = useRole();

  // Still signing in (firebase loading)
  if (loading || roleLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "Hr") {
    return <Forbidden />;
  }

  return children;
};

export default HrRouter;
