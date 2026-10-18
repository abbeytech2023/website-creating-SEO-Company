import { supabase } from "./supabaseClients";

//General signup
export async function signup({
  email,
  password,
  adminName,
  schoolName,
  phone,
}) {
  // 1. Create authentication user
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

  if (error) {
    console.error("Signup error:", error);
    throw new Error(error.message);
  }

  const user = data.user;

  if (!user) {
    throw new Error("User was not returned from Supabase.");
  }

  // 2. Create school
  const { data: school, error: schoolError } = await supabase
    .from("schools")
    .insert([
      {
        school_name: schoolName,
        email,
        phone,
      },
    ])
    .select()
    .single();

  if (schoolError) {
    console.error("School insert error:", schoolError);
    throw new Error(schoolError.message);
  }

  console.log("School created:", school);

  // 3. Create admin profile and connect it to the school
  const { error: profileError } = await supabase.from("profiles").insert([
    {
      uid: user.id,
      email,
      admin_name: adminName,
      phone,
      role: "admin",
      school_id: school.id,
    },
  ]);

  if (profileError) {
    console.error("Profile insert error:", profileError);
    throw new Error(profileError.message);
  }

  console.log("User registered and profile saved successfully.");

  return {
    ...data,
    school,
  };
}

// Login
export async function login({ email, password }) {
  console.log("ONLINE:", navigator.onLine);

  if (!navigator.onLine) {
    throw new Error("No internet connection. Please check your network.");

    return;
  }

  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(
        new Error("Connection timeout. Please check your internet connection."),
      );
    }, 10000);
  });

  const request = supabase.auth.signInWithPassword({
    email,
    password,
  });

  try {
    const { data, error } = await Promise.race([request, timeout]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || "Unable to login. Please check your connection.",
    );
  }
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user ?? null;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function registerTeacher(teacher_data) {
  const {
    email,
    password,
    first_name,
    middle_name,
    last_name,
    gender,
    date_of_birth,
    phone,
    address,
    employee_id,
    qualification,
    status,
    bank_name,
    account_name,
    account_number,
  } = teacher_data;

  // 1. Register teacher in Supabase Authentication
  const { data: auth_data, error: auth_error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        middle_name,
        last_name,
        role: "teacher",
      },
    },
  });

  if (auth_error) {
    throw new Error(auth_error.message);
  }

  const user = auth_data.user;

  if (!user) {
    throw new Error("Teacher authentication account was not created.");
  }

  // 2. Save teacher information in the teacher table
  const { data: teacher, error: teacher_error } = await supabase
    .from("teachers")
    .insert([
      {
        uid: user.id,
        email,
        first_name,
        middle_name: middle_name || null,
        last_name,
        gender,
        date_of_birth: date_of_birth || null,
        phone_number: phone,
        residential_address: address || null,
        qualification: qualification || null,
        bank_name: bank_name || null,
        account_name: account_name || null,
        account_number: account_number || null,
      },
    ])
    .select()
    .single();

  if (teacher_error) {
    console.error("Teacher profile error:", teacher_error);

    throw new Error(
      `Authentication account created, but teacher profile could not be saved: ${teacher_error.message}`,
    );
  }

  // 3. Return the created records
  return {
    user,
    teacher,
  };
}
