import Lottie from "lottie-react";
import loadingAnim from "../assets/animations/loadingThisProject.json";
// import loadingAnim from "../assets/animations/loading.json";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-40">
        <Lottie animationData={loadingAnim} loop={true} />
      </div>
      {/* <p className="mt-4 text-primary font-semibold text-lg animate-pulse">
        Securing Your Dashboard...
      </p> */}
    </div>
  );
};

export default Loading;
