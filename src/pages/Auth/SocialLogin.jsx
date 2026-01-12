import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Context/AuthProvider";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Google Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full btnOutline flex items-center justify-center gap-2"
      >
        <FcGoogle className="size-6" />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
