import AssetTypePieChart from "../HrLinks/AssetTypePieChart";
import TopRequestedBarChart from "../HrLinks/TopRequestedBarChart";

const Recharts = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-6">
        HR Analytics Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">
            Asset Type Distribution
          </h3>
          <AssetTypePieChart />
        </div>

        {/* Bar */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Top 5 Requested Assets</h3>
          <TopRequestedBarChart />
        </div>
      </div>
    </div>
  );
};

export default Recharts;
