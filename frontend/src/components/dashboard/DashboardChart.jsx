import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import { getResumeHistory } from "../../api/resumeApi";

function DashboardChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      try {
        const history = await getResumeHistory();

        const chartData = history
          .slice()
          .reverse()
          .map((resume, index) => ({
            name: `Resume ${index + 1}`,
            resumeScore: resume.resume_score,
            atsScore: resume.ats_score,
            confidence: resume.recruiter_confidence,
          }));

        setData(chartData);
      } catch (err) {
        console.error(err);
      }
    }

    loadHistory();
  }, []);

  if (data.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-8 mt-16 space-y-10">

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold mb-8 dark:text-white">
          Resume Performance Trend
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />

            <Line
              dataKey="resumeScore"
              stroke="#2563eb"
              strokeWidth={3}
            />

            <Line
              dataKey="atsScore"
              stroke="#16a34a"
              strokeWidth={3}
            />

            <Line
              dataKey="confidence"
              stroke="#9333ea"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold mb-8 dark:text-white">
          Resume Score Growth
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Area
              dataKey="resumeScore"
              stroke="#2563eb"
              fill="#93c5fd"
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>

    </section>
  );
}

export default DashboardChart;