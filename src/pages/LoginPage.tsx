import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Factory,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Cpu,
  RefreshCw,
  Layers,
  ArrowLeft,
  KeyRound,
} from 'lucide-react'
import { useToast } from '../components/ui/Toast'
import { decorativeImages } from '../data/mockData'

interface DemoAccount {
  name: string
  role: string
  code: string
  email: string
  avatarBadge: string
}

const demoAccounts: DemoAccount[] = [
  {
    name: 'Hồ Văn Duy',
    role: 'Giám đốc Điều hành Nhà máy',
    code: 'HSG-CEO-01',
    email: 'duy.hovan@hoasengroup.vn',
    avatarBadge: 'CEO',
  },
  {
    name: 'Nguyễn Văn An',
    role: 'Trưởng nhóm Cơ khí Bảo dưỡng',
    code: 'HSG-TECH-07',
    email: 'an.nguyen@hoasengroup.vn',
    avatarBadge: 'TECH',
  },
  {
    name: 'Trần Thị Mai',
    role: 'Trưởng ca Sản xuất Dây chuyền 02',
    code: 'HSG-SHIFT-02',
    email: 'mai.tran@hoasengroup.vn',
    avatarBadge: 'SHIFT',
  },
  {
    name: 'Lê Hoàng Long',
    role: 'Quản lý Kho Tôn Cuộn',
    code: 'HSG-LOGIS-04',
    email: 'long.le@hoasengroup.vn',
    avatarBadge: 'LOGIS',
  },
]

