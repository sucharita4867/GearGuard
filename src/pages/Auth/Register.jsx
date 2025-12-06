import React from "react";
import Lottie from "lottie-react";
import Logo from "../../Components/Logo";
import registerAnimation from "../../assets/animations/register.json";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-base-200 shadow-2xl rounded-xl p-8">
        {/* ---- Animation Section ---- */}

        <div className="w-64 md:w-80">
          <Lottie animationData={registerAnimation} loop={true} />
        </div>

        {/* ---- Form Section ---- */}

        <div className="card bg-base-100 w-full max-w-sm">
          <form className="card-body">
            <div className="text-primary text-center ">
              <Logo />
            </div>
            <p className="text-center mb-4 text-primary text-base">
              Create an Account
            </p>

            <fieldset className="fieldset space-y-2">
              {/* name */}
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Name"
                />
              </div>
              {/* image */}
              <div>
                <label className="label">Name</label>
                <input
                  type="file"
                  // {...register("photo", { required: true })}
                  className="file-input"
                  placeholder="Your Photo"
                />
              </div>
              {/* email */}
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

              <button className="btn p-6 hover:bg-[#1da040d6] bg-secondary text-white w-full mt-1">
                Register
              </button>
            </fieldset>

            <p className="text-start text-sm ">
              Already have an account{" "}
              <span className="text-blue-700 font-medium underline cursor-pointer">
                <Link to="/login">Login</Link>
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

export default Register;
