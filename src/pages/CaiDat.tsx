import { useState } from 'react'
import { Save, Bell, Sliders, CheckCircle2, Factory, Mail, Smartphone, ShieldCheck, Zap } from 'lucide-react'
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
    addToast({
      type: 'success',
      title: 'Lưu cấu hình thành công!',
      message: 'Các tham số giám sát SCADA và kênh cảnh báo đã được cập nhật đồng bộ.',
    })
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="p-3 sm:p-5 lg:p-6 animate-fade-in max-w-5xl mx-auto pb-12">
      {/* Title */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight leading-none mb-1.5">
          Cài đặt &amp; Tham số Hệ thống
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant/80 max-w-2xl leading-relaxed font-medium">
          Quản lý tham số cảnh báo SCADA, cấu hình phân xưởng và chính sách dispatch thông báo đa kênh.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-3.5 sm:space-y-4">
        {/* Factory Selection */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-5 shadow-xs rounded-2xl border border-outline-variant/35">
          <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-outline-variant/30">
            <div className="p-1.5 sm:p-2 rounded-xl bg-primary/10 text-primary shrink-0">
              <Factory size={17} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-on-surface">Khu phức hợp / Nhà máy Vận hành</h3>
              <p className="text-[11px] sm:text-xs text-on-surface-variant/80 font-medium mt-0.5">Chọn phân xưởng áp dụng cấu hình giám sát SCADA</p>
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
        <div className="bg-surface-container-lowest p-3.5 sm:p-5 shadow-xs rounded-2xl border border-outline-variant/35">
          <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-outline-variant/30">
            <div className="p-1.5 sm:p-2 rounded-xl bg-amber-500/10 text-amber-600 shrink-0">
              <Sliders size={17} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-on-surface">Ngưỡng Giới hạn Cảnh báo Thông minh</h3>
              <p className="text-[11px] sm:text-xs text-on-surface-variant/80 font-medium mt-0.5">Tự động kích hoạt quy trình ứng phó khi chỉ số vượt ngưỡng an toàn</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Ngưỡng Cảnh Báo Lỗi (%)
              </label>
              <input
                type="number"
                step="0.1"
                defaultValue={1.5}
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm font-mono font-bold focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Downtime Tối đa (Phút/ca)
              </label>
              <input
                type="number"
                defaultValue={120}
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm font-mono font-bold focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                Ngưỡng OEE Cảnh báo (%)
              </label>
              <input
                type="number"
                step="0.1"
                defaultValue={75}
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm font-mono font-bold focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Notification Channels */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-5 shadow-xs rounded-2xl border border-outline-variant/35">
          <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-outline-variant/30">
            <div className="p-1.5 sm:p-2 rounded-xl bg-sky-500/10 text-sky-600 shrink-0">
              <Bell size={17} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-on-surface">Kênh Thông báo &amp; Dispatch Khẩn cấp</h3>
              <p className="text-[11px] sm:text-xs text-on-surface-variant/80 font-medium mt-0.5">Cấu hình đầu mối tiếp nhận và tần suất gửi cảnh báo tự động</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Mail size={14} className="text-primary shrink-0" /> Email Giám Đốc Nhà Máy
              </label>
              <input
                type="email"
                defaultValue="manager@hoasensteel.com"
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm font-mono font-medium focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Smartphone size={14} className="text-primary shrink-0" /> Hotline SMS Khẩn cấp
              </label>
              <input
                type="tel"
                defaultValue="+84 901 234 567"
                className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm font-mono font-bold focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
              />
            </div>
          </div>

          <div className="mb-4 max-w-2xl">
            <CustomSelect
              label="Tần suất gửi thông báo"
              options={alertFrequencyOptions}
              value={alertFreq}
              onChange={setAlertFreq}
            />
          </div>

          {/* Toggle Switches with Responsive Font Sizes */}
          <div className="space-y-2.5 pt-3.5 border-t border-outline-variant/30">
            <label className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/30">
              <div className="pr-3">
                <p className="text-xs sm:text-sm font-bold text-on-surface">Bật Push Notification thời gian thực</p>
                <p className="text-[11px] sm:text-xs text-on-surface-variant/80 font-medium mt-0.5">Phát âm thanh và thông báo rung khi có sự cố dừng máy khẩn cấp</p>
              </div>
              <input
                type="checkbox"
                checked={pushNotif}
                onChange={(e) => setPushNotif(e.target.checked)}
                className="w-4 h-4 sm:w-5 sm:h-5 accent-primary cursor-pointer rounded shrink-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/30">
              <div className="pr-3">
                <p className="text-xs sm:text-sm font-bold text-on-surface">Báo cáo Tổng hợp Tự động qua Email</p>
                <p className="text-[11px] sm:text-xs text-on-surface-variant/80 font-medium mt-0.5">Gửi tệp Excel và phân tích AI vào lúc 06:00 mỗi sáng</p>
              </div>
              <input
                type="checkbox"
                checked={emailDaily}
                onChange={(e) => setEmailDaily(e.target.checked)}
                className="w-4 h-4 sm:w-5 sm:h-5 accent-primary cursor-pointer rounded shrink-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/30">
              <div className="pr-3">
                <p className="text-xs sm:text-sm font-bold text-on-surface">Tự động đặt hàng Phụ tùng khẩn cấp</p>
                <p className="text-[11px] sm:text-xs text-on-surface-variant/80 font-medium mt-0.5">Tạo Purchase Request khi tồn kho phụ tùng đạt mức cảnh báo Critical</p>
              </div>
              <input
                type="checkbox"
                checked={autoOrderSpare}
                onChange={(e) => setAutoOrderSpare(e.target.checked)}
                className="w-4 h-4 sm:w-5 sm:h-5 accent-primary cursor-pointer rounded shrink-0"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            className={`
              cursor-pointer w-full sm:w-auto px-7 py-3 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md font-mono tracking-wider
              ${saved
                ? 'bg-emerald-600 text-on-primary shadow-emerald-600/20'
                : 'bg-primary text-on-primary hover:bg-on-primary-fixed-variant shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]'
              }
            `}
          >
            {saved ? (
              <>
                <CheckCircle2 size={16} /> Đã lưu cấu hình thành công!
              </>
            ) : (
              <>
                <Save size={16} /> Lưu cấu hình Hệ thống
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
