import { downtimeRecords } from '../data/mockData'

export default function ThoiGianDungMay() {
  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 animate-fade-in">
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary font-semibold">Live Performance Monitoring</span>
          <h1 className="text-3xl md:text-5xl font-bold text-on-surface tracking-tight mt-1">Thời gian Dừng máy</h1>
        </div>
        <div className="bg-surface-container-low p-4 rounded-xl shadow-sm w-full sm:w-auto">
          <p className="font-mono text-[11px] text-on-surface-variant uppercase mb-1">Tổng thời gian dừng</p>
          <p className="text-3xl font-bold text-primary">142 <span className="text-sm font-normal text-on-surface-variant">phút</span></p>
        </div>
      </section>

      <section className="bg-surface-container-lowest shadow-sm rounded-xl overflow-hidden animate-slide-up">
        <div className="p-4 border-b border-outline-variant">
          <h3 className="text-lg font-bold">Nhật ký Dừng máy Chi tiết</h3>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[500px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase">Thời điểm</th>
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase">Thiết bị</th>
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase">Thời lượng</th>
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {downtimeRecords.map((r, i) => (
                <tr key={i} className="hover:bg-surface-container transition-colors">
                  <td className="p-4 text-sm font-medium">{r.time}</td>
                  <td className="p-4 text-sm font-semibold">{r.equipment}</td>
                  <td className={`p-4 text-sm font-medium ${r.status === 'repairing' ? 'text-error' : ''}`}>{r.duration}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 font-mono text-[11px] rounded-full uppercase font-semibold ${
                      r.status === 'repairing' ? 'bg-error/10 text-error' :
                      r.status === 'resolved' ? 'bg-success-bg text-success' :
                      'bg-warning-bg text-warning'
                    }`}>
                      {r.status === 'repairing' ? 'Đang sửa chữa' : r.status === 'resolved' ? 'Đã xử lý' : 'Chờ xử lý'}
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
