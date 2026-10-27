import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supabase } from "../services/supabaseClients";
import {
  School,
  MapPin,
  Phone,
  Mail,
  UserRound,
  Pencil,
  Save,
  X,
  LoaderCircle,
} from "lucide-react";

export default function SchoolProfile({ school_id }) {
  console.log(school_id);

  const query_client = useQueryClient();

  const [is_editing, set_is_editing] = useState(false);

  const [form_data, set_form_data] = useState({
    school_name: "",
    principal_name: "",
    email: "",
    phone: "",
    address: "",
    logo_url: "",
  });

  // 1. Fetch school details
  const {
    data: school,
    isPending: is_loading,
    error,
  } = useQuery({
    queryKey: ["school", school_id],

    queryFn: async () => {
      if (!school_id) {
        throw new Error("School ID is missing.");
      }

      const { data, error } = await supabase
        .from("schools")
        .select("*")
        .eq("id", school_id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },

    enabled: Boolean(school_id),
  });

  // 2. Populate form when school details are fetched
  useEffect(() => {
    if (school) {
      set_form_data({
        school_name: school.school_name || "",
        principal_name: school.principal_name || "",
        email: school.email || "",
        phone: school.phone || "",
        address: school.address || "",
        logo_url: school.logo_url || "",
      });
    }
  }, [school]);

  // 3. Handle input changes
  function handle_change(event) {
    const { name, value } = event.target;

    set_form_data((current_data) => ({
      ...current_data,
      [name]: value,
    }));
  }

  // 4. Update school details
  const { mutate: update_school, isPending: is_saving } = useMutation({
    mutationFn: async (updated_data) => {
      const { data, error } = await supabase
        .from("schools")
        .update({
          school_name: updated_data.school_name.trim(),
          principal_name: updated_data.principal_name.trim() || null,
          email: updated_data.email.trim(),
          phone: updated_data.phone.trim(),
          address: updated_data.address.trim() || null,
          logo_url: updated_data.logo_url.trim() || null,
        })
        .eq("id", school_id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },

    onSuccess: (updated_school) => {
      query_client.setQueryData(["school", school_id], updated_school);

      query_client.invalidateQueries({
        queryKey: ["school"],
      });

      toast.success("School profile updated successfully!");

      set_is_editing(false);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  // 5. Handle saving
  function handle_submit(event) {
    event.preventDefault();

    if (!form_data.school_name.trim()) {
      toast.error("School name is required.");
      return;
    }

    if (!form_data.email.trim()) {
      toast.error("Email address is required.");
      return;
    }

    update_school(form_data);
  }

  // 6. Cancel editing
  function handle_cancel() {
    set_form_data({
      school_name: school.school_name || "",
      principal_name: school.principal_name || "",
      email: school.email || "",
      phone: school.phone || "",
      address: school.address || "",
      logo_url: school.logo_url || "",
    });

    set_is_editing(false);
  }

  // Loading state
  if (is_loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        {" "}
        <LoaderCircle className="animate-spin text-blue-600" size={32} />{" "}
        <span className="ml-3 text-slate-500">
          Loading school profile...{" "}
        </span>{" "}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        {" "}
        <p className="font-medium text-red-600">
          Unable to load school profile.{" "}
        </p>
        <p className="mt-2 text-sm text-red-500">{error.message}</p>
      </div>
    );
  }

  // Missing school
  if (!school) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        {" "}
        <p className="text-slate-600">No school profile was found. </p>{" "}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">School Profile</h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage your school's information.
          </p>
        </div>

        {!is_editing && (
          <button
            type="button"
            onClick={() => set_is_editing(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Pencil size={17} />
            Edit Profile
          </button>
        )}
      </div>

      {/* School Banner */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-32 bg-gradient-to-r from-blue-700 to-blue-500" />

        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-blue-50 shadow-sm">
              {form_data.logo_url ? (
                <img
                  src={form_data.logo_url}
                  alt="School logo"
                  className="h-full w-full object-cover"
                />
              ) : (
                <School size={42} className="text-blue-600" />
              )}
            </div>

            <div className="pb-1">
              <h2 className="text-xl font-bold mt-12 uppercase text-slate-900">
                {school.school_name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">School Information</p>
            </div>
          </div>
        </div>
      </div>

      {/* School Details */}
      <form
        onSubmit={handle_submit}
        className="rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">
            School Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your school's official contact and identification details.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* School Name */}
          <div>
            <label className="mb-2 block text-sm font-medium  text-slate-700">
              School Name
            </label>

            <div className="relative">
              <School
                size={18}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <input
                type="text"
                name="school_name"
                value={form_data.school_name}
                onChange={handle_change}
                disabled={!is_editing || is_saving}
                required
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white disabled:cursor-default"
              />
            </div>
          </div>

          {/* Principal Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Principal Name
            </label>

            <div className="relative">
              <UserRound
                size={18}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <input
                type="text"
                name="principal_name"
                value={form_data.principal_name}
                onChange={handle_change}
                disabled={!is_editing || is_saving}
                placeholder="Enter principal's name"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white disabled:cursor-default"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <input
                type="email"
                name="email"
                value={form_data.email}
                onChange={handle_change}
                disabled={!is_editing || is_saving}
                required
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white disabled:cursor-default"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone Number
            </label>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <input
                type="tel"
                name="phone"
                value={form_data.phone}
                onChange={handle_change}
                disabled={!is_editing || is_saving}
                placeholder="Enter phone number"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white disabled:cursor-default"
              />
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              School Address
            </label>

            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <input
                type="text"
                name="address"
                value={form_data.address}
                onChange={handle_change}
                disabled={!is_editing || is_saving}
                placeholder="Enter school's full address"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white disabled:cursor-default"
              />
            </div>
          </div>

          {/* School Logo URL */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              School Logo URL
            </label>

            <input
              type="url"
              name="logo_url"
              value={form_data.logo_url}
              onChange={handle_change}
              disabled={!is_editing || is_saving}
              placeholder="https://example.com/school-logo.png"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white disabled:cursor-default"
            />

            <p className="mt-1.5 text-xs text-slate-500">
              Enter the public URL of your school's logo.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {is_editing && (
          <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row">
            <button
              type="button"
              onClick={handle_cancel}
              disabled={is_saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
            >
              <X size={17} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={is_saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {is_saving ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
