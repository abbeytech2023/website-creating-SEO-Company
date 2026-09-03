import { supabase } from "./supabaseClients";

export async function signup({
  email,
  password,
  adminName,
  schoolName,
  phone,
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        adminName,
        schoolName,
        phone,
      },
    },
  });
  console.log(error);

  console.log(email, adminName, schoolName, phone, password);

  if (error) {
    console.error("Signup error:", error);
    throw new Error(error.message);
  }

  const user = data.user;

  console.log("Auth user:", user);

  if (!user) {
    throw new Error("User was not returned from Supabase.");
  }

  // Save admin information in profiles table
  const { error: insertError } = await supabase.from("profiles").insert([
    {
      uid: user.id,
      email,
      adminName,
      schoolName,
      phone,
    },
  ]);

  if (insertError) {
    console.error("Profile insert error:", insertError);
    throw new Error(insertError.message);
  }

  console.log("User registered and profile saved successfully.");

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(error);

  console.log(data);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  // console.log(data);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
