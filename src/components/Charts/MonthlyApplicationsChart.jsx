import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import './Charts.css'

export function MonthlyApplicationsChart({ data }) {
  return (
    <div className="chart-box">
      <h3>Monthly Applications</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ left: 8, right: 8 }}>
          <defs>
            <linearGradient id="applicationsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0284c7" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#cbd5e1" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#334155', fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fill: '#334155', fontSize: 12 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="applications"
            stroke="#0284c7"
            fill="url(#applicationsGradient)"
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
