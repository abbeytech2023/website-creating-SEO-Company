import { supabase } from "./supabaseClients";

export async function addTeacher(TeacherData) {
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
