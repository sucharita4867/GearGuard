import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useRole = () => {
  const { user } = useContext(AuthContext);

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email, // run query only if email exists
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/users/role/${user?.email}`
      );
      return res.data.role;
    },
  });

  return [role, isLoading];
};

export default useRole;
