import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const TopRequestedBarChart = () => {
  const axiosPublic = useAxios();

  const { data: topAssets = [] } = useQuery({
    queryKey: ["topRequested"],
    queryFn: async () => {
      const res = await axiosPublic.get("/analytics/top-requested");
      return res.data;
    },
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={topAssets}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#1a8f40" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopRequestedBarChart;
