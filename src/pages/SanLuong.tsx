import { useState } from 'react'
import { Download, Search } from 'lucide-react'
import { productionLogs } from '../data/mockData'

export default function SanLuong() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLogs = productionLogs.filter(
    (log) => log.coilId.toLowerCase().includes(searchTerm.toLowerCase()) ||
             log.steelType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 animate-fade-in">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold text-on-surface tracking-tight">Theo dõi Sản lượng</h1>
            <p className="text-base text-on-surface-variant max-w-xl">
              Hệ thống giám sát hiệu suất dây chuyền cán nguội và mạ kẽm. Dữ liệu cập nhật mỗi 30 giây.
            </p>
          </div>
          <button className="px-6 py-2.5 bg-primary text-on-primary font-mono text-xs uppercase tracking-wider rounded-lg shadow-md hover:bg-on-primary-fixed-variant transition-all w-fit flex items-center gap-2">
            <Download size={16} /> Xuất báo cáo
          </button>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        <div className="sm:col-span-2 bg-surface-container-lowest p-5 shadow-sm relative group overflow-hidden rounded-xl card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase mb-2 flex items-center gap-2">
            Sản lượng trong ngày <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </p>
          <div className="flex items-baseline gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface">1,240.5</h2>
            <span className="text-xl font-bold text-on-surface-variant">Tấn</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-5 shadow-sm border-t-4 border-primary rounded-xl card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase mb-2">Tổng tuần (W42)</p>
          <h2 className="text-3xl font-bold text-on-surface">8,642</h2>
          <p className="text-sm text-on-surface-variant mt-1">Cuộn thép thành phẩm</p>
        </div>
        <div className="bg-surface-container-lowest p-5 shadow-sm rounded-xl card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase mb-2">Tỷ lệ đạt chuẩn (Yield)</p>
          <h2 className="text-3xl font-bold text-on-surface">98.2%</h2>
        </div>
      </section>

      {/* Production Log Table */}
      <section className="bg-surface-container-lowest shadow-sm overflow-hidden rounded-xl animate-slide-up">
        <div className="p-4 border-b border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-on-surface">Nhật ký Sản xuất Chi tiết</h3>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              className="pl-9 pr-3 py-1.5 bg-surface-container text-on-surface text-sm border-b-2 border-transparent focus:border-primary outline-none transition-all rounded-lg w-full sm:w-auto"
              placeholder="Tìm mã cuộn..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="p-4 text-left font-mono text-xs text-on-surface-variant uppercase">Thời gian</th>
                <th className="p-4 text-left font-mono text-xs text-on-surface-variant uppercase">Mã Cuộn (Coil ID)</th>
                <th className="p-4 text-left font-mono text-xs text-on-surface-variant uppercase">Loại Thép</th>
                <th className="p-4 text-right font-mono text-xs text-on-surface-variant uppercase">Khối lượng (Tấn)</th>
                <th className="p-4 text-center font-mono text-xs text-on-surface-variant uppercase">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredLogs.map((log) => (
                <tr key={log.coilId} className="hover:bg-surface-container-high/50 transition-colors">
                  <td className="p-4 text-sm font-medium">{log.time}</td>
                  <td className="p-4 font-mono text-xs text-on-surface-variant">{log.coilId}</td>
                  <td className="p-4 text-sm font-semibold">{log.steelType}</td>
                  <td className="p-4 text-right text-sm">{log.weight}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full font-mono text-[11px] uppercase font-semibold ${
                      log.status === 'passed' ? 'bg-success-bg text-success' :
                      log.status === 'failed' ? 'bg-error/10 text-error' :
                      'bg-warning-bg text-warning'
                    }`}>
                      {log.status === 'passed' ? 'Đạt chuẩn' : log.status === 'failed' ? 'Lỗi' : 'Chờ KĐ'}
                    </span>
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
