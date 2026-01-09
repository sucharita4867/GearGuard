import React, { useContext } from "react";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/animations/register.json";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import { saveOrUpdateUser } from "../../utils";

const EmployeeRegister = () => {
  const { registerUser, setUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const { dob, password, email, name } = data;
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMG_BB_API_KEY
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          saveOrUpdateUser({
            role: "Employee",
            name,
            email,
            password,
            dob,
            image: res.data.data.url,
          });

          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile update done");
            })
            .catch((error) => {
              console.log(error);
            });
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Employee registred Successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        setUser();
        // console.log
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something register wrong!",
        });
      });
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
          <p className="text-center mb-4 text-primary text-xl font-semibold mt-2">
            Employee Create an Account
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
              {/* Date of Birth */}
              <div>
                <label className="label">Date of Birth</label>
                <input
                  type="date"
                  {...register("dob", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.dob?.type === "required" && (
                  <p className="text-red-600">Date of Birth is required</p>
                )}
              </div>

              <button className="btnPrimary w-full mt-1">Register</button>
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

export default EmployeeRegister;
