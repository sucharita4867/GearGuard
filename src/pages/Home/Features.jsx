// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { IoShieldCheckmark, IoAnalyticsSharp } from "react-icons/io5";
import { MdPeopleAlt, MdPayment } from "react-icons/md";

const Features = () => {
  const features = [
    {
      icon: <IoShieldCheckmark size={40} />,
      title: "Role-Based Access",
      desc: "Secure authentication allowing HR and employees to access personalized dashboards.",
    },
    {
      icon: <MdPeopleAlt size={40} />,
      title: "Smart Asset Workflow",
      desc: "Employees request assets and HR approves, assigns, or rejects instantly.",
    },
    {
      icon: <IoAnalyticsSharp size={40} />,
      title: "Real-Time Analytics",
      desc: "Monitor asset usage, requests, approvals and insights from the dashboard.",
    },
    {
      icon: <MdPayment size={40} />,
      title: "Stripe Subscription",
      desc: "Seamless package upgrade with secure online payment integration.",
    },
  ];

  return (
    <section className=" py-10 ">
      <div className="w-11/12 rounded-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-primary"
        >
          Powerful Features Built for Teams
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mt-2 mb-12"
        >
          Everything you need to manage company assets efficiently.
        </motion.p>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-xl transition cursor-pointer"
            >
              <div className="flex justify-center text-primary mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
