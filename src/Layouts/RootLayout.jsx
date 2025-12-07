import React from "react";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer";
import Navbar from "../pages/Shared/Navbar";

const RootLayout = () => {
  return (
    <div className="bg-[#eaeced]">
      <div className="">
        <Navbar />
        <div className=" w-11/12 mx-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
