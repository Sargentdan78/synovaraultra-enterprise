import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

// Sample inventory data
const inventoryItems = [
  {
    id: "PRD-1001",
    name: "Wireless Earbuds Pro",
    stock: 24,
    total: 100,
    status: "good"
  },
  {
    id: "PRD-0957",
    name: "Smart Watch Elite",
    stock: 7,
    total: 50,
    status: "low"
  },
  {
    id: "PRD-0841",
    name: "Portable Bluetooth Speaker",
    stock: 0,
    total: 75,
    status: "out"
  },
  {
    id: "PRD-1205",
    name: "Ultra HD Action Camera",
    stock: 31,
    total: 40,
    status: "good"
  },
  {
    id: "PRD-0764",
    name: "Ergonomic Gaming Mouse",
    stock: 9,
    total: 60,
    status: "low"
  }
]

// Status badge color mapping
const statusColorMap: Record<string, string> = {
  good: "bg-green-100 text-green-800 hover:bg-green-100",
  low: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  out: "bg-red-100 text-red-800 hover:bg-red-100"
}

export function InventoryStatus() {
  return (
    <div className="bg-card rounded-lg border shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Inventory Status</h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.id}</p>
                  </div>
                </TableCell>
                <TableCell className="min-w-[180px]">
                  <div className="flex items-center gap-2">
                    <Progress value={(item.stock / item.total) * 100} className="h-2" />
                    <span className="text-sm whitespace-nowrap">{item.stock}/{item.total}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={statusColorMap[item.status]}
                  >
                    {item.status === "good" ? "In Stock" : item.status === "low" ? "Low Stock" : "Out of Stock"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Restock
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}