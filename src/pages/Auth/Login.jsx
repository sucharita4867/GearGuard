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
    setValue,
    formState: { errors },
  } = useForm();

  // ================= NORMAL LOGIN =================
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
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  // ================= DEMO EMPLOYEE LOGIN =================
  const handleDemoEmployeeLogin = async () => {
    const email = "riya@gmail.com";
    const password = "Rr@12345";

    setValue("email", email);
    setValue("password", password);

    try {
      await signIn(email, password);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Demo Employee Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Demo Employee Login Failed",
        text: error.message,
      });
    }
  };

  // ================= DEMO HR LOGIN =================
  const handleDemoHrLogin = async () => {
    const email = "sahil@gamil.com";
    const password = "Ss@12345";

    setValue("email", email);
    setValue("password", password);

    try {
      await signIn(email, password);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Demo HR Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Demo HR Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-base-200 shadow-2xl rounded-xl p-8">
        {/* ===== Animation ===== */}
        <div className="w-64 md:w-80">
          <Lottie animationData={loginAnimation} loop />
        </div>

        {/* ===== Form ===== */}
        <div className="card bg-base-100 w-full max-w-sm">
          <form onSubmit={handleSubmit(handleLogin)} className="card-body">
            <div className="text-primary text-center">
              <Logo />
            </div>

            <p className="text-center mb-4 text-primary">Login to continue</p>

            <fieldset className="fieldset space-y-3">
              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">Email is required</p>
                )}
              </div>
              {/* Password */}
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,}$/,
                  })}
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600 text-sm">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600 text-sm">
                    Minimum 8 characters required
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600 text-sm">
                    Must include uppercase, lowercase, number & special
                    character
                  </p>
                )}
              </div>
              {/* 
              
              {/* Login */}
              <button type="submit" className="btnPrimary w-full">
                Login
              </button>
              {/* Demo Buttons */}
              <button
                type="button"
                onClick={handleDemoEmployeeLogin}
                className="btn btn-outline btn-secondary w-full"
              >
                Demo Employee Login
              </button>
              <button
                type="button"
                onClick={handleDemoHrLogin}
                className="btn btn-outline btn-secondary w-full"
              >
                Demo HR Login
              </button>
            </fieldset>

            {/* Register */}
            <p className="text-sm mt-2">
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
