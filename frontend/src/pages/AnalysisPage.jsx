import { Link, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import ScoreCard from "../components/analysis/ScoreCard";
import BulletList from "../components/analysis/BulletList";
import { downloadResumeReport } from "../utils/resumePdfGenerator";
function AnalysisPage() {
  const { state } = useLocation();

  const analysis = state?.analysis;

  if (!analysis) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center px-6">

          <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-6">
            No Resume Analysis Yet
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-center max-w-xl mb-10">
            Upload your resume to receive an AI-powered resume review,
            ATS score, recruiter confidence, and personalized
            improvement suggestions.
          </p>

          <Link
            to="/upload"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
          >
            Upload Resume
          </Link>

        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-12 px-6 transition-colors">

        <div className="max-w-7xl mx-auto">

          {/* Header */}

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-black/40 p-10 mb-10">

            <h1 className="text-5xl font-bold text-center text-slate-800 dark:text-white">
              HireLens AI Report
            </h1>

            <p className="text-center text-gray-500 dark:text-gray-400 mt-4 text-lg">
              AI-powered resume evaluation from a recruiter's perspective
            </p>

            <p className="text-center text-sm text-gray-400 mt-3">
              Generated on {new Date().toLocaleString()}
            </p>

          </div>

          {/* Score Cards */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

            <ScoreCard
              title="Resume Score"
              value={analysis.resume_score}
              color="blue"
            />

            <ScoreCard
              title="ATS Score"
              value={analysis.ats_score}
              color="green"
            />

            <ScoreCard
              title="Recruiter Confidence"
              value={`${analysis.recruiter_confidence}%`}
              color="purple"
            />

          </div>
                    {/* Summary */}

          <div className="grid lg:grid-cols-2 gap-8 mb-10">

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg dark:shadow-black/40 p-8 transition-colors">

              <h2 className="text-2xl font-bold mb-5 text-blue-600">
                👀 First Impression
              </h2>

              <p className="text-gray-700 dark:text-gray-300 leading-8">
                {analysis.first_impression}
              </p>

            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg dark:shadow-black/40 p-8 transition-colors">

              <h2 className="text-2xl font-bold mb-5 text-green-600">
                📋 Overall Assessment
              </h2>

              <p className="text-gray-700 dark:text-gray-300 leading-8">
                {analysis.assessment}
              </p>

            </div>

          </div>

          {/* Analysis Lists */}

          <div className="grid md:grid-cols-2 gap-8">

            <BulletList
              title="Strengths"
              items={analysis.strengths}
              icon="💪"
              bgColor="bg-green-50 dark:bg-green-900/20"
            />

            <BulletList
              title="Weaknesses"
              items={analysis.weaknesses}
              icon="⚠️"
              bgColor="bg-red-50 dark:bg-red-900/20"
            />

            <BulletList
              title="Missing Skills"
              items={analysis.missing_skills}
              icon="🎯"
              bgColor="bg-yellow-50 dark:bg-yellow-900/20"
            />

            <BulletList
              title="ATS Observations"
              items={analysis.ats_observations}
              icon="📈"
              bgColor="bg-blue-50 dark:bg-blue-900/20"
            />

          </div>

          {/* Top Improvements */}

          <div className="mt-10">

            <BulletList
              title="Top Improvements"
              items={analysis.top_improvements}
              icon="💡"
              bgColor="bg-purple-50 dark:bg-purple-900/20"
            />

          </div>
                    {/* Footer Buttons */}

          <div className="flex flex-wrap justify-center gap-6 mt-14">

            <button
              onClick={() => downloadResumeReport(analysis)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
            >
              📥 Download PDF Report
            </button>

            <Link
              to="/compare"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
            >
              ⚖️ Compare Resume
            </Link>

            <Link
              to="/job-match"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
            >
              🎯 AI Job Match
            </Link>

            <Link
              to="/upload"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
            >
              📄 Upload Another Resume
            </Link>

            <Link
              to="/"
              className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
            >
              🏠 Dashboard
            </Link>

          </div>

        </div>

      </div>

    </>

  );
}

export default AnalysisPage;