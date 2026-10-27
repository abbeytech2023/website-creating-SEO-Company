import { supabase } from "./supabaseClients";
export async function apiUploadProfileImage({ file, userId }) {
  if (!file) throw new Error("No file selected");
  if (!userId) throw new Error("User not found");

  // 🔹 1. Get current user (to access old image)
  const { data: currentUser, error: fetchError } = await supabase
    .from("schools")
    .select("logo_url")
    .eq("id", userId)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  // 🔹 2. Upload new image
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("school-logo")
    .upload(filePath, file, {
      upsert: true,
    });

  if (uploadError) throw new Error(uploadError.message);

  // 🔹 3. Get public URL
  const { data } = supabase.storage.from("school-logo").getPublicUrl(filePath);

  const newImageUrl = data.publicUrl;

  // 🔥 4. Delete OLD image (if exists)
  if (currentUser?.profilePicture) {
    try {
      const oldUrl = currentUser.profilePicture;

      // Extract path from URL
      const urlParts = oldUrl.split("/storage/v1/object/public/school-logo/");

      const oldPath = urlParts[1];

      if (oldPath) {
        await supabase.storage.from("school-logo").remove([oldPath]);
      }
    } catch (err) {
      console.warn("Old image deletion failed:", err.message);
      // ❗ Don't block the flow if deletion fails
    }
  }

  // 🔹 5. Update DB with new image
  const { data: updatedUser, error: dbError } = await supabase
    .from("schools")
    .update({ logo_url: newImageUrl })
    .eq("id", userId)
    .select()
    .single();

  if (dbError) throw new Error(dbError.message);

  return updatedUser;
}
