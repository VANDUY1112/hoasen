import { useState } from 'react'
import { AlertTriangle, Upload, Eye, Sparkles, CheckCircle2, RefreshCw, Layers, ShieldAlert, Zap } from 'lucide-react'
import Badge from '../components/ui/Badge'
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
  const { addToast } = useToast()

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
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 sm:gap-8 animate-fade-in max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs sm:text-sm text-primary uppercase font-bold tracking-wider">Quality Assurance &amp; AI Vision</span>
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs sm:text-sm text-on-surface-variant font-semibold">Kiểm định chất lượng</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight">
            Quản lý &amp; Nhận dạng Lỗi AI
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed font-medium">
            Hệ thống camera quang học quét bề mặt tôn tốc độ cao kết hợp mô hình AI phân loại khuyết tật tôn cuộn.
          </p>
        </div>

        <button
          onClick={handleSimulateScan}
          disabled={scanning}
          className="cursor-pointer bg-primary text-on-primary px-5 py-2.5 rounded-xl font-bold shadow-md shadow-primary/20 hover:bg-on-primary-fixed-variant transition-all flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider font-mono w-fit"
        >
          <Upload size={18} className={scanning ? 'animate-spin' : ''} />
          {scanning ? 'Đang quét ảnh...' : 'Quét ảnh AI'}
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 stagger">
        <div className="bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/40 border-l-4 border-l-primary rounded-2xl card-hover">
          <p className="font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold">Tỷ lệ lỗi toàn diện (YTD)</p>
          <span className="text-4xl sm:text-5xl font-extrabold text-on-surface mt-2 block font-mono">1.42%</span>
          <p className="text-sm text-emerald-600 mt-1.5 font-bold">-0.3% so với mục tiêu quý</p>
        </div>

        <div className="gradient-primary p-6 shadow-xl rounded-2xl text-on-primary card-hover flex justify-between items-start">
          <div>
            <p className="font-mono text-xs sm:text-sm opacity-90 uppercase font-bold">Lỗi nghiêm trọng cần xử lý</p>
            <span className="text-4xl sm:text-5xl font-extrabold mt-2 block font-mono">04 <span className="text-lg font-normal opacity-90">vụ</span></span>
            <p className="text-sm opacity-90 mt-1.5 font-medium">Đã khoanh vùng cách ly cuộn lỗi</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-on-primary/15">
            <AlertTriangle size={32} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/40 border-l-4 border-l-sky-500 rounded-2xl card-hover">
          <p className="font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold">Thời gian phản hồi TB</p>
          <span className="text-4xl sm:text-5xl font-extrabold text-on-surface mt-2 block font-mono">18 <span className="text-lg font-normal text-on-surface-variant">phút</span></span>
          <p className="text-sm text-on-surface-variant mt-1.5 font-medium">Từ lúc phát hiện đến khi hiệu chỉnh máy</p>
        </div>
      </div>

      {/* Defect Log Table */}
      <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/50 rounded-2xl overflow-hidden animate-slide-up">
        <div className="p-4 sm:p-5 border-b border-outline-variant/40 bg-surface-container-low/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-on-surface">Danh mục Khuyết tật Bề mặt &amp; Cơ tính</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant font-medium">Phân loại lỗi theo tiêu chuẩn JIS G3302</p>
            </div>
          </div>
          <Badge variant="primary" size="sm">AI Trained v4.2</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low/40 border-b border-outline-variant/30">
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold">Mã lỗi</th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold">Loại lỗi</th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold">Tần suất xuất hiện</th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold text-right">Mức độ cảnh báo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-sm sm:text-base">
              {defectRecords.map((d) => (
                <tr key={d.code} className="hover:bg-surface-container/60 transition-colors">
                  <td className="px-5 py-4 font-mono text-primary font-extrabold text-sm sm:text-base">{d.code}</td>
                  <td className="px-5 py-4 font-bold text-on-surface text-base">{d.type}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-28 h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="gradient-primary h-full rounded-full" style={{ width: `${(d.frequency / 50) * 100}%` }} />
                      </div>
                      <span className="font-mono text-sm font-extrabold">{d.frequency} lần</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
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

      {/* AI Vision Defect Library */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-primary" />
            <h3 className="text-lg sm:text-xl font-extrabold text-on-surface">Thư viện Nhận dạng Khuyết tật AI Vision</h3>
          </div>
          <span className="text-xs sm:text-sm text-on-surface-variant font-mono font-semibold">Dataset: 250,000+ ảnh bề mặt</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {defectLibrary.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest border border-outline-variant/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="relative aspect-video overflow-hidden bg-surface-container-highest">
                <img
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  src={item.image}
                  alt={item.title}
                />
                <div className="absolute top-3.5 right-3.5">
                  <Badge variant="primary" pulse size="sm">
                    AI Match {item.confidence}%
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-white">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-primary text-on-primary font-extrabold uppercase mr-2.5">
                    {item.code}
                  </span>
                  <span className="text-base sm:text-lg font-bold">{item.title}</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 border-t border-outline-variant/30 flex items-center justify-between bg-surface-container-low/40">
                <div className="text-sm text-on-surface-variant truncate pr-3 font-medium">
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
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs sm:text-sm font-bold text-primary transition-colors shrink-0"
                >
                  Xem quang phổ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
