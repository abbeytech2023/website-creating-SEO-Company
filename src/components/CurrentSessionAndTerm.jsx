import { CalendarDays, GraduationCap } from "lucide-react";

import { useCurrentSessionAndTerm } from "../hooks/useCurrentSessionAndTerm";
import Greeting from "./Greetings";
import { useSchool } from "../hooks/useSchool";
import { Link } from "react-router-dom";

function CurrentSessionTerm() {
  const { school } = useSchool();

  const school_id = school?.id;
  const { data, isPending, isError } = useCurrentSessionAndTerm(school_id);

  if (isPending) {
    return (
      <div className="animate-pulse">
        <div className="mb-4 h-7 w-52 rounded-full bg-white/10" />
        <div className="h-9 w-64 rounded-lg bg-white/10" />
        <div className="mt-3 h-5 w-72 rounded-lg bg-white/10" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-sm text-red-200">
        Unable to load academic information. Please try again.
      </div>
    );
  }

  const { current_session, current_term } = data || {};

  return (
    <div>
      {/* Academic Session Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-indigo-50 backdrop-blur-sm sm:text-sm">
        <span
          className={`h-2 w-2 rounded-full ${
            current_session ? "bg-emerald-300" : "bg-amber-300"
          }`}
        />

        <CalendarDays size={15} className="text-indigo-200" />

        {current_session?.name || "No academic session set"}
      </div>

      {/* Dashboard Greeting */}
      <Greeting />

      {/* Current Term Information */}
      <div className="mt-2 flex items-start gap-2 text-sm text-indigo-100 sm:text-base">
        <GraduationCap size={18} className="mt-0.5 shrink-0 text-indigo-200" />

        <div>
          {current_session && current_term ? (
            <p>
              Everything is on track for{" "}
              <span className="font-semibold text-white">
                {current_term.name}
              </span>
              .
            </p>
          ) : current_session && !current_term ? (
            <div>
              <p>
                <span className="font-semibold text-white">
                  {current_session.name}
                </span>{" "}
                is active, but no current term has been created.
              </p>

              <p className="mt-1 text-xs text-indigo-200 sm:text-sm">
                Create an academic term to start managing results.
              </p>
            </div>
          ) : (
            <div>
              <p className="font-semibold text-white">
                Welcome to your school dashboard!
              </p>

              <Link
                to="/academic_session"
                className="mt-1 text-xs text-indigo-200 sm:text-sm"
              >
                Create an academic session to get started with your school's
                academic management.
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrentSessionTerm;
``;
