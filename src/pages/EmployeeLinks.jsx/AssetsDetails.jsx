import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Context/AuthProvider";
import LoadingSpinner from "../../Components/LoadingSpinner";

const AssetDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const {
    data: asset,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["asset-details", id],
    enabled: !!id,
    retry: false,
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets/${id}`);
      return res.data;
    },
  });

  // 🔄 Loading
  if (isLoading) return <LoadingSpinner />;

  // ❌ Error (401 / 403 / 404)
  if (isError) {
    return (
      <div className="text-center mt-20 text-red-500">
        Failed to load asset details
        <br />
        <span className="text-sm text-gray-400">
          {error?.response?.data?.message}
        </span>
      </div>
    );
  }

  // ❌ No data
  if (!asset) {
    return (
      <div className="text-center mt-20 text-red-500">Asset not found</div>
    );
  }

  // 📤 Submit request
  const handleRequest = async (data) => {
    const requestData = {
      assetId: asset._id,
      assetName: asset.productName,
      assetType: asset.productType,
      assetImage: asset.productImage,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      hrEmail: asset.hrEmail,
      companyName: asset.companyName,
      note: data.note || "",
      requestDate: new Date(),
      requestStatus: "pending",
    };

    try {
      const res = await axiosSecure.post("/request", requestData);

      if (res.data.success || res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Submitted",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
      }
    } catch {
      Swal.fire("Error", "Request failed", "error");
    }
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* ================= LEFT : IMAGE ================= */}
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow">
          <img
            src={asset.productImage}
            alt={asset.productName}
            className="w-full h-120 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* ================= RIGHT ================= */}
        <div className="space-y-6">
          {/* -------- TOP : DETAILS BOX -------- */}
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow space-y-4">
            <h2 className="text-3xl font-bold">{asset.productName}</h2>

            <div className="flex gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-primary/10 text-primary">
                {asset.productType}
              </span>

              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-zinc-100 dark:bg-zinc-700">
                {asset.companyName}
              </span>
            </div>

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Available</span>
                <span
                  className={`font-bold ${
                    asset.availableQuantity > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {asset.availableQuantity} / {asset.productQuantity}
                </span>
              </div>

              <div className="flex justify-between text-zinc-500">
                <span>Added on</span>
                <span>{new Date(asset.dateAdded).toLocaleDateString()}</span>
              </div>
            </div>

            <div
              className={`text-sm font-semibold ${
                asset.availableQuantity > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {asset.availableQuantity > 0
                ? "✔ Asset available for request"
                : "✖ Currently out of stock"}
            </div>
          </div>

          {/* -------- BOTTOM : REQUEST BOX -------- */}
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">Request this Asset</h3>
            <p className="text-sm text-zinc-500 mb-4">
              Write a short reason for requesting this asset
            </p>

            <form onSubmit={handleSubmit(handleRequest)} className="space-y-4">
              <textarea
                {...register("note")}
                rows={4}
                placeholder="Example: Needed for project / office work..."
                className="textarea textarea-bordered w-full"
              />

              <button
                disabled={asset.availableQuantity === 0}
                className="btn btnPrimary w-full"
              >
                {asset.availableQuantity === 0
                  ? "Out of Stock"
                  : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
