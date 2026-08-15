import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { productionLogs, inventoryItems, defectRecords, shiftPerformanceData, ProductionLog, InventoryItem, DefectRecord, ShiftPerformance } from '../data/mockData'

// ===== HELPER: APPLY HOA SEN BRANDED HEADER =====
function applyBrandedHeader(
  worksheet: ExcelJS.Worksheet,
  title: string,
  subtitle: string,
  totalCols: number
) {
  // Brand Header Block (Rows 1-2 merged)
  worksheet.mergeCells(1, 1, 2, totalCols)
  const titleCell = worksheet.getCell(1, 1)
  titleCell.value = `TẬP ĐOÀN HOA SEN - ${title.toUpperCase()}`
  titleCell.font = { name: 'Arial', size: 14, bold: true, color: { argb: 'FFFFFFFF' } }
  titleCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFB5000B' }, // Hoa Sen Primary Red
  }
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' }

  // Subtitle / Info Row 3
  worksheet.mergeCells(3, 1, 3, totalCols)
  const subCell = worksheet.getCell(3, 1)
  const now = new Date()
  const dateStr = now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  subCell.value = `${subtitle} | Thời điểm xuất: ${dateStr} | Nhà máy: KCN Phú Mỹ 1`
  subCell.font = { name: 'Arial', size: 9, italic: true, color: { argb: 'FF555555' } }
  subCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFF5F5F5' },
  }
  subCell.alignment = { vertical: 'middle', horizontal: 'center' }

  // Blank spacing row
  worksheet.getRow(4).height = 10
}

// ===== HELPER: AUTO-FIT COLUMNS =====
function autoFitColumns(worksheet: ExcelJS.Worksheet, minWidth = 12) {
  worksheet.columns.forEach((column) => {
    let maxLen = minWidth
    column.eachCell?.({ includeEmpty: false }, (cell) => {
      const len = cell.value ? cell.value.toString().length : 0
      if (len > maxLen) {
        maxLen = len
      }
    })
    column.width = Math.min(maxLen + 4, 45)
  })
}

// ===== EXPORT 1: BÁO CÁO SẢN LƯỢNG & NHẬT KÝ CUỘN TÔN =====
export async function exportProductionReport(logs: ProductionLog[] = productionLogs) {
  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'Hoa Sen Group ERP System'
  workbook.created = new Date()

  const worksheet = workbook.addWorksheet('Nhật Ký Sản Xuất')
  applyBrandedHeader(worksheet, 'BÁO CÁO NHẬT KÝ SẢN XUẤT CUỘN TÔN', 'Dây chuyền Cán Nguội & Mạ Kẽm', 6)

  // Table Headers (Row 5)
  const headerRow = worksheet.getRow(5)
  headerRow.values = ['STT', 'Thời Gian', 'Mã Cuộn (Coil ID)', 'Chủng Loại Thép', 'Khối Lượng (Tấn)', 'Trạng Thái']
  headerRow.height = 28
  headerRow.eachCell((cell) => {
    cell.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFFFF' } }
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE30613' },
    }
    cell.alignment = { vertical: 'middle', horizontal: 'center' }
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF999999' } },
      left: { style: 'thin', color: { argb: 'FF999999' } },
      bottom: { style: 'medium', color: { argb: 'FF333333' } },
      right: { style: 'thin', color: { argb: 'FF999999' } },
    }
  })

  // Data Rows (Row 6+)
  let totalWeight = 0
  logs.forEach((log, index) => {
    const rowNumber = 6 + index
    const row = worksheet.getRow(rowNumber)
    totalWeight += log.weight

    const statusText = log.status === 'passed' ? 'ĐẠT CHUẨN' : log.status === 'failed' ? 'LỖI BỀ MẶT' : 'CHỜ KIỂM ĐỊNH'
    row.values = [index + 1, log.time, log.coilId, log.steelType, log.weight, statusText]
    row.height = 22

    // Apply Zebra striping and borders
    const isEven = index % 2 === 0
    const rowBg = isEven ? 'FFFFFFFF' : 'FFF9FAFB'

    row.eachCell((cell, colNumber) => {
      cell.font = { name: 'Arial', size: 10 }
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        right: { style: 'thin', color: { argb: 'FFE5E7EB' } },
      }
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowBg } }

      // Specific alignments
      if (colNumber === 1 || colNumber === 2) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
      } else if (colNumber === 3) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
        cell.font = { name: 'Courier New', size: 10, bold: true, color: { argb: 'FFB5000B' } }
      } else if (colNumber === 4) {
        cell.alignment = { vertical: 'middle', horizontal: 'left' }
        cell.font = { name: 'Arial', size: 10, bold: true }
      } else if (colNumber === 5) {
        cell.alignment = { vertical: 'middle', horizontal: 'right' }
        cell.numFmt = '#,##0.00'
      } else if (colNumber === 6) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
        if (log.status === 'passed') {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD1FAE5' } }
          cell.font = { name: 'Arial', size: 9, bold: true, color: { argb: 'FF065F46' } }
        } else if (log.status === 'failed') {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEE2E2' } }
          cell.font = { name: 'Arial', size: 9, bold: true, color: { argb: 'FF991B1B' } }
        } else {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } }
          cell.font = { name: 'Arial', size: 9, bold: true, color: { argb: 'FF92400E' } }
        }
      }
    })
  })

  // Summary Row
  const summaryRowIndex = 6 + logs.length
  const summaryRow = worksheet.getRow(summaryRowIndex)
  summaryRow.values = ['TỔNG CỘNG', '', '', `${logs.length} Cuộn hoàn thành`, totalWeight, '']
  summaryRow.height = 26
  summaryRow.eachCell((cell, colNumber) => {
    cell.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FF111827' } }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF3F4F6' } }
    cell.border = {
      top: { style: 'medium', color: { argb: 'FF333333' } },
      bottom: { style: 'double', color: { argb: 'FF333333' } },
    }
    if (colNumber === 5) {
      cell.alignment = { vertical: 'middle', horizontal: 'right' }
      cell.numFmt = '#,##0.00'
      cell.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFB5000B' } }
    }
  })

  autoFitColumns(worksheet)

  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), `HoaSen_BaoCao_SanLuong_${Date.now()}.xlsx`)
}

