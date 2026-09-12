import { supabase } from "./supabaseClients";

export async function getCurrentSchool(userId) {
  // Get the admin's profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("school_id")
    .eq("uid", userId)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  if (!profile?.school_id) {
    throw new Error("No school is connected to this account.");
  }

  // Get the school
  const { data: school, error: schoolError } = await supabase
    .from("schools")
    .select("*")
    .eq("id", profile.school_id)
    .single();

  if (schoolError) {
    throw new Error(schoolError.message);
  }

  return school;
}
