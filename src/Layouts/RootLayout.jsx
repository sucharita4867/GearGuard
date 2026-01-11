import React from "react";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer";
import Navbar from "../pages/Shared/Navbar";

const RootLayout = () => {
  return (
    <div className="bg-[#eaeced] roboto">
      <div className="bg-[#eaeced]">
        <Navbar />
        <div className="mt-16">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
