import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RefreshCw, CheckCircle2, Sliders, Clock, Factory, Printer } from 'lucide-react'
import CustomSelect, { SelectOption } from '../components/ui/CustomSelect'
import CustomDatePicker from '../components/ui/CustomDatePicker'
import { useDataContext } from '../context/DataContext'
import { useToast } from '../components/ui/Toast'
import PrintModal, { PrintDocumentData } from '../components/ui/PrintModal'


const shiftOptions: SelectOption[] = [
  { value: 'ca-1', label: 'Ca 1: 06:00 - 14:00 (Sáng)', badge: 'Trưởng ca: Văn An', description: 'Định mức tiêu chuẩn 400 Tấn' },
  { value: 'ca-2', label: 'Ca 2: 14:00 - 22:00 (Chiều)', badge: 'Trưởng ca: Thanh Tùng', description: 'Định mức tiêu chuẩn 400 Tấn' },
  { value: 'ca-3', label: 'Ca 3: 22:00 - 06:00 (Đêm)', badge: 'Trưởng ca: Tấn Phát', description: 'Tối ưu hóa giá điện giờ thấp điểm' },
]

const lineOptions: SelectOption[] = [
  { value: 'Cán Nguội 01', label: 'Dây chuyền Cán Nguội 01', badge: 'Line 1', description: 'Công suất thiết kế 1,200 Tấn/ngày' },
  { value: 'Mạ Kẽm 04', label: 'Dây chuyền Mạ Kẽm Tốc Độ Cao 04', badge: 'Line 4', description: 'Mạ Z180 - Z275' },
  { value: 'Sơn Phủ Màu 02', label: 'Dây chuyền Sơn Phủ Màu 02', badge: 'Line 2', description: 'Sơn tĩnh điện tự động' },
  { value: 'Cán Nguội 03', label: 'Dây chuyền Cán Nguội Biên 03', badge: 'Line 3', description: 'Xử lý cuộn khổ hẹp' },
]

