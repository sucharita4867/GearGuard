import React, { useContext } from "react";
import { NavLink } from "react-router";
import useRole from "../Hooks/useRole";
import { AuthContext } from "../Context/AuthProvider";

import {
  FaHome,
  FaChartPie,
  FaBoxes,
  FaPlusCircle,
  FaClipboardList,
  FaUsers,
  FaCreditCard,
  FaBriefcase,
  FaUserFriends,
  FaEdit,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ isOpen = true, setIsOpen = () => {} }) => {
  const [role] = useRole();
  const { logOut } = useContext(AuthContext);

  const base =
    "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200";
  const active = "bg-secondary text-white font-semibold";
  const inactive = "hover:bg-zinc-800";

  const handleLogout = () => {
    logOut();
    setIsOpen(false);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/80 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0
          w-64  h-screen
          bg-primary text-white z-50
          flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <NavLink
            to="/"
            end
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            <FaHome /> Home
          </NavLink>

          <NavLink
            to="/dashboard"
            end
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            <FaChartPie /> Overview
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
                <FaBoxes /> Asset List
              </NavLink>

              <NavLink
                to="/dashboard/asset-add"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${base} ${isActive ? active : inactive}`
                }
              >
                <FaPlusCircle /> Add Asset
              </NavLink>

              <NavLink
                to="/dashboard/all-requests"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${base} ${isActive ? active : inactive}`
                }
              >
                <FaClipboardList /> All Requests
              </NavLink>

              <NavLink
                to="/dashboard/all-employee"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${base} ${isActive ? active : inactive}`
                }
              >
                <FaUsers /> My Employees
              </NavLink>

              <NavLink
                to="/dashboard/package-update"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${base} ${isActive ? active : inactive}`
                }
              >
                <FaCreditCard /> Update Package
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
                <FaBriefcase /> My Assets
              </NavLink>

              <NavLink
                to="/dashboard/my-team"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${base} ${isActive ? active : inactive}`
                }
              >
                <FaUserFriends /> My Team
              </NavLink>

              <NavLink
                to="/dashboard/request-asset"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${base} ${isActive ? active : inactive}`
                }
              >
                <FaEdit /> Request Asset
              </NavLink>
            </>
          )}
        </nav>

        {/* PROFILE + LOGOUT */}
        <div className="border-t border-zinc-700 p-2 space-y-2">
          <NavLink
            to="/dashboard/profile"
            onClick={() => setIsOpen(false)}
            className={`${base} hover:bg-zinc-800`}
          >
            <FaUser />
            View Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className={`${base} text-red-400 w-full hover:bg-zinc-800`}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