export default function LoginPage() {
  const navigate = useNavigate()
  const { addToast } = useToast()

  const [identifier, setIdentifier] = useState('duy.hovan@hoasengroup.vn')
  const [password, setPassword] = useState('••••••••••••')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string>('HSG-CEO-01')

  const handleSelectDemo = (acc: DemoAccount) => {
    setSelectedRole(acc.code)
    setIdentifier(acc.email)
    setPassword('HoaSen@2026')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!identifier.trim()) {
      addToast({
        type: 'warning',
        title: 'Thiếu thông tin',
        message: 'Vui lòng nhập Mã nhân viên hoặc Email doanh nghiệp.',
      })
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      const currentAcc = demoAccounts.find((a) => a.code === selectedRole) || {
        name: 'Cán bộ Quản lý',
        role: 'Quản trị viên Hệ thống',
      }

      addToast({
        type: 'success',
        title: 'Đăng nhập thành công',
        message: `Chào mừng ${currentAcc.name} (${currentAcc.role}) trở lại hệ thống SCADA Hoa Sen Group!`,
      })

      navigate('/tong-quan')
    }, 800)
  }

  return (
    <div className="min-h-screen w-full bg-surface flex flex-col justify-center relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-multiply scale-105"
          style={{ backgroundImage: `url('${decorativeImages.banner}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-surface via-surface/95 to-surface/80" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b5000b_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Top Header Navigation */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link
          to="/landing"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-on-surface-variant hover:text-primary transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Về Trang chủ</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs font-bold text-on-surface-variant/80">
            SCADA Server Online
          </span>
        </div>
      </div>

      {/* Main Login Content Card */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/60 overflow-hidden">
          {/* Left Hero Branding Column (hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-primary via-[#8e0009] to-[#590006] text-on-primary p-8 lg:p-10 flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Logo */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <img
                  alt="Hoa Sen Group"
                  className="h-11 w-11 rounded-xl object-cover bg-white p-0.5 shadow-md"
                  src="/logo.jpg"
                />
                <div>
                  <h3 className="font-extrabold text-lg text-white leading-none tracking-tight">
                    HOA SEN GROUP
                  </h3>
                  <p className="text-[10px] font-mono font-bold text-white/80 uppercase tracking-widest mt-1">
                    Steel Intelligence
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight text-white mb-3 leading-snug">
                Hệ điều hành Sản xuất &amp; Giám sát Dây chuyền
              </h2>
              <p className="text-xs text-white/85 leading-relaxed font-medium">
                Cổng xác thực tập trung cho toàn bộ cán bộ quản lý, kỹ sư vận hành và chuyên viên kỹ thuật tại 10+ nhà máy Hoa Sen.
              </p>
            </div>

            {/* System Status Indicators */}
            <div className="relative z-10 space-y-3 pt-6 border-t border-white/15">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <ShieldCheck size={20} className="text-emerald-300 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">Xác thực Bảo mật Enterprise</p>
                  <p className="text-white/70 text-[11px]">Mã hóa SSL 256-bit &amp; SSO AD</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <Cpu size={20} className="text-amber-300 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">Đồng bộ PLC Real-time</p>
                  <p className="text-white/70 text-[11px]">Độ trễ thấp &lt; 15ms qua mạng OT</p>
                </div>
              </div>
            </div>

            {/* Bottom Copyright */}
            <div className="relative z-10 pt-4 text-[11px] font-mono text-white/60">
              © 2026 Hoa Sen Group • All rights reserved
            </div>
          </div>

          {/* Right Login Form Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            {/* Header Form */}
            <div className="mb-6">
              <div className="flex lg:hidden items-center gap-2.5 mb-4">
                <img alt="Hoa Sen Logo" className="h-8 w-8 rounded-lg object-cover" src="/logo.jpg" />
                <span className="font-extrabold text-base text-primary">HOA SEN GROUP</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">
                Đăng nhập Hệ thống
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant/80 font-medium mt-1">
                Nhập thông tin tài khoản doanh nghiệp hoặc chọn tài khoản mẫu để trải nghiệm.
              </p>
            </div>

            {/* Quick Demo Role Picker */}
            <div className="mb-6">
              <label className="block text-[11px] font-mono font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                Tài khoản mẫu trải nghiệm nhanh:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((acc) => {
                  const isSelected = selectedRole === acc.code
                  return (
                    <button
                      key={acc.code}
                      type="button"
                      onClick={() => handleSelectDemo(acc)}
                      className={`
                        cursor-pointer p-2.5 rounded-xl text-left border transition-all duration-150 flex items-center justify-between
                        ${isSelected
                          ? 'bg-primary-container text-on-primary-container border-primary shadow-xs'
                          : 'bg-surface-container-low/60 hover:bg-surface-container border-outline-variant/40 text-on-surface'
                        }
                      `}
                    >
                      <div className="truncate pr-1">
                        <p className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                          {acc.name}
                        </p>
                        <p className={`text-[10px] font-medium truncate ${isSelected ? 'text-white/90' : 'text-on-surface-variant'}`}>
                          {acc.role}
                        </p>
                      </div>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-extrabold shrink-0 ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {acc.avatarBadge}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Mã nhân viên / Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                    <User size={17} />
                  </div>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="HSG-xxxx hoặc email@hoasengroup.vn"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-xl text-xs sm:text-sm font-medium text-on-surface focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Mật khẩu
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      addToast({
                        type: 'info',
                        title: 'Khôi phục mật khẩu',
                        message: 'Vui lòng liên hệ phòng IT Helpdesk theo số nội bộ 1800 1515 để cấp lại mã xác thực.',
                      })
                    }
                    className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                    <Lock size={17} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-surface-container-lowest border border-outline-variant/60 rounded-xl text-xs sm:text-sm font-medium text-on-surface focus:border-primary focus:ring-3 focus:ring-primary/15 outline-none transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-on-surface cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary cursor-pointer"
                  />
                  <span className="text-xs text-on-surface font-medium">Ghi nhớ đăng nhập trên thiết bị này</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full py-3 bg-primary text-on-primary font-bold text-sm rounded-xl shadow-lg shadow-primary/25 hover:bg-on-primary-fixed-variant transition-all duration-200 flex items-center justify-center gap-2 group hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={17} className="animate-spin-slow" />
                    <span>Đang xác thực thông tin...</span>
                  </>
                ) : (
                  <>
                    <span>Đăng nhập vào SCADA Console</span>
                    <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Form Note */}
            <div className="mt-6 pt-4 border-t border-outline-variant/30 text-center text-xs text-on-surface-variant/70 font-medium">
              <span>Hỗ trợ kỹ thuật hệ thống nội bộ: </span>
              <a href="tel:18001515" className="font-bold text-primary hover:underline">
                1800 1515
              </a>
              <span> • KCN Phú Mỹ 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
