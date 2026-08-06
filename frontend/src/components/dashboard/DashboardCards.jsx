import {
  FaFileAlt,
  FaChartLine,
  FaTrophy,
  FaClipboardCheck,
} from "react-icons/fa";

function DashboardCards({ stats }) {
  const cards = [
    {
      title: "Total Resumes",
      value: stats.total_resumes,
      icon: <FaFileAlt />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Average Resume Score",
      value: stats.average_resume_score,
      icon: <FaChartLine />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Average ATS Score",
      value: stats.average_ats_score,
      icon: <FaClipboardCheck />,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Highest Score",
      value: stats.highest_resume_score,
      icon: <FaTrophy />,
      color: "from-orange-500 to-orange-700",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`bg-gradient-to-r ${card.color} rounded-3xl shadow-xl text-white p-8`}
        >
          <div className="text-4xl mb-4">
            {card.icon}
          </div>

          <h2 className="text-lg font-semibold">
            {card.title}
          </h2>

          <p className="text-5xl font-bold mt-5">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;