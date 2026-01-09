import React from "react";
import Navbar from "../pages/Shared/Navbar";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="p-6 ml-0 md:ml-64 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
