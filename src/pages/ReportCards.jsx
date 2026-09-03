import { useMemo, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Search,
  FileText,
  Download,
  Printer,
  Eye,
  X,
  CheckCircle2,
  AlertCircle,
  Users,
  GraduationCap,
  Award,
  ChevronDown,
} from "lucide-react";

/* =========================================================
   MOCK DATA
========================================================= */

const students = [
  {
    id: 1,
    admissionNumber: "GHS/2026/001",
    firstName: "Daniel",
    middleName: "Chukwu",
    lastName: "Okafor",
    gender: "Male",
    class: "JSS 1A",
    attendance: {
      present: 88,
      total: 95,
    },
  },
  {
    id: 2,
    admissionNumber: "GHS/2026/002",
    firstName: "Amaka",
    middleName: "Joy",
    lastName: "Eze",
    gender: "Female",
    class: "JSS 1A",
    attendance: {
      present: 91,
      total: 95,
    },
  },
  {
    id: 3,
    admissionNumber: "GHS/2026/003",
    firstName: "Samuel",
    middleName: "David",
    lastName: "Adekunle",
    gender: "Male",
    class: "JSS 1B",
    attendance: {
      present: 84,
      total: 95,
    },
  },
  {
    id: 4,
    admissionNumber: "GHS/2026/004",
    firstName: "Blessing",
    middleName: "Mary",
    lastName: "Adebayo",
    gender: "Female",
    class: "JSS 1B",
    attendance: {
      present: 92,
      total: 95,
    },
  },
];

const subjects = [
  {
    id: 1,
    name: "English Studies",
    code: "ENG",
  },
  {
    id: 2,
    name: "Mathematics",
    code: "MTH",
  },
  {
    id: 3,
    name: "Basic Science",
    code: "BSC",
  },
  {
    id: 4,
    name: "Social Studies",
    code: "SOS",
  },
  {
    id: 5,
    name: "Computer Studies",
    code: "CST",
  },
  {
    id: 6,
    name: "Civic Education",
    code: "CVE",
  },
  {
    id: 7,
    name: "Agricultural Science",
    code: "AGR",
  },
  {
    id: 8,
    name: "Business Studies",
    code: "BST",
  },
];

/*
  In the real application these results will come from Supabase.

  CA = 20
  Exam = 80
  Total = 100
*/

const results = {
  1: [
    {
      subjectId: 1,
      ca: 17,
      exam: 72,
      status: "approved",
    },
    {
      subjectId: 2,
      ca: 19,
      exam: 75,
      status: "approved",
    },
    {
      subjectId: 3,
      ca: 16,
      exam: 68,
      status: "approved",
    },
    {
      subjectId: 4,
      ca: 18,
      exam: 70,
      status: "approved",
    },
    {
      subjectId: 5,
      ca: 15,
      exam: 69,
      status: "approved",
    },
    {
      subjectId: 6,
      ca: 17,
      exam: 71,
      status: "approved",
    },
    {
      subjectId: 7,
      ca: 16,
      exam: 65,
      status: "approved",
    },
    {
      subjectId: 8,
      ca: 18,
      exam: 70,
      status: "approved",
    },
  ],

  2: [
    {
      subjectId: 1,
      ca: 18,
      exam: 76,
      status: "approved",
    },
    {
      subjectId: 2,
      ca: 20,
      exam: 79,
      status: "approved",
    },
    {
      subjectId: 3,
      ca: 18,
      exam: 74,
      status: "approved",
    },
    {
      subjectId: 4,
      ca: 17,
      exam: 72,
      status: "approved",
    },
    {
      subjectId: 5,
      ca: 19,
      exam: 73,
      status: "approved",
    },
    {
      subjectId: 6,
      ca: 18,
      exam: 75,
      status: "approved",
    },
    {
      subjectId: 7,
      ca: 17,
      exam: 69,
      status: "approved",
    },
    {
      subjectId: 8,
      ca: 18,
      exam: 71,
      status: "approved",
    },
  ],

  3: [
    {
      subjectId: 1,
      ca: 15,
      exam: 64,
      status: "approved",
    },
    {
      subjectId: 2,
      ca: 16,
      exam: 67,
      status: "approved",
    },
    {
      subjectId: 3,
      ca: 14,
      exam: 61,
      status: "approved",
    },
    {
      subjectId: 4,
      ca: 16,
      exam: 63,
      status: "approved",
    },
    {
      subjectId: 5,
      ca: 15,
      exam: 65,
      status: "approved",
    },
    {
      subjectId: 6,
      ca: 17,
      exam: 66,
      status: "approved",
    },
    {
      subjectId: 7,
      ca: 13,
      exam: 60,
      status: "approved",
    },
    {
      subjectId: 8,
      ca: 14,
      exam: 62,
      status: "approved",
    },
  ],

  4: [
    {
      subjectId: 1,
      ca: 19,
      exam: 78,
      status: "approved",
    },
    {
      subjectId: 2,
      ca: 18,
      exam: 74,
      status: "approved",
    },
    {
      subjectId: 3,
      ca: 19,
      exam: 76,
      status: "approved",
    },
    {
      subjectId: 4,
      ca: 18,
      exam: 73,
      status: "approved",
    },
    {
      subjectId: 5,
      ca: 18,
      exam: 75,
      status: "approved",
    },
    {
      subjectId: 6,
      ca: 19,
      exam: 77,
      status: "approved",
    },
    {
      subjectId: 7,
      ca: 18,
      exam: 71,
      status: "approved",
    },
    {
      subjectId: 8,
      ca: 19,
      exam: 74,
      status: "approved",
    },
  ],
};

