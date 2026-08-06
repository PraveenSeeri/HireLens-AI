import { Link } from "react-router-dom";
import { FaArrowRight, FaRobot } from "react-icons/fa";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white">

      {/* Background Blur */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-3xl -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 bg-cyan-400 rounded-full blur-3xl bottom-0 right-0"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-8 py-28">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div>

            <p className="uppercase tracking-[5px] text-blue-200 font-semibold mb-6">
              AI Powered Resume Analyzer
            </p>

            <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight">

              See Your Resume

              <span className="block text-yellow-300">
                Through a Recruiter's Eyes
              </span>

            </h1>

            <p className="mt-8 text-xl text-blue-100 leading-9 max-w-xl">

              HireLens AI analyzes your resume using advanced AI,
              ATS optimization, recruiter confidence scoring,
              and personalized improvement suggestions.

            </p>

            <div className="flex flex-wrap gap-5 mt-12">

              <Link
                to="/register"
                className="flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
              >
                Get Started

                <FaArrowRight />
              </Link>

              <Link
                to="/login"
                className="border border-white/40 px-8 py-4 rounded-xl hover:bg-white/10 transition"
              >
                Login
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="flex justify-center">

            <div className="w-80 h-80 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">

              <FaRobot className="text-[140px] text-white" />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;