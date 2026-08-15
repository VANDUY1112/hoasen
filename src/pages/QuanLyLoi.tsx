import { defectRecords, defectImages } from '../data/mockData'

export default function QuanLyLoi() {
  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-5xl font-bold text-on-surface tracking-tight">Quản lý Lỗi Sản phẩm</h1>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        <div className="bg-surface-container-lowest p-5 shadow-xl border-t-4 border-primary rounded-xl card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase">Tỷ lệ lỗi (YTD)</p>
          <span className="text-3xl sm:text-5xl font-bold text-on-surface mt-2 block">1.42%</span>
        </div>
        <div className="gradient-primary p-5 shadow-xl rounded-xl text-on-primary card-hover">
          <p className="font-mono text-xs opacity-80 uppercase">Lỗi nghiêm trọng</p>
          <span className="text-3xl sm:text-5xl font-bold mt-2 block">04</span>
        </div>
        <div className="sm:col-span-2 bg-surface-container-lowest p-5 shadow-xl border-t-4 border-on-surface rounded-xl card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase">Thời gian phản hồi TB</p>
          <span className="text-3xl sm:text-5xl font-bold text-on-surface mt-2 block">18m</span>
        </div>
      </div>

      {/* Defect Table */}
      <div className="bg-surface-container-lowest shadow-md overflow-hidden rounded-xl">
        <div className="p-4 border-b border-outline-variant bg-surface-container-low">
          <h3 className="text-lg font-bold text-on-surface">Chi tiết Lỗi Phát hiện</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[500px]">
            <thead>
              <tr className="bg-surface">
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase">Mã lỗi</th>
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase">Loại lỗi</th>
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase">Tần suất</th>
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase text-right">Mức độ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {defectRecords.map((d) => (
                <tr key={d.code} className="hover:bg-surface-container transition-colors">
                  <td className="px-4 py-3 font-mono text-primary font-bold text-sm">{d.code}</td>
                  <td className="px-4 py-3 text-[15px]">{d.type}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${(d.frequency / 50) * 100}%` }} />
                      </div>
                      <span className="font-mono text-xs">{d.frequency} lần</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`px-2.5 py-1 rounded-full font-mono text-[11px] uppercase font-semibold ${
                      d.severity === 'high' ? 'bg-error/10 text-error' :
                      d.severity === 'medium' ? 'bg-warning-bg text-warning' :
                      'bg-surface-container text-on-surface-variant'
                    }`}>
                      {d.severity === 'high' ? 'Cao' : d.severity === 'medium' ? 'TB' : 'Thấp'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Defect Library */}
      <div>
        <h3 className="text-lg font-bold text-on-surface mb-4">Thư viện Nhận dạng Lỗi AI</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {defectImages.map((img) => (
            <div key={img.label} className="group relative overflow-hidden bg-surface-container-highest aspect-video rounded-xl">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                src={img.src}
                alt={img.label}
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-on-surface/80 to-transparent text-on-primary">
                <p className="font-mono text-xs uppercase tracking-wider font-semibold">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
