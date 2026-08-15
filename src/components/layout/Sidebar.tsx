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
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  currentView: string
  onNavigate: (view: string) => void
}

const navItems = [
  { path: 'tong-quan', label: 'Tổng quan', icon: LayoutDashboard },
  { path: 'san-luong', label: 'Sản lượng', icon: Factory },
  { path: 'quan-ly-loi', label: 'Quản lý Lỗi', icon: AlertTriangle },
  { path: 'thoi-gian-dung-may', label: 'Thời gian Dừng máy', icon: PauseCircle },
  { path: 'quan-ly-ton-kho', label: 'Quản lý Tồn kho', icon: Warehouse },
  { path: 'quan-ly-dinh-muc', label: 'Quản lý Định mức', icon: BarChart3 },
  { path: 'du-bao-bao-tri', label: 'Dự báo Bảo trì', icon: Wrench },
  { path: 'hieu-suat-ca-truc', label: 'Hiệu suất Ca trực', icon: Users },
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
        fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50
        flex flex-col border-r border-outline-variant
        transform transition-transform duration-300 ease-in-out
        shadow-2xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 gradient-primary" />

      {/* Logo Section */}
      <div className="p-4 flex items-center justify-between mb-2">
        <div className="flex items-center gap-3 py-1">
          <img
            alt="Hoa Sen Group Logo"
            className="h-11 w-11 object-cover rounded-lg shadow-sm border border-outline-variant/30"
            src="/logo.jpg"
          />
          <div className="flex flex-col justify-center">
            <span className="font-bold text-base text-primary tracking-wide leading-tight uppercase">
              Hoa Sen Group
            </span>
            <span className="text-[13px] font-semibold text-on-surface-variant/80 tracking-wider uppercase">
              Quản trị sản xuất
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-on-surface-variant hover:text-primary p-1 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-4 space-y-1">
        {navItems.map((item) => {
          const isActive = currentView === item.path
          const Icon = item.icon
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`
                nav-item w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-left
                ${isActive
                  ? 'active bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }
              `}
            >
              <Icon size={20} className="mr-3 shrink-0" />
              <span className="text-[15px]">{item.label}</span>
            </button>
          )
        })}

        {/* Divider + Settings */}
        <div className="pt-4 mt-4 border-t border-outline-variant">
          <button
            onClick={() => handleNav('cai-dat')}
            className={`
              nav-item w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-left
              ${currentView === 'cai-dat'
                ? 'active bg-primary-container text-on-primary-container font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }
            `}
          >
            <Settings size={20} className="mr-3 shrink-0" />
            <span className="text-[15px]">Cài đặt</span>
          </button>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-outline-variant/50">
        <p className="text-[11px] text-on-surface-variant/50 text-center tracking-wider uppercase">
          v2.0 · React + TypeScript
        </p>
      </div>
    </aside>
  )
}
