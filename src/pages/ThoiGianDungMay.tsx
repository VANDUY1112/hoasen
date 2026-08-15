import { useState, useMemo } from 'react'
import { TimerOff, AlertOctagon, CheckCircle2, Clock, Filter, AlertTriangle } from 'lucide-react'
import SearchInput from '../components/ui/SearchInput'
import Badge from '../components/ui/Badge'
import Pagination from '../components/ui/Pagination'
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
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filtered = useMemo(() => {
    return downtimeRecords.filter((r) => {
      const matchesSearch = r.equipment.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = activeFilter === 'all' || r.status === activeFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, activeFilter])

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, currentPage, pageSize])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col w-full p-3.5 sm:p-5 lg:p-6 gap-4 sm:gap-5 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight">
            Thời gian Dừng máy &amp; Sự cố
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant/80 max-w-2xl leading-relaxed font-medium">
            Theo dõi nhật ký dừng máy tự động từ hệ thống SCADA/PLC và tiến độ khắc phục của kỹ thuật viên.
          </p>
        </div>

        <div className="bg-surface-container-lowest p-3 sm:p-4 rounded-2xl shadow-xs border border-outline-variant/35 flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 shrink-0">
            <TimerOff size={20} />
          </div>
          <div>
            <p className="font-mono text-xs text-on-surface-variant uppercase font-bold">Tổng thời gian dừng ca</p>
            <p className="text-xl sm:text-2xl font-extrabold text-primary font-mono leading-none mt-0.5">
              142 <span className="text-xs sm:text-sm font-bold text-on-surface-variant">phút</span>
            </p>
          </div>
        </div>
      </section>

      {/* Table Container */}
      <section className="bg-surface-container-lowest shadow-xs border border-outline-variant/35 rounded-2xl overflow-hidden animate-slide-up">
        {/* Table Controls */}
        <div className="p-3 sm:p-4 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-low/50">
          <div className="flex bg-surface-container p-0.5 rounded-xl gap-0.5 overflow-x-auto no-scrollbar">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                className={`
                  cursor-pointer px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 whitespace-nowrap flex-1 sm:flex-none text-center
                  ${activeFilter === tab.id
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant/80 hover:text-on-surface'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <SearchInput
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Tìm theo thiết bị, dây chuyền..."
            shortcut="⌘K"
            className="w-full sm:w-72"
          />
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[650px]">
            <thead>
              <tr className="bg-surface-container-low/30 border-b border-outline-variant/20">
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                  Thời điểm ghi nhận
                </th>
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                  Thiết bị / Dây chuyền
                </th>
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold text-right">
                  Thời lượng dừng
                </th>
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold text-center">
                  Trạng thái xử lý
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-xs sm:text-sm">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-on-surface-variant font-medium">
                    Không tìm thấy sự cố dừng máy phù hợp
                  </td>
                </tr>
              ) : (
                paginatedItems.map((r, i) => (
                  <tr key={i} className="hover:bg-surface-container/50 transition-colors group">
                    <td className="px-4 py-3 font-mono font-semibold text-on-surface-variant/85">
                      {r.time}
                    </td>
                    <td className="px-4 py-3 font-bold text-on-surface">
                      {r.equipment}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-extrabold">
                      <span className={r.status === 'repairing' ? 'text-rose-600 font-black' : 'text-on-surface'}>
                        {r.duration}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filtered.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={filtered.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size)
              setCurrentPage(1)
            }}
            pageSizeOptions={[5, 10, 20]}
          />
        )}
      </section>
    </div>
  )
}
