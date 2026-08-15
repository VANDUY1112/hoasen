import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Wrench, Calendar, Package, Activity, Zap, CheckCircle2, ShoppingCart, Sparkles } from 'lucide-react'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import { useToast } from '../components/ui/Toast'
import { maintenanceItems, sparePartsForecast, maintenanceTimeline, decorativeImages } from '../data/mockData'

export default function DuBaoBaoTri() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [orderingPart, setOrderingPart] = useState<string | null>(null)

  const handleOrderPart = (partName: string) => {
    setOrderingPart(partName)
    addToast({
      type: 'info',
      title: 'Tạo đề xuất mua sắm ERP',
      message: `Đang lập Purchase Request cho vật tư: ${partName}...`,
    })

    setTimeout(() => {
      setOrderingPart(null)
      addToast({
        type: 'success',
        title: 'Đã phát hành đơn hàng PR-2026-08!',
        message: `Đơn mua ${partName} đã được gửi tới Phòng Mua hàng.`,
      })
    }, 1500)
  }

  const handleSensorDetails = (eqName: string) => {
    addToast({
      type: 'info',
      title: `Telemetry: ${eqName}`,
      message: 'Biên độ rung: 4.8 mm/s RMS | Nhiệt độ ổ bi: 78.5°C | Tần số sóng hài: 120Hz',
    })
  }

  return (
    <div className="flex flex-col w-full animate-fade-in max-w-7xl mx-auto pb-8">
      {/* Header */}
      <section className="px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-primary font-bold">Predictive Intelligence &amp; IoT</span>
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs sm:text-sm text-on-surface-variant font-semibold">Bảo trì dự đoán</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-none mb-3">
            Dự báo &amp; Kế hoạch Bảo trì
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl leading-relaxed">
            Hệ thống cảm biến IoT thu thập rung chấn thời gian thực kết hợp thuật toán AI dự báo hao mòn vòng bi và động cơ.
          </p>
        </div>

        <div className="flex gap-4 items-center bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/40">
          <div className="relative w-14 h-14 flex items-center justify-center">
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
            <span className="font-mono text-sm text-primary font-extrabold">85%</span>
          </div>
          <div>
            <p className="font-mono text-xs uppercase text-on-surface-variant font-bold">Chỉ số Sức khỏe TB</p>
            <p className="text-lg font-extrabold text-on-surface">Vận hành Ổn định</p>
          </div>
        </div>
      </section>

      {/* Urgent Alert & Spare Parts Row */}
      <section className="px-4 sm:px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Critical Alert Card */}
          <div className="lg:col-span-8 bg-rose-500/5 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row gap-6 items-center border border-rose-500/25 relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <AlertTriangle size={140} className="text-rose-600" />
            </div>

            <div className="relative z-10 w-full md:w-48 shrink-0">
              <div
                className="aspect-square w-full rounded-2xl bg-cover bg-center shadow-md border border-rose-500/20"
                style={{ backgroundImage: `url('${decorativeImages.maintenance}')` }}
              />
            </div>

            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2.5 mb-2.5">
                <Badge variant="error" pulse size="sm">Cần bảo trì khẩn cấp</Badge>
                <span className="font-mono text-sm text-rose-700 font-extrabold">Hỏng hóc trong 48h</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-2.5">Trục cán chính - Line 01</h3>
              <p className="text-sm sm:text-base text-on-surface-variant mb-5 leading-relaxed font-medium">
                Cảm biến phát hiện rung chấn bất thường tại ổ đỡ trục phía Đông. Dự báo mòn rãnh bi SKF 22320 nếu không thay thế trước ca tối.
              </p>
              <div className="flex flex-wrap gap-3.5">
                <button
                  onClick={() => navigate('/lap-phieu-sua-chua')}
                  className="bg-primary text-on-primary px-6 py-3 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider hover:bg-on-primary-fixed-variant transition-all shadow-md shadow-primary/20 font-bold"
                >
                  Lập phiếu sửa chữa
                </button>
                <button
                  onClick={() => handleSensorDetails('Trục cán chính - Line 01')}
                  className="bg-surface-container-lowest text-on-surface px-5 py-3 rounded-xl font-mono text-xs sm:text-sm border border-outline-variant/60 uppercase hover:bg-surface-container transition-all font-bold"
                >
                  Chi tiết cảm biến
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
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-colors font-extrabold uppercase shrink-0 flex items-center gap-1"
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

      {/* Equipment Health Cards & Timeline */}
      <section className="px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Equipment Health Cards */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity size={20} className="text-primary" />
                <h3 className="text-lg sm:text-xl font-extrabold text-on-surface">Chỉ số Sức khỏe Thiết bị</h3>
              </div>
              <span className="text-xs sm:text-sm text-on-surface-variant font-mono font-semibold">SCADA Realtime Stream</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger">
              {maintenanceItems.map((item) => (
                <div
                  key={item.equipment}
                  className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm card-hover border border-outline-variant/40"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-extrabold text-on-surface text-base">{item.equipment}</h4>
                    <Badge variant={item.status === 'critical' ? 'error' : item.status === 'warning' ? 'warning' : 'success'} size="sm">
                      {item.status === 'critical' ? 'Nguy cấp' : item.status === 'warning' ? 'Cảnh báo' : 'Tốt'}
                    </Badge>
                  </div>

                  <ProgressBar
                    value={item.health}
                    color={item.status === 'critical' ? 'error' : item.status === 'warning' ? 'tertiary' : 'success'}
                    showPercent
                    height="h-2.5"
                  />

                  <p className="text-sm text-on-surface-variant mt-3.5 leading-relaxed line-clamp-2 font-medium">
                    {item.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between">
                    <span className="font-mono text-xs sm:text-sm text-on-surface-variant font-bold">Lịch bảo trì: {item.nextMaintenance}</span>
                    <button
                      onClick={() => handleSensorDetails(item.equipment)}
                      className="text-xs sm:text-sm text-primary font-bold hover:underline"
                    >
                      Chi tiết &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Timeline */}
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40 p-6">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-outline-variant/40">
              <Calendar size={20} className="text-primary" />
              <h3 className="text-base sm:text-lg font-extrabold text-on-surface">Lịch Trình Bảo Trì Ca</h3>
            </div>

            <div className="space-y-4">
              {maintenanceTimeline.map((item, i) => (
                <div key={i} className="flex gap-3.5 items-start">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3.5 h-3.5 rounded-full ${
                        item.priority === 'urgent'
                          ? 'bg-rose-600 animate-ping'
                          : item.priority === 'high'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    {i < maintenanceTimeline.length - 1 && (
                      <div className="w-0.5 h-10 bg-outline-variant/40 mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-3">
                    <p className="font-mono text-xs sm:text-sm text-on-surface-variant font-extrabold">{item.date}</p>
                    <p className="text-sm font-bold text-on-surface mt-0.5">{item.task}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
