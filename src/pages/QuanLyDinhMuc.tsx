import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, FileEdit, Factory, ShieldCheck, TimerOff, Gauge, TrendingUp, Filter, Sparkles, Zap } from 'lucide-react'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import { useToast } from '../components/ui/Toast'
import { productionLines, monthlyComparison, decorativeImages } from '../data/mockData'

export default function QuanLyDinhMuc() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [selectedMetric, setSelectedMetric] = useState<'output' | 'scrap' | 'power'>('output')

  const handleExport = () => {
    addToast({
      type: 'success',
      title: 'Kết xuất Định mức & KPIs',
      message: 'Báo cáo định mức Q3_2026_HoaSen.xlsx đã được tạo thành công.',
    })
  }

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 sm:gap-8 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">Performance Benchmarking</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs text-on-surface-variant font-medium">Quản trị Định mức</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight">
            Quản lý Định mức &amp; KPIs
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
            Thiết lập và theo dõi mục tiêu sản xuất thực tế so với kế hoạch. Hệ thống tự động phân tích độ lệch chuẩn và cảnh báo hiệu suất.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-highest text-on-surface font-semibold rounded-xl hover:bg-surface-container-high transition-all text-xs uppercase font-mono tracking-wider border border-outline-variant/40"
          >
            <Download size={16} /> Xuất báo cáo
          </button>
          <button
            onClick={() => navigate('/thiet-lap-muc-tieu-ca-truc')}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-bold rounded-xl shadow-md shadow-primary/20 hover:bg-on-primary-fixed-variant transition-all text-xs uppercase font-mono tracking-wider"
          >
            <FileEdit size={16} /> Cập nhật Định mức
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 stagger">
        {[
          { label: 'Target Yield', value: '42,500', unit: 'Tấn/tháng', trend: '+4.2%', icon: Factory, border: 'border-l-4 border-l-primary' },
          { label: 'Quality Standard', value: '99.8', unit: '%', progress: 99.8, icon: ShieldCheck, border: 'border-l-4 border-l-emerald-500' },
          { label: 'Max Downtime', value: '120', unit: 'Phút/ca', badge: 'Critical Threshold', icon: TimerOff, border: 'border-l-4 border-l-amber-500' },
          { label: 'OEE Benchmark', value: '85.0', unit: '%', progress: 82, icon: Gauge, border: 'border-l-4 border-l-sky-500' },
        ].map((item) => (
          <div
            key={item.label}
            className={`group p-6 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-shadow card-hover border border-outline-variant/40 ${item.border}`}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-xs text-on-surface-variant uppercase font-semibold">{item.label}</span>
              <div className="p-2 rounded-xl bg-surface-container text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                <item.icon size={18} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-on-surface font-mono">{item.value}</span>
              <span className="font-mono text-xs text-on-surface-variant font-medium">{item.unit}</span>
            </div>
            {item.trend && (
              <div className="mt-3 flex items-center gap-2">
                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md font-mono">
                  <TrendingUp size={13} className="mr-1" /> {item.trend}
                </span>
                <span className="text-[11px] text-on-surface-variant italic">vs tháng trước</span>
              </div>
            )}
            {item.progress !== undefined && (
              <div className="mt-3">
                <ProgressBar value={item.progress} height="h-1.5" />
              </div>
            )}
            {item.badge && (
              <div className="mt-3">
                <Badge variant="warning" size="sm">{item.badge}</Badge>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chart & Progress by Line */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Bar Chart */}
          <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Theo dõi đa kỳ</span>
                <h3 className="text-lg font-bold text-on-surface mt-0.5">Thực tế vs Định mức (6 Tháng qua)</h3>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-md bg-primary" />
                  <span className="text-on-surface">Thực tế</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-md bg-surface-container-highest" />
                  <span className="text-on-surface-variant">Định mức</span>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyComparison} barGap={6}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surface-container-high)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--color-on-surface-variant)' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--color-surface-container-lowest)',
                      border: '1px solid var(--color-outline-variant)',
                      borderRadius: '12px',
                      fontSize: '13px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    }}
                  />
                  <Bar dataKey="target" fill="var(--color-surface-container-highest)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="actual" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Analysis & Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative overflow-hidden p-6 gradient-primary rounded-2xl text-on-primary shadow-lg shadow-primary/15 flex flex-col justify-between">
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase mb-2 opacity-90">
                  <Sparkles size={16} /> Phân tích Hiệu suất Q3
                </div>
                <h4 className="text-xl font-bold mb-2">Dây chuyền mạ vượt 12%</h4>
                <p className="text-xs opacity-90 leading-relaxed mb-4">
                  Các dây chuyền mạ tốc độ cao đang duy trì hiệu suất vượt trội so với kế hoạch quý. Đề xuất nâng target tháng 9 lên 45,000 Tấn.
                </p>
              </div>
              <button
                onClick={() => addToast({ type: 'info', title: 'Phân tích Dây chuyền', message: 'Tỷ lệ phế phẩm giảm 0.4% nhờ ổn định nhiệt độ lò ủ.' })}
                className="px-4 py-2 bg-on-primary text-primary font-bold rounded-xl hover:bg-surface transition-colors text-xs w-fit"
              >
                Xem khuyến nghị chi tiết
              </button>
            </div>

            <div
              className="rounded-2xl bg-cover bg-center min-h-[180px] shadow-md border border-outline-variant/30"
              style={{ backgroundImage: `url('${decorativeImages.dinhMuc}')` }}
            />
          </div>
        </div>

        {/* Progress by Line */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-outline-variant/40 flex justify-between items-center bg-surface-container-low/60">
            <h3 className="text-base font-bold text-on-surface">Tiến độ theo Line Sản xuất</h3>
            <Badge variant="primary" size="sm">4 Line chính</Badge>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/30">
            {productionLines.map((line) => (
              <div key={line.id} className="p-5 hover:bg-surface-container/60 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-mono text-xs text-primary uppercase font-bold">{line.id.toUpperCase()}</span>
                    <p className="text-sm font-bold text-on-surface mt-0.5">{line.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-extrabold text-on-surface font-mono">{line.progress}%</p>
                    <p className={`font-mono text-[11px] font-bold ${line.trend > 0 ? 'text-emerald-600' : line.trend < 0 ? 'text-rose-600' : 'text-on-surface-variant'}`}>
                      {line.trend > 0 ? `+${line.trend}%` : line.trend < 0 ? `${line.trend}%` : 'Đang chạy'}
                    </p>
                  </div>
                </div>

                <ProgressBar value={line.progress} height="h-2" />

                <div className="flex justify-between font-mono text-[11px] text-on-surface-variant mt-2 pt-1 border-t border-outline-variant/20">
                  <span>Mục tiêu: {line.target}</span>
                  <span className="font-bold text-on-surface">Đạt: {line.actual}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
