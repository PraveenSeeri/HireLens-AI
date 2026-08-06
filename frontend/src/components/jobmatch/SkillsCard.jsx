import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";

function SkillsCard({
  title,
  items,
  color,
}) {
  const sectionColors = {
    green:
      "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700",

    red:
      "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700",

    yellow:
      "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700",
  };

  const chipColors = {
    green:
      "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100",

    red:
      "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100",

    yellow:
      "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100",
  };

  function getIcon() {
    if (color === "green") {
      return (
        <FaCheckCircle className="text-green-500 text-xl" />
      );
    }

    if (color === "red") {
      return (
        <FaTimesCircle className="text-red-500 text-xl" />
      );
    }

    return (
      <FaExclamationCircle className="text-yellow-500 text-xl" />
    );
  }

  return (
    <div
      className={`${sectionColors[color]} rounded-3xl shadow-xl dark:shadow-black/40 p-8 transition-all duration-300`}
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-3">

          {getIcon()}

          <h2 className="text-3xl font-bold dark:text-white">
            {title}
          </h2>

        </div>

        <span className="bg-slate-900 text-white dark:bg-slate-700 px-4 py-2 rounded-full text-sm font-bold">
          {items.length}
        </span>

      </div>

      {/* Empty State */}

      {items.length === 0 ? (
        <div className="text-center py-10">

          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No items found.
          </p>

        </div>
      ) : (
        <div className="flex flex-wrap gap-4">

          {items.map((item, index) => (
            <div
              key={index}
              className={`${chipColors[color]} px-5 py-3 rounded-full font-semibold shadow hover:scale-105 transition-transform duration-200 flex items-center gap-2`}
            >
              {getIcon()}

              <span>{item}</span>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default SkillsCard;