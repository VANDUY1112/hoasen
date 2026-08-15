import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Warehouse, AlertTriangle, CheckCircle2, Package, ArrowUpRight } from 'lucide-react'
import SearchInput from '../components/ui/SearchInput'
import Badge from '../components/ui/Badge'
import { inventoryItems } from '../data/mockData'

const categoryTabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'Nguyên liệu', label: 'Nguyên liệu' },
  { id: 'Thành phẩm', label: 'Thành phẩm' },
  { id: 'Phụ tùng', label: 'Phụ tùng' },
]

export default function QuanLyTonKho() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const navigate = useNavigate()

  const filtered = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'all' || item.type === activeCategory
    return matchesSearch && matchesCategory
  })

  const totalItems = inventoryItems.length
  const lowStock = inventoryItems.filter((i) => i.status === 'low').length
  const criticalStock = inventoryItems.filter((i) => i.status === 'critical').length

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 sm:gap-8 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">Inventory &amp; Supply Chain</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs text-on-surface-variant font-medium">Quản lý Kho</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight">
            Quản lý Tồn kho Vật tư &amp; Sản phẩm
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl">
            Giám sát thời gian thực nguyên vật liệu, thành phẩm tôn cuộn và phụ tùng thay thế định kỳ.
          </p>
        </div>

        <button
          onClick={() => navigate('/nhap-kho-thanh-pham')}
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-semibold hover:bg-on-primary-fixed-variant transition-all shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] flex items-center gap-2 text-sm w-fit font-mono uppercase tracking-wider"
        >
          <Plus size={18} /> Nhập kho mới
        </button>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 stagger">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 border-l-4 border-l-primary card-hover flex justify-between items-start">
          <div>
            <p className="font-mono text-xs text-on-surface-variant uppercase font-semibold">Tổng mặt hàng</p>
            <h2 className="text-4xl font-extrabold text-on-surface mt-2 font-mono">{totalItems}</h2>
            <p className="text-xs text-on-surface-variant mt-1">Đang quản lý trên ERP</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <Warehouse size={26} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 border-l-4 border-l-amber-500 card-hover flex justify-between items-start">
          <div>
            <p className="font-mono text-xs text-on-surface-variant uppercase font-semibold">Sắp hết hàng (Low Stock)</p>
            <h2 className="text-4xl font-extrabold text-amber-600 mt-2 font-mono">{lowStock}</h2>
            <p className="text-xs text-on-surface-variant mt-1">Cần lập đề xuất mua sắm</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600">
            <AlertTriangle size={26} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 border-l-4 border-l-rose-500 card-hover flex justify-between items-start">
          <div>
            <p className="font-mono text-xs text-on-surface-variant uppercase font-semibold">Cần đặt hàng gấp (Critical)</p>
            <h2 className="text-4xl font-extrabold text-rose-600 mt-2 font-mono">{criticalStock}</h2>
            <p className="text-xs text-on-surface-variant mt-1">Dưới mức an toàn sản xuất</p>
          </div>
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600">
            <Package size={26} />
          </div>
        </div>
      </div>

      {/* Inventory Table Container */}
      <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/50 rounded-2xl overflow-hidden animate-slide-up">
        {/* Controls */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low/60">
          {/* Category Tabs */}
          <div className="flex bg-surface-container p-1 rounded-xl gap-1">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`
                  px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
                  ${activeCategory === tab.id
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Tìm theo tên vật tư, mã, vị trí..."
            shortcut="/"
            className="w-full sm:w-72"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[750px]">
            <thead>
              <tr className="bg-surface-container-low/40 border-b border-outline-variant/30">
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Mã VT
                </th>
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Tên Vật tư / Hàng hóa
                </th>
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Phân loại
                </th>
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                  Số lượng tồn
                </th>
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Vị trí kho
                </th>
                <th className="px-5 py-3.5 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold text-center">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-on-surface-variant">
                    Không tìm thấy hàng tồn kho phù hợp
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.code} className="hover:bg-surface-container/60 transition-colors group">
                    <td className="px-5 py-4 font-mono text-xs font-bold text-primary">
                      {item.code}
                    </td>
                    <td className="px-5 py-4 font-semibold text-on-surface">
                      {item.name}
                    </td>
                    <td className="px-5 py-4 text-xs font-mono text-on-surface-variant">
                      {item.type}
                    </td>
                    <td className="px-5 py-4 text-right font-mono font-bold text-on-surface">
                      {item.quantity.toLocaleString()} <span className="font-normal text-xs text-on-surface-variant">{item.unit}</span>
                    </td>
                    <td className="px-5 py-4 text-xs font-mono font-medium text-on-surface-variant">
                      <span className="px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant/30">
                        {item.location}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      {item.status === 'sufficient' ? (
                        <Badge variant="success" size="sm">
                          Đủ tồn kho
                        </Badge>
                      ) : item.status === 'low' ? (
                        <Badge variant="warning" size="sm">
                          Sắp hết
                        </Badge>
                      ) : (
                        <Badge variant="error" pulse size="sm">
                          Đặt hàng gấp
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
