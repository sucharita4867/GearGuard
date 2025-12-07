import React from "react";

const PrivateRoute = ({ children }) => {
  return (
    <div>
      <h1>this is private route</h1>
      {children}
    </div>
  );
};

export default PrivateRoute;
