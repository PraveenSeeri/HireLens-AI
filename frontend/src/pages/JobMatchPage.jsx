import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import MatchScore from "../components/jobmatch/MatchScore";
import SkillsCard from "../components/jobmatch/SkillsCard";
import FeedbackCard from "../components/jobmatch/FeedbackCard";
import SuggestionsCard from "../components/jobmatch/SuggestionsCard";

import { jobMatch } from "../api/resumeApi";
import { downloadJobMatchReport } from "../utils/jobMatchPdfGenerator";
function JobMatchPage() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  function handleFileChange(e) {
    const selected = e.target.files[0];

    if (!selected) return;

    if (selected.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    setFile(selected);
  }

  async function handleAnalyze() {
    if (!file) {
      toast.error("Please upload a resume.");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Please paste a job description.");
      return;
    }

    try {
      setLoading(true);

      const response = await jobMatch(
        file,
        jobDescription
      );

      setResult(response);

      toast.success("Job Match completed!");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
        "Analysis failed."
      );

    } finally {
      setLoading(false);
    }
  }

  function analyzeAnother() {
    setResult(null);
    setFile(null);
    setJobDescription("");
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-10">

            <h1 className="text-5xl font-bold text-center dark:text-white">
              AI Job Match
            </h1>

            <p className="text-center text-gray-500 dark:text-gray-400 mt-3">
              Compare your resume with any job description.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-10">

              <div>

                <label className="font-semibold dark:text-white">
                  Upload Resume
                </label>

                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="mt-3 w-full border rounded-xl p-4 dark:bg-slate-800 dark:text-white"
                />

                {file && (
                  <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-400 rounded-xl p-4">

                    <p className="font-semibold text-green-600">
                      📄 {file.name}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>

                  </div>
                )}

              </div>

              <div>

                <label className="font-semibold dark:text-white">
                  Job Description
                </label>

                <textarea
                  rows={10}
                  value={jobDescription}
                  onChange={(e) =>
                    setJobDescription(e.target.value)
                  }
                  placeholder="Paste the complete job description here..."
                  className="mt-3 w-full border rounded-xl p-4 dark:bg-slate-800 dark:text-white resize-none"
                />

              </div>

            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className={`mt-8 w-full py-4 rounded-2xl font-bold text-white ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? "Analyzing..."
                : "Analyze Job Match"}
            </button>

            <Link
              to="/dashboard"
              className="block mt-6 text-center bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold"
            >
              Back to Dashboard
            </Link>

          </div>
                    {result && (

            <div className="mt-12 space-y-8">

              {/* Match Score */}

              <MatchScore
                score={result.match_score}
              />

              {/* Skills */}

              <div className="grid md:grid-cols-2 gap-8">

                <SkillsCard
                  title="Matching Skills"
                  items={result.matching_skills || []}
                  color="green"
                />

                <SkillsCard
                  title="Missing Skills"
                  items={result.missing_skills || []}
                  color="red"
                />

              </div>

              {/* Missing Keywords */}

              <SkillsCard
                title="Missing Keywords"
                items={result.missing_keywords || []}
                color="yellow"
              />

              {/* Recruiter Feedback */}

              <FeedbackCard
                feedback={result.recruiter_feedback}
              />

              {/* Improvement Suggestions */}

              <SuggestionsCard
                suggestions={
                  result.improvement_suggestions || []
                }
              />

              {/* Action Buttons */}

              <div className="flex flex-wrap justify-center gap-5 pt-4">

                <button
                  onClick={() =>
                    downloadJobMatchReport(result)
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
                >
                  📄 Download Job Match Report
                </button>

                <button
                  onClick={analyzeAnother}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
                >
                  🔄 Analyze Another Resume
                </button>

                <Link
                  to="/dashboard"
                  className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
                >
                  🏠 Dashboard
                </Link>

              </div>

            </div>

          )}
                  </div>

      </div>

    </>

  );
}

export default JobMatchPage;