import { useState } from "react";
import FileInput from "./FileInput";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addShoesForSaleApi } from "../services/ApiForSale";

export default function AddNewShoes({ openNewShoe, setOpenNewShoe }) {
  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationFn: (newShoe) => addShoesForSaleApi(newShoe),
    onSuccess: () => {
      toast.success("Footwear successfully added ");
      navigate("/myaccount/dashboard");
      QueryClient.invalidateQueries({ queryKey: ["Shoes"] });
      reset();
    },
    onError: () => {
      toast.error("property could not be added");
    },
  });

  const onSubmit = (data) => {
    mutate({ ...data, image: data.image[0] });
    console.log(data);
  };

  const uploadShoe = () => {
    console.log("Uploading shoe:", shoeForm);
    setOpenNewShoe(false);
  };

  return (
    <div>
      {openNewShoe && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white overflow-y-auto h-5/6 p-6 rounded-2xl w-full max-w-md shadow-lg relative"
          >
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
                  {...register("name", {
                    required: "This field is required",
                  })}
                />
              </div>

              <div>
                <label>Price</label>
                <input
                  name="price"
                  type="number"
                  className="w-full border p-2 rounded"
                  {...register("price", {
                    required: "This field is required",
                  })}
                />
              </div>

              <div>
                <label>Size</label>
                <input
                  name="size"
                  type="number"
                  className="w-full border p-2 rounded"
                  {...register("size", {
                    required: "This field is required",
                  })}
                />
              </div>

              <div>
                <label>Color</label>
                <input
                  name="colore"
                  type="text"
                  className="w-full border p-2 rounded"
                  {...register("color", {
                    required: "This field is required",
                  })}
                />
              </div>

              <div>
                <label>Description</label>
                <textarea
                  name="description"
                  className="w-full border p-2 rounded h-24"
                  {...register("description", {
                    required: "This field is required",
                  })}
                ></textarea>
              </div>

              <div label="property photo" className="">
                <label className="mb-16" htmlFor="">
                  Upload photo
                </label>
                <FileInput
                  id="image"
                  accept="image/*"
                  type="file"
                  className="w-full border p-2 rounded h-24 flex mb-7"
                  {...register("image", {
                    required: "This field is required",
                  })}
                />
              </div>
            </div>

            <button
              onClick={uploadShoe}
              className="w-full bg-[#d4af37] text-white py-2 rounded-xl"
            >
              Upload Shoe
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
