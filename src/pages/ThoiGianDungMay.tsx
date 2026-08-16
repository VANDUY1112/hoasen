import { useState, useMemo } from 'react'
import { TimerOff, AlertOctagon, CheckCircle2, Clock, Filter, AlertTriangle, Wrench } from 'lucide-react'
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
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6 lg:py-8 gap-5 sm:gap-6 lg:gap-8 animate-fade-in">
      {/* Header */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-5">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
            Thời gian Dừng máy &amp; Sự cố
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-on-surface-variant/80 max-w-3xl leading-relaxed font-medium">
            Theo dõi nhật ký dừng máy tự động từ hệ thống SCADA/PLC và tiến độ khắc phục của kỹ thuật viên.
          </p>
        </div>
      </section>

      {/* KPI Cards Row (4 Cards) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 stagger">
        <div className="bg-surface-container-lowest p-5 sm:p-6 lg:p-7 shadow-xs border border-outline-variant/35 rounded-2xl card-hover flex justify-between items-start">
          <div>
            <p className="text-sm sm:text-base font-bold text-on-surface-variant">Tổng dừng ca</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary font-mono mt-1.5">142 <span className="text-base font-normal text-on-surface-variant font-sans">phút</span></h2>
            <p className="text-xs sm:text-sm text-emerald-600 mt-2 font-bold">-18 phút so với ca trước</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
            <TimerOff size={24} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 sm:p-6 lg:p-7 shadow-xs border border-outline-variant/35 rounded-2xl card-hover flex justify-between items-start">
          <div>
            <p className="text-sm sm:text-base font-bold text-on-surface-variant">Đang khắc phục</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-rose-600 font-mono mt-1.5">01 <span className="text-base font-normal text-on-surface-variant font-sans">vụ</span></h2>
            <p className="text-xs sm:text-sm text-on-surface-variant/80 mt-2 font-medium">Line Xẻ Băng 02</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-rose-500/10 text-rose-600 border border-rose-500/20 shrink-0">
            <AlertTriangle size={24} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 sm:p-6 lg:p-7 shadow-xs border border-outline-variant/35 rounded-2xl card-hover flex justify-between items-start">
          <div>
            <p className="text-sm sm:text-base font-bold text-on-surface-variant">Thời gian xử lý TB (MTTR)</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface font-mono mt-1.5">18.5 <span className="text-base font-normal text-on-surface-variant font-sans">phút</span></h2>
            <p className="text-xs sm:text-sm text-emerald-600 mt-2 font-bold">Nhanh hơn 15%</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
            <Clock size={24} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 sm:p-6 lg:p-7 shadow-xs border border-outline-variant/35 rounded-2xl card-hover flex justify-between items-start">
          <div>
            <p className="text-sm sm:text-base font-bold text-on-surface-variant">Độ khả dụng máy</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-600 font-mono mt-1.5">96.4%</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant/80 mt-2 font-medium">Vượt mục tiêu 95.0%</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shrink-0">
            <CheckCircle2 size={24} />
          </div>
        </div>
      </section>

      {/* Main Grid: Table (8 cols) + Reason Breakdown (4 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8">
        {/* Table Container (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest shadow-sm border border-outline-variant/40 rounded-2xl overflow-hidden animate-slide-up flex flex-col justify-between">
          <div>
            {/* Table Controls */}
            <div className="p-4 sm:p-5 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low/60">
              <div className="flex bg-surface-container p-1 rounded-xl gap-1 overflow-x-auto no-scrollbar shadow-2xs">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleFilterChange(tab.id)}
                    className={`
                      cursor-pointer px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 whitespace-nowrap flex-1 sm:flex-none text-center
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
                onChange={handleSearch}
                placeholder="Tìm theo thiết bị, dây chuyền..."
                shortcut="⌘K"
                className="w-full sm:w-80"
              />
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-surface-container-low/40 border-b border-outline-variant/30">
                    <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold whitespace-nowrap">
                      Thời điểm ghi nhận
                    </th>
                    <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold whitespace-nowrap">
                      Thiết bị / Dây chuyền
                    </th>
                    <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold text-right whitespace-nowrap">
                      Thời lượng dừng
                    </th>
                    <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold text-center whitespace-nowrap">
                      Trạng thái xử lý
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-sm sm:text-base">
                  {paginatedItems.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-5 py-12 text-center text-on-surface-variant font-medium text-sm sm:text-base">
                        Không tìm thấy sự cố dừng máy phù hợp
                      </td>
                    </tr>
                  ) : (
                    paginatedItems.map((r, i) => (
                      <tr key={i} className="hover:bg-surface-container/50 transition-colors group">
                        <td className="px-5 py-4 font-mono text-on-surface-variant font-medium whitespace-nowrap">
                          {r.time}
                        </td>
                        <td className="px-5 py-4 font-bold text-on-surface whitespace-nowrap">
                          {r.equipment}
                        </td>
                        <td className="px-5 py-4 text-right font-mono font-extrabold whitespace-nowrap">
                          <span className={r.status === 'repairing' ? 'text-rose-600' : 'text-on-surface'}>
                            {r.duration}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center whitespace-nowrap">
                          {r.status === 'repairing' ? (
                            <Badge variant="error" pulse size="md">
                              Đang sửa chữa
                            </Badge>
                          ) : r.status === 'resolved' ? (
                            <Badge variant="success" size="md">
                              Đã khắc phục
                            </Badge>
                          ) : (
                            <Badge variant="warning" size="md">
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
        </div>

        {/* Breakdown Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-5 sm:space-y-6">
          {/* Reason Breakdown */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/40">
            <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-on-surface mb-1">Cơ cấu Nguyên nhân Dừng máy</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant/80 font-medium mb-4">Tỷ trọng thời gian gián đoạn trong ca</p>

            <div className="space-y-3.5">
              {[
                { name: 'Sự cố Cơ khí & Bạc đạn', percent: 45, color: 'bg-primary' },
                { name: 'Áp suất Bôi trơn & Nhiệt độ', percent: 30, color: 'bg-amber-500' },
                { name: 'Kẹt phôi & Lệch biên tôn', percent: 15, color: 'bg-sky-500' },
                { name: 'Điện & Tín hiệu PLC', percent: 10, color: 'bg-slate-400' },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-xs sm:text-sm font-semibold mb-1">
                    <span className="text-on-surface">{item.name}</span>
                    <span className="font-mono font-bold text-on-surface">{item.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rapid Response Hotline Card */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/40">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Wrench size={20} />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-on-surface">Đội Phản ứng Nhanh Bảo trì</h4>
                <p className="text-xs text-on-surface-variant">Trực ca 24/7 tại Phân xưởng Mạ</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 font-mono text-xs sm:text-sm flex items-center justify-between">
              <span className="text-on-surface-variant">Hotline Nội bộ:</span>
              <span className="font-bold text-primary">EXT #8822 (Phím 1)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
