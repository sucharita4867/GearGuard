import {
  LuShieldCheck,
  LuUsers,
  LuLayoutDashboard,
  LuLayers,
} from "react-icons/lu";

const About = () => {
  return (
    <section className=" py-20 grid md:grid-cols-2 gap-10 items-center">
      {/* Image */}
      <div>
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=60"
          alt="Corporate Team"
          className="rounded-xl shadow-lg w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Why Choose <span className="text-primary">GearGuard?</span>
        </h2>

        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
          GearGuard provides a seamless solution for companies to monitor,
          assign, and manage organizational assets with complete transparency
          and automation — saving time and reducing errors.
        </p>

        {/* Benefit List */}
        <div className="space-y-4">
          <div className="flex gap-3 items-center">
            <LuShieldCheck size={28} className="text-primary" />
            <p className="text-gray-700 text-lg">
              Prevent asset loss & increase accountability
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <LuLayoutDashboard size={28} className="text-primary" />
            <p className="text-gray-700 text-lg">
              Streamlined request & approval workflow
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <LuLayers size={28} className="text-primary" />
            <p className="text-gray-700 text-lg">
              Centralized asset tracking dashboard
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <LuUsers size={28} className="text-primary" />
            <p className="text-gray-700 text-lg">
              Supports multiple company affiliations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
