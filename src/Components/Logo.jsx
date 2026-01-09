import React from "react";
import logoImg from "/logo.svg";
const Logo = () => {
  return (
    <div className="text-2xl  font-semibold gap-2  flex items-center">
      <img src={logoImg} className=" text-[#1da03f] " alt="" />
      <h3 className="hidden md:block lg:block">GearGuard</h3>
    </div>
  );
};

export default Logo;
