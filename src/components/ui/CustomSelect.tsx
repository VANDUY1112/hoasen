import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
  badge?: string
  description?: string
}

interface CustomSelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  icon?: React.ReactNode
  className?: string
  required?: boolean
  error?: string
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Chọn một mục...',
  label,
  icon,
  className = '',
  error,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>{label}</span>
          {selectedOption?.badge && (
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
              {selectedOption.badge}
            </span>
          )}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl
          bg-surface-container-lowest border transition-all duration-200 text-left text-sm sm:text-base
          ${isOpen
            ? 'border-primary ring-2 ring-primary/15 shadow-md shadow-primary/5 bg-surface-container-lowest'
            : 'border-outline-variant/60 hover:border-primary/50 hover:bg-surface-container-low/60 shadow-xs'
          }
          ${error ? 'border-error ring-1 ring-error/20' : ''}
        `}
      >
        <div className="flex items-center gap-3 truncate flex-1">
          {icon && <span className="text-on-surface-variant shrink-0">{icon}</span>}
          {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
          {selectedOption ? (
            <span className="font-semibold text-on-surface truncate">{selectedOption.label}</span>
          ) : (
            <span className="text-on-surface-variant/60 truncate">{placeholder}</span>
          )}
        </div>

        <ChevronDown
          size={20}
          className={`text-on-surface-variant transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 py-2 bg-surface-container-lowest/98 backdrop-blur-xl border border-outline-variant/80 rounded-2xl shadow-2xl shadow-black/10 animate-scale-in max-h-72 overflow-y-auto">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-on-surface-variant text-center">Không có tùy chọn</div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 text-left text-sm sm:text-base transition-all duration-150 mx-1 rounded-xl
                    ${isSelected
                      ? 'bg-primary-container text-on-primary-container font-bold shadow-xs'
                      : 'text-on-surface hover:bg-surface-container hover:text-primary'
                    }
                  `}
                  style={{ width: 'calc(100% - 8px)' }}
                >
                  <div className="flex items-center gap-3 truncate">
                    {option.icon && <span className="shrink-0">{option.icon}</span>}
                    <div className="truncate">
                      <div className="truncate font-semibold">{option.label}</div>
                      {option.description && (
                        <div className="text-xs font-normal opacity-75 truncate mt-0.5">{option.description}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    {option.badge && (
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-bold">
                        {option.badge}
                      </span>
                    )}
                    {isSelected && <Check size={18} className="text-on-primary-container stroke-[2.5]" />}
                  </div>
                </button>
              )
            })
          )}
        </div>
      )}

      {error && <p className="mt-1.5 text-xs text-error font-semibold">{error}</p>}
    </div>
  )
}
