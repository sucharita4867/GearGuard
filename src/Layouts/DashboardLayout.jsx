import React, { useState } from "react";
import Navbar from "../pages/Shared/Navbar";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <Navbar onMenuClick={() => setIsOpen(true)} /> */}

      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="flex-1 md:ml-64  bg-[#EAECED]">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
