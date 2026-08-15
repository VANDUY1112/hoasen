import { useState } from 'react'
import {
  X,
  FileSpreadsheet,
  Download,
  Printer,
  Search,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react'
import {
  exportExecutiveSummary,
  exportProductionReport,
  exportInventoryReport,
  exportShiftReport,
} from '../../services/excelExport'
import { useDataContext } from '../../context/DataContext'
import { useLiveSimulation } from '../../context/LiveSimulationContext'
import { shiftPerformanceData, type ProductionLog, type InventoryItem, type ShiftPerformance } from '../../data/mockData'
import { useToast } from './Toast'

export type ReportType = 'executive' | 'production' | 'inventory' | 'shift'

interface ReportPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  initialReportType?: ReportType
}

export default function ReportPreviewModal({
  isOpen,
  onClose,
  initialReportType = 'executive',
}: ReportPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<ReportType>(initialReportType)
  const [searchQuery, setSearchQuery] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [copied, setCopied] = useState(false)

  const { inventory } = useDataContext()
  const { dailyOutput, liveOee, liveLogs } = useLiveSimulation()
  const { addToast } = useToast()

  if (!isOpen) return null

  // Report Data generators
  const executiveKpis = [
    { kpi: 'Sản lượng sản xuất trong ngày', value: `${dailyOutput.toLocaleString(undefined, { minimumFractionDigits: 2 })} Tấn`, target: '1,200.00 Tấn', rate: '107.1%', status: 'VƯỢT CHỈ TIÊU' },
    { kpi: 'Hiệu suất tổng thể thiết bị (OEE)', value: `${liveOee}%`, target: '80.0%', rate: '102.5%', status: 'ĐẠT CHUẨN' },
    { kpi: 'Tỷ lệ khả dụng thiết bị (Availability)', value: '94.2%', target: '90.0%', rate: '104.6%', status: 'XUẤT SẮC' },
    { kpi: 'Hiệu suất vận hành (Performance)', value: '88.5%', target: '85.0%', rate: '103.5%', status: 'ĐẠT CHUẨN' },
    { kpi: 'Tỷ lệ chất lượng thành phẩm (Quality)', value: '98.1%', target: '98.5%', rate: '100.8%', status: 'ĐẠT CHUẨN' },
    { kpi: 'Tổng số sự cố phát hiện (QC)', value: '14 trường hợp', target: '< 20 trường hợp', rate: '-2.4%', status: 'KIỂM SOÁT TỐT' },
    { kpi: 'Thời gian dừng máy toàn nhà máy', value: '42 phút', target: '< 60 phút', rate: '-18 phút', status: 'TRONG NGƯỠNG' },
  ]

  const filteredProductionLogs = (liveLogs || []).filter(
    (l: ProductionLog) =>
      l.coilId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.steelType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredInventoryItems = (inventory || []).filter(
    (i: InventoryItem) =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const workers = shiftPerformanceData['ca-1'] || []
  const filteredWorkers = workers.filter(
    (w: ShiftPerformance) =>
      w.worker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Handle Export Action
  const handleExport = async () => {
    setIsExporting(true)
    try {
      if (activeTab === 'executive') {
        await exportExecutiveSummary()
      } else if (activeTab === 'production') {
        await exportProductionReport(liveLogs)
      } else if (activeTab === 'inventory') {
        await exportInventoryReport(inventory)
      } else if (activeTab === 'shift') {
        await exportShiftReport('Ca 1 (06:00 - 14:00)', workers)
      }
      addToast({
        type: 'success',
        title: 'Xuất File Excel Thành Công!',
        message: 'Tệp báo cáo đã sẵn sàng và được tải về máy.',
      })
    } catch {
      addToast({
        type: 'error',
        title: 'Lỗi xuất file',
        message: 'Không thể tạo file Excel lúc này.',
      })
    } finally {
      setIsExporting(false)
    }
  }

  // Handle Copy Table Data
  const handleCopy = () => {
    let text = ''
    if (activeTab === 'executive') {
      text = executiveKpis.map((k) => `${k.kpi}\t${k.value}\t${k.target}\t${k.status}`).join('\n')
    } else if (activeTab === 'production') {
      text = filteredProductionLogs.map((l: ProductionLog) => `${l.time}\t${l.coilId}\t${l.steelType}\t${l.weight} Tấn\t${l.status}`).join('\n')
    } else if (activeTab === 'inventory') {
      text = filteredInventoryItems.map((i: InventoryItem) => `${i.code}\t${i.name}\t${i.quantity} ${i.unit}\t${i.location}\t${i.status}`).join('\n')
    } else {
      text = filteredWorkers.map((w: ShiftPerformance) => `${w.worker}\t${w.role}\t${w.output} Tấn\t${w.quality}%\t${w.status}`).join('\n')
    }
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    addToast({
      type: 'info',
      title: 'Đã sao chép dữ liệu',
      message: 'Bạn có thể dán trực tiếp vào Excel, Word hoặc Zalo.',
    })
  }

  const currentDateStr = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-scale-in">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-primary via-[#b5000b] to-[#990008] text-on-primary px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <FileSpreadsheet className="text-white" size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg leading-tight tracking-wide">
                  Xem Trước Báo Cáo Quản Trị
                </h2>
                <span className="bg-white/20 text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                  Excel Preview
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5 flex items-center gap-2">
                <span>Tập đoàn Hoa Sen</span>
                <span>•</span>
                <span className="capitalize">{currentDateStr}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
            title="Đóng"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs & Search Toolbar */}
        <div className="bg-surface-container-low border-b border-outline-variant/30 px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
          {/* Report Type Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <button
              onClick={() => { setActiveTab('executive'); setSearchQuery('') }}
              className={`cursor-pointer px-3 py-1.5 rounded-xl font-bold text-xs sm:text-[13px] whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'executive'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <Sparkles size={14} />
              <span>Báo Cáo Giám Đốc</span>
            </button>

            <button
              onClick={() => { setActiveTab('production'); setSearchQuery('') }}
              className={`cursor-pointer px-3 py-1.5 rounded-xl font-bold text-xs sm:text-[13px] whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'production'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <Layers size={14} />
              <span>Sản Lượng Cuộn Tôn</span>
            </button>

            <button
              onClick={() => { setActiveTab('inventory'); setSearchQuery('') }}
              className={`cursor-pointer px-3 py-1.5 rounded-xl font-bold text-xs sm:text-[13px] whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'inventory'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <Building2 size={14} />
              <span>Kiểm Kê Tồn Kho</span>
            </button>

            <button
              onClick={() => { setActiveTab('shift'); setSearchQuery('') }}
              className={`cursor-pointer px-3 py-1.5 rounded-xl font-bold text-xs sm:text-[13px] whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'shift'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <Calendar size={14} />
              <span>Hiệu Suất Ca Trực</span>
            </button>
          </div>

          {/* Quick Filter Search */}
          {activeTab !== 'executive' && (
            <div className="relative min-w-[200px] sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Lọc dữ liệu bảng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-surface-container-lowest border border-outline-variant/40 rounded-xl text-xs focus:outline-hidden focus:border-primary text-on-surface"
              />
            </div>
          )}
        </div>

        {/* Content: Spreadsheet Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-surface/50">
          {/* Branded Sheet Header Banner */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 sm:p-5 mb-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary font-mono text-xl">
                  HS
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-primary uppercase tracking-wide">
                    {activeTab === 'executive' && 'Báo Cáo Tổng Hợp KPI & Vận Hành Nhà Máy'}
                    {activeTab === 'production' && 'Báo Cáo Nhật Ký Sản Xuất Cuộn Tôn (Coil Logs)'}
                    {activeTab === 'inventory' && 'Báo Cáo Quản Trị Tồn Kho & Vật Tư Sản Xuất'}
                    {activeTab === 'shift' && 'Báo Cáo Đánh Giá Hiệu Suất Ca 1 (06:00 - 14:00)'}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Hệ thống hoạch định và giám sát sản xuất thông minh — Tập đoàn Hoa Sen Group
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Trạng thái: Dữ liệu thời gian thực</span>
              </div>
            </div>

            {/* Quick Metrics Bar in Preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-3.5 pt-1">
              <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20">
                <span className="text-[11px] text-on-surface-variant block font-medium">Sản lượng 24h</span>
                <span className="font-mono text-sm sm:text-base font-extrabold text-primary">
                  {dailyOutput.toLocaleString(undefined, { minimumFractionDigits: 2 })} Tấn
                </span>
              </div>
              <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20">
                <span className="text-[11px] text-on-surface-variant block font-medium">Chỉ số OEE</span>
                <span className="font-mono text-sm sm:text-base font-extrabold text-emerald-600">
                  {liveOee}%
                </span>
              </div>
              <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20">
                <span className="text-[11px] text-on-surface-variant block font-medium">Lỗi kiểm định QC</span>
                <span className="font-mono text-sm sm:text-base font-extrabold text-amber-600">
                  14 Cuộn
                </span>
              </div>
              <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20">
                <span className="text-[11px] text-on-surface-variant block font-medium">Downtime</span>
                <span className="font-mono text-sm sm:text-base font-extrabold text-emerald-600">
                  42 Phút
                </span>
              </div>
            </div>
          </div>

          {/* Table Spreadsheet Simulation */}
          <div className="border border-outline-variant/40 rounded-xl overflow-hidden shadow-xs bg-surface-container-lowest">
            <div className="overflow-x-auto">
              {/* TAB 1: BÁO CÁO GIÁM ĐỐC */}
              {activeTab === 'executive' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#b5000b] text-white font-extrabold border-b border-primary/40">
                      <th className="py-2.5 px-3 w-12 text-center border-r border-white/20">STT</th>
                      <th className="py-2.5 px-4 border-r border-white/20">Chỉ Số Hiệu Suất / KPI</th>
                      <th className="py-2.5 px-4 border-r border-white/20 text-right">Giá Trị Thực Tế</th>
                      <th className="py-2.5 px-4 border-r border-white/20 text-right">Chỉ Tiêu Định Mức</th>
                      <th className="py-2.5 px-4 border-r border-white/20 text-center">Tỷ Lệ Đạt</th>
                      <th className="py-2.5 px-4 text-center">Đánh Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {executiveKpis.map((k, index) => (
                      <tr
                        key={index}
                        className={`border-b border-outline-variant/20 transition-colors hover:bg-primary/5 ${
                          index % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/40'
                        }`}
                      >
                        <td className="py-2.5 px-3 text-center font-mono text-on-surface-variant border-r border-outline-variant/20">
                          {index + 1}
                        </td>
                        <td className="py-2.5 px-4 font-bold text-on-surface border-r border-outline-variant/20">
                          {k.kpi}
                        </td>
                        <td className="py-2.5 px-4 font-mono font-bold text-primary text-right border-r border-outline-variant/20">
                          {k.value}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-on-surface-variant text-right border-r border-outline-variant/20">
                          {k.target}
                        </td>
                        <td className="py-2.5 px-4 font-mono font-bold text-emerald-600 text-center border-r border-outline-variant/20">
                          {k.rate}
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1 font-bold text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 size={12} />
                            {k.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* TAB 2: SẢN LƯỢNG CUỘN TÔN */}
              {activeTab === 'production' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#b5000b] text-white font-extrabold border-b border-primary/40">
                      <th className="py-2.5 px-3 w-12 text-center border-r border-white/20">STT</th>
                      <th className="py-2.5 px-4 border-r border-white/20">Thời Gian</th>
                      <th className="py-2.5 px-4 border-r border-white/20">Mã Cuộn (Coil ID)</th>
                      <th className="py-2.5 px-4 border-r border-white/20">Chủng Loại Thép</th>
                      <th className="py-2.5 px-4 border-r border-white/20 text-right">Khối Lượng (Tấn)</th>
                      <th className="py-2.5 px-4 text-center">Trạng Thái QC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProductionLogs.map((log: ProductionLog, index: number) => (
                      <tr
                        key={log.coilId || index}
                        className={`border-b border-outline-variant/20 transition-colors hover:bg-primary/5 ${
                          index % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/40'
                        }`}
                      >
                        <td className="py-2 px-3 text-center font-mono text-on-surface-variant border-r border-outline-variant/20">
                          {index + 1}
                        </td>
                        <td className="py-2 px-4 font-mono text-on-surface-variant border-r border-outline-variant/20">
                          {log.time}
                        </td>
                        <td className="py-2 px-4 font-mono font-bold text-primary border-r border-outline-variant/20">
                          {log.coilId}
                        </td>
                        <td className="py-2 px-4 font-medium text-on-surface border-r border-outline-variant/20">
                          {log.steelType}
                        </td>
                        <td className="py-2 px-4 font-mono font-bold text-on-surface text-right border-r border-outline-variant/20">
                          {log.weight.toFixed(2)}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {log.status === 'passed' ? (
                            <span className="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 size={11} /> ĐẠT CHUẨN
                            </span>
                          ) : log.status === 'failed' ? (
                            <span className="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                              <AlertTriangle size={11} /> LỖI BỀ MẶT
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                              CHỜ KIỂM ĐỊNH
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* TAB 3: TỒN KHO VẬT TƯ */}
              {activeTab === 'inventory' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#b5000b] text-white font-extrabold border-b border-primary/40">
                      <th className="py-2.5 px-3 w-12 text-center border-r border-white/20">STT</th>
                      <th className="py-2.5 px-4 border-r border-white/20">Mã Vật Tư</th>
                      <th className="py-2.5 px-4 border-r border-white/20">Tên Hàng Hóa / Vật Tư</th>
                      <th className="py-2.5 px-4 border-r border-white/20">Phân Loại</th>
                      <th className="py-2.5 px-4 border-r border-white/20 text-right">Số Lượng</th>
                      <th className="py-2.5 px-4 border-r border-white/20">Đơn Vị</th>
                      <th className="py-2.5 px-4 border-r border-white/20">Vị Trí Kho</th>
                      <th className="py-2.5 px-4 text-center">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventoryItems.map((item: InventoryItem, index: number) => (
                      <tr
                        key={item.code || index}
                        className={`border-b border-outline-variant/20 transition-colors hover:bg-primary/5 ${
                          index % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/40'
                        }`}
                      >
                        <td className="py-2 px-3 text-center font-mono text-on-surface-variant border-r border-outline-variant/20">
                          {index + 1}
                        </td>
                        <td className="py-2 px-4 font-mono font-bold text-primary border-r border-outline-variant/20">
                          {item.code}
                        </td>
                        <td className="py-2 px-4 font-bold text-on-surface border-r border-outline-variant/20">
                          {item.name}
                        </td>
                        <td className="py-2 px-4 text-on-surface-variant border-r border-outline-variant/20">
                          {item.type}
                        </td>
                        <td className="py-2 px-4 font-mono font-bold text-on-surface text-right border-r border-outline-variant/20">
                          {item.quantity.toLocaleString()}
                        </td>
                        <td className="py-2 px-4 text-on-surface-variant border-r border-outline-variant/20">
                          {item.unit}
                        </td>
                        <td className="py-2 px-4 font-mono text-on-surface-variant border-r border-outline-variant/20">
                          {item.location}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {item.status === 'sufficient' ? (
                            <span className="font-bold text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                              ĐỦ TỒN KHO
                            </span>
                          ) : item.status === 'critical' ? (
                            <span className="font-bold text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                              ĐẶT HÀNG GẤP
                            </span>
                          ) : (
                            <span className="font-bold text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                              SẮP HẾT
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* TAB 4: HIỆU SUẤT CA TRỰC */}
              {activeTab === 'shift' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#b5000b] text-white font-extrabold border-b border-primary/40">
                      <th className="py-2.5 px-3 w-12 text-center border-r border-white/20">STT</th>
                      <th className="py-2.5 px-4 border-r border-white/20">Họ Và Tên Công Nhân</th>
                      <th className="py-2.5 px-4 border-r border-white/20">Vị Trí / Vai Trò</th>
                      <th className="py-2.5 px-4 border-r border-white/20 text-right">Sản Lượng (Tấn)</th>
                      <th className="py-2.5 px-4 border-r border-white/20 text-right">Mục Tiêu (Tấn)</th>
                      <th className="py-2.5 px-4 border-r border-white/20 text-center">Tỷ Lệ Chất Lượng</th>
                      <th className="py-2.5 px-4 text-center">Xếp Loại</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWorkers.map((w: ShiftPerformance, index: number) => (
                      <tr
                        key={index}
                        className={`border-b border-outline-variant/20 transition-colors hover:bg-primary/5 ${
                          index % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/40'
                        }`}
                      >
                        <td className="py-2 px-3 text-center font-mono text-on-surface-variant border-r border-outline-variant/20">
                          {index + 1}
                        </td>
                        <td className="py-2 px-4 font-bold text-on-surface border-r border-outline-variant/20">
                          {w.worker}
                        </td>
                        <td className="py-2 px-4 text-on-surface-variant border-r border-outline-variant/20">
                          {w.role}
                        </td>
                        <td className="py-2 px-4 font-mono font-bold text-primary text-right border-r border-outline-variant/20">
                          {w.output.toLocaleString()}
                        </td>
                        <td className="py-2 px-4 font-mono text-on-surface-variant text-right border-r border-outline-variant/20">
                          {w.target.toLocaleString()}
                        </td>
                        <td className="py-2 px-4 font-mono font-bold text-emerald-600 text-center border-r border-outline-variant/20">
                          {w.quality}%
                        </td>
                        <td className="py-2 px-4 text-center">
                          <span
                            className={`font-bold text-[10px] px-2 py-0.5 rounded-full border ${
                              w.status === 'excellent'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : w.status === 'good'
                                ? 'bg-blue-100 text-blue-800 border-blue-300'
                                : 'bg-amber-100 text-amber-800 border-amber-300'
                            }`}
                          >
                            {w.status === 'excellent' ? 'XUẤT SẮC' : w.status === 'good' ? 'HOÀN THÀNH' : 'CẦN CẢI THIỆN'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-surface-container-lowest border-t border-outline-variant/30 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-on-surface-variant flex items-center gap-2">
            <span className="font-semibold text-on-surface">Định dạng xuất:</span>
            <span className="font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">
              Microsoft Excel (.xlsx)
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopy}
              className="cursor-pointer px-3.5 py-2 rounded-xl border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container font-bold text-xs flex items-center gap-1.5 text-on-surface transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="cursor-pointer px-3.5 py-2 rounded-xl border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container font-bold text-xs flex items-center gap-1.5 text-on-surface transition-colors"
            >
              <Printer size={14} />
              <span>In PDF</span>
            </button>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="cursor-pointer flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-[#b5000b] hover:bg-[#990008] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
            >
              <Download size={16} />
              <span>{isExporting ? 'Đang tạo Excel...' : 'Tải File Excel (.xlsx)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
