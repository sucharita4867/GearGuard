import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useAxios from "../../Hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, setUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxios();

  const [name, setName] = useState(user?.displayName || user?.name || "");
  const [dob, setDob] = useState(user?.dob || "");
  const [previewImage, setPreviewImage] = useState(
    user?.image || user?.photoURL
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
    // console.log(setPreviewImage);
  };

  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const key = import.meta.env.VITE_IMG_BB_API_KEY;

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.data.url;
  };

  const { mutateAsync: updateDBUser } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosPublic.patch(
        `/user/update/${user?.email}`,
        payload
      );
      return res.data;
    },
  });

  const handleSave = async () => {
    let finalImageUrl = user?.photoURL || user?.image;

    if (selectedFile) {
      finalImageUrl = await uploadImageToImgBB(selectedFile);
    }

    const payload = {
      name,
      dob,
      companyLogo: finalImageUrl,
    };

    await updateDBUser(payload);

    await updateUserProfile({
      displayName: name,
      photoURL: finalImageUrl,
    });

    setUser({
      ...user,
      name,
      dob,
      image: finalImageUrl,
      displayName: name,
      photoURL: finalImageUrl,
    });

    Swal.fire({
      icon: "success",
      title: "Profile Updated!",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-center text-2xl font-semibold mb-5">My Profile</h2>

        {/* Profile Image */}
        <div className="flex flex-col justify-center items-center mb-5">
          <div className="avatar">
            <div className="w-32 rounded-full border-4 border-primary shadow">
              <img src={previewImage} alt="Profile" />
            </div>
          </div>

          <label className="btn btn-primary btn-sm mt-3 cursor-pointer text-white">
            Change Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="btn btn-secondary w-full mt-6 text-white"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
