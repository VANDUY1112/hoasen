// ===== MOCK DATA FOR HOA SEN GROUP PRODUCTION DASHBOARD =====

export interface ProductionLog {
  time: string
  coilId: string
  steelType: string
  weight: number
  status: 'passed' | 'failed' | 'pending'
}

export interface DefectRecord {
  code: string
  type: string
  frequency: number
  severity: 'high' | 'medium' | 'low'
}

export interface DowntimeRecord {
  time: string
  equipment: string
  duration: string
  status: 'repairing' | 'resolved' | 'pending'
}

export interface ProductionLine {
  id: string
  name: string
  progress: number
  trend: number
  target: string
  actual: string
}

export interface MaintenanceItem {
  equipment: string
  status: 'critical' | 'warning' | 'good'
  health: number
  nextMaintenance: string
  description: string
}

export interface ShiftPerformance {
  worker: string
  role: string
  output: number
  target: number
  quality: number
  status: 'excellent' | 'good' | 'needs-improvement'
}

export interface InventoryItem {
  code: string
  name: string
  type: string
  quantity: number
  unit: string
  location: string
  status: 'sufficient' | 'low' | 'critical'
}

// ===== KPI DATA =====
export const kpiData = {
  dailyOutput: { value: 1284, unit: 'Cuộn tôn / 24h', trend: 12.5 },
  defectCount: { value: 14, unit: 'Trường hợp kiểm định', trend: -2.4 },
  downtime: { value: 42, unit: 'Phút vận hành gián đoạn', resolved: true },
  oee: { value: 82, availability: 94.2, quality: 98.1 },
}

// ===== WEEKLY PRODUCTION =====
export const weeklyProduction = [
  { day: 'T2', planned: 100, actual: 85 },
  { day: 'T3', planned: 95, actual: 90 },
  { day: 'T4', planned: 100, actual: 95 },
  { day: 'T5', planned: 80, actual: 98 },
  { day: 'H.Nay', planned: 100, actual: 100 },
  { day: 'T7', planned: 100, actual: 0 },
]

// ===== PRODUCTION LOGS =====
export const productionLogs: ProductionLog[] = [
  { time: '14:22:15', coilId: 'HS-20231024-001', steelType: 'Mạ Kẽm Z275', weight: 24.5, status: 'passed' },
  { time: '13:45:30', coilId: 'HS-20231024-002', steelType: 'Cán Nguội CRC', weight: 18.2, status: 'passed' },
  { time: '13:10:45', coilId: 'HS-20231024-003', steelType: 'Sơn Phủ Màu', weight: 12.8, status: 'failed' },
  { time: '12:35:20', coilId: 'HS-20231024-004', steelType: 'Mạ Kẽm Z180', weight: 22.1, status: 'passed' },
  { time: '11:58:10', coilId: 'HS-20231024-005', steelType: 'Mạ Nhôm AZ150', weight: 19.7, status: 'pending' },
  { time: '11:22:55', coilId: 'HS-20231024-006', steelType: 'Cán Nguội CRC', weight: 21.3, status: 'passed' },
]

// ===== DEFECT RECORDS =====
export const defectRecords: DefectRecord[] = [
  { code: 'ERR-042', type: 'Trầy xước bề mặt mạ nhôm', frequency: 42, severity: 'high' },
  { code: 'ERR-018', type: 'Gợn sóng biên cuộn thép', frequency: 28, severity: 'medium' },
  { code: 'ERR-033', type: 'Bong tróc lớp sơn phủ', frequency: 15, severity: 'high' },
  { code: 'ERR-007', type: 'Sai biệt độ dày ±0.05mm', frequency: 11, severity: 'low' },
]

// ===== DOWNTIME RECORDS =====
export const downtimeRecords: DowntimeRecord[] = [
  { time: '14:22:10', equipment: 'Line Xẻ Băng 02', duration: '42m 15s', status: 'repairing' },
  { time: '11:30:00', equipment: 'Trục Cán Nguội 01', duration: '15m 40s', status: 'resolved' },
  { time: '09:15:25', equipment: 'Hệ thống Mạ Kẽm 04', duration: '28m 10s', status: 'resolved' },
  { time: '08:02:50', equipment: 'Máy Cắt Dọc 03', duration: '8m 30s', status: 'resolved' },
  { time: '06:45:12', equipment: 'Bơm Dầu Thủy Lực', duration: '48m 00s', status: 'pending' },
]

