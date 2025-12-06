import React from "react";
import Lottie from "lottie-react";
import Logo from "../../Components/Logo";
import loginAnimation from "../../assets/animations/login.json";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-base-200 shadow-2xl rounded-xl p-8">
        {/* ---- Animation Section ---- */}

        <div className="w-64 md:w-80">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>

        {/* ---- Form Section ---- */}

        <div className="card bg-base-100 w-full max-w-sm">
          <form className="card-body">
            <div className="text-primary text-center border ">
              <Logo />
            </div>
            {/* <h2 className="text-3xl font-bold text-center">Welcome Back 👋</h2> */}
            <p className="text-center mb-4 text-primary text-base">
              Login to continue
            </p>

            <fieldset className="fieldset space-y-3">
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                />
              </div>

              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                />
              </div>

              <div className="text-right">
                <a className="link text-sm">Forgot password?</a>
              </div>

              <button className="btn p-6 hover:bg-[#1da040d6] bg-secondary text-white w-full mt-1">
                Login
              </button>
            </fieldset>

            <p className="text-start text-sm ">
              New to GearGuard{" "}
              <span className="text-blue-700 font-medium underline cursor-pointer">
                <Link to="/register">Register</Link>
              </span>
            </p>
            <h2 className="text-center ">OR</h2>
            <SocialLogin />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
