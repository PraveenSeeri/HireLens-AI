import { Link } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaBalanceScale,
  FaHistory,
  FaBullseye,
} from "react-icons/fa";

function QuickActions() {
  const actions = [
    {
      title: "Upload Resume",
      icon: <FaCloudUploadAlt />,
      link: "/upload",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "AI Job Match",
      icon: <FaBullseye />,
      link: "/job-match",
      color: "from-green-500 to-green-700",
    },
    {
      title: "Resume Comparison",
      icon: <FaBalanceScale />,
      link: "/compare",
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Resume History",
      icon: <FaHistory />,
      link: "/history",
      color: "from-orange-500 to-orange-700",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-8 mt-16">

      <h2 className="text-4xl font-bold mb-10 dark:text-white">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-4 gap-8">

        {actions.map((action) => (

          <Link
            key={action.title}
            to={action.link}
            className={`bg-gradient-to-r ${action.color} rounded-3xl shadow-xl p-8 text-white hover:scale-105 transition duration-300`}
          >

            <div className="text-5xl mb-5">
              {action.icon}
            </div>

            <h3 className="text-2xl font-bold">
              {action.title}
            </h3>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default QuickActions;