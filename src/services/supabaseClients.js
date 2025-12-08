import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://xntxnxgieofaucazfwwe.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhudHhueGdpZW9mYXVjYXpmd3dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNDUxNjYsImV4cCI6MjA3NjgyMTE2Nn0.FRnva_Bom9ZBCi7Mcq1MF1yF2V9hPwMQcVUvENiuAUE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
