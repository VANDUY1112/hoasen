import { useState } from 'react'
import { Download, Layers, ShieldCheck, TrendingUp, Filter, Sparkles, FileSpreadsheet } from 'lucide-react'
import SearchInput from '../components/ui/SearchInput'
import Badge from '../components/ui/Badge'
import { useToast } from '../components/ui/Toast'
import { useLiveSimulation } from '../context/LiveSimulationContext'
import { exportProductionReport } from '../services/excelExport'

const filterTabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'passed', label: 'Đạt chuẩn' },
  { id: 'failed', label: 'Không đạt' },
  { id: 'pending', label: 'Chờ kiểm định' },
]

export default function SanLuong() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [exporting, setExporting] = useState(false)

  const { liveLogs, dailyOutput } = useLiveSimulation()
  const { addToast } = useToast()

  const filteredLogs = liveLogs.filter((log) => {
    const matchesSearch =
      log.coilId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.steelType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = activeFilter === 'all' || log.status === activeFilter
    return matchesSearch && matchesStatus
  })

  const handleExportExcel = async () => {
    try {
      setExporting(true)
      addToast({
        type: 'info',
        title: 'Đang tạo tệp Excel chuyên nghiệp...',
        message: 'Áp dụng template màu chuẩn Hoa Sen Group và định dạng dữ liệu...',
      })

      await exportProductionReport(filteredLogs)

      addToast({
        type: 'success',
        title: 'Xuất Excel thành công!',
        message: 'Tệp báo cáo sản lượng đã được lưu vào máy tính của bạn.',
      })
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Lỗi xuất file',
        message: 'Không thể tạo tệp Excel. Vui lòng thử lại.',
      })
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 sm:gap-8 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">Production Telemetry</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs text-on-surface-variant font-medium">Theo dõi thời gian thực</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight">
            Theo dõi Sản lượng Dây chuyền
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl">
            Giám sát thời gian thực công suất cán nguội và mạ kẽm. Tần suất cập nhật mỗi 30 giây.
          </p>
        </div>

        <button
          onClick={handleExportExcel}
          disabled={exporting}
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-emerald-700/20 transition-all w-fit flex items-center gap-2 font-bold"
        >
          <FileSpreadsheet size={16} className={exporting ? 'animate-spin' : ''} />
          {exporting ? 'Đang tạo Excel...' : 'Xuất Báo Cáo Excel'}
        </button>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 stagger">
        <div className="sm:col-span-2 bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/40 rounded-2xl card-hover relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-on-surface-variant uppercase font-semibold">Sản lượng trong ngày</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight font-mono">
                  {dailyOutput.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
                <span className="text-xl font-bold text-on-surface-variant font-mono">Tấn</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <Layers size={28} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-600 font-mono">
            <TrendingUp size={16} /> +12.5% so với cùng kỳ hôm qua
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 shadow-sm border-t-4 border-primary border border-outline-variant/40 rounded-2xl card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase font-semibold mb-2">Tổng tuần (W42)</p>
          <h2 className="text-3xl font-extrabold text-on-surface font-mono">8,642</h2>
          <p className="text-xs text-on-surface-variant mt-1">Cuộn thép thành phẩm</p>
        </div>

        <div className="bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/40 rounded-2xl card-hover">
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-xs text-on-surface-variant uppercase font-semibold">Tỷ lệ đạt chuẩn (Yield)</p>
            <ShieldCheck size={18} className="text-emerald-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-emerald-600 font-mono">98.2%</h2>
          <p className="text-xs text-on-surface-variant mt-1">Đạt chỉ tiêu ISO 9001</p>
        </div>
      </section>

      {/* Production Log Table */}
      <section className="bg-surface-container-lowest shadow-sm border border-outline-variant/50 rounded-2xl overflow-hidden animate-slide-up">
        {/* Table Header Controls */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Nhật ký Sản xuất Chi tiết (Live Telemetry)</h3>
              <p className="text-xs text-on-surface-variant">Tự động đẩy cuộn tôn vừa hoàn thành qua dây chuyền</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex bg-surface-container p-1 rounded-xl gap-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
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
              className="w-full sm:w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[650px]">
            <thead>
              <tr className="bg-surface-container-low/40 border-b border-outline-variant/30">
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Thời gian
                </th>
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Mã Cuộn (Coil ID)
                </th>
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Loại Thép
                </th>
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                  Khối lượng (Tấn)
                </th>
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold text-center">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-sm">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-on-surface-variant">
                    Không tìm thấy cuộn tôn nào phù hợp
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, idx) => (
                  <tr key={log.coilId} className={`hover:bg-surface-container/60 transition-colors group ${idx === 0 ? 'bg-primary/5' : ''}`}>
                    <td className="px-5 py-4 font-mono text-xs text-on-surface-variant font-medium">
                      {log.time}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs font-bold text-primary">
                      {log.coilId}
                    </td>
                    <td className="px-5 py-4 font-semibold text-on-surface">
                      {log.steelType}
                    </td>
                    <td className="px-5 py-4 text-right font-mono font-bold text-on-surface">
                      {log.weight.toFixed(2)} <span className="font-normal text-xs text-on-surface-variant">T</span>
                    </td>
                    <td className="px-5 py-4 text-center">
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
      </section>
    </div>
  )
}
