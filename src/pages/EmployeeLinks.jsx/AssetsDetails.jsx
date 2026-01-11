import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import LoadingSpinner from "../../Components/LoadingSpinner";

const AssetDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxios();
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const { data: asset, isLoading } = useQuery({
    queryKey: ["asset-details", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/assets/${id}`);
      return res.data;
    },
  });

  console.log(asset);

  if (isLoading) return <LoadingSpinner />;
  if (!asset) {
    return (
      <div className="text-center mt-20 text-red-500">Asset not found</div>
    );
  }

  const handleRequest = async (data) => {
    const requestData = {
      assetId: asset._id,
      assetName: asset.productName,
      assetType: asset.productType,
      assetImage: asset.productImage,
      requesterName: user.displayName,
      requesterEmail: user.email,
      hrEmail: asset.hrEmail,
      companyName: asset.companyName,
      note: data.note || "",
      requestDate: new Date(),
      requestStatus: "pending",
    };

    const res = await axiosPublic.post("/request", requestData);

    if (res.data.success || res.data.insertedId) {
      Swal.fire("Success", "Request submitted", "success");
      reset();
    }
  };

  return (
    <div className="w-11/12 mx-auto py-10 space-y-10">
      {/* ================= ASSET INFO ================= */}
      {/* <div className="grid md:grid-cols-2 gap-8 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
        <img
          src={asset.productImage}
          alt={asset.productName}
          className="w-full h-64 object-cover rounded-lg"
        />

        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{asset.productName}</h2>

          <p className="text-sm text-zinc-500">
            Company: <span className="font-semibold">{asset.companyName}</span>
          </p>

          <p>
            Type:{" "}
            <span className="font-semibold text-primary">
              {asset.productType}
            </span>
          </p>

          <p>
            Availability:{" "}
            <span
              className={`font-bold ${
                asset.availableQuantity > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {asset.availableQuantity} / {asset.productQuantity}
            </span>
          </p>

          <p className="text-sm text-zinc-500">
            Added on: {new Date(asset.dateAdded).toLocaleDateString()}
          </p>
        </div>
      </div> */}

      {/* ================= REQUEST FORM ================= */}
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow max-w-xl">
        <h3 className="text-xl font-semibold mb-4">Request this Asset</h3>

        <form onSubmit={handleSubmit(handleRequest)} className="space-y-4">
          <textarea
            {...register("note")}
            placeholder="Why do you need this asset?"
            className="textarea textarea-bordered w-full"
          />

          <button
            disabled={asset.availableQuantity === 0}
            className="btn btnPrimary w-full"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssetDetails;
