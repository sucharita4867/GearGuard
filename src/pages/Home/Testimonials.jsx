// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "TechHive Solutions",
      text: "GearGuard helped us streamline employee asset tracking and reduced asset loss by 40%.",
    },
    {
      name: "NexaWorks Pvt Ltd",
      text: "The approval workflow is fast and intuitive. Our HR team loves it!",
    },
    {
      name: "WaveCorp Digital",
      text: "The analytics dashboard gives us total visibility. Highly recommended!",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-[#f0faff] mt-20 py-10">
      <div className="w-11/12 mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-primary  "
        >
          Trusted by Growing Companies
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-gray-600 mt-2 mb-14"
        >
          See what other businesses think about GearGuard.
        </motion.p>

        {/* Testimonials Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              whileHover={{ scale: 1.04 }}
              className="p-6 bg-white/60 backdrop-blur-lg border rounded-xl shadow-sm hover:shadow-lg transition-all"
            >
              <FaQuoteLeft className="text-primary text-3xl mb-4" />

              <p className="text-gray-700 text-sm mb-5 leading-relaxed">
                “{item.text}”
              </p>

              <h4 className="text-lg font-semibold text-gray-900">
                — {item.name}
              </h4>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-3xl font-bold text-primary">100+</h3>
            <p className="text-gray-600 text-sm">Companies Onboarded</p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-3xl font-bold text-primary">5000+</h3>
            <p className="text-gray-600 text-sm">Assets Managed</p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-3xl font-bold text-primary">92%</h3>
            <p className="text-gray-600 text-sm">Approval Efficiency</p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-3xl font-bold text-primary">4.9⭐</h3>
            <p className="text-gray-600 text-sm">User Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
