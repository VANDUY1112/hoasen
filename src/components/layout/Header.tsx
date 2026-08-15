import { useState, useRef, useEffect } from 'react'
import {
  Menu,
  Bell,
  Factory,
  Check,
  Clock,
  ChevronDown,
  User,
  Shield,
  LogOut,
  AlertTriangle,
  Info,
  Sparkles,
  Play,
  Pause,
  Zap,
  Search,
} from 'lucide-react'
import { useLiveSimulation } from '../../context/LiveSimulationContext'
import { decorativeImages } from '../../data/mockData'
import CommandPalette from '../ui/CommandPalette'
import ProfileModal from '../ui/ProfileModal'
import { useToast } from '../ui/Toast'

interface HeaderProps {
  subtitle: string
  title?: string
  onMenuClick: () => void
}

interface NotificationItem {
  id: string
  title: string
  desc: string
  time: string
  type: 'critical' | 'warning' | 'info'
  read: boolean
}

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Cảnh báo rung chấn Line 01',
    desc: 'Ổ đỡ trục cán chính phát hiện độ rung vượt ngưỡng 12%',
    time: '2 phút trước',
    type: 'critical',
    read: false,
  },
  {
    id: '2',
    title: 'Mục tiêu Ca 1 hoàn thành 92%',
    desc: 'Dây chuyền Cán nguội 01 đạt 1,104/1,200 Tấn',
    time: '25 phút trước',
    type: 'info',
    read: false,
  },
  {
    id: '3',
    title: 'Tồn kho Vòng bi SKF sắp hết',
    desc: 'Còn 4 cái tại Kho Phụ tùng (mức tối thiểu: 10 cái)',
    time: '1 giờ trước',
    type: 'warning',
    read: true,
  },
]

