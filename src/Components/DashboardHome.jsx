const DashboardHome = () => {
  return (
    <div className="text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Issues</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">24</p>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">My Issues</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">8</p>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Contributions</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">12</p>
        </div>
      </div>

      {/* Placeholder for charts */}
      <div className="mt-10 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
        <p className="text-zinc-500">(Dynamic chart will be added here)</p>
      </div>
    </div>
  );
};

export default DashboardHome;
