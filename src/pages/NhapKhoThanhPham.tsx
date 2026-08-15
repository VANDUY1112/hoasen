import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RefreshCw, CheckCircle2, Warehouse, Layers, Printer, Sparkles, QrCode } from 'lucide-react'
import CustomSelect, { SelectOption } from '../components/ui/CustomSelect'
import CustomDatePicker from '../components/ui/CustomDatePicker'
import { useDataContext } from '../context/DataContext'
import { useToast } from '../components/ui/Toast'
import PrintModal, { PrintDocumentData } from '../components/ui/PrintModal'

const warehouseOptions: SelectOption[] = [
  { value: 'Kho TP-1', label: 'Kho TP-1 (Thành phẩm tôn cuộn)', badge: 'Khu A', description: 'Khu vực bảo quản tiêu chuẩn ISO' },
  { value: 'Kho TP-2', label: 'Kho TP-2 (Tôn màu xuất khẩu)', badge: 'Khu B', description: 'Đóng gói màng co và pallet' },
  { value: 'Kho A1', label: 'Kho A1 (Phôi thép cán nóng)', badge: 'NVL', description: 'Sức chứa tối đa 10,000 Tấn' },
  { value: 'Kho B2', label: 'Kho B2 (Hóa chất & Kẽm thỏi)', badge: 'Phụ liệu', description: 'Kiểm soát nhiệt độ tự động' },
]

const steelTypeOptions: SelectOption[] = [
  { value: 'Tôn mạ kẽm Z275 - 0.45mm', label: 'Tôn mạ kẽm Z275 (0.45mm)' },
  { value: 'Tôn mạ nhôm kẽm AZ150 - 0.50mm', label: 'Tôn mạ nhôm kẽm AZ150 (0.50mm)' },
  { value: 'Tôn sơn phủ màu RAL 3001 - 0.40mm', label: 'Tôn sơn phủ màu RAL 3001 (Đỏ Hoa Sen)' },
  { value: 'Thép cuộn cán nguội CRC SPCC-1D', label: 'Thép cuộn cán nguội CRC SPCC-1D' },
]

