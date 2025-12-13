import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const COLORS = ["#4f46e5", "#22c55e"];

const AssetTypePieChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data: assetTypes = [] } = useQuery({
    queryKey: ["assetTypes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/asset-types");
      return res.data;
    },
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={assetTypes}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {assetTypes.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AssetTypePieChart;
