import { useEffect, useState } from "react";
import {
  FaBalanceScale,
  FaCloudUploadAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";


import {
  compareUploadedResume,
  getResumeHistory,
} from "../api/resumeApi";

function ComparePage() {
  const [history, setHistory] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [file, setFile] = useState(null);

  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getResumeHistory();
        setHistory(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load resume history.");
      }
    }

    loadHistory();
  }, []);

  function handleFileChange(e) {
    const selected = e.target.files[0];

    if (!selected) return;

    if (selected.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    setFile(selected);
  }

  async function handleCompare() {
    if (!resumeId) {
      toast.error("Please select an existing resume.");
      return;
    }

    if (!file) {
      toast.error("Please upload a PDF.");
      return;
    }

    try {
      setLoading(true);

      const result = await compareUploadedResume(
        resumeId,
        file
      );

      setComparison(result);

      toast.success("Comparison completed!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
        "Comparison failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-black/40 p-10 mb-10">

            <div className="flex items-center gap-4 justify-center">

              <FaBalanceScale className="text-5xl text-purple-600" />

              <h1 className="text-5xl font-bold dark:text-white">
                Resume Comparison
              </h1>

            </div>

            <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
              Compare your previous resume with a newly uploaded version.
            </p>

          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-black/40 p-8">

            <div className="grid md:grid-cols-2 gap-8">

              <div>

                <label className="font-semibold dark:text-white">
                  Existing Resume
                </label>

                <select
                  value={resumeId}
                  onChange={(e) =>
                    setResumeId(e.target.value)
                  }
                  className="mt-3 w-full p-4 rounded-xl border dark:bg-slate-800 dark:text-white"
                >

                  <option value="">
                    Select Resume
                  </option>

                  {history.map((resume) => (
                    <option
                      key={resume.id}
                      value={resume.id}
                    >
                      {resume.original_filename}
                    </option>
                  ))}

                </select>

              </div>

              <div>

                <label className="font-semibold dark:text-white">
                  Upload Updated Resume
                </label>

                <div className="mt-3 border-2 border-dashed border-blue-500 rounded-2xl p-6 text-center">

                  <FaCloudUploadAlt className="mx-auto text-5xl text-blue-500 mb-4" />

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />

                  {file && (
                    <p className="mt-3 text-green-600 font-semibold">
                      {file.name}
                    </p>
                  )}

                </div>

              </div>

            </div>

            <button
              onClick={handleCompare}
              disabled={loading}
              className="w-full mt-8 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold"
            >
              {loading
                ? "Comparing..."
                : "Compare Resumes"}
            </button>

          </div>

                {comparison && (

  <div className="mt-12">

    <h2 className="text-4xl font-bold text-center mb-10 text-white">
      Comparison Results
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      {/* Resume Score */}

      <div className="bg-slate-900 rounded-3xl shadow-xl p-8 text-center">

        <h3 className="text-2xl font-bold text-white mb-6">
          Resume Score
        </h3>

        <div className="text-6xl font-bold text-blue-500">
          {comparison.old_resume_score}
        </div>

        <div
         className={`text-5xl my-4 ${
           comparison.score_improvement > 0
             ? "text-green-500"
             : comparison.score_improvement < 0
             ? "text-red-500"
             : "text-gray-400"
          }`}
        >
          {comparison.score_improvement > 0
            ? "↑"
            : comparison.score_improvement < 0
            ? "↓"
            : "→"}
        </div>

        <div className="text-6xl font-bold text-blue-500">
          {comparison.new_resume_score}
        </div>

        <p
          className={`mt-6 text-3xl font-bold ${
            comparison.score_improvement >= 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {comparison.score_improvement > 0
            ? `+${comparison.score_improvement}`
            : comparison.score_improvement}
        </p>

      </div>

      {/* ATS Score */}

      <div className="bg-slate-900 rounded-3xl shadow-xl p-8 text-center">

        <h3 className="text-2xl font-bold text-white mb-6">
          ATS Score
        </h3>

        <div
          className={`text-5xl my-4 ${
            comparison.ats_improvement > 0
              ? "text-green-500"
              : comparison.ats_improvement < 0
              ? "text-red-500"
              : "text-gray-400"
          }`}
        >
          {comparison.ats_improvement > 0
            ? "↑"
            : comparison.ats_improvement < 0
            ? "↓"
            : "→"}
        </div>

        <div className="text-5xl my-4 text-white">
          {comparison.ats_improvement >= 0 ? "↑" : "↓"}
        </div>

        <div className="text-6xl font-bold text-green-500">
          {comparison.new_ats_score}
        </div>

        <p
          className={`mt-6 text-3xl font-bold ${
            comparison.ats_improvement >= 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {comparison.ats_improvement > 0
            ? `+${comparison.ats_improvement}`
            : comparison.ats_improvement}
        </p>

      </div>

      {/* Recruiter Confidence */}

      <div className="bg-slate-900 rounded-3xl shadow-xl p-8 text-center">

        <h3 className="text-2xl font-bold text-white mb-6">
          Recruiter Confidence
        </h3>

        <div className="text-6xl font-bold text-purple-500">
          {comparison.old_confidence}%
        </div>

        <div
          className={`text-5xl my-4 ${
            comparison.confidence_improvement > 0
              ? "text-green-500"
              : comparison.confidence_improvement < 0
              ? "text-red-500"
              : "text-gray-400"
          }`}
        >
          {comparison.confidence_improvement > 0
            ? "↑"
            : comparison.confidence_improvement < 0
            ? "↓"
            : "→"}
        </div>

        <div className="text-6xl font-bold text-purple-500">
          {comparison.new_confidence}%
        </div>

        <p
          className={`mt-6 text-3xl font-bold ${
            comparison.confidence_improvement >= 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {comparison.confidence_improvement > 0
            ? `+${comparison.confidence_improvement}`
            : comparison.confidence_improvement}
        </p>

      </div>

    </div>

    {/* AI Summary */}

    <div className="bg-slate-900 rounded-3xl shadow-xl p-8 mt-10">

      <h2 className="text-3xl font-bold text-blue-400 mb-5">
        🤖 AI Summary
      </h2>

      <p className="text-gray-300 leading-8 text-lg">
        {comparison.ai_summary}
      </p>

    </div>

    {/* New Strengths */}

    <div className="bg-green-900/20 border border-green-600 rounded-3xl shadow-xl p-8 mt-8">

      <h2 className="text-3xl font-bold text-green-400 mb-6">
        💪 New Strengths
      </h2>

      {comparison.new_strengths.length === 0 ? (
        <p className="text-gray-400">
          No additional strengths identified.
        </p>
      ) : (
        <ul className="space-y-3">
          {comparison.new_strengths.map((item, index) => (
            <li
              key={index}
              className="text-gray-200"
            >
              ✅ {item}
            </li>
          ))}
        </ul>
      )}

    </div>

    {/* Resolved Weaknesses */}

    <div className="bg-red-900/20 border border-red-600 rounded-3xl shadow-xl p-8 mt-8">

      <h2 className="text-3xl font-bold text-red-400 mb-6">
        🎯 Resolved Weaknesses
      </h2>

      {comparison.resolved_weaknesses.length === 0 ? (
        <p className="text-gray-400">
          No weaknesses resolved.
        </p>
      ) : (
        <ul className="space-y-3">
          {comparison.resolved_weaknesses.map((item, index) => (
            <li
              key={index}
              className="text-gray-200"
            >
              ✔ {item}
            </li>
          ))}
        </ul>
      )}

    </div>

  </div>

)}
                    </div>

      </div>

    </>

  );
}

export default ComparePage;