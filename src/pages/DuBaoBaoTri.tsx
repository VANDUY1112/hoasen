import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Wrench, Calendar, Package } from 'lucide-react'
import ProgressBar from '../components/ui/ProgressBar'
import { maintenanceItems, sparePartsForecast, maintenanceTimeline, decorativeImages } from '../data/mockData'

export default function DuBaoBaoTri() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col w-full animate-fade-in">
      {/* Header */}
      <section className="px-6 py-8 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-12 h-[2px] bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-semibold">Predictive Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-none mb-4">Dự báo &amp; Kế hoạch Bảo trì</h1>
          <p className="text-base text-on-surface-variant max-w-lg">
            Hệ thống cảnh báo sớm dựa trên thời gian vận hành thực tế và thuật toán học máy về hao mòn vật liệu.
          </p>
        </div>
        <div className="flex gap-4 items-center bg-surface-container-low p-4 rounded-xl shadow-sm border border-outline-variant/30">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle className="stroke-surface-container-highest" cx="18" cy="18" fill="none" r="16" strokeWidth="3" />
              <circle className="stroke-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="15" strokeLinecap="round" strokeWidth="3" />
            </svg>
            <span className="font-mono text-xs text-primary font-bold">85%</span>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase text-on-surface-variant">Chỉ số Sức khỏe TB</p>
            <p className="text-lg font-bold text-on-surface">Ổn định</p>
          </div>
        </div>
      </section>

      {/* Urgent Alert + Spare Parts */}
      <section className="px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Critical Alert */}
          <div className="lg:col-span-8 bg-error-container/20 rounded-xl p-5 flex flex-col md:flex-row gap-8 items-center border border-error/20 relative overflow-hidden group animate-pulse-glow">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertTriangle size={120} className="text-error" />
            </div>
            <div className="relative z-10 w-full md:w-1/3">
              <div className="aspect-square w-full rounded-xl bg-cover bg-center shadow-md" style={{ backgroundImage: `url('${decorativeImages.maintenance}')` }} />
            </div>
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="animate-pulse w-3 h-3 rounded-full bg-error" />
                <span className="font-mono text-xs text-error font-bold uppercase tracking-[0.15em]">Máy cần bảo trì ngay</span>
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">Trục cán chính - Line 01</h3>
              <p className="text-sm text-on-surface-variant mb-6">
                Phát hiện rung chấn bất thường tại ổ đỡ trục phía Đông. Dự báo hỏng hóc trong vòng 48 giờ tới nếu không can thiệp.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/lap-phieu-sua-chua')}
                  className="bg-primary text-on-primary px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Lập phiếu sửa chữa
                </button>
                <button className="bg-surface-container-lowest text-on-surface px-6 py-3 rounded-xl font-mono text-xs border border-outline-variant uppercase hover:bg-surface-container-high transition-all">
                  Chi tiết cảm biến
                </button>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            {/* Spare Parts */}
            <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-xs uppercase text-on-surface-variant">Dự báo phụ tùng</span>
                <Package size={18} className="text-tertiary" />
              </div>
              <div className="space-y-4">
                {sparePartsForecast.map((part) => (
                  <div key={part.name}>
                    <div className="flex justify-between font-mono text-[11px] mb-1">
                      <span>{part.name}</span>
                      <span className={`font-bold ${part.status === 'critical' ? 'text-error' : part.status === 'warning' ? 'text-on-surface-variant' : 'text-success'}`}>
                        {part.status === 'critical' ? 'Cần đặt hàng' : `Còn ${part.stock}%`}
                      </span>
                    </div>
                    <ProgressBar
                      value={part.stock}
                      color={part.status === 'critical' ? 'error' : part.status === 'warning' ? 'tertiary' : 'primary'}
                      height="h-1"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Quick Info */}
            <div className="bg-inverse-surface text-inverse-on-surface p-5 rounded-xl shadow-xl flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <Wrench size={22} className="text-inverse-primary" />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase opacity-70">Phiếu bảo trì mở</p>
                <p className="text-2xl font-bold">07</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Health + Timeline */}
      <section className="px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Equipment Health Cards */}
          <div className="lg:col-span-8">
            <h3 className="text-lg font-bold text-on-surface mb-4">Sức khỏe Thiết bị</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger">
              {maintenanceItems.map((item) => (
                <div key={item.equipment} className="bg-surface-container-lowest p-5 rounded-xl shadow-sm card-hover border border-outline-variant/20">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-on-surface text-sm">{item.equipment}</h4>
                    <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase font-semibold ${
                      item.status === 'critical' ? 'bg-error/10 text-error' :
                      item.status === 'warning' ? 'bg-warning-bg text-warning' :
                      'bg-success-bg text-success'
                    }`}>
                      {item.status === 'critical' ? 'Nghiêm trọng' : item.status === 'warning' ? 'Cảnh báo' : 'Tốt'}
                    </span>
                  </div>
                  <ProgressBar
                    value={item.health}
                    color={item.status === 'critical' ? 'error' : item.status === 'warning' ? 'tertiary' : 'success'}
                    showPercent
                    height="h-2"
                  />
                  <p className="text-xs text-on-surface-variant mt-2">Bảo trì tiếp: {item.nextMaintenance}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Timeline */}
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={18} className="text-primary" />
              <h3 className="text-lg font-bold text-on-surface">Lịch Bảo trì</h3>
            </div>
            <div className="space-y-4">
              {maintenanceTimeline.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      item.priority === 'urgent' ? 'bg-error animate-pulse' :
                      item.priority === 'high' ? 'bg-warning' : 'bg-surface-container-highest'
                    }`} />
                    {i < maintenanceTimeline.length - 1 && <div className="w-0.5 h-10 bg-outline-variant/40 mt-1" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-mono text-[11px] text-on-surface-variant">{item.date}</p>
                    <p className="text-sm font-medium text-on-surface">{item.task}</p>
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
