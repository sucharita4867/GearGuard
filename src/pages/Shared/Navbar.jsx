import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
// import useRole from "../../Hooks/useRole";
import Logo from "../../Components/Logo";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ onMenuClick = () => {} }) => {
  const { user, logOut } = useContext(AuthContext);
  // const [role] = useRole();
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogout = () => {
    logOut().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logout Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  const navClass = ({ isActive }) =>
    isActive
      ? "text-secondary font-semibold border-b-2 border-secondary"
      : "text-white hover:text-secondary";

  const publicLinks = (
    <>
      <li>
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/aboutPage" className={navClass}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={navClass}>
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/faq" className={navClass}>
          FAQ
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-primary z-50">
      <div className="navbar w-11/12 mx-auto text-white">
        {/* LEFT */}
        <div className="navbar-start gap-2">
          {isDashboard && user && (
            <button
              onClick={onMenuClick}
              className="btn btn-ghost md:hidden text-xl"
            >
              ☰
            </button>
          )}

          {!isDashboard && (
            <div className="dropdown">
              <button tabIndex={0} className="btn btn-ghost lg:hidden text-xl">
                ☰
              </button>
              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black z-[9999]">
                {publicLinks}
                {user && (
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                )}
              </ul>
            </div>
          )}

          <Link to="/" className=" text-xl">
            <Logo />
          </Link>
        </div>

        {/* CENTER */}
        {!isDashboard && (
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-6">
              {publicLinks}
              {user && (
                <li>
                  <NavLink to="/dashboard" className={navClass}>
                    Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* RIGHT */}
        <div className="navbar-end gap-3">
          {!user ? (
            <>
              <NavLink to="/login" className="btnPrimary">
                Login
              </NavLink>
              <NavLink to="/register-hr" className="btnOutline">
                Register
              </NavLink>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar cursor-pointer">
                <div className="w-10 rounded-full border border-white">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="user" />
                  ) : (
                    <FaUserCircle className="w-full h-full text-secondary" />
                  )}
                </div>
              </div>

              <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black z-[9999]">
                <li className="btnPrimary btn btn-sm">
                  <NavLink to="/dashboard/profile">Profile</NavLink>
                </li>

                {/* {role === "Hr" && (
                 
                )} */}

                <li>
                  <button
                    onClick={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
                    className="btn btn-sm btnOutline mt-2"
                  >
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                  </button>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btnPrimary mt-2"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
