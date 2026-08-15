import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  LayoutDashboard,
  Factory,
  AlertTriangle,
  PauseCircle,
  Warehouse,
  BarChart3,
  Wrench,
  Users,
  Settings,
  PlusCircle,
  Printer,
  FileSpreadsheet,
  Zap,
  Package,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { useLiveSimulation } from '../../context/LiveSimulationContext'
import { useDataContext } from '../../context/DataContext'
import { exportComprehensiveReport } from '../../services/excelExport'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onOpenPrintModal?: (data: any) => void
}

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  category: 'Trang' | 'Tồn kho' | 'Hành động' | 'Bảo trì'
  icon: React.ElementType
  action: () => void
  badge?: string
}

export default function CommandPalette({ isOpen, onClose, onOpenPrintModal }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { toggleSimulation, isSimulating } = useLiveSimulation()
  const { inventory, tickets } = useDataContext()

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Build command items
  const pages: CommandItem[] = [
    {
      id: 'p-tong-quan',
      title: 'Tổng quan vận hành',
      subtitle: 'Xem OEE, sản lượng Live, cảnh báo nhà máy',
      category: 'Trang',
      icon: LayoutDashboard,
      action: () => navigate('/tong-quan'),
    },
    {
      id: 'p-san-luong',
      title: 'Sản lượng chi tiết',
      subtitle: 'Theo dõi từng cuộn thép, tốc độ máy và sản lượng',
      category: 'Trang',
      icon: Factory,
      action: () => navigate('/san-luong'),
    },
    {
      id: 'p-quan-ly-loi',
      title: 'Quản lý chất lượng & Lỗi',
      subtitle: 'Biểu đồ Pareto lỗi bề mặt, rỗ khí, gợn sóng',
      category: 'Trang',
      icon: AlertTriangle,
      action: () => navigate('/quan-ly-loi'),
    },
    {
      id: 'p-thoi-gian-dung-may',
      title: 'Thời gian Dừng máy (Downtime)',
      subtitle: 'Phân tích nguyên nhân dừng máy và thời gian khắc phục',
      category: 'Trang',
      icon: PauseCircle,
      action: () => navigate('/thoi-gian-dung-may'),
    },
    {
      id: 'p-quan-ly-ton-kho',
      title: 'Quản lý Tồn kho',
      subtitle: 'Tra cứu cuộn thành phẩm, phôi cán nóng, phụ tùng',
      category: 'Trang',
      icon: Warehouse,
      action: () => navigate('/quan-ly-ton-kho'),
    },
    {
      id: 'p-nhap-kho-thanh-pham',
      title: 'Nhập kho Thành phẩm',
      subtitle: 'Console nhập cuộn tôn mới vào ERP và in tem',
      category: 'Trang',
      icon: PlusCircle,
      action: () => navigate('/nhap-kho-thanh-pham'),
    },
    {
      id: 'p-quan-ly-dinh-muc',
      title: 'Quản lý Định mức & KPI',
      subtitle: 'Chỉ tiêu sản xuất, benchmark dây chuyền',
      category: 'Trang',
      icon: BarChart3,
      action: () => navigate('/quan-ly-dinh-muc'),
    },
    {
      id: 'p-du-bao-bao-tri',
      title: 'Dự báo Bảo trì (AI Predictive)',
      subtitle: 'Dự báo rung chấn ổ trục, độ hao mòn thiết bị',
      category: 'Trang',
      icon: Wrench,
      action: () => navigate('/du-bao-bao-tri'),
    },
    {
      id: 'p-hieu-suat-ca-truc',
      title: 'Hiệu suất Ca trực',
      subtitle: 'Đánh giá năng suất công nhân ca 1, ca 2, ca 3',
      category: 'Trang',
      icon: Users,
      action: () => navigate('/hieu-suat-ca-truc'),
    },
    {
      id: 'p-lap-phieu-sua-chua',
      title: 'Lập Phiếu Sửa Chữa',
      subtitle: 'Tạo ticket bảo trì gửi tổ cơ điện',
      category: 'Trang',
      icon: PlusCircle,
      action: () => navigate('/lap-phieu-sua-chua'),
    },
    {
      id: 'p-cai-dat',
      title: 'Cài đặt hệ thống',
      subtitle: 'Cấu hình ngưỡng SCADA, email, phân quyền',
      category: 'Trang',
      icon: Settings,
      action: () => navigate('/cai-dat'),
    },
  ]

  const actions: CommandItem[] = [
    {
      id: 'act-excel',
      title: 'Xuất toàn bộ báo cáo Excel Giám Đốc',
      subtitle: 'Tải bộ báo cáo tổng hợp SCADA & Sản lượng 2026',
      category: 'Hành động',
      icon: FileSpreadsheet,
      action: () => exportComprehensiveReport(),
      badge: 'Excel (.xlsx)',
    },
    {
      id: 'act-toggle-sim',
      title: isSimulating ? 'Tạm dừng SCADA Simulation' : 'Bật SCADA Simulation Realtime',
      subtitle: 'Bật/tắt mô phỏng dữ liệu tốc độ và sản lượng',
      category: 'Hành động',
      icon: Zap,
      action: () => toggleSimulation(),
      badge: isSimulating ? 'Đang chạy' : 'Đã dừng',
    },
    {
      id: 'act-new-ticket',
      title: 'Tạo phiếu sửa chữa nhanh',
      subtitle: 'Chuyển đến form lập phiếu bảo trì thiết bị',
      category: 'Hành động',
      icon: Wrench,
      action: () => navigate('/lap-phieu-sua-chua'),
    },
  ]

  const inventoryCommands: CommandItem[] = inventory.slice(0, 8).map((item) => ({
    id: `inv-${item.code}`,
    title: `${item.code} - ${item.name}`,
    subtitle: `Kho: ${item.location} • Số lượng: ${item.quantity} ${item.unit} • Loại: ${item.type}`,
    category: 'Tồn kho',
    icon: Package,
    action: () => navigate('/quan-ly-ton-kho'),
    badge: `${item.quantity} ${item.unit}`,
  }))

  const allItems = [...actions, ...pages, ...inventoryCommands]

  const filteredItems = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action()
        onClose()
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl border border-outline-variant/60 overflow-hidden flex flex-col max-h-[75vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-outline-variant/40 flex items-center gap-3 bg-surface-container-low/40">
          <Search size={22} className="text-primary shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm trang, cuộn tôn, máy móc, xuất excel, in phiếu... (Gõ để tìm)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-on-surface font-sans text-base font-semibold placeholder:text-on-surface-variant/60 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="cursor-pointer text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container"
            >
              <X size={18} />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-surface-container-highest border border-outline-variant/40 text-[11px] font-mono font-bold text-on-surface-variant">
            ESC để đóng
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-outline-variant/20">
          {filteredItems.length === 0 ? (
            <div className="p-10 text-center text-on-surface-variant">
              <p className="font-semibold text-base">Không tìm thấy kết quả phù hợp cho "{query}"</p>
              <p className="text-xs font-mono mt-1">Thử tìm "Tôn mạ", "Bảo trì", "Excel", "Line 01", "Dừng máy"...</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action()
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`
                    cursor-pointer p-3 rounded-xl flex items-center justify-between transition-all duration-150 group
                    ${isSelected ? 'bg-primary-container text-on-primary-container font-medium' : 'hover:bg-surface-container text-on-surface'}
                  `}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`
                        p-2 rounded-xl shrink-0 transition-colors
                        ${isSelected ? 'bg-on-primary-container/10 text-on-primary-container' : 'bg-primary/10 text-primary'}
                      `}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="truncate">
                      <p className={`text-sm font-bold truncate ${isSelected ? 'text-on-primary-container' : 'text-on-surface'}`}>
                        {item.title}
                      </p>
                      {item.subtitle && (
                        <p
                          className={`text-xs truncate font-mono ${
                            isSelected ? 'text-on-primary-container/80' : 'text-on-surface-variant'
                          }`}
                        >
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {item.badge && (
                      <span
                        className={`
                          text-xs font-mono px-2 py-0.5 rounded font-bold
                          ${isSelected ? 'bg-on-primary-container text-primary-container' : 'bg-surface-container-high text-on-surface-variant'}
                        `}
                      >
                        {item.badge}
                      </span>
                    )}
                    <span
                      className={`
                        text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold
                        ${isSelected ? 'bg-on-primary-container/20 text-on-primary-container' : 'bg-surface-container text-on-surface-variant'}
                      `}
                    >
                      {item.category}
                    </span>
                    <ArrowRight
                      size={16}
                      className={`transition-transform duration-200 ${isSelected ? 'translate-x-1 opacity-100' : 'opacity-0'}`}
                    />
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-surface-container-low/60 border-t border-outline-variant/30 flex items-center justify-between text-xs font-mono text-on-surface-variant">
          <div className="flex items-center gap-4">
            <span>↑↓ để chọn</span>
            <span>↵ để mở</span>
            <span>ESC để thoát</span>
          </div>
          <div className="flex items-center gap-1 text-primary font-bold">
            <Sparkles size={14} /> Hoa Sen Spotlight Search
          </div>
        </div>
      </div>
    </div>
  )
}
