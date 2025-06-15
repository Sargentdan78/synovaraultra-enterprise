import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Sample order data
const orders = [
  {
    id: "ORD-5392",
    customer: "Alex Johnson",
    status: "paid",
    date: "2023-06-12",
    total: "$129.99"
  },
  {
    id: "ORD-5391",
    customer: "Maria Garcia",
    status: "fulfilled",
    date: "2023-06-12",
    total: "$79.95"
  },
  {
    id: "ORD-5390",
    customer: "James Wilson",
    status: "pending",
    date: "2023-06-11",
    total: "$259.00"
  },
  {
    id: "ORD-5389",
    customer: "Sarah Miller",
    status: "refunded",
    date: "2023-06-10",
    total: "$49.99"
  },
  {
    id: "ORD-5388",
    customer: "David Chen",
    status: "paid",
    date: "2023-06-10",
    total: "$124.50"
  }
]

// Status badge color mapping
const statusColorMap: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  paid: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  fulfilled: "bg-green-100 text-green-800 hover:bg-green-100",
  refunded: "bg-red-100 text-red-800 hover:bg-red-100",
  cancelled: "bg-gray-100 text-gray-800 hover:bg-gray-100",
}

export function RecentOrders() {
  return (
    <div className="bg-card rounded-lg border shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
        <Button variant="ghost" size="sm" className="text-sm">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={statusColorMap[order.status]}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}