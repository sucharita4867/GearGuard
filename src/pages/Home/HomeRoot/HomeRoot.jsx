import React from "react";
import Banner from "../Banner";
import About from "../About";
import Packages from "../Packages ";
import Features from "../Features";
import Testimonials from "../Testimonials";
import ExtraSection from "../ExtraSection";
import FAQ from "../FAQ";
import FinalCTA from "../FinalCTA";
import PackagesUpdate from "../../HrLinks/PackageUpdate";
import FAQPreview from "../FAQPreview";
import WorkflowSection from "../WorkflowSection";
import RoleOverview from "../RoleOverview";

const HomeRoot = () => {
  return (
    <div className=" roboto">
      <Banner />
      <About />
      <WorkflowSection />
      <PackagesUpdate />
      <Features />
      <RoleOverview />
      <Testimonials />
      <ExtraSection />
      <FAQPreview />
      <FinalCTA />
    </div>
  );
};

export default HomeRoot;
