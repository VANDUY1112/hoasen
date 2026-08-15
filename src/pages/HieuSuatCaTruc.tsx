import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings } from 'lucide-react'
import { shiftPerformanceData } from '../data/mockData'

const shifts = [
  { id: 'ca-1', label: 'Ca 1 (06:00 - 14:00)' },
  { id: 'ca-2', label: 'Ca 2 (14:00 - 22:00)' },
  { id: 'ca-3', label: 'Ca 3 (22:00 - 06:00)' },
]

export default function HieuSuatCaTruc() {
  const [activeShift, setActiveShift] = useState('ca-1')
  const navigate = useNavigate()
  const data = shiftPerformanceData[activeShift] || []

  const totalOutput = data.reduce((sum, d) => sum + d.output, 0)
  const totalTarget = data.reduce((sum, d) => sum + d.target, 0)
  const avgQuality = data.length ? (data.reduce((sum, d) => sum + d.quality, 0) / data.length).toFixed(1) : '0'

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-semibold">Shift Analytics</span>
          <h1 className="text-3xl md:text-5xl font-bold text-on-surface tracking-tight mt-1">Hiệu suất Ca trực</h1>
        </div>
        <button
          onClick={() => navigate('/thiet-lap-muc-tieu-ca-truc')}
          className="bg-surface-container-highest text-on-surface px-6 py-3 rounded-xl font-semibold hover:bg-surface-container-high transition-all flex items-center gap-2 w-fit"
        >
          <Settings size={18} /> <span className="text-sm">Thiết Lập Mục Tiêu</span>
        </button>
      </div>

      {/* Shift Tabs */}
      <div className="flex gap-2 bg-surface-container rounded-xl p-1.5 w-fit">
        {shifts.map((shift) => (
          <button
            key={shift.id}
            onClick={() => setActiveShift(shift.id)}
            className={`px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
              activeShift === shift.id
                ? 'bg-primary text-on-primary shadow-md font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {shift.label}
          </button>
        ))}
      </div>

      {/* Shift KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger">
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-t-4 border-primary card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase">Tổng sản lượng</p>
          <h2 className="text-3xl font-bold text-on-surface mt-2">{totalOutput.toLocaleString()}</h2>
          <p className="text-sm text-on-surface-variant mt-1">/ {totalTarget.toLocaleString()} mục tiêu</p>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase">Chất lượng TB</p>
          <h2 className="text-3xl font-bold text-on-surface mt-2">{avgQuality}%</h2>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase">Số công nhân</p>
          <h2 className="text-3xl font-bold text-on-surface mt-2">{data.length}</h2>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-surface-container-lowest shadow-sm overflow-hidden rounded-xl animate-slide-up">
        <div className="p-4 border-b border-outline-variant bg-surface-container-low">
          <h3 className="text-lg font-bold">Bảng Hiệu suất Chi tiết</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-surface">
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase">Công nhân</th>
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase">Vai trò</th>
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase text-right">Sản lượng</th>
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase text-right">Mục tiêu</th>
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase text-right">Chất lượng</th>
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase text-center">Đánh giá</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {data.map((d) => (
                <tr key={d.worker} className="hover:bg-surface-container transition-colors">
                  <td className="p-4 text-sm font-semibold">{d.worker}</td>
                  <td className="p-4 text-sm text-on-surface-variant">{d.role}</td>
                  <td className="p-4 text-sm text-right font-medium">{d.output}</td>
                  <td className="p-4 text-sm text-right text-on-surface-variant">{d.target}</td>
                  <td className="p-4 text-sm text-right font-medium">{d.quality}%</td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase font-semibold ${
                      d.status === 'excellent' ? 'bg-success-bg text-success' :
                      d.status === 'good' ? 'bg-primary/10 text-primary' :
                      'bg-warning-bg text-warning'
                    }`}>
                      {d.status === 'excellent' ? 'Xuất sắc' : d.status === 'good' ? 'Tốt' : 'Cần cải thiện'}
                    </span>
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
