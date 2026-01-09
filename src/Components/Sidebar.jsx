import React from "react";
import { NavLink } from "react-router";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {/* {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )} */}

      <aside
        className={`
          fixed
          left-0
          top-16
          w-64
          h-[calc(100vh-4rem)]
          bg-primary text-white
          z-50
          flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER (fixed) */}
        <div className="p-6 text-xl font-bold border-b border-zinc-700 shrink-0">
          Dashboard
        </div>

        {/* MENU (scrollable only this part) */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <NavLink
            to="/dashboard/asset-list"
            className={({ isActive }) =>
              isActive ? "text-secondary font-semibold" : "text-white"
            }
          >
            Asset List
          </NavLink>

          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-[#F8B864] text-black" : "hover:bg-zinc-800"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard/addIssue"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-[#F8B864] text-black" : "hover:bg-zinc-800"
              }`
            }
          >
            Add Issue
          </NavLink>

          <NavLink
            to="/dashboard/myIssue"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-[#F8B864] text-black" : "hover:bg-zinc-800"
              }`
            }
          >
            My Issues
          </NavLink>

          <NavLink
            to="/dashboard/myContribution"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-[#F8B864] text-black" : "hover:bg-zinc-800"
              }`
            }
          >
            My Contribution
          </NavLink>
        </nav>

        {/* PROFILE (fixed bottom, no scroll) */}
        <div className="border-t border-zinc-700 p-4 shrink-0">
          <NavLink
            to="/dashboard/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 hover:bg-zinc-800 p-2 rounded-lg"
          >
            <div className="w-10 h-10 rounded-full bg-[#F8B864] text-black flex items-center justify-center font-bold">
              P
            </div>
            <div>
              <p className="text-sm text-zinc-400 font-semibold">
                View Profile
              </p>
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
