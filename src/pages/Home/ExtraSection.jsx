// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaUserShield, FaLaptopCode, FaCheckCircle } from "react-icons/fa";

const ExtraSection = () => {
  const steps = [
    {
      icon: <FaUserShield size={40} />,
      title: "Register",
      desc: "Sign up as HR or Employee to get started in seconds.",
    },
    {
      icon: <FaLaptopCode size={40} />,
      title: "Setup",
      desc: "HR adds assets and employees submit requests or get assigned.",
    },
    {
      icon: <FaCheckCircle size={40} />,
      title: "Manage",
      desc: "Track, approve, return, and monitor — all from one dashboard.",
    },
  ];

  return (
    <section className="w-full pb-10 mt-20">
      <div className="w-11/12 mx-auto text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800"
        >
          How It Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 mt-2 mb-14"
        >
          A simple and efficient process to manage company assets.
        </motion.p>

        {/* Steps Grid */}
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition cursor-pointer"
            >
              <div className="text-primary mb-4 flex justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraSection;
