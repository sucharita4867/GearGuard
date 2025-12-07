import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router";
import Logo from "../../Components/Logo";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="w-11/12 mx-auto grid md:grid-cols-3 gap-10">
        {/* Brand & Details */}
        <div>
          <Logo />
          <p className="mt-3 text-sm text-white/80">
            Smart Corporate Asset Management System.
            <br /> Secure, Scalable & Efficient.
          </p>

          <p className="mt-4 text-white/80 text-sm">
            📞 +91 98765 43210 <br />
            📩 support@gearguard.com
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <NavLink to="/" className="hover:underline">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="hover:underline">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="register-hr" className="hover:underline">
                Join as HR
              </NavLink>
            </li>
            <li>
              <NavLink to="register-employee" className="hover:underline">
                Join as Employee
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="flex gap-5 text-xl">
            <FaFacebook className="cursor-pointer hover:text-gray-200" />
            <FaLinkedin className="cursor-pointer hover:text-gray-200" />
            <FaInstagram className="cursor-pointer hover:text-gray-200" />
            <FaTwitter className="cursor-pointer hover:text-gray-200" />
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-white/80">
        © {new Date().getFullYear()} GearGuard — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
