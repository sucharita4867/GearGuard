import React, { useState } from "react";
import { NavLink } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const FAQPreview = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is my data secure on GearGuard?",
      answer:
        "Yes. All data is encrypted and securely stored using modern cloud infrastructure.",
    },
    {
      question: "Do employees need HR permission to get assets?",
      answer:
        "Yes. Employees can request assets, but only HR managers can approve them.",
    },
    {
      question: "Can I upgrade my package later?",
      answer:
        "Absolutely. HR managers can upgrade or change their package anytime.",
    },
    {
      question: "Is GearGuard suitable for small teams?",
      answer:
        "Yes. GearGuard is scalable and works well for small teams and large companies.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-11/12 mx-auto py-10">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mt-3">
          Quick answers to common questions about GearGuard.
        </p>
      </motion.div>

      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.slice(0, 3).map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center p-5">
              <h3 className="text-base md:text-lg font-semibold text-gray-800">
                {faq.question}
              </h3>
              <span className="text-xl font-bold text-primary">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>

            {openIndex === index && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="px-5 pb-5 text-gray-600"
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <NavLink to="/faq" className="btnOutline">
          View All FAQs
        </NavLink>
      </div>
    </section>
  );
};

export default FAQPreview;
