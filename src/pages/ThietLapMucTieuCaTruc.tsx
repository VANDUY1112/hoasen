import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react'

export default function ThietLapMucTieuCaTruc() {
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
        alert('Mục tiêu ca trực đã được ban hành và gửi thông báo thành công!')
      }, 2000)
    }, 1500)
  }

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-on-surface-variant" />
        </button>
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-on-surface tracking-tight">Thiết lập Mục tiêu Ca trực</h1>
          <p className="text-sm text-on-surface-variant mt-1">Cấu hình mục tiêu sản lượng và chất lượng cho từng ca.</p>
        </div>
      </div>

      <div className="max-w-4xl">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Ca trực</label>
              <select className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all">
                <option>Ca 1 (06:00 - 14:00)</option>
                <option>Ca 2 (14:00 - 22:00)</option>
                <option>Ca 3 (22:00 - 06:00)</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Dây chuyền</label>
              <select className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all">
                <option>Cán Nguội 01</option>
                <option>Mạ Kẽm 04</option>
                <option>Sơn Phủ Màu 02</option>
                <option>Cán Nguội 03</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Mục tiêu sản lượng (Tấn)</label>
              <input
                type="number"
                defaultValue={400}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Mục tiêu chất lượng (%)</label>
              <input
                type="number"
                step="0.1"
                defaultValue={98.5}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Downtime tối đa (Phút)</label>
              <input
                type="number"
                defaultValue={120}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Ngày áp dụng</label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Ghi chú chỉ thị</label>
              <textarea
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all h-20 resize-none"
                placeholder="Hướng dẫn bổ sung cho ca trực..."
              />
            </div>
            <div className="md:col-span-2 flex gap-4 pt-2">
              <button
                type="submit"
                disabled={submitting || success}
                className={`px-8 py-3 font-semibold rounded-xl transition-all flex items-center gap-2 text-sm border-2 ${
                  success ? 'border-success text-success' : 'border-primary text-primary hover:bg-primary hover:text-on-primary'
                }`}
              >
                {submitting ? <><RefreshCw size={16} className="animate-spin-slow" /> Đang xử lý...</> :
                 success ? <><CheckCircle2 size={16} /> Đã ban hành</> :
                 'Ban hành Mục tiêu'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
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
