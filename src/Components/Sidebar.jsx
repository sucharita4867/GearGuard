import React from "react";
import { NavLink } from "react-router";
import useRole from "../Hooks/useRole";

const Sidebar = ({ isOpen = true, setIsOpen = () => {} }) => {
  const [role] = useRole();

  const baseClass = "block px-4 py-2 rounded-lg transition-colors duration-200";
  const activeClass = "bg-secondary text-black font-semibold";
  const inactiveClass = "hover:bg-zinc-800";

  return (
    <aside
      className={`
        fixed left-0 top-16
        w-64 h-[calc(100vh-4rem)]
        bg-primary text-white z-50
        flex flex-col
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* Header */}
      <div className="p-6 text-xl font-bold border-b border-zinc-700 shrink-0">
        Dashboard
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* ===== COMMON (Overview) ===== */}
        <NavLink
          to="/dashboard"
          end
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Overview
        </NavLink>

        {/* ===== HR LINKS ===== */}
        {role === "Hr" && (
          <>
            <NavLink
              to="/dashboard/asset-list"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Asset List
            </NavLink>

            <NavLink
              to="/dashboard/asset-add"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Add Asset
            </NavLink>

            <NavLink
              to="/dashboard/all-requests"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              All Requests
            </NavLink>

            <NavLink
              to="/dashboard/all-employee"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              My Employees
            </NavLink>

            <NavLink
              to="/dashboard/package-update"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Update Package
            </NavLink>
          </>
        )}

        {/* ===== EMPLOYEE LINKS ===== */}
        {role === "Employee" && (
          <>
            <NavLink
              to="/dashboard/my-assets"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              My Assets
            </NavLink>

            <NavLink
              to="/dashboard/my-team"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              My Team
            </NavLink>

            <NavLink
              to="/dashboard/request-asset"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Request Asset
            </NavLink>
          </>
        )}
      </nav>

      {/* Profile (common) */}
      <div className="border-t border-zinc-700 p-4 shrink-0">
        <NavLink
          to="/dashboard/profile"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800"
        >
          <div className="w-10 h-10 rounded-full bg-secondary text-black flex items-center justify-center font-bold">
            P
          </div>
          <p className="text-sm text-zinc-300 font-semibold">View Profile</p>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
