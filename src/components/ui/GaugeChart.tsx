import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface GaugeChartProps {
  value: number
  label?: string
  size?: number
}

export default function GaugeChart({ value, label = 'Chỉ số OEE', size = 220 }: GaugeChartProps) {
  const data = [
    { name: 'value', value: value },
    { name: 'remaining', value: 100 - value },
  ]

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius="75%"
              outerRadius="90%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill="var(--color-primary)" />
              <Cell fill="var(--color-surface-container-high)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl sm:text-5xl font-bold text-on-surface">{value}%</span>
        <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider mt-1">
          {label}
        </span>
      </div>
    </div>
  )
}
