import React, { useContext } from "react";
import { FaUserAlt, FaTrash } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/LoadingSpinner";

const AllEmployee = () => {
  const axiosPublic = useAxios();
  const { user } = useContext(AuthContext);

  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employees", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/employees?hrEmail=${user.email}`);
      return res.data;
    },
  });

  const { data: status = [] } = useQuery({
    queryKey: ["employeesStatus", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/employees/stats?hrEmail=${user.email}`
      );
      return res.data;
    },
  });

  const handleReturnBtn = async (id) => {
    const confirm = await Swal.fire({
      title: "Return Asset?",
      text: "Are you sure you want to return this asset?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Return",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosPublic.patch(`/employees/remove/${id}`);

    if (res.data.success) {
      Swal.fire({
        icon: "success",
        title: "Returned!",
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  // console.log(employees);

  return (
    <div className="w-11/12 mx-auto py-10">
      {/* Title + Employee Count */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary">My Employee List</h2>

        <div className="text-lg font-semibold bg-secondary text-white px-5 py-2 rounded-md">
          Employees: {status.used} / {status.limit}
        </div>
      </div>

      {/* Employee Table */}
      <div className=" overflow-x-auto rounded-xl shadow-md border border-gray-200">
        <table className="table table-zebra border rounded-lg">
          {/* Table Head */}
          <thead className="bg-secondary text-white text-base">
            <tr>
              <th className="py-4">Employee</th>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Assets</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white">
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-100 transition-all">
                  {/* Employee Image + Name */}
                  <td>
                    <div className="flex items-center gap-4">
                      <img
                        src={emp.photo}
                        alt={emp.name}
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                    </div>
                  </td>

                  <td className="font-medium">{emp.name}</td>
                  <td className="text-gray-600">{emp.email}</td>
                  <td>{new Date(emp.joinDate).toLocaleDateString()}</td>

                  {/* Assets Count */}
                  <td>
                    <span className="badge badge-info text-white px-4 py-2">
                      {emp.assetsCount} Assets
                    </span>
                  </td>

                  {/* Remove Button */}
                  <td className="text-center">
                    <button
                      onClick={() => handleReturnBtn(emp._id)}
                      className="btn btn-sm bg-red-500 text-white flex items-center gap-2 hover:bg-red-600"
                    >
                      <FaTrash /> Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployee;
