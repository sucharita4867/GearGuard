import { ScaleLoader } from "react-spinners";

import React from "react";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      text-primary
      items-center `}
    >
      <ScaleLoader size={100} color="#1da03f" />
    </div>
  );
};

export default LoadingSpinner;
