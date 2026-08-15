import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, Users, Award, TrendingUp, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import { shiftPerformanceData } from '../data/mockData'

const shifts = [
  { id: 'ca-1', label: 'Ca 1', time: '06:00 - 14:00', chief: 'Nguyễn Văn An' },
  { id: 'ca-2', label: 'Ca 2', time: '14:00 - 22:00', chief: 'Võ Thanh Tùng' },
  { id: 'ca-3', label: 'Ca 3', time: '22:00 - 06:00', chief: 'Huỳnh Tấn Phát' },
]

export default function HieuSuatCaTruc() {
  const [activeShift, setActiveShift] = useState('ca-1')
  const navigate = useNavigate()
  const data = shiftPerformanceData[activeShift] || []

  const totalOutput = data.reduce((sum, d) => sum + d.output, 0)
  const totalTarget = data.reduce((sum, d) => sum + d.target, 0)
  const avgQuality = data.length ? (data.reduce((sum, d) => sum + d.quality, 0) / data.length).toFixed(1) : '0'

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 sm:gap-8 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">Workforce &amp; Shift Analytics</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs text-on-surface-variant font-medium">Đánh giá ca trực</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight">
            Hiệu suất &amp; Năng suất Ca trực
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl">
            Theo dõi sản lượng đầu ca, tỷ lệ chất lượng sản phẩm và đánh giá năng lực công nhân vận hành máy.
          </p>
        </div>

        <button
          onClick={() => navigate('/thiet-lap-muc-tieu-ca-truc')}
          className="bg-surface-container-highest text-on-surface hover:bg-surface-container-high px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 w-fit border border-outline-variant/40 shadow-xs text-sm"
        >
          <Settings size={16} /> Thiết Lập Mục Tiêu Ca
        </button>
      </div>

      {/* Shift Switcher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {shifts.map((shift) => {
          const isActive = activeShift === shift.id
          return (
            <button
              key={shift.id}
              onClick={() => setActiveShift(shift.id)}
              className={`
                p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden flex items-center justify-between
                ${isActive
                  ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20 scale-[1.01]'
                  : 'bg-surface-container-lowest text-on-surface border-outline-variant/50 hover:bg-surface-container-low/70 hover:border-primary/40'
                }
              `}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-extrabold text-base tracking-tight">{shift.label}</span>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full uppercase ${isActive ? 'bg-on-primary/20 text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                    {shift.time}
                  </span>
                </div>
                <p className={`text-xs ${isActive ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                  Trưởng ca: <span className="font-semibold">{shift.chief}</span>
                </p>
              </div>

              {isActive && (
                <div className="p-2 rounded-xl bg-on-primary/20 text-on-primary">
                  <CheckCircle2 size={20} />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Shift KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 stagger">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 border-l-4 border-l-primary card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase font-semibold">Tổng sản lượng ca</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h2 className="text-4xl font-extrabold text-on-surface font-mono">{totalOutput.toLocaleString()}</h2>
            <span className="text-sm font-mono text-on-surface-variant font-medium">/ {totalTarget.toLocaleString()} T</span>
          </div>
          <div className="mt-3">
            <ProgressBar value={(totalOutput / totalTarget) * 100} height="h-1.5" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 border-l-4 border-l-emerald-500 card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase font-semibold">Chất lượng TB</p>
          <h2 className="text-4xl font-extrabold text-emerald-600 mt-2 font-mono">{avgQuality}%</h2>
          <p className="text-xs text-on-surface-variant mt-1">Đạt yêu cầu tiêu chuẩn xuất khẩu</p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 border-l-4 border-l-sky-500 card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase font-semibold">Quân số vận hành</p>
          <h2 className="text-4xl font-extrabold text-sky-700 mt-2 font-mono">{data.length} <span className="text-base font-normal text-on-surface-variant">người</span></h2>
          <p className="text-xs text-on-surface-variant mt-1">100% có mặt đúng giờ</p>
        </div>
      </div>

      {/* Worker Performance Table */}
      <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/50 rounded-2xl overflow-hidden animate-slide-up">
        <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex justify-between items-center bg-surface-container-low/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Award size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Bảng Đánh giá Năng lực Công nhân</h3>
              <p className="text-xs text-on-surface-variant">Thống kê sản lượng và chất lượng theo từng vị trí vận hành</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[650px]">
            <thead>
              <tr className="bg-surface-container-low/40 border-b border-outline-variant/30">
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Công nhân
                </th>
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Vị trí máy đảm nhiệm
                </th>
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                  Thực tế / Mục tiêu (Tấn)
                </th>
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                  Chất lượng
                </th>
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold text-center">
                  Xếp loại ca
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-sm">
              {data.map((d) => (
                <tr key={d.worker} className="hover:bg-surface-container/60 transition-colors group">
                  <td className="px-5 py-4 font-bold text-on-surface flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-mono text-xs font-bold flex items-center justify-center border border-primary/20">
                      {d.worker.split(' ').pop()?.[0]}
                    </div>
                    <span>{d.worker}</span>
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-on-surface-variant font-medium">
                    {d.role}
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-bold">
                    <span className="text-on-surface">{d.output}</span>
                    <span className="text-xs text-on-surface-variant/70 font-normal"> / {d.target} T</span>
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-bold text-emerald-600">
                    {d.quality}%
                  </td>
                  <td className="px-5 py-4 text-center">
                    {d.status === 'excellent' ? (
                      <Badge variant="success" size="sm">
                        Xuất sắc
                      </Badge>
                    ) : d.status === 'good' ? (
                      <Badge variant="primary" size="sm">
                        Hoàn thành
                      </Badge>
                    ) : (
                      <Badge variant="warning" size="sm">
                        Cần cải thiện
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
