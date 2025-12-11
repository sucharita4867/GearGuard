import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const PackagesUpdate = () => {
  const axiosPublic = useAxios();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const { data: packagesData = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosPublic.get("/packages");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleUpgrade = async (pkg) => {
    if (loading) return; 

    setLoading(true);

    try {
      const res = await axiosPublic.post("/create-checkout-session", {
        price: pkg.price,
        packageName: pkg.name,
        employeeLimit: pkg.employeeLimit,
        email: user.email,
      });

      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //   {
  //     name: "Basic",
  //     employeeLimit: 5,
  //     price: 5,
  //     features: ["Asset Tracking", "Employee Management", "Basic Support"],
  //     popular: false,
  //   },
  //   {
  //     name: "Standard",
  //     employeeLimit: 10,
  //     price: 12,
  //     features: [
  //       "All Basic features",
  //       "Team Collaboration",
  //       "Company Branding",
  //     ],
  //     popular: true,
  //   },
  //   {
  //     name: "Premium",
  //     employeeLimit: 20,
  //     price: 20,
  //     features: [
  //       "All Standard features",
  //       "Advanced Reporting",
  //       "Priority Support",
  //     ],
  //     popular: false,
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800">
          Upgrade Your Package
        </h1>
        <p className="text-gray-600 mt-3">
          Choose the best plan that fits your business needs
        </p>
      </motion.div>

      {/* Packages */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {packagesData.map((pkg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className={`relative bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-6 border ${
              pkg.popular
                ? "border-purple-400 shadow-purple-200 scale-[1.02]"
                : "border-indigo-100"
            }`}
          >
            {/* Popular Badge */}
            {pkg.popular && (
              <span className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 text-xs rounded-full shadow">
                Most Popular
              </span>
            )}

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {pkg.name}
            </h2>
            <p className="text-gray-600 mb-4">
              Employee Limit: {pkg.employeeLimit}
            </p>

            <p className="text-4xl font-bold text-indigo-600 mb-6">
              ${pkg.price}
              <span className="text-lg text-gray-500">/mo</span>
            </p>

            <ul className="space-y-2 mb-6">
              {pkg.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleUpgrade(pkg)}
              className={`w-full py-3 rounded-xl font-semibold transition-all shadow-lg ${
                pkg.popular
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-[1.03]"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-[1.02]"
              }`}
            >
              Upgrade Now
            </button>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-gray-500 mt-10 text-sm">
        *Upgrade now to unlock higher limits and exclusive features.
      </p>
    </div>
  );
};

export default PackagesUpdate;
