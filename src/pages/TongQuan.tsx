import { Layers, AlertTriangle, TimerOff, Share2, Download, Brain } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import KpiCard from '../components/ui/KpiCard'
import GaugeChart from '../components/ui/GaugeChart'
import { kpiData, weeklyProduction, defectRecords, decorativeImages } from '../data/mockData'

export default function TongQuan() {
  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 sm:gap-8 animate-fade-in">
      {/* Page Header */}
      <section className="relative flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-on-surface tracking-tighter">
            Bảng điều khiển <span className="text-primary">Tổng quan</span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <div className="bg-surface-container px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">Trực tuyến</span>
          </div>
          <button className="bg-surface-container text-on-surface-variant px-4 sm:px-6 py-2 font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-surface-container-high transition-colors shadow-sm rounded-lg">
            <Share2 size={16} /> Xuất dữ liệu
          </button>
          <button className="bg-primary text-on-primary px-4 sm:px-6 py-2 font-mono text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-on-primary-fixed-variant transition-colors shadow-md rounded-lg">
            <Download size={16} /> Xuất báo cáo
          </button>
        </div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 stagger">
        <KpiCard
          title="Sản lượng trong ngày"
          value={kpiData.dailyOutput.value.toLocaleString()}
          subtitle={kpiData.dailyOutput.unit}
          trend={kpiData.dailyOutput.trend}
          trendLabel="so với hôm qua"
          icon={<Layers size={48} />}
        />
        <KpiCard
          title="Số lỗi phát hiện"
          value={kpiData.defectCount.value}
          subtitle={kpiData.defectCount.unit}
          trend={kpiData.defectCount.trend}
          trendLabel="mục tiêu giảm lỗi"
          accentColor="error"
          icon={<AlertTriangle size={48} />}
        />
        <KpiCard
          title="Dừng máy (Downtime)"
          value={kpiData.downtime.value}
          subtitle={kpiData.downtime.unit}
          resolved={kpiData.downtime.resolved}
          icon={<TimerOff size={48} />}
        />
      </section>

      {/* OEE Gauge + Weekly Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* OEE Gauge */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-5 shadow-md flex flex-col items-center justify-center relative overflow-hidden rounded-xl animate-scale-in">
          <div className="absolute top-4 left-4">
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-[0.15em]">
              Hiệu suất dây chuyền
            </span>
          </div>
          <div className="mt-6">
            <GaugeChart value={kpiData.oee.value} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 w-full">
            <div className="text-center border-r border-outline-variant">
              <p className="text-[11px] font-mono text-on-surface-variant uppercase">Khả dụng</p>
              <p className="text-xl font-bold text-on-surface">{kpiData.oee.availability}%</p>
            </div>
            <div className="text-center">
              <p className="text-[11px] font-mono text-on-surface-variant uppercase">Chất lượng</p>
              <p className="text-xl font-bold text-primary">{kpiData.oee.quality}%</p>
            </div>
          </div>
        </div>

        {/* Weekly Bar Chart */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-5 shadow-md rounded-xl animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <span className="font-mono text-xs text-on-surface-variant uppercase tracking-[0.15em]">
                So sánh sản lượng ngày
              </span>
              <h3 className="text-xl font-bold text-on-surface mt-1">Sản lượng tuần hiện tại</h3>
            </div>
            <div className="flex gap-6 items-center">
              <span className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                <span className="w-3.5 h-3.5 bg-primary rounded-sm" /> Thực tế
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                <span className="w-3.5 h-3.5 bg-surface-container-high rounded-sm" /> Kế hoạch
              </span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyProduction} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surface-container-high)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 13, fontWeight: 600, fill: 'var(--color-on-surface-variant)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-surface-container-lowest)',
                    border: '1px solid var(--color-outline-variant)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                  }}
                />
                <Bar dataKey="planned" fill="var(--color-surface-container-high)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="var(--color-primary)" radius={[4, 4, 0, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Error Table + Motivation Card */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Error Table */}
        <div className="lg:col-span-2 bg-surface-container-lowest shadow-md overflow-hidden rounded-xl animate-slide-up">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-primary" />
              <h3 className="text-lg font-bold text-on-surface">Lỗi hệ thống thường gặp</h3>
            </div>
            <span className="font-mono text-xs text-on-surface-variant uppercase">30 Ngày qua</span>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="bg-surface">
                  <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase">Mã lỗi</th>
                  <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase">Loại lỗi</th>
                  <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase">Tần suất</th>
                  <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase text-right">Mức độ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50">
                {defectRecords.map((d) => (
                  <tr key={d.code} className="hover:bg-surface-container transition-colors">
                    <td className="px-4 py-3 font-mono text-primary font-bold text-sm">{d.code}</td>
                    <td className="px-4 py-3 text-[15px] text-on-surface">{d.type}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-surface-container-high rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${(d.frequency / 50) * 100}%` }} />
                        </div>
                        <span className="font-mono text-xs">{d.frequency} lần</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`px-2.5 py-1 rounded-full font-mono text-[11px] uppercase font-semibold ${
                        d.severity === 'high' ? 'bg-error/10 text-error' :
                        d.severity === 'medium' ? 'bg-warning-bg text-warning' :
                        'bg-surface-container text-on-surface-variant'
                      }`}>
                        {d.severity === 'high' ? 'Cao' : d.severity === 'medium' ? 'TB' : 'Thấp'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Motivation Card */}
        <div className="gradient-primary p-5 flex flex-col justify-between text-on-primary relative overflow-hidden shadow-xl rounded-xl animate-scale-in">
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
            <img className="w-full h-full object-cover" src={decorativeImages.banner} alt="" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent z-10" />
          <div className="relative z-20">
            <Brain size={40} className="mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-4 leading-tight">Cải thiện năng lực điều hành</h3>
            <p className="text-[15px] text-on-primary/90 leading-relaxed">
              Mỗi thông số được ghi nhận là một cơ hội để tinh chỉnh quy trình. "Sau vài tháng bạn sẽ biết mình yếu ở đâu để cải thiện."
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
