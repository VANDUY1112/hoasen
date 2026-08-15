import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react'

export default function NhapKhoThanhPham() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    coilId: '',
    weight: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  })
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
        alert('Dữ liệu đã được lưu thành công vào hệ thống!')
        setFormData({ coilId: '', weight: '', location: '', date: new Date().toISOString().split('T')[0], notes: '' })
      }, 2000)
    }, 1500)
  }

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/quan-ly-ton-kho')} className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
          <ArrowLeft size={20} className="text-on-surface-variant" />
        </button>
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-on-surface tracking-tight">Nhập kho Thành phẩm</h1>
          <p className="text-sm text-on-surface-variant mt-1">Ghi nhận sản phẩm hoàn thành vào hệ thống tồn kho.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form */}
        <div className="lg:col-span-7">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Mã cuộn thép (Coil ID)</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                    placeholder="HS-YYYYMMDD-XXX"
                    value={formData.coilId}
                    onChange={(e) => setFormData({ ...formData, coilId: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Khối lượng (Tấn)</label>
                  <input
                    type="number"
                    step="0.001"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                    placeholder="0.000"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Vị trí kho</label>
                  <select
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  >
                    <option value="">-- Chọn kho --</option>
                    <option value="Kho TP-1">Kho TP-1</option>
                    <option value="Kho TP-2">Kho TP-2</option>
                    <option value="Kho A1">Kho A1</option>
                    <option value="Kho B2">Kho B2</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Ngày nhập</label>
                  <input
                    type="date"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Ghi chú</label>
                <textarea
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-4 py-2.5 text-sm focus:border-primary outline-none transition-all h-24 resize-none"
                  placeholder="Ghi chú bổ sung..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitting || success}
                  className={`px-8 py-3 text-on-primary font-semibold rounded-xl transition-all flex items-center gap-2 text-sm shadow-lg ${
                    success ? 'bg-success' : 'bg-primary hover:bg-on-primary-fixed-variant'
                  }`}
                >
                  {submitting ? <><RefreshCw size={16} className="animate-spin-slow" /> Đang xử lý...</> :
                   success ? <><CheckCircle2 size={16} /> Thành công</> :
                   'Xác nhận nhập kho'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/quan-ly-ton-kho')}
                  className="px-6 py-3 bg-surface-container text-on-surface-variant font-semibold rounded-xl hover:bg-surface-container-high transition-all text-sm"
                >
                  Hủy yêu cầu
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-5">
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm sticky top-24">
            <h3 className="font-mono text-xs text-on-surface-variant uppercase mb-4 tracking-wider">Xem trước dữ liệu</h3>
            <div className="space-y-4">
              <div>
                <p className="text-5xl font-bold text-on-surface leading-tight tracking-tight">
                  {formData.weight || '0.000'} <span className="text-lg text-on-surface-variant">T</span>
                </p>
              </div>
              <div className="border-t border-outline-variant/50 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-on-surface-variant uppercase">Coil ID</span>
                  <span className="text-sm font-semibold text-on-surface">{formData.coilId || '---'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-on-surface-variant uppercase">Vị trí</span>
                  <span className="text-sm font-semibold text-on-surface">{formData.location || '---'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-on-surface-variant uppercase">Ngày</span>
                  <span className="text-sm font-semibold text-on-surface">{formData.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
