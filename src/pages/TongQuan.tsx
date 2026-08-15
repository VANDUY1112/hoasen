import { useState } from 'react'
import { Layers, AlertTriangle, TimerOff, Share2, Download, Brain, Sparkles, TrendingUp, ArrowUpRight, Zap, RefreshCw, FileSpreadsheet } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import KpiCard from '../components/ui/KpiCard'
import GaugeChart from '../components/ui/GaugeChart'
import Badge from '../components/ui/Badge'
import { useToast } from '../components/ui/Toast'
import { useLiveSimulation } from '../context/LiveSimulationContext'
import { exportExecutiveSummary, exportProductionReport } from '../services/excelExport'
import { weeklyProduction, defectRecords, decorativeImages } from '../data/mockData'

const timeRanges = [
  { id: 'today', label: 'Hôm nay' },
  { id: '7days', label: '7 ngày qua' },
  { id: '30days', label: 'Tháng này' },
]

export default function TongQuan() {
  const [activeTimeRange, setActiveTimeRange] = useState('7days')
  const [isDiagnosing, setIsDiagnosing] = useState(false)
  const [exporting, setExporting] = useState(false)

  const { dailyOutput, liveOee, liveLogs } = useLiveSimulation()
  const { addToast } = useToast()

  const handleExportExcelSummary = async () => {
    try {
      setExporting(true)
      addToast({
        type: 'info',
        title: 'Đang tạo Báo cáo Tổng hợp Ban Giám Đốc...',
        message: 'Áp dụng format tiêu chuẩn Hoa Sen Group...',
      })

      await exportExecutiveSummary()

      addToast({
        type: 'success',
        title: 'Xuất Báo Cáo Thành Công!',
        message: 'Tệp Excel báo cáo KPI Giám đốc đã được tải về máy.',
      })
    } catch (e) {
      addToast({
        type: 'error',
        title: 'Lỗi xuất file',
        message: 'Vui lòng kiểm tra lại quyền lưu file trên trình duyệt.',
      })
    } finally {
      setExporting(false)
    }
  }

  const handleExportProductionExcel = async () => {
    try {
      setExporting(true)
      addToast({
        type: 'info',
        title: 'Đang kết xuất dữ liệu sản lượng...',
        message: 'Tập hợp tất cả cuộn tôn từ ca sáng đến nay...',
      })

      await exportProductionReport(liveLogs)

      addToast({
        type: 'success',
        title: 'Đã xuất tệp Excel Sản lượng!',
        message: 'Tệp chứa đầy đủ định dạng màu và công thức tính tổng.',
      })
    } catch (e) {
      addToast({
        type: 'error',
        title: 'Lỗi xuất file',
        message: 'Có lỗi xảy ra khi tạo tệp Excel.',
      })
    } finally {
      setExporting(false)
    }
  }

  const handleRunAiDiagnosis = () => {
    setIsDiagnosing(true)
    addToast({
      type: 'info',
      title: 'AI Diagnostic Engine',
      message: 'Đang quét toàn bộ 12 dây chuyền và phân tích quang phổ rung chấn...',
    })

    setTimeout(() => {
      setIsDiagnosing(false)
      addToast({
        type: 'warning',
        title: 'Phát hiện rủi ro tiềm ẩn (AI Alert)',
        message: 'Dây chuyền Mạ Kẽm 04 có nguy cơ nghẹt béc phun dung dịch mạ trong 12 giờ tới.',
      })
    }, 2000)
  }

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 sm:gap-8 animate-fade-in max-w-7xl mx-auto">
      {/* Page Header */}
      <section className="relative flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs sm:text-sm text-primary uppercase font-bold tracking-wider">Executive Overview</span>
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs sm:text-sm text-on-surface-variant font-semibold">Bảng điều khiển trung tâm</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight">
            Bảng điều khiển <span className="text-primary">Tổng quan</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Time Filter Tabs */}
          <div className="flex bg-surface-container p-1 rounded-xl gap-1">
            {timeRanges.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTimeRange(t.id)}
                className={`
                  px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150
                  ${activeTimeRange === t.id
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                  }
                `}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleRunAiDiagnosis}
            disabled={isDiagnosing}
            className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 px-4 py-2.5 font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 font-bold rounded-xl transition-all shadow-xs"
          >
            <Sparkles size={16} className={isDiagnosing ? 'animate-spin' : ''} />
            {isDiagnosing ? 'Đang chẩn đoán...' : 'Chẩn đoán AI'}
          </button>

          <button
            onClick={handleExportProductionExcel}
            disabled={exporting}
            className="bg-surface-container-lowest text-on-surface border border-outline-variant/50 px-4 py-2.5 font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 font-bold rounded-xl hover:bg-surface-container transition-colors shadow-xs"
          >
            <FileSpreadsheet size={16} className="text-emerald-600" /> Xuất Excel
          </button>

          <button
            onClick={handleExportExcelSummary}
            disabled={exporting}
            className="bg-primary text-on-primary px-5 py-2.5 font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 font-extrabold rounded-xl hover:bg-on-primary-fixed-variant transition-all shadow-md shadow-primary/20"
          >
            <Download size={16} /> Báo cáo Giám Đốc
          </button>
        </div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* KPI Cards with Live SCADA Data */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 stagger">
        <KpiCard
          title="Sản lượng trong ngày (Live)"
          value={dailyOutput.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          subtitle="Tấn thành phẩm / 24h"
          trend={12.5}
          trendLabel="so với hôm qua"
          icon={<Layers size={48} />}
        />
        <KpiCard
          title="Số lỗi phát hiện"
          value={14}
          subtitle="Trường hợp kiểm định"
          trend={-2.4}
          trendLabel="mục tiêu giảm lỗi"
          accentColor="error"
          icon={<AlertTriangle size={48} />}
        />
        <KpiCard
          title="Dừng máy (Downtime)"
          value={42}
          subtitle="Phút vận hành gián đoạn"
          resolved={true}
          icon={<TimerOff size={48} />}
        />
      </section>

      {/* OEE Gauge + Weekly Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* OEE Gauge */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/40 flex flex-col items-center justify-center relative overflow-hidden rounded-2xl animate-scale-in">
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold">
              Hiệu suất tổng thể OEE
            </span>
            <Badge variant="primary" pulse size="sm">SCADA Stream</Badge>
          </div>

          <div className="mt-8">
            <GaugeChart value={Math.round(liveOee)} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 w-full pt-4 border-t border-outline-variant/30">
            <div className="text-center border-r border-outline-variant/40">
              <p className="text-xs sm:text-sm font-mono text-on-surface-variant uppercase font-bold">Khả dụng (A)</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-on-surface font-mono">{liveOee > 80 ? '94.2%' : '91.5%'}</p>
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm font-mono text-on-surface-variant uppercase font-bold">Chất lượng (Q)</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-primary font-mono">98.1%</p>
            </div>
          </div>
        </div>

        {/* Weekly Bar Chart */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/40 rounded-2xl animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <span className="font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold">
                Sản lượng kế hoạch vs Thực tế
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-on-surface mt-1">Sản lượng tuần hiện tại (Tấn)</h3>
            </div>
            <div className="flex gap-5 items-center font-mono text-xs sm:text-sm font-bold">
              <span className="flex items-center gap-2 text-on-surface">
                <span className="w-3.5 h-3.5 bg-primary rounded-md shadow-xs" /> Thực tế
              </span>
              <span className="flex items-center gap-2 text-on-surface-variant">
                <span className="w-3.5 h-3.5 bg-surface-container-high rounded-md" /> Kế hoạch
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyProduction} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surface-container-high)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 14, fontWeight: 700, fill: 'var(--color-on-surface-variant)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-surface-container-lowest)',
                    border: '1px solid var(--color-outline-variant)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                  }}
                />
                <Bar dataKey="planned" fill="var(--color-surface-container-high)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="actual" fill="var(--color-primary)" radius={[6, 6, 0, 0]} opacity={0.9} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Error Table + AI Action Card */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Error Table */}
        <div className="lg:col-span-2 bg-surface-container-lowest shadow-sm border border-outline-variant/40 overflow-hidden rounded-2xl animate-slide-up">
          <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex justify-between items-center bg-surface-container-low/60">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-on-surface">Lỗi hệ thống thường gặp</h3>
            </div>
            <span className="font-mono text-xs sm:text-sm text-on-surface-variant font-bold">30 Ngày gần nhất</span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="bg-surface-container-low/40 border-b border-outline-variant/30">
                  <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold">Mã lỗi</th>
                  <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold">Loại lỗi bề mặt</th>
                  <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold">Tần suất</th>
                  <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold text-right">Mức độ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30 text-sm sm:text-base">
                {defectRecords.map((d) => (
                  <tr key={d.code} className="hover:bg-surface-container/60 transition-colors">
                    <td className="px-5 py-4 font-mono text-primary font-extrabold text-sm">{d.code}</td>
                    <td className="px-5 py-4 font-semibold text-on-surface">{d.type}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-28 h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                          <div className="gradient-primary h-full rounded-full" style={{ width: `${(d.frequency / 50) * 100}%` }} />
                        </div>
                        <span className="font-mono text-sm font-bold">{d.frequency} lần</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Badge variant={d.severity === 'high' ? 'error' : d.severity === 'medium' ? 'warning' : 'neutral'} size="sm">
                        {d.severity === 'high' ? 'Nghiêm trọng' : d.severity === 'medium' ? 'Trung bình' : 'Thấp'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Operational Insights Card */}
        <div className="gradient-primary p-6 sm:p-7 flex flex-col justify-between text-on-primary relative overflow-hidden shadow-xl rounded-2xl animate-scale-in">
          <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
            <img className="w-full h-full object-cover" src={decorativeImages.banner} alt="" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent z-10" />

          <div className="relative z-20">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider mb-3 opacity-90">
              <Zap size={18} /> AI Optimization Engine
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight tracking-tight">
              Tối ưu năng lực vận hành
            </h3>
            <p className="text-sm sm:text-base text-on-primary/90 leading-relaxed font-medium">
              Mỗi chỉ số ghi nhận từ cảm biến là cơ sở để máy học tinh chỉnh tốc độ kéo tôn và nhiệt độ bể mạ kẽm.
            </p>
          </div>

          <div className="relative z-20 pt-5 border-t border-on-primary/20">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-mono opacity-90 uppercase font-bold">Tiết kiệm năng lượng</p>
                <p className="text-2xl font-extrabold font-mono">+8.4% kWh/T</p>
              </div>
              <button
                onClick={handleRunAiDiagnosis}
                className="px-5 py-2.5 bg-on-primary text-primary font-bold text-xs sm:text-sm rounded-xl shadow-md hover:bg-surface-container-lowest transition-all"
              >
                Tối ưu ngay
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
