import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
