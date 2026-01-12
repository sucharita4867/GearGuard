import React, { useContext } from "react";
import Lottie from "lottie-react";
import Logo from "../../Components/Logo";
import registerAnimation from "../../assets/animations/register.json";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import { saveOrUpdateUser } from "../../utils";

const HrRegister = () => {
  const { registerUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const { email, name, companyName, password, dob } = data;
    // console.log(email, name, companyName, photoURl, password, dateOfBirth);
    const profileImg = data.companyLogo[0];
    console.log(profileImg);

    // console.log(data);
    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMG_BB_API_KEY
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURl = res.data.data.url;
          // create user in database
          saveOrUpdateUser({
            role: "Hr",
            email,
            name,
            companyName,
            companyLogo: photoURl,
            password,
            dob,
          });

          const userProfile = {
            displayName: data.name,
            photoURL: photoURl,
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
          title: "HR registred Successfull",
          showConfirmButton: false,
          timer: 1500,
        });
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
          <p className="text-center text-primary text-xl mt-2">
            HR Create an Account
          </p>
          <form onSubmit={handleSubmit(handleRegister)} className="card-body">
            <fieldset className="fieldset space-y-1">
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
              {/* Company Name */}
              <div>
                <label className="label">Company Name</label>
                <input
                  type="text"
                  {...register("companyName", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Company Name"
                />
                {errors.companyName?.type === "required" && (
                  <p className="text-red-600">Company Name is required</p>
                )}
              </div>
              {/* companyLogo */}
              <div>
                <label className="label">companyLogo</label>
                <input
                  type="file"
                  {...register("companyLogo", { required: true })}
                  className="file-input"
                  placeholder="companyLogo"
                />
                {errors.companyLogo?.type === "required" && (
                  <p className="text-red-600">companyLogo is required</p>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default HrRegister;
