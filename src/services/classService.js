import { supabase } from "./supabaseClients";

// CREATE CLASS
export async function createClass({ school_id, class_name, section }) {
  if (!school_id) {
    throw new Error("School ID is required.");
  }

  if (!class_name?.trim()) {
    throw new Error("Class name is required.");
  }

  const { data, error } = await supabase
    .from("classes")
    .insert({
      school_id,
      class_name: class_name.trim(),
      section,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("This class already exists in your school.");
    }

    throw error;
  }

  return data;
}

// GET ALL CLASSES
export async function getClasses(school_id) {
  if (!school_id) return [];

  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("school_id", school_id)
    .order("class_name", { ascending: true });

  if (error) throw error;

  return data ?? [];
}

// GET ONE CLASS
export async function getClassById({ class_id, school_id }) {
  if (!class_id || !school_id) {
    throw new Error("Class ID and school ID are required.");
  }

  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("id", class_id)
    .eq("school_id", school_id)
    .single();

  if (error) throw error;

  return data;
}

// UPDATE CLASS
export async function updateClass({
  class_id,
  school_id,
  class_name,
  section,
}) {
  if (!class_id || !school_id) {
    throw new Error("Class ID and school ID are required.");
  }

  if (!class_name?.trim()) {
    throw new Error("Class name is required.");
  }

  const { data, error } = await supabase
    .from("classes")
    .update({
      class_name: class_name.trim(),
      section,
    })
    .eq("id", class_id)
    .eq("school_id", school_id)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("This class already exists in your school.");
    }

    throw error;
  }

  return data;
}

// DELETE CLASS
export async function deleteClass({ class_id, school_id }) {
  if (!class_id || !school_id) {
    throw new Error("Class ID and school ID are required.");
  }

  const { data, error } = await supabase
    .from("classes")
    .delete()
    .eq("id", class_id)
    .eq("school_id", school_id)
    .select()
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    throw new Error(
      "Class not found or you do not have permission to delete it.",
    );
  }

  return data;
}
