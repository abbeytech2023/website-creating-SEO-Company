import { supabase } from "./supabaseClients";

export async function createAcademicSession({
  schoolId,
  name,
  startDate,
  endDate,
}) {
  if (!schoolId) {
    throw new Error("School ID is required.");
  }

  const { data, error } = await supabase
    .from("academic_sessions")
    .insert({
      school_id: schoolId,
      name,
      start_date: startDate,
      end_date: endDate,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteAcademicSession(sessionId, schoolId) {
  if (!sessionId || !schoolId) {
    throw new Error("Session ID and school ID are required.");
  }

  const { error } = await supabase
    .from("academic_sessions")
    .delete()
    .eq("id", sessionId)
    .eq("school_id", schoolId);

  if (error) throw error;
}

export async function getAcademicSessions(schoolId) {
  if (!schoolId) {
    return [];
  }

  const { data, error } = await supabase
    .from("academic_sessions")
    .select("*")
    .eq("school_id", schoolId)
    .order("start_date", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

// export async function setCurrentAcademicSession({ schoolId, sessionId }) {
//   if (!schoolId || !sessionId) {
//     throw new Error("School ID and session ID are required.");
//   }

//   // Make sure the selected session belongs to this school
//   const { data: session, error: fetchError } = await supabase
//     .from("academic_sessions")
//     .select("id, name, end_date")
//     .eq("id", sessionId)
//     .eq("school_id", schoolId)
//     .maybeSingle();

//   if (fetchError) throw fetchError;

//   if (!session) {
//     throw new Error("Academic session not found for this school.");
//   }

//   // Mark this session as the current session
//   const { data, error } = await supabase
//     .from("academic_sessions")
//     .update({ is_current: true })
//     .eq("id", sessionId)
//     .eq("school_id", schoolId)
//     .select()
//     .single();

//   if (error) throw error;

//   return data;
// }
