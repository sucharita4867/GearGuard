import React, { useContext } from "react";
import Lottie from "lottie-react";
import Logo from "../../Components/Logo";
import loginAnimation from "../../assets/animations/login.json";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      await signIn(data.email, data.password);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-base-200 shadow-2xl rounded-xl p-8">
        {/* ---- Animation Section ---- */}
        <div className="w-64 md:w-80">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>

        {/* ---- Form Section ---- */}
        <div className="card bg-base-100 w-full max-w-sm">
          <form onSubmit={handleSubmit(handleLogin)} className="card-body">
            <div className="text-primary text-center">
              <Logo />
            </div>
            <p className="text-center mb-4 text-primary text-base">
              Login to continue
            </p>

            <fieldset className="fieldset space-y-3">
              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  {...register("email", { required: true })}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-600">Email is required</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,}$/,
                  })}
                  className="input input-bordered w-full"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">
                    Password must be at least 8 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must include uppercase, lowercase, number, and
                    special character
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link className="link text-sm" to="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button className=" btnPrimary w-full mt-1">Login</button>
            </fieldset>

            <p className="text-start text-sm mt-2">
              New to GearGuard?
              <Link
                className="text-blue-700 font-medium underline ml-1"
                to="/register-hr"
              >
                HR Register
              </Link>
              {" | "}
              <Link
                className="text-blue-700 font-medium underline"
                to="/register-employee"
              >
                Employee Register
              </Link>
            </p>

            <h2 className="text-center mt-3">OR</h2>
            <SocialLogin />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
