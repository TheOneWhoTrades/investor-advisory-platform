import type { RiskProfileKey } from "./survey"

// ---------------------------------------------------------------------------
// Clases de activos e instrumentos (mercado argentino + exposicion global)
// Los valores son ilustrativos y con fines educativos. No constituyen
// recomendacion de inversion.
// ---------------------------------------------------------------------------

export type AssetClassKey =
  | "liquidez"
  | "rentaFijaLocal"
  | "rentaFijaHard"
  | "rentaVariableLocal"
  | "rentaVariableGlobal"
  | "alternativos"

export type Instrument = {
  name: string
  detail: string
  ejemplo: string
  tipo: "Local" | "Global"
}

export type AssetClass = {
  key: AssetClassKey
  label: string
  description: string
  riesgo: "Bajo" | "Medio" | "Alto"
  instruments: Instrument[]
}

export const assetClasses: Record<AssetClassKey, AssetClass> = {
  liquidez: {
    key: "liquidez",
    label: "Liquidez y corto plazo",
    description: "Instrumentos de bajo riesgo y alta disponibilidad para el fondo de reserva.",
    riesgo: "Bajo",
    instruments: [
      { name: "Plazo fijo / FCI money market", detail: "Renta en pesos, liquidez inmediata", ejemplo: "FCI T+0", tipo: "Local" },
      { name: "Cauciones colocadoras", detail: "Prestamo garantizado de muy corto plazo", ejemplo: "Caucion 7 dias", tipo: "Local" },
    ],
  },
  rentaFijaLocal: {
    key: "rentaFijaLocal",
    label: "Renta fija local",
    description: "Bonos y letras que ajustan por inflacion (CER) o tasa, para proteger el capital en pesos.",
    riesgo: "Medio",
    instruments: [
      { name: "Bonos CER", detail: "Ajustan por inflacion (indice CER)", ejemplo: "TX26", tipo: "Local" },
      { name: "Letras del Tesoro", detail: "Deuda de corto plazo en pesos", ejemplo: "LECAP", tipo: "Local" },
      { name: "Obligaciones negociables", detail: "Deuda corporativa, muchas en dolares", ejemplo: "ON Pampa", tipo: "Local" },
    ],
  },
  rentaFijaHard: {
    key: "rentaFijaHard",
    label: "Renta fija en dolares",
    description: "Bonos soberanos y corporativos en moneda dura para dolarizar parte de la cartera.",
    riesgo: "Medio",
    instruments: [
      { name: "Bonos soberanos USD", detail: "Deuda argentina en dolares", ejemplo: "GD30 / AL30", tipo: "Local" },
      { name: "ON hard dollar", detail: "Deuda corporativa en dolares", ejemplo: "ON YPF 2029", tipo: "Local" },
    ],
  },
  rentaVariableLocal: {
    key: "rentaVariableLocal",
    label: "Renta variable local",
    description: "Acciones de empresas argentinas que cotizan en el panel lider (Merval).",
    riesgo: "Alto",
    instruments: [
      { name: "Acciones lideres", detail: "Panel Merval", ejemplo: "GGAL, YPF, PAMP", tipo: "Local" },
      { name: "FCI de acciones argentinas", detail: "Cartera diversificada de acciones locales", ejemplo: "FCI Renta Variable", tipo: "Local" },
    ],
  },
  rentaVariableGlobal: {
    key: "rentaVariableGlobal",
    label: "Renta variable global",
    description: "Exposicion a empresas e indices del exterior a traves de Cedears.",
    riesgo: "Alto",
    instruments: [
      { name: "Cedears de indices", detail: "Replican indices globales", ejemplo: "SPY (S&P 500), QQQ", tipo: "Global" },
      { name: "Cedears de acciones", detail: "Empresas globales en pesos", ejemplo: "AAPL, MSFT, KO", tipo: "Global" },
    ],
  },
  alternativos: {
    key: "alternativos",
    label: "Activos alternativos",
    description: "Pequena porcion satelite de mayor riesgo y potencial de crecimiento.",
    riesgo: "Alto",
    instruments: [
      { name: "Cedears de mercados emergentes / tematicos", detail: "Sectores de alto crecimiento", ejemplo: "ARKK, EEM", tipo: "Global" },
      { name: "Criptoactivos (opcional)", detail: "Alta volatilidad, exposicion minima", ejemplo: "BTC, ETH", tipo: "Global" },
    ],
  },
}

