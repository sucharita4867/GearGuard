import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <div className="flex-1 items-center roboto bg-[#EAECED]  justify-center ">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
