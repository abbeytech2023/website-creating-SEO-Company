import { useState } from "react";

const vendorFromSupabase = {
  id: "123",
  businessName: "Abbey Luxury Shoes",
  bio: "Premium handmade footwear from Abeokuta.",
  logo_url: "/sample-logo.jpg",
};

export default function DashboardHeader({ vendor }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openNewShoe, setOpenNewShoe] = useState(false);

  // Prefilled edit form (from Supabase vendor object)
  const [editForm, setEditForm] = useState({
    businessName: vendor?.businessName,
    bio: vendor?.bio,
    logo_url: vendor?.logo_url,
  });

  // New shoe upload form
  const [shoeForm, setShoeForm] = useState({
    name: "",
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
  return <></>;
}
