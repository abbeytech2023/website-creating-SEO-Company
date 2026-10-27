import { useState } from "react";
import { Plus } from "lucide-react";

import TermList from "../components/TermList";
import AddTerm from "../components/AddTermForm";
import { useSchool } from "../hooks/useSchool";

export default function Terms() {
  const [showForm, setShowForm] = useState(false);
  const { school } = useSchool();
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Terms Management
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Create and manage your school's academic terms.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={19} />
            Add Term
          </button>
        </div>

        <TermList />
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <AddTerm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
}
