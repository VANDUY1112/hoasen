import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  Factory,
  AlertTriangle,
  Warehouse,
  BarChart3,
} from 'lucide-react'

interface MobileNavProps {
  onOpenSidebar?: () => void
}

export default function MobileNav({ }: MobileNavProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.replace(/^\//, '') || 'tong-quan'

  const isCenterActive = currentPath === 'tong-quan'

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden pointer-events-none">
      {/* Container Full 2 bên */}
      <div className="pointer-events-auto relative w-full">
        {/* Seamless Full-Width Background with Mathematical Symmetry */}
        <div className="absolute inset-0 -z-10 filter drop-shadow-[0_-4px_16px_rgba(0,0,0,0.12)]">
          {/* Left Flat Bar (Touches notch at 50% - 59px) */}
          <div className="absolute left-0 top-0 right-[calc(50%+59px)] bottom-0 bg-[#b5000b]" />

          {/* Center Circular Notch (Exactly 120px wide, Center at x=60) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[120px] bottom-0">
            <svg
              viewBox="0 0 120 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full block"
              preserveAspectRatio="xMidYMin slice"
            >
              <path
                d="
                  M 0 0
                  L 12 0
                  C 20 0 25 4 27 10
                  C 31 25 44 38 60 38
                  C 76 38 89 25 93 10
                  C 95 4 100 0 108 0
                  L 120 0
                  L 120 80
                  L 0 80
                  Z
                "
                fill="#b5000b"
              />
            </svg>
          </div>

          {/* Right Flat Bar (Touches notch at 50% + 59px) */}
          <div className="absolute left-[calc(50%+59px)] top-0 right-0 bottom-0 bg-[#b5000b]" />
        </div>

        {/* Floating Center Action Button (Tổng quan - Không có text) */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-[23px] z-20">
          <button
            onClick={() => navigate('/tong-quan')}
            className={`
              cursor-pointer relative flex items-center justify-center w-[54px] h-[54px] rounded-full
              bg-[#b5000b] text-white
              shadow-[0_6px_16px_rgba(0,0,0,0.35)] border-2 border-white/20
              hover:scale-105 active:scale-95 transition-all duration-200
              ${isCenterActive ? 'bg-[#c0000c] ring-2 ring-white shadow-[0_8px_22px_rgba(181,0,11,0.6)]' : ''}
            `}
            title="Tổng quan"
          >
            <div className="relative flex items-center justify-center">
              <Home size={26} className="stroke-[2.4] text-white drop-shadow-sm" />
            </div>
          </button>
        </div>

        {/* Bar Navigation Icons (Full Width 2 bên) */}
        <nav className="w-full grid grid-cols-5 items-center pt-2 pb-safe px-1 text-white min-h-[64px]">
          {/* 1. Trái cùng: Định mức */}
          <button
            onClick={() => navigate('/quan-ly-dinh-muc')}
            className="flex flex-col items-center justify-center py-1 cursor-pointer group active:scale-90 transition-transform"
            title="Định mức"
          >
            <BarChart3
              size={22}
              className={`transition-all duration-200 ${
                currentPath === 'quan-ly-dinh-muc'
                  ? 'text-white stroke-[2.8] scale-110 drop-shadow-sm'
                  : 'text-white/75 group-hover:text-white stroke-[1.8]'
              }`}
            />
            <span className={`text-[10px] mt-1 leading-none ${currentPath === 'quan-ly-dinh-muc' ? 'font-bold text-white' : 'text-white/75 font-medium'}`}>
              Định mức
            </span>
          </button>

          {/* 2. Sản lượng */}
          <button
            onClick={() => navigate('/san-luong')}
            className="flex flex-col items-center justify-center py-1 cursor-pointer group active:scale-90 transition-transform"
            title="Sản lượng"
          >
            <Factory
              size={22}
              className={`transition-all duration-200 ${
                currentPath === 'san-luong'
                  ? 'text-white stroke-[2.8] scale-110 drop-shadow-sm'
                  : 'text-white/75 group-hover:text-white stroke-[1.8]'
              }`}
            />
            <span className={`text-[10px] mt-1 leading-none ${currentPath === 'san-luong' ? 'font-bold text-white' : 'text-white/75 font-medium'}`}>
              Sản lượng
            </span>
          </button>

          {/* 3. Vị trí trung tâm (Nút tròn Tổng quan nổi ở trên, không để text) */}
          <div className="flex flex-col items-center justify-center h-full pointer-events-none" />

          {/* 4. Lỗi & QC */}
          <button
            onClick={() => navigate('/quan-ly-loi')}
            className="flex flex-col items-center justify-center py-1 cursor-pointer group active:scale-90 transition-transform"
            title="Lỗi & QC"
          >
            <AlertTriangle
              size={22}
              className={`transition-all duration-200 ${
                currentPath === 'quan-ly-loi'
                  ? 'text-white stroke-[2.8] scale-110 drop-shadow-sm'
                  : 'text-white/75 group-hover:text-white stroke-[1.8]'
              }`}
            />
            <span className={`text-[10px] mt-1 leading-none ${currentPath === 'quan-ly-loi' ? 'font-bold text-white' : 'text-white/75 font-medium'}`}>
              Lỗi & QC
            </span>
          </button>

          {/* 5. Phải cùng: Tồn kho */}
          <button
            onClick={() => navigate('/quan-ly-ton-kho')}
            className="flex flex-col items-center justify-center py-1 cursor-pointer group active:scale-90 transition-transform"
            title="Tồn kho"
          >
            <Warehouse
              size={22}
              className={`transition-all duration-200 ${
                currentPath === 'quan-ly-ton-kho'
                  ? 'text-white stroke-[2.8] scale-110 drop-shadow-sm'
                  : 'text-white/75 group-hover:text-white stroke-[1.8]'
              }`}
            />
            <span className={`text-[10px] mt-1 leading-none ${currentPath === 'quan-ly-ton-kho' ? 'font-bold text-white' : 'text-white/75 font-medium'}`}>
              Tồn kho
            </span>
          </button>
        </nav>
      </div>
    </div>
  )
}
