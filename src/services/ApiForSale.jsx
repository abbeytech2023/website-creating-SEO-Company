import { supabase, supabaseUrl } from "./supabaseClients";

export async function addShoesForSaleApi(newShoe) {
  const imageName = `${Math.random()}-${newShoe.image.name}`.replace("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/shoes/${imageName}`;
  // https://eluekkplzzlsspmxmoky.supabase.co/storage/v1/object/public/to-lets//download%20(1).jpg

  const { data, error } = await supabase
    .from("Footwear")
    .insert([{ ...newShoe, image: imagePath }])
    .select();

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error("property could not be created");
  }

  //3 upload image
  const { error: storageEror } = await supabase.storage
    .from("shoes")
    .upload(imageName, newShoe.image);
  console.log(newShoe.image);

  //4 delete the cabin if there was an error uploading the corresponding image
  if (storageEror) {
    await supabase.from("Footwear").delete().eq("id", newShoe.id);
    console.error(storageEror);
    throw new Error(
      "property image could not be added and the property was not added"
    );
  }

  return data;
}
