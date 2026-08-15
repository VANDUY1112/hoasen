import { useState, useMemo } from 'react'
import { AlertTriangle, Upload, Eye, Sparkles, CheckCircle2, RefreshCw, Layers, ShieldAlert, Zap } from 'lucide-react'
import Badge from '../components/ui/Badge'
import Pagination from '../components/ui/Pagination'
import { useToast } from '../components/ui/Toast'
import { defectRecords, defectImages } from '../data/mockData'

const defectLibrary = [
  {
    id: '1',
    title: 'Lỗi Trầy Xước Bề Mặt Mạ Nhôm',
    code: 'ERR-042',
    severity: 'high' as const,
    confidence: 99.4,
    recommendation: 'Kiểm tra con lăn dẫn hướng số 3 tại đầu ra lò ủ',
    image: defectImages[0].src,
  },
  {
    id: '2',
    title: 'Lỗi Gợn Sóng Biên Cuộn Thép',
    code: 'ERR-018',
    severity: 'medium' as const,
    confidence: 97.8,
    recommendation: 'Cân chỉnh lực ép khe hở trục cán nguội thứ cấp',
    image: defectImages[1].src,
  },
]

export default function QuanLyLoi() {
  const [selectedDefect, setSelectedDefect] = useState<typeof defectLibrary[0] | null>(null)
  const [scanning, setScanning] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const { addToast } = useToast()

  const paginatedDefects = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return defectRecords.slice(start, start + pageSize)
  }, [currentPage, pageSize])

  const handleSimulateScan = () => {
    setScanning(true)
    addToast({
      type: 'info',
      title: 'AI Computer Vision',
      message: 'Đang tải ảnh và phân tích độ đồng nhất bề mặt mạ...',
    })

    setTimeout(() => {
      setScanning(false)
      addToast({
        type: 'success',
        title: 'Nhận dạng AI hoàn tất!',
        message: 'Độ tin cậy 99.4%: Phát hiện vết trầy xước vi mô chiều sâu 0.02mm.',
      })
    }, 2000)
  }

  return (
    <div className="flex flex-col w-full p-3.5 sm:p-5 lg:p-6 gap-4 sm:gap-5 animate-fade-in max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight">
            Quản lý &amp; Nhận dạng Lỗi AI
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant/80 max-w-2xl leading-relaxed font-medium">
            Hệ thống camera quang học quét bề mặt tôn tốc độ cao kết hợp mô hình AI phân loại khuyết tật tôn cuộn.
          </p>
        </div>

        <button
          onClick={handleSimulateScan}
          disabled={scanning}
          className="cursor-pointer bg-primary text-on-primary px-4 py-2 rounded-xl font-bold shadow-xs hover:bg-on-primary-fixed-variant transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider font-mono w-full sm:w-auto"
        >
          <Upload size={15} className={scanning ? 'animate-spin' : ''} />
          {scanning ? 'Đang quét ảnh...' : 'Quét ảnh AI'}
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 stagger">
        <div className="col-span-2 md:col-span-1 bg-surface-container-lowest p-3.5 sm:p-5 shadow-xs border border-outline-variant/35 border-l-4 border-l-primary rounded-2xl card-hover">
          <p className="font-mono text-[10px] sm:text-xs text-on-surface-variant uppercase font-bold">Tỷ lệ lỗi toàn diện (YTD)</p>
          <span className="text-xl sm:text-3xl font-extrabold text-on-surface mt-0.5 sm:mt-1 block font-mono">1.42%</span>
          <p className="text-[11px] sm:text-xs text-emerald-600 mt-0.5 sm:mt-1 font-bold">-0.3% so với mục tiêu quý</p>
        </div>

        <div className="col-span-1 gradient-primary p-3.5 sm:p-5 shadow-md rounded-2xl text-on-primary card-hover flex justify-between items-start">
          <div className="min-w-0">
            <p className="font-mono text-[10px] sm:text-xs opacity-90 uppercase font-bold truncate">Lỗi nghiêm trọng</p>
            <span className="text-xl sm:text-3xl font-extrabold mt-0.5 sm:mt-1 block font-mono">04 <span className="text-xs sm:text-base font-normal opacity-90">vụ</span></span>
            <p className="text-[11px] sm:text-xs opacity-90 mt-0.5 sm:mt-1 font-medium truncate">Đã khoanh vùng</p>
          </div>
          <div className="p-2 rounded-xl bg-on-primary/15 shrink-0 ml-1">
            <AlertTriangle size={18} />
          </div>
        </div>

        <div className="col-span-1 bg-surface-container-lowest p-3.5 sm:p-5 shadow-xs border border-outline-variant/35 border-l-4 border-l-sky-500 rounded-2xl card-hover">
          <p className="font-mono text-[10px] sm:text-xs text-on-surface-variant uppercase font-bold truncate">Phản hồi TB</p>
          <span className="text-xl sm:text-3xl font-extrabold text-on-surface mt-0.5 sm:mt-1 block font-mono">18 <span className="text-xs sm:text-base font-normal text-on-surface-variant">phút</span></span>
          <p className="text-[11px] sm:text-xs text-on-surface-variant/80 mt-0.5 sm:mt-1 font-medium truncate">Từ lúc phát hiện</p>
        </div>
      </div>

      {/* Defect Log Table */}
      <div className="bg-surface-container-lowest shadow-xs border border-outline-variant/35 rounded-2xl overflow-hidden animate-slide-up">
        <div className="p-3 sm:p-4 border-b border-outline-variant/30 bg-surface-container-low/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-on-surface">Danh mục Khuyết tật Bề mặt &amp; Cơ tính</h3>
              <p className="text-xs text-on-surface-variant/80 font-medium">Phân loại lỗi theo tiêu chuẩn JIS G3302</p>
            </div>
          </div>
          <Badge variant="primary" size="sm">AI Trained v4.2</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-surface-container-low/30 border-b border-outline-variant/20">
                <th className="px-3.5 py-2.5 font-mono text-xs text-on-surface-variant uppercase font-bold whitespace-nowrap">Mã lỗi</th>
                <th className="px-3.5 py-2.5 font-mono text-xs text-on-surface-variant uppercase font-bold whitespace-nowrap">Loại lỗi</th>
                <th className="px-3.5 py-2.5 font-mono text-xs text-on-surface-variant uppercase font-bold whitespace-nowrap">Tần suất xuất hiện</th>
                <th className="px-3.5 py-2.5 font-mono text-xs text-on-surface-variant uppercase font-bold text-right whitespace-nowrap">Mức độ cảnh báo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-xs sm:text-[13px]">
              {paginatedDefects.map((d) => (
                <tr key={d.code} className="hover:bg-surface-container/50 transition-colors">
                  <td className="px-3.5 py-2.5 font-mono text-primary font-bold whitespace-nowrap">{d.code}</td>
                  <td className="px-3.5 py-2.5 font-semibold text-on-surface whitespace-nowrap">{d.type}</td>
                  <td className="px-3.5 py-2.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-20 sm:w-28 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="gradient-primary h-full rounded-full" style={{ width: `${(d.frequency / 50) * 100}%` }} />
                      </div>
                      <span className="font-mono text-xs font-bold text-on-surface">{d.frequency} lần</span>
                    </div>
                  </td>
                  <td className="px-3.5 py-2.5 text-right whitespace-nowrap">
                    <Badge variant={d.severity === 'high' ? 'error' : d.severity === 'medium' ? 'warning' : 'neutral'} size="sm">
                      {d.severity === 'high' ? 'Nghiêm trọng' : d.severity === 'medium' ? 'Trung bình' : 'Thấp'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={defectRecords.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setCurrentPage(1)
          }}
          pageSizeOptions={[3, 5, 10]}
        />
      </div>

      {/* AI Vision Defect Library */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            <h3 className="text-base sm:text-lg font-extrabold text-on-surface">Thư viện Nhận dạng Khuyết tật AI Vision</h3>
          </div>
          <span className="text-[11px] sm:text-xs text-on-surface-variant/80 font-mono font-semibold">Dataset: 250k+ ảnh</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {defectLibrary.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest border border-outline-variant/35 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group"
            >
              <div className="relative aspect-video overflow-hidden bg-surface-container-highest">
                <img
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  src={item.image}
                  alt={item.title}
                />
                <div className="absolute top-2.5 right-2.5">
                  <Badge variant="primary" pulse size="sm">
                    AI Match {item.confidence}%
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-white">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] sm:text-xs px-2 py-0.5 rounded bg-primary text-on-primary font-bold uppercase shrink-0">
                      {item.code}
                    </span>
                    <span className="text-xs sm:text-sm font-bold truncate">{item.title}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 border-t border-outline-variant/30 flex items-center justify-between gap-2 bg-surface-container-low/40">
                <div className="text-xs text-on-surface-variant truncate pr-2 font-medium">
                  <span className="font-bold text-on-surface">Khuyến nghị AI:</span> {item.recommendation}
                </div>
                <button
                  onClick={() => {
                    addToast({
                      type: 'info',
                      title: `Chi tiết phân tích ${item.code}`,
                      message: item.recommendation,
                    })
                  }}
                  className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-bold text-primary transition-colors shrink-0"
                >
                  Quang phổ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
