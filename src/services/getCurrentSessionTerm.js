import { supabase } from "./supabaseClients";

export async function getCurrentSessionAndTerm(school_id) {
  const today = new Date().toISOString().split("T")[0];

  const [
    { data: current_session, error: session_error },
    { data: current_term, error: term_error },
  ] = await Promise.all([
    supabase
      .from("academic_sessions")
      .select("id, name, start_date, end_date")
      .eq("school_id", school_id)
      .lte("start_date", today)
      .gte("end_date", today)
      .limit(1)
      .maybeSingle(),

    supabase
      .from("terms")
      .select("id, name, start_date, end_date")
      .eq("school_id", school_id)
      .lte("start_date", today)
      .gte("end_date", today)
      .limit(1)
      .maybeSingle(),
  ]);

  if (session_error) throw session_error;
  if (term_error) throw term_error;

  return {
    current_session,
    current_term,
  };
}
