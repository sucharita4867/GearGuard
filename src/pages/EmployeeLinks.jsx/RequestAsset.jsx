import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { useNavigate } from "react-router";

const ITEMS_PER_PAGE = 8;

const RequestAsset = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxios();

  // 🔹 UI States
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["employee-assets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/assets/employee");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // 🔍 SEARCH
  let filteredAssets = assets.filter((asset) =>
    asset.productName.toLowerCase().includes(search.toLowerCase()),
  );

  // 🧩 FILTER
  if (typeFilter) {
    filteredAssets = filteredAssets.filter(
      (asset) => asset.productType === typeFilter,
    );
  }

  // 🔃 SORT
  if (sortBy === "name") {
    filteredAssets.sort((a, b) => a.productName.localeCompare(b.productName));
  } else if (sortBy === "latest") {
    filteredAssets.sort(
      (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded),
    );
  }

  const totalPages = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE);
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="w-11/12 mx-auto py-10 space-y-6">
      <h2 className="text-3xl font-bold text-primary">Request an Asset</h2>

      <div className="grid md:grid-cols-4 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search asset..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="input input-bordered w-full"
        />

        {/* Filter */}
        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="select select-bordered w-full"
        >
          <option value="">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="latest">Latest</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedAssets.map((asset) => (
          <div
            key={asset._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all"
          >
            <img
              src={asset.productImage}
              alt={asset.productName}
              className="h-36 w-full object-cover rounded-t-xl"
            />

            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{asset.productName}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {asset.productType}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                Available:{" "}
                <span
                  className={`font-bold ${
                    asset.availableQuantity > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {asset.availableQuantity} / {asset.productQuantity}
                </span>
              </p>

              <button
                onClick={() => navigate(`/dashboard/assets/${asset._id}`)}
                className="btn btnPrimary btn-sm w-full mt-2"
              >
                Asset Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page + 1)}
              className={`btn btn-sm ${
                currentPage === page + 1 ? "btnPrimary" : "btn-outline"
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestAsset;
