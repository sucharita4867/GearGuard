import { useQuery } from "@tanstack/react-query";
// import { useContext, useState } from "react";
// import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Context/AuthProvider";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { useNavigate } from "react-router";

const RequestAsset = () => {
  const navigate = useNavigate();
  // const [selectedAsset, setSelectedAsset] = useState(null);
  // const [requestedAssets, setRequestedAssets] = useState([]);
  // const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxios();
  // const { user } = useContext(AuthContext);
  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["employee-assets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/assets/employee");
      return res.data;
    },
  });
  console.log(assets);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // const handleRequest = async (data) => {
  //   // console.log(data);
  //   const requestData = {
  //     assetId: selectedAsset._id,
  //     assetName: selectedAsset.productName,
  //     assetType: selectedAsset.productType,
  //     assetImage: selectedAsset.productImage,
  //     requesterName: user.displayName,
  //     requesterEmail: user.email,
  //     hrEmail: selectedAsset.hrEmail,
  //     companyName: selectedAsset.companyName,
  //     note: data.note || "",
  //     requestDate: new Date(),
  //     requestStatus: "pending",
  //     approvalDate: null,
  //     processedBy: null,
  //   };

  //   // console.log("Request Submitted:", requestData);
  //   // console.log("selectedAsset:", selectedAsset);

  //   const res = await axiosPublic.post("/request", requestData);
  //   if (res.data.insertedId || res.data.success) {
  //     Swal.fire({
  //       icon: "success",
  //       title: "Request Sent!",
  //       text: "Your asset request has been submitted.",
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });

  //     setRequestedAssets((prev) => [...prev, selectedAsset._id]);
  //   } else {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Already Requested!",
  //       text: res.data.message,
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });
  //   }

  //   reset();
  //   setSelectedAsset(null);
  //   document.getElementById("request_modal").close();
  // };

  // const openModal = (asset) => {
  //   setSelectedAsset(asset);
  //   document.getElementById("request_modal").showModal();
  // };

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold text-primary mb-6">Request an Asset</h2>

      {/* Assets Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {assets.map((asset) => (
          <div
            key={asset._id}
            className=" bg-white rounded-xl  shadow-sm 
  transition-all duration-300 cursor-pointer 
  hover:shadow-xl hover:-translate-y-2 hover:border-primary"
          >
            {/* Image Wrapper for hover zoom */}
            <div className="overflow-hidden rounded-lg">
              <img
                src={asset.productImage}
                alt={asset.productName}
                className="h-36 w-full object-cover transition-all duration-500 hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="mt-4 flex flex-col gap-2 p-4">
              {/* Name + Type Badge */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  {asset.productName}
                </h3>

                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    asset.productType === "Returnable"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {asset.productType}
                </span>
              </div>

              {/* Availability */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">Available</span>
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

              {/* company */}
              {/* <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Company name</span>
                <span>{asset.companyName}</span>
              </div> */}
              {/* Date */}
              {/* <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Added</span>
                <span>{new Date(asset.dateAdded).toLocaleDateString()}</span>
              </div> */}

              {/* Button */}
              {/* <button
                disabled={
                  asset.availableQuantity === 0 ||
                  requestedAssets.includes(asset._id)
                }
                onClick={() => openModal(asset)}
                className={`mt-3 btn btn-sm w-full transition-all ${
                  asset.availableQuantity > 0 &&
                  !requestedAssets.includes(asset._id)
                    ? "btnPrimary"
                    : "btn-disabled bg-gray-300 text-gray-600 border-none"
                }`}
              >
                {asset.availableQuantity === 0
                  ? "Out of Stock"
                  : requestedAssets.includes(asset._id)
                  ? "Requested"
                  : "Request Asset"}
              </button> */}
              <button
                onClick={() => navigate(`/dashboard/asset/${asset._id}`)}
                className="btn btnPrimary btn-sm w-full"
              >
                Asset Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {/* <dialog id="request_modal" className="modal">
        <div className="modal-box">
          {selectedAsset && (
            <>
              <h3 className="font-bold text-xl mb-3 text-primary">
                Request: {selectedAsset.productName}
              </h3>

              <form
                onSubmit={handleSubmit(handleRequest)}
                className="space-y-3"
              >
                <label className="label font-semibold">Add Note</label>
                <textarea
                  {...register("note")}
                  className="textarea textarea-bordered w-full"
                  placeholder="Example: Need for project work..."
                />

                <button className="btn btn-secondary w-full">
                  Submit Request
                </button>
              </form>
            </>
          )}

          <div className="modal-action">
            <button
              onClick={() => document.getElementById("request_modal").close()}
              className="btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog> */}
    </div>
  );
};

export default RequestAsset;
