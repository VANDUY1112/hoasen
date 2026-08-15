import { useState } from 'react'
import { Save, Bell, Shield, Sliders, CheckCircle2, Globe, Factory, Mail, Smartphone } from 'lucide-react'
import CustomSelect, { SelectOption } from '../components/ui/CustomSelect'
import { useToast } from '../components/ui/Toast'

const factoryOptions: SelectOption[] = [
  { value: 'pm1', label: 'Nhà máy Tôn Hoa Sen Phú Mỹ (Bà Rịa - Vũng Tàu)', badge: 'Khu A', description: 'Tổ hợp cán nguội & mạ màu' },
  { value: 'nhonhoi', label: 'Nhà máy Hoa Sen Nhơn Hội (Bình Định)', badge: 'Khu B', description: 'Dây chuyền mạ hợp kim nhôm kẽm' },
  { value: 'nghean', label: 'Nhà máy Hoa Sen Đông Hồi (Nghệ An)', badge: 'Khu C', description: 'Sản xuất ống thép & tôn cán' },
]

const alertFrequencyOptions: SelectOption[] = [
  { value: 'immediate', label: 'Tức thì (Realtime Push)', badge: 'Ưu tiên', description: 'Gửi ngay khi phát hiện rung chấn hoặc lỗi' },
  { value: '5min', label: 'Mỗi 5 phút (Tổng hợp batch)', description: 'Giảm số lượng thông báo trùng lặp' },
  { value: 'shift_end', label: 'Tổng kết cuối ca trực', description: 'Báo cáo chi tiết sau mỗi 8 giờ' },
]

export default function CaiDat() {
  const [factory, setFactory] = useState('pm1')
  const [alertFreq, setAlertFreq] = useState('immediate')
  const [pushNotif, setPushNotif] = useState(true)
  const [emailDaily, setEmailDaily] = useState(true)
  const [autoOrderSpare, setAutoOrderSpare] = useState(false)
  const [saved, setSaved] = useState(false)
  const { addToast } = useToast()

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    addToast('success', 'Lưu cấu hình thành công!', 'Các tham số giám sát SCADA và kênh cảnh báo đã được cập nhật.')
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="p-4 sm:p-6 animate-fade-in max-w-5xl mx-auto pb-12">
      {/* Title */}
      <div className="mb-5 sm:mb-8">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-mono text-xs sm:text-sm text-primary uppercase font-bold tracking-wider">System Administration</span>
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs sm:text-sm text-on-surface-variant font-semibold">Cấu hình tham số</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight leading-none mb-2">
          Cài đặt &amp; Tham số Hệ thống
        </h1>
        <p className="text-xs sm:text-base text-on-surface-variant max-w-2xl leading-relaxed font-medium">
          Quản lý tham số cảnh báo SCADA, cấu hình nhà máy và chính sách thông báo đa kênh.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 sm:space-y-7">
        {/* Factory Selection */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 shadow-sm rounded-2xl border border-outline-variant/50">
          <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-outline-variant/40">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Factory size={22} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-on-surface">Khu phức hợp / Nhà máy Vận hành</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5">Chọn phân xưởng áp dụng cấu hình giám sát</p>
            </div>
          </div>

          <div className="max-w-2xl">
            <CustomSelect
              label="Nhà máy chính áp dụng"
              options={factoryOptions}
              value={factory}
              onChange={setFactory}
            />
          </div>
        </div>

        {/* Alert Thresholds */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 shadow-sm rounded-2xl border border-outline-variant/50">
          <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-outline-variant/40">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600">
              <Sliders size={22} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-on-surface">Ngưỡng Giới hạn Cảnh báo Thông minh</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5">Khi chỉ số vượt ngưỡng, hệ thống sẽ kích hoạt quy trình ứng phó tự động</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                Ngưỡng Cảnh Báo Lỗi (%)
              </label>
              <input
                type="number"
                step="0.1"
                defaultValue={1.5}
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 text-sm sm:text-base font-mono font-bold focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                Downtime Tối đa (Phút/ca)
              </label>
              <input
                type="number"
                defaultValue={120}
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 text-sm sm:text-base font-mono font-bold focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                Ngưỡng OEE Cảnh báo (%)
              </label>
              <input
                type="number"
                step="0.1"
                defaultValue={75}
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 text-sm sm:text-base font-mono font-bold focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Notification Channels */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 shadow-sm rounded-2xl border border-outline-variant/50">
          <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-outline-variant/40">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600">
              <Bell size={22} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-on-surface">Kênh Thông báo &amp; Dispatch Khẩn cấp</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5">Cấu hình người nhận và tần suất gửi cảnh báo</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-6">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-2">
                <Mail size={16} className="text-primary" /> Email Giám Đốc Nhà Máy
              </label>
              <input
                type="email"
                defaultValue="manager@hoasensteel.com"
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 text-sm sm:text-base font-mono font-medium focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-2">
                <Smartphone size={16} className="text-primary" /> Hotline SMS Khẩn cấp
              </label>
              <input
                type="tel"
                defaultValue="+84 901 234 567"
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 text-sm sm:text-base font-mono font-bold focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
              />
            </div>
          </div>

          <div className="mb-6 max-w-2xl">
            <CustomSelect
              label="Tần suất gửi thông báo"
              options={alertFrequencyOptions}
              value={alertFreq}
              onChange={setAlertFreq}
            />
          </div>

          {/* Toggle Switches with Refined Font Sizes */}
          <div className="space-y-3.5 pt-4 border-t border-outline-variant/40">
            <label className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/30">
              <div className="pr-4">
                <p className="text-sm sm:text-base font-bold text-on-surface">Bật Push Notification thời gian thực</p>
                <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5">Phát âm thanh và thông báo rung khi có máy dừng đột ngột</p>
              </div>
              <input
                type="checkbox"
                checked={pushNotif}
                onChange={(e) => setPushNotif(e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer rounded shrink-0"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/30">
              <div className="pr-4">
                <p className="text-sm sm:text-base font-bold text-on-surface">Báo cáo Tổng hợp Tự động qua Email</p>
                <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5">Gửi tệp Excel và phân tích AI vào lúc 06:00 mỗi sáng</p>
              </div>
              <input
                type="checkbox"
                checked={emailDaily}
                onChange={(e) => setEmailDaily(e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer rounded shrink-0"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/30">
              <div className="pr-4">
                <p className="text-sm sm:text-base font-bold text-on-surface">Tự động đặt hàng Phụ tùng khẩn cấp</p>
                <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5">Tạo Purchase Request khi tồn kho phụ tùng đạt mức Critical</p>
              </div>
              <input
                type="checkbox"
                checked={autoOrderSpare}
                onChange={(e) => setAutoOrderSpare(e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer rounded shrink-0"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            className={`
              cursor-pointer px-8 py-3.5 font-bold rounded-xl transition-all duration-200 flex items-center gap-2.5 text-sm sm:text-base shadow-md uppercase font-mono tracking-wider
              ${saved
                ? 'bg-emerald-600 text-on-primary shadow-emerald-600/20'
                : 'bg-primary text-on-primary hover:bg-on-primary-fixed-variant shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]'
              }
            `}
          >
            {saved ? (
              <>
                <CheckCircle2 size={18} /> Đã lưu cấu hình thành công!
              </>
            ) : (
              <>
                <Save size={18} /> Lưu cấu hình Hệ thống
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
