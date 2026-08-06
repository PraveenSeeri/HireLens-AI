import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function ScoreCard({
  title,
  value,
  color,
}) {
  const colors = {
    blue: "#2563eb",
    green: "#16a34a",
    purple: "#9333ea",
    orange: "#ea580c",
    red: "#dc2626",
  };

  const numericValue =
    typeof value === "string"
      ? parseFloat(value)
      : value;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-black/40 p-8 hover:scale-105 transition duration-300">

      <h2 className="text-center text-2xl font-bold dark:text-white mb-8">
        {title}
      </h2>

      <div className="w-40 h-40 mx-auto">

        <CircularProgressbar
          value={numericValue}
          text={`${numericValue}${title.includes("Confidence") ? "%" : ""}`}
          styles={buildStyles({
            pathColor: colors[color],
            textColor: colors[color],
            trailColor: "#e5e7eb",
            textSize: "16px",
          })}
        />

      </div>

    </div>
  );
}

export default ScoreCard;