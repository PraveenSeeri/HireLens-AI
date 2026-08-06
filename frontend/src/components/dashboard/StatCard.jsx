function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = "text-blue-600",
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 text-center">

      <div className={`text-5xl ${color}`}>
        {icon}
      </div>

      <h2 className="mt-4 dark:text-white">
        {title}
      </h2>

      <div className={`text-5xl font-bold mt-5 ${color}`}>
        {value}
      </div>

      <p className="mt-3 dark:text-gray-300">
        {subtitle}
      </p>

    </div>
  );
}

export default StatCard;