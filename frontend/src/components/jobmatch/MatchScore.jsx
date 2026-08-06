import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function MatchScore({ score }) {
  function getRating(score) {
    if (score >= 90) return "Excellent Match";
    if (score >= 75) return "Good Match";
    if (score >= 60) return "Average Match";
    return "Needs Improvement";
  }

  function getColor(score) {
    if (score >= 90) return "#16a34a";
    if (score >= 75) return "#2563eb";
    if (score >= 60) return "#f59e0b";
    return "#dc2626";
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-black/40 p-10">

      <h2 className="text-3xl font-bold text-center dark:text-white mb-8">
        AI Job Match Score
      </h2>

      <div className="w-56 h-56 mx-auto">

        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            pathColor: getColor(score),
            textColor: getColor(score),
            trailColor: "#e5e7eb",
            textSize: "14px",
          })}
        />

      </div>

      <p
        className="text-center text-2xl font-bold mt-8"
        style={{ color: getColor(score) }}
      >
        {getRating(score)}
      </p>

    </div>
  );
}

export default MatchScore;