/* =========================================================
   HELPERS
========================================================= */

function getGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  if (score >= 40) return "E";
  return "F";
}

function getRemark(score) {
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Very Good";
  if (score >= 60) return "Good";
  if (score >= 50) return "Fair";
  if (score >= 40) return "Pass";
  return "Fail";
}

function getGradeDescription(grade) {
  const descriptions = {
    A: "Excellent",
    B: "Very Good",
    C: "Good",
    D: "Fair",
    E: "Pass",
    F: "Fail",
  };

  return descriptions[grade] || "-";
}

function getStudentName(student) {
  return [student.firstName, student.middleName, student.lastName]
    .filter(Boolean)
    .join(" ");
}

function calculateTotal(ca, exam) {
  return Number(ca || 0) + Number(exam || 0);
}

function calculateAverage(studentId) {
  const studentResults = results[studentId] || [];

  if (!studentResults.length) return 0;

  const total = studentResults.reduce(
    (sum, result) => sum + calculateTotal(result.ca, result.exam),
    0,
  );

  return total / studentResults.length;
}

function hasApprovedResults(studentId) {
  const studentResults = results[studentId] || [];

  if (studentResults.length !== subjects.length) {
    return false;
  }

  return studentResults.every((result) => result.status === "approved");
}

/* =========================================================
   REPORT CARD PREVIEW
========================================================= */

