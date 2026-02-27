import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  LuShieldCheck,
  LuUsers,
  LuLayoutDashboard,
  LuLayers,
} from "react-icons/lu";

const AboutPage = () => {
  return (
    <section className="w-11/12 mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          About GearGuard
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          GearGuard is a smart asset management platform designed to help
          organizations track, manage, and optimize their company assets with
          transparency and efficiency.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h2 className="text-2xl font-semibold text-primary">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to simplify asset management for modern companies by
            providing a centralized, secure, and role-based platform where HR
            managers and employees can collaborate seamlessly.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We focus on automation, accountability, and real-time insights to
            reduce asset loss and improve operational efficiency.
          </p>
        </motion.div>

        {/* Image */}
        <motion.img
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60"
          alt="Team collaboration"
          className="rounded-xl shadow-lg"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-primary text-center mb-8">
          Why Choose GearGuard?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <LuShieldCheck size={28} />,
              title: "Secure & Reliable",
              text: "Your data is encrypted and protected using modern security standards.",
            },
            {
              icon: <LuLayoutDashboard size={28} />,
              title: "Centralized Dashboard",
              text: "Manage all assets and requests from one powerful dashboard.",
            },
            {
              icon: <LuUsers size={28} />,
              title: "Role-Based Access",
              text: "Different access levels for HR managers and employees.",
            },
            {
              icon: <LuLayers size={28} />,
              title: "Scalable Solution",
              text: "Suitable for startups to large enterprises.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="text-primary mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center bg-primary text-white rounded-xl py-12 px-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold">
          Ready to manage assets smarter?
        </h2>
        <p className="mt-3 opacity-90">
          Join GearGuard today and experience a better way to manage company
          assets.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutPage;
