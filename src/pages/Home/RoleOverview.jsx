import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  LuShieldCheck,
  LuClipboardList,
  LuUsers,
  LuSend,
  LuBox,
  LuActivity,
} from "react-icons/lu";

const RoleOverview = () => {
  return (
    <section className="w-11/12 mx-auto py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Built for Every Role
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          GearGuard provides powerful tools for both HR managers and employees —
          each role gets exactly what they need.
        </p>
      </motion.div>

      {/* Role Cards */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* HR Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-primary"
        >
          <h3 className="text-2xl font-bold mb-6 text-primary">HR Dashboard</h3>

          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <LuBox className="text-primary" size={22} />
              <span>Manage all company assets</span>
            </li>

            <li className="flex items-center gap-3">
              <LuClipboardList className="text-primary" size={22} />
              <span>Approve or reject asset requests</span>
            </li>

            <li className="flex items-center gap-3">
              <LuUsers className="text-primary" size={22} />
              <span>View & manage employees</span>
            </li>

            <li className="flex items-center gap-3">
              <LuShieldCheck className="text-primary" size={22} />
              <span>Maintain accountability & security</span>
            </li>

            <li className="flex items-center gap-3">
              <LuActivity className="text-primary" size={22} />
              <span>Track usage & analytics</span>
            </li>
          </ul>
        </motion.div>

        {/* Employee Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-secondary"
        >
          <h3 className="text-2xl font-bold mb-6 text-secondary">
            Employee Dashboard
          </h3>

          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <LuSend className="text-secondary" size={22} />
              <span>Request assets easily</span>
            </li>

            <li className="flex items-center gap-3">
              <LuClipboardList className="text-secondary" size={22} />
              <span>Track request status</span>
            </li>

            <li className="flex items-center gap-3">
              <LuBox className="text-secondary" size={22} />
              <span>View assigned assets</span>
            </li>

            <li className="flex items-center gap-3">
              <LuUsers className="text-secondary" size={22} />
              <span>See team members</span>
            </li>

            <li className="flex items-center gap-3">
              <LuActivity className="text-secondary" size={22} />
              <span>Transparent & simple workflow</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default RoleOverview;
