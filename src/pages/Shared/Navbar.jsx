import React, { useContext } from "react";
import Logo from "../../Components/Logo";
import { NavLink } from "react-router";
// import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "LogOut Successfull",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
    </>
  );
  return (
    <div className="w-full bg-primary">
      <div className="navbar  text-white shadow-sm w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <Logo />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-2">
          {/* Register Dropdown */}
          <div className="dropdown dropdown-hover">
            <label
              tabIndex={0}
              className="btn btn-outline text-white border-white hover:bg-white hover:text-black"
            >
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

          {/* Login Button */}
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-secondary text-white
               hover:bg-[#1da040d6] "
            >
              LogOut
            </button>
          ) : (
            <NavLink to="/login" className="btn btn-secondary text-white">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
