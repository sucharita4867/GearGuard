// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Packages = () => {
  const packages = [
    {
      name: "Basic",
      employeeLimit: 5,
      price: 5,
      features: ["Asset Tracking", "Employee Management", "Basic Support"],
    },
    {
      name: "Standard",
      employeeLimit: 10,
      price: 8,
      features: [
        "All Basic features",
        "Advanced Analytics",
        "Priority Support",
      ],
    },
    {
      name: "Premium",
      employeeLimit: 20,
      price: 15,
      features: ["All Standard features", "Custom Branding", "24/7 Support"],
    },
  ];

  return (
    <section className="pb-20 text-center w-11/12 mx-auto">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-primary"
      >
        Choose Your Plan
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-600 mt-2 mb-10"
      >
        Flexible subscription options for every company size.
      </motion.p>

      {/* Animated Cards */}
      <div className="grid gap-10 md:grid-cols-3">
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.25 }}
            whileHover={{ scale: 1.06, translateY: -5 }}
            className="border rounded-xl shadow-lg p-6 bg-white cursor-pointer hover:shadow-2xl transition-all duration-300"
          >
            {/* Name */}
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-semibold text-primary mb-3"
            >
              {pkg.name}
            </motion.h3>

            <p className="text-gray-600">
              Supports <b>{pkg.employeeLimit}</b> employees
            </p>

            {/* Price */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold my-5 text-gray-800"
            >
              ${pkg.price}
              <span className="text-sm text-gray-500">/mo</span>
            </motion.p>

            <ul className="text-gray-600 space-y-2 mb-5">
              {pkg.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                >
                  ✔ {feature}
                </motion.li>
              ))}
            </ul>

            {/* Button with soft pulse */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              animate={{
                boxShadow: [
                  "0px 0px 0px rgba(0,0,0,0.2)",
                  "0px 0px 10px rgba(0,0,0,0.2)",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                repeatType: "reverse",
              }}
              className="btn btn-secondary w-full"
            >
              Select Plan
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
