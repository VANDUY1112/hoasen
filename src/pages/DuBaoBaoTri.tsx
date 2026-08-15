import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Wrench, Calendar, Package, Activity, ShoppingCart, Printer, CheckCircle2, Clock } from 'lucide-react'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import { useToast } from '../components/ui/Toast'
import { useDataContext } from '../context/DataContext'
import PrintModal, { PrintDocumentData } from '../components/ui/PrintModal'
import { sparePartsForecast, decorativeImages } from '../data/mockData'

export default function DuBaoBaoTri() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { tickets, maintenanceList, updateTicketStatus } = useDataContext()
  const [orderingPart, setOrderingPart] = useState<string | null>(null)
  const [printData, setPrintData] = useState<PrintDocumentData | null>(null)
  const [printOpen, setPrintOpen] = useState(false)

  const handleOrderPart = (partName: string) => {
    setOrderingPart(partName)
    addToast('info', 'Tạo đề xuất mua sắm ERP', `Đang lập Purchase Request cho vật tư: ${partName}...`)

    setTimeout(() => {
      setOrderingPart(null)
      addToast('success', 'Đã phát hành đơn hàng PR-2026-08!', `Đơn mua ${partName} đã được gửi tới Phòng Mua hàng.`)
    }, 1200)
  }

  const handleSensorDetails = (eqName: string) => {
    addToast('info', `Telemetry: ${eqName}`, 'Biên độ rung: 4.8 mm/s RMS | Nhiệt độ ổ bi: 78.5°C | Tần số sóng hài: 120Hz')
  }

  const handlePrintTicket = (t: typeof tickets[0]) => {
    setPrintData({
      type: 'phieu-sua-chua',
      title: 'PHIẾU YÊU CẦU SỬA CHỮA & BẢO TRÌ THIẾT BỊ',
      code: t.code,
      date: t.createdAt,
      author: t.reporter,
      notes: t.description,
      details: [
        { label: 'Thiết bị gặp sự cố', value: t.equipment, highlight: true },
        { label: 'Dây chuyền sản xuất', value: t.line },
        { label: 'Mức độ ưu tiên', value: t.priority === 'urgent' ? 'KHẨN CẤP (P1)' : t.priority === 'high' ? 'CAO (P2)' : 'BÌNH THƯỜNG', highlight: true },
        { label: 'Kỹ thuật viên phụ trách', value: t.assignedTo },
        { label: 'Người yêu cầu / Trưởng ca', value: t.reporter },
        { label: 'Vật tư thay thế đề xuất', value: t.partsNeeded || 'Chưa chỉ định' },
        { label: 'Thời gian dừng máy dự kiến', value: t.downtimeEst || 'Chưa ước lượng' },
      ],
    })
    setPrintOpen(true)
  }

  return (
    <div className="flex flex-col w-full p-3.5 sm:p-5 lg:p-6 gap-4 sm:gap-5 animate-fade-in max-w-7xl mx-auto pb-8">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-4">
        <div className="max-w-2xl space-y-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-primary font-bold">Predictive Intelligence &amp; IoT</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[11px] sm:text-xs text-on-surface-variant/80 font-semibold">Bảo trì dự đoán</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight leading-none mb-1">
            Dự báo &amp; Kế hoạch Bảo trì
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant/80 max-w-xl leading-relaxed">
            Hệ thống cảm biến IoT thu thập rung chấn thời gian thực kết hợp thuật toán AI dự báo hao mòn vòng bi và động cơ.
          </p>
        </div>

        <div className="flex gap-3.5 items-center bg-surface-container-lowest p-3 sm:p-3.5 rounded-2xl shadow-xs border border-outline-variant/35 w-full sm:w-auto">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle className="stroke-surface-container-highest" cx="18" cy="18" fill="none" strokeWidth="3.5" />
              <circle
                className="stroke-primary"
                cx="18"
                cy="18"
                fill="none"
                strokeDasharray="100"
                strokeDashoffset="15"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="font-mono text-xs text-primary font-extrabold">85%</span>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase text-on-surface-variant font-bold">Chỉ số Sức khỏe TB</p>
            <p className="text-sm sm:text-base font-extrabold text-on-surface">Vận hành Ổn định</p>
          </div>
        </div>
      </section>

      {/* Urgent Alert & Spare Parts Row */}
      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
          {/* Critical Alert Card */}
          <div className="lg:col-span-8 bg-rose-500/5 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center border border-rose-500/25 relative overflow-hidden group shadow-xs">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <AlertTriangle size={120} className="text-rose-600" />
            </div>

            <div className="relative z-10 w-full md:w-40 shrink-0">
              <div
                className="aspect-video md:aspect-square w-full rounded-xl bg-cover bg-center shadow-xs border border-rose-500/20"
                style={{ backgroundImage: `url('${decorativeImages.maintenance}')` }}
              />
            </div>

            <div className="relative z-10 flex-1 w-full">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <Badge variant="error" pulse size="sm">Cần bảo trì khẩn cấp</Badge>
                <span className="font-mono text-xs text-rose-700 font-extrabold">Hỏng hóc trong 48h</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-on-surface mb-2">Trục cán chính - Line 01</h3>
              <p className="text-xs sm:text-sm md:text-base text-on-surface-variant mb-4 sm:mb-5 leading-relaxed font-medium">
                Cảm biến phát hiện rung chấn bất thường tại ổ đỡ trục phía Đông. Dự báo mòn rãnh bi SKF 22320 nếu không thay thế trước ca tối.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3.5">
                <button
                  onClick={() => navigate('/lap-phieu-sua-chua')}
                  className="cursor-pointer bg-primary text-on-primary px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider hover:bg-on-primary-fixed-variant transition-all shadow-md shadow-primary/20 font-bold text-center"
                >
                  Lập phiếu sửa chữa
                </button>
                <button
                  onClick={() => handleSensorDetails('Trục cán chính - Line 01')}
                  className="cursor-pointer bg-surface-container-lowest text-on-surface px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-mono text-xs sm:text-sm border border-outline-variant/60 uppercase hover:bg-surface-container transition-all font-bold text-center"
                >
                  Dữ liệu Telemetry
                </button>
              </div>
            </div>
          </div>

          {/* Spare Parts Quick Card */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-5">
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Package size={18} />
                  </div>
                  <span className="font-extrabold text-sm uppercase tracking-wider text-on-surface">Dự báo phụ tùng</span>
                </div>
                <Badge variant="warning" size="sm">ERP Connected</Badge>
              </div>

              <div className="space-y-4">
                {sparePartsForecast.map((part) => (
                  <div key={part.name} className="p-3.5 rounded-xl bg-surface-container-low/60 border border-outline-variant/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-on-surface truncate pr-2">{part.name}</span>
                      <button
                        onClick={() => handleOrderPart(part.name)}
                        disabled={orderingPart === part.name}
                        className="cursor-pointer text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-colors font-extrabold uppercase shrink-0 flex items-center gap-1"
                      >
                        <ShoppingCart size={12} /> Đặt hàng
                      </button>
                    </div>
                    <ProgressBar
                      value={part.stock}
                      color={part.status === 'critical' ? 'error' : part.status === 'warning' ? 'tertiary' : 'primary'}
                      height="h-2"
                    />
                    <div className="flex justify-between font-mono text-xs text-on-surface-variant mt-1.5 font-semibold">
                      <span>Tồn kho: {part.stock}%</span>
                      <span className={part.status === 'critical' ? 'text-rose-600 font-bold' : ''}>
                        {part.status === 'critical' ? 'Mức tối thiểu' : 'Đang sẵn có'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Health Cards & Active Tickets */}
      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          {/* Equipment Health Cards */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-primary" />
                <h3 className="text-base sm:text-lg font-extrabold text-on-surface">Chỉ số Sức khỏe Thiết bị</h3>
              </div>
              <span className="text-[11px] sm:text-xs text-on-surface-variant/80 font-mono font-semibold">SCADA Realtime Stream</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 stagger">
              {maintenanceList.map((item) => (
                <div
                  key={item.equipment}
                  className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl shadow-xs card-hover border border-outline-variant/35"
                >
                  <div className="flex justify-between items-start mb-2.5">
                    <h4 className="font-extrabold text-on-surface text-sm sm:text-base">{item.equipment}</h4>
                    <Badge variant={item.status === 'critical' ? 'error' : item.status === 'warning' ? 'warning' : 'success'} size="sm">
                      {item.status === 'critical' ? 'Nguy cấp' : item.status === 'warning' ? 'Cảnh báo' : 'Tốt'}
                    </Badge>
                  </div>

                  <ProgressBar
                    value={item.health}
                    color={item.status === 'critical' ? 'error' : item.status === 'warning' ? 'tertiary' : 'success'}
                    showPercent
                    height="h-2"
                  />

                  <p className="text-xs sm:text-sm text-on-surface-variant/80 mt-3 leading-relaxed line-clamp-2 font-medium">
                    {item.description}
                  </p>

                  <div className="mt-3.5 pt-2.5 border-t border-outline-variant/25 flex items-center justify-between">
                    <span className="font-mono text-xs text-on-surface-variant font-bold">Bảo trì: {item.nextMaintenance}</span>
                    <button
                      onClick={() => handleSensorDetails(item.equipment)}
                      className="cursor-pointer text-xs text-primary font-bold hover:underline"
                    >
                      Chi tiết &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Maintenance Tickets */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/35 p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                <h3 className="text-sm sm:text-base font-extrabold text-on-surface">Phiếu Sửa Chữa Đang Xử Lý</h3>
              </div>
              <button
                onClick={() => navigate('/lap-phieu-sua-chua')}
                className="cursor-pointer text-xs font-bold font-mono text-primary hover:underline uppercase"
              >
                + Tạo phiếu
              </button>
            </div>

            <div className="space-y-3.5">
              {tickets.length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant text-sm font-medium">
                  Hiện không có phiếu sửa chữa nào đang chờ.
                </div>
              ) : (
                tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => handlePrintTicket(ticket)}
                    className="cursor-pointer p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container transition-all group"
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="font-mono text-xs font-bold text-primary">{ticket.code}</span>
                      <span
                        className={`
                          text-[11px] font-mono px-2 py-0.5 rounded font-bold uppercase
                          ${ticket.priority === 'urgent' ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20' : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'}
                        `}
                      >
                        {ticket.priority === 'urgent' ? 'Khẩn cấp' : 'Mức cao'}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-on-surface mb-1 group-hover:text-primary transition-colors">
                      {ticket.equipment}
                    </h4>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mb-3 leading-snug font-medium">
                      {ticket.description}
                    </p>

                    <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant pt-2 border-t border-outline-variant/20">
                      <span>Phụ trách: {ticket.assignedTo}</span>
                      <div className="flex items-center gap-1 text-primary font-bold">
                        <Printer size={13} />
                        <span>In phiếu</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Print Modal */}
      <PrintModal isOpen={printOpen} onClose={() => setPrintOpen(false)} data={printData} />
    </div>
  )
}