export default function ThietLapMucTieuCaTruc() {
  const navigate = useNavigate()
  const { updateShiftTarget, shiftData } = useDataContext()
  const { addToast } = useToast()

  const [shift, setShift] = useState('ca-1')
  const [line, setLine] = useState('Cán Nguội 01')
  const [targetOutput, setTargetOutput] = useState('420')
  const [targetQuality, setTargetQuality] = useState('98.5')
  const [maxDowntime, setMaxDowntime] = useState('45')
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState('Ưu tiên cán cuộn tôn mạ kẽm Z275 xuất khẩu thị trường Mỹ, kiểm soát chặt chẽ độ dày và biên độ rung chấn.')
  
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [printData, setPrintData] = useState<PrintDocumentData | null>(null)
  const [printOpen, setPrintOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    setTimeout(() => {
      // Update targets for workers in selected shift
      const workers = shiftData[shift] || []
      const targetVal = parseFloat(targetOutput) || 400
      workers.forEach((w) => updateShiftTarget(shift, w.worker, targetVal))

      setSubmitting(false)
      setSuccess(true)
      addToast('success', 'Đã ban hành mục tiêu ca trực!', `Đã gửi chỉ tiêu ${targetOutput} Tấn cho ${shift.toUpperCase()}`)

      setPrintData({
        type: 'bao-cao-ca',
        title: 'LỆNH SẢN XUẤT & GIAO CHỈ TIÊU CA TRỰC',
        code: `CMD-${shift.toUpperCase()}-${targetDate.replace(/-/g, '')}`,
        date: targetDate,
        author: 'Võ Văn Duy (Giám đốc Sản xuất)',
        notes,
        details: [
          { label: 'Ca trực áp dụng', value: shift === 'ca-1' ? 'Ca 1 (06:00 - 14:00)' : shift === 'ca-2' ? 'Ca 2 (14:00 - 22:00)' : 'Ca 3 (22:00 - 06:00)', highlight: true },
          { label: 'Dây chuyền sản xuất', value: line },
          { label: 'Chỉ tiêu sản lượng ca', value: `${targetOutput} Tấn`, highlight: true },
          { label: 'Chỉ tiêu chất lượng (Yield)', value: `${targetQuality}%` },
          { label: 'Giới hạn dừng máy tối đa', value: `${maxDowntime} Phút` },
          { label: 'Trưởng ca nhận lệnh', value: shift === 'ca-1' ? 'Nguyễn Văn An' : shift === 'ca-2' ? 'Võ Thanh Tùng' : 'Huỳnh Tấn Phát' },
        ],
      })
    }, 1000)
  }

  const handleOpenPrint = () => {
    if (!printData) {
      setPrintData({
        type: 'bao-cao-ca',
        title: 'LỆNH SẢN XUẤT & GIAO CHỈ TIÊU CA TRỰC',
        code: `CMD-${shift.toUpperCase()}-${targetDate.replace(/-/g, '')}`,
        date: targetDate,
        author: 'Võ Văn Duy (Giám đốc Sản xuất)',
        notes,
        details: [
          { label: 'Ca trực áp dụng', value: shift === 'ca-1' ? 'Ca 1 (06:00 - 14:00)' : shift === 'ca-2' ? 'Ca 2 (14:00 - 22:00)' : 'Ca 3 (22:00 - 06:00)', highlight: true },
          { label: 'Dây chuyền sản xuất', value: line },
          { label: 'Chỉ tiêu sản lượng ca', value: `${targetOutput} Tấn`, highlight: true },
          { label: 'Chỉ tiêu chất lượng (Yield)', value: `${targetQuality}%` },
          { label: 'Giới hạn dừng máy tối đa', value: `${maxDowntime} Phút` },
          { label: 'Trưởng ca nhận lệnh', value: shift === 'ca-1' ? 'Nguyễn Văn An' : shift === 'ca-2' ? 'Võ Thanh Tùng' : 'Huỳnh Tấn Phát' },
        ],
      })
    }
    setPrintOpen(true)
  }

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 animate-fade-in max-w-5xl mx-auto">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => navigate('/hieu-suat-ca-truc')}
            className="cursor-pointer p-2.5 hover:bg-surface-container-high rounded-xl transition-colors text-on-surface-variant hover:text-primary border border-outline-variant/40 shadow-xs"
            title="Quay lại Hiệu suất ca"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">KPIs &amp; Targets</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs text-on-surface-variant font-medium">Thiết lập ca</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-0.5">
              Thiết lập Mục tiêu Ca trực
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenPrint}
          className="cursor-pointer bg-surface-container-lowest border border-outline-variant/50 text-on-surface px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-surface-container transition-colors shadow-xs"
        >
          <Printer size={16} className="text-primary" /> Xem lệnh giao ca A4
        </button>
      </div>

      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/50">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <CustomSelect
              label="Ca trực áp dụng"
              icon={<Clock size={16} />}
              options={shiftOptions}
              value={shift}
              onChange={setShift}
            />

            <CustomSelect
              label="Dây chuyền sản xuất"
              icon={<Factory size={16} />}
              options={lineOptions}
              value={line}
              onChange={setLine}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Mục tiêu sản lượng (Tấn)
              </label>
              <input
                type="number"
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-mono focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200 font-bold"
                value={targetOutput}
                onChange={(e) => setTargetOutput(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Mục tiêu chất lượng (%)
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-mono focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200"
                value={targetQuality}
                onChange={(e) => setTargetQuality(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Downtime tối đa (Phút)
              </label>
              <input
                type="number"
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-mono focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200"
                value={maxDowntime}
                onChange={(e) => setMaxDowntime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="max-w-md">
            <CustomDatePicker
              label="Ngày áp dụng chỉ tiêu"
              value={targetDate}
              onChange={setTargetDate}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
              Chỉ thị đặc biệt từ Ban Giám Đốc
            </label>
            <textarea
              className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200 h-24 resize-none font-medium"
              placeholder="Ví dụ: Ưu tiên đơn hàng tôn mạ Z275 xuất khẩu thị trường Mỹ..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/40 flex-wrap">
            <button
              type="submit"
              disabled={submitting}
              className={`
                cursor-pointer px-8 py-3 text-on-primary font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 text-sm shadow-md
                ${success
                  ? 'bg-emerald-600 shadow-emerald-600/20'
                  : 'bg-primary hover:bg-on-primary-fixed-variant shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]'
                }
              `}
            >
              {submitting ? (
                <>
                  <RefreshCw size={16} className="animate-spin-slow" /> Đang ban hành...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={16} /> Đã ban hành thành công
                </>
              ) : (
                <>
                  <Sliders size={16} /> Ban hành Chỉ tiêu Ca trực
                </>
              )}
            </button>

            {success && (
              <button
                type="button"
                onClick={handleOpenPrint}
                className="cursor-pointer px-5 py-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-300 hover:bg-emerald-100 transition-colors text-sm flex items-center gap-2 animate-scale-in"
              >
                <Printer size={16} /> In lệnh giao ca A4
              </button>
            )}

            <button
              type="button"
              onClick={() => navigate('/hieu-suat-ca-truc')}
              className="cursor-pointer px-5 py-3 bg-surface-container text-on-surface-variant font-semibold rounded-xl hover:bg-surface-container-high transition-colors text-sm"
            >
              Quay lại
            </button>
          </div>
        </form>
      </div>

      {/* Print Modal */}
      <PrintModal isOpen={printOpen} onClose={() => setPrintOpen(false)} data={printData} />
    </div>
  )
}

