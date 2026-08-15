import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RefreshCw, CheckCircle2, Warehouse, Layers, Calendar, FileText, Sparkles } from 'lucide-react'
import CustomSelect, { SelectOption } from '../components/ui/CustomSelect'

const warehouseOptions: SelectOption[] = [
  { value: 'Kho TP-1', label: 'Kho TP-1 (Thành phẩm tôn cuộn)', badge: 'Khu A', description: 'Khu vực bảo quản tiêu chuẩn ISO' },
  { value: 'Kho TP-2', label: 'Kho TP-2 (Tôn màu xuất khẩu)', badge: 'Khu B', description: 'Đóng gói màng co và pallet' },
  { value: 'Kho A1', label: 'Kho A1 (Phôi thép cán nóng)', badge: 'NVL', description: 'Sức chứa tối đa 10,000 Tấn' },
  { value: 'Kho B2', label: 'Kho B2 (Hóa chất & Kẽm thỏi)', badge: 'Phụ liệu', description: 'Kiểm soát nhiệt độ tự động' },
]

export default function NhapKhoThanhPham() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    coilId: '',
    weight: '',
    location: 'Kho TP-1',
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
        setFormData({ coilId: '', weight: '', location: 'Kho TP-1', date: new Date().toISOString().split('T')[0], notes: '' })
      }, 2000)
    }, 1500)
  }

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 animate-fade-in max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => navigate('/quan-ly-ton-kho')}
            className="p-2.5 hover:bg-surface-container-high rounded-xl transition-colors text-on-surface-variant hover:text-primary border border-outline-variant/40 shadow-xs"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">Console Vận hành</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs text-on-surface-variant font-medium">Nhập kho</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-0.5">
              Nhập kho Thành phẩm
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Container */}
        <div className="lg:col-span-7">
          <div className="bg-surface-container-lowest p-6 sm:p-7 rounded-2xl shadow-sm border border-outline-variant/50">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Mã cuộn thép (Coil ID)
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-mono focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200"
                      placeholder="HS-20260815-001"
                      value={formData.coilId}
                      onChange={(e) => setFormData({ ...formData, coilId: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Khối lượng tịnh (Tấn)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.001"
                      className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-mono focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200"
                      placeholder="24.500"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <CustomSelect
                    label="Vị trí kho lưu trữ"
                    icon={<Warehouse size={16} />}
                    options={warehouseOptions}
                    value={formData.location}
                    onChange={(val) => setFormData({ ...formData, location: val })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Ngày nhập kho
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-mono focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Ghi chú kiểm định chất lượng
                </label>
                <textarea
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200 h-24 resize-none"
                  placeholder="Nhập thông tin bề mặt mạ, độ bóng, độ bám dính..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-outline-variant/40">
                <button
                  type="submit"
                  disabled={submitting || success}
                  className={`
                    px-7 py-3 text-on-primary font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 text-sm shadow-md
                    ${success
                      ? 'bg-emerald-600 shadow-emerald-600/20'
                      : 'bg-primary hover:bg-on-primary-fixed-variant shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]'
                    }
                  `}
                >
                  {submitting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin-slow" /> Đang xử lý ERP...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle2 size={16} /> Đã nhập kho thành công
                    </>
                  ) : (
                    <>
                      <Layers size={16} /> Xác nhận nhập kho
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/quan-ly-ton-kho')}
                  className="px-5 py-3 bg-surface-container text-on-surface-variant font-semibold rounded-xl hover:bg-surface-container-high transition-colors text-sm"
                >
                  Hủy bỏ
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="lg:col-span-5">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/50 sticky top-24">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                <span className="font-bold text-xs uppercase tracking-wider text-on-surface">Thẻ nhận dạng Barcode</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 font-mono text-[10px] font-bold uppercase">
                Chờ in tem
              </span>
            </div>

            <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-center mb-5">
              <p className="text-[11px] font-mono text-on-surface-variant uppercase font-semibold">Khối lượng xác nhận</p>
              <p className="text-5xl font-extrabold text-on-surface tracking-tight mt-1">
                {formData.weight || '0.000'} <span className="text-xl font-normal text-on-surface-variant">T</span>
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-surface-container/60">
                <span className="text-on-surface-variant">Mã Cuộn:</span>
                <span className="font-bold text-primary">{formData.coilId || 'HS-XXXX-XXX'}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-surface-container/60">
                <span className="text-on-surface-variant">Vị trí lưu kho:</span>
                <span className="font-bold text-on-surface">{formData.location}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-surface-container/60">
                <span className="text-on-surface-variant">Thời điểm:</span>
                <span className="font-bold text-on-surface">{formData.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
