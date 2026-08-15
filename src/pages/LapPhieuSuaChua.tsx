import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react'

export default function LapPhieuSuaChua() {
  const navigate = useNavigate()
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
      }, 2000)
    }, 1500)
  }

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/du-bao-bao-tri')} className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-on-surface-variant" />
        </button>
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-on-surface tracking-tight">Lập phiếu Sửa chữa</h1>
          <p className="text-sm text-on-surface-variant mt-1">Tạo yêu cầu bảo trì và gửi thông báo kỹ thuật viên.</p>
        </div>
      </div>

      <div className="max-w-3xl">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Thiết bị</label>
                <select className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all" required>
                  <option value="">-- Chọn thiết bị --</option>
                  <option>Trục cán chính - Line 01</option>
                  <option>Bơm thủy lực - Line 03</option>
                  <option>Motor truyền động - Xẻ Băng</option>
                  <option>Hệ thống làm mát - Mạ Kẽm</option>
                </select>
              </div>
              <div>
                <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Mức độ ưu tiên</label>
                <select className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all">
                  <option>Khẩn cấp</option>
                  <option>Cao</option>
                  <option>Bình thường</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Mô tả sự cố</label>
              <textarea
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all h-28 resize-none"
                placeholder="Mô tả chi tiết hiện tượng, vị trí, thời điểm phát hiện..."
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Kỹ thuật viên phụ trách</label>
                <select className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all">
                  <option>Nguyễn Văn An</option>
                  <option>Trần Minh Đức</option>
                  <option>Phạm Quốc Bảo</option>
                </select>
              </div>
              <div>
                <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Thời gian dự kiến (Giờ)</label>
                <input
                  type="number"
                  defaultValue={4}
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                disabled={submitting || success}
                className={`px-8 py-3 text-on-primary font-semibold rounded-xl transition-all flex items-center gap-2 text-sm shadow-lg ${
                  success ? 'bg-success' : 'bg-primary hover:bg-on-primary-fixed-variant'
                }`}
              >
                {submitting ? <><RefreshCw size={16} className="animate-spin-slow" /> Đang lập phiếu...</> :
                 success ? <><CheckCircle2 size={16} /> Thành công!</> :
                 'Tạo phiếu sửa chữa'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/du-bao-bao-tri')}
                className="px-6 py-3 bg-surface-container text-on-surface-variant font-semibold rounded-xl hover:bg-surface-container-high transition-all text-sm"
              >
                Quay lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
