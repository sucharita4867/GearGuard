import React from "react";
import { NavLink } from "react-router";
import useRole from "../Hooks/useRole";

const Sidebar = ({ isOpen = true, setIsOpen = () => {} }) => {
  const [role] = useRole();

  const base = "block px-4 py-2 rounded-lg transition-colors duration-200";
  const active = "bg-secondary text-black font-semibold";
  const inactive = "hover:bg-zinc-800";

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
      <div className="p-6 text-xl font-bold border-b border-zinc-700">
        Dashboard
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <NavLink
          to="/dashboard"
          end
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Overview
        </NavLink>

        {role === "Hr" && (
          <>
            <NavLink
              to="/dashboard/asset-list"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              Asset List
            </NavLink>

            <NavLink
              to="/dashboard/asset-add"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              Add Asset
            </NavLink>

            <NavLink
              to="/dashboard/all-requests"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              All Requests
            </NavLink>

            <NavLink
              to="/dashboard/all-employee"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              My Employees
            </NavLink>

            <NavLink
              to="/dashboard/package-update"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              Update Package
            </NavLink>
          </>
        )}

        {role === "Employee" && (
          <>
            <NavLink
              to="/dashboard/my-assets"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              My Assets
            </NavLink>

            <NavLink
              to="/dashboard/my-team"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              My Team
            </NavLink>

            <NavLink
              to="/dashboard/request-asset"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              Request Asset
            </NavLink>
          </>
        )}
      </nav>

      {/* Profile – ALWAYS BOTTOM */}
      <div className="border-t border-zinc-700 p-2 mt-auto">
        <NavLink
          to="/dashboard/profile"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800"
        >
          <div className="w-10 h-10 rounded-full bg-secondary text-black flex items-center justify-center font-bold">
            P
          </div>
          <span className="text-sm font-semibold">View Profile</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
