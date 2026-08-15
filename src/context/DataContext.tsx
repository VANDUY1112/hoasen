import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  inventoryItems as initialInventory,
  maintenanceItems as initialMaintenance,
  shiftPerformanceData as initialShiftData,
  productionLogs as initialLogs,
  type InventoryItem,
  type MaintenanceItem,
  type ShiftPerformance,
  type ProductionLog,
} from '../data/mockData'

export interface RepairTicket {
  id: string
  code: string
  equipment: string
  line: string
  priority: 'urgent' | 'high' | 'normal' | 'low'
  issueType: string
  description: string
  reporter: string
  assignedTo: string
  createdAt: string
  status: 'pending' | 'in_progress' | 'completed'
  partsNeeded?: string
  downtimeEst?: string
}

const initialTickets: RepairTicket[] = [
  {
    id: 'tk-1',
    code: 'WRK-2026-0815-01',
    equipment: 'Trục cán chính - Line 01',
    line: 'Line Cán Nguội 01',
    priority: 'urgent',
    issueType: 'Rung chấn cơ khí',
    description: 'Ổ đỡ trục cán phát hiện rung chấn vượt ngưỡng 12%. Cần kiểm tra bạc đạn và bôi trơn khẩn cấp.',
    reporter: 'Nguyễn Văn An (Trưởng ca 1)',
    assignedTo: 'Trần Văn Kỹ (Bảo trì cơ điện)',
    createdAt: '15/08/2026 14:15',
    status: 'in_progress',
    partsNeeded: 'Vòng bi SKF 22320 (x2)',
    downtimeEst: '45 phút',
  },
  {
    id: 'tk-2',
    code: 'WRK-2026-0815-02',
    equipment: 'Bơm dầu thủy lực',
    line: 'Line Xẻ Băng 02',
    priority: 'high',
    issueType: 'Rò rỉ áp suất',
    description: 'Áp suất dầu giảm dưới 140 bar, nguy cơ gián đoạn chuyển động nâng cuộn.',
    reporter: 'Võ Thanh Tùng (Trưởng ca 2)',
    assignedTo: 'Lê Hoàng Nam (Tổ Cơ khí)',
    createdAt: '15/08/2026 11:30',
    status: 'pending',
    partsNeeded: 'Bộ gioăng phớt thủy lực 80mm',
    downtimeEst: '30 phút',
  },
]

interface DataContextType {
  inventory: InventoryItem[]
  addInventoryItem: (item: Omit<InventoryItem, 'status'> & { status?: InventoryItem['status'] }) => void
  updateInventoryItem: (code: string, updates: Partial<InventoryItem>) => void
  deleteInventoryItem: (code: string) => void

  tickets: RepairTicket[]
  addRepairTicket: (ticket: Omit<RepairTicket, 'id' | 'createdAt' | 'status'>) => RepairTicket
  updateTicketStatus: (id: string, status: RepairTicket['status']) => void

  maintenanceList: MaintenanceItem[]
  shiftData: Record<string, ShiftPerformance[]>
  updateShiftTarget: (shiftKey: string, workerName: string, newTarget: number) => void

  prodLogs: ProductionLog[]
  addProdLog: (log: ProductionLog) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const STORAGE_KEYS = {
  INVENTORY: 'hoasen_inventory_data_v1',
  TICKETS: 'hoasen_repair_tickets_v1',
  SHIFT_DATA: 'hoasen_shift_data_v1',
  PROD_LOGS: 'hoasen_prod_logs_v1',
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inventory state
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INVENTORY)
      return saved ? JSON.parse(saved) : initialInventory
    } catch {
      return initialInventory
    }
  })

  // Repair tickets state
  const [tickets, setTickets] = useState<RepairTicket[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TICKETS)
      return saved ? JSON.parse(saved) : initialTickets
    } catch {
      return initialTickets
    }
  })

  // Shift performance state
  const [shiftData, setShiftData] = useState<Record<string, ShiftPerformance[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SHIFT_DATA)
      return saved ? JSON.parse(saved) : initialShiftData
    } catch {
      return initialShiftData
    }
  })

  // Production logs state
  const [prodLogs, setProdLogs] = useState<ProductionLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROD_LOGS)
      return saved ? JSON.parse(saved) : initialLogs
    } catch {
      return initialLogs
    }
  })

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory))
    } catch {
      // ignore
    }
  }, [inventory])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets))
    } catch {
      // ignore
    }
  }, [tickets])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SHIFT_DATA, JSON.stringify(shiftData))
    } catch {
      // ignore
    }
  }, [shiftData])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROD_LOGS, JSON.stringify(prodLogs))
    } catch {
      // ignore
    }
  }, [prodLogs])

  const addInventoryItem = (item: Omit<InventoryItem, 'status'> & { status?: InventoryItem['status'] }) => {
    const status: InventoryItem['status'] =
      item.status || (item.quantity <= 10 ? 'critical' : item.quantity <= 100 ? 'low' : 'sufficient')
    const newItem: InventoryItem = { ...item, status }
    setInventory((prev) => [newItem, ...prev.filter((i) => i.code !== item.code)])
  }

  const updateInventoryItem = (code: string, updates: Partial<InventoryItem>) => {
    setInventory((prev) => prev.map((item) => (item.code === code ? { ...item, ...updates } : item)))
  }

  const deleteInventoryItem = (code: string) => {
    setInventory((prev) => prev.filter((item) => item.code !== code))
  }

  const addRepairTicket = (ticketData: Omit<RepairTicket, 'id' | 'createdAt' | 'status'>): RepairTicket => {
    const now = new Date()
    const timeStr = `${now.toLocaleDateString('vi-VN')} ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`
    const newTicket: RepairTicket = {
      ...ticketData,
      id: `tk-${Date.now()}`,
      createdAt: timeStr,
      status: 'pending',
    }
    setTickets((prev) => [newTicket, ...prev])
    return newTicket
  }

  const updateTicketStatus = (id: string, status: RepairTicket['status']) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
  }

  const updateShiftTarget = (shiftKey: string, workerName: string, newTarget: number) => {
    setShiftData((prev) => {
      const currentList = prev[shiftKey] || []
      const updatedList = currentList.map((w) => (w.worker === workerName ? { ...w, target: newTarget } : w))
      return { ...prev, [shiftKey]: updatedList }
    })
  }

  const addProdLog = (log: ProductionLog) => {
    setProdLogs((prev) => [log, ...prev])
  }

  return (
    <DataContext.Provider
      value={{
        inventory,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        tickets,
        addRepairTicket,
        updateTicketStatus,
        maintenanceList: initialMaintenance,
        shiftData,
        updateShiftTarget,
        prodLogs,
        addProdLog,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useDataContext() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider')
  }
  return context
}
