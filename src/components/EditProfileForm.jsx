import { useEffect, useState } from "react";
import { useUpdateUserData } from "../hooks/updateUserProfile";
import { useForm } from "react-hook-form";
import FormRow from "./FormRow";

export default function EditProfileForm({ vendor, openEdit, setOpenEdit }) {
  const [businessName, setBusinessName] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState();
  const [fullName, setFullName] = useState();
  const [phone, setPhone] = useState();

  const { register, handleSubmit, formState } = useForm();

  // Prefilled edit form (from Supabase vendor object)
  useEffect(() => {
    const getUserDetails = () => {
      setBusinessName(vendor?.businessName);
      setBio(vendor?.bio);
      setEmail(vendor?.email);
      setFullName(vendor?.fullName);
      setPhone(vendor?.phone);
    };
    getUserDetails();
  }, [vendor]);

  const id = vendor?.id;

  const { mutate } = useUpdateUserData(id);

  const saveProfile = () => {
    console.log("Saving to Supabase:", editForm);
    setOpenEdit(false);
  };

  return (
    <div>
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

            <form onSubmit={handleSubmit} className="space-y-4 ">
              <FormRow text="black" label="Full name">
                <input
                  name="name"
                  className="w-full border p-2 rounded"
                  value={fullName}
                  {...register("businessName", {
                    required: "enter your email address",
                  })}
                />
              </FormRow>

              <FormRow label="Bio">
                {/* <label>Bio</label> */}
                <textarea
                  name="bio"
                  className="w-full border p-2 rounded h-24"
                  value={bio}
                  {...register("bio", {
                    required: "enter your email address",
                  })}
                  // onChange={handleEditChange}
                />
              </FormRow>

              <FormRow text="black" label="email">
                {/* <label>Email</label> */}
                <input
                  name="email"
                  className="w-full border p-2 rounded"
                  value={email}
                  {...register("email", {
                    required: "enter your email address",
                  })}

                  // onChange={handleEditChange}
                />
              </FormRow>

              <FormRow text="black" label="Fullname">
                <input
                  name="name"
                  className="w-full border p-2 rounded"
                  {...register("fullName", {
                    required: "your full name is required",
                  })}
                  value={fullName}
                  // onChange={handleEditChange}
                />
              </FormRow>

              <FormRow text="black" label="phone">
                <input
                  name="phone"
                  minLength="11"
                  className="w-full border p-2 rounded"
                  value={phone}
                  {...register("phone", {
                    required: "enter a valid phone numbe",
                  })}

                  // onChange={handleEditChange}
                />
              </FormRow>

              <button
                onClick={saveProfile}
                className="w-full bg-black text-white py-2 rounded-xl"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
