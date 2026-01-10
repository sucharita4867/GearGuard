import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="w-11/12 mx-auto py-10">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Contact Us
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Have questions about asset management or need support? Reach out to us
          and our team will get back to you shortly.
        </p>
      </motion.div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">
              Get in Touch
            </h3>
            <p className="text-gray-600">
              We’re here to help you manage your company assets efficiently.
              Feel free to contact us anytime.
            </p>
          </div>

          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              support@gearguard.com
            </p>
            <p>
              <span className="font-semibold">Phone:</span> +91 98765 43210
            </p>
            <p>
              <span className="font-semibold">Address:</span> Kolkata, India
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-xl shadow-lg space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          <button type="submit" className="btnPrimary w-full">
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
