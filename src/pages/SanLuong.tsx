import { useState, useMemo } from 'react'
import { Download, Layers, ShieldCheck, TrendingUp, Filter, Activity, FileSpreadsheet, Eye } from 'lucide-react'
import SearchInput from '../components/ui/SearchInput'
import Badge from '../components/ui/Badge'
import Pagination from '../components/ui/Pagination'
import ReportPreviewModal from '../components/ui/ReportPreviewModal'
import { useToast } from '../components/ui/Toast'
import { useLiveSimulation } from '../context/LiveSimulationContext'

const filterTabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'passed', label: 'Đạt chuẩn' },
  { id: 'failed', label: 'Không đạt' },
  { id: 'pending', label: 'Chờ kiểm định' },
]

export default function SanLuong() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { liveLogs, dailyOutput } = useLiveSimulation()
  const { addToast } = useToast()

  const filteredLogs = useMemo(() => {
    return liveLogs.filter((log) => {
      const matchesSearch =
        log.coilId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.steelType.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = activeFilter === 'all' || log.status === activeFilter
      return matchesSearch && matchesStatus
    })
  }, [liveLogs, searchTerm, activeFilter])

  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredLogs.slice(start, start + pageSize)
  }, [filteredLogs, currentPage, pageSize])

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
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight">
            Theo dõi Sản lượng Dây chuyền
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant/80 max-w-2xl leading-relaxed font-medium">
            Giám sát thời gian thực công suất cán nguội và mạ kẽm. Tần suất cập nhật mỗi 30 giây từ PLC/SCADA.
          </p>
        </div>

        <button
          onClick={() => setReportModalOpen(true)}
          className="cursor-pointer px-4 sm:px-5 py-2.5 sm:py-2.5 bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-mono text-xs sm:text-[13px] uppercase tracking-wider rounded-xl shadow-xs shadow-primary/20 transition-all w-full sm:w-auto flex items-center justify-center gap-2 font-extrabold"
        >
          <Eye size={16} />
          <span>Xem & Xuất Báo Cáo</span>
        </button>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 stagger">
        <div className="col-span-2 bg-surface-container-lowest p-4 sm:p-5 shadow-xs border border-outline-variant/30 hover:border-primary/40 rounded-2xl card-hover relative overflow-hidden transition-all">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs text-on-surface-variant uppercase font-bold">Sản lượng trong ngày (Live)</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight font-mono group-hover:text-primary transition-colors">
                  {dailyOutput.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
                <span className="text-sm sm:text-base font-bold text-on-surface-variant font-mono">Tấn</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Layers size={22} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-primary font-mono">
            <TrendingUp size={15} /> +12.5% so với cùng kỳ hôm qua
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 sm:p-5 shadow-xs border border-outline-variant/30 hover:border-primary/40 rounded-2xl card-hover transition-all">
          <p className="font-mono text-xs text-on-surface-variant uppercase font-bold mb-1.5">Tổng tuần (W42)</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface font-mono">8,642</h2>
          <p className="text-xs text-on-surface-variant/80 mt-1 font-medium">Cuộn thép thành phẩm</p>
        </div>

        <div className="bg-surface-container-lowest p-4 sm:p-5 shadow-xs border border-outline-variant/30 hover:border-primary/40 rounded-2xl card-hover transition-all">
          <p className="font-mono text-xs text-on-surface-variant uppercase font-bold mb-1.5">Đạt kế hoạch</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary font-mono">98.4%</h2>
          <p className="text-xs text-on-surface-variant/80 mt-1 font-medium">Mục tiêu: 95.0%</p>
        </div>
      </section>

      {/* Production Log Table */}
      <section className="bg-surface-container-lowest shadow-sm border border-outline-variant/50 rounded-2xl overflow-hidden animate-slide-up">
        {/* Table Header Controls */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Activity size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-on-surface">Nhật ký Sản xuất Chi tiết</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant font-medium">Tự động đẩy cuộn tôn vừa hoàn thành qua dây chuyền</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex bg-surface-container p-1 rounded-xl gap-1 overflow-x-auto no-scrollbar">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`
                    cursor-pointer px-3 sm:px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 whitespace-nowrap flex-1 sm:flex-none text-center
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

            {/* Modern Search */}
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Tìm mã cuộn, loại thép..."
              shortcut="⌘K"
              className="w-full sm:w-72"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[650px]">
            <thead>
              <tr className="bg-surface-container-low/30 border-b border-outline-variant/20">
                <th className="px-3.5 py-2.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold whitespace-nowrap">
                  Thời gian
                </th>
                <th className="px-3.5 py-2.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold whitespace-nowrap">
                  Mã Cuộn (Coil ID)
                </th>
                <th className="px-3.5 py-2.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold whitespace-nowrap">
                  Loại Thép
                </th>
                <th className="px-3.5 py-2.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold text-right whitespace-nowrap">
                  Khối lượng (Tấn)
                </th>
                <th className="px-3.5 py-2.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold text-center whitespace-nowrap">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-xs sm:text-[13px]">
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3.5 py-10 text-center text-on-surface-variant font-medium">
                    Không tìm thấy cuộn tôn nào phù hợp
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log, idx) => (
                  <tr key={log.coilId} className={`hover:bg-surface-container/50 transition-colors group ${idx === 0 ? 'bg-primary/5' : ''}`}>
                    <td className="px-3.5 py-2.5 font-mono text-on-surface-variant/85 whitespace-nowrap">
                      {log.time}
                    </td>
                    <td className="px-3.5 py-2.5 font-mono font-bold text-primary whitespace-nowrap">
                      {log.coilId}
                    </td>
                    <td className="px-3.5 py-2.5 font-semibold text-on-surface whitespace-nowrap">
                      {log.steelType}
                    </td>
                    <td className="px-3.5 py-2.5 text-right font-mono font-bold text-on-surface whitespace-nowrap">
                      {log.weight.toFixed(2)} <span className="font-normal text-xs text-on-surface-variant/70">T</span>
                    </td>
                    <td className="px-3.5 py-2.5 text-center whitespace-nowrap">
                      {log.status === 'passed' ? (
                        <Badge variant="success" pulse size="sm">
                          Đạt chuẩn
                        </Badge>
                      ) : log.status === 'failed' ? (
                        <Badge variant="error" size="sm">
                          Lỗi bề mặt
                        </Badge>
                      ) : (
                        <Badge variant="warning" size="sm">
                          Chờ KĐ
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
        {filteredLogs.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredLogs.length}
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

      {/* Report Preview Modal */}
      <ReportPreviewModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        initialReportType="production"
      />
    </div>
  )
}
