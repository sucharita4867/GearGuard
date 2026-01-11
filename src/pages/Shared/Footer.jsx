import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router";
import Logo from "../../Components/Logo";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="w-11/12 mx-auto py-14 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div>
          <Logo />
          <p className="mt-4 text-sm text-white/80 leading-relaxed">
            GearGuard is a smart corporate asset management system that helps
            organizations manage assets, employees, and requests efficiently.
          </p>

          <div className="mt-4 text-sm text-white/80">
            <p>📞 +91 98765 43210</p>
            <p>📩 support@gearguard.com</p>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <NavLink to="/" className="hover:underline">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/aboutPage" className="hover:underline">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className="hover:underline">
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="hover:underline">
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <NavLink to="/login" className="hover:underline">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register-hr" className="hover:underline">
                Register as HR
              </NavLink>
            </li>
            <li>
              <NavLink to="/register-employee" className="hover:underline">
                Register as Employee
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="flex gap-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/sucharita-sardar-4866092b8/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/SucharitaS88285"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-5 text-center text-sm text-white/70">
        © {new Date().getFullYear()} GearGuard. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