export default function NhapKhoThanhPham() {
  const navigate = useNavigate()
  const { addInventoryItem } = useDataContext()
  const { addToast } = useToast()

  const [formData, setFormData] = useState({
    coilId: 'HS-' + new Date().getFullYear() + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + Math.floor(100 + Math.random() * 900),
    steelType: 'Tôn mạ kẽm Z275 - 0.45mm',
    weight: '24.500',
    location: 'Kho TP-1',
    date: new Date().toISOString().split('T')[0],
    inspector: 'Nguyễn Văn An (KCS / QC)',
    notes: 'Bề mặt mạ kẽm bông nhỏ, không trầy xước, đạt chuẩn kiểm định xuất xưởng ISO 9001:2015.',
  })

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [printData, setPrintData] = useState<PrintDocumentData | null>(null)
  const [printOpen, setPrintOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    setTimeout(() => {
      // Add to data context
      addInventoryItem({
        code: formData.coilId,
        name: formData.steelType,
        type: 'Thành phẩm',
        quantity: parseFloat(formData.weight) || 1,
        unit: 'Cuộn',
        location: formData.location,
      })

      setSubmitting(false)
      setSuccess(true)
      addToast('success', 'Nhập kho thành công!', `Đã thêm cuộn ${formData.coilId} vào ${formData.location}`)

      // Prepare printable data
      setPrintData({
        type: 'nhap-kho',
        title: 'PHIẾU NHẬP KHO THÀNH PHẨM',
        code: `PNK-${formData.coilId}`,
        date: formData.date,
        author: formData.inspector,
        notes: formData.notes,
        details: [
          { label: 'Mã cuộn tôn (Coil ID)', value: formData.coilId, highlight: true },
          { label: 'Loại thép & Quy cách', value: formData.steelType },
          { label: 'Khối lượng tịnh', value: `${formData.weight} Tấn (1 Cuộn)`, highlight: true },
          { label: 'Vị trí lưu kho', value: formData.location },
          { label: 'KCS / Người kiểm định', value: formData.inspector },
          { label: 'Tiêu chuẩn chất lượng', value: 'TCVN 7470 / JIS G3302 (Đạt chuẩn)' },
        ],
      })

      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }, 1000)
  }

  const handleOpenPrint = () => {
    if (!printData) {
      setPrintData({
        type: 'nhap-kho',
        title: 'PHIẾU NHẬP KHO THÀNH PHẨM',
        code: `PNK-${formData.coilId}`,
        date: formData.date,
        author: formData.inspector,
        notes: formData.notes,
        details: [
          { label: 'Mã cuộn tôn (Coil ID)', value: formData.coilId, highlight: true },
          { label: 'Loại thép & Quy cách', value: formData.steelType },
          { label: 'Khối lượng tịnh', value: `${formData.weight} Tấn (1 Cuộn)`, highlight: true },
          { label: 'Vị trí lưu kho', value: formData.location },
          { label: 'KCS / Người kiểm định', value: formData.inspector },
          { label: 'Tiêu chuẩn chất lượng', value: 'TCVN 7470 / JIS G3302 (Đạt chuẩn)' },
        ],
      })
    }
    setPrintOpen(true)
  }

  return (
    <div className="flex flex-col w-full p-3.5 sm:p-5 lg:p-6 gap-4 sm:gap-5 animate-fade-in max-w-7xl mx-auto">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/quan-ly-ton-kho')}
            className="cursor-pointer p-2 hover:bg-surface-container-high rounded-xl transition-colors text-on-surface-variant hover:text-primary border border-outline-variant/40 shadow-2xs shrink-0"
            title="Quay lại Quản lý tồn kho"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] sm:text-xs text-primary uppercase font-bold tracking-wider">Console Vận hành</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[11px] sm:text-xs text-on-surface-variant/80 font-medium">Nhập kho</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight mt-0.5">
              Nhập kho Thành phẩm
            </h1>
          </div>
        </div>

        <button
          onClick={handleOpenPrint}
          className="cursor-pointer bg-surface-container-lowest border border-outline-variant/40 text-on-surface px-3.5 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-surface-container transition-colors shadow-2xs w-full sm:w-auto"
        >
          <Printer size={15} className="text-primary" /> Xem mẫu phiếu A4
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Form Container */}
        <div className="lg:col-span-7">
          <div className="bg-surface-container-lowest p-4 sm:p-6 rounded-2xl shadow-xs border border-outline-variant/35">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Mã cuộn thép (Coil ID)
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-mono focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200"
                    placeholder="HS-20260815-001"
                    value={formData.coilId}
                    onChange={(e) => setFormData({ ...formData, coilId: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Khối lượng tịnh (Tấn)
                  </label>
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

              <div>
                <CustomSelect
                  label="Loại sản phẩm & Quy cách"
                  options={steelTypeOptions}
                  value={formData.steelType}
                  onChange={(val) => setFormData({ ...formData, steelType: val })}
                />
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
                  <CustomDatePicker
                    label="Ngày nhập kho"
                    value={formData.date}
                    onChange={(val) => setFormData({ ...formData, date: val })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Người kiểm định KCS / Trưởng ca
                </label>
                <input
                  type="text"
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all duration-200 font-medium"
                  value={formData.inspector}
                  onChange={(e) => setFormData({ ...formData, inspector: e.target.value })}
                />
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

              <div className="flex items-center gap-4 pt-2 border-t border-outline-variant/40 flex-wrap">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`
                    cursor-pointer px-7 py-3 text-on-primary font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 text-sm shadow-md
                    ${success
                      ? 'bg-emerald-600 shadow-emerald-600/20'
                      : 'bg-primary hover:bg-on-primary-fixed-variant shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]'
                    }
                  `}
                >
                  {submitting ? (
                    <>
                      <RefreshCw size={16} className="animate-spin-slow" /> Đang cập nhật ERP...
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

                {success && (
                  <button
                    type="button"
                    onClick={handleOpenPrint}
                    className="cursor-pointer px-5 py-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-300 hover:bg-emerald-100 transition-colors text-sm flex items-center gap-2 animate-scale-in"
                  >
                    <Printer size={16} /> In phiếu nhập kho
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => navigate('/quan-ly-ton-kho')}
                  className="cursor-pointer px-5 py-3 bg-surface-container text-on-surface-variant font-semibold rounded-xl hover:bg-surface-container-high transition-colors text-sm"
                >
                  Về danh sách tồn kho
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
                <QrCode size={16} className="text-primary" />
                <span className="font-bold text-xs uppercase tracking-wider text-on-surface">Thẻ nhận dạng Barcode</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 font-mono text-[11px] font-bold uppercase border border-emerald-500/20">
                SCADA Đồng bộ
              </span>
            </div>

            <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-center mb-5">
              <p className="text-[11px] font-mono text-on-surface-variant uppercase font-semibold">Khối lượng xác nhận</p>
              <p className="text-5xl font-extrabold text-on-surface tracking-tight mt-1 font-mono">
                {formData.weight || '0.000'} <span className="text-xl font-normal text-on-surface-variant font-sans">Tấn</span>
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-surface-container/60">
                <span className="text-on-surface-variant font-sans">Mã Cuộn:</span>
                <span className="font-bold text-primary">{formData.coilId || 'HS-XXXX-XXX'}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-surface-container/60">
                <span className="text-on-surface-variant font-sans">Quy cách:</span>
                <span className="font-bold text-on-surface truncate max-w-[200px]">{formData.steelType}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-surface-container/60">
                <span className="text-on-surface-variant font-sans">Vị trí lưu kho:</span>
                <span className="font-bold text-on-surface">{formData.location}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-surface-container/60">
                <span className="text-on-surface-variant font-sans">Thời điểm:</span>
                <span className="font-bold text-on-surface">{formData.date}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
                <QrCode size={20} className="text-primary" />
                <span>Mã vạch chuẩn GS1-128</span>
              </div>
              <button
                type="button"
                onClick={handleOpenPrint}
                className="cursor-pointer text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <Printer size={14} /> In tem cuộn
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Print Preview Modal */}
      <PrintModal isOpen={printOpen} onClose={() => setPrintOpen(false)} data={printData} />
    </div>
  )
}

