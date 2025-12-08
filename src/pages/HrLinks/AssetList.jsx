import React from "react";

const AssetList = () => {
  return <div>Asset List</div>;
};

export default AssetList;

// import { useState, useEffect, useContext } from "react";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { AuthContext } from "../../Context/AuthProvider";
// import Swal from "sweetalert2";

// const AssetList = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useContext(AuthContext);

//   const [assets, setAssets] = useState([]);
//   const [searchText, setSearchText] = useState("");

//   // Fetch data
//   useEffect(() => {
//     if (!user?.email) return;
//     axiosSecure.get(`/assets?email=${user.email}`).then((res) => {
//       setAssets(res.data);
//     });
//   }, [user, axiosSecure]);

//   // Handle Delete
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This asset will be permanently removed!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, Delete",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/assets/${id}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             setAssets(assets.filter((item) => item._id !== id));
//             Swal.fire("Deleted!", "Asset removed successfully.", "success");
//           }
//         });
//       }
//     });
//   };

//   // Filter search
//   const filteredAssets = assets.filter((item) =>
//     item.productName.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <div className="w-11/12 mx-auto mt-10">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold text-primary">Asset List</h2>

//         <input
//           type="text"
//           placeholder="Search asset..."
//           className="input input-bordered w-64"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="table">
//           <thead className="bg-secondary text-white">
//             <tr>
//               <th>#</th>
//               <th>Image</th>
//               <th>Asset Name</th>
//               <th>Type</th>
//               <th>Total Qty</th>
//               <th>Available</th>
//               <th>Date Added</th>
//               <th className="text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredAssets.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="text-center text-gray-500 py-6">
//                   No assets found...
//                 </td>
//               </tr>
//             ) : (
//               filteredAssets.map((asset, index) => (
//                 <tr key={asset._id}>
//                   <td>{index + 1}</td>
//                   <td>
//                     <img
//                       src={asset.productImage}
//                       alt="img"
//                       className="w-12 h-12 rounded-md border"
//                     />
//                   </td>
//                   <td className="font-semibold">{asset.productName}</td>
//                   <td>
//                     <span
//                       className={`badge ${
//                         asset.productType === "Returnable"
//                           ? "badge-success"
//                           : "badge-warning"
//                       }`}
//                     >
//                       {asset.productType}
//                     </span>
//                   </td>
//                   <td>{asset.productQuantity}</td>
//                   <td className="font-bold text-green-600">
//                     {asset.availableQuantity}
//                   </td>
//                   <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>

//                   <td className="flex justify-center gap-2">
//                     <button className="btn btn-sm bg-primary text-white">
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => handleDelete(asset._id)}
//                       className="btn btn-sm bg-red-600 text-white"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AssetList;