// ===== PRODUCTION LINES (DINH MUC) =====
export const productionLines: ProductionLine[] = [
  { id: 'cn-01', name: 'Line Cán Nguội Phôi', progress: 92, trend: 2.4, target: '1,200T', actual: '1,104T' },
  { id: 'mk-04', name: 'Line Mạ Kẽm Tốc Độ Cao', progress: 78, trend: -4.1, target: '850T', actual: '663T' },
  { id: 'sm-02', name: 'Line Sơn Phủ Màu', progress: 105, trend: 5.0, target: '500T', actual: '525T' },
  { id: 'cn-03', name: 'Line Cán Nguội Biên', progress: 64, trend: 0, target: '900T', actual: '576T' },
]

// ===== MONTHLY COMPARISON (6 months) =====
export const monthlyComparison = [
  { month: 'Tháng 1', target: 80, actual: 75 },
  { month: 'Tháng 2', target: 80, actual: 82 },
  { month: 'Tháng 3', target: 85, actual: 88 },
  { month: 'Tháng 4', target: 90, actual: 84 },
  { month: 'Tháng 5', target: 90, actual: 92 },
  { month: 'Tháng 6', target: 95, actual: 94 },
]

// ===== MAINTENANCE ITEMS =====
export const maintenanceItems: MaintenanceItem[] = [
  { equipment: 'Trục cán chính - Line 01', status: 'critical', health: 25, nextMaintenance: '48h', description: 'Phát hiện rung chấn bất thường tại ổ đỡ trục phía Đông. Dự báo hỏng hóc trong vòng 48 giờ tới nếu không can thiệp.' },
  { equipment: 'Bơm thủy lực - Line 03', status: 'warning', health: 55, nextMaintenance: '5 ngày', description: 'Áp suất dầu đang giảm dần, cần kiểm tra seal và van điều áp.' },
  { equipment: 'Hệ thống làm mát - Mạ Kẽm', status: 'good', health: 88, nextMaintenance: '30 ngày', description: 'Hoạt động ổn định, lịch bảo trì định kỳ tiếp theo vào cuối tháng.' },
  { equipment: 'Motor truyền động - Xẻ Băng', status: 'warning', health: 62, nextMaintenance: '7 ngày', description: 'Nhiệt độ cuộn dây tăng nhẹ, cần giám sát liên tục.' },
]

// ===== SPARE PARTS FORECAST =====
export const sparePartsForecast = [
  { name: 'Vòng bi SKF 22320', stock: 10, status: 'critical' as const },
  { name: 'Dầu thủy lực Castrol 68', stock: 45, status: 'warning' as const },
  { name: 'Dao cắt hợp kim', stock: 72, status: 'good' as const },
]

// ===== MAINTENANCE TIMELINE =====
export const maintenanceTimeline = [
  { date: '15/08', task: 'Thay vòng bi trục cán Line 01', priority: 'urgent' as const },
  { date: '18/08', task: 'Kiểm tra bơm thủy lực Line 03', priority: 'high' as const },
  { date: '22/08', task: 'Bảo trì định kỳ hệ thống mạ', priority: 'normal' as const },
  { date: '01/09', task: 'Đại tu motor truyền động', priority: 'normal' as const },
]

