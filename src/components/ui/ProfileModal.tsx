import { useState } from 'react'
import { X, User, Shield, Key, History, Mail, Phone, Building, Calendar, CheckCircle2, Award, Camera, Save, Lock, Smartphone, RefreshCw, Cpu } from 'lucide-react'
import { useToast } from './Toast'
import { decorativeImages } from '../../data/mockData'

export interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { addToast } = useToast()
  const [activeTab, setActiveTab] = useState<'info' | 'roles' | 'security' | 'activity'>('info')
  const [saving, setSaving] = useState(false)

  // Local state for profile data
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('hoasen_user_profile')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        // fallback
      }
    }
    return {
      fullName: 'Võ Văn Duy',
      empCode: 'HSG-88204',
      roleTitle: 'Giám đốc Sản Xuất & Vận Hành Nhà Máy',
      department: 'Khối Quản Lý Vận Hành KCN Phú Mỹ 1',
      email: 'vanduy.vo@hoasengroup.vn',
      phone: '0901 888 999',
      joinDate: '15/03/2018',
      location: 'Nhà máy Tôn Hoa Sen Phú Mỹ (Bà Rịa - Vũng Tàu)',
      bio: 'Phụ trách điều hành toàn diện 4 dây chuyền cán nguội, mạ kẽm tốc độ cao và sơn phủ màu. Kiểm soát tiêu chuẩn chất lượng ISO 9001:2015 và an toàn lao động.',
    }
  })

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  if (!isOpen) return null

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      localStorage.setItem('hoasen_user_profile', JSON.stringify(profile))
      setSaving(false)
      addToast('success', 'Cập nhật hồ sơ thành công!', 'Thông tin cá nhân đã được lưu trên hệ thống ERP.')
    }, 800)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      addToast('error', 'Mật khẩu không khớp!', 'Vui lòng xác nhận mật khẩu mới chính xác.')
      return
    }
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      addToast('success', 'Đổi mật khẩu thành công!', 'Mật khẩu mới đã có hiệu lực trên toàn bộ thiết bị.')
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-in">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-outline-variant/40 flex items-center justify-between bg-surface-container-low/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
              <User size={22} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface">Hồ Sơ Cá Nhân &amp; Tài Khoản</h2>
              <p className="text-xs sm:text-sm text-on-surface-variant font-medium">
                Quản lý thông tin định danh cán bộ, phân quyền ERP và thiết lập bảo mật
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex px-6 pt-3 border-b border-outline-variant/40 bg-surface-container-lowest overflow-x-auto gap-2">
          {[
            { id: 'info', label: 'Thông tin chung', icon: User },
            { id: 'roles', label: 'Vai trò & Phân quyền', icon: Shield },
            { id: 'security', label: 'Bảo mật & Mật khẩu', icon: Key },
            { id: 'activity', label: 'Nhật ký truy cập', icon: History },
          ].map((t) => {
            const Icon = t.icon
            const isActive = activeTab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`
                  cursor-pointer flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-all duration-150 whitespace-nowrap
                  ${isActive
                    ? 'border-primary text-primary font-extrabold'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant/60'
                  }
                `}
              >
                <Icon size={16} />
                <span>{t.label}</span>
              </button>
            )
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: INFO */}
          {activeTab === 'info' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Profile Card Banner */}
              <div className="p-5 rounded-2xl gradient-primary text-on-primary shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-5 relative overflow-hidden">
                <div className="relative group shrink-0">
                  <img
                    src={decorativeImages.profile}
                    alt="Avatar"
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-white/40 shadow-md"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera size={22} className="text-white" />
                  </div>
                </div>

                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                    <h3 className="text-2xl font-extrabold">{profile.fullName}</h3>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold uppercase tracking-wider">
                      {profile.empCode}
                    </span>
                  </div>
                  <p className="text-sm font-medium opacity-90 mb-3">{profile.roleTitle}</p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono opacity-90">
                    <span className="flex items-center gap-1.5">
                      <Building size={14} /> {profile.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} /> Gia nhập: {profile.joinDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-semibold focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Mã Cán Bộ / Nhân Viên
                  </label>
                  <input
                    type="text"
                    value={profile.empCode}
                    disabled
                    className="w-full bg-surface-container border border-outline-variant/40 rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-on-surface-variant/80 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail size={14} /> Email Tập Đoàn
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone size={14} /> Số Điện Thoại Hotline
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-mono font-semibold focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Vị Trí &amp; Đơn Vị Công Tác
                  </label>
                  <input
                    type="text"
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Ghi Chú Phạm Vi Phụ Trách
                  </label>
                  <textarea
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all resize-none font-medium leading-relaxed"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-outline-variant/40 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer px-5 py-2.5 rounded-xl border border-outline-variant/60 text-on-surface-variant hover:bg-surface-container font-semibold text-sm transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="cursor-pointer px-6 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-on-primary-fixed-variant font-bold text-sm shadow-md shadow-primary/20 transition-all flex items-center gap-2"
                >
                  {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                  <span>{saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: ROLES */}
          {activeTab === 'roles' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">Cấp độ đặc quyền</span>
                  <h4 className="text-lg font-extrabold text-on-surface mt-0.5">Quản Trị Viên Cao Cấp (Super Admin / Plant Director)</h4>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-mono text-xs font-extrabold uppercase border border-emerald-500/20">
                  Hiệu Lực Toàn Phần
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Toàn quyền Điều khiển Dây chuyền SCADA', desc: 'Can thiệp tốc độ kéo tôn, nhiệt độ lò mạ và dừng khẩn cấp PLC.', icon: Cpu },
                  { name: 'Phê duyệt Nhập/Xuất kho & Kiểm kê WMS', desc: 'Ký duyệt các phiếu nhập kho thành phẩm và điều phối cuộn tôn.', icon: Building },
                  { name: 'Ban hành Lệnh Giao Ca & Chỉ tiêu KPIs', desc: 'Thiết lập định mức sản lượng, downtime tối đa và đánh giá nhân sự.', icon: Award },
                  { name: 'Báo cáo & Phân tích Giám Đốc Điều Hành', desc: 'Xem và xuất tệp Excel báo cáo doanh thu, OEE và tỷ lệ lỗi toàn diện.', icon: Shield },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.name} className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/50 flex gap-3.5 items-start">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-on-surface">{item.name}</h5>
                        <p className="text-xs text-on-surface-variant font-medium mt-1 leading-snug">{item.desc}</p>
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-600 mt-2">
                          <CheckCircle2 size={13} /> Đã cấp quyền
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Change Password Form */}
              <form onSubmit={handleChangePassword} className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/50 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/30">
                  <Lock size={18} className="text-primary" />
                  <h4 className="font-extrabold text-base text-on-surface">Đổi Mật Khẩu Truy Cập</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      Mật khẩu hiện tại
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-mono focus:border-primary outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-mono focus:border-primary outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                      Xác nhận mật khẩu
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-2.5 text-sm font-mono focus:border-primary outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="cursor-pointer px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs sm:text-sm uppercase font-mono tracking-wider hover:bg-on-primary-fixed-variant transition-colors"
                  >
                    {saving ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                  </button>
                </div>
              </form>

              {/* 2FA Section */}
              <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-on-surface">Xác Thực 2 Lớp (2FA Authentication)</h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5">
                      Yêu cầu mã OTP qua điện thoại hoặc ứng dụng Google Authenticator khi đăng nhập từ thiết bị mới.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={(e) => {
                      setTwoFactorEnabled(e.target.checked)
                      addToast('info', 'Trạng thái 2FA', e.target.checked ? 'Đã kích hoạt xác thực 2 lớp.' : 'Đã tắt xác thực 2 lớp.')
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>
            </div>
          )}

          {/* TAB 4: ACTIVITY LOG */}
          {activeTab === 'activity' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-extrabold text-sm text-on-surface uppercase tracking-wider font-mono">Phiên đăng nhập gần nhất</h4>
                <span className="text-xs text-on-surface-variant font-mono">IP mạng nội bộ: 192.168.10.45</span>
              </div>

              {[
                { action: 'Đăng nhập thành công từ Chrome trên Windows 11', time: '15:10 - Hôm nay', ip: '192.168.10.45 (Văn phòng Điều hành)', status: 'success' },
                { action: 'Ban hành chỉ tiêu sản xuất Ca 1 - Dây chuyền Cán Nguội 01', time: '07:30 - Hôm nay', ip: '192.168.10.45', status: 'info' },
                { action: 'Phê duyệt 12 Phiếu Nhập kho Tôn Mạ Kẽm Z275', time: '16:45 - Hôm qua', ip: '192.168.10.45', status: 'info' },
                { action: 'Đăng nhập từ Thiết bị Di động (Hoa Sen Mobile ERP)', time: '11:20 - 13/08/2026', ip: '118.69.182.204 (4G Mobifone)', status: 'success' },
              ].map((log, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-surface-container-low/60 border border-outline-variant/30 flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <p className="font-bold text-on-surface">{log.action}</p>
                      <p className="text-xs text-on-surface-variant font-mono font-medium mt-0.5">{log.ip}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-semibold text-on-surface-variant shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