// ===== EXPORT 2: BÁO CÁO TỒN KHO VẬT TƯ =====
export async function exportInventoryReport(items: InventoryItem[] = inventoryItems) {
  const workbook = new ExcelJS.Workbook()
  workbook.creator = 'Hoa Sen Group ERP'

  const worksheet = workbook.addWorksheet('Ton_Kho')
  applyBrandedHeader(worksheet, 'BÁO CÁO QUẢN TRỊ TỒN KHO & VẬT TƯ', 'Tổng kho Nguyên vật liệu & Thành phẩm', 6)

  const headerRow = worksheet.getRow(5)
  headerRow.values = ['Mã Vật Tư', 'Tên Hàng Hóa / Vật Tư', 'Phân Loại', 'Số Lượng', 'Đơn Vị', 'Vị Trí Lưu Kho', 'Trạng Thái']
  headerRow.height = 28
  headerRow.eachCell((cell) => {
    cell.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFFFF' } }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB5000B' } }
    cell.alignment = { vertical: 'middle', horizontal: 'center' }
  })

  items.forEach((item, index) => {
    const row = worksheet.getRow(6 + index)
    const statusText = item.status === 'sufficient' ? 'ĐỦ TỒN KHO' : item.status === 'low' ? 'SẮP HẾT HÀNG' : 'ĐẶT HÀNG GẤP'
    row.values = [item.code, item.name, item.type, item.quantity, item.unit, item.location, statusText]
    row.height = 22

    row.eachCell((cell, colNumber) => {
      cell.font = { name: 'Arial', size: 10 }
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
      }
      if (colNumber === 1) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
        cell.font = { name: 'Courier New', size: 10, bold: true, color: { argb: 'FFB5000B' } }
      } else if (colNumber === 4) {
        cell.alignment = { vertical: 'middle', horizontal: 'right' }
        cell.numFmt = '#,##0'
      } else if (colNumber === 7) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
        if (item.status === 'sufficient') {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD1FAE5' } }
          cell.font = { name: 'Arial', size: 9, bold: true, color: { argb: 'FF065F46' } }
        } else if (item.status === 'critical') {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEE2E2' } }
          cell.font = { name: 'Arial', size: 9, bold: true, color: { argb: 'FF991B1B' } }
        } else {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } }
          cell.font = { name: 'Arial', size: 9, bold: true, color: { argb: 'FF92400E' } }
        }
      }
    })
  })

  autoFitColumns(worksheet)

  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), `HoaSen_TonKho_${Date.now()}.xlsx`)
}

