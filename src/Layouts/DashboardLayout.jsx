import React from "react";
import Navbar from "../pages/Shared/Navbar";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex border border-red-700">
        <Sidebar />
        <main className="p-6 min-h-screen w-full md:pl-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
