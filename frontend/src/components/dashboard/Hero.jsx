import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCloudUploadAlt,
  FaChartLine,
  FaRobot,
  FaHistory,
  FaBalanceScale,
  FaBullseye,
} from "react-icons/fa";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white py-24">

      <div className="max-w-7xl mx-auto px-8">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Side */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >

            <p className="uppercase tracking-widest text-blue-200 font-semibold">
              AI Powered Resume Analyzer
            </p>

            <h1 className="text-6xl font-extrabold leading-tight mt-5">
              See Your Resume
              <br />
              Through a
              <span className="text-yellow-300">
                {" "}Recruiter's Eyes
              </span>
            </h1>

            <p className="text-xl text-blue-100 mt-8 leading-8">
              HireLens AI evaluates your resume using AI,
              ATS analysis, recruiter confidence,
              personalized improvement suggestions,
              resume comparison, and AI job matching.
            </p>

            {/* Action Buttons */}

            <div className="grid grid-cols-2 gap-4 mt-10">

              <Link
                to="/upload"
                className="flex items-center justify-center gap-2 bg-white text-blue-700 px-6 py-4 rounded-2xl font-bold hover:bg-blue-100 transition"
              >
                <FaCloudUploadAlt />
                Upload Resume
              </Link>

              <Link
                to="/history"
                className="flex items-center justify-center gap-2 border border-white px-6 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-700 transition"
              >
                <FaHistory />
                Resume History
              </Link>

              <Link
                to="/compare"
                className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-2xl font-bold transition"
              >
                <FaBalanceScale />
                Compare Resume
              </Link>

              <Link
                to="/job-match"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl font-bold transition"
              >
                <FaBullseye />
                AI Job Match
              </Link>

            </div>

          </motion.div>

          {/* Right Side */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="grid gap-6"
          >

            {/* Upload */}

            <div className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-lg rounded-3xl p-6 flex items-center gap-5 shadow-lg">

              <FaCloudUploadAlt className="text-5xl text-yellow-300" />

              <div>

                <h3 className="text-2xl font-bold">
                  Upload Resume
                </h3>

                <p className="text-blue-100">
                  Upload your PDF and receive instant AI-powered resume analysis.
                </p>

              </div>

            </div>

            {/* AI Analysis */}

            <div className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-lg rounded-3xl p-6 flex items-center gap-5 shadow-lg">

              <FaRobot className="text-5xl text-green-300" />

              <div>

                <h3 className="text-2xl font-bold">
                  AI Resume Analysis
                </h3>

                <p className="text-blue-100">
                  Gemini AI reviews your resume like an experienced recruiter.
                </p>

              </div>

            </div>

            {/* AI Job Match */}

            <div className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-lg rounded-3xl p-6 flex items-center gap-5 shadow-lg">

              <FaChartLine className="text-5xl text-pink-300" />

              <div>

                <h3 className="text-2xl font-bold">
                  AI Job Match
                </h3>

                <p className="text-blue-100">
                  Compare your resume with any job description and discover missing skills, keywords, and your recruiter match score.
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default Hero;