function ReportCardPreview({ student, onClose, onDownload, onPrint }) {
  const studentResults = results[student.id] || [];

  const average = calculateAverage(student.id);

  const totalScore = studentResults.reduce(
    (sum, result) => sum + calculateTotal(result.ca, result.exam),
    0,
  );

  const overallGrade = getGrade(average);

  const attendancePercentage =
    student.attendance.total > 0
      ? ((student.attendance.present / student.attendance.total) * 100).toFixed(
          0,
        )
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <div className="flex h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-slate-100 shadow-2xl">
        {/* Modal Header */}

        <div className="flex shrink-0 items-center justify-between border-b bg-white px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Report Card Preview
            </h2>

            <p className="text-sm text-slate-500">{getStudentName(student)}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrint}
              className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:flex"
            >
              <Printer size={17} />
              Print
            </button>

            <button
              onClick={onDownload}
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Download size={17} />
              Download PDF
            </button>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Preview Area */}

        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <div
            id="report-card-pdf"
            className="mx-auto w-full max-w-[794px] bg-white p-6 text-slate-900 shadow-lg sm:p-10"
          >
            {/* School Header */}

            <div className="border-b-2 border-slate-900 pb-5 text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white">
                <GraduationCap size={34} />
              </div>

              <h1 className="text-2xl font-black uppercase tracking-wide sm:text-3xl">
                Golden Heritage School
              </h1>

              <p className="mt-1 text-sm font-medium">
                Excellence • Discipline • Integrity
              </p>

              <p className="mt-1 text-xs text-slate-500">
                25 Education Avenue, Abeokuta, Ogun State, Nigeria
              </p>

              <div className="mt-4 inline-block border border-slate-900 px-5 py-2">
                <h2 className="text-lg font-bold uppercase tracking-wider">
                  Student Report Card
                </h2>
              </div>
            </div>

            {/* Session Information */}

            <div className="mt-5 grid grid-cols-2 gap-3 border-b pb-5 text-sm sm:grid-cols-4">
              <div>
                <p className="text-xs text-slate-500">Academic Session</p>
                <p className="font-semibold">2026 / 2027</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Term</p>
                <p className="font-semibold">First Term</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Class</p>
                <p className="font-semibold">{student.class}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Admission No.</p>
                <p className="font-semibold">{student.admissionNumber}</p>
              </div>
            </div>

            {/* Student Details */}

            <div className="mt-5 grid grid-cols-2 gap-4 border-b pb-5 text-sm sm:grid-cols-3">
              <div>
                <p className="text-xs text-slate-500">Student Name</p>

                <p className="font-bold">{getStudentName(student)}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Gender</p>

                <p className="font-semibold">{student.gender}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Attendance</p>

                <p className="font-semibold">
                  {student.attendance.present} / {student.attendance.total} (
                  {attendancePercentage}%)
                </p>
              </div>
            </div>

            {/* Results Table */}

            <div className="mt-6">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">
                Academic Performance
              </h3>

              <div className="overflow-hidden border border-slate-900">
                <table className="w-full border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-900 px-2 py-2 text-left">
                        Subject
                      </th>

                      <th className="border border-slate-900 px-2 py-2 text-center">
                        CA
                        <br />
                        <span className="font-normal">/20</span>
                      </th>

                      <th className="border border-slate-900 px-2 py-2 text-center">
                        Exam
                        <br />
                        <span className="font-normal">/80</span>
                      </th>

                      <th className="border border-slate-900 px-2 py-2 text-center">
                        Total
                        <br />
                        <span className="font-normal">/100</span>
                      </th>

                      <th className="border border-slate-900 px-2 py-2 text-center">
                        Grade
                      </th>

                      <th className="border border-slate-900 px-2 py-2 text-left">
                        Remark
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {studentResults.map((result) => {
                      const subject = subjects.find(
                        (item) => item.id === result.subjectId,
                      );

                      const total = calculateTotal(result.ca, result.exam);

                      const grade = getGrade(total);

                      return (
                        <tr key={result.subjectId}>
                          <td className="border border-slate-900 px-2 py-2 font-medium">
                            {subject?.name}
                          </td>

                          <td className="border border-slate-900 px-2 py-2 text-center">
                            {result.ca}
                          </td>

                          <td className="border border-slate-900 px-2 py-2 text-center">
                            {result.exam}
                          </td>

                          <td className="border border-slate-900 px-2 py-2 text-center font-bold">
                            {total}
                          </td>

                          <td className="border border-slate-900 px-2 py-2 text-center font-bold">
                            {grade}
                          </td>

                          <td className="border border-slate-900 px-2 py-2">
                            {getRemark(total)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="border border-slate-300 p-3 text-center">
                <p className="text-[10px] uppercase text-slate-500">Subjects</p>

                <p className="mt-1 text-lg font-black">
                  {studentResults.length}
                </p>
              </div>

              <div className="border border-slate-300 p-3 text-center">
                <p className="text-[10px] uppercase text-slate-500">
                  Total Score
                </p>

                <p className="mt-1 text-lg font-black">{totalScore}</p>
              </div>

              <div className="border border-slate-300 p-3 text-center">
                <p className="text-[10px] uppercase text-slate-500">Average</p>

                <p className="mt-1 text-lg font-black">{average.toFixed(2)}%</p>
              </div>

              <div className="border border-slate-300 p-3 text-center">
                <p className="text-[10px] uppercase text-slate-500">
                  Overall Grade
                </p>

                <p className="mt-1 text-lg font-black">{overallGrade}</p>
              </div>
            </div>

            {/* Grading Scale */}

            <div className="mt-6">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">
                Grading Scale
              </h3>

              <div className="grid grid-cols-3 gap-2 text-xs sm:grid-cols-6">
                {[
                  ["A", "80-100"],
                  ["B", "70-79"],
                  ["C", "60-69"],
                  ["D", "50-59"],
                  ["E", "40-49"],
                  ["F", "0-39"],
                ].map(([grade, range]) => (
                  <div
                    key={grade}
                    className="border border-slate-300 p-2 text-center"
                  >
                    <p className="font-bold">{grade}</p>

                    <p className="text-slate-500">{range}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="border border-slate-300 p-4">
                <p className="text-xs font-bold uppercase text-slate-500">
                  Class Teacher's Remark
                </p>

                <p className="mt-2 text-sm">
                  {average >= 70
                    ? "Excellent performance. Keep up the good work and continue to strive for greater achievement."
                    : average >= 50
                      ? "Good effort. More dedication and consistent study will lead to better results."
                      : "More effort is required. The student should improve study habits and class participation."}
                </p>
              </div>

              <div className="border border-slate-300 p-4">
                <p className="text-xs font-bold uppercase text-slate-500">
                  Principal's Remark
                </p>

                <p className="mt-2 text-sm">
                  We commend the student's effort this term. Continue to
                  demonstrate discipline, commitment and excellence.
                </p>
              </div>
            </div>

            {/* Promotion */}

            <div className="mt-5 border border-slate-900 p-4">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs uppercase text-slate-500">
                    Promotion Status
                  </p>

                  <p className="font-bold">
                    Eligible for promotion to the next class
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-slate-500">
                    Next Term Begins
                  </p>

                  <p className="font-semibold">To be announced</p>
                </div>
              </div>
            </div>

            {/* Signatures */}

            <div className="mt-14 grid grid-cols-2 gap-10 text-center">
              <div>
                <div className="mx-auto mb-2 h-px max-w-[180px] bg-slate-900" />

                <p className="text-xs font-semibold">Class Teacher</p>
              </div>

              <div>
                <div className="mx-auto mb-2 h-px max-w-[180px] bg-slate-900" />

                <p className="text-xs font-semibold">Principal</p>
              </div>
            </div>

            {/* Footer */}

            <div className="mt-8 border-t pt-4 text-center">
              <p className="text-[10px] text-slate-500">
                This report card is an official academic record of Golden
                Heritage School.
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Generated on {new Date().toLocaleDateString("en-NG")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ReportCards() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");

  const [selectedSession, setSelectedSession] = useState("2026 / 2027");

  const [selectedTerm, setSelectedTerm] = useState("First Term");

  const [selectedStudent, setSelectedStudent] = useState(null);

  const reportCardRef = useRef(null);

  /* =======================================================
     FILTER STUDENTS
  ======================================================= */

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        getStudentName(student).toLowerCase().includes(search.toLowerCase()) ||
        student.admissionNumber.toLowerCase().includes(search.toLowerCase());

      const matchesClass =
        selectedClass === "All Classes" || student.class === selectedClass;

      return matchesSearch && matchesClass;
    });
  }, [search, selectedClass]);

  /* =======================================================
     DOWNLOAD PDF
  ======================================================= */

  const downloadPDF = async () => {
    if (!selectedStudent) return;

    const reportCard = document.getElementById("report-card-pdf");

    if (!reportCard) return;

    try {
      const canvas = await html2canvas(reportCard, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      const margin = 8;

      const contentWidth = pdfWidth - margin * 2;

      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      let heightLeft = contentHeight;

      let position = margin;

      pdf.addImage(
        imageData,
        "PNG",
        margin,
        position,
        contentWidth,
        contentHeight,
      );

      heightLeft -= pdfHeight - margin * 2;

      while (heightLeft > 0) {
        position = heightLeft - contentHeight + margin;

        pdf.addPage();

        pdf.addImage(
          imageData,
          "PNG",
          margin,
          position,
          contentWidth,
          contentHeight,
        );

        heightLeft -= pdfHeight - margin * 2;
      }

      const fileName =
        `${selectedStudent.firstName}-${selectedStudent.lastName}-` +
        `${selectedTerm.replace(/\s/g, "-")}-Report-Card.pdf`;

      pdf.save(fileName);
    } catch (error) {
      console.error("Unable to generate PDF:", error);
    }
  };

  /* =======================================================
     PRINT
  ======================================================= */

  const printReportCard = () => {
    window.print();
  };

  /* =======================================================
     STATISTICS
  ======================================================= */

  const totalStudents = filteredStudents.length;

  const readyStudents = filteredStudents.filter((student) =>
    hasApprovedResults(student.id),
  ).length;

  const pendingStudents = totalStudents - readyStudents;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <FileText size={21} />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Report Cards
                  </h1>

                  <p className="text-sm text-slate-500">
                    Generate and download student report cards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Students</p>

                  <p className="mt-1 text-2xl font-bold">{totalStudents}</p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                  <Users size={20} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Ready</p>

                  <p className="mt-1 text-2xl font-bold text-emerald-600">
                    {readyStudents}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={20} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Pending</p>

                  <p className="mt-1 text-2xl font-bold text-amber-600">
                    {pendingStudents}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <AlertCircle size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}

          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-4">
              {/* Search */}

              <div className="lg:col-span-1">
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Search Student
                </label>

                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Name or admission no."
                    className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>
              </div>

              {/* Session */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Academic Session
                </label>

                <div className="relative">
                  <select
                    value={selectedSession}
                    onChange={(e) => setSelectedSession(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400"
                  >
                    <option>2026 / 2027</option>
                    <option>2025 / 2026</option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              {/* Term */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Term
                </label>

                <div className="relative">
                  <select
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400"
                  >
                    <option>First Term</option>
                    <option>Second Term</option>
                    <option>Third Term</option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              {/* Class */}

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Class
                </label>

                <div className="relative">
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400"
                  >
                    <option>All Classes</option>
                    <option>JSS 1A</option>
                    <option>JSS 1B</option>
                    <option>JSS 2A</option>
                    <option>JSS 2B</option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Student List */}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-bold text-slate-900">Students</h2>

              <p className="text-sm text-slate-500">
                Only students with fully approved results can have their report
                cards generated.
              </p>
            </div>

            {/* Desktop Table */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">Student</th>

                    <th className="px-5 py-4">Admission No.</th>

                    <th className="px-5 py-4">Class</th>

                    <th className="px-5 py-4">Average</th>

                    <th className="px-5 py-4">Status</th>

                    <th className="px-5 py-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student) => {
                    const ready = hasApprovedResults(student.id);

                    const average = calculateAverage(student.id);

                    return (
                      <tr
                        key={student.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                              {student.firstName[0]}
                              {student.lastName[0]}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900">
                                {getStudentName(student)}
                              </p>

                              <p className="text-xs text-slate-500">
                                {student.gender}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {student.admissionNumber}
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-slate-700">
                          {student.class}
                        </td>

                        <td className="px-5 py-4 text-sm font-bold">
                          {average.toFixed(2)}%
                        </td>

                        <td className="px-5 py-4">
                          {ready ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                              <CheckCircle2 size={14} />
                              Ready
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                              <AlertCircle size={14} />
                              Pending
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            disabled={!ready}
                            onClick={() => setSelectedStudent(student)}
                            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                              ready
                                ? "bg-slate-900 text-white hover:bg-slate-800"
                                : "cursor-not-allowed bg-slate-100 text-slate-400"
                            }`}
                          >
                            <Eye size={16} />
                            Generate
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}

            <div className="divide-y divide-slate-100 md:hidden">
              {filteredStudents.map((student) => {
                const ready = hasApprovedResults(student.id);

                const average = calculateAverage(student.id);

                return (
                  <div key={student.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold">
                          {student.firstName[0]}
                          {student.lastName[0]}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {getStudentName(student)}
                          </p>

                          <p className="text-xs text-slate-500">
                            {student.admissionNumber}
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-600">
                            {student.class}
                          </p>
                        </div>
                      </div>

                      {ready ? (
                        <CheckCircle2 size={19} className="text-emerald-500" />
                      ) : (
                        <AlertCircle size={19} className="text-amber-500" />
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-[10px] uppercase text-slate-400">
                          Average
                        </p>

                        <p className="mt-1 font-bold">{average.toFixed(2)}%</p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-[10px] uppercase text-slate-400">
                          Status
                        </p>

                        <p
                          className={`mt-1 text-sm font-bold ${
                            ready ? "text-emerald-600" : "text-amber-600"
                          }`}
                        >
                          {ready ? "Ready" : "Pending"}
                        </p>
                      </div>
                    </div>

                    <button
                      disabled={!ready}
                      onClick={() => setSelectedStudent(student)}
                      className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${
                        ready
                          ? "bg-slate-900 text-white"
                          : "cursor-not-allowed bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Eye size={16} />
                      Generate Report Card
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}

            {filteredStudents.length === 0 && (
              <div className="px-5 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Users size={22} className="text-slate-400" />
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  No students found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or class filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Report Card Modal */}

      {selectedStudent && (
        <ReportCardPreview
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onDownload={downloadPDF}
          onPrint={printReportCard}
        />
      )}

      {/* Print Styling */}

      <style>
        {`
          @media print {
            body * {
              visibility: hidden !important;
            }

            #report-card-pdf,
            #report-card-pdf * {
              visibility: visible !important;
            }

            #report-card-pdf {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              max-width: none;
              box-shadow: none !important;
              margin: 0 !important;
            }
          }
        `}
      </style>
    </>
  );
}
