import React from "react";
import { NavLink } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div
      className="relative  md:p-10  h-[70vh] bg-cover bg-center flex items-center rounded-xl"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=60')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative text-white p-4 md:p-5 w-full md:w-1/2 space-y-5"
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Smart Asset Management for Modern Companies
        </h1>

        <p className="text-lg md:text-xl opacity-80">
          Track assets, approve requests, manage teams, and automate workflows —
          all in one professional dashboard.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          {/* Login Button */}
          <NavLink to="/login" className="btnPrimary">
            Login
          </NavLink>

          {/* Register Dropdown */}
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="btnOutline">
              Register
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              <li>
                <NavLink to="/register-hr">Register as HR</NavLink>
              </li>
              <li>
                <NavLink to="/register-employee">Register as Employee</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
