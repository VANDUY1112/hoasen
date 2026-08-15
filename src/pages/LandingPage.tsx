import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Factory,
  ArrowRight,
  PlayCircle,
  Activity,
  Layers,
  Warehouse,
  Wrench,
  Users,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  Mail,
  Phone,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  BarChart3,
  AlertTriangle,
} from 'lucide-react'
import { decorativeImages } from '../data/mockData'

export default function LandingPage() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-sans selection:bg-primary selection:text-on-primary">
      {/* Fixed Landing Header */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? 'bg-surface-container-lowest/95 backdrop-blur-xl shadow-sm border-b border-outline-variant/40 py-3'
            : 'bg-surface-container-lowest/80 backdrop-blur-md py-4'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <img
                alt="Hoa Sen Group Logo"
                className="h-10 w-10 object-cover rounded-xl shadow-xs border border-outline-variant/40 group-hover:scale-105 transition-transform"
                src="/logo.jpg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-base text-primary tracking-tight leading-none uppercase">
                HOA SEN GROUP
              </span>
              <span className="text-[10px] font-mono font-bold text-on-surface-variant/80 tracking-widest uppercase mt-0.5">
                Product of Ho Van Duy
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo('home')}
              className={`cursor-pointer text-sm font-semibold transition-colors ${activeSection === 'home'
                ? 'text-primary font-bold border-b-2 border-primary pb-0.5'
                : 'text-on-surface-variant hover:text-primary'
                }`}
            >
              Trang chủ
            </button>
            <button
              onClick={() => scrollTo('features')}
              className={`cursor-pointer text-sm font-semibold transition-colors ${activeSection === 'features'
                ? 'text-primary font-bold border-b-2 border-primary pb-0.5'
                : 'text-on-surface-variant hover:text-primary'
                }`}
            >
              Tính năng
            </button>
            <button
              onClick={() => scrollTo('solutions')}
              className={`cursor-pointer text-sm font-semibold transition-colors ${activeSection === 'solutions'
                ? 'text-primary font-bold border-b-2 border-primary pb-0.5'
                : 'text-on-surface-variant hover:text-primary'
                }`}
            >
              Giải pháp
            </button>
            <button
              onClick={() => scrollTo('ecosystem')}
              className={`cursor-pointer text-sm font-semibold transition-colors ${activeSection === 'ecosystem'
                ? 'text-primary font-bold border-b-2 border-primary pb-0.5'
                : 'text-on-surface-variant hover:text-primary'
                }`}
            >
              Hệ sinh thái
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className={`cursor-pointer text-sm font-semibold transition-colors ${activeSection === 'contact'
                ? 'text-primary font-bold border-b-2 border-primary pb-0.5'
                : 'text-on-surface-variant hover:text-primary'
                }`}
            >
              Liên hệ
            </button>
          </nav>

          {/* CTA Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate('/login')}
              className="cursor-pointer px-3.5 sm:px-4 py-2 sm:py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs sm:text-sm rounded-xl transition-all border border-outline-variant/50"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => navigate('/tong-quan')}
              className="cursor-pointer px-3.5 sm:px-5 py-2 sm:py-2.5 bg-primary text-on-primary font-bold text-xs sm:text-sm rounded-xl hover:bg-on-primary-fixed-variant transition-all duration-200 shadow-sm shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 sm:gap-2"
            >
              <span>Vào SCADA</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden flex items-center min-h-[85vh]"
      >
        {/* Cinematic Industrial Steel Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply scale-105 transition-transform duration-1000"
            style={{ backgroundImage: `url('${decorativeImages.banner}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/40" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#b5000b_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">


              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-[1.15] mb-6">
                <span className="text-primary block">Hoa Sen Group</span>
                <span className="block mt-1 sm:mt-2 text-on-surface/90">
                  Hệ thống Quản trị Sản xuất Thông minh
                </span>
              </h1>

              <p className="text-base sm:text-lg text-on-surface-variant/85 mb-8 max-w-xl leading-relaxed font-medium">
                Tối ưu hóa toàn diện hiệu suất nhà máy thép. Kiểm soát dữ liệu SCADA thời gian thực,
                dự báo bảo trì AI và tự động hóa quy trình quản trị chuyên sâu dành riêng cho tiêu chuẩn Tập đoàn Hoa Sen.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <button
                  onClick={() => navigate('/tong-quan')}
                  className="cursor-pointer w-full sm:w-auto px-7 py-3.5 bg-primary text-on-primary font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-primary/25 hover:bg-on-primary-fixed-variant transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Khám phá Dashboard Live</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollTo('features')}
                  className="cursor-pointer w-full sm:w-auto px-6 py-3.5 bg-surface-container-lowest text-primary font-bold text-sm sm:text-base rounded-xl border border-primary/30 hover:bg-primary/5 transition-all flex items-center justify-center gap-2 shadow-2xs"
                >
                  <PlayCircle size={18} />
                  <span>Tìm hiểu Tính năng</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 sm:mt-12 pt-8 border-t border-outline-variant/40 flex items-center gap-8 sm:gap-12 w-full">
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-on-surface block">
                    99.8%
                  </span>
                  <span className="text-xs font-mono font-bold text-on-surface-variant/80 uppercase tracking-wider mt-0.5 block">
                    Độ chính xác AI
                  </span>
                </div>

                <div className="w-px h-10 bg-outline-variant/60" />

                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-on-surface block">
                    24/7
                  </span>
                  <span className="text-xs font-mono font-bold text-on-surface-variant/80 uppercase tracking-wider mt-0.5 block">
                    Giám sát SCADA Live
                  </span>
                </div>

                <div className="w-px h-10 bg-outline-variant/60" />

                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 block">
                    +12.5%
                  </span>
                  <span className="text-xs font-mono font-bold text-on-surface-variant/80 uppercase tracking-wider mt-0.5 block">
                    Tăng trưởng sản lượng
                  </span>
                </div>
              </div>
            </div>

            {/* Right Live Simulation Cards */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-md w-full">
                {/* Main Card */}
                <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl shadow-xl border border-outline-variant/50 relative z-20 animate-scale-in">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      Sản lượng hôm nay (Live)
                    </span>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-mono text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Trực tuyến</span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl sm:text-5xl font-mono font-extrabold text-on-surface tracking-tight">
                      1.301,64
                    </span>
                    <span className="text-sm font-mono font-bold text-on-surface-variant/80">
                      Tấn / 24h
                    </span>
                  </div>

                  {/* Sparkline Graphic */}
                  <div className="h-16 w-full mb-4">
                    <svg className="w-full h-full text-primary" viewBox="0 0 200 60" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#b5000b" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#b5000b" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 50 Q 20 40 40 45 T 80 30 T 120 35 T 160 15 T 200 10 L 200 60 L 0 60 Z" fill="url(#heroGradient)" />
                      <path d="M0 50 Q 20 40 40 45 T 80 30 T 120 35 T 160 15 T 200 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30 text-xs">
                    <span className="text-emerald-700 bg-emerald-500/10 px-2.5 py-1 rounded-lg font-mono font-bold flex items-center gap-1">
                      <TrendingUp size={14} /> +12.5% vs Hôm qua
                    </span>
                    <span className="font-mono text-on-surface-variant/80 font-bold">
                      Nhà máy Tôn Phú Mỹ
                    </span>
                  </div>
                </div>

                {/* Floating Predictive Maintenance Card */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-surface-container-lowest p-4 rounded-2xl shadow-xl border border-outline-variant/50 z-30 max-w-[260px] animate-slide-up">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0 border border-rose-500/20">
                      <Wrench size={16} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase font-bold text-on-surface-variant">Dự báo AI</p>
                      <p className="text-xs font-extrabold text-on-surface leading-tight">Động cơ cuộn xả 03</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-rose-600 font-bold font-mono">
                    Cảnh báo nhiệt 82°C • Cần bảo trì
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Bento Grid */}
      <section id="features" className="py-10 sm:py-16 bg-surface-container-low/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-2 block">
              Tính năng Cốt lõi
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
              Kiểm soát Toàn diện Vòng đời Sản xuất Thép
            </h2>
            <p className="text-xs sm:text-base text-on-surface-variant/80 leading-relaxed font-medium">
              Tích hợp sâu 12 module quản trị chuyên biệt, mang lại khả năng giám sát và điều hành không độ trễ cho mọi phân xưởng.
            </p>
          </div>

          {/* Bento Grid: 2 boxes per row on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {/* Feature 1 */}
            <div
              onClick={() => navigate('/san-luong')}
              className="cursor-pointer group bg-surface-container-lowest p-3.5 sm:p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 border border-outline-variant/35 relative overflow-hidden card-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 sm:mb-5 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <Layers className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-sm sm:text-lg font-extrabold text-on-surface mb-1.5 sm:mb-2 group-hover:text-primary transition-colors">
                  Quản lý Sản lượng
                </h3>
                <p className="text-[11px] sm:text-sm text-on-surface-variant/80 leading-relaxed font-medium">
                  Theo dõi tiến độ sản xuất theo thời gian thực trên từng dây chuyền, đối chiếu mục tiêu ca trực tự động qua SCADA.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              onClick={() => navigate('/quan-ly-ton-kho')}
              className="cursor-pointer group bg-surface-container-lowest p-3.5 sm:p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 border border-outline-variant/35 relative overflow-hidden card-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 sm:mb-5 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <Warehouse className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-sm sm:text-lg font-extrabold text-on-surface mb-1.5 sm:mb-2 group-hover:text-primary transition-colors">
                  Theo dõi Tồn kho
                </h3>
                <p className="text-[11px] sm:text-sm text-on-surface-variant/80 leading-relaxed font-medium">
                  Kiểm soát nguyên vật liệu đầu vào (HRC, cuộn tôn, kẽm thỏi) và thành phẩm với phân loại vị trí kho chi tiết.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              onClick={() => navigate('/du-bao-bao-tri')}
              className="cursor-pointer group bg-surface-container-lowest p-3.5 sm:p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 border border-outline-variant/35 relative overflow-hidden card-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 sm:mb-5 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <Wrench className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-sm sm:text-lg font-extrabold text-on-surface mb-1.5 sm:mb-2 group-hover:text-primary transition-colors">
                  Dự báo Bảo trì AI
                </h3>
                <p className="text-[11px] sm:text-sm text-on-surface-variant/80 leading-relaxed font-medium">
                  Sử dụng AI phân tích độ rung, nhiệt độ máy móc để cảnh báo rủi ro hỏng hóc trước khi xảy ra sự cố dừng máy.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div
              onClick={() => navigate('/hieu-suat-ca-truc')}
              className="cursor-pointer group bg-surface-container-lowest p-3.5 sm:p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 border border-outline-variant/35 relative overflow-hidden card-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 sm:mb-5 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-sm sm:text-lg font-extrabold text-on-surface mb-1.5 sm:mb-2 group-hover:text-primary transition-colors">
                  Hiệu suất Ca trực
                </h3>
                <p className="text-[11px] sm:text-sm text-on-surface-variant/80 leading-relaxed font-medium">
                  Đánh giá KPIs tự động cho từng tổ/ca sản xuất. Minh bạch hóa dữ liệu sản lượng, chất lượng ISO và năng suất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions & Tech Showcase */}
      <section id="solutions" className="py-10 sm:py-16 bg-surface relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-6">
              <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-2 block">
                Giải pháp Công nghệ 4.0
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight mb-5">
                Kiến trúc Tự động hóa Đồng bộ từ PLC đến ERP
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex gap-3.5 sm:gap-4 items-start p-3.5 sm:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-on-surface mb-0.5 sm:mb-1">Kết nối SCADA &amp; IoT thời gian thực</h4>
                    <p className="text-[11px] sm:text-sm text-on-surface-variant/80 font-medium">Thu thập thông số áp lực, nhiệt độ lò ủ và tốc độ kéo tôn với tần suất mili-giây.</p>
                  </div>
                </div>

                <div className="flex gap-3.5 sm:gap-4 items-start p-3.5 sm:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-on-surface mb-0.5 sm:mb-1">Thị giác máy tính AI phát hiện khuyết tật</h4>
                    <p className="text-[11px] sm:text-sm text-on-surface-variant/80 font-medium">Nhận diện vết xước, gợn sóng biên và lỗi mạ với tập dữ liệu 250,000+ mẫu chuẩn JIS.</p>
                  </div>
                </div>

                <div className="flex gap-3.5 sm:gap-4 items-start p-3.5 sm:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-600 shrink-0">
                    <BarChart3 size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-on-surface mb-0.5 sm:mb-1">Báo cáo Giám Đốc chuẩn Quốc tế</h4>
                    <p className="text-[11px] sm:text-sm text-on-surface-variant/80 font-medium">Xuất tệp Excel tự động định dạng chuyên nghiệp chuẩn nhận diện thương hiệu Hoa Sen Group.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div
                className="rounded-3xl overflow-hidden shadow-xl border border-outline-variant/40 aspect-4/3 bg-cover bg-center relative"
                style={{ backgroundImage: `url('${decorativeImages.dinhMuc}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-8 text-white">
                  <span className="font-mono text-xs font-bold text-primary-fixed uppercase tracking-wider mb-1">
                    Dây chuyền Mạ Tôn KCN Phú Mỹ 1
                  </span>
                  <h3 className="text-lg sm:text-2xl font-extrabold mb-1 sm:mb-2">Công suất 1.200.000 Tấn/năm</h3>
                  <p className="text-xs sm:text-sm text-white/80 font-medium">
                    Hệ thống vận hành liên tục 3 ca 4 kíp dưới sự điều phối của hệ điều hành Steel Intelligence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem CTA Banner */}
      <section id="ecosystem" className="py-10 sm:py-14 bg-surface-container-low/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-primary rounded-3xl p-8 sm:p-12 text-on-primary shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative z-10 max-w-2xl">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-on-primary/80 mb-2 block">
                Sẵn sàng Chuyển đổi Số
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
                Trải nghiệm Hệ điều hành Sản xuất Trực tiếp
              </h2>
              <p className="text-sm sm:text-base text-on-primary/90 font-medium leading-relaxed">
                Khám phá ngay bảng điều khiển trung tâm với đầy đủ dữ liệu mô phỏng PLC, phân tích OEE và hệ thống quản trị kho bãi.
              </p>
            </div>

            <div className="relative z-10 shrink-0 w-full md:w-auto">
              <button
                onClick={() => navigate('/tong-quan')}
                className="cursor-pointer w-full md:w-auto px-8 py-4 bg-on-primary text-primary font-extrabold text-sm sm:text-base rounded-2xl hover:bg-surface-container-lowest shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <span>Mở Bảng điều khiển</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="w-full bg-surface-container-lowest border-t border-outline-variant/40 pt-12 sm:pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10">
          <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <img alt="Hoa Sen Logo" className="h-8 w-8 rounded-lg object-cover" src="/logo.jpg" />
              <span className="font-extrabold text-base text-primary">Hoa Sen Group</span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant/80 leading-relaxed font-medium max-w-xs md:max-w-none">
              Nền tảng quản trị sản xuất thép hiện đại nhất, được thiết kế riêng cho các tiêu chuẩn công nghiệp của Tập đoàn Hoa Sen.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-3 sm:mb-4 font-mono">Về chúng tôi</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-on-surface-variant font-medium">
              <li className="hover:text-primary cursor-pointer transition-colors">Tập đoàn Hoa Sen</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Sứ mệnh &amp; Tầm nhìn</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Hệ sinh thái công nghệ</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-3 sm:mb-4 font-mono">Giải pháp</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-on-surface-variant font-medium">
              <li onClick={() => navigate('/quan-ly-ton-kho')} className="hover:text-primary cursor-pointer transition-colors">Quản lý kho vận</li>
              <li onClick={() => navigate('/quan-ly-loi')} className="hover:text-primary cursor-pointer transition-colors">Kiểm soát chất lượng AI</li>
              <li onClick={() => navigate('/san-luong')} className="hover:text-primary cursor-pointer transition-colors">Tự động hóa dây chuyền</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-3 sm:mb-4 font-mono">Liên hệ</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-on-surface-variant font-medium">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={15} className="text-primary shrink-0" />
                <span>info@hoasengroup.vn</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={15} className="text-primary shrink-0" />
                <span>1800 1515</span>
              </li>
              <li className="text-xs text-on-surface-variant/70 mt-1">
                KCN Phú Mỹ 1, TX. Phú Mỹ, Bà Rịa - Vũng Tàu
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 pt-6 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs font-mono text-on-surface-variant/80 font-semibold">
          <p>© 2026 Ho Van Duy - Hoa Sen Group. All rights reserved.</p>
          <p>Phiên bản SCADA Enterprise v2.4</p>
        </div>
      </footer>
    </div>
  )
}
