import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  AreaChart,
  Box,
  CircleUser,
  Cog,
  FileText,
  Grid3x3,
  Home,
  LayoutDashboard,
  LifeBuoy,
  Package,
  PackageCheck,
  Truck,
  Users,
  Brain,
  Database,
  PenTool,
  Sparkles
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
  highlight?: boolean
}

function NavItem({ href, icon, label, isActive, highlight }: NavItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "nav-link text-sidebar-foreground",
        isActive && "active",
        highlight && "relative"
      )}
    >
      {icon}
      <span>{label}</span>
      {highlight && (
        <span className="absolute right-2 top-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
      )}
    </Link>
  )
}

export function Sidebar() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-4 flex items-center gap-2 h-16">
        <Package className="h-6 w-6 text-sidebar-primary" />
        <h1 className="text-lg font-bold">E-commerce Hub</h1>
      </div>

      <Separator className="bg-sidebar-border" />

      <div className="flex flex-col gap-1 p-2">
        <NavItem
          href="/"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          isActive={pathname === "/"}
        />
        <NavItem
          href="/products"
          icon={<Box size={18} />}
          label="Products"
          isActive={pathname.startsWith("/products")}
        />
        <NavItem
          href="/orders"
          icon={<PackageCheck size={18} />}
          label="Orders"
          isActive={pathname.startsWith("/orders")}
        />
        <NavItem
          href="/customers"
          icon={<Users size={18} />}
          label="Customers"
          isActive={pathname.startsWith("/customers")}
        />
        <NavItem
          href="/inventory"
          icon={<Grid3x3 size={18} />}
          label="Inventory"
          isActive={pathname.startsWith("/inventory")}
        />
        <NavItem
          href="/suppliers"
          icon={<Truck size={18} />}
          label="Suppliers"
          isActive={pathname.startsWith("/suppliers")}
        />
        <NavItem
          href="/analytics"
          icon={<AreaChart size={18} />}
          label="Analytics"
          isActive={pathname.startsWith("/analytics")}
        />
        <NavItem
          href="/marketing"
          icon={<FileText size={18} />}
          label="Marketing"
          isActive={pathname.startsWith("/marketing")}
        />

        <div className="mt-2 mb-1 px-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase text-sidebar-foreground/50">
              AI AUTOMATION
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Sparkles size={12} className="text-primary cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="w-80">
                <p className="text-sm">
                  AI-powered autonomous features that run 24/7 to manage and optimize your store operations.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <NavItem
          href="/ai-monitoring"
          icon={<Brain size={18} />}
          label="AI Monitor"
          isActive={pathname.startsWith("/ai-monitoring")}
          highlight={true}
        />
        <NavItem
          href="/product-importer"
          icon={<Database size={18} />}
          label="Product Importer"
          isActive={pathname.startsWith("/product-importer")}
        />
        <NavItem
          href="/content-generator"
          icon={<PenTool size={18} />}
          label="Content Generator"
          isActive={pathname.startsWith("/content-generator")}
        />
      </div>

      <Separator className="mt-auto bg-sidebar-border" />
      
      <div className="p-2">
        <NavItem
          href="/account"
          icon={<CircleUser size={18} />}
          label="Account"
          isActive={pathname.startsWith("/account")}
        />
        <NavItem
          href="/settings"
          icon={<Cog size={18} />}
          label="Settings"
          isActive={pathname.startsWith("/settings")}
        />
        <NavItem
          href="/support"
          icon={<LifeBuoy size={18} />}
          label="Support"
          isActive={pathname.startsWith("/support")}
        />
      </div>
    </aside>
  )
}