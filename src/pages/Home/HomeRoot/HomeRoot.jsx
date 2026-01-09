import React from "react";
import Banner from "../Banner";
import About from "../About";
// import Packages from "../Packages ";
import Features from "../Features";
import Testimonials from "../Testimonials";
import ExtraSection from "../ExtraSection";
import FAQ from "../FAQ";
import FinalCTA from "../FinalCTA";
import PackagesUpdate from "../../HrLinks/PackageUpdate";

const HomeRoot = () => {
  return (
    <div className="bg-[#E3FFCC] roboto">
      <Banner />
      {/* <About /> */}
      <PackagesUpdate />
      <Features />
      <Testimonials />
      <ExtraSection />
      {/* <FAQ /> */}
      <FinalCTA />
    </div>
  );
};

export default HomeRoot;
