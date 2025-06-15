import React from 'react';

interface ChartProps {
  type?: string;
  height?: number;
  options?: any;
  series?: any[];
  width?: string | number;
}

export function Chart({ 
  height = 350, 
  width = '100%',
  type = 'line',
  options = {},
  series = []
}: ChartProps) {
  return (
    <div style={{ height, width }} className="chart-container">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium">
            {options?.chart?.title?.text || 'Chart'}
          </div>
          {options.legend?.position === 'top' && (
            <div className="flex gap-4">
              {series.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: 
                        options.colors?.[index] || 
                        `hsl(var(--chart-${(index % 5) + 1}))`
                    }}
                  ></div>
                  <span className="text-xs">{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex-1 relative">
          {/* Simplified mock chart - in a real app, this would be an actual chart library */}
          <div className="absolute inset-0 flex items-end">
            {series[0]?.data.map((value: number, index: number) => {
              const max = Math.max(...series[0].data);
              const height = (value / max) * 90;
              
              return (
                <div 
                  key={index} 
                  className="flex-1 mx-1 rounded-t overflow-hidden relative group"
                  style={{ height: `${height}%` }}
                >
                  <div 
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{ 
                      backgroundColor: options.colors?.[0] || 'hsl(var(--chart-1))' 
                    }}
                  ></div>
                  <div className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded shadow-sm">
                    {value}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1 pt-4 border-t border-border">
            {options.xaxis?.categories?.map((cat: string, index: number) => (
              <div key={index} className="text-[10px] text-muted-foreground">
                {cat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}