export type Allocation = {
  assetClass: AssetClassKey
  percent: number
}

// Asignacion estrategica por perfil de riesgo (suma 100%).
export const allocationsByProfile: Record<RiskProfileKey, Allocation[]> = {
  conservador: [
    { assetClass: "liquidez", percent: 25 },
    { assetClass: "rentaFijaLocal", percent: 40 },
    { assetClass: "rentaFijaHard", percent: 20 },
    { assetClass: "rentaVariableLocal", percent: 5 },
    { assetClass: "rentaVariableGlobal", percent: 10 },
    { assetClass: "alternativos", percent: 0 },
  ],
  moderado: [
    { assetClass: "liquidez", percent: 15 },
    { assetClass: "rentaFijaLocal", percent: 30 },
    { assetClass: "rentaFijaHard", percent: 15 },
    { assetClass: "rentaVariableLocal", percent: 15 },
    { assetClass: "rentaVariableGlobal", percent: 20 },
    { assetClass: "alternativos", percent: 5 },
  ],
  arriesgado: [
    { assetClass: "liquidez", percent: 10 },
    { assetClass: "rentaFijaLocal", percent: 15 },
    { assetClass: "rentaFijaHard", percent: 15 },
    { assetClass: "rentaVariableLocal", percent: 25 },
    { assetClass: "rentaVariableGlobal", percent: 27 },
    { assetClass: "alternativos", percent: 8 },
  ],
  agresivo: [
    { assetClass: "liquidez", percent: 5 },
    { assetClass: "rentaFijaLocal", percent: 5 },
    { assetClass: "rentaFijaHard", percent: 10 },
    { assetClass: "rentaVariableLocal", percent: 30 },
    { assetClass: "rentaVariableGlobal", percent: 35 },
    { assetClass: "alternativos", percent: 15 },
  ],
}

// Rendimiento esperado y volatilidad ilustrativos (anualizados, en terminos reales).
export const profileMetrics: Record<RiskProfileKey, { retornoEsperado: string; volatilidad: string }> = {
  conservador: { retornoEsperado: "3% - 6%", volatilidad: "Baja" },
  moderado: { retornoEsperado: "6% - 10%", volatilidad: "Media" },
  arriesgado: { retornoEsperado: "10% - 15%", volatilidad: "Alta" },
  agresivo: { retornoEsperado: "15%+", volatilidad: "Muy alta" },
}

export type PortfolioLine = {
  assetClass: AssetClassKey
  label: string
  percent: number
  amount: number
  riesgo: AssetClass["riesgo"]
  instruments: Instrument[]
}

export type GeneratedPortfolio = {
  profile: RiskProfileKey
  monthlyAmount: number
  lines: PortfolioLine[]
  metrics: { retornoEsperado: string; volatilidad: string }
}

export function generatePortfolio(profile: RiskProfileKey, monthlyAmount: number): GeneratedPortfolio {
  const allocation = allocationsByProfile[profile]
  const lines: PortfolioLine[] = allocation
    .filter((a) => a.percent > 0)
    .map((a) => {
      const cls = assetClasses[a.assetClass]
      return {
        assetClass: a.assetClass,
        label: cls.label,
        percent: a.percent,
        amount: Math.round((monthlyAmount * a.percent) / 100),
        riesgo: cls.riesgo,
        instruments: cls.instruments,
      }
    })
  return {
    profile,
    monthlyAmount,
    lines,
    metrics: profileMetrics[profile],
  }
}

export function formatARS(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value)
}
