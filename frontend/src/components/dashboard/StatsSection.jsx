import { useEffect, useState } from "react";
import {
  FaFileAlt,
  FaRobot,
  FaUserTie,
  FaFolderOpen,
  FaTrophy,
  FaClock,
} from "react-icons/fa";

import StatCard from "./StatCard";
import { getResumeStats } from "../../api/resumeApi";

function StatsSection() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getResumeStats();
        setStats(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="bg-slate-100 dark:bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
            Loading statistics...
          </h2>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section className="bg-slate-100 dark:bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-8">

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-2xl p-8 text-center">

            <h2 className="text-2xl font-bold text-red-600">
              Unable to Load Statistics
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Please make sure you're logged in and the backend server is running.
            </p>

          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-slate-100 to-white dark:from-slate-950 dark:to-slate-900 py-20 transition-colors">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-14">

          <h2 className="text-5xl font-bold text-slate-800 dark:text-white">
            Resume Insights
          </h2>

          <p className="text-gray-500 dark:text-gray-300 mt-4 text-lg">
            Live statistics generated from analyzed resumes.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <StatCard
            title="Total Resumes"
            value={stats.total_resumes}
            subtitle="Uploaded Resumes"
            icon={<FaFolderOpen />}
            color="text-orange-500"
          />

          <StatCard
            title="Average Resume Score"
            value={Math.round(stats.average_resume_score)}
            subtitle="Overall Resume Quality"
            icon={<FaFileAlt />}
            color="text-blue-600"
          />

          <StatCard
            title="Average ATS Score"
            value={Math.round(stats.average_ats_score)}
            subtitle="ATS Compatibility"
            icon={<FaRobot />}
            color="text-green-600"
          />

          <StatCard
            title="Recruiter Confidence"
            value={`${Math.round(stats.average_recruiter_confidence)}%`}
            subtitle="Recruiter Rating"
            icon={<FaUserTie />}
            color="text-purple-600"
          />

          <StatCard
            title="Highest Resume Score"
            value={stats.highest_resume_score}
            subtitle="Best Resume"
            icon={<FaTrophy />}
            color="text-yellow-500"
          />

          <StatCard
            title="Latest Upload"
            value={
              stats.latest_upload
                ? new Date(stats.latest_upload).toLocaleDateString()
                : "-"
            }
            subtitle="Most Recent Resume"
            icon={<FaClock />}
            color="text-cyan-600"
          />

        </div>

      </div>

    </section>
  );
}

export default StatsSection;