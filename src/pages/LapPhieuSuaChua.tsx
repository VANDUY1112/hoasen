import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RefreshCw, CheckCircle2, Wrench, AlertTriangle, User, Clock, ShieldAlert } from 'lucide-react'
import CustomSelect, { SelectOption } from '../components/ui/CustomSelect'

const equipmentOptions: SelectOption[] = [
  { value: 'Trục cán chính - Line 01', label: 'Trục cán chính - Line 01 (Cán Nguội)', badge: 'Critical', description: 'Rung chấn vượt ngưỡng 48h' },
  { value: 'Bơm thủy lực - Line 03', label: 'Bơm thủy lực - Line 03 (Hệ thống ép)', badge: 'Warning', description: 'Sụt giảm áp lực dầu' },
  { value: 'Motor truyền động - Xẻ Băng', label: 'Motor truyền động - Xẻ Băng', badge: 'Warning', description: 'Nhiệt độ cuộn dây tăng cao' },
  { value: 'Hệ thống làm mát - Mạ Kẽm', label: 'Hệ thống làm mát - Mạ Kẽm', badge: 'Normal', description: 'Bảo trì định kỳ chu kỳ 30 ngày' },
]

const priorityOptions: SelectOption[] = [
  { value: 'Khẩn cấp', label: 'Khẩn cấp (Dưới 2 giờ)', badge: 'P1', description: 'Có nguy cơ dừng toàn bộ line sản xuất' },
  { value: 'Cao', label: 'Mức độ Cao (Trong ca trực)', badge: 'P2', description: 'Cần can thiệp trước khi chuyển ca' },
  { value: 'Bình thường', label: 'Bình thường (Định kỳ)', badge: 'P3', description: 'Lên lịch trong 48 giờ' },
]

const technicianOptions: SelectOption[] = [
  { value: 'Nguyễn Văn An', label: 'Nguyễn Văn An', badge: 'Bậc 7/7', description: 'Trưởng nhóm Cơ khí bảo dưỡng' },
  { value: 'Trần Minh Đức', label: 'Trần Minh Đức', badge: 'Bậc 5/7', description: 'Kỹ sư Thủy lực & Khí nén' },
  { value: 'Phạm Quốc Bảo', label: 'Phạm Quốc Bảo', badge: 'Bậc 6/7', description: 'Chuyên viên Tự động hóa & PLC' },
]

export default function LapPhieuSuaChua() {
  const navigate = useNavigate()
  const [equipment, setEquipment] = useState('Trục cán chính - Line 01')
  const [priority, setPriority] = useState('Khẩn cấp')
  const [technician, setTechnician] = useState('Nguyễn Văn An')
  const [duration, setDuration] = useState('4')
  const [description, setDescription] = useState('Phát hiện rung chấn bất thường tại ổ đỡ trục phía Đông. Cần thay thế vòng bi SKF 22320.')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        alert('Phiếu sửa chữa đã được tạo và gửi thông báo đến kỹ thuật viên.')
        navigate('/du-bao-bao-tri')
      }, 1500)
    }, 1500)
  }

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 animate-fade-in max-w-5xl mx-auto">
      {/* Title */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={() => navigate('/du-bao-bao-tri')}
          className="p-2.5 hover:bg-surface-container-high rounded-xl transition-colors text-on-surface-variant hover:text-primary border border-outline-variant/40 shadow-xs"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">Predictive Maintenance</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs text-on-surface-variant font-medium">Phiếu công việc</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-0.5">
            Lập phiếu Sửa chữa &amp; Bảo trì
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/50">
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
              className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200 h-28 resize-none"
              placeholder="Mô tả hiện tượng, vị trí rung, biên độ cảnh báo cảm biến..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <CustomSelect
              label="Kỹ thuật viên phụ trách chính"
              icon={<User size={16} />}
              options={technicianOptions}
              value={technician}
              onChange={setTechnician}
            />

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Thời gian xử lý dự kiến (Giờ)
              </label>
              <div className="relative">
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
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/40">
            <button
              type="submit"
              disabled={submitting || success}
              className={`
                px-8 py-3 text-on-primary font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 text-sm shadow-md
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

            <button
              type="button"
              onClick={() => navigate('/du-bao-bao-tri')}
              className="px-5 py-3 bg-surface-container text-on-surface-variant font-semibold rounded-xl hover:bg-surface-container-high transition-colors text-sm"
            >
              Quay lại
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
