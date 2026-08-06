function FeedbackCard({
  feedback,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-black/40 border-l-8 border-blue-600 p-8">

      <h2 className="text-3xl font-bold dark:text-white mb-5">
        🤖 Recruiter Feedback
      </h2>

      <p className="leading-8 text-gray-700 dark:text-gray-300">
        {feedback}
      </p>

    </div>
  );
}

export default FeedbackCard;