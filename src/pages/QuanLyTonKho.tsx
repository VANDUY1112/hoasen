import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Warehouse, AlertTriangle, Package, FileSpreadsheet, Printer, Trash2, CheckCircle2, Eye } from 'lucide-react'
import SearchInput from '../components/ui/SearchInput'
import Badge from '../components/ui/Badge'
import Pagination from '../components/ui/Pagination'
import { useToast } from '../components/ui/Toast'
import ReportPreviewModal from '../components/ui/ReportPreviewModal'
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
  const [reportModalOpen, setReportModalOpen] = useState(false)
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
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-6 lg:py-8 gap-5 sm:gap-6 lg:gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-5">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
            Quản lý Tồn kho Vật tư &amp; Sản phẩm
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-on-surface-variant/80 max-w-3xl leading-relaxed font-medium">
            Giám sát thời gian thực nguyên vật liệu, thành phẩm tôn cuộn và phụ tùng thay thế định kỳ.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => setReportModalOpen(true)}
            className="cursor-pointer px-5 sm:px-6 py-3 rounded-xl font-bold bg-surface-container-lowest text-on-surface border border-outline-variant/40 hover:bg-surface-container transition-all shadow-2xs flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base uppercase font-mono tracking-wider"
          >
            <Eye size={18} className="text-primary shrink-0" />
            <span className="truncate">Xem Báo Cáo</span>
          </button>
          <button
            onClick={() => navigate('/nhap-kho-thanh-pham')}
            className="cursor-pointer bg-primary text-on-primary px-5 sm:px-6 py-3 rounded-xl font-extrabold hover:bg-on-primary-fixed-variant transition-all shadow-xs shadow-primary/20 flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base font-mono uppercase tracking-wider"
          >
            <Plus size={18} /> <span className="truncate">Nhập kho mới</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards - Unified Brand Aesthetic */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 stagger">
        <div className="group bg-surface-container-lowest p-5 sm:p-6 lg:p-7 rounded-2xl shadow-xs border border-outline-variant/30 hover:border-primary/40 card-hover flex justify-between items-start transition-all">
          <div>
            <p className="text-sm sm:text-base font-bold text-on-surface-variant">Tổng mặt hàng</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface mt-1.5 font-mono group-hover:text-primary transition-colors">{totalItems}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant/80 mt-1.5 font-medium">Đang quản lý trên ERP</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 transition-transform group-hover:scale-110">
            <Warehouse size={24} />
          </div>
        </div>

        <div className="group bg-surface-container-lowest p-5 sm:p-6 lg:p-7 rounded-2xl shadow-xs border border-outline-variant/30 hover:border-primary/40 card-hover flex justify-between items-start transition-all">
          <div>
            <p className="text-sm sm:text-base font-bold text-on-surface-variant">Sắp hết hàng (Low Stock)</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface mt-1.5 font-mono group-hover:text-primary transition-colors">{lowStock}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant/80 mt-1.5 font-medium">Cần lập đề xuất mua sắm</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 transition-transform group-hover:scale-110">
            <AlertTriangle size={24} />
          </div>
        </div>

        <div className="group bg-surface-container-lowest p-5 sm:p-6 lg:p-7 rounded-2xl shadow-xs border border-outline-variant/30 hover:border-primary/40 card-hover flex justify-between items-start transition-all">
          <div>
            <p className="text-sm sm:text-base font-bold text-on-surface-variant">Tồn kho An toàn</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface mt-1.5 font-mono group-hover:text-primary transition-colors">{inventory.length - lowStock}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant/80 mt-1.5 font-medium">Đạt định mức tối thiểu</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 transition-transform group-hover:scale-110">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="group bg-surface-container-lowest p-5 sm:p-6 lg:p-7 rounded-2xl shadow-xs border border-outline-variant/30 hover:border-primary/40 card-hover flex justify-between items-start transition-all">
          <div>
            <p className="text-sm sm:text-base font-bold text-on-surface-variant">Cần đặt gấp (Critical)</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface mt-1.5 font-mono group-hover:text-primary transition-colors">{criticalStock}</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant/80 mt-1.5 font-medium">Dưới mức an toàn</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 transition-transform group-hover:scale-110">
            <Package size={24} />
          </div>
        </div>
      </div>

      {/* Inventory Table Container */}
      <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/40 rounded-2xl overflow-hidden animate-slide-up">
        {/* Controls */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low/60">
          {/* Category Tabs */}
          <div className="flex bg-surface-container p-1 rounded-xl gap-1 overflow-x-auto no-scrollbar shadow-2xs">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
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
            onChange={handleSearch}
            placeholder="Tìm theo tên vật tư, mã, vị trí..."
            shortcut="/"
            className="w-full sm:w-80"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low/40 border-b border-outline-variant/30">
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold whitespace-nowrap">
                  Mã VT
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold whitespace-nowrap">
                  Tên Vật tư / Hàng hóa
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold whitespace-nowrap">
                  Phân loại
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold text-right whitespace-nowrap">
                  Số lượng tồn
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold whitespace-nowrap">
                  Vị trí kho
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold text-center whitespace-nowrap">
                  Trạng thái
                </th>
                <th className="px-5 py-4 font-mono text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-bold text-center whitespace-nowrap">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-sm sm:text-base">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-on-surface-variant font-medium text-sm sm:text-base">
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
                    <td className="px-5 py-4 font-mono font-bold text-primary whitespace-nowrap">
                      {item.code}
                    </td>
                    <td className="px-5 py-4 font-bold text-on-surface whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="px-5 py-4 font-medium text-on-surface-variant whitespace-nowrap">
                      {item.type}
                    </td>
                    <td className="px-5 py-4 text-right font-mono font-extrabold text-on-surface whitespace-nowrap">
                      {item.quantity.toLocaleString()} <span className="font-normal text-xs sm:text-sm text-on-surface-variant/70">{item.unit}</span>
                    </td>
                    <td className="px-5 py-4 font-mono font-bold text-on-surface-variant whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant/30 text-xs sm:text-sm">
                        {item.location}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center whitespace-nowrap">
                      {item.status === 'sufficient' ? (
                        <Badge variant="success" size="md">
                          Đủ định mức
                        </Badge>
                      ) : item.status === 'low' ? (
                        <Badge variant="warning" size="md">
                          Sắp hết
                        </Badge>
                      ) : (
                        <Badge variant="error" size="md">
                          Hết hàng
                        </Badge>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
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

      {/* Report Preview Modal */}
      <ReportPreviewModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        initialReportType="inventory"
      />
    </div>
  )
}

