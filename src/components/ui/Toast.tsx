import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'warning' | 'error' | 'info'

export interface Toast {
  id: string
  title: string
  message?: string
  type: ToastType
  duration?: number
}

interface ToastContextType {
  addToast: {
    (toast: Omit<Toast, 'id'>): void
    (type: ToastType, title: string, message?: string, duration?: number): void
  }
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (
      arg1: ToastType | Omit<Toast, 'id'>,
      arg2?: string,
      arg3?: string,
      arg4: number = 3500
    ) => {
      const id = Math.random().toString(36).substring(2, 9)
      let newToast: Toast

      if (typeof arg1 === 'string') {
        newToast = {
          id,
          type: arg1,
          title: arg2 || '',
          message: arg3,
          duration: arg4,
        }
      } else {
        newToast = {
          id,
          type: arg1.type || 'info',
          title: arg1.title,
          message: arg1.message,
          duration: arg1.duration || 3500,
        }
      }

      setToasts((prev) => [...prev, newToast])

      setTimeout(() => {
        removeToast(id)
      }, newToast.duration || 3500)
    },
    [removeToast]
  )

  const icons = {
    success: <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />,
    warning: <AlertTriangle size={20} className="text-amber-500 shrink-0" />,
    error: <AlertCircle size={20} className="text-rose-500 shrink-0" />,
    info: <Info size={20} className="text-sky-500 shrink-0" />,
  }

  const borderStyles = {
    success: 'border-emerald-500/30 bg-surface-container-lowest/98 shadow-emerald-500/10',
    warning: 'border-amber-500/30 bg-surface-container-lowest/98 shadow-amber-500/10',
    error: 'border-rose-500/30 bg-surface-container-lowest/98 shadow-rose-500/10',
    info: 'border-sky-500/30 bg-surface-container-lowest/98 shadow-sky-500/10',
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`
              pointer-events-auto p-4 sm:p-5 rounded-2xl border backdrop-blur-2xl shadow-2xl flex items-start gap-3.5
              animate-slide-up transition-all duration-200 ${borderStyles[t.type]}
            `}
          >
            <div className="mt-0.5">{icons[t.type]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-extrabold text-on-surface leading-tight">{t.title}</p>
              {t.message && (
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-snug font-medium">{t.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="p-1.5 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
