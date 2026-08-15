import { type ReactNode } from 'react'
import { TrendingUp, TrendingDown, Check } from 'lucide-react'

interface KpiCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: number
  trendLabel?: string
  icon?: ReactNode
  accentColor?: 'primary' | 'error' | 'success' | 'default'
  resolved?: boolean
  className?: string
}

export default function KpiCard({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon,
  accentColor = 'primary',
  resolved,
  className = '',
}: KpiCardProps) {
  const borderColors = {
    primary: 'border-primary',
    error: 'border-on-surface-variant',
    success: 'border-success',
    default: 'border-primary',
  }

  const iconStyles = {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    error: 'bg-rose-500/10 text-rose-600 border border-rose-500/20',
    success: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
    default: 'bg-surface-container text-on-surface-variant border border-outline-variant/40',
  }

  return (
    <div
      className={`
        group relative bg-surface-container-lowest p-5 flex flex-col justify-between
        overflow-hidden shadow-sm card-hover border-l-4 rounded-xl
        ${borderColors[accentColor]} ${className}
      `}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm sm:text-[13px] font-semibold text-on-surface-variant uppercase tracking-wider">
            {title}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface mt-2 group-hover:text-primary transition-colors animate-counter">
            {value}
          </h2>
          {subtitle && (
            <p className="text-sm font-medium text-on-surface-variant mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div
            className={`
              p-3 rounded-2xl ${iconStyles[accentColor]} shrink-0
              shadow-sm group-hover:scale-110 transition-all duration-300
            `}
          >
            {icon}
          </div>
        )}
      </div>

      {trend !== undefined && (
        <div className={`flex items-center gap-2 mt-2 ${trend >= 0 ? 'text-success' : 'text-error'}`}>
          {trend >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
          <span className="text-sm font-semibold">
            {trend >= 0 ? '+' : ''}{trend}% {trendLabel || ''}
          </span>
        </div>
      )}

      {resolved && (
        <div className="flex items-center gap-2 text-success mt-2">
          <Check size={18} />
          <span className="text-sm font-semibold">Đã khắc phục 100% sự cố</span>
        </div>
      )}
    </div>
  )
}


