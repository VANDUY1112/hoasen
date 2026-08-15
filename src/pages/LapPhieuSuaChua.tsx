import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RefreshCw, CheckCircle2, Wrench, User, ShieldAlert, Printer } from 'lucide-react'
import CustomSelect, { SelectOption } from '../components/ui/CustomSelect'
import { useDataContext } from '../context/DataContext'
import { useToast } from '../components/ui/Toast'
import PrintModal, { PrintDocumentData } from '../components/ui/PrintModal'

const equipmentOptions: SelectOption[] = [
  { value: 'Trục cán chính - Line 01', label: 'Trục cán chính - Line 01 (Cán Nguội)', badge: 'Critical', description: 'Rung chấn vượt ngưỡng 48h' },
  { value: 'Bơm thủy lực - Line 03', label: 'Bơm thủy lực - Line 03 (Hệ thống ép)', badge: 'Warning', description: 'Sụt giảm áp lực dầu' },
  { value: 'Motor truyền động - Xẻ Băng', label: 'Motor truyền động - Xẻ Băng', badge: 'Warning', description: 'Nhiệt độ cuộn dây tăng cao' },
  { value: 'Hệ thống làm mát - Mạ Kẽm', label: 'Hệ thống làm mát - Mạ Kẽm', badge: 'Normal', description: 'Bảo trì định kỳ chu kỳ 30 ngày' },
]

const priorityOptions: SelectOption[] = [
  { value: 'urgent', label: 'Khẩn cấp (Dưới 2 giờ)', badge: 'P1 - Urgent', description: 'Có nguy cơ dừng toàn bộ line sản xuất' },
  { value: 'high', label: 'Mức độ Cao (Trong ca trực)', badge: 'P2 - High', description: 'Cần can thiệp trước khi chuyển ca' },
  { value: 'normal', label: 'Bình thường (Định kỳ)', badge: 'P3 - Normal', description: 'Lên lịch trong 48 giờ' },
]

const technicianOptions: SelectOption[] = [
  { value: 'Nguyễn Văn An', label: 'Nguyễn Văn An', badge: 'Bậc 7/7', description: 'Trưởng nhóm Cơ khí bảo dưỡng' },
  { value: 'Trần Minh Đức', label: 'Trần Minh Đức', badge: 'Bậc 5/7', description: 'Kỹ sư Thủy lực & Khí nén' },
  { value: 'Phạm Quốc Bảo', label: 'Phạm Quốc Bảo', badge: 'Bậc 6/7', description: 'Chuyên viên Tự động hóa & PLC' },
]

