import { useState } from 'react'
import { Layers, AlertTriangle, TimerOff, Share2, Download, Brain, Sparkles, TrendingUp, ArrowUpRight, Zap, RefreshCw, FileSpreadsheet, Eye } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import KpiCard from '../components/ui/KpiCard'
import GaugeChart from '../components/ui/GaugeChart'
import Badge from '../components/ui/Badge'
import ReportPreviewModal, { ReportType } from '../components/ui/ReportPreviewModal'
import { useToast } from '../components/ui/Toast'
import { useLiveSimulation } from '../context/LiveSimulationContext'
import { weeklyProduction, defectRecords, decorativeImages } from '../data/mockData'

type TimeRangeType = 'today' | '7days' | '30days'

const timeRanges: { id: TimeRangeType; label: string }[] = [
  { id: 'today', label: 'Hôm nay' },
  { id: '7days', label: '7 ngày qua' },
  { id: '30days', label: 'Tháng này' },
]

// Mock Data for the 3 Time Filter Options
const timeFilterData = {
  today: {
    kpiOutput: {
      title: 'Sản lượng trong ngày (Live)',
      subtitle: 'Tấn thành phẩm / 24h',
      trend: 12.5,
      trendLabel: 'so với hôm qua',
    },
    kpiDefects: {
      title: 'Số lỗi phát hiện',
      value: 14,
      subtitle: 'Trường hợp kiểm định trong ca',
      trend: -2.4,
      trendLabel: 'mục tiêu giảm lỗi',
    },
    kpiDowntime: {
      title: 'Dừng máy (Downtime)',
      value: 42,
      subtitle: 'Phút gián đoạn trong ca',
      resolvedText: 'Đã khắc phục 100%',
    },
    oee: {
      overall: 83,
      availability: 94.2,
      performance: 88.5,
      quality: 98.1,
    },
    chartTitle: 'Sản lượng theo khung giờ hôm nay (Tấn)',
    chartData: [
      { day: '06:00', fullDay: '06:00 - Đầu ca 1', planned: 160, actual: 155 },
      { day: '09:00', fullDay: '09:00 - Giữa ca 1', planned: 200, actual: 215 },
      { day: '12:00', fullDay: '12:00 - Cuối ca 1', planned: 200, actual: 195 },
      { day: '15:00', fullDay: '15:00 - Đầu ca 2', planned: 200, actual: 220 },
      { day: '18:00', fullDay: '18:00 - Giữa ca 2', planned: 220, actual: 235 },
      { day: '21:00', fullDay: '21:00 - Hiện tại', planned: 220, actual: 248 },
    ],
    defectPeriodLabel: 'Hôm nay (24h qua)',
    defectList: [
      { code: 'ERR-042', type: 'Trầy xước bề mặt mạ nhôm', frequency: 6, max: 10, severity: 'high' as const },
      { code: 'ERR-018', type: 'Gợn sóng biên cuộn thép', frequency: 5, max: 10, severity: 'medium' as const },
      { code: 'ERR-033', type: 'Bong tróc lớp sơn phủ', frequency: 2, max: 10, severity: 'high' as const },
      { code: 'ERR-007', type: 'Sai biệt độ dày ±0.05mm', frequency: 1, max: 10, severity: 'low' as const },
    ],
    aiStats: {
      title: 'Tối ưu năng lực vận hành',
      subtitle: 'Tiết kiệm năng lượng hôm nay',
      value: '+8.4% kWh/T',
      desc: 'Máy học tự động tinh chỉnh tốc độ kéo tôn và nhiệt độ bể mạ kẽm theo từng mốc tải SCADA trong ca trực.',
    },
  },
  '7days': {
    kpiOutput: {
      title: 'Sản lượng 7 ngày qua',
      subtitle: 'Tấn thành phẩm / 7 ngày',
      trend: 8.6,
      trendLabel: 'so với tuần trước',
    },
    kpiDefects: {
      title: 'Số lỗi 7 ngày qua',
      value: 86,
      subtitle: 'Trường hợp kiểm định tuần',
      trend: -4.8,
      trendLabel: 'giảm 4.8% tuần qua',
    },
    kpiDowntime: {
      title: 'Tổng dừng máy tuần',
      value: 185,
      subtitle: 'Phút tích lũy 7 ngày qua',
      resolvedText: 'Kiểm soát tốt',
    },
    oee: {
      overall: 85,
      availability: 95.5,
      performance: 90.2,
      quality: 98.4,
    },
    chartTitle: 'Sản lượng tuần hiện tại (Tấn)',
    chartData: [
      { day: 'Thứ 2', fullDay: 'Thứ Hai', planned: 1500, actual: 1420 },
      { day: 'Thứ 3', fullDay: 'Thứ Ba', planned: 1550, actual: 1590 },
      { day: 'Thứ 4', fullDay: 'Thứ Tư', planned: 1600, actual: 1640 },
      { day: 'Thứ 5', fullDay: 'Thứ Năm', planned: 1500, actual: 1580 },
      { day: 'Thứ 6', fullDay: 'Thứ Sáu (Hôm nay)', planned: 1650, actual: 1720 },
      { day: 'Thứ 7', fullDay: 'Thứ Bảy', planned: 1600, actual: 1500 },
    ],
    defectPeriodLabel: '7 Ngày gần nhất',
    defectList: [
      { code: 'ERR-042', type: 'Trầy xước bề mặt mạ nhôm', frequency: 38, max: 50, severity: 'high' as const },
      { code: 'ERR-018', type: 'Gợn sóng biên cuộn thép', frequency: 24, max: 50, severity: 'medium' as const },
      { code: 'ERR-033', type: 'Bong tróc lớp sơn phủ', frequency: 14, max: 50, severity: 'high' as const },
      { code: 'ERR-007', type: 'Sai biệt độ dày ±0.05mm', frequency: 10, max: 50, severity: 'low' as const },
    ],
    aiStats: {
      title: 'Tối ưu năng lực vận hành',
      subtitle: 'Tiết kiệm năng lượng tuần qua',
      value: '+11.2% kWh/T',
      desc: 'Giảm 32 giờ chạy không tải trên 12 dây chuyền và duy trì ổn định dòng mạ kẽm cao tốc.',
    },
  },
  '30days': {
    kpiOutput: {
      title: 'Sản lượng tháng này',
      subtitle: 'Tấn thành phẩm / Tháng 08',
      trend: 14.2,
      trendLabel: 'so với tháng trước',
    },
    kpiDefects: {
      title: 'Số lỗi tháng này',
      value: 312,
      subtitle: 'Trường hợp kiểm định tháng',
      trend: -8.5,
      trendLabel: 'chất lượng cải thiện',
    },
    kpiDowntime: {
      title: 'Tổng dừng máy tháng',
      value: 640,
      subtitle: 'Phút tích lũy tháng này',
      resolvedText: 'Đạt chuẩn ISO',
    },
    oee: {
      overall: 87,
      availability: 96.2,
      performance: 92.0,
      quality: 98.8,
    },
    chartTitle: 'Sản lượng theo tuần trong tháng (Tấn)',
    chartData: [
      { day: 'Tuần 1', fullDay: 'Tuần 01 (01/08 - 07/08)', planned: 9500, actual: 9850 },
      { day: 'Tuần 2', fullDay: 'Tuần 02 (08/08 - 14/08)', planned: 10000, actual: 10420 },
      { day: 'Tuần 3', fullDay: 'Tuần 03 (15/08 - 21/08)', planned: 10500, actual: 10810 },
      { day: 'Tuần 4', fullDay: 'Tuần 04 (22/08 - 31/08)', planned: 10000, actual: 10200 },
    ],
    defectPeriodLabel: 'Tháng 08 (Tích lũy)',
    defectList: [
      { code: 'ERR-042', type: 'Trầy xước bề mặt mạ nhôm', frequency: 142, max: 160, severity: 'high' as const },
      { code: 'ERR-018', type: 'Gợn sóng biên cuộn thép', frequency: 92, max: 160, severity: 'medium' as const },
      { code: 'ERR-033', type: 'Bong tróc lớp sơn phủ', frequency: 48, max: 160, severity: 'high' as const },
      { code: 'ERR-007', type: 'Sai biệt độ dày ±0.05mm', frequency: 30, max: 160, severity: 'low' as const },
    ],
    aiStats: {
      title: 'Tối ưu năng lực vận hành',
      subtitle: 'Tiết kiệm năng lượng tháng 08',
      value: '+14.6% kWh/T',
      desc: 'Tiết kiệm ước tính 148.000.000 VNĐ chi phí điện lưới sản xuất công nghiệp cho toàn nhà máy.',
    },
  },
}

