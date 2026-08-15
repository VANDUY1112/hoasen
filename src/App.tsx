import { useState } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
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
import CaiDat from './pages/CaiDat'

const viewTitles: Record<string, string> = {
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

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState('tong-quan')

  return (
    <HashRouter>
      <ToastProvider>
        <div className="min-h-screen bg-surface">
          {/* Mobile Backdrop */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            currentView={currentView}
            onNavigate={setCurrentView}
          />

          {/* Main Content */}
          <div className="pl-0 lg:pl-72 transition-all duration-300">
            <Header
              subtitle={viewTitles[currentView] || 'Operational Monitoring System'}
              onMenuClick={() => setSidebarOpen(true)}
            />

            <main className="relative pt-16 bg-surface min-h-screen overflow-hidden">
              <Routes>
                <Route path="/" element={<Navigate to="/tong-quan" replace />} />
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
        </div>
      </ToastProvider>
    </HashRouter>
  )
}
