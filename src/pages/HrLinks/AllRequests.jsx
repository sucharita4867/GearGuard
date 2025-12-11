import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";

import { FaCheck, FaTimes } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/LoadingSpinner";

const AllRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxios();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const res = await axiosPublic(`/request?hrEmail=${user.email}`);
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve the request?",
      text: "Are you sure you want to approve this asset request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
    });
    if (!confirm.isConfirmed) return;

    const hrInformation = {
      companyLogo: user.photoURL,
    };
    const res = await axiosPublic.patch(
      `/request/approve/${id}`,
      hrInformation
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Approved!",
        text: "The request has been approved.",
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    }
  };

  const handleReject = async (id) => {
    const res = await axiosPublic.patch(`/request/reject/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "rejected!",
        text: "The request has been rejected.",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    refetch();
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-primary mb-6">
        All Asset Requests
      </h2>

      {/* Table */}
      <div className=" overflow-x-auto rounded-xl shadow-md border border-gray-200">
        <table className="table  border rounded-lg">
          {/* Table Head */}
          <thead className="bg-secondary text-white">
            <tr>
              <th>Employee</th>
              <th>Asset</th>
              <th>Request Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white">
            {requests.length > 0 ? (
              requests?.map((req) => (
                <tr key={req._id} className="hover">
                  <td>
                    <div>
                      <p className="font-semibold">{req.requesterName}</p>
                      <p className="text-sm text-gray-500">
                        {req.requesterEmail}
                      </p>
                    </div>
                  </td>

                  <td className="font-medium">{req.assetName}</td>

                  <td>{req.requestDate}</td>

                  {/* requestStatus Badge */}
                  <td>
                    <span
                      className={`badge px-4 py-2 ${
                        req.requestStatus === "pending"
                          ? "badge-warning"
                          : req.requestStatus === "approved"
                          ? "badge-success"
                          : "bg-red-500"
                      } text-white`}
                    >
                      {req.requestStatus.charAt(0).toUpperCase() +
                        req.requestStatus.slice(1)}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="flex gap-3 justify-center">
                    <button
                      onClick={() => handleApprove(req._id)}
                      disabled={req.requestStatus !== "pending"}
                      className="btn bg-secondary btn-sm text-white flex items-center gap-2 disabled:opacity-40"
                    >
                      <FaCheck /> Approve
                    </button>

                    <button
                      disabled={req.requestStatus !== "pending"}
                      onClick={() => handleReject(req._id)}
                      className="btn bg-red-500 btn-sm text-white flex items-center gap-2 disabled:opacity-40"
                    >
                      <FaTimes /> Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No assets requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
