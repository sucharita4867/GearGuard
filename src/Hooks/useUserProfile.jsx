import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxios from "./useAxios";

const useUserProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxios();

  return useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/${user.email}`);
      return res.data;
    },
  });
};

export default useUserProfile;