export default function LapPhieuSuaChua() {
  const navigate = useNavigate()
  const { addRepairTicket } = useDataContext()
  const { addToast } = useToast()

  const [equipment, setEquipment] = useState('Trục cán chính - Line 01')
  const [priority, setPriority] = useState('urgent')
  const [technician, setTechnician] = useState('Nguyễn Văn An')
  const [duration, setDuration] = useState('4')
  const [reporter, setReporter] = useState('Võ Văn Duy (Giám đốc Nhà máy)')
  const [description, setDescription] = useState('Phát hiện rung chấn bất thường tại ổ đỡ trục phía Đông. Cần thay thế vòng bi SKF 22320 và bôi trơn lại hệ thống truyền động.')
  const [parts, setParts] = useState('Vòng bi SKF 22320 (x2), Dầu Castrol 68 (20L)')
  
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [printData, setPrintData] = useState<PrintDocumentData | null>(null)
  const [printOpen, setPrintOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    setTimeout(() => {
      const ticketCode = `WRK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      
      addRepairTicket({
        code: ticketCode,
        equipment,
        line: equipment.includes('Line 01') ? 'Line Cán Nguội 01' : 'Dây chuyền Mạ Kẽm',
        priority: priority as any,
        issueType: 'Sự cố cơ khí & Rung chấn',
        description,
        reporter,
        assignedTo: technician,
        partsNeeded: parts,
        downtimeEst: `${duration} giờ`,
      })

      setSubmitting(false)
      setSuccess(true)
      addToast('success', 'Đã phát hành phiếu sửa chữa!', `Mã phiếu: ${ticketCode} đã giao cho ${technician}`)

      setPrintData({
        type: 'phieu-sua-chua',
        title: 'PHIẾU YÊU CẦU SỬA CHỮA & BẢO TRÌ THIẾT BỊ',
        code: ticketCode,
        date: new Date().toLocaleDateString('vi-VN'),
        author: reporter,
        notes: description,
        details: [
          { label: 'Thiết bị gặp sự cố', value: equipment, highlight: true },
          { label: 'Mức độ ưu tiên', value: priority === 'urgent' ? 'KHẨN CẤP (P1)' : priority === 'high' ? 'CAO (P2)' : 'BÌNH THƯỜNG (P3)', highlight: true },
          { label: 'Kỹ thuật viên phụ trách', value: technician },
          { label: 'Người yêu cầu / Báo cáo', value: reporter },
          { label: 'Vật tư thay thế đề xuất', value: parts },
          { label: 'Thời gian dừng máy dự kiến', value: `${duration} Giờ` },
        ],
      })
    }, 1000)
  }

  const handleOpenPrint = () => {
    if (!printData) {
      setPrintData({
        type: 'phieu-sua-chua',
        title: 'PHIẾU YÊU CẦU SỬA CHỮA & BẢO TRÌ THIẾT BỊ',
        code: `WRK-${new Date().getFullYear()}-SAMPLE`,
        date: new Date().toLocaleDateString('vi-VN'),
        author: reporter,
        notes: description,
        details: [
          { label: 'Thiết bị gặp sự cố', value: equipment, highlight: true },
          { label: 'Mức độ ưu tiên', value: priority === 'urgent' ? 'KHẨN CẤP (P1)' : 'CAO (P2)', highlight: true },
          { label: 'Kỹ thuật viên phụ trách', value: technician },
          { label: 'Người yêu cầu / Báo cáo', value: reporter },
          { label: 'Vật tư thay thế đề xuất', value: parts },
          { label: 'Thời gian dừng máy dự kiến', value: `${duration} Giờ` },
        ],
      })
    }
    setPrintOpen(true)
  }

  return (
    <div className="flex flex-col w-full p-3.5 sm:p-5 lg:p-6 gap-4 sm:gap-5 animate-fade-in max-w-5xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/du-bao-bao-tri')}
            className="cursor-pointer p-2 hover:bg-surface-container-high rounded-xl transition-colors text-on-surface-variant hover:text-primary border border-outline-variant/40 shadow-2xs shrink-0"
            title="Quay lại Dự báo bảo trì"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight">
              Lập phiếu Sửa chữa &amp; Bảo trì
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenPrint}
          className="cursor-pointer bg-surface-container-lowest border border-outline-variant/40 text-on-surface px-3.5 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-surface-container transition-colors shadow-2xs w-full sm:w-auto"
        >
          <Printer size={15} className="text-primary" /> Xem mẫu phiếu A4
        </button>
      </div>

      <div className="bg-surface-container-lowest p-4 sm:p-6 rounded-2xl shadow-xs border border-outline-variant/35">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <CustomSelect
              label="Thiết bị / Cụm chi tiết"
              icon={<Wrench size={16} />}
              options={equipmentOptions}
              value={equipment}
              onChange={setEquipment}
            />

            <CustomSelect
              label="Mức độ ưu tiên"
              icon={<ShieldAlert size={16} />}
              options={priorityOptions}
              value={priority}
              onChange={setPriority}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
              Mô tả hiện tượng sự cố chi tiết
            </label>
            <textarea
              className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200 h-28 resize-none font-medium"
              placeholder="Mô tả hiện tượng, vị trí rung, biên độ cảnh báo cảm biến..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
              Vật tư &amp; Phụ tùng thay thế dự kiến
            </label>
            <input
              type="text"
              className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-mono focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200"
              value={parts}
              onChange={(e) => setParts(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <CustomSelect
                label="Kỹ thuật viên phụ trách"
                icon={<User size={16} />}
                options={technicianOptions}
                value={technician}
                onChange={setTechnician}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Người yêu cầu / Trưởng ca
              </label>
              <input
                type="text"
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200"
                value={reporter}
                onChange={(e) => setReporter(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Dừng máy dự kiến (Giờ)
              </label>
              <input
                type="number"
                min="1"
                max="48"
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-mono focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
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
                  <RefreshCw size={16} className="animate-spin-slow" /> Đang phát hành phiếu...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={16} /> Đã tạo phiếu thành công!
                </>
              ) : (
                <>
                  <Wrench size={16} /> Phát hành Phiếu sửa chữa
                </>
              )}
            </button>

            {success && (
              <button
                type="button"
                onClick={handleOpenPrint}
                className="cursor-pointer px-5 py-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-300 hover:bg-emerald-100 transition-colors text-sm flex items-center gap-2 animate-scale-in"
              >
                <Printer size={16} /> In phiếu sửa chữa A4
              </button>
            )}

            <button
              type="button"
              onClick={() => navigate('/du-bao-bao-tri')}
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

