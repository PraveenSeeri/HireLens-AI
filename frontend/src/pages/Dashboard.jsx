import Navbar from "../components/Navbar";
import Hero from "../components/dashboard/Hero";
import StatsSection from "../components/dashboard/StatsSection";
import DashboardChart from "../components/charts/DashboardChart";
import QuickActions from "../components/dashboard/QuickActions";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Statistics */}
      <StatsSection />

      {/* Charts */}
      <DashboardChart />

      {/* Quick Actions */}
      <QuickActions />

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-white py-10 mt-20">

        <div className="max-w-7xl mx-auto px-8">

          <div className="grid md:grid-cols-3 gap-10">

            {/* Branding */}
            <div>

              <h2 className="text-3xl font-bold">
                HireLens AI
              </h2>

              <p className="text-gray-400 mt-4 leading-7">
                AI-powered Resume Intelligence Platform that
                analyzes resumes using ATS scoring, recruiter
                confidence, resume comparison, and AI Job Match.
              </p>

            </div>

            {/* Features */}
            <div>

              <h3 className="text-xl font-bold mb-4">
                Features
              </h3>

              <ul className="space-y-3 text-gray-400">

                <li>✅ Resume Analysis</li>

                <li>✅ ATS Score</li>

                <li>✅ Recruiter Confidence</li>

                <li>✅ Resume Comparison</li>

                <li>✅ AI Job Match</li>

                <li>✅ PDF Report Generation</li>

              </ul>

            </div>

            {/* Technology */}
            <div>

              <h3 className="text-xl font-bold mb-4">
                Built With
              </h3>

              <ul className="space-y-3 text-gray-400">

                <li>⚛ React + Vite</li>

                <li>🎨 Tailwind CSS</li>

                <li>🐍 FastAPI</li>

                <li>🗄 SQLAlchemy</li>

                <li>🤖 Google Gemini AI</li>

                <li>📄 jsPDF</li>

              </ul>

            </div>

          </div>

          <div className="border-t border-slate-700 mt-10 pt-6 text-center">

            <p className="text-gray-500">
              © 2026 HireLens AI • Built with ❤️ by{" "}
              <span className="text-white font-semibold">
                Praveen Seeri
              </span>
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Dashboard;