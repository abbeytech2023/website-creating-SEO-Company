import { useEffect, useState } from "react";
import {
  Building2,
  Camera,
  Mail,
  MapPin,
  Phone,
  User,
  Save,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "../services/supabaseClients";
import toast from "react-hot-toast";

const initial_school = {
  id: "",
  school_name: "",
  school_logo: "",
  address: "",
  phone: "",
  email: "",
  principal_name: "",
};

export default function SchoolProfile() {
  const [school, set_school] = useState(initial_school);

  const [is_loading, set_is_loading] = useState(true);
  const [is_saving, set_is_saving] = useState(false);

  const [school_id, set_school_id] = useState(null);
  const [logo_file, set_logo_file] = useState(null);
  const [logo_preview, set_logo_preview] = useState("");

  // Check if local object has been changed
  const [has_changes, set_has_changes] = useState(false);

  useEffect(() => {
    async function fetch_school() {
      try {
        set_is_loading(true);

        // Get current logged-in user
        const {
          data: { user },
          error: user_error,
        } = await supabase.auth.getUser();

        if (user_error) throw user_error;

        if (!user) {
          toast.error("You are not logged in.");
          return;
        }

        // Get the school_id from the user's profile
        const { data: profile, error: profile_error } = await supabase
          .from("profiles")
          .select("school_id")
          .eq("uid", user.id)
          .single();

        if (profile_error) throw profile_error;

        set_school_id(profile.school_id);

        // Get the saved school
        const { data: school_data, error: school_error } = await supabase
          .from("schools")
          .select(
            "id, school_name, school_logo, address, phone, email, principal_name",
          )
          .eq("id", profile.school_id)
          .single();

        if (school_error) throw school_error;

        // Store Supabase data in our local object
        set_school(school_data);

        // Set logo preview
        set_logo_preview(school_data.school_logo || "");

        // Nothing has been edited yet
        set_has_changes(false);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load school information.");
      } finally {
        set_is_loading(false);
      }
    }

    fetch_school();
  }, []);

  // Handle normal input changes
  function handle_change(e) {
    const { name, value } = e.target;

    set_school((prev) => ({
      ...prev,
      [name]: value,
    }));

    set_has_changes(true);
  }

  // Handle logo
  function handle_logo_change(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo must be less than 2MB.");
      return;
    }

    set_logo_file(file);

    const preview = URL.createObjectURL(file);

    set_logo_preview(preview);
    set_has_changes(true);
  }

  // Upload logo to Supabase Storage
  async function upload_logo() {
    if (!logo_file) {
      return school.school_logo;
    }

    const file_extension = logo_file.name.split(".").pop();

    const file_name = `${school_id}-${Date.now()}.${file_extension}`;

    const { error: upload_error } = await supabase.storage
      .from("school-logos")
      .upload(file_name, logo_file, {
        upsert: true,
      });

    if (upload_error) throw upload_error;

    const { data } = supabase.storage
      .from("school-logos")
      .getPublicUrl(file_name);

    return data.publicUrl;
  }

  async function handle_save() {
    if (!school_id) {
      toast.error("School information is missing.");
      return;
    }

    try {
      set_is_saving(true);

      let logo_url = school.school_logo;

      // Upload new logo if one was selected
      if (logo_file) {
        logo_url = await upload_logo();
      }

      // Update Supabase
      const { data, error } = await supabase
        .from("schools")
        .update({
          school_name: school.school_name,
          school_logo: logo_url,
          address: school.address,
          phone: school.phone,
          email: school.email,
          principal_name: school.principal_name,
        })
        .eq("id", school_id)
        .select()
        .single();

      if (error) throw error;

      // Replace local object with the newly saved data
      set_school(data);

      set_logo_file(null);
      set_logo_preview(data.school_logo || "");

      set_has_changes(false);

      toast.success("School profile updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save school information.");
    } finally {
      set_is_saving(false);
    }
  }

  if (is_loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-8 w-48 rounded bg-slate-200" />

          <div className="h-4 w-80 rounded bg-slate-200" />

          <div className="rounded-2xl bg-white p-7">
            <div className="h-24 w-24 rounded-2xl bg-slate-200" />

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="h-12 rounded-xl bg-slate-200" />
              <div className="h-12 rounded-xl bg-slate-200" />
              <div className="h-12 rounded-xl bg-slate-200" />
              <div className="h-12 rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <span>Settings</span>
            <span>/</span>
            <span className="text-slate-700">School Profile</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            School Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage your school's information and contact details.
          </p>
        </div>

        <div className="space-y-6">
          {/* School Information */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Building2 size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    School Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Basic information about your school.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              {/* Logo */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    {logo_preview ? (
                      <img
                        src={logo_preview}
                        alt="School logo"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Building2 size={38} className="text-slate-300" />
                    )}
                  </div>

                  <label
                    htmlFor="school_logo"
                    className="absolute -bottom-2 -right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    <Camera size={15} />

                    <input
                      id="school_logo"
                      type="file"
                      accept="image/*"
                      onChange={handle_logo_change}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <h3 className="font-medium text-slate-900">School Logo</h3>

                  <p className="mt-1 max-w-md text-sm text-slate-500">
                    This logo can be displayed on report cards and other school
                    documents.
                  </p>

                  <label
                    htmlFor="school_logo"
                    className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <Camera size={16} />
                    Change Logo
                    <input
                      id="school_logo"
                      type="file"
                      accept="image/*"
                      onChange={handle_logo_change}
                      className="hidden"
                    />
                  </label>

                  <p className="mt-2 text-xs text-slate-400">
                    JPG, PNG or WEBP · Maximum 2MB
                  </p>
                </div>
              </div>

              {/* School Fields */}
              <div className="mt-8 space-y-6">
                <Input
                  label="School Name"
                  name="school_name"
                  value={school.school_name}
                  onChange={handle_change}
                  placeholder="Enter school name"
                  icon={<Building2 size={17} />}
                />

                <Input
                  label="School Address"
                  name="address"
                  value={school.address}
                  onChange={handle_change}
                  placeholder="Enter school address"
                  icon={<MapPin size={17} />}
                />
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Phone size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Contact Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    How parents and visitors can contact the school.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
              <Input
                label="Phone Number"
                name="phone"
                value={school.phone}
                onChange={handle_change}
                placeholder="08012345678"
                icon={<Phone size={17} />}
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                value={school.email}
                onChange={handle_change}
                placeholder="school@example.com"
                icon={<Mail size={17} />}
              />

              <div className="sm:col-span-2">
                <Input
                  label="Principal / Head Teacher"
                  name="principal_name"
                  value={school.principal_name}
                  onChange={handle_change}
                  placeholder="Enter principal's name"
                  icon={<User size={17} />}
                />
              </div>
            </div>
          </section>

          {/* Save Bar */}
          <div className="sticky bottom-4 z-10">
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm">
                {has_changes ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-amber-500" />

                    <span className="text-slate-600">
                      You have unsaved changes
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={17} className="text-emerald-600" />

                    <span className="text-slate-500">
                      All changes are saved
                    </span>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={handle_save}
                disabled={!has_changes || is_saving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
              >
                <Save size={17} />

                {is_saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Input */
function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
        />
      </div>
    </div>
  );
}
