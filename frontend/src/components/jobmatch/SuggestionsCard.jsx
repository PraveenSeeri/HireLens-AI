function SuggestionsCard({
  suggestions,
}) {
  return (
    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-3xl shadow-xl dark:shadow-black/40 p-8">

      <h2 className="text-3xl font-bold dark:text-white mb-6">
        💡 Improvement Suggestions
      </h2>

      <div className="space-y-4">

        {suggestions.map(
          (item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow"
            >
              <span className="dark:text-white">
                {item}
              </span>
            </div>
          )
        )}

      </div>

    </div>
  );
}

export default SuggestionsCard;