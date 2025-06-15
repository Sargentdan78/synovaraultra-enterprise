import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chart } from "@/components/ui/chart"

export function SalesChart() {
  const dailySalesOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
      },
    },
    colors: ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          colors: 'hsl(var(--muted-foreground))',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `$${value}`,
        style: {
          colors: 'hsl(var(--muted-foreground))',
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy',
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: 'hsl(var(--foreground))',
      },
    },
  }

  const dailySalesSeries = [
    {
      name: 'Revenue',
      data: [2400, 1900, 3200, 2800, 1800, 4100, 3600],
    },
    {
      name: 'Orders',
      data: [1200, 800, 1600, 1400, 900, 1800, 1500],
    },
  ]

  const weeklySalesSeries = [
    {
      name: 'Revenue',
      data: [12500, 17800, 14300, 19200, 15600, 18900, 21500, 22800],
    },
    {
      name: 'Orders',
      data: [5200, 7300, 6100, 8100, 6500, 7800, 9200, 9800],
    },
  ]

  const monthlySalesSeries = [
    {
      name: 'Revenue',
      data: [35000, 62000, 45000, 55000, 70000, 83000, 98000, 75000, 110000, 120000, 105000, 130000],
    },
    {
      name: 'Orders',
      data: [15000, 26000, 18000, 23000, 30000, 35000, 42000, 32000, 48000, 51000, 45000, 55000],
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Track revenue and orders over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            <Chart 
              height={300}
              options={dailySalesOptions}
              series={dailySalesSeries}
              type="area"
            />
          </TabsContent>
          <TabsContent value="weekly">
            <Chart 
              height={300}
              options={{
                ...dailySalesOptions,
                xaxis: {
                  ...dailySalesOptions.xaxis,
                  categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
                }
              }}
              series={weeklySalesSeries}
              type="area"
            />
          </TabsContent>
          <TabsContent value="monthly">
            <Chart 
              height={300}
              options={{
                ...dailySalesOptions,
                xaxis: {
                  ...dailySalesOptions.xaxis,
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                }
              }}
              series={monthlySalesSeries}
              type="area"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}