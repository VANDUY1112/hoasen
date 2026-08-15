import { useState } from 'react'
import { Save } from 'lucide-react'

export default function CaiDat() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-4 sm:p-6 animate-fade-in">
      <h1 className="text-3xl md:text-5xl font-bold text-on-surface mb-2">Cài đặt Hệ thống</h1>
      <p className="text-base text-on-surface-variant mb-6">
        Quản lý tham số cảnh báo, phân quyền quản trị và cấu hình kênh thông báo.
      </p>

      <div className="max-w-2xl space-y-6">
        {/* Alert Thresholds */}
        <div className="bg-surface-container-lowest p-6 shadow-sm rounded-xl">
          <h3 className="text-lg font-bold text-on-surface mb-4">Ngưỡng Cảnh báo</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Ngưỡng Cảnh Báo Lỗi (%)</label>
              <input
                type="number"
                step="0.1"
                defaultValue={1.5}
                className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-lg bg-surface-container-low text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Ngưỡng Downtime Tối đa (Phút/ca)</label>
              <input
                type="number"
                defaultValue={120}
                className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-lg bg-surface-container-low text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Ngưỡng OEE Cảnh báo (%)</label>
              <input
                type="number"
                step="0.1"
                defaultValue={75}
                className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-lg bg-surface-container-low text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Notification */}
        <div className="bg-surface-container-lowest p-6 shadow-sm rounded-xl">
          <h3 className="text-lg font-bold text-on-surface mb-4">Cấu hình Thông báo</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Email Nhận Báo Cáo Sự Cố</label>
              <input
                type="email"
                defaultValue="manager@hoasensteel.com"
                className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-lg bg-surface-container-low text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-on-surface-variant uppercase mb-2">Số điện thoại SMS Cảnh báo</label>
              <input
                type="tel"
                defaultValue="+84 901 234 567"
                className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-lg bg-surface-container-low text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" id="push-notif" />
              <label htmlFor="push-notif" className="text-sm text-on-surface">Bật Push Notification cho cảnh báo khẩn cấp</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" id="email-daily" />
              <label htmlFor="email-daily" className="text-sm text-on-surface">Gửi báo cáo tổng hợp hàng ngày qua email</label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`px-8 py-3 font-semibold rounded-xl transition-all flex items-center gap-2 text-sm shadow-md ${
            saved ? 'bg-success text-on-primary' : 'bg-primary text-on-primary hover:bg-on-primary-fixed-variant'
          }`}
        >
          <Save size={16} />
          {saved ? 'Đã lưu thành công!' : 'Lưu cấu hình'}
        </button>
      </div>
    </div>
  )
}
