import { supabase } from "./supabaseClients";

// CREATE SUBJECT

export async function createSubject({ school_id, subject_name }) {
  if (!school_id) {
    throw new Error("School ID is required.");
  }

  if (!subject_name?.trim()) {
    throw new Error("Subject name is required.");
  }

  const { data, error } = await supabase
    .from("subjects")
    .insert({
      school_id,
      subject_name: subject_name.trim(),
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("This subject already exists in your school.");
    }

    throw error;
  }

  return data;
}

// GET ALL SUBJECTS

export async function getSubjects(school_id) {
  if (!school_id) return [];

  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .eq("school_id", school_id)
    .order("subject_name", { ascending: true });

  if (error) throw error;

  return data ?? [];
}

// GET ONE SUBJECT

export async function getSubjectById({ subject_id, school_id }) {
  if (!subject_id || !school_id) {
    throw new Error("Subject ID and school ID are required.");
  }

  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .eq("id", subject_id)
    .eq("school_id", school_id)
    .single();

  if (error) throw error;

  return data;
}

// UPDATE SUBJECT

export async function updateSubject({ subject_id, school_id, subject_name }) {
  if (!subject_id || !school_id) {
    throw new Error("Subject ID and school ID are required.");
  }

  if (!subject_name?.trim()) {
    throw new Error("Subject name is required.");
  }

  const { data, error } = await supabase
    .from("subjects")
    .update({
      subject_name: subject_name.trim(),
    })
    .eq("id", subject_id)
    .eq("school_id", school_id)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("This subject already exists in your school.");
    }

    throw error;
  }

  return data;
}

// DELETE SUBJECT

export async function deleteSubject({ subject_id, school_id }) {
  if (!subject_id || !school_id) {
    throw new Error("Subject ID and school ID are required.");
  }

  const { data, error } = await supabase
    .from("subjects")
    .delete()
    .eq("id", subject_id)
    .eq("school_id", school_id)
    .select()
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    throw new Error(
      "Subject not found or you do not have permission to delete it.",
    );
  }

  return data;
}
