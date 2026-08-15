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
        group relative bg-surface-container-lowest p-4 sm:p-5 flex flex-col justify-between
        overflow-hidden shadow-xs hover:shadow-md card-hover border border-outline-variant/35 border-l-4 rounded-2xl
        ${borderColors[accentColor]} ${className}
      `}
    >
      <div className="flex justify-between items-start gap-3 mb-3">
        <div className="min-w-0">
          <p className="text-[11px] sm:text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider truncate">
            {title}
          </p>
          <h2 className="text-2xl sm:text-3xl font-mono font-extrabold text-on-surface tracking-tight mt-1 group-hover:text-primary transition-colors animate-counter">
            {value}
          </h2>
          {subtitle && (
            <p className="text-xs font-medium text-on-surface-variant/85 mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div
            className={`
              p-2.5 rounded-xl ${iconStyles[accentColor]} shrink-0
              shadow-xs group-hover:scale-105 transition-all duration-300
            `}
          >
            {icon}
          </div>
        )}
      </div>

      {trend !== undefined && (
        <div className={`flex items-center gap-1.5 pt-2 border-t border-outline-variant/20 text-xs font-bold font-mono ${trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
          {trendLabel && <span className="font-sans font-medium text-[11px] text-on-surface-variant/70 italic truncate">{trendLabel}</span>}
        </div>
      )}

      {resolved && (
        <div className="flex items-center gap-1.5 pt-2 border-t border-outline-variant/20 text-emerald-600 text-xs font-bold font-mono">
          <Check size={14} className="stroke-[2.5]" />
          <span className="font-sans text-[11px] font-semibold text-emerald-700">Đã khắc phục 100%</span>
        </div>
      )}
    </div>
  )
}


