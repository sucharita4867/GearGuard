import React from "react";
import Lottie from "lottie-react";
import ErrorAnimation from "../../assets/animations/error.json";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="w-11/12 mx-auto min-h-screen flex justify-center items-center">
      <div className="my-8 flex p-6 flex-col justify-center items-center bg-white rounded-xl shadow-xl text-center max-w-lg">
        <div className="w-full max-w-xs">
          <Lottie animationData={ErrorAnimation} loop={true} />
        </div>

        <h1 className="text-4xl font-extrabold tracking-wide text-primary mt-4">
          404 - Page Not Found
        </h1>

        <p className="text-gray-600 text-md mt-3 leading-relaxed">
          Oops! The page you’re trying to access doesn’t exist or has been
          moved. It might be a broken link or a mistyped URL.
        </p>

        <p className="text-gray-500 mt-2 text-sm">
          Don’t worry — you can always go back to the home page and continue
          browsing.
        </p>

        <Link to="/" className="mt-5">
          <button className="btn bg-secondary hover:bg-[#1da040d6] text-white px-6">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
