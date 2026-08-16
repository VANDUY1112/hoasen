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
  // Cohesive brand styling - Red & Neutral instead of harsh green/yellow
  const iconStyles = {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    error: 'bg-rose-500/10 text-rose-600 border border-rose-500/20',
    success: 'bg-primary/10 text-primary border border-primary/20',
    default: 'bg-surface-container text-on-surface-variant border border-outline-variant/40',
  }

  const borderColors = {
    primary: 'border-l-4 border-l-primary',
    error: 'border-l-4 border-l-primary',
    success: 'border-l-4 border-l-primary',
    default: 'border-l-4 border-l-primary',
  }

  return (
    <div
      className={`
        group relative bg-surface-container-lowest p-3.5 sm:p-5 flex flex-col justify-between
        overflow-hidden shadow-xs hover:shadow-md card-hover border border-outline-variant/35 rounded-2xl transition-all
        ${borderColors[accentColor]} ${className}
      `}
    >
      <div className="flex justify-between items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider leading-snug">
            {title}
          </p>
          <h2 className="text-xl sm:text-3xl font-mono font-extrabold text-on-surface tracking-tight mt-0.5 sm:mt-1 group-hover:text-primary transition-colors animate-counter">
            {value}
          </h2>
          {subtitle && (
            <p className="text-[11px] sm:text-xs font-medium text-on-surface-variant/85 mt-0.5 leading-snug">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div
            className={`
              p-2 sm:p-2.5 rounded-xl ${iconStyles[accentColor]} shrink-0
              shadow-xs group-hover:scale-105 transition-all duration-300
            `}
          >
            {icon}
          </div>
        )}
      </div>

      {trend !== undefined && (
        <div className="flex items-center flex-wrap gap-1.5 pt-2 border-t border-outline-variant/20 text-xs font-bold font-mono text-on-surface">
          {trend >= 0 ? (
            <span className="flex items-center text-primary font-bold">
              <TrendingUp size={14} className="mr-1" /> +{trend}%
            </span>
          ) : (
            <span className="flex items-center text-rose-600 font-bold">
              <TrendingDown size={14} className="mr-1" /> {trend}%
            </span>
          )}
          {trendLabel && <span className="font-sans font-medium text-[11px] text-on-surface-variant/70 italic">{trendLabel}</span>}
        </div>
      )}

      {resolved && (
        <div className="flex items-center gap-1.5 pt-2 border-t border-outline-variant/20 text-xs font-bold font-mono text-on-surface-variant">
          <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Check size={11} className="stroke-[3]" />
          </div>
          <span className="font-sans text-[11px] font-semibold text-on-surface-variant">Đã khắc phục 100%</span>
        </div>
      )}
    </div>
  )
}
