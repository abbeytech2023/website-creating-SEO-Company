import { supabase } from "./supabaseClients";

export async function addStudent(studentData) {
  const { data, error } = await supabase
    .from("students")
    .insert([studentData])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getStudents() {
  // Get the currently logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    throw new Error("No logged-in user");
  }

  // Fetch students belonging to this user's school
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("sch_uid", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
