import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, Award, CheckCircle2, FileSpreadsheet, Printer } from 'lucide-react'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import { useToast } from '../components/ui/Toast'
import { exportShiftReport } from '../services/excelExport'
import { useDataContext } from '../context/DataContext'
import PrintModal, { PrintDocumentData } from '../components/ui/PrintModal'

const shifts = [
  { id: 'ca-1', label: 'Ca 1', time: '06:00 - 14:00', chief: 'Nguyễn Văn An' },
  { id: 'ca-2', label: 'Ca 2', time: '14:00 - 22:00', chief: 'Võ Thanh Tùng' },
  { id: 'ca-3', label: 'Ca 3', time: '22:00 - 06:00', chief: 'Huỳnh Tấn Phát' },
]

export default function HieuSuatCaTruc() {
  const [activeShift, setActiveShift] = useState('ca-1')
  const [exporting, setExporting] = useState(false)
  const navigate = useNavigate()
  const { shiftData } = useDataContext()
  const { addToast } = useToast()
  const [printData, setPrintData] = useState<PrintDocumentData | null>(null)
  const [printOpen, setPrintOpen] = useState(false)

  const data = shiftData[activeShift] || []

  const totalOutput = data.reduce((sum, d) => sum + d.output, 0)
  const totalTarget = data.reduce((sum, d) => sum + d.target, 0)
  const avgQuality = data.length ? (data.reduce((sum, d) => sum + d.quality, 0) / data.length).toFixed(1) : '0'

  const activeShiftObj = shifts.find((s) => s.id === activeShift)

  const handleExportShiftExcel = async () => {
    try {
      setExporting(true)
      addToast('info', `Đang tạo Báo cáo Hiệu suất ${activeShiftObj?.label}...`, 'Định dạng bảng đánh giá công nhân và chỉ tiêu...')
      await exportShiftReport(activeShiftObj?.label || 'Ca 1', data)
      addToast('success', 'Xuất Báo Cáo Ca Thành Công!', 'Tệp Excel đã sẵn sàng.')
    } catch {
      addToast('error', 'Lỗi xuất file', 'Không thể tạo file Excel.')
    } finally {
      setExporting(false)
    }
  }

  const handleOpenPrintReport = () => {
    setPrintData({
      type: 'bao-cao-ca',
      title: `BÁO CÁO TỔNG HỢP HIỆU SUẤT ${activeShiftObj?.label.toUpperCase()}`,
      code: `RPT-${activeShift.toUpperCase()}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`,
      date: new Date().toLocaleDateString('vi-VN'),
      author: `${activeShiftObj?.chief} (Trưởng ca)`,
      notes: `Toàn bộ ${data.length} nhân sự ca trực có mặt đầy đủ. Dây chuyền vận hành ổn định đạt ${((totalOutput / (totalTarget || 1)) * 100).toFixed(1)}% định mức giao ca.`,
      details: [
        { label: 'Ca trực vận hành', value: `${activeShiftObj?.label} (${activeShiftObj?.time})`, highlight: true },
        { label: 'Trưởng ca phụ trách', value: activeShiftObj?.chief || '' },
        { label: 'Tổng sản lượng thực tế', value: `${totalOutput.toLocaleString()} Tấn (Chỉ tiêu: ${totalTarget.toLocaleString()} T)`, highlight: true },
        { label: 'Tỷ lệ hoàn thành định mức', value: `${((totalOutput / (totalTarget || 1)) * 100).toFixed(1)}%` },
        { label: 'Chất lượng trung bình (Yield)', value: `${avgQuality}%` },
        { label: 'Quân số vận hành', value: `${data.length} Công nhân (100% có mặt)` },
      ],
    })
    setPrintOpen(true)
  }

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6 lg:py-8 gap-5 sm:gap-6 lg:gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-5">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
            Hiệu suất &amp; Năng suất Ca trực
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-on-surface-variant/80 max-w-3xl leading-relaxed font-medium">
            Theo dõi sản lượng đầu ca, tỷ lệ chất lượng sản phẩm và đánh giá năng lực công nhân vận hành máy.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleExportShiftExcel}
            disabled={exporting}
            className="cursor-pointer px-5 sm:px-6 py-3 rounded-xl font-bold bg-surface-container-lowest text-on-surface border border-outline-variant/40 hover:bg-surface-container transition-all shadow-2xs flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base uppercase font-mono tracking-wider"
          >
            <FileSpreadsheet size={18} className={`text-primary shrink-0 ${exporting ? 'animate-spin' : ''}`} />
            <span className="truncate">{exporting ? 'Đang tạo...' : 'Xuất Excel'}</span>
          </button>
          <button
            onClick={handleOpenPrintReport}
            className="cursor-pointer bg-surface-container-lowest text-on-surface border border-outline-variant/40 hover:bg-surface-container px-5 sm:px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-2xs text-xs sm:text-sm lg:text-base uppercase font-mono tracking-wider"
          >
            <Printer size={18} className="text-primary shrink-0" />
            <span className="truncate">In Báo Cáo</span>
          </button>
          <button
            onClick={() => navigate('/thiet-lap-muc-tieu-ca-truc')}
            className="cursor-pointer col-span-2 sm:col-span-1 bg-primary text-on-primary px-5 sm:px-6 py-3 rounded-xl font-extrabold hover:bg-on-primary-fixed-variant transition-all shadow-xs shadow-primary/20 flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base font-mono uppercase tracking-wider"
          >
            <Settings size={18} /> Thiết lập Mục tiêu
          </button>
        </div>
      </div>

      {/* Shift Switcher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5">
        {shifts.map((shift) => {
          const isActive = activeShift === shift.id
          return (
            <button
              key={shift.id}
              onClick={() => setActiveShift(shift.id)}
              className={`
                cursor-pointer p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden flex items-center justify-between
                ${isActive
                  ? 'bg-primary text-on-primary border-primary shadow-sm shadow-primary/20 scale-[1.01]'
                  : 'bg-surface-container-lowest text-on-surface border-outline-variant/40 hover:bg-surface-container-low/70 hover:border-primary/40'
                }
              `}
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight">{shift.label}</span>
                  <span className={`font-mono text-xs px-2.5 py-0.5 rounded-full uppercase font-bold ${isActive ? 'bg-on-primary/20 text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                    {shift.time}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm ${isActive ? 'text-on-primary/90 font-medium' : 'text-on-surface-variant'}`}>
                  Trưởng ca: <span className="font-bold">{shift.chief}</span>
                </p>
              </div>

              {isActive && (
                <div className="p-2.5 rounded-xl bg-on-primary/20 text-on-primary">
                  <CheckCircle2 size={24} />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Shift KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6 stagger">
        <div className="bg-surface-container-lowest p-5 sm:p-6 lg:p-7 rounded-2xl shadow-xs border border-outline-variant/35 card-hover flex flex-col justify-between">
          <div>
            <p className="text-sm sm:text-base font-bold text-on-surface-variant">Tổng sản lượng ca</p>
            <div className="flex items-baseline gap-2 mt-1.5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface font-mono">{totalOutput.toLocaleString()}</h2>
              <span className="text-xs sm:text-sm font-mono text-on-surface-variant/80 font-bold">/ {totalTarget.toLocaleString()} T</span>
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <ProgressBar value={(totalOutput / (totalTarget || 1)) * 100} height="h-2" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 sm:p-6 lg:p-7 rounded-2xl shadow-xs border border-outline-variant/35 card-hover flex flex-col justify-between">
          <div>
            <p className="text-sm sm:text-base font-bold text-on-surface-variant truncate">Chất lượng trung bình</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-600 mt-1.5 font-mono">{avgQuality}%</h2>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant/80 mt-2 font-medium truncate">Đạt chuẩn ISO 9001:2015</p>
        </div>

        <div className="bg-surface-container-lowest p-5 sm:p-6 lg:p-7 rounded-2xl shadow-xs border border-outline-variant/35 card-hover flex flex-col justify-between">
          <div>
            <p className="text-sm sm:text-base font-bold text-on-surface-variant truncate">Quân số vận hành</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary mt-1.5 font-mono">4 <span className="text-base font-normal text-on-surface-variant font-sans">người</span></h2>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant/80 mt-2 font-medium truncate">100% có mặt đúng giờ</p>
        </div>
      </div>

      {/* Worker Performance Table */}
      <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/40 rounded-2xl overflow-hidden animate-slide-up">
        <div className="p-5 sm:p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Award size={22} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-on-surface">Bảng Đánh giá Năng lực Công nhân</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant/80 font-medium mt-0.5">Thống kê sản lượng và tỷ lệ kiểm định theo từng vị trí</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[650px]">
            <thead>
              <tr className="bg-surface-container-low/40 border-b border-outline-variant/30">
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold whitespace-nowrap">
                  Công nhân
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold whitespace-nowrap">
                  Vị trí máy đảm nhiệm
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold text-right whitespace-nowrap">
                  Thực tế / Mục tiêu (Tấn)
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold text-right whitespace-nowrap">
                  Chất lượng
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold text-center whitespace-nowrap">
                  Xếp loại ca
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-sm sm:text-base">
              {data.map((d) => (
                <tr key={d.worker} className="hover:bg-surface-container/50 transition-colors group cursor-pointer">
                  <td className="px-5 py-4 font-bold text-on-surface flex items-center gap-3 whitespace-nowrap">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-mono text-sm font-extrabold flex items-center justify-center border border-primary/20 shrink-0">
                      {d.worker.split(' ').pop()?.[0]}
                    </div>
                    <span className="font-bold text-on-surface">{d.worker}</span>
                  </td>
                  <td className="px-5 py-4 font-medium text-on-surface-variant whitespace-nowrap">
                    {d.role}
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-bold text-on-surface whitespace-nowrap">
                    {d.output} <span className="font-normal text-xs sm:text-sm text-on-surface-variant/70">/ {d.target} T</span>
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-extrabold text-emerald-600 whitespace-nowrap">
                    {d.quality}%
                  </td>
                  <td className="px-5 py-4 text-center whitespace-nowrap">
                    <Badge variant={d.status === 'excellent' ? 'success' : d.status === 'good' ? 'neutral' : 'warning'} size="md">
                      {d.status === 'excellent' ? 'Xuất sắc' : d.status === 'good' ? 'Hoàn thành' : 'Cần cải thiện'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Modal */}
      <PrintModal isOpen={printOpen} onClose={() => setPrintOpen(false)} data={printData} />
    </div>
  )
}

