import { useEffect, useState } from "react";
import { useUpdateUserData } from "../hooks/updateUserProfile";
import EditProfileForm from "./EditProfileForm";
import AddNewShoes from "./AddNewShoes";
import ProfileDisplayPicture from "./ProfileDisplayPicture";
import { useFetchUsersWithId } from "../hooks/useFetchUsers";
import { useAuthContext } from "../hooks/useAuthContext";
import SpinnerMini from "./SpinnerMini";

export default function DashboardHeader({ vendor }) {
  const [openNewShoe, setOpenNewShoe] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { user } = useAuthContext();
  const { authenticatedUser } = useFetchUsersWithId(user?.id);

  // const handleEditChange = (e) => {
  //   setEditForm({ ...editForm, [e.target.name]: e.target.value });
  // };

  return (
    <>
      <div className=" bg-white rounded-2xl shadow p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo + Info */}
        <div className="flex bg-red flex-col items-center md:flex-row md:items-start gap-4">
          {/* <img
            src={vendor?.logo_url}
            className="w-24 h-24 rounded-full border-4 border-white shadow"
          /> */}
          <div>{user && <ProfileDisplayPicture />}</div>

          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-black">
              {vendor?.businessName}
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-md">
              {vendor?.bio}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => setOpenNewShoe(true)}
            className="bg-[indigo] text-white px-4 py-2 rounded-xl shadow hover:opacity-90 transition"
          >
            + Upload New Shoe
          </button>

          <button
            onClick={() => setOpenEdit(true)}
            className="bg-black text-white px-4 py-2 rounded-xl shadow hover:bg-gray-800 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      <EditProfileForm
        vendor={vendor}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
      />

      {/* ADD NEW SHOES MODAL */}
      <AddNewShoes openNewShoe={openNewShoe} setOpenNewShoe={setOpenNewShoe} />
    </>
  );
}
