import { ReactNode } from "react"

interface StatCardProps {
  icon: ReactNode
  title: string
  value: string
  change?: string
  isPositive?: boolean
}

export function StatCard({ icon, title, value, change, isPositive }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          
          {change && (
            <p className={`text-xs mt-1 flex items-center ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isPositive ? '↑' : '↓'} {change} from last period
            </p>
          )}
        </div>
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  )
}