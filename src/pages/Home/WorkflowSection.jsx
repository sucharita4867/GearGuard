import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const WorkflowSection = () => {
  const steps = [
    {
      step: "01",
      title: "Create Account",
      desc: "Register as HR or Employee to access the asset management system.",
    },
    {
      step: "02",
      title: "Manage or Request Assets",
      desc: "HR manages assets, employees request assets based on their needs.",
    },
    {
      step: "03",
      title: "Approval Process",
      desc: "HR reviews requests and approves or rejects with full control.",
    },
    {
      step: "04",
      title: "Monitor & Analyze",
      desc: "Track asset usage, history, and performance with analytics.",
    },
  ];

  return (
    <section className="w-11/12 mx-auto py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Our Simple Workflow
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          From onboarding to analytics — everything is structured for
          efficiency.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative border-l-2 border-primary/30 pl-8 space-y-12">
        {steps.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Dot */}
            <span className="absolute -left-[38px] top-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {item.step}
            </span>

            {/* Content */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WorkflowSection;
