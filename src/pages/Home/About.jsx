import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  LuShieldCheck,
  LuUsers,
  LuLayoutDashboard,
  LuLayers,
} from "react-icons/lu";

const About = () => {
  return (
    <section className="w-11/12 mx-auto py-10 grid md:grid-cols-2 gap-10 items-center">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=60"
          alt="Corporate Team"
          className="rounded-xl shadow-lg w-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Why Choose <span className="text-primary">GearGuard?</span>
        </h2>

        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
          GearGuard provides a seamless solution for companies to monitor,
          assign, and manage organizational assets with complete transparency
          and automation — saving time and reducing errors.
        </p>

        {/* Benefit List */}
        <div className="space-y-4">
          {[
            {
              icon: <LuShieldCheck size={28} />,
              text: "Prevent asset loss & increase accountability",
            },
            {
              icon: <LuLayoutDashboard size={28} />,
              text: "Streamlined request & approval workflow",
            },
            {
              icon: <LuLayers size={28} />,
              text: "Centralized asset tracking dashboard",
            },
            {
              icon: <LuUsers size={28} />,
              text: "Supports multiple company affiliations",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-3 items-center"
            >
              <span className="text-primary">{item.icon}</span>
              <p className="text-gray-700 text-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
