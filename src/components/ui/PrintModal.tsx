import React, { useRef } from 'react'
import { Printer, X, Download, QrCode, CheckCircle2, ShieldCheck } from 'lucide-react'

export interface PrintDocumentData {
  type: 'nhap-kho' | 'phieu-sua-chua' | 'bao-cao-ca'
  title: string
  code: string
  date: string
  author: string
  details: { label: string; value: string | number; highlight?: boolean }[]
  notes?: string
  status?: string
}

interface PrintModalProps {
  isOpen: boolean
  onClose: () => void
  data: PrintDocumentData | null
}

export default function PrintModal({ isOpen, onClose, data }: PrintModalProps) {
  const printContentRef = useRef<HTMLDivElement>(null)

  if (!isOpen || !data) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in print:p-0 print:bg-transparent">
      {/* Modal Card */}
      <div className="bg-surface-container-lowest w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl border border-outline-variant/60 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:w-full print:rounded-none">
        
        {/* Top Action Bar (Hidden on print) */}
        <div className="p-3.5 sm:p-4 bg-surface-container-low border-b border-outline-variant/40 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Printer size={18} />
            </div>
            <div>
              <h3 className="font-extrabold text-on-surface text-sm sm:text-base">Xem trước bản in A4</h3>
              <p className="text-[10px] sm:text-xs font-mono text-on-surface-variant line-clamp-1">Mẫu biểu chuẩn ISO 9001:2015 - Hoa Sen Group</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="cursor-pointer bg-primary text-on-primary px-3 sm:px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-on-primary-fixed-variant transition-colors shadow-sm"
            >
              <Printer size={15} /> <span className="hidden xs:inline">In Phiếu</span>
            </button>
            <button
              onClick={onClose}
              className="cursor-pointer p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-xl transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Document Area */}
        <div ref={printContentRef} className="p-4 sm:p-8 md:p-12 overflow-y-auto print:p-0 print:overflow-visible font-sans">
          {/* Header Company Details */}
          <div className="border-b-2 border-primary pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex items-center gap-3.5">
              <img src="/logo.jpg" alt="Hoa Sen Logo" className="h-12 w-12 sm:h-14 sm:w-14 object-cover rounded-lg border border-outline-variant/30 shrink-0" />
              <div>
                <h1 className="text-base sm:text-xl font-extrabold text-primary tracking-tight uppercase leading-none">
                  Tập Đoàn Hoa Sen (Hoa Sen Group)
                </h1>
                <p className="text-[11px] sm:text-xs font-bold text-on-surface uppercase mt-1">
                  Nhà máy Tôn Hoa Sen Phú Mỹ - KCN Phú Mỹ 1, Bà Rịa - Vũng Tàu
                </p>
                <p className="text-[10px] sm:text-xs text-on-surface-variant font-mono mt-0.5">
                  Hotline SCADA: (0254) 3922 888 • Email: scada@hoasengroup.vn
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 pt-2 sm:pt-0 border-outline-variant/30">
              <span className="inline-block px-2.5 py-1 bg-surface-container-high border border-outline-variant/40 rounded text-xs font-mono font-bold text-on-surface">
                {data.code}
              </span>
              <p className="text-[10px] sm:text-[11px] font-mono text-on-surface-variant mt-0.5">Ngày: {data.date}</p>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center my-6">
            <h2 className="text-2xl font-extrabold text-on-surface uppercase tracking-wide">
              {data.title}
            </h2>
            <p className="text-xs font-mono text-on-surface-variant mt-1">
              {data.type === 'nhap-kho' && 'HỆ THỐNG QUẢN LÝ KHO THÀNH PHẨM (ERP-WMS)'}
              {data.type === 'phieu-sua-chua' && 'HỆ THỐNG BẢO TRÌ THIẾT BỊ & SCADA (CMMS)'}
              {data.type === 'bao-cao-ca' && 'BÁO CÁO HIỆU SUẤT VẬN HÀNH CA TRỰC'}
            </p>
          </div>

          {/* Details Table */}
          <div className="border border-outline-variant/60 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-left border-collapse text-sm">
              <tbody>
                {data.details.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-outline-variant/40 ${idx % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low/40'}`}
                  >
                    <td className="py-2.5 px-4 font-bold text-on-surface-variant w-1/3 border-r border-outline-variant/40">
                      {item.label}
                    </td>
                    <td className={`py-2.5 px-4 font-mono font-bold ${item.highlight ? 'text-primary text-base' : 'text-on-surface'}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes section */}
          {data.notes && (
            <div className="p-4 bg-surface-container-low/50 rounded-xl border border-outline-variant/40 mb-6">
              <p className="text-xs font-bold text-on-surface-variant uppercase font-mono mb-1">Ghi chú & Yêu cầu kỹ thuật:</p>
              <p className="text-sm text-on-surface">{data.notes}</p>
            </div>
          )}

          {/* Signatures & Stamps */}
          <div className="grid grid-cols-3 gap-4 text-center mt-10 pt-4 border-t border-outline-variant/30">
            <div>
              <p className="text-xs font-bold text-on-surface uppercase font-mono">Người lập phiếu</p>
              <p className="text-[11px] text-on-surface-variant font-mono italic mt-0.5">(Ký, ghi rõ họ tên)</p>
              <div className="h-16 flex items-end justify-center font-bold text-sm text-on-surface">
                {data.author || 'Nguyễn Văn An'}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-on-surface uppercase font-mono">
                {data.type === 'nhap-kho' ? 'Thủ kho xác nhận' : 'Trưởng ca phê duyệt'}
              </p>
              <p className="text-[11px] text-on-surface-variant font-mono italic mt-0.5">(Ký, đóng dấu)</p>
              <div className="h-16 flex items-end justify-center">
                <div className="w-20 h-10 border-2 border-dashed border-rose-400/60 rounded flex items-center justify-center text-[10px] text-rose-500 font-mono font-bold uppercase rotate-[-6deg]">
                  ĐÃ DUYỆT
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-on-surface uppercase font-mono">Giám đốc sản xuất</p>
              <p className="text-[11px] text-on-surface-variant font-mono italic mt-0.5">(Ký duyệt)</p>
              <div className="h-16 flex items-end justify-center font-mono font-bold text-xs text-primary">
                HOA SEN FACTORY
              </div>
            </div>
          </div>

          {/* Barcode Footer */}
          <div className="mt-8 pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs font-mono text-on-surface-variant">
            <div className="flex items-center gap-2">
              <QrCode size={24} className="text-on-surface" />
              <span>Quét mã xác thực trên cổng ERP nội bộ Hoa Sen</span>
            </div>
            <span>Mã bảo mật: HS-SEC-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
        </div>

        {/* Bottom Actions Footer (Hidden on print) */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/40 flex justify-between items-center print:hidden">
          <span className="text-xs text-on-surface-variant font-mono">
            💡 Mẹo: Định dạng giấy in A4, căn lề Default hoặc Fit to Page.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={handlePrint}
              className="cursor-pointer px-5 py-2 bg-primary text-on-primary rounded-xl text-sm font-bold shadow-md hover:bg-on-primary-fixed-variant transition-colors flex items-center gap-2"
            >
              <Printer size={16} /> In phiếu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
