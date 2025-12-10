import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading";
import { FaBirthdayCake } from "react-icons/fa";

const MyTeam = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxios();
  const [company, setCompany] = useState("");

  // 1️⃣ Fetch all companies the employee is affiliated with
  const { data: companyNames = [] } = useQuery({
    queryKey: ["companies", user.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/myTeam/companies?email=${user.email}`
      );
      return res.data;
    },
  });

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["myTeamEmployees", user.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/myTeam/list?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Filter by company
  let visibleEmployees = company
    ? employees.filter((emp) => emp.companyName === company)
    : employees;

  // Remove duplicate employees (unique by email)
  visibleEmployees = [
    ...new Map(visibleEmployees.map((emp) => [emp.email, emp])).values(),
  ];

  const currentMonth = new Date().getMonth();
  const birthdays = visibleEmployees.filter((emp) => {
    if (!emp.dob) return false;
    return new Date(emp.dob).getMonth() === currentMonth;
  });

  return (
    <div className="w-11/12 mx-auto py-10">
      {/* Page title */}
      <h2 className="text-3xl font-bold text-primary mb-6">My Team</h2>

      {/* Company Select */}
      <div className="mb-6 flex gap-4 items-center">
        <select
          className="select select-bordered w-60"
          onChange={(e) => setCompany(e.target.value)}
        >
          <option value="">All Companies</option>
          {companyNames.map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
        </select>

        <span className="font-semibold text-gray-600">
          Total Members: {visibleEmployees.length}
        </span>
      </div>

      {/* Employee Cards */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleEmployees.map((emp) => (
          <div
            key={emp._id}
            className="bg-white shadow-md rounded-xl p-5 border
            hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <img
                src={emp.photo}
                alt={emp.name}
                className="w-20 h-20 rounded-full object-cover border mb-3"
              />

              <h3 className="text-lg font-bold text-gray-800">{emp.name}</h3>
              <p className="text-sm text-gray-500 mb-1">{emp.email}</p>
              <p className="text-sm text-primary font-semibold">
                {emp.position || "Employee"}
              </p>
            </div>

            <div className="mt-4 text-center text-gray-500 text-sm">
              Joined: {new Date(emp.joinDate).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Birthday Section */}
      <div className="mt-10 mb-16">
        <h3 className="text-2xl font-bold text-primary mb-3 flex items-center gap-2">
          <FaBirthdayCake /> Upcoming Birthdays 🎉
        </h3>

        {birthdays.length === 0 ? (
          <div className="bg-white shadow-md rounded-xl p-4 border">
            <p className="text-gray-500">No birthdays this month.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {birthdays.map((emp) => (
              <div
                key={emp._id}
                className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={emp.photo}
                    className="w-14 h-14 rounded-full object-cover border"
                  />

                  <div>
                    <h4 className="text-lg font-bold text-gray-700">
                      {emp.name}
                    </h4>
                    <p className="text-sm text-gray-500">{emp.email}</p>
                    <p className="text-sm font-semibold text-yellow-700">
                      🎂 {new Date(emp.dob).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTeam;
