// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { NavLink } from "react-router";

const FinalCTA = () => {
  return (
    <section className="w-full bg-[#f1faff] py-20 text-center text-primary">
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold"
      >
        Ready to Manage Your Company Assets Smarter?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 mt-4 mb-8 text-lg"
      >
        Join GearGuard today and transform your organizational efficiency.
      </motion.p>

      <motion.div whileHover={{ scale: 1.08 }}>
        <NavLink
          to="/login"
          className="btn bg-secondary text-white  font-semibold border-none"
        >
          Get Started Now
        </NavLink>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