// ===== SHIFT PERFORMANCE =====
export const shiftPerformanceData: Record<string, ShiftPerformance[]> = {
  'ca-1': [
    { worker: 'Nguyễn Văn An', role: 'Trưởng ca', output: 420, target: 400, quality: 99.2, status: 'excellent' },
    { worker: 'Trần Minh Đức', role: 'Vận hành máy cán', output: 385, target: 400, quality: 98.5, status: 'good' },
    { worker: 'Lê Hoàng Nam', role: 'Vận hành máy mạ', output: 410, target: 400, quality: 97.8, status: 'excellent' },
    { worker: 'Phạm Quốc Bảo', role: 'Kiểm tra chất lượng', output: 350, target: 400, quality: 99.5, status: 'needs-improvement' },
  ],
  'ca-2': [
    { worker: 'Võ Thanh Tùng', role: 'Trưởng ca', output: 405, target: 400, quality: 98.8, status: 'excellent' },
    { worker: 'Đỗ Hữu Phước', role: 'Vận hành máy cán', output: 390, target: 400, quality: 97.2, status: 'good' },
    { worker: 'Bùi Anh Khoa', role: 'Vận hành máy mạ', output: 370, target: 400, quality: 98.1, status: 'good' },
  ],
  'ca-3': [
    { worker: 'Huỳnh Tấn Phát', role: 'Trưởng ca', output: 395, target: 400, quality: 98.4, status: 'good' },
    { worker: 'Ngô Quang Huy', role: 'Vận hành máy cán', output: 360, target: 400, quality: 96.8, status: 'needs-improvement' },
  ],
}

// ===== INVENTORY =====
export const inventoryItems: InventoryItem[] = [
  { code: 'NVL-001', name: 'Thép cuộn cán nóng HRC', type: 'Nguyên liệu', quantity: 2450, unit: 'Tấn', location: 'Kho A1', status: 'sufficient' },
  { code: 'NVL-002', name: 'Kẽm thỏi nguyên chất 99.99%', type: 'Nguyên liệu', quantity: 180, unit: 'Tấn', location: 'Kho B2', status: 'low' },
  { code: 'TP-001', name: 'Tôn mạ kẽm Z275 - 0.45mm', type: 'Thành phẩm', quantity: 856, unit: 'Cuộn', location: 'Kho TP-1', status: 'sufficient' },
  { code: 'TP-002', name: 'Tôn sơn phủ màu RAL 3001', type: 'Thành phẩm', quantity: 124, unit: 'Cuộn', location: 'Kho TP-2', status: 'low' },
  { code: 'PT-001', name: 'Vòng bi SKF 22320', type: 'Phụ tùng', quantity: 4, unit: 'Cái', location: 'Kho PT', status: 'critical' },
  { code: 'NVL-003', name: 'Sơn phủ epoxy công nghiệp', type: 'Nguyên liệu', quantity: 520, unit: 'Lít', location: 'Kho B3', status: 'sufficient' },
]

// ===== DEFECT IMAGES =====
export const defectImages = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuDwN5M2fc9C9klFsKfCxt2-pmedNXeyXxT5nptyfDPTjeAmKWVZwOmXk7TCSDtnb0Ux0d7CWgaCF30Cb5VdwyNIS8sRtTD4Bbn9ogYW-R15BPNNqQ30ZQ1E-CTr1B8djhY6Pvvqf7KaJEDdZqRCtFIMIWVSVrGl61BuO4oYpKqFyD8VByFUIp06BlqRR-nz3xeXm7MxQCYAPYjK1JUP7LqtPWR6DuC9HfpflLV97mTlE7hURrWj4YIQ7ZQ9Rq3uulQ4iPpB_cOrY',
    label: 'Lỗi Trầy Xước Bề Mặt',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBnkxjkC3_1a-0g-BWH-qWQS2O41tOfBUKq2NaReXOc-SlC-kMm8loQbBgkzovwegCrk7sqFfdYnzCwz_GYXD2mGTy7u99rmXqcRFlpbwe2v2yeO6d9grhWBQF2IEYynorh9hKsota8DDdcN1jEh5FqLcRAfF7c_lfzqaCopQ-avykotv_2rlvVRt-hDTTNISxA6y--7hYrVGh0gAWufEWtK_aSIhLDNhOgF_0a4SNg8OKRSBwAde0rjeAswGnVWctYKkDsp2aY9Y',
    label: 'Lỗi Gợn Sóng Biên',
  },
]

