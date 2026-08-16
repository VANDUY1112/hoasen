import { useState } from 'react'
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import { LiveSimulationProvider } from './context/LiveSimulationContext'
import { DataProvider } from './context/DataContext'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import MobileNav from './components/layout/MobileNav'
import TongQuan from './pages/TongQuan'
import SanLuong from './pages/SanLuong'
import QuanLyLoi from './pages/QuanLyLoi'
import ThoiGianDungMay from './pages/ThoiGianDungMay'
import QuanLyDinhMuc from './pages/QuanLyDinhMuc'
import DuBaoBaoTri from './pages/DuBaoBaoTri'
import HieuSuatCaTruc from './pages/HieuSuatCaTruc'
import QuanLyTonKho from './pages/QuanLyTonKho'
import NhapKhoThanhPham from './pages/NhapKhoThanhPham'
import ThietLapMucTieuCaTruc from './pages/ThietLapMucTieuCaTruc'
import LapPhieuSuaChua from './pages/LapPhieuSuaChua'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import CaiDat from './pages/CaiDat'

const viewTitles: Record<string, string> = {
  'landing': 'Steel Intelligence Landing Page',
  'trang-chu': 'Steel Intelligence Landing Page',
  'login': 'Authentication Portal',
  'dang-nhap': 'Authentication Portal',
  'tong-quan': 'Operational Overview System',
  'san-luong': 'Production Output Metrics',
  'quan-ly-loi': 'Quality & Defect Monitoring',
  'thoi-gian-dung-may': 'Line Downtime Analytics',
  'quan-ly-ton-kho': 'Inventory Management System',
  'nhap-kho-thanh-pham': 'Inventory Entry Console',
  'quan-ly-dinh-muc': 'KPIs & Benchmarking Management',
  'du-bao-bao-tri': 'Predictive Maintenance & Forecasting',
  'hieu-suat-ca-truc': 'Shift Performance Analytics',
  'thiet-lap-muc-tieu-ca-truc': 'Shift Target Setup Console',
  'lap-phieu-sua-chua': 'Maintenance Ticket Console',
  'cai-dat': 'System Configuration Settings',
}

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const currentView = location.pathname.replace(/^\//, '') || 'tong-quan'
  const isLanding = currentView === 'landing' || currentView === 'trang-chu'
  const isAuth = currentView === 'login' || currentView === 'dang-nhap'

  if (isLanding) {
    return (
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/trang-chu" element={<LandingPage />} />
      </Routes>
    )
  }

  if (isAuth) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentView={currentView}
        onNavigate={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="pl-0 lg:pl-80 transition-all duration-300">
        <Header
          subtitle={viewTitles[currentView] || 'Operational Monitoring System'}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="relative pt-14 pb-16 lg:pb-6 bg-surface min-h-screen overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Navigate to="/tong-quan" replace />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/trang-chu" element={<LandingPage />} />
            <Route path="/tong-quan" element={<TongQuan />} />
            <Route path="/san-luong" element={<SanLuong />} />
            <Route path="/quan-ly-loi" element={<QuanLyLoi />} />
            <Route path="/thoi-gian-dung-may" element={<ThoiGianDungMay />} />
            <Route path="/quan-ly-dinh-muc" element={<QuanLyDinhMuc />} />
            <Route path="/du-bao-bao-tri" element={<DuBaoBaoTri />} />
            <Route path="/hieu-suat-ca-truc" element={<HieuSuatCaTruc />} />
            <Route path="/quan-ly-ton-kho" element={<QuanLyTonKho />} />
            <Route path="/nhap-kho-thanh-pham" element={<NhapKhoThanhPham />} />
            <Route path="/thiet-lap-muc-tieu-ca-truc" element={<ThietLapMucTieuCaTruc />} />
            <Route path="/lap-phieu-sua-chua" element={<LapPhieuSuaChua />} />
            <Route path="/cai-dat" element={<CaiDat />} />
          </Routes>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav onOpenSidebar={() => setSidebarOpen(true)} />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <LiveSimulationProvider>
          <DataProvider>
            <AppContent />
          </DataProvider>
        </LiveSimulationProvider>
      </ToastProvider>
    </HashRouter>
  )
}


