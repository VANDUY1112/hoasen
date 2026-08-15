import { useState, useRef, useEffect } from 'react'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Sparkles } from 'lucide-react'

export interface CustomDatePickerProps {
  value: string // 'YYYY-MM-DD'
  onChange: (date: string) => void
  label?: string
  placeholder?: string
  className?: string
  minDate?: string
  maxDate?: string
  disabled?: boolean
  error?: string
}

const MONTHS_VN = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
]

const DAYS_OF_WEEK = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

export default function CustomDatePicker({
  value,
  onChange,
  label,
  placeholder = 'Chọn ngày...',
  className = '',
  minDate,
  maxDate,
  disabled = false,
  error,
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Parse current selected date or fallback to today
  const selectedDate = value ? new Date(value + 'T00:00:00') : null
  const initialDate = selectedDate || new Date()

  const [viewYear, setViewYear] = useState<number>(initialDate.getFullYear())
  const [viewMonth, setViewMonth] = useState<number>(initialDate.getMonth())

  // Keep view in sync when value changes externally
  useEffect(() => {
    if (value) {
      const d = new Date(value + 'T00:00:00')
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear())
        setViewMonth(d.getMonth())
      }
    }
  }, [value])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Helper formatting
  const formatDisplay = (val: string) => {
    if (!val) return ''
    const d = new Date(val + 'T00:00:00')
    if (isNaN(d.getTime())) return val
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    
    // Check if today
    const today = new Date()
    const isToday =
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()

    return `${day}/${month}/${year}${isToday ? ' (Hôm nay)' : ''}`
  }

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((prev) => prev - 1)
    } else {
      setViewMonth((prev) => prev - 1)
    }
  }

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((prev) => prev + 1)
    } else {
      setViewMonth((prev) => prev + 1)
    }
  }

  const handleSelectDate = (year: number, month: number, day: number) => {
    const yStr = String(year)
    const mStr = String(month + 1).padStart(2, '0')
    const dStr = String(day).padStart(2, '0')
    const dateStr = `${yStr}-${mStr}-${dStr}`
    onChange(dateStr)
    setIsOpen(false)
  }

  // Quick Presets
  const handleQuickSelect = (type: 'today' | 'yesterday' | 'tomorrow' | 'month_start' | 'month_end') => {
    const now = new Date()
    let target = new Date()

    if (type === 'today') {
      target = now
    } else if (type === 'yesterday') {
      target.setDate(now.getDate() - 1)
    } else if (type === 'tomorrow') {
      target.setDate(now.getDate() + 1)
    } else if (type === 'month_start') {
      target = new Date(now.getFullYear(), now.getMonth(), 1)
    } else if (type === 'month_end') {
      target = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    }

    const yStr = String(target.getFullYear())
    const mStr = String(target.getMonth() + 1).padStart(2, '0')
    const dStr = String(target.getDate()).padStart(2, '0')
    onChange(`${yStr}-${mStr}-${dStr}`)
    setViewYear(target.getFullYear())
    setViewMonth(target.getMonth())
    setIsOpen(false)
  }

  // Generate Calendar Grid
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year: number, month: number) => {
    // 0 = Sunday, 1 = Monday, ... convert to Monday = 0, Sunday = 6
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1
  }

  const daysInCurrentMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDayOffset = getFirstDayOfMonth(viewYear, viewMonth)
  const daysInPrevMonth = getDaysInMonth(viewYear, viewMonth === 0 ? 11 : viewMonth - 1)

  const calendarDays: Array<{
    day: number
    month: number
    year: number
    isCurrentMonth: boolean
    isToday: boolean
    isSelected: boolean
    isDisabled: boolean
  }> = []

  const today = new Date()

  // Previous Month trailing days
  for (let i = firstDayOffset - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i
    const m = viewMonth === 0 ? 11 : viewMonth - 1
    const y = viewMonth === 0 ? viewYear - 1 : viewYear
    calendarDays.push({
      day: d,
      month: m,
      year: y,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: false,
    })
  }

  // Current Month days
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    const isToday =
      i === today.getDate() &&
      viewMonth === today.getMonth() &&
      viewYear === today.getFullYear()

    let isSelected = false
    if (selectedDate) {
      isSelected =
        i === selectedDate.getDate() &&
        viewMonth === selectedDate.getMonth() &&
        viewYear === selectedDate.getFullYear()
    }

    calendarDays.push({
      day: i,
      month: viewMonth,
      year: viewYear,
      isCurrentMonth: true,
      isToday,
      isSelected,
      isDisabled: false,
    })
  }

  // Next Month leading days
  const remainingCells = 42 - calendarDays.length // 6 rows * 7 cols
  for (let i = 1; i <= remainingCells; i++) {
    const m = viewMonth === 11 ? 0 : viewMonth + 1
    const y = viewMonth === 11 ? viewYear + 1 : viewYear
    calendarDays.push({
      day: i,
      month: m,
      year: y,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      isDisabled: false,
    })
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span>{label}</span>
          {value && (
            <span className="font-mono text-xs text-primary font-bold">
              {new Date(value + 'T00:00:00').toLocaleDateString('vi-VN', { weekday: 'short' })}
            </span>
          )}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          cursor-pointer w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl
          bg-surface-container-lowest border transition-all duration-200 text-left text-sm font-mono
          ${isOpen
            ? 'border-primary ring-2 ring-primary/15 shadow-md shadow-primary/5'
            : 'border-outline-variant/60 hover:border-primary/50 hover:bg-surface-container-low/60 shadow-xs'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed bg-surface-container' : ''}
          ${error ? 'border-error ring-1 ring-error/20' : ''}
        `}
      >
        <div className="flex items-center gap-2.5 truncate">
          <CalendarIcon size={16} className={`shrink-0 ${isOpen ? 'text-primary' : 'text-on-surface-variant'}`} />
          {value ? (
            <span className="font-bold text-on-surface truncate">{formatDisplay(value)}</span>
          ) : (
            <span className="text-on-surface-variant/60 truncate font-sans text-xs">{placeholder}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant uppercase tracking-wider">
            Lịch
          </span>
        </div>
      </button>

      {/* Dropdown Calendar Popover */}
      {isOpen && (
        <div className="absolute z-50 left-0 mt-1.5 p-3 sm:p-4 bg-surface-container-lowest/98 backdrop-blur-xl border border-outline-variant/80 rounded-2xl shadow-2xl shadow-black/15 animate-scale-in w-[300px] sm:w-[340px] max-w-[calc(100vw-32px)]">
          {/* Header Navigation */}
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-outline-variant/30">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-on-surface">
                {MONTHS_VN[viewMonth]} {viewYear}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="cursor-pointer p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                title="Tháng trước"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  const now = new Date()
                  setViewYear(now.getFullYear())
                  setViewMonth(now.getMonth())
                }}
                className="cursor-pointer px-2 py-1 text-[11px] font-mono font-bold rounded-lg bg-surface-container hover:bg-primary/10 hover:text-primary transition-colors text-on-surface-variant"
                title="Về tháng hiện tại"
              >
                Hiện tại
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="cursor-pointer p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                title="Tháng sau"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
            {DAYS_OF_WEEK.map((d, index) => (
              <span
                key={d}
                className={`text-[11px] font-mono font-extrabold uppercase py-1 ${
                  index >= 5 ? 'text-rose-600' : 'text-on-surface-variant'
                }`}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarDays.map((item, index) => {
              const isWeekend = (index % 7) >= 5
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectDate(item.year, item.month, item.day)}
                  className={`
                    cursor-pointer h-8.5 rounded-xl font-mono text-xs font-bold transition-all duration-150 flex items-center justify-center relative
                    ${item.isSelected
                      ? 'bg-primary text-on-primary font-extrabold shadow-md shadow-primary/30 scale-105 z-10'
                      : item.isCurrentMonth
                      ? isWeekend
                        ? 'text-rose-700 hover:bg-rose-500/10 hover:text-rose-800'
                        : 'text-on-surface hover:bg-primary/10 hover:text-primary'
                      : 'text-on-surface-variant/30 hover:bg-surface-container/60 hover:text-on-surface-variant'
                    }
                    ${item.isToday && !item.isSelected ? 'border border-primary text-primary bg-primary/5 font-extrabold' : ''}
                  `}
                >
                  {item.day}
                  {item.isToday && !item.isSelected && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Quick Preset Buttons */}
          <div className="mt-3 pt-2.5 border-t border-outline-variant/30 flex items-center justify-between gap-1 flex-wrap">
            <button
              type="button"
              onClick={() => handleQuickSelect('today')}
              className="cursor-pointer px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-colors"
            >
              Hôm nay
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect('yesterday')}
              className="cursor-pointer px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Hôm qua
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect('tomorrow')}
              className="cursor-pointer px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Ngày mai
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect('month_start')}
              className="cursor-pointer px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Đầu tháng
            </button>
          </div>
        </div>
      )}

      {error && <p className="mt-1 text-xs text-error font-semibold">{error}</p>}
    </div>
  )
}