export default function Header({ subtitle, onMenuClick }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [currentTime, setCurrentTime] = useState('')

  const { isSimulating, toggleSimulation, speedMpm } = useLiveSimulation()
  const { addToast } = useToast()

  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('vi-VN', { hour12: false }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <>
      <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 glass z-30 flex items-center justify-between px-4 lg:px-6 transition-all duration-300 border-b border-outline-variant/50">
        {/* Left: View Title & Live Telemetry Controls */}
        <div className="flex items-center gap-2 lg:gap-3.5">
          <button
            onClick={onMenuClick}
            className="cursor-pointer lg:hidden p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-xl transition-colors flex items-center"
            title="Mở Menu"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-surface-container/60 border border-outline-variant/30">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <Factory size={18} />
            </div>
            <span className="font-mono text-sm sm:text-base uppercase tracking-wider text-on-surface-variant truncate max-w-[160px] sm:max-w-none font-bold">
              {subtitle}
            </span>
          </div>

          {/* Live SCADA Simulation Toggle */}
          <button
            onClick={toggleSimulation}
            className={`
              cursor-pointer hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-mono font-bold transition-all duration-200 shadow-xs
              ${isSimulating
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 hover:bg-emerald-500/20'
                : 'bg-surface-container border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-high'
              }
            `}
            title="Bật/Tắt mô phỏng dữ liệu SCADA thời gian thực"
          >
            <span className="relative flex h-2.5 w-2.5">
              {isSimulating && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              )}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isSimulating ? 'bg-emerald-500' : 'bg-on-surface-variant/50'}`} />
            </span>
            <span>{isSimulating ? 'SCADA LIVE' : 'TẠM DỪNG'}</span>
            {isSimulating ? <Pause size={14} className="opacity-70" /> : <Play size={14} className="opacity-70" />}
          </button>

          {/* Realtime Speed Pill */}
          {isSimulating && (
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 text-primary font-mono text-xs sm:text-sm font-extrabold border border-primary/20 animate-fade-in">
              <Zap size={15} />
              <span>{speedMpm} m/phút</span>
            </div>
          )}
        </div>

        {/* Right: Search Spotlight + Clock + Notifications + Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Spotlight Search Trigger (Ctrl+K) */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="cursor-pointer flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-surface-container/70 border border-outline-variant/50 hover:border-primary/40 hover:bg-surface-container transition-all text-on-surface-variant hover:text-on-surface"
            title="Tìm kiếm nhanh toàn hệ thống (Ctrl + K)"
          >
            <Search size={16} className="text-primary" />
            <span className="hidden md:inline text-xs font-semibold text-on-surface-variant">Tìm nhanh...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-container-highest text-[10px] font-mono font-bold border border-outline-variant/40 text-on-surface-variant">
              Ctrl K
            </kbd>
          </button>

          {/* Real-time Clock */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/40 font-mono text-xs sm:text-sm font-bold text-on-surface shadow-xs">
            <Clock size={15} className="text-primary" />
            <span>{currentTime}</span>
          </div>

          {/* Notifications Popover */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className={`
                cursor-pointer relative p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center
                ${notifOpen
                  ? 'bg-primary-container text-on-primary-container shadow-md shadow-primary/15'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                }
              `}
              title="Thông báo hệ thống"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-surface-container-lowest/98 backdrop-blur-2xl border border-outline-variant/80 shadow-2xl shadow-black/10 py-3 animate-scale-in z-50">
                <div className="flex items-center justify-between px-4 pb-3 border-b border-outline-variant/50">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm sm:text-base text-on-surface">Thông báo hệ thống</span>
                    {unreadCount > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold">
                        {unreadCount} mới
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="cursor-pointer text-xs text-primary hover:underline font-semibold flex items-center gap-1"
                    >
                      <Check size={14} /> Đánh dấu đã đọc
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-outline-variant/30">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`
                        p-3.5 hover:bg-surface-container transition-colors flex gap-3 cursor-pointer
                        ${!n.read ? 'bg-primary/5' : ''}
                      `}
                    >
                      <div className="shrink-0 mt-0.5">
                        {n.type === 'critical' ? (
                          <div className="p-2 rounded-xl bg-error/10 text-error">
                            <AlertTriangle size={18} />
                          </div>
                        ) : n.type === 'warning' ? (
                          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                            <Clock size={18} />
                          </div>
                        ) : (
                          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600">
                            <Info size={18} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <p className="text-sm font-bold text-on-surface truncate">{n.title}</p>
                          <span className="font-mono text-xs text-on-surface-variant/70 shrink-0">{n.time}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 mt-0.5 leading-snug">{n.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2.5 px-3 text-center border-t border-outline-variant/40">
                  <button className="cursor-pointer w-full py-2 text-xs sm:text-sm font-bold text-primary hover:bg-surface-container rounded-xl transition-colors">
                    Xem tất cả thông báo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`
                cursor-pointer flex items-center gap-2.5 p-1 sm:pl-3 sm:pr-2.5 sm:py-1.5 rounded-2xl transition-all duration-200 border
                ${profileOpen
                  ? 'border-primary ring-2 ring-primary/15 bg-surface-container-low shadow-sm'
                  : 'border-outline-variant/40 hover:border-primary/40 hover:bg-surface-container-high/60'
                }
              `}
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-extrabold text-on-surface leading-tight">Admin User</p>
                <p className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold">
                  Plant Manager
                </p>
              </div>
              <img
                alt="Profile"
                className="w-9 h-9 rounded-xl object-cover border border-outline-variant/60 shadow-xs"
                src={decorativeImages.profile}
              />
              <ChevronDown
                size={16}
                className={`text-on-surface-variant transition-transform duration-200 hidden sm:block ${
                  profileOpen ? 'rotate-180 text-primary' : ''
                }`}
              />
            </button>

            {/* Profile Menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-68 rounded-2xl bg-surface-container-lowest/98 backdrop-blur-2xl border border-outline-variant/80 shadow-2xl shadow-black/10 p-2.5 animate-scale-in z-50">
                <div className="p-3 border-b border-outline-variant/40 mb-1">
                  <div className="flex items-center gap-3">
                    <img
                      alt="Profile"
                      className="w-11 h-11 rounded-xl object-cover border border-outline-variant"
                      src={decorativeImages.profile}
                    />
                    <div>
                      <p className="text-base font-extrabold text-on-surface">Võ Văn Duy</p>
                      <p className="text-xs font-medium text-on-surface-variant">Giám đốc Nhà máy</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-surface-container text-xs font-mono">
                    <span className="text-on-surface-variant font-medium">Khu vực:</span>
                    <span className="font-extrabold text-primary">Nhà máy Phú Mỹ</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setProfileOpen(false)
                      setProfileModalOpen(true)
                    }}
                    className="cursor-pointer w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold text-on-surface hover:bg-surface-container hover:text-primary rounded-xl transition-colors"
                  >
                    <User size={16} /> Hồ sơ cá nhân
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false)
                      setProfileModalOpen(true)
                    }}
                    className="cursor-pointer w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold text-on-surface hover:bg-surface-container hover:text-primary rounded-xl transition-colors"
                  >
                    <Shield size={16} /> Phân quyền bảo mật
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false)
                      addToast('info', 'Trợ lý AI Hoa Sen', 'Đang kết nối mô hình Gemini 2.0 Flash để phân tích telemetry nhà máy...')
                    }}
                    className="cursor-pointer w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold text-on-surface hover:bg-surface-container hover:text-primary rounded-xl transition-colors"
                  >
                    <Sparkles size={16} /> Trợ lý AI Sản xuất
                  </button>
                </div>

                <div className="border-t border-outline-variant/40 mt-1.5 pt-1.5">
                  <button
                    onClick={() => {
                      setProfileOpen(false)
                      addToast('info', 'Đăng xuất hệ thống', 'Phiên làm việc đã kết thúc an toàn. Tự động chuyển về trang đăng nhập.')
                    }}
                    className="cursor-pointer w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-bold text-error hover:bg-error/10 rounded-xl transition-colors"
                  >
                    <LogOut size={16} /> Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />

      {/* Profile & Account Management Modal */}
      <ProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </>
  )
}


