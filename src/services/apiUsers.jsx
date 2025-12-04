import { supabase } from "./supabaseClients";

//All vendors
export async function getUsers() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.log(error);
  }

  //   console.log(data);

  return data;
}

//Shoe makers
export async function getShoeMakers() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "vendor-shoe-maker");

  if (error) console.log(data);

  return data;
}

//akube stores
export async function getAkubeStores() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "vendor-akube-store");

  if (error) console.log(data);

  return data;
}
