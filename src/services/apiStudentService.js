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
