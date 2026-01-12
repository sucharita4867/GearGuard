import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/LoadingSpinner";

const ITEMS_PER_PAGE = 6;

const AllRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxios();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/request?hrEmail=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const statusPriority = {
    pending: 1,
    approved: 2,
    rejected: 3,
  };

  const filteredRequests = requests.filter((req) => {
    const text = `${req.requesterName} ${req.requesterEmail} ${req.assetName}`;
    const matchesSearch = text.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : req.requestStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedRequests = [...filteredRequests].sort(
    (a, b) => statusPriority[a.requestStatus] - statusPriority[b.requestStatus]
  );

  const totalPages = Math.ceil(sortedRequests.length / ITEMS_PER_PAGE);

  const paginatedRequests = sortedRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve the request?",
      text: "Are you sure you want to approve this asset request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosPublic.patch(`/request/approve/${id}`, {
        companyLogo: user?.photoURL,
      });

      if (res.data?.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Approved!",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      } else {
        Swal.fire("Nothing updated", "", "info");
      }
    } catch {
      Swal.fire("Error!", "Approve failed", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosPublic.patch(`/request/reject/${id}`);

      if (res.data?.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Rejected!",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      } else {
        Swal.fire("Nothing updated", "", "info");
      }
    } catch {
      Swal.fire("Error!", "Reject failed", "error");
    }
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      {/* Title + Search + Dropdown */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-primary">All Asset Requests</h2>

        <div className="flex gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="input input-bordered w-full pl-10"
            />
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="select select-bordered w-full md:w-44"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md border">
        <table className="table">
          <thead className="bg-secondary text-white">
            <tr>
              <th>Employee</th>
              <th>Asset</th>
              <th>Request Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((req) => (
                <tr key={req._id}>
                  <td>
                    <p className="font-semibold">{req.requesterName}</p>
                    <p className="text-sm text-gray-500">
                      {req.requesterEmail}
                    </p>
                  </td>

                  <td>{req.assetName}</td>

                  <td>{new Date(req.requestDate).toLocaleDateString()}</td>

                  <td>
                    <span
                      className={`badge text-white ${
                        req.requestStatus === "pending"
                          ? "badge-warning"
                          : req.requestStatus === "approved"
                          ? "badge-success"
                          : "bg-red-500"
                      }`}
                    >
                      {req.requestStatus}
                    </span>
                  </td>

                  <td className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleApprove(req._id)}
                      disabled={req.requestStatus !== "pending"}
                      className="btn btn-sm bg-secondary text-white disabled:opacity-40"
                    >
                      <FaCheck /> Approve
                    </button>

                    <button
                      onClick={() => handleReject(req._id)}
                      disabled={req.requestStatus !== "pending"}
                      className="btn btn-sm bg-red-500 text-white disabled:opacity-40"
                    >
                      <FaTimes /> Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No asset requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`btn btn-sm ${
                currentPage === num + 1 ? "btn-secondary" : "btn-outline"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRequests;
