import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Warehouse, AlertTriangle, Package, FileSpreadsheet, Printer, Trash2, CheckCircle2 } from 'lucide-react'
import SearchInput from '../components/ui/SearchInput'
import Badge from '../components/ui/Badge'
import Pagination from '../components/ui/Pagination'
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
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const navigate = useNavigate()
  const { inventory, deleteInventoryItem } = useDataContext()
  const { addToast } = useToast()
  const [exporting, setExporting] = useState(false)
  const [printData, setPrintData] = useState<PrintDocumentData | null>(null)
  const [printOpen, setPrintOpen] = useState(false)

  const filtered = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = activeCategory === 'all' || item.type === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [inventory, searchTerm, activeCategory])

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, currentPage, pageSize])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setCurrentPage(1)
  }

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
    <div className="flex flex-col w-full p-3.5 sm:p-5 lg:p-6 gap-4 sm:gap-5 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight">
            Quản lý Tồn kho Vật tư &amp; Sản phẩm
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant/80 max-w-2xl leading-relaxed font-medium">
            Giám sát thời gian thực nguyên vật liệu, thành phẩm tôn cuộn và phụ tùng thay thế định kỳ.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleExportExcel}
            disabled={exporting}
            className="cursor-pointer px-3.5 sm:px-4 py-2 rounded-xl font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-all shadow-xs flex items-center justify-center gap-1.5 text-xs uppercase font-mono tracking-wider"
          >
            <FileSpreadsheet size={15} className={exporting ? 'animate-spin' : ''} />
            <span className="truncate">{exporting ? 'Đang tạo...' : 'Xuất Excel'}</span>
          </button>
          <button
            onClick={() => navigate('/nhap-kho-thanh-pham')}
            className="cursor-pointer bg-primary text-on-primary px-3.5 sm:px-4 py-2 rounded-xl font-extrabold hover:bg-on-primary-fixed-variant transition-all shadow-xs shadow-primary/20 flex items-center justify-center gap-1.5 text-xs font-mono uppercase tracking-wider"
          >
            <Plus size={15} /> <span className="truncate">Nhập kho mới</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 stagger">
        <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl shadow-xs border border-outline-variant/35 border-l-4 border-l-primary card-hover flex justify-between items-start">
          <div>
            <p className="font-mono text-xs text-on-surface-variant uppercase font-bold">Tổng mặt hàng</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface mt-1 font-mono">{totalItems}</h2>
            <p className="text-xs text-on-surface-variant/80 mt-1 font-medium">Đang quản lý trên ERP</p>
          </div>
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <Warehouse size={22} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl shadow-xs border border-outline-variant/35 border-l-4 border-l-amber-500 card-hover flex justify-between items-start">
          <div>
            <p className="font-mono text-xs text-on-surface-variant uppercase font-bold">Sắp hết hàng (Low Stock)</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1 font-mono">{lowStock}</h2>
            <p className="text-xs text-on-surface-variant/80 mt-1 font-medium">Cần lập đề xuất mua sắm</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600">
            <AlertTriangle size={22} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl shadow-xs border border-outline-variant/35 border-l-4 border-l-emerald-500 card-hover flex justify-between items-start">
          <div>
            <p className="font-mono text-xs text-on-surface-variant uppercase font-bold">Tồn kho An toàn</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 font-mono">{inventory.length - lowStock}</h2>
            <p className="text-xs text-on-surface-variant/80 mt-1 font-medium">Đạt định mức tối thiểu</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-2xl shadow-xs border border-outline-variant/35 border-l-4 border-l-rose-500 card-hover flex justify-between items-start">
          <div>
            <p className="font-mono text-xs text-on-surface-variant uppercase font-bold">Cần đặt gấp (Critical)</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-600 mt-1 font-mono">{criticalStock}</h2>
            <p className="text-xs text-on-surface-variant/80 mt-1 font-medium">Dưới mức an toàn</p>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600">
            <Package size={22} />
          </div>
        </div>
      </div>

      {/* Inventory Table Container */}
      <div className="bg-surface-container-lowest shadow-xs border border-outline-variant/35 rounded-2xl overflow-hidden animate-slide-up">
        {/* Controls */}
        <div className="p-3 sm:p-4 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-low/50">
          {/* Category Tabs */}
          <div className="flex bg-surface-container p-0.5 rounded-xl gap-0.5 overflow-x-auto no-scrollbar">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
                className={`
                  cursor-pointer px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 shrink-0
                  ${activeCategory === tab.id
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant/80 hover:text-on-surface'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <SearchInput
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Tìm theo tên vật tư, mã, vị trí..."
            shortcut="/"
            className="w-full sm:w-72"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low/30 border-b border-outline-variant/20">
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                  Mã VT
                </th>
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                  Tên Vật tư / Hàng hóa
                </th>
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                  Phân loại
                </th>
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold text-right">
                  Số lượng tồn
                </th>
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                  Vị trí kho
                </th>
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold text-center">
                  Trạng thái
                </th>
                <th className="px-4 py-3 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-bold text-center">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-xs sm:text-sm">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-on-surface-variant font-medium">
                    Không tìm thấy hàng tồn kho phù hợp
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => (
                  <tr
                    key={item.code}
                    onClick={() => handlePrintItem(item)}
                    className="cursor-pointer hover:bg-surface-container/50 transition-colors group"
                  >
                    <td className="px-4 py-3 font-mono font-extrabold text-primary">
                      {item.code}
                    </td>
                    <td className="px-4 py-3 font-bold text-on-surface">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-on-surface-variant/80 font-semibold">
                      {item.type}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-extrabold text-on-surface">
                      {item.quantity.toLocaleString()} <span className="font-normal text-xs text-on-surface-variant/70">{item.unit}</span>
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-on-surface-variant">
                      <span className="px-2.5 py-0.5 rounded bg-surface-container border border-outline-variant/30 text-xs">
                        {item.location}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
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
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handlePrintItem(item)}
                          className="cursor-pointer p-1.5 hover:bg-surface-container-high rounded-lg text-on-surface-variant hover:text-primary transition-colors"
                          title="In phiếu kiểm kê"
                        >
                          <Printer size={15} />
                        </button>
                        <button
                          onClick={(e) => handleDelete(item.code, e)}
                          className="cursor-pointer p-1.5 hover:bg-rose-500/10 rounded-lg text-on-surface-variant hover:text-rose-600 transition-colors"
                          title="Xóa vật tư"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {filtered.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={filtered.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size)
              setCurrentPage(1)
            }}
            pageSizeOptions={[5, 10, 20, 50]}
          />
        )}
      </div>

      {/* Print Modal */}
      <PrintModal isOpen={printOpen} onClose={() => setPrintOpen(false)} data={printData} />
    </div>
  )
}

