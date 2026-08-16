import { useState } from 'react'

interface GaugeChartProps {
  value: number // Overall OEE (e.g. 83)
  availability?: number // Khả dụng (e.g. 94.2)
  performance?: number // Hiệu suất vận hành (e.g. 88.5)
  quality?: number // Chất lượng thành phẩm (e.g. 98.1)
  label?: string
  size?: number
}

export default function GaugeChart({
  value,
  availability = 94.2,
  performance = 88.5,
  quality = 98.1,
  label = 'Chỉ số OEE',
  size = 240,
}: GaugeChartProps) {
  const [hoveredRing, setHoveredRing] = useState<'all' | 'availability' | 'performance' | 'quality'>('all')

  // Ring configurations
  const rings = [
    {
      id: 'availability' as const,
      label: 'Khả dụng (A)',
      value: availability,
      radius: 90,
      strokeWidth: 9,
      gradientId: 'gradAvailability',
      startColor: '#0284c7', // Sky Blue
      endColor: '#38bdf8',
      trackColor: '#e0f2fe',
      darkTrackColor: '#0c4a6e',
      unit: '%',
    },
    {
      id: 'performance' as const,
      label: 'Hiệu suất (P)',
      value: performance,
      radius: 75,
      strokeWidth: 9,
      gradientId: 'gradPerformance',
      startColor: '#d97706', // Amber Gold
      endColor: '#fbbf24',
      trackColor: '#fef3c7',
      darkTrackColor: '#78350f',
      unit: '%',
    },
    {
      id: 'quality' as const,
      label: 'Chất lượng (Q)',
      value: quality,
      radius: 60,
      strokeWidth: 9,
      gradientId: 'gradQuality',
      startColor: '#b5000b', // Hoa Sen Red
      endColor: '#ef4444',
      trackColor: '#fee2e2',
      darkTrackColor: '#7f1d1d',
      unit: '%',
    },
  ]

  // Calculate current display metric in center
  const displayMetric = () => {
    if (hoveredRing === 'availability') {
      return { val: availability, name: 'Khả Dụng (A)', color: 'text-sky-600' }
    }
    if (hoveredRing === 'performance') {
      return { val: performance, name: 'Hiệu Suất (P)', color: 'text-amber-600' }
    }
    if (hoveredRing === 'quality') {
      return { val: quality, name: 'Chất Lượng (Q)', color: 'text-rose-600' }
    }
    return { val: value, name: label, color: 'text-primary' }
  }

  const metric = displayMetric()

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      {/* 3-Ring SVG Dial */}
      <div style={{ width: size, height: size }} className="relative">
        <svg
          viewBox="0 0 220 220"
          className="w-full h-full transform -rotate-90 drop-shadow-sm transition-all duration-300"
        >
          <defs>
            {/* Ring 1: Availability Gradient */}
            <linearGradient id="gradAvailability" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Ring 2: Performance Gradient */}
            <linearGradient id="gradPerformance" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>

            {/* Ring 3: Quality Gradient */}
            <linearGradient id="gradQuality" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b5000b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Render 3 Concentric Rings */}
          {rings.map((ring) => {
            const circumference = 2 * Math.PI * ring.radius
            const strokeDashoffset = circumference - (ring.value / 100) * circumference
            const isHovered = hoveredRing === ring.id || hoveredRing === 'all'
            const isDimmed = hoveredRing !== 'all' && hoveredRing !== ring.id

            return (
              <g
                key={ring.id}
                className="cursor-pointer transition-opacity duration-300"
                style={{ opacity: isDimmed ? 0.25 : 1 }}
                onMouseEnter={() => setHoveredRing(ring.id)}
                onMouseLeave={() => setHoveredRing('all')}
              >
                {/* Background Track */}
                <circle
                  cx="110"
                  cy="110"
                  r={ring.radius}
                  fill="none"
                  stroke="var(--color-outline-variant, #e2e8f0)"
                  strokeOpacity={0.35}
                  strokeWidth={ring.strokeWidth}
                />

                {/* Progress Stroke */}
                <circle
                  cx="110"
                  cy="110"
                  r={ring.radius}
                  fill="none"
                  stroke={`url(#${ring.gradientId})`}
                  strokeWidth={ring.strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-700 ease-out"
                  filter={hoveredRing === ring.id ? 'url(#glow)' : undefined}
                />
              </g>
            )
          })}
        </svg>

        {/* Center Information */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-on-surface">
            {typeof metric.val === 'number' ? (Number.isInteger(metric.val) ? `${metric.val}%` : `${metric.val.toFixed(1)}%`) : `${metric.val}%`}
          </span>
          <span className={`text-[11px] font-mono font-bold uppercase tracking-wider mt-0.5 ${metric.color}`}>
            {metric.name}
          </span>
          <span className="text-[10px] font-mono text-on-surface-variant/70 font-semibold mt-0.5">
            World-Class OEE
          </span>
        </div>
      </div>

      {/* Ring Legend Pills */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 w-full">
        {rings.map((ring) => (
          <button
            key={ring.id}
            onClick={() => setHoveredRing(hoveredRing === ring.id ? 'all' : ring.id)}
            onMouseEnter={() => setHoveredRing(ring.id)}
            onMouseLeave={() => setHoveredRing('all')}
            className={`cursor-pointer px-2 py-1 rounded-lg border text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all ${
              hoveredRing === ring.id
                ? 'bg-surface-container-high border-primary/40 shadow-2xs scale-105'
                : 'bg-surface-container-low/50 border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: ring.startColor }}
            />
            <span className="text-on-surface">{ring.label.split(' ')[0]}</span>
            <span className="text-on-surface font-extrabold">{ring.value}%</span>
          </button>
        ))}
      </div>
    </div>
  )
}
