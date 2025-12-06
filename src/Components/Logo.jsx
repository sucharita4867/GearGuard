import React from "react";
import logoImg from "../assets/logo.svg";
const Logo = () => {
  return (
    <div className="text-2xl  font-semibold  flex items-center">
      <img src={logoImg} className=" text-[#1da03f] " alt="" />
      <h3 className=" ">GearGuard</h3>
    </div>
  );
};

export default Logo;
