import {
  FaCloudUploadAlt,
  FaRobot,
  FaFileAlt,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaCloudUploadAlt className="text-5xl text-blue-600" />,
    title: "Upload Resume",
    description:
      "Upload your resume in PDF format securely.",
  },
  {
    icon: <FaRobot className="text-5xl text-purple-600" />,
    title: "AI Analysis",
    description:
      "HireLens AI analyzes your resume like an experienced recruiter.",
  },
  {
    icon: <FaFileAlt className="text-5xl text-green-600" />,
    title: "Improve & Succeed",
    description:
      "Receive actionable suggestions, ATS insights, and recruiter feedback.",
  },
];

function HowItWorks() {
  return (
    <section className="py-24 bg-slate-100 dark:bg-slate-950">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-slate-800 dark:text-white">
            How It Works
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-5 text-lg">
            Analyze your resume in three simple steps.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-12">

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="mb-8">
                {step.icon}
              </div>

              <span className="absolute top-6 right-8 text-6xl font-extrabold text-slate-200 dark:text-slate-800">
                {index + 1}
              </span>

              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-5">
                {step.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-8">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;