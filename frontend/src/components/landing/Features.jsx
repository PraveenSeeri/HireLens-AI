import {
  FaBrain,
  FaCheckCircle,
  FaChartLine,
  FaExchangeAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBrain className="text-4xl text-blue-600" />,
    title: "AI Resume Analysis",
    description:
      "Receive detailed recruiter-style feedback powered by Gemini AI.",
  },
  {
    icon: <FaCheckCircle className="text-4xl text-green-600" />,
    title: "ATS Optimization",
    description:
      "Identify ATS issues and improve your chances of passing applicant tracking systems.",
  },
  {
    icon: <FaChartLine className="text-4xl text-purple-600" />,
    title: "Resume Score",
    description:
      "Get resume score, ATS score, and recruiter confidence instantly.",
  },
  {
    icon: <FaExchangeAlt className="text-4xl text-orange-500" />,
    title: "Version Comparison",
    description:
      "Compare multiple resume versions and track your improvements over time.",
  },
];

function Features() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-slate-800 dark:text-white">
            Powerful Features
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-5 text-lg">
            Everything you need to build a recruiter-ready resume.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-7">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;