import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const TopRequestedBarChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data: topAssets = [] } = useQuery({
    queryKey: ["topRequested"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/top-requested");
      return res.data;
    },
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={topAssets}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopRequestedBarChart;
