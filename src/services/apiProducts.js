import { supabase } from "./supabaseClients";

export async function getShoes() {
  const { data, error } = await supabase.from("Footwear").select("*");

  if (error) {
    console.log(error);
  }

  //   console.log(data);

  return data;
}

export async function getSingleShoes(id) {
  const { data, error } = await supabase
    .from("Footwear")
    .select("*")
    .eq("id", id)
    .single();

  if (error) console.log(error);

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

export async function getSingleSlippers(id) {
  const { data, error } = await supabase
    .from("Slippers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) console.log(error);

  return data;
}
