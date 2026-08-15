import { useState } from 'react'
import { TimerOff, AlertOctagon, CheckCircle2, Clock, Filter, AlertTriangle } from 'lucide-react'
import SearchInput from '../components/ui/SearchInput'
import Badge from '../components/ui/Badge'
import { downtimeRecords } from '../data/mockData'

const filterTabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'repairing', label: 'Đang sửa chữa' },
  { id: 'resolved', label: 'Đã xử lý' },
  { id: 'pending', label: 'Chờ xử lý' },
]

export default function ThoiGianDungMay() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = downtimeRecords.filter((r) => {
    const matchesSearch = r.equipment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = activeFilter === 'all' || r.status === activeFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 sm:gap-8 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs sm:text-sm text-primary uppercase font-bold tracking-wider">Live Downtime Telemetry</span>
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs sm:text-sm text-on-surface-variant font-semibold">Gián đoạn dây chuyền</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight">
            Thời gian Dừng máy &amp; Sự cố
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed font-medium">
            Theo dõi nhật ký dừng máy tự động từ hệ thống SCADA/PLC và tiến độ khắc phục của kỹ thuật viên.
          </p>
        </div>

        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex items-center gap-4 w-full sm:w-auto">
          <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-600">
            <TimerOff size={28} />
          </div>
          <div>
            <p className="font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold">Tổng thời gian dừng ca</p>
            <p className="text-3xl sm:text-4xl font-extrabold text-primary font-mono leading-none mt-1">
              142 <span className="text-base font-bold text-on-surface-variant">phút</span>
            </p>
          </div>
        </div>
      </section>

      {/* Table Container */}
      <section className="bg-surface-container-lowest shadow-sm border border-outline-variant/50 rounded-2xl overflow-hidden animate-slide-up">
        {/* Table Controls */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low/60">
          <div className="flex bg-surface-container p-1 rounded-xl gap-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`
                  px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150
                  ${activeFilter === tab.id
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Tìm theo thiết bị, dây chuyền..."
            shortcut="⌘K"
            className="w-full sm:w-72"
          />
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low/40 border-b border-outline-variant/30">
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Thời điểm ghi nhận
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Thiết bị / Dây chuyền
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold text-right">
                  Thời lượng dừng
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold text-center">
                  Trạng thái xử lý
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-sm sm:text-base">
              {filtered.map((r, i) => (
                <tr key={i} className="hover:bg-surface-container/60 transition-colors group">
                  <td className="px-5 py-4 font-mono text-sm font-semibold text-on-surface-variant">
                    {r.time}
                  </td>
                  <td className="px-5 py-4 font-bold text-on-surface text-base">
                    {r.equipment}
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-extrabold text-base">
                    <span className={r.status === 'repairing' ? 'text-rose-600 font-black' : 'text-on-surface'}>
                      {r.duration}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    {r.status === 'repairing' ? (
                      <Badge variant="error" pulse size="sm">
                        Đang sửa chữa
                      </Badge>
                    ) : r.status === 'resolved' ? (
                      <Badge variant="success" size="sm">
                        Đã khắc phục
                      </Badge>
                    ) : (
                      <Badge variant="warning" size="sm">
                        Chờ kiểm tra
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
