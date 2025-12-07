const Packages = () => {
  const packages = [
    {
      name: "Basic",
      employeeLimit: 5,
      price: 5,
      features: ["Asset Tracking", "Employee Management", "Basic Support"],
    },
    {
      name: "Standard",
      employeeLimit: 10,
      price: 8,
      features: [
        "All Basic features",
        "Advanced Analytics",
        "Priority Support",
      ],
    },
    {
      name: "Premium",
      employeeLimit: 20,
      price: 15,
      features: ["All Standard features", "Custom Branding", "24/7 Support"],
    },
  ];

  return (
    <section className=" pb-20 text-center">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
        Choose Your Plan
      </h2>
      <p className="text-gray-600 mt-2 mb-10">
        Flexible subscription options for every company size.
      </p>

      {/* Pricing Cards */}
      <div className="grid gap-10 md:grid-cols-3">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-md p-6 bg-white hover:shadow-xl transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-primary mb-3">
              {pkg.name}
            </h3>
            <p className="text-gray-600">
              Supports <b>{pkg.employeeLimit}</b> employees
            </p>

            <p className="text-4xl font-bold my-5 text-gray-800">
              ${pkg.price}
              <span className="text-sm text-gray-500">/mo</span>
            </p>

            <ul className="text-gray-600 space-y-2 mb-5">
              {pkg.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>

            <button className="btn btn-secondary w-full">Select Plan</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
