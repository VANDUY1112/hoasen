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
  PackagePlus,
  Target,
  FileText,
  Globe,
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
  { path: 'tong-quan', label: 'TỔNG QUAN', icon: LayoutDashboard },
  { path: 'san-luong', label: 'Sản lượng', icon: Factory, badge: 'Live', badgeVariant: 'primary' },
  { path: 'quan-ly-loi', label: 'Quản lý Lỗi', icon: AlertTriangle, badge: '14 lỗi', badgeVariant: 'error' },
  { path: 'thoi-gian-dung-may', label: 'Thời gian Dừng máy', icon: PauseCircle, badge: '42m', badgeVariant: 'warning' },
  { path: 'quan-ly-ton-kho', label: 'Quản lý Tồn kho', icon: Warehouse },
  { path: 'quan-ly-dinh-muc', label: 'Quản lý Định mức', icon: BarChart3 },
  { path: 'du-bao-bao-tri', label: 'Dự báo Bảo trì', icon: Wrench, badge: '07 vụ', badgeVariant: 'error' },
  { path: 'hieu-suat-ca-truc', label: 'Hiệu suất Ca trực', icon: Users, badge: 'Ca 1', badgeVariant: 'neutral' },
]

const operationalItems: NavItemConfig[] = [
  { path: 'nhap-kho-thanh-pham', label: 'Nhập kho Thành phẩm', icon: PackagePlus },
  { path: 'thiet-lap-muc-tieu-ca-truc', label: 'Thiết lập Mục tiêu Ca', icon: Target },
  { path: 'lap-phieu-sua-chua', label: 'Lập Phiếu Sửa chữa', icon: FileText },
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
        fixed left-0 top-0 h-screen w-72 lg:w-80 max-w-[85vw] bg-surface-container-lowest z-[60]
        flex flex-col border-r border-outline-variant/50
        transform transition-transform duration-300 ease-in-out
        shadow-2xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 gradient-primary" />

      {/* Logo Section */}
      <div className="p-3.5 lg:p-5 flex items-center border-b border-outline-variant/30">
        <div className="flex items-center gap-3 py-0.5 lg:py-1">
          <div className="relative">
            <img
              alt="Hoa Sen Group Logo"
              className="h-10 w-10 lg:h-12 lg:w-12 object-cover rounded-xl shadow-xs border border-outline-variant/40"
              src="/logo.jpg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-base lg:text-lg text-primary tracking-tight leading-none uppercase">
              Hoa Sen Group
            </span>
            <span className="text-[10px] lg:text-xs font-bold text-on-surface-variant/80 tracking-wide uppercase mt-1">
              Quản trị sản xuất
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2.5 lg:px-4 space-y-1 lg:space-y-1.5 overflow-y-auto pt-3 pb-6">
        {navItems.map((item) => {
          const isActive = currentView === item.path
          const Icon = item.icon
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`
                cursor-pointer group w-full flex items-center justify-between px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all duration-200 text-left text-xs sm:text-sm lg:text-base font-semibold lg:font-extrabold
                ${isActive
                  ? 'bg-primary text-on-primary shadow-sm shadow-primary/20 scale-[1.01]'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }
              `}
            >
              <div className="flex items-center gap-3 lg:gap-3.5 truncate">
                <div
                  className={`
                    p-1.5 rounded-lg transition-colors
                    ${isActive
                      ? 'bg-on-primary/20 text-on-primary'
                      : 'text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`
                    font-sans text-[10px] lg:text-xs px-2 py-0.5 lg:px-3 lg:py-1 rounded-full font-bold transition-transform group-hover:scale-105
                    ${isActive
                      ? 'bg-on-primary text-primary'
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

        {/* Operational Console Section */}
        <div className="pt-2 lg:pt-3 mt-2 lg:mt-3 border-t border-outline-variant/30">
          <div className="space-y-1 lg:space-y-1.5">
            {operationalItems.map((item) => {
              const isActive = currentView === item.path
              const Icon = item.icon
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`
                    cursor-pointer group w-full flex items-center justify-between px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all duration-200 text-left text-xs sm:text-sm lg:text-base font-semibold lg:font-extrabold
                    ${isActive
                      ? 'bg-primary text-on-primary shadow-sm shadow-primary/20 scale-[1.01]'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }
                  `}
                >
                  <div className="flex items-center gap-3 lg:gap-3.5 truncate">
                    <div
                      className={`
                        p-1.5 rounded-lg transition-colors
                        ${isActive
                          ? 'bg-on-primary/20 text-on-primary'
                          : 'text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    <span className="truncate">{item.label}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Divider + Landing Page & Settings */}
        <div className="pt-2 lg:pt-3 mt-2 lg:mt-3 border-t border-outline-variant/30 space-y-1 lg:space-y-1.5">
          <button
            onClick={() => handleNav('landing')}
            className="cursor-pointer group w-full flex items-center gap-3 lg:gap-3.5 px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all duration-200 text-left text-xs sm:text-sm lg:text-base font-semibold lg:font-extrabold text-on-surface-variant hover:bg-surface-container hover:text-primary"
          >
            <div className="p-1.5 rounded-lg text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors">
              <Globe className="w-4 h-4 lg:w-5 lg:h-5" />
            </div>
            <span>Trang chủ giới thiệu</span>
          </button>

          <button
            onClick={() => handleNav('cai-dat')}
            className={`
              cursor-pointer group w-full flex items-center gap-3 lg:gap-3.5 px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all duration-200 text-left text-xs sm:text-sm lg:text-base font-semibold lg:font-extrabold
              ${currentView === 'cai-dat'
                ? 'bg-primary text-on-primary shadow-sm shadow-primary/20 scale-[1.01]'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }
            `}
          >
            <div
              className={`
                p-1.5 rounded-lg transition-colors
                ${currentView === 'cai-dat'
                  ? 'bg-on-primary/20 text-on-primary'
                  : 'text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10'
                }
              `}
            >
              <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
            </div>
            <span>Cài đặt hệ thống</span>
          </button>
        </div>
      </nav>
    </aside>
  )
}