// ===== EXPORT 3: BÁO CÁO HIỆU SUẤT CA TRỰC =====
export async function exportShiftReport(shiftName = 'Ca 1 (06:00 - 14:00)', workers: ShiftPerformance[] = shiftPerformanceData['ca-1']) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Hieu_Suat_Ca')
  applyBrandedHeader(worksheet, `BÁO CÁO ĐÁNH GIÁ HIỆU SUẤT ${shiftName.toUpperCase()}`, 'Phòng Quản đốc Sản xuất', 6)

  const headerRow = worksheet.getRow(5)
  headerRow.values = ['STT', 'Họ Và Tên Công Nhân', 'Vị Trí / Vai Trò', 'Sản Lượng (Tấn)', 'Mục Tiêu (Tấn)', 'Tỷ Lệ Chất Lượng', 'Xếp Loại']
  headerRow.height = 28
  headerRow.eachCell((cell) => {
    cell.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFFFF' } }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE30613' } }
    cell.alignment = { vertical: 'middle', horizontal: 'center' }
  })

  workers.forEach((w, index) => {
    const row = worksheet.getRow(6 + index)
    const ratingText = w.status === 'excellent' ? 'XUẤT SẮC' : w.status === 'good' ? 'HOÀN THÀNH' : 'CẦN CẢI THIỆN'
    row.values = [index + 1, w.worker, w.role, w.output, w.target, `${w.quality}%`, ratingText]
    row.height = 22

    row.eachCell((cell, colNumber) => {
      cell.font = { name: 'Arial', size: 10 }
      cell.border = { top: { style: 'thin', color: { argb: 'FFE5E7EB' } }, bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } } }
      if (colNumber === 4 || colNumber === 5) {
        cell.alignment = { vertical: 'middle', horizontal: 'right' }
      } else if (colNumber === 6 || colNumber === 7) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
        if (w.status === 'excellent') {
          cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FF065F46' } }
        }
      }
    })
  })

  autoFitColumns(worksheet)

  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), `HoaSen_HieuSuat_${shiftName.replace(/\s+/g, '_')}_${Date.now()}.xlsx`)
}

// ===== EXPORT 4: BÁO CÁO TỔNG HỢP GIÁM ĐỐC =====
export async function exportExecutiveSummary() {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('KPI_Tong_Quan')
  applyBrandedHeader(worksheet, 'BÁO CÁO TỔNG HỢP KPI & VẬN HÀNH NHÀ MÁY', 'Bản báo cáo đặc biệt cho Ban Tổng Giám Đốc', 5)

  const kpis = [
    { kpi: 'Sản lượng sản xuất trong ngày', value: '1,284.00 Tấn', target: '1,200.00 Tấn', status: 'VƯỢT 12.5%' },
    { kpi: 'Tỷ lệ hiệu suất OEE toàn nhà máy', value: '82.0%', target: '80.0%', status: 'ĐẠT CHUẨN' },
    { kpi: 'Tỷ lệ khả dụng dây chuyền (A)', value: '94.2%', target: '90.0%', status: 'TỐT' },
    { kpi: 'Chất lượng xuất xưởng (Q)', value: '98.1%', target: '98.0%', status: 'ĐẠT ISO' },
    { kpi: 'Thời gian dừng máy gián đoạn (Downtime)', value: '42 Phút', target: '< 60 Phút', status: 'KIỂM SOÁT TỐT' },
    { kpi: 'Số lỗi bề mặt phát hiện trong ca', value: '14 Vụ', target: '< 20 Vụ', status: 'GIẢM 2.4%' },
  ]

  const headerRow = worksheet.getRow(5)
  headerRow.values = ['Chỉ Số Hiệu Suất (KPI)', 'Thực Tế Đạt Được', 'Chỉ Tiêu Đặt Ra', 'Đánh Giá Tiến Độ']
  headerRow.height = 28
  headerRow.eachCell((cell) => {
    cell.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFFFF' } }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB5000B' } }
    cell.alignment = { vertical: 'middle', horizontal: 'center' }
  })

  kpis.forEach((k, index) => {
    const row = worksheet.getRow(6 + index)
    row.values = [k.kpi, k.value, k.target, k.status]
    row.height = 24
    row.eachCell((cell, colNumber) => {
      cell.font = { name: 'Arial', size: 10 }
      cell.border = { top: { style: 'thin', color: { argb: 'FFE5E7EB' } }, bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } } }
      if (colNumber === 2 || colNumber === 3) {
        cell.alignment = { vertical: 'middle', horizontal: 'right' }
        cell.font = { name: 'Arial', size: 10, bold: true }
      } else if (colNumber === 4) {
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
        cell.font = { name: 'Arial', size: 9, bold: true, color: { argb: 'FF065F46' } }
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD1FAE5' } }
      }
    })
  })

  autoFitColumns(worksheet)

  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), `HoaSen_BaoCao_GiamDoc_${Date.now()}.xlsx`)
}

// Alias for command palette & quick actions
export const exportComprehensiveReport = exportExecutiveSummary

