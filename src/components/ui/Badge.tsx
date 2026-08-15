export type BadgeVariant = 'success' | 'warning' | 'error' | 'primary' | 'info' | 'neutral'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  pulse?: boolean
  size?: 'sm' | 'md'
  icon?: React.ReactNode
  className?: string
}

export default function Badge({
  children,
  variant = 'neutral',
  pulse = false,
  size = 'md',
  icon,
  className = '',
}: BadgeProps) {
  const variantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
    success: {
      container: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30',
      dot: 'bg-emerald-500 shadow-emerald-500/50',
    },
    warning: {
      container: 'bg-amber-500/10 text-amber-700 border-amber-500/30',
      dot: 'bg-amber-500 shadow-amber-500/50',
    },
    error: {
      container: 'bg-rose-500/10 text-rose-700 border-rose-500/30',
      dot: 'bg-rose-500 shadow-rose-500/50',
    },
    primary: {
      container: 'bg-primary/10 text-primary border-primary/30',
      dot: 'bg-primary shadow-primary/50',
    },
    info: {
      container: 'bg-sky-500/10 text-sky-700 border-sky-500/30',
      dot: 'bg-sky-500 shadow-sky-500/50',
    },
    neutral: {
      container: 'bg-surface-container text-on-surface-variant border-outline-variant/60',
      dot: 'bg-on-surface-variant/60 shadow-none',
    },
  }

  // Sized comfortably for UI tables & cards
  const sizeStyles = {
    sm: 'text-[11px] sm:text-xs px-2.5 py-0.5 font-bold whitespace-nowrap',
    md: 'text-xs sm:text-sm px-3 py-1 font-bold whitespace-nowrap',
  }

  const current = variantStyles[variant]

  return (
    <span
      className={`
        inline-flex items-center justify-center rounded-full border font-mono uppercase transition-all duration-200 shadow-2xs whitespace-nowrap shrink-0
        ${sizeStyles[size]} ${current.container} ${className}
      `}
    >
      {pulse && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${current.dot}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 shadow-xs ${current.dot}`} />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  )
}
