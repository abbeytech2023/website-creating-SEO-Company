import { supabase } from "./supabaseClients";

export async function getShoes() {
  const { data, error } = await supabase.from("Shoes").select("*");

  if (error) {
    console.log(error);
  }

  //   console.log(data);

  return data;
}
export async function getSlippers() {
  const { data, error } = await supabase.from("Slippers").select("*");

  if (error) {
    console.log(error);
  }

  //   console.log(data);

  return data;
}
