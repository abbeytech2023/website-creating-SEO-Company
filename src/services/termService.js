import { supabase } from "./supabaseClients";

// CREATE TERM
export async function createTerm({
  school_id,
  academic_session_id,
  name,
  start_date,
  end_date,
}) {
  if (!school_id) {
    throw new Error("School ID is required.");
  }

  if (!academic_session_id) {
    throw new Error("Please select an academic session.");
  }

  if (!name?.trim()) {
    throw new Error("Term name is required.");
  }

  if (!start_date || !end_date) {
    throw new Error("Start date and end date are required.");
  }

  if (end_date <= start_date) {
    throw new Error("End date must be after start date.");
  }

  // Verify that the selected academic session belongs to this school.
  const { data: session, error: session_error } = await supabase
    .from("academic_sessions")
    .select("id, start_date, end_date")
    .eq("id", academic_session_id)
    .eq("school_id", school_id)
    .single();

  if (session_error) throw session_error;

  if (start_date < session.start_date || end_date > session.end_date) {
    throw new Error(
      "The term dates must fall within the academic session dates.",
    );
  }

  const { data, error } = await supabase
    .from("terms")
    .insert({
      school_id,
      academic_session_id,
      name: name.trim(),
      start_date,
      end_date,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

// DELETE TERM
export async function deleteTerm(term_id, school_id) {
  if (!term_id || !school_id) {
    throw new Error("Term ID and school ID are required.");
  }

  const { error } = await supabase
    .from("terms")
    .delete()
    .eq("id", term_id)
    .eq("school_id", school_id);

  if (error) throw error;
}

// GET TERMS
export async function getTerms(school_id) {
  if (!school_id) {
    return [];
  }

  const { data, error } = await supabase
    .from("terms")
    .select("*")
    .eq("school_id", school_id)
    .order("start_date", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}
