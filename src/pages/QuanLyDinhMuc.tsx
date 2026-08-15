import { useNavigate } from 'react-router-dom'
import { Download, FileEdit, Factory, ShieldCheck, TimerOff, Gauge, TrendingUp, Filter } from 'lucide-react'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import ProgressBar from '../components/ui/ProgressBar'
import { productionLines, monthlyComparison, decorativeImages } from '../data/mockData'

export default function QuanLyDinhMuc() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col w-full p-6 animate-fade-in">
      {/* Header */}
      <div className="relative mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-12 h-[2px] bg-primary" />
              <span className="font-mono text-xs text-primary uppercase tracking-[0.2em] font-semibold">Performance Benchmarking</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight">Quản lý Định mức &amp; KPIs</h1>
            <p className="text-base text-on-surface-variant max-w-2xl">
              Thiết lập và theo dõi mục tiêu sản xuất thực tế so với kế hoạch. Hệ thống tự động phân tích độ lệch chuẩn và cảnh báo hiệu suất.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-highest text-on-surface font-semibold rounded-xl hover:bg-surface-container-high transition-all">
              <Download size={18} /> <span className="text-sm">Xuất báo cáo</span>
            </button>
            <button
              onClick={() => navigate('/thiet-lap-muc-tieu-ca-truc')}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-semibold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <FileEdit size={18} /> <span className="text-sm">Cập nhật Định mức</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 stagger">
        {[
          { label: 'Target Yield', value: '42,500', unit: 'Tấn/tháng', trend: '+4.2%', icon: Factory, border: 'border-l-4 border-primary' },
          { label: 'Quality Standard', value: '99.8', unit: '%', progress: 99.8, icon: ShieldCheck, border: '' },
          { label: 'Max Downtime', value: '120', unit: 'Phút/ca', badge: 'Critical Threshold', icon: TimerOff, border: '' },
          { label: 'OEE Benchmark', value: '85.0', unit: '%', progress: 82, icon: Gauge, border: '' },
        ].map((item) => (
          <div key={item.label} className={`group p-5 bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow card-hover ${item.border}`}>
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">{item.label}</span>
              <item.icon size={20} className="text-on-surface-variant/40 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-on-surface">{item.value}</span>
              <span className="font-mono text-xs text-on-surface-variant">{item.unit}</span>
            </div>
            {item.trend && (
              <div className="mt-4 flex items-center gap-2">
                <span className="flex items-center text-[12px] font-bold text-success bg-success-bg px-2 py-0.5 rounded">
                  <TrendingUp size={12} className="mr-1" /> {item.trend}
                </span>
                <span className="text-[11px] text-on-surface-variant italic">vs tháng trước</span>
              </div>
            )}
            {item.progress !== undefined && (
              <div className="mt-4">
                <ProgressBar value={item.progress} height="h-1" />
              </div>
            )}
            {item.badge && (
              <div className="mt-4">
                <span className="text-[12px] font-bold text-error bg-error/10 px-2 py-0.5 rounded">{item.badge}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chart + Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Bar Chart */}
          <div className="p-5 bg-surface-container-lowest rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-on-surface">Thực tế vs Định mức (6 Tháng qua)</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="font-mono text-[11px] text-on-surface-variant uppercase">Thực tế</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-surface-container-highest" />
                  <span className="font-mono text-[11px] text-on-surface-variant uppercase">Định mức</span>
                </div>
              </div>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyComparison} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surface-container-high)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--color-on-surface-variant)' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--color-surface-container-lowest)', border: '1px solid var(--color-outline-variant)', borderRadius: '8px', fontSize: '13px' }} />
                  <Bar dataKey="target" fill="var(--color-surface-container-highest)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Analysis + Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden p-5 gradient-primary rounded-xl text-on-primary">
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-2">Phân tích Hiệu suất</h4>
                <p className="text-sm opacity-90 mb-4">Các dây chuyền mạ đang vượt định mức 12% so với quý trước. Cần điều chỉnh target cho Q3.</p>
                <button className="px-4 py-2 bg-on-primary text-primary font-bold rounded-lg hover:bg-surface transition-colors text-sm">Xem chi tiết</button>
              </div>
              <BarChart className="absolute -right-4 -bottom-4 opacity-10 rotate-12" width={120} height={120} data={[]} />
            </div>
            <div className="rounded-xl bg-cover bg-center min-h-[160px] shadow-md" style={{ backgroundImage: `url('${decorativeImages.dinhMuc}')` }} />
          </div>
        </div>

        {/* Line Progress */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <h3 className="text-lg font-bold text-on-surface">Tiến độ theo Line</h3>
            <Filter size={18} className="text-on-surface-variant" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {productionLines.map((line) => (
              <div key={line.id} className="p-5 hover:bg-surface-container transition-colors border-b border-outline-variant/50 last:border-0">
                <div className="flex justify-between mb-3">
                  <div>
                    <p className="font-mono text-xs text-primary uppercase font-semibold">{line.id.toUpperCase()}</p>
                    <p className="text-sm font-semibold text-on-surface">{line.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-on-surface">{line.progress}%</p>
                    <p className={`font-mono text-[11px] font-bold ${line.trend > 0 ? 'text-success' : line.trend < 0 ? 'text-error' : 'text-on-surface-variant'}`}>
                      {line.trend > 0 ? `+${line.trend}%` : line.trend < 0 ? `${line.trend}%` : 'In Progress'}
                    </p>
                  </div>
                </div>
                <ProgressBar value={line.progress} height="h-2" />
                <div className="flex justify-between font-mono text-[11px] text-on-surface-variant mt-2">
                  <span>Target: {line.target}</span>
                  <span>Actual: {line.actual}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-surface-container-low text-center">
            <button className="text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4">Xem tất cả 12 dây chuyền</button>
          </div>
        </div>
      </div>

      {/* Decorative Images */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="h-32 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url('${decorativeImages.factory1}')` }} />
        <div className="h-32 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url('${decorativeImages.factory2}')` }} />
        <div className="h-32 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url('${decorativeImages.factory3}')` }} />
      </div>
    </div>
  )
}
