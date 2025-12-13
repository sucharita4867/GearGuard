import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const COLORS = ["#0d343a", "#1a8f40"];

const AssetTypePieChart = () => {
  const axiosPublic = useAxios();

  const { data: assetTypes = [] } = useQuery({
    queryKey: ["assetTypes"],
    queryFn: async () => {
      const res = await axiosPublic.get("/analytics/asset-types");
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
