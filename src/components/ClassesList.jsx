import React from "react";
import { Pencil, Trash2, BookOpen } from "lucide-react";

export default function ClassesList({
  isPending,
  isDeleting,
  filtered_classes,
  isUpdating,
  error,
  search_term,
  handleEditClick,
  handleDeleteClick,
}) {
  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800">All Classes</h2>
        </div>

        {isPending ? (
          <div className="p-10 text-center text-gray-500">
            Loading classes...
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-500">
            Failed to load classes: {error.message}
          </div>
        ) : filtered_classes.length === 0 ? (
          <div className="p-10 text-center">
            <BookOpen size={40} className="mx-auto mb-3 text-gray-300" />

            <h3 className="font-semibold text-gray-700">
              {search_term ? "No matching classes" : "No classes found"}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {search_term
                ? "Try searching with a different class name or section."
                : "Add your first class to get started."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">#</th>

                  <th className="px-5 py-4 font-medium">Class Name</th>

                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filtered_classes.map((item, index) => {
                  const name = item.class_name || item.name || "";

                  const display_name = `${name}${item.section || ""}`;

                  return (
                    <tr key={item.id} className="transition hover:bg-gray-50">
                      <td className="px-5 py-4 text-sm text-gray-500">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                          {display_name}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditClick(item)}
                            disabled={isUpdating || isDeleting}
                            title="Edit class"
                            aria-label={`Edit ${display_name}`}
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteClick(item)}
                            disabled={isDeleting || isUpdating}
                            title="Delete class"
                            aria-label={`Delete ${display_name}`}
                            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
