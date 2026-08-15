import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Factory,
  AlertTriangle,
  PauseCircle,
  Warehouse,
  BarChart3,
  Wrench,
  Users,
  Settings,
  X,
  Sparkles,
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  currentView: string
  onNavigate: (view: string) => void
}

interface NavItemConfig {
  path: string
  label: string
  icon: React.ElementType
  badge?: string
  badgeVariant?: 'primary' | 'error' | 'warning' | 'neutral'
}

const navItems: NavItemConfig[] = [
  { path: 'tong-quan', label: 'Tổng quan', icon: LayoutDashboard },
  { path: 'san-luong', label: 'Sản lượng', icon: Factory, badge: 'Live', badgeVariant: 'primary' },
  { path: 'quan-ly-loi', label: 'Quản lý Lỗi', icon: AlertTriangle, badge: '14', badgeVariant: 'error' },
  { path: 'thoi-gian-dung-may', label: 'Thời gian Dừng máy', icon: PauseCircle, badge: '42m', badgeVariant: 'warning' },
  { path: 'quan-ly-ton-kho', label: 'Quản lý Tồn kho', icon: Warehouse },
  { path: 'quan-ly-dinh-muc', label: 'Quản lý Định mức', icon: BarChart3 },
  { path: 'du-bao-bao-tri', label: 'Dự báo Bảo trì', icon: Wrench, badge: '07', badgeVariant: 'error' },
  { path: 'hieu-suat-ca-truc', label: 'Hiệu suất Ca trực', icon: Users, badge: 'Ca 1', badgeVariant: 'neutral' },
]

export default function Sidebar({ isOpen, onClose, currentView, onNavigate }: SidebarProps) {
  const navigate = useNavigate()

  const handleNav = (path: string) => {
    onNavigate(path)
    navigate(`/${path}`)
    onClose()
  }

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full w-72 bg-surface-container-lowest/95 backdrop-blur-xl z-50
        flex flex-col border-r border-outline-variant/60
        transform transition-transform duration-300 ease-in-out
        shadow-2xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 gradient-primary" />

      {/* Logo Section */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 py-1">
          <div className="relative group">
            <img
              alt="Hoa Sen Group Logo"
              className="h-11 w-11 object-cover rounded-xl shadow-md border border-outline-variant/40 group-hover:scale-105 transition-transform duration-300"
              src="/logo.jpg"
            />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-surface-container-lowest" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-base text-primary tracking-wide leading-tight uppercase">
              Hoa Sen Group
            </span>
            <span className="text-[11px] font-mono font-bold text-on-surface-variant/80 tracking-widest uppercase mt-0.5">
              Quản trị sản xuất
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="lg:hidden text-on-surface-variant hover:text-primary p-2 rounded-xl hover:bg-surface-container-high transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Plant Location Selector Card */}
      <div className="px-4 mb-2">
        <div className="p-2.5 rounded-2xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div>
              <p className="text-[11px] font-mono text-on-surface-variant uppercase font-semibold">Khu phức hợp</p>
              <p className="text-xs font-bold text-on-surface">Nhà máy Tôn Hoa Sen</p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-surface-container-highest text-on-surface-variant font-bold">
            KCN PM1
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 mt-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.path
          const Icon = item.icon
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`
                group w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 text-left text-sm font-medium
                ${isActive
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-md shadow-primary/10'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }
              `}
            >
              <div className="flex items-center gap-3 truncate">
                <div
                  className={`
                    p-1.5 rounded-lg transition-colors
                    ${isActive
                      ? 'bg-on-primary-container/10 text-on-primary-container'
                      : 'text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10'
                    }
                  `}
                >
                  <Icon size={18} />
                </div>
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`
                    font-mono text-[10px] px-2 py-0.5 rounded-full font-bold uppercase transition-transform group-hover:scale-105
                    ${isActive
                      ? 'bg-on-primary-container text-primary-container'
                      : item.badgeVariant === 'error'
                      ? 'bg-rose-500/10 text-rose-700 border border-rose-500/20'
                      : item.badgeVariant === 'warning'
                      ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20'
                      : item.badgeVariant === 'primary'
                      ? 'bg-primary/10 text-primary border border-primary/20 animate-pulse'
                      : 'bg-surface-container-high text-on-surface-variant'
                    }
                  `}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}

        {/* Divider + Settings */}
        <div className="pt-3 mt-3 border-t border-outline-variant/40">
          <button
            onClick={() => handleNav('cai-dat')}
            className={`
              group w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-left text-sm font-medium
              ${currentView === 'cai-dat'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-md shadow-primary/10'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }
            `}
          >
            <div
              className={`
                p-1.5 rounded-lg transition-colors
                ${currentView === 'cai-dat'
                  ? 'bg-on-primary-container/10 text-on-primary-container'
                  : 'text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10'
                }
              `}
            >
              <Settings size={18} />
            </div>
            <span>Cài đặt hệ thống</span>
          </button>
        </div>
      </nav>

      {/* AI Assistant Banner */}
      <div className="p-3 m-3 rounded-2xl gradient-primary text-on-primary shadow-lg shadow-primary/15 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1 opacity-90">
            <Sparkles size={14} /> AI Copilot Sản xuất
          </div>
          <p className="text-[11px] opacity-85 leading-snug">Hệ thống đang tự động tối ưu hóa lịch bảo trì và tiêu hao năng lượng.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-outline-variant/40 text-center">
        <p className="text-[11px] font-mono text-on-surface-variant/60 uppercase tracking-widest font-semibold">
          HOA SEN ERP 2026
        </p>
      </div>
    </aside>
  )
}
