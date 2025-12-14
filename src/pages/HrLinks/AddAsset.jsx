import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthProvider";
import useUserProfile from "../../Hooks/useUserProfile";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";

const AddAsset = () => {
  const { data: userDB } = useUserProfile();
  const axiosPublic = useAxios();
  // console.log("user in DB", );
  // console.log(user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const imgAPI = `https://api.imgbb.com/1/upload?key=${
  //   import.meta.env.VITE_IMG_BB_API_KEY
  // }`;
  // console.log(user);
  const handleAddAsset = async (data) => {
    const formData = new FormData();

    formData.append("image", data.productImage[0]);
    formData.append("productName", data.productName);
    formData.append("productType", data.productType);
    formData.append("productQuantity", data.productQuantity);
    formData.append("companyName", userDB.companyName || "Unknown");

    await axiosPublic.post("/asset", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(formData);

    Swal.fire({
      icon: "success",
      title: "Asset added successfully",
      timer: 1500,
      showConfirmButton: false,
    });

    reset();
  };

  return (
    <div className="max-w-lg mx-auto bg-white my-10 p-6 shadow-lg rounded-xl">
      <h2 className="text-2xl text-primary font-semibold text-center mb-4">
        Add New Asset
      </h2>

      <form onSubmit={handleSubmit(handleAddAsset)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="label font-semibold">Product Name</label>
          <input
            type="text"
            {...register("productName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter product name"
          />
          {errors.productName && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        {/* Product Type */}
        <div>
          <label className="label font-semibold">Product Type</label>
          <select
            {...register("productType", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select...</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
          {errors.productType && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="label font-semibold">Quantity</label>
          <input
            type="number"
            min="1"
            {...register("productQuantity", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter quantity"
          />
          {errors.productQuantity && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        {/* Product Image */}
        <div>
          <label className="label font-semibold">Product Image</label>
          <input
            type="file"
            {...register("productImage", { required: true })}
            className="file-input file-input-bordered w-full"
          />
          {errors.productImage && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        <button className="btn bg-secondary hover:bg-[#22b658] text-white w-full mt-3">
          Add Asset
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
