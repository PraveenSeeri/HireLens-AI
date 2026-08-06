function BulletList({
  title,
  items = [],
  icon,
  bgColor,
}) {
  return (
    <div
      className={`
        ${bgColor}
        rounded-3xl
        shadow-xl
        dark:shadow-black/40
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      `}
    >
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
        {icon} {title}
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 italic">
          No data available.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-white
                dark:bg-slate-800
                shadow
                border
                border-gray-200
                dark:border-slate-700
                hover:scale-105
                transition
              "
            >
              <span className="text-green-600 font-bold">
                ✓
              </span>

              <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                {item}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BulletList;