import { useState } from "react";

export default function DashboardHeader({ vendor }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openNewShoe, setOpenNewShoe] = useState(false);

  // Prefilled edit form (from Supabase vendor object)
  const [editForm, setEditForm] = useState({
    businessName: vendor?.businessName,
    bio: vendor?.bio,
    email: vendor?.email,
    fullName: vendor?.fullName,
    phone: vendor?.phone,
    logo_url: vendor?.logo_url,
  });

  console.log(vendor);
  console.log(editForm?.phone);

  // New shoe upload form
  const [shoeForm, setShoeForm] = useState({
    name: "",
    email: "",
    price: "",
    image: "",
    description: "",
  });

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleShoeChange = (e) => {
    setShoeForm({ ...shoeForm, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    console.log("Saving to Supabase:", editForm);
    setOpenEdit(false);
  };

  const uploadShoe = () => {
    console.log("Uploading shoe:", shoeForm);
    setOpenNewShoe(false);
  };
  return (
    <>
      <div className=" bg-white rounded-2xl shadow p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo + Info */}
        <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
          <img
            src={vendor?.logo_url}
            className="w-24 h-24 rounded-full border-4 border-white shadow"
          />

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
            className="bg-[#d4af37] text-white px-4 py-2 rounded-xl shadow hover:opacity-90 transition"
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
      {openEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 h-5/6 overflow-y-auto rounded-2xl w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setOpenEdit(false)}
              className="absolute right-4 top-3 text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-xl font-serif mb-4">Edit Profile</h2>

            <div className="space-y-4">
              <div>
                <label>Business Name</label>
                <input
                  name="businessName"
                  className="w-full border p-2 rounded"
                  value={editForm?.businessName}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label>Bio</label>
                <textarea
                  name="bio"
                  className="w-full border p-2 rounded h-24"
                  value={editForm?.bio}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label>Email</label>
                <input
                  name="email"
                  className="w-full border p-2 rounded"
                  value={editForm?.email}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label>Full Name</label>
                <input
                  name="name"
                  className="w-full border p-2 rounded"
                  value={editForm.fullName}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label>Phone</label>
                <input
                  name="phone"
                  className="w-full border p-2 rounded"
                  value={editForm.phone}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label>Logo URL</label>
                <input
                  name="logo_url"
                  className="w-full border p-2 rounded"
                  value={editForm.logo_url}
                  onChange={handleEditChange}
                />
              </div>

              <button
                onClick={saveProfile}
                className="w-full bg-black text-white py-2 rounded-xl"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {openNewShoe && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setOpenNewShoe(false)}
              className="absolute right-4 top-3 text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-xl font-serif mb-4">Upload New Shoe</h2>

            <div className="space-y-4">
              <div>
                <label>Shoe Name</label>
                <input
                  name="name"
                  className="w-full border p-2 rounded"
                  value={shoeForm.name}
                  onChange={handleShoeChange}
                />
              </div>

              <div>
                <label>Price</label>
                <input
                  name="price"
                  type="number"
                  className="w-full border p-2 rounded"
                  value={shoeForm.price}
                  onChange={handleShoeChange}
                />
              </div>

              <div>
                <label>Image URL</label>
                <input
                  name="image"
                  className="w-full border p-2 rounded"
                  value={shoeForm.image}
                  onChange={handleShoeChange}
                />
              </div>

              <div>
                <label>Description</label>
                <textarea
                  name="description"
                  className="w-full border p-2 rounded h-24"
                  value={shoeForm.description}
                  onChange={handleShoeChange}
                ></textarea>
              </div>

              <button
                onClick={uploadShoe}
                className="w-full bg-[#d4af37] text-white py-2 rounded-xl"
              >
                Upload Shoe
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
