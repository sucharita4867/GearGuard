import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import LoadingSpinner from "../../Components/LoadingSpinner";

const AssetList = () => {
  const axiosPublic = useAxios();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { user } = useContext(AuthContext);

  const limit = 5;

  // 🚀 Fetch assets with pagination
  const { data, isLoading, refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: ["assets", user?.email, page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/asset?hrEmail=${user.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const assets = data?.data || [];
  const totalPages = data?.pages || 1;

  // Filter search text
  const filteredAssets = assets.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner />;

  // Delete Asset
  const handleAssetDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This asset will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/asset/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "The asset has been removed.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-primary">Asset List</h2>

        {/* Search Bar */}
        <div className="flex justify-end mb-2">
          <input
            type="text"
            placeholder="Search asset..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-60"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
        <table className="table table-zebra w-full shadow-lg rounded-lg">
          <thead className="bg-secondary text-white text-base">
            <tr>
              <th>#</th>
              <th>Asset Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {filteredAssets.length > 0 ? (
              filteredAssets.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1 + (page - 1) * limit}</td>

                  <td>
                    <img
                      src={item.productImage}
                      alt="asset"
                      className="w-16 h-16 rounded-md"
                    />
                  </td>

                  <td className="font-medium">{item.productName}</td>
                  <td>{item.productType}</td>
                  <td className="font-semibold">{item.productQuantity}</td>
                  <td>{new Date(item.dateAdded).toLocaleDateString()}</td>

                  <td className="flex gap-2 flex-col">
                    <button className="btn btn-sm bg-secondary text-white">
                      Edit
                    </button>

                    <button
                      onClick={() => handleAssetDelete(item._id)}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No assets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="btn btn-sm btn-secondary"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`btn btn-sm ${
              page === i + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="btn btn-sm btn-secondary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AssetList;
