import { useQuery } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { FaSearch, FaPrint, FaUndo } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { VscRepoFetch } from "react-icons/vsc";
import { AuthContext } from "../../Context/AuthProvider";

const MyAssets = () => {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("all");
  const axiosPublic = useAxios();
  const { user } = useContext(AuthContext);

  const printRef = useRef(null);

  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["filteredAssets", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/myAssets?email=${user.email}`);
      return res.data;
    },
  });

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "My Assigned Assets",
    onAfterPrint: () =>
      Swal.fire({
        icon: "success",
        title: "Printed!",
        timer: 1500,
        showConfirmButton: false,
      }),
  });

  if (isLoading) return <Loading />;

  const filteredAssets = assets.filter((asset) => {
    return (
      asset.assetName.toLowerCase().includes(searchText.toLowerCase()) &&
      (filter === "all" || asset.assetType === filter)
    );
  });

  const handleReturned = async (id) => {
    const confirm = await Swal.fire({
      title: "Return Asset?",
      text: "Are you sure you want to return this asset?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Return",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosPublic.patch(`/asset/return/${id}`);
    if (res.data.success) {
      Swal.fire({
        icon: "success",
        title: "Returned!",
        text: res.data.message,
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    }
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      {/* Page Title */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary">My Assigned Assets</h2>

        <button
          onClick={handlePrint}
          className="btn btn-outline btn-primary flex gap-2"
        >
          <FaPrint /> Print
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-5">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by asset name..."
            className="input input-bordered w-full pl-10"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <select
          className="select select-bordered md:w-44 w-full"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      <div
        ref={printRef}
        className="overflow-x-auto rounded-xl shadow-md border border-gray-200"
      >
        <table className="table">
          <thead className="bg-secondary text-white text-base">
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Company</th>
              <th>Request Date</th>
              <th>Approved</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No assets found.
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset) => (
                <tr
                  key={asset._id}
                  className="hover:bg-gray-100 transition-all duration-200 border-b"
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={asset.assetImage}
                        className="w-14 h-14 rounded-md object-cover"
                      />
                      <span className="font-semibold">{asset.assetName}</span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        asset.assetType === "Returnable"
                          ? "badge-success"
                          : "badge-warning"
                      } text-white`}
                    >
                      {asset.assetType}
                    </span>
                  </td>

                  <td className="font-medium">{asset.companyName}</td>
                  <td>{asset.requestDate}</td>
                  <td>{asset.assignmentDate}</td>

                  <td>
                    <span
                      className={`badge ${
                        asset.status === "assigned"
                          ? "badge-info"
                          : "badge-error"
                      } text-white`}
                    >
                      {asset.status}
                    </span>
                  </td>

                  <td className="text-center">
                    {asset.assetType === "Returnable" &&
                    asset.status === "assigned" ? (
                      <button
                        onClick={() => handleReturned(asset._id)}
                        className="btn btn-sm bg-secondary text-white flex gap-2"
                      >
                        <FaUndo /> Return
                      </button>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssets;
