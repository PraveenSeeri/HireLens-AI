import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
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

  return (
    <section className="max-w-7xl mx-auto px-8 mt-16">

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl dark:shadow-black/40 p-8">

        <h2 className="text-3xl font-bold mb-8 dark:text-white">
          Resume Performance Trend
        </h2>

        {data.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            No resume history available.
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={420}
          >
            <LineChart data={data}>

              <CartesianGrid strokeDasharray="5 5" />

              <XAxis dataKey="name" />

              <YAxis domain={[0, 100]} />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="resumeScore"
                stroke="#2563eb"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="atsScore"
                stroke="#16a34a"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="confidence"
                stroke="#9333ea"
                strokeWidth={3}
              />

            </LineChart>
          </ResponsiveContainer>
        )}

      </div>

    </section>
  );
}

export default DashboardChart;