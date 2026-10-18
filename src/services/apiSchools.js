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

export async function editCurrentSchool({
  school_id,
  school_name,
  address,
  phone,
  email,
  principal_name,
}) {
  const { data, error } = await supabase
    .from("schools")
    .update({
      school_name,
      address,
      phone,
      email,
      principal_name,
    })
    .eq("id", school_id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

//GET SCHOOL

// 1. Get one school by ID
export async function getSchool(school_id) {
  if (!school_id) {
    throw new Error("School ID is missing.");
  }

  const { data, error } = await supabase
    .from("schools")
    .select("*")
    .eq("id", school_id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// 2. Update school details
export async function updateSchool(school_id, updated_data) {
  if (!school_id) {
    throw new Error("School ID is missing.");
  }

  const { data, error } = await supabase
    .from("schools")
    .update({
      school_name: updated_data.school_name.trim(),
      principal_name: updated_data.principal_name.trim() || null,
      email: updated_data.email.trim(),
      phone: updated_data.phone.trim(),
      address: updated_data.address.trim() || null,
      logo_url: updated_data.logo_url.trim() || null,
    })
    .eq("id", school_id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// 3. Get all schools
export async function getSchools() {
  const { data, error } = await supabase
    .from("schools")
    .select("*")
    .order("school_name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
