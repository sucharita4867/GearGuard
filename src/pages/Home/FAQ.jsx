import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "Do I need to be an HR to manage assets?",
      a: "Only HR has full control. Employees can only request and view their assigned assets.",
    },
    {
      q: "Can employees work with multiple companies?",
      a: "Yes, employees can belong to more than one organization at the same time.",
    },
    {
      q: "Can I upgrade later?",
      a: "Yes. HR managers can upgrade anytime via Stripe secure payment.",
    },
    {
      q: "Is my data secure?",
      a: "Yes. Your data is encrypted, protected, and stored securely in cloud infrastructure.",
    },
  ];

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className="w-11/12 mx-auto py-20">
      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl text-center font-bold text-primary mb-10"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="border rounded-lg p-5 bg-white shadow-md hover:shadow-lg cursor-pointer transition"
            onClick={() => toggle(i)}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-700 text-lg">{item.q}</p>
              <span className="text-primary text-xl">
                {open === i ? "-" : "+"}
              </span>
            </div>

            {open === i && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600 mt-3"
              >
                {item.a}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
