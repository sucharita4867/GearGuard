import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxios from "./useAxios";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxios();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return [role, isLoading];
};

export default useRole;
