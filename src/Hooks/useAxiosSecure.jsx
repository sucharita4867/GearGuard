// import axios from "axios";
// import React, { useContext, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { AuthContext } from "../Context/AuthProvider";

// const axiosSecure = axios.create({
//   baseURL: "http://localhost:3000",
// });
// const useAxiosSecure = () => {
//   const { user, logOut } = useContext(AuthContext);
//   const navigate = useNavigate();
//   useEffect(() => {
//     // intercept request
//     // const reqInterceptor = axiosSecure.interceptors.request.use(
//     //   async (config) => {
//     //     if (user) {
//     //       const token = await user.getIdToken();
//     //       config.headers.Authorization = `Bearer ${token}`;
//     //     }
//     //     return config;
//     //   }
//     // );

//     const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
//       config.headers.Authorization = `Bearer ${user?.accessToken}`;
//       return config;
//     });
//     // interceptor response
//     const resInterceptor = axiosSecure.interceptors.response.use(
//       (response) => {
//         return response;
//       },
//       (error) => {
//         console.log(error);
//         const statusCode = error.response.status;
//         if (statusCode === 401 || statusCode === 403) {
//           logOut().then(() => {
//             navigate("/login");
//           });
//         }

//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axiosSecure.interceptors.request.eject(reqInterceptor);
//       axiosSecure.interceptors.response.eject(resInterceptor);
//     };
//   }, [user, navigate, logOut]);

//   return axiosSecure;
// };

// export default useAxiosSecure;
