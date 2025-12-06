import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  return (
    <div>
      <button className="btn w-full text-black outline-[#0d363c] outline-1">
        <FcGoogle className="size-6" />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
