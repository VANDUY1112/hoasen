import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, FileEdit, Factory, ShieldCheck, TimerOff, Gauge, TrendingUp, Sparkles, Zap } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import { useToast } from '../components/ui/Toast'
import { productionLines, monthlyComparison, decorativeImages } from '../data/mockData'

export default function QuanLyDinhMuc() {
  const navigate = useNavigate()
  const { addToast } = useToast()

  const handleExport = () => {
    addToast({
      type: 'success',
      title: 'Kết xuất Định mức & KPIs',
      message: 'Báo cáo định mức Q3_2026_HoaSen.xlsx đã được tạo thành công.',
    })
  }

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6 lg:py-8 gap-5 sm:gap-6 lg:gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-5">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
            Quản lý Định mức &amp; KPIs
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-on-surface-variant/80 max-w-3xl leading-relaxed font-medium">
            Thiết lập và theo dõi mục tiêu sản xuất thực tế so với kế hoạch. Hệ thống tự động phân tích độ lệch chuẩn và cảnh báo hiệu suất.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleExport}
            className="cursor-pointer flex items-center justify-center gap-2 px-5 py-3 bg-surface-container-lowest text-on-surface font-bold rounded-xl hover:bg-surface-container transition-all text-xs sm:text-sm lg:text-base uppercase font-mono tracking-wider border border-outline-variant/40 shadow-2xs"
          >
            <Download size={17} className="text-primary shrink-0" /> <span className="truncate">Xuất báo cáo</span>
          </button>
          <button
            onClick={() => navigate('/thiet-lap-muc-tieu-ca-truc')}
            className="cursor-pointer flex items-center justify-center gap-2 px-5 py-3 bg-primary text-on-primary font-extrabold rounded-xl shadow-xs shadow-primary/20 hover:bg-on-primary-fixed-variant transition-all text-xs sm:text-sm lg:text-base uppercase font-mono tracking-wider"
          >
            <FileEdit size={17} /> <span className="truncate">Cập nhật Định mức</span>
          </button>
        </div>
      </div>

      {/* Top Stats - Minimalist & Unified Brand Design */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 stagger">
        {[
          { label: 'Target Yield', value: '42,500', unit: 'Tấn/tháng', trend: '+4.2%', icon: Factory },
          { label: 'Quality Standard', value: '99.8', unit: '%', progress: 99.8, icon: ShieldCheck },
          { label: 'Max Downtime', value: '120', unit: 'Phút/ca', badge: 'Ngưỡng tối đa', icon: TimerOff },
          { label: 'OEE Benchmark', value: '85.0', unit: '%', progress: 82, icon: Gauge },
        ].map((item) => (
          <div
            key={item.label}
            className="group p-5 sm:p-6 lg:p-7 bg-surface-container-lowest rounded-2xl shadow-xs hover:shadow-md transition-all card-hover border border-outline-variant/30 hover:border-primary/40 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold">{item.label}</span>
              <div className="p-2.5 sm:p-3 rounded-2xl shrink-0 transition-transform group-hover:scale-110 bg-primary/10 text-primary border border-primary/20">
                <item.icon size={20} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface font-mono group-hover:text-primary transition-colors">{item.value}</span>
              <span className="font-mono text-xs sm:text-sm text-on-surface-variant font-bold">{item.unit}</span>
            </div>
            {item.trend && (
              <div className="mt-3 flex items-center gap-2">
                <span className="flex items-center text-xs sm:text-sm font-bold text-primary bg-primary/10 px-2.5 py-1 rounded font-mono">
                  <TrendingUp size={15} className="mr-1" /> {item.trend}
                </span>
                <span className="text-xs sm:text-sm text-on-surface-variant/70 italic font-medium">vs tháng trước</span>
              </div>
            )}
            {item.progress !== undefined && (
              <div className="mt-3">
                <ProgressBar value={item.progress} height="h-2" />
              </div>
            )}
            {item.badge && (
              <div className="mt-3">
                <Badge variant="neutral" size="md">{item.badge}</Badge>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chart & Progress by Line */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        <div className="lg:col-span-8 space-y-5 sm:space-y-6">
          {/* Smooth Wave Area Chart */}
          <div className="p-4 sm:p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40 relative overflow-hidden flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4">
              <div>
                <span className="font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold">Theo dõi đa kỳ</span>
                <h3 className="text-base sm:text-xl font-extrabold text-on-surface mt-0.5">Thực tế vs Định mức (6 Tháng qua)</h3>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs sm:text-sm font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-on-surface">Thực tế</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-400" />
                  <span className="text-on-surface-variant">Định mức</span>
                </div>
              </div>
            </div>

            <div className="h-60 sm:h-72 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] -mx-4 sm:-mx-6 -mb-4 sm:-mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyComparison} margin={{ top: 10, right: 0, left: 0, bottom: 8 }}>
                  <defs>
                    <linearGradient id="dinhMucActualGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b5000b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#b5000b" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="dinhMucTargetGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline-variant)" strokeOpacity={0.3} vertical={false} />
                  <XAxis
                    dataKey="month"
                    interval={0}
                    padding={{ left: 24, right: 24 }}
                    tick={{ fontSize: 13, fontWeight: 700, fill: 'var(--color-on-surface-variant)' }}
                    tickMargin={8}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis domain={[65, 100]} hide />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0]?.payload
                        const actualVal = payload.find((p) => p.dataKey === 'actual')?.value
                        const targetVal = payload.find((p) => p.dataKey === 'target')?.value
                        return (
                          <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/40 shadow-lg text-xs">
                            <p className="font-mono font-bold text-on-surface uppercase mb-1.5">{item?.fullMonth || item?.month}</p>
                            <div className="space-y-1 font-mono">
                              <div className="flex items-center justify-between gap-3 text-primary font-bold">
                                <span>Sản lượng Thực tế:</span>
                                <span>{actualVal}%</span>
                              </div>
                              <div className="flex items-center justify-between gap-3 text-on-surface-variant font-medium">
                                <span>Mục tiêu Định mức:</span>
                                <span>{targetVal}%</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    name="Định mức"
                    stroke="#94a3b8"
                    strokeWidth={2.5}
                    strokeDasharray="4 4"
                    fill="url(#dinhMucTargetGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    name="Thực tế"
                    stroke="#b5000b"
                    strokeWidth={3}
                    fill="url(#dinhMucActualGrad)"
                    dot={{ r: 4, fill: '#b5000b', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Analysis & Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative overflow-hidden p-6 gradient-primary rounded-2xl text-on-primary shadow-lg shadow-primary/15 flex flex-col justify-between">
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold uppercase mb-2 opacity-90">
                  <Sparkles size={16} /> Phân tích Hiệu suất Q3
                </div>
                <h4 className="text-xl sm:text-2xl font-extrabold mb-2">Dây chuyền mạ vượt 12%</h4>
                <p className="text-sm opacity-90 leading-relaxed mb-4 font-medium">
                  Các dây chuyền mạ tốc độ cao đang duy trì hiệu suất vượt trội so với kế hoạch quý. Đề xuất nâng target tháng 9 lên 45,000 Tấn.
                </p>
              </div>
              <button
                onClick={() => addToast({ type: 'info', title: 'Phân tích Dây chuyền', message: 'Tỷ lệ phế phẩm giảm 0.4% nhờ ổn định nhiệt độ lò ủ.' })}
                className="px-5 py-2.5 bg-on-primary text-primary font-extrabold rounded-xl hover:bg-surface transition-colors text-xs sm:text-sm w-fit"
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
            <h3 className="text-base sm:text-lg font-extrabold text-on-surface">Tiến độ theo Line Sản xuất</h3>
            <Badge variant="primary" size="sm">4 Line chính</Badge>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/30">
            {productionLines.map((line) => (
              <div key={line.id} className="p-5 hover:bg-surface-container/60 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-mono text-xs sm:text-sm text-primary uppercase font-extrabold">{line.id.toUpperCase()}</span>
                    <p className="text-sm sm:text-base font-bold text-on-surface mt-0.5">{line.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-extrabold text-on-surface font-mono">{line.progress}%</p>
                    <p className={`font-mono text-xs font-bold ${line.trend > 0 ? 'text-emerald-600' : line.trend < 0 ? 'text-rose-600' : 'text-on-surface-variant'}`}>
                      {line.trend > 0 ? `+${line.trend}%` : line.trend < 0 ? `${line.trend}%` : 'Đang chạy'}
                    </p>
                  </div>
                </div>

                <ProgressBar value={line.progress} height="h-2.5" />

                <div className="flex justify-between font-mono text-xs text-on-surface-variant mt-2.5 pt-1.5 border-t border-outline-variant/20 font-semibold">
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
