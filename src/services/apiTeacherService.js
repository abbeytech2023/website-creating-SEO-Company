import { supabase } from "./supabaseClients";

export async function addStudent(TeacherData) {
  const { data, error } = await supabase
    .from("teacher")
    .insert([TeacherData])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
