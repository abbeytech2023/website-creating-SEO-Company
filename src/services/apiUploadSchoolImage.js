import { supabase } from "../services/supabaseClients";

export async function uploadSchoolImage({ file, school_id }) {
  if (!file) {
    throw new Error("No file selected");
  }

  if (!school_id) {
    throw new Error("School not found");
  }

  // 1. Get current school logo
  const { data: current_school, error: fetch_error } = await supabase
    .from("schools")
    .select("logo_url")
    .eq("id", school_id)
    .single();

  if (fetch_error) {
    throw new Error(fetch_error.message);
  }

  // 2. Upload new image
  const file_ext = file.name.split(".").pop();
  const file_name = `${Date.now()}.${file_ext}`;
  const file_path = `${school_id}/${file_name}`;

  const { error: upload_error } = await supabase.storage
    .from("school-images")
    .upload(file_path, file, {
      upsert: true,
      contentType: file.type,
    });

  if (upload_error) {
    throw new Error(upload_error.message);
  }

  // 3. Get public URL
  const { data } = supabase.storage
    .from("school-images")
    .getPublicUrl(file_path);

  const new_image_url = data.publicUrl;

  // 4. Delete old image if one exists
  if (current_school?.logo_url) {
    try {
      const old_url = current_school.logo_url;

      const url_parts = old_url.split(
        "/storage/v1/object/public/school-images/",
      );

      const old_path = url_parts[1];

      if (old_path) {
        await supabase.storage.from("school-images").remove([old_path]);
      }
    } catch (error) {
      console.warn("Old school logo deletion failed:", error.message);
    }
  }

  // 5. Update schools table with new image URL
  const { data: updated_school, error: db_error } = await supabase
    .from("schools")
    .update({
      logo_url: new_image_url,
    })
    .eq("id", school_id)
    .select()
    .single();

  if (db_error) {
    throw new Error(db_error.message);
  }

  return updated_school;
}
