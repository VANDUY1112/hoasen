import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Factory,
  AlertTriangle,
  Warehouse,
  Menu,
} from 'lucide-react'
import { useLiveSimulation } from '../../context/LiveSimulationContext'

interface MobileNavProps {
  onOpenSidebar: () => void
}

export default function MobileNav({ onOpenSidebar }: MobileNavProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.replace(/^\//, '') || 'tong-quan'
  const { isSimulating } = useLiveSimulation()

  const navItems = [
    {
      id: 'tong-quan',
      path: '/tong-quan',
      label: 'Tổng quan',
      icon: LayoutDashboard,
    },
    {
      id: 'san-luong',
      path: '/san-luong',
      label: 'Sản lượng',
      icon: Factory,
      badge: isSimulating ? 'Live' : undefined,
    },
    {
      id: 'quan-ly-loi',
      path: '/quan-ly-loi',
      label: 'Lỗi & QC',
      icon: AlertTriangle,
      badge: '14',
    },
    {
      id: 'quan-ly-ton-kho',
      path: '/quan-ly-ton-kho',
      label: 'Tồn kho',
      icon: Warehouse,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-surface-container-lowest/95 backdrop-blur-2xl border-t border-outline-variant/40 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-1.5 pt-1 pb-safe">
      <nav className="w-full flex items-center justify-around gap-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.id
          const Icon = item.icon

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`
                cursor-pointer relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 flex-1
                ${isActive
                  ? 'bg-primary text-on-primary shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high/40 active:scale-95'
                }
              `}
            >
              <div className="relative">
                <Icon size={18} className={isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
                {item.badge && (
                  <span
                    className={`
                      absolute -top-1 -right-2.5 font-mono text-[8px] px-1 py-0.1 rounded-full font-extrabold leading-tight shadow-xs
                      ${isActive
                        ? 'bg-on-primary text-primary'
                        : item.id === 'san-luong'
                        ? 'bg-emerald-500 text-white animate-pulse'
                        : 'bg-error text-on-error'
                      }
                    `}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 truncate font-semibold leading-none">
                {item.label}
              </span>
            </button>
          )
        })}

        {/* Menu Drawer Toggle Button */}
        <button
          onClick={onOpenSidebar}
          className="cursor-pointer relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container-high/40 active:scale-95 transition-all duration-200 flex-1"
        >
          <div className="relative">
            <Menu size={18} className="stroke-[2]" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <span className="text-[10px] mt-0.5 font-semibold leading-none">Menu</span>
        </button>
      </nav>
    </div>
  )
}
