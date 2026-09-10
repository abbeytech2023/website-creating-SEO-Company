import { supabase } from "./supabaseClients";

export async function getCurrentProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("uid", user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
