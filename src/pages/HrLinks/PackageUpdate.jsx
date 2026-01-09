import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import LoadingSpinner from "../../Components/LoadingSpinner";

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
  // console.log(packagesData);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleUpgrade = async (pkg) => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await axiosPublic.post("/create-checkout-session", {
        price: pkg.price,
        packageName: pkg.name,
        employeeLimit: pkg.employeeLimit,
        email: user?.email,
      });

      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gradient-to-b  from-indigo-50 to-white">
      <div className="w-11/12 mx-auto py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary">
            Upgrade Your Package
          </h1>
          <p className="text-gray-600 mt-3">
            Choose the best plan that fits your business needs
          </p>
        </motion.div>

        {/* Packages */}
        <div className="grid md:grid-cols-3 gap-8 ">
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
                <span className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 text-xs rounded-full shadow">
                  Most Popular
                </span>
              )}

              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {pkg.name}
              </h2>
              <p className="text-gray-600 mb-4">
                Employee Limit: {pkg.employeeLimit}
              </p>

              <p className="text-4xl font-bold text-[#1da03f] mb-6">
                ${pkg.price}
                <span className="text-lg text-gray-500">/mo</span>
              </p>

              <ul className="space-y-2 mb-6">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(pkg)}
                className={`w-full py-3 rounded-xl font-semibold transition-all shadow-lg ${
                  pkg.popular
                    ? "bg-secondary text-white hover:scale-[1.03]"
                    : "bg-secondary text-white hover:scale-[1.02]"
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
    </div>
  );
};

export default PackagesUpdate;
