import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { inventoryItems } from '../data/mockData'

export default function QuanLyTonKho() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const filtered = inventoryItems.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalItems = inventoryItems.length
  const lowStock = inventoryItems.filter((i) => i.status === 'low').length
  const criticalStock = inventoryItems.filter((i) => i.status === 'critical').length

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-on-surface tracking-tight">Quản lý Tồn kho</h1>
          <p className="text-base text-on-surface-variant mt-2">Giám sát nguyên vật liệu, thành phẩm và phụ tùng thay thế.</p>
        </div>
        <button
          onClick={() => navigate('/nhap-kho-thanh-pham')}
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-semibold hover:bg-on-primary-fixed-variant transition-all shadow-md flex items-center gap-2 w-fit"
        >
          <Plus size={18} /> <span className="text-sm">Nhập kho mới</span>
        </button>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger">
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-t-4 border-primary card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase">Tổng mặt hàng</p>
          <h2 className="text-3xl font-bold text-on-surface mt-2">{totalItems}</h2>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-t-4 border-warning card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase">Sắp hết hàng</p>
          <h2 className="text-3xl font-bold text-warning mt-2">{lowStock}</h2>
        </div>
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-t-4 border-error card-hover">
          <p className="font-mono text-xs text-on-surface-variant uppercase">Cần đặt hàng gấp</p>
          <h2 className="text-3xl font-bold text-error mt-2">{criticalStock}</h2>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-surface-container-lowest shadow-sm overflow-hidden rounded-xl animate-slide-up">
        <div className="p-4 border-b border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low">
          <h3 className="text-lg font-bold">Chi tiết Tồn kho</h3>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              className="pl-9 pr-3 py-1.5 bg-surface-container text-on-surface text-sm border-b-2 border-transparent focus:border-primary outline-none transition-all rounded-lg"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-surface">
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase">Mã</th>
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase">Tên</th>
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase">Loại</th>
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase text-right">Số lượng</th>
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase">Vị trí</th>
                <th className="p-4 font-mono text-xs text-on-surface-variant uppercase text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {filtered.map((item) => (
                <tr key={item.code} className="hover:bg-surface-container transition-colors">
                  <td className="p-4 font-mono text-xs text-primary font-bold">{item.code}</td>
                  <td className="p-4 text-sm font-semibold">{item.name}</td>
                  <td className="p-4 text-sm text-on-surface-variant">{item.type}</td>
                  <td className="p-4 text-sm text-right font-medium">{item.quantity.toLocaleString()} {item.unit}</td>
                  <td className="p-4 text-sm text-on-surface-variant">{item.location}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase font-semibold ${
                      item.status === 'sufficient' ? 'bg-success-bg text-success' :
                      item.status === 'low' ? 'bg-warning-bg text-warning' :
                      'bg-error/10 text-error'
                    }`}>
                      {item.status === 'sufficient' ? 'Đủ hàng' : item.status === 'low' ? 'Sắp hết' : 'Cần đặt hàng'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
