import React from "react";
import Lottie from "lottie-react";
import Logo from "../../Components/Logo";
import registerAnimation from "../../assets/animations/register.json";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-base-200 shadow-2xl rounded-xl p-8">
        {/* ---- Animation Section ---- */}
        <div className="w-64 md:w-80">
          <Lottie animationData={registerAnimation} loop={true} />
        </div>
        {/* ---- Form Section ---- */}

        <div className="card bg-base-100 w-full max-w-sm">
          <div className="text-primary text-center ">
            <Logo />
          </div>
          <p className="text-center mb-4 text-primary text-base">
            Create an Account
          </p>
          <form onSubmit={handleSubmit(handleRegister)} className="card-body">
            <fieldset className="fieldset space-y-2">
              {/* name */}
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Name"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-600">Name is required</p>
                )}
              </div>
              {/* image */}
              <div>
                <label className="label">Photo</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input"
                  placeholder="Your Photo"
                />
                {errors.photo?.type === "required" && (
                  <p className="text-red-600">Photo is required</p>
                )}
              </div>
              {/* email */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-600">Email is required</p>
                )}
              </div>
              {/* password */}
              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
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
                    Password must be 6 characters or longer
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    password must have at least one uppercase, at least one
                    lowercase, at least one number, and at least one special
                    characters
                  </p>
                )}
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
