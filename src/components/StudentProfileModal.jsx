import React from "react";
import { X, UserRound, GraduationCap, Phone } from "lucide-react";
import { get_initials } from "../utility/getStudentInitials";
import StudentStatusBadge from "./StudentStatusBadge";
import StudentDetail from "./StudentDetail";
import { format_date } from "../utility/formatDate";

export default function StudentProfileModal({ student, on_close }) {
  if (!student) return null;

  const full_name = [student.first_name, student.middle_name, student.last_name]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      onClick={on_close}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-6"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Student Profile
            </h2>

            <p className="text-xs text-slate-500">
              Complete student information
            </p>
          </div>

          <button
            onClick={on_close}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto">
          {/* PROFILE HEADER */}
          <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-7 sm:px-7">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              {student.photo_url ? (
                <img
                  src={student.photo_url}
                  alt={full_name}
                  className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-emerald-100 text-2xl font-bold text-emerald-700">
                  {get_initials(student)}
                </div>
              )}

              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-slate-900">
                  {full_name || "Unnamed Student"}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {student.admission_number || "No admission number"}
                </p>

                <div className="mt-3">
                  <StudentStatusBadge status={student.status} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-7 px-5 py-6 sm:px-7">
            {/* PERSONAL INFORMATION */}
            <section>
              <h4 className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-900">
                <UserRound size={18} className="text-emerald-600" />
                Personal Information
              </h4>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <StudentDetail label="First Name" value={student.first_name} />

                <StudentDetail
                  label="Middle Name"
                  value={student.middle_name}
                />

                <StudentDetail label="Last Name" value={student.last_name} />

                <StudentDetail label="Gender" value={student.gender} />

                <StudentDetail
                  label="Date of Birth"
                  value={
                    student.date_of_birth
                      ? format_date(student.date_of_birth)
                      : "-"
                  }
                />

                <StudentDetail
                  label="Admission Number"
                  value={student.admission_number}
                />
              </div>
            </section>

            <div className="border-t border-slate-100" />

            {/* ACADEMIC INFORMATION */}
            <section>
              <h4 className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-900">
                <GraduationCap size={19} className="text-emerald-600" />
                Academic Information
              </h4>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <StudentDetail label="Class" value={student.class_name} />

                <StudentDetail
                  label="Student Status"
                  value={<StudentStatusBadge status={student.status} />}
                />

                <StudentDetail label="Student ID" value={student.id} />
              </div>
            </section>

            <div className="border-t border-slate-100" />

            {/* PARENT INFORMATION */}
            <section>
              <h4 className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-900">
                <Phone size={18} className="text-emerald-600" />
                Parent / Guardian Information
              </h4>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <StudentDetail
                  label="Parent Name"
                  value={student.parent_name}
                />

                <StudentDetail
                  label="Parent Phone"
                  value={student.parent_phone}
                />

                <StudentDetail
                  label="Parent Email"
                  value={student.parent_email}
                />
              </div>
            </section>

            {/* ADDRESS INFORMATION */}
            {student.address && (
              <>
                <div className="border-t border-slate-100" />

                <section>
                  <h4 className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-900">
                    <MapPin size={18} className="text-emerald-600" />
                    Address Information
                  </h4>

                  <StudentDetail
                    label="Residential Address"
                    value={student.address}
                  />
                </section>
              </>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="shrink-0 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-7">
          <button
            onClick={on_close}
            className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
