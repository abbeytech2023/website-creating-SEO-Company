import { School, ShieldCheck, Settings2, ChevronRight } from "lucide-react";

import PictureUpload from "../components/pictureUpload";
import SchoolProfile from "../components/SchoolProfile";
import { useSchool } from "../hooks/useSchool";
import ProfileImageUploader from "../components/ProfileImageUploader";

export default function Profile() {
  const { school } = useSchool();

  return (
    <div className="min-h-screen bg-[#f6f8fb] px-4 py-6 sm:px-6 lg:px-10">
      {" "}
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Page Heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <span>Dashboard</span>
              <ChevronRight size={14} />
              <span className="font-medium text-emerald-600">Settings</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              School Settings
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Manage your school's identity, branding, and official information.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Settings2 size={23} />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">SETTINGS</p>
              <p className="text-sm font-semibold text-slate-800">
                Profile Management
              </p>
            </div>
          </div>
        </div>

        {/* School Identity Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

          <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
              <School size={38} strokeWidth={1.5} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl uppercase font-bold text-slate-900 sm:text-2xl">
                  {school?.school_name || "Your School"}
                </h2>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <ShieldCheck size={14} />
                  School Profile
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Your school's official identity and contact information are
                managed from this page.
              </p>
            </div>

            <div className="hidden shrink-0 text-right sm:block">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Platform
              </p>
              <p className="mt-1 font-semibold text-slate-800">
                Scholar School
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid items-start gap-7 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Left Column */}
          <aside className="space-y-6">
            {/* Branding */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <School size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      School Branding
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Logo and identity
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                {/* <PictureUpload /> */}
                <ProfileImageUploader user={school} />
              </div>
            </div>

            {/* Guidance Card */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                <ShieldCheck size={21} />
              </div>

              <h3 className="text-sm font-bold text-slate-800">
                Your school, your identity
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Keep your school's information accurate and your branding
                consistent across your school management workspace.
              </p>

              <div className="mt-4 flex items-center gap-2 border-t border-emerald-100 pt-4 text-xs font-medium text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Profile management
              </div>
            </div>
          </aside>

          {/* Right Column */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  General Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View and update your official school details.
                </p>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
                <Settings2 size={15} />
                School Details
              </div>
            </div>

            <div className="p-4 sm:p-7">
              <SchoolProfile school_id={school?.id} />
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
          <p>© Scholar School</p>
          <p>School Management Made Simpler.</p>
        </div>
      </div>
    </div>
  );
}
