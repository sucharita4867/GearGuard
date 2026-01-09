import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  return (
    <div>
      <button className=" w-full btnOutline flex items-center justify-center gap-2">
        <FcGoogle className="size-6" />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
