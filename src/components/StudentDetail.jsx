import React from "react";

export default function StudentDetail({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-400">{label}</p>

      <div className="mt-1 break-words text-sm font-medium text-slate-700">
        {value || "-"}
      </div>
    </div>
  );
}
