import { Search, X } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  shortcut?: string
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Tìm kiếm dữ liệu...',
  className = '',
  shortcut,
}: SearchInputProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search
        size={16}
        className="absolute left-3.5 text-on-surface-variant/70 pointer-events-none transition-colors group-focus-within:text-primary"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-9 pr-14 py-2 bg-surface-container-lowest/90 border border-outline-variant/60 rounded-xl
          text-sm text-on-surface placeholder:text-on-surface-variant/50 shadow-xs
          focus:border-primary focus:ring-3 focus:ring-primary/15 focus:bg-surface-container-lowest
          hover:border-outline-variant/90 transition-all duration-200 outline-none
        "
      />
      <div className="absolute right-2.5 flex items-center gap-1">
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1 text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors"
          >
            <X size={14} />
          </button>
        ) : shortcut ? (
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant/70 border border-outline-variant/40">
            {shortcut}
          </span>
        ) : null}
      </div>
    </div>
  )
}
