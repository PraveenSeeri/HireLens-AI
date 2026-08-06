import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">

      <div className="max-w-5xl mx-auto text-center px-8">

        <h2 className="text-5xl font-extrabold">
          Ready to Improve Your Resume?
        </h2>

        <p className="mt-8 text-xl text-blue-100 leading-8">
          Join HireLens AI today and receive recruiter-quality feedback,
          ATS optimization, and personalized improvement suggestions.
        </p>

        <Link
          to="/register"
          className="inline-block mt-10 bg-white text-blue-700 font-bold px-10 py-4 rounded-xl hover:scale-105 transition"
        >
          Get Started Free
        </Link>

      </div>

    </section>
  );
}

export default CTA;