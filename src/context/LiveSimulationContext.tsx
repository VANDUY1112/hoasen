import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { ProductionLog, productionLogs as initialLogs, kpiData as initialKpi } from '../data/mockData'

interface LiveSimulationContextType {
  isSimulating: boolean
  toggleSimulation: () => void
  dailyOutput: number
  liveLogs: ProductionLog[]
  liveOee: number
  lastProducedCoil: ProductionLog | null
  speedMpm: number // Meters per minute
}

const LiveSimulationContext = createContext<LiveSimulationContextType | undefined>(undefined)

const steelTypes = ['Mạ Kẽm Z275', 'Cán Nguội CRC', 'Sơn Phủ Màu RAL 3001', 'Mạ Nhôm AZ150', 'Mạ Kẽm Z180']

export function LiveSimulationProvider({ children }: { children: ReactNode }) {
  const [isSimulating, setIsSimulating] = useState(true)
  const [dailyOutput, setDailyOutput] = useState(1284.5)
  const [liveLogs, setLiveLogs] = useState<ProductionLog[]>(initialLogs)
  const [liveOee, setLiveOee] = useState(82.4)
  const [speedMpm, setSpeedMpm] = useState(185) // 185 m/min
  const [lastProducedCoil, setLastProducedCoil] = useState<ProductionLog | null>(null)

  useEffect(() => {
    if (!isSimulating) return

    // Every 4 seconds, produce live telemetry tick
    const interval = setInterval(() => {
      // 1. Random speed fluctuation
      const newSpeed = Math.floor(180 + Math.random() * 15)
      setSpeedMpm(newSpeed)

      // 2. Output increment
      const increment = parseFloat((0.2 + Math.random() * 0.4).toFixed(2))
      setDailyOutput((prev) => parseFloat((prev + increment).toFixed(2)))

      // 3. OEE slight realistic variation
      setLiveOee((prev) => {
        const delta = (Math.random() - 0.5) * 0.2
        return parseFloat(Math.min(88, Math.max(78, prev + delta)).toFixed(1))
      })

      // 4. Every 12 seconds, roll off a brand new finished steel coil
      if (Math.random() > 0.6) {
        const now = new Date()
        const timeStr = now.toTimeString().split(' ')[0]
        const randomNum = Math.floor(100 + Math.random() * 900)
        const newCoil: ProductionLog = {
          time: timeStr,
          coilId: `HS-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${randomNum}`,
          steelType: steelTypes[Math.floor(Math.random() * steelTypes.length)],
          weight: parseFloat((18 + Math.random() * 8).toFixed(2)),
          status: Math.random() > 0.08 ? 'passed' : 'failed',
        }

        setLastProducedCoil(newCoil)
        setLiveLogs((prev) => [newCoil, ...prev.slice(0, 19)]) // Keep latest 20
      }
    }, 3500)

    return () => clearInterval(interval)
  }, [isSimulating])

  const toggleSimulation = () => {
    setIsSimulating((prev) => !prev)
  }

  return (
    <LiveSimulationContext.Provider
      value={{
        isSimulating,
        toggleSimulation,
        dailyOutput,
        liveLogs,
        liveOee,
        lastProducedCoil,
        speedMpm,
      }}
    >
      {children}
    </LiveSimulationContext.Provider>
  )
}

export function useLiveSimulation() {
  const context = useContext(LiveSimulationContext)
  if (!context) {
    throw new Error('useLiveSimulation must be used within a LiveSimulationProvider')
  }
  return context
}
