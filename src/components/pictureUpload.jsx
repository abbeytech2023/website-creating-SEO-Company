import { useEffect, useRef, useState } from "react";
import { Camera, Image as ImageIcon, Loader2, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

export default function PictureUpload({
  image_url = "",
  on_upload_success,
  upload_image,
  is_uploading = false,
}) {
  const file_input_ref = useRef(null);

  const [selected_file, set_selected_file] = useState(null);
  const [preview_url, set_preview_url] = useState(image_url);

  // Keep preview in sync with the saved image
  useEffect(() => {
    set_preview_url(image_url);
  }, [image_url]);

  // Clean up temporary preview URL
  useEffect(() => {
    return () => {
      if (preview_url?.startsWith("blob:")) {
        URL.revokeObjectURL(preview_url);
      }
    };
  }, [preview_url]);

  function handle_file_change(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      event.target.value = "";
      return;
    }

    // Validate file size
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be smaller than 2MB.");
      event.target.value = "";
      return;
    }

    set_selected_file(file);

    const new_preview_url = URL.createObjectURL(file);
    set_preview_url(new_preview_url);
  }

  function handle_select_image() {
    file_input_ref.current?.click();
  }

  function handle_remove() {
    set_selected_file(null);
    set_preview_url(image_url || "");

    if (file_input_ref.current) {
      file_input_ref.current.value = "";
    }
  }

  async function handle_upload() {
    if (!selected_file) {
      toast.error("Please select an image first.");
      return;
    }

    try {
      const updated_school = await upload_image(selected_file);

      set_selected_file(null);

      if (file_input_ref.current) {
        file_input_ref.current.value = "";
      }

      on_upload_success?.(updated_school);

      toast.success("School logo updated successfully.");
    } catch (error) {
      console.error("Image upload error:", error);

      toast.error(error?.message || "Failed to upload image.");
    }
  }

  const has_selected_image = Boolean(selected_file);

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      {/* Picture */}
      <div className="relative shrink-0">
        <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
          {preview_url ? (
            <img
              src={preview_url}
              alt="School logo"
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon className="h-10 w-10 text-gray-300" />
          )}
        </div>

        {/* Camera button */}
        <button
          type="button"
          onClick={handle_select_image}
          disabled={is_uploading}
          className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-gray-900 text-white shadow-md transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Change picture"
        >
          <Camera className="h-4 w-4" />
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">School Logo</h3>

          <p className="mt-1 text-sm text-gray-500">
            Upload your school's logo.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handle_select_image}
            disabled={is_uploading}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            {preview_url ? "Change Logo" : "Choose Logo"}
          </button>

          {has_selected_image && (
            <>
              <button
                type="button"
                onClick={handle_remove}
                disabled={is_uploading}
                className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                <X className="h-4 w-4" />
                Remove
              </button>

              <button
                type="button"
                onClick={handle_upload}
                disabled={is_uploading}
                className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {is_uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Apply Logo
                  </>
                )}
              </button>
            </>
          )}
        </div>

        <p className="text-xs text-gray-500">JPG, PNG or WebP • Maximum 2MB</p>

        {has_selected_image && (
          <p className="text-xs font-medium text-amber-600">
            Logo selected but not saved yet.
          </p>
        )}
      </div>

      {/* Hidden input */}
      <input
        ref={file_input_ref}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handle_file_change}
        className="hidden"
      />
    </div>
  );
}
