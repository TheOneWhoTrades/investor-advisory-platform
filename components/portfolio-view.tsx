"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart } from "recharts"
import type { RiskProfile } from "@/lib/survey"
import { type GeneratedPortfolio, formatARS } from "@/lib/portfolio"
import { RefreshCw, TrendingUp, Activity } from "lucide-react"

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-accent)",
]

const riesgoBadge: Record<string, string> = {
  Bajo: "bg-accent/15 text-accent border-transparent",
  Medio: "bg-chart-4/15 text-foreground border-transparent",
  Alto: "bg-destructive/15 text-destructive border-transparent",
}

export function PortfolioView({
  userName,
  profileMeta,
  score,
  goalLabel,
  horizonLabel,
  portfolio,
  createdAt,
}: {
  userName?: string | null
  profileMeta: RiskProfile
  score: number
  goalLabel?: string
  horizonLabel?: string
  portfolio: GeneratedPortfolio
  createdAt: string
}) {
  const chartData = portfolio.lines.map((line, i) => ({
    name: line.label,
    value: line.percent,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }))

  const chartConfig = Object.fromEntries(
    portfolio.lines.map((line, i) => [
      line.assetClass,
      { label: line.label, color: CHART_COLORS[i % CHART_COLORS.length] },
    ]),
  )

  const fecha = new Date(createdAt).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Encabezado */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">
            {userName ? `Hola, ${userName}. ` : ""}Tu perfil de inversor es
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{profileMeta.label}</h1>
          <p className="text-sm text-muted-foreground">Generado el {fecha}</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/encuesta">
            <RefreshCw className="mr-2 h-4 w-4" />
            Rehacer el test
          </Link>
        </Button>
      </div>

      {/* Resumen del perfil */}
      <Card className="p-6">
        <p className="text-foreground text-pretty leading-relaxed">{profileMeta.description}</p>
        <Separator className="my-5" />
        <div className="grid gap-4 sm:grid-cols-4">
          <Metric label="Puntaje de riesgo" value={String(score)} />
          <Metric
            label="Retorno esperado"
            value={portfolio.metrics.retornoEsperado}
            icon={<TrendingUp className="h-4 w-4 text-accent" />}
          />
          <Metric
            label="Volatilidad"
            value={portfolio.metrics.volatilidad}
            icon={<Activity className="h-4 w-4 text-chart-4" />}
          />
          <Metric label="Inversión mensual" value={formatARS(portfolio.monthlyAmount)} />
        </div>
        {(goalLabel || horizonLabel) && (
          <>
            <Separator className="my-5" />
            <div className="flex flex-wrap gap-2">
              {goalLabel && (
                <Badge variant="secondary" className="font-normal">
                  Objetivo: {goalLabel}
                </Badge>
              )}
              {horizonLabel && (
                <Badge variant="secondary" className="font-normal">
                  Plazo: {horizonLabel}
                </Badge>
              )}
            </div>
          </>
        )}
      </Card>

      {/* Distribución */}
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="p-6 lg:col-span-2">
          <h2 className="mb-1 text-lg font-semibold text-foreground">Distribución de la cartera</h2>
          <p className="mb-4 text-sm text-muted-foreground">Asignación estratégica por clase de activo</p>
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[260px]">
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="name" formatter={(value) => `${value}%`} />}
              />
              <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={2}>
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="mt-4 flex flex-col gap-2">
            {chartData.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-foreground">
                  <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: entry.fill }} aria-hidden />
                  {entry.name}
                </span>
                <span className="font-medium text-foreground">{entry.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Detalle por clase de activo */}
        <div className="flex flex-col gap-4 lg:col-span-3">
          {portfolio.lines.map((line) => (
            <Card key={line.assetClass} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-foreground">{line.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {line.percent}% · {formatARS(line.amount)} por mes
                  </p>
                </div>
                <Badge variant="outline" className={riesgoBadge[line.riesgo]}>
                  Riesgo {line.riesgo}
                </Badge>
              </div>
              <Separator className="my-3" />
              <ul className="flex flex-col gap-2">
                {line.instruments.map((inst) => (
                  <li key={inst.name} className="flex items-start justify-between gap-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-foreground">{inst.name}</span>
                      <span className="text-xs text-muted-foreground">{inst.detail}</span>
                    </div>
                    <div className="flex flex-col items-end whitespace-nowrap">
                      <span className="font-mono text-xs text-foreground">{inst.ejemplo}</span>
                      <span className="text-[11px] text-muted-foreground">{inst.tipo}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-pretty">
        Esta cartera es ilustrativa y fue generada con fines educativos a partir de tus respuestas. No constituye
        recomendación ni asesoramiento de inversión. Los instrumentos mencionados son ejemplos representativos de cada
        clase de activo. Consultá siempre con un agente registrado ante la CNV antes de invertir.
      </p>
    </div>
  )
}

function Metric({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1.5 text-lg font-semibold text-foreground">
        {icon}
        {value}
      </span>
    </div>
  )
}
