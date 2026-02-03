import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex">
        <Sidebar className="mt-0" isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="flex-1 md:ml-64  bg-[#EAECED]">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
