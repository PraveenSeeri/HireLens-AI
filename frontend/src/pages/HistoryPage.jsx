import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFilePdf,
  FaChartLine,
  FaRobot,
  FaUserTie,
  FaCalendarAlt,
  FaEye,
  FaBalanceScale,
  FaTrash,
} from "react-icons/fa";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import {
  getResumeHistory,
  getResumeById,
  deleteResume,
} from "../api/resumeApi";

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await getResumeHistory();
        setHistory(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load resume history.");
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  async function handleView(resumeId) {
    try {
      const analysis = await getResumeById(resumeId);

      navigate("/analysis", {
        state: {
          analysis,
        },
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Unable to load resume analysis."
      );
    }
  }

  async function handleDelete(resumeId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmed) return;

    try {
      await deleteResume(resumeId);

      setHistory((prev) =>
        prev.filter(
          (resume) => resume.id !== resumeId
        )
      );

      toast.success(
        "Resume deleted successfully!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Failed to delete resume."
      );
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center">

          <h2 className="text-3xl font-bold text-slate-700 dark:text-white">
            Loading Resume History...
          </h2>

        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12 px-6 transition-colors">

        <div className="max-w-7xl mx-auto">

          <div className="mb-10 text-center">

            <h1 className="text-5xl font-bold text-slate-800 dark:text-white">
              Resume History
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-3">
              View every resume analyzed by HireLens AI.
            </p>

          </div>

          {history.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-black/40 p-12 text-center">

              <FaFilePdf className="mx-auto text-7xl text-red-500 mb-6" />

              <h2 className="text-3xl font-bold dark:text-white">
                No Resume History
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-3 mb-8">
                Upload your first resume to begin AI analysis.
              </p>

              <Link
                to="/upload"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold"
              >
                Upload Resume
              </Link>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {history.map((resume) => (
                <div
                  key={resume.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-black/40 p-8 hover:-translate-y-2 hover:shadow-2xl transition-all"
                >

                  <div className="flex items-center gap-4 mb-6">

                    <FaFilePdf className="text-5xl text-red-500" />

                    <div>

                      <h2 className="font-bold text-lg text-slate-800 dark:text-white">
                        {resume.original_filename}
                      </h2>

                      <p className="text-sm text-gray-500">
                        Resume #{resume.id}
                      </p>

                    </div>

                  </div>

                  <div className="space-y-4">

                    <div className="flex justify-between">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <FaChartLine />
                        Resume Score
                      </span>

                      <span className="font-bold text-blue-600">
                        {resume.resume_score}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <FaRobot />
                        ATS Score
                      </span>

                      <span className="font-bold text-green-600">
                        {resume.ats_score}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <FaUserTie />
                        Recruiter Confidence
                      </span>

                      <span className="font-bold text-purple-600">
                        {resume.recruiter_confidence}%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <FaCalendarAlt />
                        Uploaded
                      </span>

                      <span className="text-sm text-gray-500">
                        {new Date(
                          resume.generated_at
                        ).toLocaleDateString()}
                      </span>
                    </div>

                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-8">

                    <button
                      onClick={() =>
                        handleView(resume.id)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex justify-center"
                      title="View Analysis"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() =>
                        navigate("/compare", {
                          state: {
                            resumeId: resume.id,
                          },
                        })
                      }
                      className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl flex justify-center"
                      title="Compare Resume"
                    >
                      <FaBalanceScale />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(resume.id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex justify-center"
                      title="Delete Resume"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

          <div className="mt-12 text-center">

            <Link
              to="/"
              className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold"
            >
              Back to Dashboard
            </Link>

          </div>

        </div>

      </div>
    </>
  );
}

export default HistoryPage;