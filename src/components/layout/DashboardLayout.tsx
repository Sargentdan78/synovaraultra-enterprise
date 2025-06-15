import { ReactNode } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile navigation */}
      {isMobile ? (
        <>
          <Header />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="fixed left-4 top-4 z-50">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <main className="pt-16 px-4 pb-16">
            {children}
          </main>
        </>
      ) : (
        // Desktop layout
        <>
          <Sidebar />
          <div className="ml-64">
            <Header />
            <main className="container py-6 px-4">
              {children}
            </main>
          </div>
        </>
      )}
    </div>
  )
}