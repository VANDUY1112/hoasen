import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: number[]
  className?: string
}

export default function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  className = '',
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (currentPage > 3) {
        pages.push('...')
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div
      className={`
        px-3 sm:px-4 py-3 bg-surface-container-low/50 border-t border-outline-variant/30
        flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4
        ${className}
      `}
    >
      {/* Left info & Page Size Selector */}
      <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2.5 sm:gap-4 w-full sm:w-auto text-xs font-mono text-on-surface-variant">
        <div>
          <span>Hiển thị </span>
          <span className="font-bold text-on-surface">
            {startItem}-{endItem}
          </span>
          <span> trong </span>
          <span className="font-bold text-primary">{totalItems}</span>
          <span> bản ghi</span>
        </div>

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 pl-2 sm:border-l border-outline-variant/40">
            <span className="text-[11px] text-on-surface-variant/80">Số dòng:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-2 py-1 text-xs font-bold font-mono text-on-surface outline-none cursor-pointer hover:border-primary focus:border-primary"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} / trang
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right: Page Navigation Controls */}
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 w-full sm:w-auto">
        {/* First Page */}
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="cursor-pointer p-1.5 sm:p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title="Trang đầu"
        >
          <ChevronsLeft size={16} />
        </button>

        {/* Previous Page */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer p-1.5 sm:p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title="Trang trước"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, idx) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1.5 py-1 text-xs font-mono text-on-surface-variant/60 select-none"
                >
                  •••
                </span>
              )
            }

            const pageNum = Number(page)
            const isActive = pageNum === currentPage

            return (
              <button
                key={`page-${pageNum}`}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`
                  cursor-pointer min-w-[28px] sm:min-w-[32px] h-7 sm:h-8 px-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-150 flex items-center justify-center
                  ${isActive
                    ? 'bg-primary text-on-primary shadow-2xs font-extrabold scale-105'
                    : 'text-on-surface hover:bg-surface-container-high hover:text-primary'
                  }
                `}
              >
                {pageNum}
              </button>
            )
          })}
        </div>

        {/* Next Page */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer p-1.5 sm:p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title="Trang kế tiếp"
        >
          <ChevronRight size={16} />
        </button>

        {/* Last Page */}
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="cursor-pointer p-1.5 sm:p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title="Trang cuối"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  )
}
