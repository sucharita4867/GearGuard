import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading";
import Swal from "sweetalert2";

const AssetList = () => {
  const axiosPublic = useAxios();
  const [search, setSearch] = useState("");

  // Fetch assets
  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/asset`);
      return res.data;
    },
  });

  const filteredAssets = assets.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <Loading />;

  const handleAssetDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/asset/${id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your assets  has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-primary  ">Asset List</h2>

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
      <div className="overflow-x-auto">
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

          <tbody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={item.productImage}
                      alt="asset"
                      className="w-16 h-16 rounded-md "
                    />
                  </td>

                  <td className="font-medium">{item.productName}</td>
                  <td>{item.productType}</td>
                  <td className="font-semibold">{item.productQuantity}</td>

                  <td>{new Date(item.dateAdded).toLocaleDateString()}</td>

                  <td className="flex gap-2 flex-col">
                    <button className="btn btn-sm bg-secondary text-white ">
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
                <td colSpan="7" className="text-center text-gray-600 py-5">
                  ❌ No assets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;
