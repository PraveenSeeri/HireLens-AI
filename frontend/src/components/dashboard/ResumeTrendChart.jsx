import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function ResumeTrendChart({ data }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-black/40 p-8">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
          Resume Performance Trend
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Track how your resume scores improve over time.
        </p>

      </div>

      <ResponsiveContainer width="100%" height={420}>

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#475569"
          />

          <XAxis
            dataKey="name"
            tick={{ fill: "#94A3B8" }}
          />

          <YAxis
            tick={{ fill: "#94A3B8" }}
            domain={[0, 100]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
            }}
            labelStyle={{
              color: "#fff",
            }}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="resumeScore"
            name="Resume Score"
            stroke="#2563eb"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />

          <Line
            type="monotone"
            dataKey="atsScore"
            name="ATS Score"
            stroke="#16a34a"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="confidence"
            name="Recruiter Confidence"
            stroke="#9333ea"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ResumeTrendChart;