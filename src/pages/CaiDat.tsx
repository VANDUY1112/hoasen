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
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6 lg:py-8 gap-5 sm:gap-6 lg:gap-8 animate-fade-in pb-16">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight leading-none mb-2">
          Cài đặt &amp; Tham số Hệ thống
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-on-surface-variant/80 max-w-3xl leading-relaxed font-medium">
          Quản lý tham số cảnh báo SCADA, cấu hình phân xưởng và chính sách dispatch thông báo đa kênh.
        </p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8">
        {/* Left Column (7 cols): Core Parameters & Thresholds */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* Factory Selection */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 lg:p-7 shadow-sm rounded-2xl border border-outline-variant/40">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-outline-variant/30">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                <Factory size={22} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-on-surface">Khu phức hợp / Nhà máy Vận hành</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant/80 font-medium mt-0.5">Chọn phân xưởng áp dụng cấu hình giám sát SCADA</p>
              </div>
            </div>

            <div>
              <CustomSelect
                label="Nhà máy chính áp dụng"
                options={factoryOptions}
                value={factory}
                onChange={setFactory}
              />
            </div>
          </div>

          {/* Alert Thresholds */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 lg:p-7 shadow-sm rounded-2xl border border-outline-variant/40">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-outline-variant/30">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 shrink-0">
                <Sliders size={22} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-on-surface">Ngưỡng Giới hạn Cảnh báo Thông minh</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant/80 font-medium mt-0.5">Tự động kích hoạt quy trình ứng phó khi chỉ số vượt ngưỡng an toàn</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

          {/* Contact Dispatch Channels */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 lg:p-7 shadow-sm rounded-2xl border border-outline-variant/40">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-outline-variant/30">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20 shrink-0">
                <Bell size={22} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-on-surface">Kênh Tiếp nhận Cảnh báo Khẩn cấp</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant/80 font-medium mt-0.5">Cấu hình đầu mối tiếp nhận trực tiếp từ hệ thống SCADA</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Mail size={16} className="text-primary shrink-0" /> Email Giám Đốc Nhà Máy
                </label>
                <input
                  type="email"
                  defaultValue="manager@hoasensteel.com"
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 text-sm sm:text-base font-mono font-medium focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Smartphone size={16} className="text-primary shrink-0" /> Hotline SMS Khẩn cấp
                </label>
                <input
                  type="tel"
                  defaultValue="+84 901 234 567"
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 text-sm sm:text-base font-mono font-bold focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <CustomSelect
                label="Tần suất gửi thông báo"
                options={alertFrequencyOptions}
                value={alertFreq}
                onChange={setAlertFreq}
              />
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Toggles, SCADA Server Status & Save Action */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          {/* Notification Policy & Automation Toggles */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 lg:p-7 shadow-sm rounded-2xl border border-outline-variant/40">
            <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-on-surface mb-1">Chính sách Tự động hóa</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant/80 font-medium mb-4">Các tính năng phát hiện và kích hoạt tức thời</p>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/30">
                <div className="pr-3">
                  <p className="text-xs sm:text-sm font-bold text-on-surface">Bật Push Notification thời gian thực</p>
                  <p className="text-xs text-on-surface-variant/80 font-medium mt-0.5">Phát chuông và thông báo khi có sự cố dừng máy</p>
                </div>
                <input
                  type="checkbox"
                  checked={pushNotif}
                  onChange={(e) => setPushNotif(e.target.checked)}
                  className="w-5 h-5 accent-primary cursor-pointer rounded shrink-0"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/30">
                <div className="pr-3">
                  <p className="text-xs sm:text-sm font-bold text-on-surface">Báo cáo Tổng hợp Tự động qua Email</p>
                  <p className="text-xs text-on-surface-variant/80 font-medium mt-0.5">Gửi tệp Excel và phân tích AI vào lúc 06:00 mỗi sáng</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailDaily}
                  onChange={(e) => setEmailDaily(e.target.checked)}
                  className="w-5 h-5 accent-primary cursor-pointer rounded shrink-0"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/30">
                <div className="pr-3">
                  <p className="text-xs sm:text-sm font-bold text-on-surface">Tự động đặt hàng Phụ tùng khẩn cấp</p>
                  <p className="text-xs text-on-surface-variant/80 font-medium mt-0.5">Tạo Purchase Request khi tồn kho đạt mức Critical</p>
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

          {/* Live SCADA Server Status Card */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-on-surface-variant uppercase">SCADA Gateway Server</span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Đang đồng bộ
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs text-on-surface-variant border-t border-outline-variant/30">
              <div>
                <p className="text-[11px] uppercase font-bold text-on-surface-variant/70">Protocol</p>
                <p className="font-bold text-on-surface mt-0.5">OPC UA / Modbus TCP</p>
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-on-surface-variant/70">Latency</p>
                <p className="font-bold text-primary mt-0.5">&lt; 15 ms</p>
              </div>
            </div>
          </div>

          {/* Save Action Card */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/40">
            <button
              type="submit"
              className={`
                cursor-pointer w-full py-3.5 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 text-sm sm:text-base shadow-md font-mono tracking-wider
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
        </div>
      </form>
    </div>
  )
}
