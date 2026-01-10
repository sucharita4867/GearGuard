import React, { useContext } from "react";
import Logo from "../../Components/Logo";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import useRole from "../../Hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [role] = useRole();

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

  const employeeLinks = (
    <>
      <li>
        <NavLink
          to="/my-assets"
          className={({ isActive }) =>
            isActive ? "text-secondary font-semibold" : "text-white"
          }
        >
          My Assets
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-team"
          className={({ isActive }) =>
            isActive ? "text-secondary font-semibold" : "text-white"
          }
        >
          My Team
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/request-asset"
          className={({ isActive }) =>
            isActive ? "text-secondary font-semibold" : "text-white"
          }
        >
          Request Asset
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full h-16 z-50 bg-primary ">
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
            <ul className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow  text-black">
              <li className="text-black">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-secondary font-semibold" : "text-white"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="text-black">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-secondary font-semibold" : "text-white"
                  }
                >
                  About
                </NavLink>
              </li>
              <li className="text-black">
                <NavLink
                  to="/faq"
                  className={({ isActive }) =>
                    isActive ? "text-secondary font-semibold" : "text-white"
                  }
                >
                  FAQ
                </NavLink>
              </li>
              <li className="text-black">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "text-secondary font-semibold" : "text-white"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              {/* {role === "Hr" && hrLinks} */}
              {role === "Employee" && employeeLinks}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            <Logo />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="about">About</NavLink>
            </li>
            <li>
              <NavLink to="faq">FAQ</NavLink>
            </li>
            <li>
              <NavLink to="dashboard">Dashboard</NavLink>
            </li>
            {/* {role === "Hr" && hrLinks} */}
            {role === "Employee" && employeeLinks}
          </ul>
        </div>

        <div className="navbar-end gap-3">
          {!user && (
            <div className="flex items-center gap-2">
              <div className="dropdown dropdown-hover">
                <label className="btnOutline">Register</label>
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

              <NavLink to="/login" className="btnPrimary text-white">
                Login
              </NavLink>
            </div>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar">
                  <div className="w-10 rounded-full border border-white cursor-pointer">
                    <img src={user?.photoURL} alt="user" />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 text-black"
                >
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>

                  {role === "Hr" && (
                    <li>
                      <NavLink to="/recharts">Analytics</NavLink>
                    </li>
                  )}
                </ul>
              </div>

              <button onClick={handleLogOut} className="btnPrimary">
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
