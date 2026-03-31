import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import './Charts.css'

const COLORS = ['#0f766e', '#0369a1', '#f59e0b', '#ef4444']

export function StatusPieChart({ data }) {
  const hasData = data.some((item) => item.value > 0)

  if (!hasData) {
    return <p className="chart__empty">No application stage data yet.</p>
  }

  return (
    <div className="chart-box">
      <h3>Application Stages</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={105}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