// ===== BANNER / DECORATION IMAGES =====
export const decorativeImages = {
  profile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAoLGbTUUQbPc2ZueV9TDc8CleoYIUV3Bz3X9VPP3MyqsxnLoC7GofDnN0CKkhaBRrkhC8n1Iv08wP6P7PWzA9WadKg0nnvtvrYAcO3lFDb0y5c6L4OZ_O7a-CiRswDjg9dBG-64JMGgYPSjoO-wL0PvxTbdRFuatsyCt_LKZmXw2JjQWpS93AwKT6KuYFGIQq7zWTak-UGsk2iv8AesuPOhsKL33nsjg-koVA48GDHe5FZHv5QPqVQIWR1ffUpEtfAeWd_VY6OTk',
  banner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDddkI3m8AUkUx1GpPQvx01AmMOheN-fMx0ZdUC1Ns72S1jMEhiJEHyk8xvgbNnugKR-c93A7q8ORhIkNOtrqroDfFqE1PQHmsJjywDClOqz_7QhMWrW09LJw_aa_lOQrzT7nMI47UFBzLnyO_wC7rray8t6squYOjlVZJM2XEiVxrjVtU5u0c98mW_zWmzXvvN55RkXhcPtjqTI0jeisO4oTqyrwD1_Eh66DpaR5fvB58Secz48KSmpJJA0fYZW1M89DkA8T2Q54Y',
  maintenance: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMQNe4hPNmbV6xkx34ejhcSAb4YGySKEJGvAW34iHOd4VR10fYSs_iufaSiCUJv_756FA1y-YnbXA1jc4V32f5Jfxjt4Pj3qTRPmrjj29EsPBjC9fAibvwLDTWH7KAnkOS48sgXWejhzx8cnU15FtQNsarUQ2vI8zHBJUE_o3KZreiGNlBTJzYAlzWmi3ayFLUZ4PdArYlrxwq41X1OAhohHoUPnQAJYxTb5Kmw17C5UVYT0O2pCow7rtjWllxd6fugmijZF2pgFo',
  factory1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvu-DYvpJdtAjh6LJF9GB4TeW3laptuiThH_3aBTgjeLva4iDf-d-riB64E5ygErNjr-sDA6DFEYKKpE0jP65Lk9TMI9AAzzlvBXx_Q57zqoXP63ZxFp_uUbTjV7PjKJK_q8NpSjcVHCodxWnSKoMYjZ2-rMeFySV8b7w8-CL9JIbxgXIvphoXiiWZOP3yQ7UbZtZYWyFklM3ATzpLrkKSXsS9fpZN1fQ2Lxl4oefrs6J61VWHkLAaZZaHz3AXmFnSkPj5RjBZwx0',
  factory2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRdKOlHgUnRcsJxpfWqFMndM1VOBKZvgU6yPzWgd9x6zxxwsRlj6jvQgDNokPMe_xCjhV6DPFAEIbvost96tapEhTqOqZvTCaz__TtI_fD6o9j8MzsdVrpnroTIfu59miFAlI2peA4PeiqUEXBzarg0XMIrteScW3uVnjM95xgTdqloPhJRkYCcXEO_EhTXYniy6sDf6k1iSGXZ2x1b85g-AsAmcGa7MxhTyTzOnHDXOGf3sSoe0hvHSn93R-idXxvlspfYJ7rHdY',
  factory3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOREmkgwnl2-JPtdokRCNLZ97sbPNnxz6ehFIobjKXBONGEblbe4IUC1Zo6HeAnAWJStqjKStH9qZyBmx4VB-_j2uAdB2YZ1F35Or2wb28kudxScm1AkS4tJhKa-3AAnU_lUvFytXJKOx0qpRhiOMSA7HwNSk_C7mcrgBRUQY97i1WlSTGMrYOVx1QPFX3hCk18GPcZCVNzAngoKW5YOCe-jC0zfauewqZ5ZQI8VdnLh9mWwarwL5Y_sxYdCbmfGOCfQfe5m41tNo',
  dinhMuc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxLNn0U4tnIRRgYBHqFwz9w5I4JOMkXpqEHvWDYp_Pty2qUrf2oO-VtSt5vNtjD7FaT0frwtZ7tua9KZsI7QSA_Gr_5L-DKDJpRtfdByTwJib4egRMGdlwv7u4WLvYmYdGMSFfh2W5giFxYYcoxxONHbYYbNqcMDZyV2JFRAlv_DAmbUtviu7rsXUmMeuRCP2NwnT1XkEI9BcqIiE4cAZ9sbuGLAs7NZ7jAZem7UTgNQlWGJBVowue--pxkR2LvmXW0temR-xitJg',
}
