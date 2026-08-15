import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Warehouse, AlertTriangle, Package, FileSpreadsheet, Printer, Trash2 } from 'lucide-react'
import SearchInput from '../components/ui/SearchInput'
import Badge from '../components/ui/Badge'
import { useToast } from '../components/ui/Toast'
import { exportInventoryReport } from '../services/excelExport'
import { useDataContext } from '../context/DataContext'
import PrintModal, { PrintDocumentData } from '../components/ui/PrintModal'

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
  const { inventory, deleteInventoryItem } = useDataContext()
  const { addToast } = useToast()
  const [exporting, setExporting] = useState(false)
  const [printData, setPrintData] = useState<PrintDocumentData | null>(null)
  const [printOpen, setPrintOpen] = useState(false)

  const filtered = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'all' || item.type === activeCategory
    return matchesSearch && matchesCategory
  })

  const totalItems = inventory.length
  const lowStock = inventory.filter((i) => i.status === 'low').length
  const criticalStock = inventory.filter((i) => i.status === 'critical').length

  const handleExportExcel = async () => {
    try {
      setExporting(true)
      addToast('info', 'Đang tạo bảng kiểm kê tồn kho Excel...', 'Tổng hợp số liệu từ các phân xưởng và kho thành phẩm...')
      await exportInventoryReport(filtered)
      addToast('success', 'Xuất Excel Thành Công!', 'Tệp báo cáo tồn kho vật tư đã sẵn sàng.')
    } catch {
      addToast('error', 'Lỗi xuất file', 'Không thể tạo file Excel.')
    } finally {
      setExporting(false)
    }
  }

  const handlePrintItem = (item: typeof inventory[0]) => {
    setPrintData({
      type: 'nhap-kho',
      title: 'PHIẾU KIỂM KÊ VẬT TƯ / THÀNH PHẨM',
      code: `KK-${item.code}`,
      date: new Date().toLocaleDateString('vi-VN'),
      author: 'Nguyễn Văn An (Quản lý Kho)',
      details: [
        { label: 'Mã Vật tư / Cuộn', value: item.code, highlight: true },
        { label: 'Tên Hàng hóa / Quy cách', value: item.name },
        { label: 'Phân loại', value: item.type },
        { label: 'Số lượng tồn thực tế', value: `${item.quantity.toLocaleString()} ${item.unit}`, highlight: true },
        { label: 'Vị trí kho lưu trữ', value: item.location },
        { label: 'Trạng thái định mức', value: item.status === 'critical' ? 'DƯỚI MỨC AN TOÀN' : item.status === 'low' ? 'SẮP HẾT' : 'ĐẦY ĐỦ' },
      ],
      notes: `Vật tư lưu trữ tại ${item.location}. Kiểm kê định kỳ theo quy trình quản lý ERP Hoa Sen Group.`,
    })
    setPrintOpen(true)
  }

  const handleDelete = (code: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm(`Bạn có chắc chắn muốn xóa vật tư ${code} khỏi hệ thống?`)) {
      deleteInventoryItem(code)
      addToast('success', 'Đã xóa vật tư', `Mã ${code} đã được xóa thành công.`)
    }
  }

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 gap-6 sm:gap-8 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs sm:text-sm text-primary uppercase font-bold tracking-wider">Inventory &amp; Supply Chain</span>
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs sm:text-sm text-on-surface-variant font-semibold">Quản lý Kho</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight">
            Quản lý Tồn kho Vật tư &amp; Sản phẩm
          </h1>
          <p className="text-xs sm:text-base text-on-surface-variant max-w-2xl leading-relaxed font-medium">
            Giám sát thời gian thực nguyên vật liệu, thành phẩm tôn cuộn và phụ tùng thay thế định kỳ.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex gap-2.5 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleExportExcel}
            disabled={exporting}
            className="cursor-pointer px-4 sm:px-5 py-2.5 rounded-xl font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-all shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm uppercase font-mono tracking-wider"
          >
            <FileSpreadsheet size={18} className={exporting ? 'animate-spin' : ''} />
            <span className="truncate">{exporting ? 'Đang tạo...' : 'Xuất Excel'}</span>
          </button>
          <button
            onClick={() => navigate('/nhap-kho-thanh-pham')}
            className="cursor-pointer bg-primary text-on-primary px-4 sm:px-6 py-2.5 rounded-xl font-extrabold hover:bg-on-primary-fixed-variant transition-all shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider"
          >
            <Plus size={18} /> <span className="truncate">Nhập kho mới</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 stagger">
        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/40 border-l-4 border-l-primary card-hover flex justify-between items-start">
          <div>
            <p className="font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold">Tổng mặt hàng</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface mt-2 font-mono">{totalItems}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 font-medium">Đang quản lý trên ERP</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-primary/10 text-primary">
            <Warehouse size={26} className="sm:w-[30px] sm:h-[30px]" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 border-l-4 border-l-amber-500 card-hover flex justify-between items-start">
          <div>
            <p className="font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold">Sắp hết hàng (Low Stock)</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-amber-600 mt-2 font-mono">{lowStock}</h2>
            <p className="text-sm text-on-surface-variant mt-1.5 font-medium">Cần lập đề xuất mua sắm</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-600">
            <AlertTriangle size={30} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 border-l-4 border-l-rose-500 card-hover flex justify-between items-start">
          <div>
            <p className="font-mono text-xs sm:text-sm text-on-surface-variant uppercase font-bold">Cần đặt hàng gấp (Critical)</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-rose-600 mt-2 font-mono">{criticalStock}</h2>
            <p className="text-sm text-on-surface-variant mt-1.5 font-medium">Dưới mức an toàn sản xuất</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-600">
            <Package size={30} />
          </div>
        </div>
      </div>

      {/* Inventory Table Container */}
      <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/50 rounded-2xl overflow-hidden animate-slide-up">
        {/* Controls */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low/60">
          {/* Category Tabs */}
          <div className="flex bg-surface-container p-1 rounded-xl gap-1 overflow-x-auto">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`
                  cursor-pointer px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 shrink-0
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
            className="w-full sm:w-80"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[750px]">
            <thead>
              <tr className="bg-surface-container-low/40 border-b border-outline-variant/30">
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Mã VT
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Tên Vật tư / Hàng hóa
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Phân loại
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold text-right">
                  Số lượng tồn
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Vị trí kho
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold text-center">
                  Trạng thái
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold text-center">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-sm sm:text-base">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-on-surface-variant font-medium text-base">
                    Không tìm thấy hàng tồn kho phù hợp
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item.code}
                    onClick={() => handlePrintItem(item)}
                    className="cursor-pointer hover:bg-surface-container/60 transition-colors group"
                  >
                    <td className="px-5 py-4 font-mono text-sm font-extrabold text-primary">
                      {item.code}
                    </td>
                    <td className="px-5 py-4 font-bold text-on-surface text-base">
                      {item.name}
                    </td>
                    <td className="px-5 py-4 text-sm font-mono text-on-surface-variant font-semibold">
                      {item.type}
                    </td>
                    <td className="px-5 py-4 text-right font-mono font-extrabold text-on-surface text-base">
                      {item.quantity.toLocaleString()} <span className="font-normal text-xs sm:text-sm text-on-surface-variant">{item.unit}</span>
                    </td>
                    <td className="px-5 py-4 text-sm font-mono font-bold text-on-surface-variant">
                      <span className="px-3 py-1 rounded-lg bg-surface-container border border-outline-variant/30">
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
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handlePrintItem(item)}
                          className="cursor-pointer p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant hover:text-primary transition-colors"
                          title="In phiếu kiểm kê"
                        >
                          <Printer size={16} />
                        </button>
                        <button
                          onClick={(e) => handleDelete(item.code, e)}
                          className="cursor-pointer p-2 hover:bg-rose-500/10 rounded-lg text-on-surface-variant hover:text-rose-600 transition-colors"
                          title="Xóa vật tư"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Modal */}
      <PrintModal isOpen={printOpen} onClose={() => setPrintOpen(false)} data={printData} />
    </div>
  )
}

