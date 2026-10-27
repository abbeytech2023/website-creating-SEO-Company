import { useEffect, useRef, useState } from "react";
import { useApiUploadProfileImage } from "../hooks/useUplaodSchoolImage";
import {
  Camera,
  CheckCircle2,
  ImagePlus,
  LoaderCircle,
  Upload,
  X,
} from "lucide-react";

export default function ProfileImageUploader({ user }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef(null);

  const { mutate, isPending, isSuccess } = useApiUploadProfileImage();

  const MAX_FILE_SIZE_KB = 500;

  // Clean up preview URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Compress the selected image
  const compressImage = (file, maxWidth = 600, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const img = new Image();

      reader.onerror = () => reject(new Error("Unable to read this image."));

      img.onerror = () => reject(new Error("Invalid or unsupported image."));

      reader.onload = (event) => {
        img.src = event.target.result;
      };

      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");

          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            const scale = maxWidth / width;
            width = maxWidth;
            height = Math.round(height * scale);
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error("Unable to process this image."));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Image compression failed."));
                return;
              }

              const compressedFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, "") + ".jpg",
                {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                },
              );

              resolve(compressedFile);
            },
            "image/jpeg",
            quality,
          );
        } catch {
          reject(new Error("Unable to compress this image."));
        }
      };

      reader.readAsDataURL(file);
    });
  };

  // Validate and prepare the selected image
  const processFile = async (selectedFile) => {
    setError("");

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Please choose an image smaller than 10 MB.");
      return;
    }

    try {
      const compressedFile = await compressImage(selectedFile);

      if (compressedFile.size > MAX_FILE_SIZE_KB * 1024) {
        setError(
          "This image is still too large after compression. Try another image.",
        );
        return;
      }

      setFile(compressedFile);
      setPreview(URL.createObjectURL(compressedFile));
    } catch (err) {
      setError(
        err.message || "Something went wrong while processing the image.",
      );
    }
  };

  const handleFileChange = (event) => {
    processFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    processFile(event.dataTransfer.files?.[0]);
  };

  const handleUpload = () => {
    if (!file || !user?.id || isPending) return;

    mutate(
      {
        file,
        userId: user.id,
      },
      {
        onSuccess: () => {
          setFile(null);
          setPreview("");
          setError("");
        },
        onError: () => {
          setError("Upload failed. Please try again.");
        },
      },
    );
  };

  const handleCancel = () => {
    setFile(null);
    setPreview("");
    setError("");
  };

  const currentImage = user?.logo_url || "/default-avatar.png";

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* HEADER */}
        <div className="border-b border-gray-100 px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
              <Camera size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Profile Picture
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Personalize your profile with a photo.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-5 sm:p-7">
          {/* CURRENT PROFILE */}
          <div className="flex flex-col items-center gap-4 rounded-xl bg-gray-50 p-5 sm:flex-row sm:gap-5">
            <div className="relative shrink-0">
              <img
                src={preview || currentImage}
                alt="Profile"
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-sm"
              />

              <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-green-600 text-white">
                <Camera size={15} />
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-gray-900">
                {file ? "New profile picture" : "Your current picture"}
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                {file
                  ? "Your new photo is ready to upload."
                  : "Choose a clear photo so your profile is easy to recognize."}
              </p>

              {file && (
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  <CheckCircle2 size={14} />
                  Image ready
                </div>
              )}
            </div>
          </div>

          {/* UPLOAD AREA */}
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsDragging(false);
              }
            }}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`group cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200 sm:p-8 ${
              isDragging
                ? "border-green-500 bg-green-50"
                : "border-gray-300 bg-white hover:border-green-500 hover:bg-green-50/50"
            }`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition-transform group-hover:scale-105">
              {file ? <ImagePlus size={27} /> : <Upload size={27} />}
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              {isDragging
                ? "Drop your image here"
                : file
                  ? "Choose a different image"
                  : "Upload a new picture"}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Drag and drop your image here, or{" "}
              <span className="font-semibold text-green-700">browse files</span>
            </p>

            <p className="mt-3 text-xs text-gray-400">
              JPG, PNG, WEBP · Maximum 10 MB before compression
            </p>

            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* SELECTED FILE DETAILS */}
          {file && (
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 sm:p-4">
              <img
                src={preview}
                alt="Selected image preview"
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-800">
                  {file.name}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB · Compressed image
                </p>
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleCancel();
                }}
                disabled={isPending}
                aria-label="Remove selected image"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
              >
                <X size={19} />
              </button>
            </div>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {isSuccess && !file && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              <CheckCircle2 size={18} />
              Profile picture updated successfully.
            </div>
          )}

          {/* FOOTER */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-gray-400">
              Maximum compressed image size: 500 KB
            </p>

            <button
              type="button"
              onClick={handleUpload}
              disabled={!file || isPending || !user?.id}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
            >
              {isPending ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Update Picture
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
