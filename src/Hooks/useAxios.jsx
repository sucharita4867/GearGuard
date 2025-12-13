import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxios = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor (JWT)
    const reqInterceptor = axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");

      console.log("🟡 TOKEN FROM LS:", token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("🟢 AUTH HEADER SET");
      }

      return config;
    });

    // Response interceptor
    const resInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error?.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          localStorage.removeItem("token");
          logOut().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [logOut, navigate]);

  return axiosInstance;
};

export default useAxios;
