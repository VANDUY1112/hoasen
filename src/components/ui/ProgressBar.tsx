interface ProgressBarProps {
  value: number
  label?: string
  color?: 'primary' | 'error' | 'success' | 'tertiary'
  showPercent?: boolean
  height?: string
}

export default function ProgressBar({
  value,
  label,
  color = 'primary',
  showPercent = false,
  height = 'h-2',
}: ProgressBarProps) {
  const colorMap = {
    primary: 'bg-primary',
    error: 'bg-error',
    success: 'bg-success',
    tertiary: 'bg-tertiary',
  }

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-mono text-on-surface-variant">{label}</span>}
          {showPercent && <span className="text-xs font-mono font-semibold text-on-surface">{value}%</span>}
        </div>
      )}
      <div className={`w-full bg-surface-container-highest rounded-full ${height} overflow-hidden`}>
        <div
          className={`${colorMap[color]} ${height} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  )
}
