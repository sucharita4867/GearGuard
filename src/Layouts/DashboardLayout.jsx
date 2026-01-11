import React, { useState } from "react";
import Navbar from "../pages/Shared/Navbar";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar setIsOpen={setIsOpen} />

      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* overlay for mobile */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}

        <main className="flex-1  md:ml-64 mt-16">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