export default function TongQuan() {
  const [activeTimeRange, setActiveTimeRange] = useState<TimeRangeType>('7days')
  const [isDiagnosing, setIsDiagnosing] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [reportType, setReportType] = useState<ReportType>('executive')

  const { dailyOutput, liveOee, liveLogs } = useLiveSimulation()
  const { addToast } = useToast()

  const currentData = timeFilterData[activeTimeRange] || timeFilterData['7days']

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
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6 lg:py-8 gap-5 sm:gap-6 lg:gap-8 animate-fade-in">
      {/* Page Header */}
      <section className="relative flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-5">
        <div className="z-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
            Bảng điều khiển <span className="text-primary">Tổng quan</span>
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
          {/* Time Filter Tabs */}
          <div className="flex bg-surface-container p-1 rounded-xl gap-1 overflow-x-auto no-scrollbar shadow-2xs">
            {timeRanges.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTimeRange(t.id as TimeRangeType)}
                className={`
                  cursor-pointer px-4 sm:px-4.5 lg:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm lg:text-sm font-bold transition-all duration-150 whitespace-nowrap flex-1 sm:flex-none text-center
                  ${activeTimeRange === t.id
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant/80 hover:text-on-surface'
                  }
                `}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleRunAiDiagnosis}
              disabled={isDiagnosing}
              className="cursor-pointer bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 px-4 sm:px-4.5 py-2.5 font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 font-bold rounded-xl transition-all shadow-2xs"
            >
              <Brain size={17} className={isDiagnosing ? 'animate-pulse text-primary' : 'text-primary'} />
              <span className="truncate">{isDiagnosing ? 'Đang quét...' : 'Chẩn đoán AI'}</span>
            </button>

            <button
              onClick={() => {
                setReportType('production')
                setReportModalOpen(true)
              }}
              className="cursor-pointer bg-surface-container-lowest text-on-surface border border-outline-variant/40 px-4 sm:px-4.5 py-2.5 font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 font-bold rounded-xl hover:bg-surface-container transition-colors shadow-2xs"
            >
              <Eye size={16} className="text-primary shrink-0" />
              <span className="truncate">Xem Báo Cáo</span>
            </button>

            <button
              onClick={() => {
                setReportType('executive')
                setReportModalOpen(true)
              }}
              className="cursor-pointer col-span-2 sm:col-span-1 bg-primary text-on-primary px-5 py-2.5 font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 font-extrabold rounded-xl hover:bg-on-primary-fixed-variant transition-all shadow-sm shadow-primary/20"
            >
              <FileSpreadsheet size={16} className="shrink-0" /> Báo Cáo Giám Đốc
            </button>
          </div>
        </div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* KPI Cards with Live SCADA Data */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6 stagger">
        <KpiCard
          title={currentData.kpiOutput.title}
          value={
            activeTimeRange === 'today'
              ? dailyOutput.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              : activeTimeRange === '7days'
              ? '9,450.00'
              : '41,280.00'
          }
          subtitle={currentData.kpiOutput.subtitle}
          trend={currentData.kpiOutput.trend}
          trendLabel={currentData.kpiOutput.trendLabel}
          icon={<Layers size={22} className="stroke-[2.2]" />}
          accentColor="primary"
          className="col-span-2 md:col-span-1"
        />
        <KpiCard
          title={currentData.kpiDefects.title}
          value={currentData.kpiDefects.value}
          subtitle={currentData.kpiDefects.subtitle}
          trend={currentData.kpiDefects.trend}
          trendLabel={currentData.kpiDefects.trendLabel}
          accentColor="error"
          icon={<AlertTriangle size={22} className="stroke-[2.2]" />}
          className="col-span-1"
        />
        <KpiCard
          title={currentData.kpiDowntime.title}
          value={currentData.kpiDowntime.value}
          subtitle={currentData.kpiDowntime.subtitle}
          resolved={true}
          accentColor="primary"
          icon={<TimerOff size={22} className="stroke-[2.2]" />}
          className="col-span-1"
        />
      </section>

      {/* OEE Gauge + Weekly Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
        {/* OEE Gauge */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-5 sm:p-6 lg:p-7 shadow-xs border border-outline-variant/35 flex flex-col items-center justify-between relative overflow-hidden rounded-2xl animate-scale-in">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="font-mono text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Hiệu suất tổng thể OEE
            </span>
            <Badge variant="primary" pulse size="sm">SCADA Stream</Badge>
          </div>

          <div className="my-3 sm:my-4">
            <GaugeChart
              value={activeTimeRange === 'today' ? Math.round(liveOee) : currentData.oee.overall}
              availability={activeTimeRange === 'today' ? (liveOee > 80 ? 94.2 : 91.5) : currentData.oee.availability}
              performance={currentData.oee.performance}
              quality={currentData.oee.quality}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full pt-4 mt-2 border-t border-outline-variant/30">
            <div className="text-center border-r border-outline-variant/30">
              <p className="text-xs sm:text-sm font-bold text-sky-600">Khả dụng (A)</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-black text-on-surface font-mono mt-1">
                {activeTimeRange === 'today' ? (liveOee > 80 ? '94.2%' : '91.5%') : `${currentData.oee.availability}%`}
              </p>
            </div>
            <div className="text-center border-r border-outline-variant/30">
              <p className="text-xs sm:text-sm font-bold text-amber-600">Hiệu suất (P)</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-black text-on-surface font-mono mt-1">
                {currentData.oee.performance}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm font-bold text-rose-600">Chất lượng (Q)</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-black text-primary font-mono mt-1">
                {currentData.oee.quality}%
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Wave Area Chart */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-5 sm:p-6 lg:p-7 shadow-xs border border-outline-variant/35 rounded-2xl animate-slide-up relative overflow-hidden flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
            <div>
              <span className="font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold">
                Sản lượng kế hoạch vs Thực tế
              </span>
              <h3 className="text-base sm:text-xl lg:text-2xl font-extrabold text-on-surface mt-0.5">{currentData.chartTitle}</h3>
            </div>
            <div className="flex gap-4 sm:gap-5 items-center font-mono text-xs sm:text-sm font-bold">
              <span className="flex items-center gap-1.5 text-on-surface">
                <span className="w-3.5 h-2 bg-primary rounded-full shadow-2xs" /> Thực tế
              </span>
              <span className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="w-3.5 h-2 bg-slate-400 rounded-full border border-dashed border-slate-400" /> Kế hoạch
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 lg:h-80 xl:h-[340px] w-[calc(100%+2.5rem)] sm:w-[calc(100%+3rem)] lg:w-[calc(100%+3.5rem)] -mx-5 sm:-mx-6 lg:-mx-7 -mb-5 sm:-mb-6 lg:-mb-7">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData.chartData} margin={{ top: 15, right: 0, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="gradientActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary, #b5000b)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-primary, #b5000b)" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gradientPlanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surface-container-high)" vertical={false} />
                <XAxis
                  dataKey="day"
                  interval={0}
                  padding={{ left: 28, right: 28 }}
                  tick={{ fontSize: 14, fontWeight: 700, fill: 'var(--color-on-surface-variant)' }}
                  tickMargin={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0]?.payload
                      const actualVal = payload.find((p) => p.dataKey === 'actual')?.value
                      const plannedVal = payload.find((p) => p.dataKey === 'planned')?.value
                      return (
                        <div className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl border border-outline-variant/40 shadow-lg text-xs sm:text-sm">
                          <p className="font-mono font-bold text-on-surface uppercase mb-2">{item?.fullDay || label}</p>
                          <div className="space-y-1.5 font-mono">
                            <div className="flex items-center justify-between gap-4 text-primary font-bold">
                              <span>Sản lượng Thực tế:</span>
                              <span>{Number(actualVal).toLocaleString()} Tấn</span>
                            </div>
                            <div className="flex items-center justify-between gap-4 text-on-surface-variant font-medium">
                              <span>Mục tiêu Kế hoạch:</span>
                              <span>{Number(plannedVal).toLocaleString()} Tấn</span>
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
                  dataKey="planned"
                  stroke="#94a3b8"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#gradientPlanned)"
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="var(--color-primary, #b5000b)"
                  strokeWidth={3.5}
                  fillOpacity={1}
                  fill="url(#gradientActual)"
                  activeDot={{ r: 7, fill: 'var(--color-primary, #b5000b)', stroke: '#fff', strokeWidth: 2.5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Error Table + AI Action Card */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {/* Error Table */}
        <div className="lg:col-span-2 bg-surface-container-lowest shadow-xs border border-outline-variant/35 overflow-hidden rounded-2xl animate-slide-up">
          <div className="px-5 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <AlertTriangle size={19} />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-on-surface">Lỗi hệ thống thường gặp</h3>
            </div>
            <span className="font-mono text-xs sm:text-sm text-on-surface-variant/80 font-bold bg-surface-container px-2.5 py-1 rounded-lg">
              {currentData.defectPeriodLabel}
            </span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[460px]">
              <thead>
                <tr className="bg-surface-container-low/30 border-b border-outline-variant/20">
                  <th className="px-4 py-3.5 font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold whitespace-nowrap">Mã lỗi</th>
                  <th className="px-4 py-3.5 font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold whitespace-nowrap">Loại lỗi bề mặt</th>
                  <th className="px-4 py-3.5 font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold whitespace-nowrap">Tần suất</th>
                  <th className="px-4 py-3.5 font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold text-right whitespace-nowrap">Mức độ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-xs sm:text-sm">
                {currentData.defectList.map((d) => (
                  <tr key={d.code} className="hover:bg-surface-container/50 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-primary font-bold whitespace-nowrap">{d.code}</td>
                    <td className="px-4 py-3.5 font-semibold text-on-surface whitespace-nowrap">{d.type}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-24 sm:w-28 h-2 bg-surface-container-high rounded-full overflow-hidden">
                          <div className="gradient-primary h-full rounded-full" style={{ width: `${(d.frequency / (d.max || 50)) * 100}%` }} />
                        </div>
                        <span className="font-mono text-xs sm:text-sm font-bold whitespace-nowrap">{d.frequency} lần</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
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
        <div className="gradient-primary p-5 sm:p-6 lg:p-7 flex flex-col justify-between text-on-primary relative overflow-hidden shadow-md rounded-2xl animate-scale-in">
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
            <img className="w-full h-full object-cover" src={decorativeImages.banner} alt="" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent z-10" />

          <div className="relative z-20">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider mb-2.5 opacity-90">
              <Zap size={18} /> AI Optimization Engine
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-2.5 leading-tight tracking-tight">
              {currentData.aiStats.title}
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-on-primary/90 leading-relaxed font-medium">
              {currentData.aiStats.desc}
            </p>
          </div>

          <div className="relative z-20 pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-on-primary/20">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs sm:text-sm font-mono opacity-90 uppercase font-bold">{currentData.aiStats.subtitle}</p>
                <p className="text-xl sm:text-2xl font-extrabold font-mono">{currentData.aiStats.value}</p>
              </div>
              <button
                onClick={handleRunAiDiagnosis}
                className="px-4 py-2 bg-on-primary text-primary font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:bg-surface-container-lowest transition-all"
              >
                Tối ưu ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Report Preview Modal for Excel Review */}
      <ReportPreviewModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        initialReportType={reportType}
      />
    </div>
  )
}
