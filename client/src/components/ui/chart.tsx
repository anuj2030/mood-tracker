"use client"

import * as React from "react"
import { createContext, forwardRef, useContext, useMemo } from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

const chartTheme = {
  chart1: "var(--chart-1, hsl(var(--primary)))",
  chart2: "var(--chart-2, green)",
  chart3: "var(--chart-3, blue)",
  chart4: "var(--chart-4, red)",
}

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContextProps {
  config: ChartConfig
}

const ChartContext = createContext<ChartContextProps | null>(null)

export const useChartContext = () => {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error("useChartContext must be used within a ChartContainer")
  }
  return context
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, className, children, ...props }, ref) => {
    // Apply chart colors as CSS variables
    const style = useMemo(() => {
      return Object.fromEntries(Object.entries(config).map(([key, value]) => [`--color-${key}`, value.color]))
    }, [config])

    return (
      <ChartContext.Provider value={{ config }}>
        <div ref={ref} className={className} style={style} {...props}>
          {children}
        </div>
      </ChartContext.Provider>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => (config as any).theme || config.color)

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = (itemConfig as any).theme?.[theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  )
}

export const ChartTooltip = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className="rounded-lg border bg-background px-3 py-1.5 text-sm shadow-md" {...props}>
        {children}
      </div>
    )
  },
)
ChartTooltip.displayName = "ChartTooltip"

export const ChartTooltipContent = ({ active, payload }: any) => {
  const { config } = useChartContext()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <ChartTooltip>
      <div className="grid gap-2">
        {payload.map((item: any) => {
          const dataKey = item.dataKey
          const configItem = config[dataKey]
          if (!configItem) return null
          return (
            <div key={dataKey} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full" style={{ background: configItem.color }} />
                <span>{configItem.label}</span>
              </div>
              <span className="font-medium">{item.value}</span>
            </div>
          )
        })}
      </div>
    </ChartTooltip>
  )
}

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChartContext()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`
        const itemConfig = config[key as keyof typeof config]

        return (
          <div
            key={item.value}
            className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}
          >
            {(itemConfig as any)?.icon && !hideIcon ? (
              (itemConfig as any).icon
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {(itemConfig as any)?.label}
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config]
}

export { ChartLegend, ChartLegendContent, ChartStyle }
