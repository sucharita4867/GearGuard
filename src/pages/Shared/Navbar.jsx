import React, { useContext } from "react";
import Logo from "../../Components/Logo";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "LogOut Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/asset-list">Asset List</NavLink>
      </li>
      <li>
        <NavLink to="/asset-add"> Add Asset</NavLink>
      </li>
      <li>
        <NavLink to="/all-requests"> All Requests</NavLink>
      </li>
      <li>
        <NavLink to="/all-employee"> My Employee</NavLink>
      </li>
      <li>
        <NavLink to="/my-assets"> My Assets</NavLink>
      </li>
      <li>
        <NavLink to="/my-team"> My Team</NavLink>
      </li>
      <li>
        <NavLink to="/request-asset"> Request Asset</NavLink>
      </li>
    </>
  );

  return (
    <div className="w-full bg-primary">
      <div className="navbar text-white shadow-sm w-11/12 mx-auto">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black">
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            <Logo />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end gap-3">
          {!user && (
            <>
              <div className="dropdown dropdown-hover">
                <label className="btn btn-outline text-white border-white hover:bg-white hover:text-black">
                  Register
                </label>
                <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black">
                  <li>
                    <NavLink to="/register-hr">Register as HR</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register-employee">
                      Register as Employee
                    </NavLink>
                  </li>
                </ul>
              </div>

              <NavLink to="/login" className="btn btn-secondary text-white">
                Login
              </NavLink>
            </>
          )}

          {/* 👉 If USER logged in: Show Profile + Logout */}
          {user && (
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full border border-white">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/5xVqcD1/user.png"}
                    alt="user"
                  />
                </div>
              </div>

              <button
                onClick={handleLogOut}
                className="btn btn-secondary text-white hover:bg-[#1da040d6]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
