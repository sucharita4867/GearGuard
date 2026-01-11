import useRole from "../Hooks/useRole";
import AssetTypePieChart from "../pages/HrLinks/AssetTypePieChart";
import TopRequestedBarChart from "../pages/HrLinks/TopRequestedBarChart";
const DashboardHome = () => {
  const [role] = useRole();

  return (
    <div className="text-black dark:text-white w-11/12 mx-auto my-10 ">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Dashboard Overview
      </h1>
      {/* ================= COMMON OVERVIEW CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-zinc-500 font-semibold">Total Assets</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">120</p>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-zinc-500 font-semibold">
            Total Requests
          </h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">86</p>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-zinc-500 font-semibold">
            Pending Requests
          </h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">14</p>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
          <h3 className="text-sm text-zinc-500 font-semibold">Employees</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">32</p>
        </div>
      </div>
      {/* ================= HR DASHBOARD ================= */}
      {role === "Hr" && (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Top Requested Assets</h2>
            <TopRequestedBarChart />
          </div>

          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">
              Monthly Requests Overview
            </h2>
            <AssetTypePieChart />
          </div>
        </div>
      )}
      {/* ================= EMPLOYEE DASHBOARD ================= */}
      {role === "Employee" && (
        <div className="mt-10 space-y-8">
          {/* ===== Employee Overview Cards ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow">
              <p className="text-sm text-zinc-500">My Assets</p>
              <h3 className="text-2xl font-bold text-blue-500 mt-1">6</h3>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow">
              <p className="text-sm text-zinc-500">Pending Requests</p>
              <h3 className="text-2xl font-bold text-yellow-500 mt-1">2</h3>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow">
              <p className="text-sm text-zinc-500">Approved Assets</p>
              <h3 className="text-2xl font-bold text-green-500 mt-1">4</h3>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow">
              <p className="text-sm text-zinc-500">Rejected Requests</p>
              <h3 className="text-2xl font-bold text-red-500 mt-1">1</h3>
            </div>
          </div>

          {/* ===== Recent Activity Section ===== */}
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>Laptop request submitted</span>
                <span className="text-zinc-500">2 days ago</span>
              </li>
              <li className="flex justify-between">
                <span>Headphone request approved</span>
                <span className="text-zinc-500">5 days ago</span>
              </li>
              <li className="flex justify-between">
                <span>Mouse assigned</span>
                <span className="text-zinc-500">1 week ago</span>
              </li>
            </ul>
          </div>

          {/* ===== Assets Table Preview ===== */}
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">My Assets</h2>

            <div className="overflow-x-auto">
              <table className="table w-full text-sm">
                <thead>
                  <tr className="text-zinc-500">
                    <th>Asset</th>
                    <th>Status</th>
                    <th>Assigned Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Laptop</td>
                    <td className="text-green-500 font-semibold">Approved</td>
                    <td>12 Jan 2026</td>
                  </tr>
                  <tr>
                    <td>Headphone</td>
                    <td className="text-yellow-500 font-semibold">Pending</td>
                    <td>18 Jan 2026</td>
                  </tr>
                  <tr>
                    <td>Mouse</td>
                    <td className="text-green-500 font-semibold">Approved</td>
                    <td>05 Jan 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
