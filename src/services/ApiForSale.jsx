import { supabase, supabaseUrl } from "./supabaseClients";

export async function addShoesForSaleApi(newShoe) {
  const imageName = `${Math.random()}-${newShoe.image.name}`.replace("/", "");
  const imageName1 = `${Math.random()}-${newShoe.image1.name}`.replace("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/shoes/${imageName}`;
  const imagePath1 = `${supabaseUrl}/storage/v1/object/public/shoes/${imageName1}`;

  const { data, error } = await supabase
    .from("Footwear")
    .insert([{ ...newShoe, image: imagePath, image1: imagePath1 }])
    .select();

  console.log(data);

  if (error) {
    console.log(error);
    throw new Error("shoes could not be added");
  }

  //3a upload image
  const { error: storageEror } = await supabase.storage
    .from("shoes")
    .upload(imageName, newShoe.image);
  console.log(newShoe.image);

  if (storageEror) {
    await supabase.from("shoes").delete().eq("id", newShoe.id);
    console.error(storageEror);
    throw new Error(
      "shoes image could not be added, and the shoes was not added",
    );
  }

  //3b upload image
  const { error: storageEror1 } = await supabase.storage
    .from("shoes")
    .upload(imageName1, newShoe.image1);
  console.log(newShoe.image1);

  //4 delete the cabin if there was an error uploading the corresponding image
  if (storageEror1) {
    await supabase.from("Footwear").delete().eq("id", newShoe.id);
    console.error(storageEror);
    throw new Error(
      "product image could not be added and the product was not added",
    );
  }

  return data;
}
