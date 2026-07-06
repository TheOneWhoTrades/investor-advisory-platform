// ---------------------------------------------------------------------------
// Cuestionario de perfil de riesgo
// Basado en los lineamientos de "test del inversor" recomendados por la
// Comision Nacional de Valores (CNV) de Argentina y el material educativo
// del Instituto Argentino de Mercado de Capitales (IAMC): horizonte temporal,
// tolerancia a la perdida, conocimiento del mercado, situacion financiera y
// objetivos de inversion.
// ---------------------------------------------------------------------------

export type Option = {
  value: string
  label: string
  score: number
}

export type Question = {
  id: string
  category: string
  question: string
  help?: string
  options: Option[]
}

export const questions: Question[] = [
  {
    id: "edad",
    category: "Situacion personal",
    question: "¿En que rango de edad te encontras?",
    help: "La edad influye en el horizonte disponible para recuperar eventuales perdidas.",
    options: [
      { value: "a", label: "Mas de 65 anos", score: 1 },
      { value: "b", label: "Entre 51 y 65 anos", score: 2 },
      { value: "c", label: "Entre 36 y 50 anos", score: 3 },
      { value: "d", label: "Entre 18 y 35 anos", score: 4 },
    ],
  },
  {
    id: "horizonte",
    category: "Horizonte temporal",
    question: "¿Durante cuanto tiempo pensas mantener tus inversiones sin necesitar el dinero?",
    help: "El horizonte temporal es uno de los factores mas importantes para definir el nivel de riesgo tolerable.",
    options: [
      { value: "a", label: "Menos de 1 ano", score: 1 },
      { value: "b", label: "Entre 1 y 3 anos", score: 2 },
      { value: "c", label: "Entre 3 y 5 anos", score: 3 },
      { value: "d", label: "Mas de 5 anos", score: 4 },
    ],
  },
  {
    id: "conocimiento",
    category: "Conocimiento y experiencia",
    question: "¿Como describirias tu conocimiento sobre instrumentos financieros?",
    options: [
      { value: "a", label: "Nulo: nunca inverti", score: 1 },
      { value: "b", label: "Basico: conozco plazo fijo y algo de bonos", score: 2 },
      { value: "c", label: "Intermedio: opero acciones, bonos y fondos", score: 3 },
      { value: "d", label: "Avanzado: uso derivados y estrategias complejas", score: 4 },
    ],
  },
  {
    id: "experiencia",
    category: "Conocimiento y experiencia",
    question: "¿Con que frecuencia realizas operaciones en el mercado de capitales?",
    options: [
      { value: "a", label: "Nunca", score: 1 },
      { value: "b", label: "Alguna vez al ano", score: 2 },
      { value: "c", label: "Varias veces al ano", score: 3 },
      { value: "d", label: "Mensual o semanalmente", score: 4 },
    ],
  },
  {
    id: "ingresos",
    category: "Situacion financiera",
    question: "¿Que proporcion de tus ingresos mensuales podes destinar a invertir?",
    options: [
      { value: "a", label: "Menos del 5%", score: 1 },
      { value: "b", label: "Entre 5% y 15%", score: 2 },
      { value: "c", label: "Entre 15% y 30%", score: 3 },
      { value: "d", label: "Mas del 30%", score: 4 },
    ],
  },
  {
    id: "emergencia",
    category: "Situacion financiera",
    question: "¿Contas con un fondo de emergencia (ahorros para 3-6 meses de gastos)?",
    help: "Antes de invertir en activos de riesgo es recomendable tener un colchon de liquidez.",
    options: [
      { value: "a", label: "No tengo ahorros de reserva", score: 1 },
      { value: "b", label: "Tengo para menos de 3 meses", score: 2 },
      { value: "c", label: "Tengo para 3 a 6 meses", score: 3 },
      { value: "d", label: "Tengo para mas de 6 meses", score: 4 },
    ],
  },
  {
    id: "estabilidad",
    category: "Situacion financiera",
    question: "¿Como es la estabilidad de tus ingresos?",
    options: [
      { value: "a", label: "Muy variable o incierta", score: 1 },
      { value: "b", label: "Algo variable", score: 2 },
      { value: "c", label: "Estable", score: 3 },
      { value: "d", label: "Muy estable y con proyeccion de crecimiento", score: 4 },
    ],
  },
  {
    id: "reaccion",
    category: "Tolerancia al riesgo",
    question: "Si tu inversion cayera un 20% en un mes, ¿que harias?",
    help: "Mide la reaccion emocional ante la volatilidad, clave para evitar decisiones apresuradas.",
    options: [
      { value: "a", label: "Vendo todo para no perder mas", score: 1 },
      { value: "b", label: "Vendo una parte", score: 2 },
      { value: "c", label: "Mantengo y espero la recuperacion", score: 3 },
      { value: "d", label: "Aprovecho para comprar mas barato", score: 4 },
    ],
  },
  {
    id: "preferencia",
    category: "Tolerancia al riesgo",
    question: "¿Con cual de estas opciones te sentis mas comodo?",
    options: [
      { value: "a", label: "Rendimiento bajo pero capital seguro", score: 1 },
      { value: "b", label: "Rendimiento moderado con leves oscilaciones", score: 2 },
      { value: "c", label: "Rendimiento alto asumiendo caidas ocasionales", score: 3 },
      { value: "d", label: "Maximo rendimiento aunque implique grandes vaivenes", score: 4 },
    ],
  },
  {
    id: "perdida",
    category: "Tolerancia al riesgo",
    question: "¿Cual es la maxima perdida anual que estarias dispuesto a tolerar?",
    options: [
      { value: "a", label: "No tolero perdidas", score: 1 },
      { value: "b", label: "Hasta 10%", score: 2 },
      { value: "c", label: "Hasta 25%", score: 3 },
      { value: "d", label: "Mas del 25%", score: 4 },
    ],
  },
  {
    id: "objetivo_riesgo",
    category: "Objetivos",
    question: "¿Que buscas principalmente al invertir?",
    options: [
      { value: "a", label: "Preservar el capital frente a la inflacion", score: 1 },
      { value: "b", label: "Generar ingresos periodicos", score: 2 },
      { value: "c", label: "Hacer crecer el capital en el mediano plazo", score: 3 },
      { value: "d", label: "Maximizar el crecimiento en el largo plazo", score: 4 },
    ],
  },
]

export const MAX_SCORE = questions.length * 4
export const MIN_SCORE = questions.length * 1

export type RiskProfileKey = "conservador" | "moderado" | "arriesgado" | "agresivo"

export type RiskProfile = {
  key: RiskProfileKey
  label: string
  range: [number, number]
  summary: string
  description: string
}

// Cuatro perfiles alineados a la clasificacion habitual del test del inversor.
export const riskProfiles: RiskProfile[] = [
  {
    key: "conservador",
    label: "Conservador",
    range: [0, 0.4],
    summary: "Priorizas la seguridad del capital por sobre el rendimiento.",
    description:
      "Tolerancia baja a la volatilidad. Preferis instrumentos de renta fija de corto plazo y activos que protejan frente a la inflacion, aceptando rendimientos mas modestos a cambio de estabilidad.",
  },
  {
    key: "moderado",
    label: "Moderado",
    range: [0.4, 0.6],
    summary: "Buscas un equilibrio entre seguridad y crecimiento.",
    description:
      "Aceptas cierta volatilidad para mejorar el rendimiento. Combinas renta fija con una porcion de renta variable, diversificando entre instrumentos locales y globales.",
  },
  {
    key: "arriesgado",
    label: "Arriesgado",
    range: [0.6, 0.8],
    summary: "Priorizas el crecimiento y tolerlas caidas relevantes.",
    description:
      "Tenes horizonte de largo plazo y aceptas oscilaciones importantes. Tu cartera se inclina hacia la renta variable local e internacional, con menor peso de instrumentos defensivos.",
  },
  {
    key: "agresivo",
    label: "Agresivo",
    range: [0.8, 1.01],
    summary: "Buscas maximizar el rendimiento asumiendo alta volatilidad.",
    description:
      "Alta tolerancia al riesgo y foco en el largo plazo. Concentras la cartera en renta variable y activos de mayor potencial, minimizando la porcion conservadora.",
  },
]

export function getProfileFromScore(score: number): RiskProfile {
  const normalized = (score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)
  const profile = riskProfiles.find((p) => normalized >= p.range[0] && normalized < p.range[1])
  return profile ?? riskProfiles[0]
}

// ---------------------------------------------------------------------------
// Objetivos de inversion (paso independiente del scoring de riesgo)
// ---------------------------------------------------------------------------
export type Goal = {
  value: string
  label: string
  description: string
}

export const goals: Goal[] = [
  {
    value: "proteger",
    label: "Proteger mis ahorros de la inflacion",
    description: "Mantener el poder adquisitivo del dinero en el tiempo.",
  },
  {
    value: "ingresos",
    label: "Generar ingresos periodicos",
    description: "Obtener flujos de renta (cupones, dividendos) de forma regular.",
  },
  {
    value: "crecer",
    label: "Hacer crecer mi capital",
    description: "Aumentar el patrimonio en el mediano y largo plazo.",
  },
  {
    value: "meta",
    label: "Ahorrar para una meta concreta",
    description: "Juntar dinero para un objetivo puntual (auto, casa, viaje, estudios).",
  },
  {
    value: "retiro",
    label: "Planificar mi retiro",
    description: "Construir un capital para complementar la jubilacion.",
  },
]

export const horizons: Goal[] = [
  { value: "corto", label: "Corto plazo (menos de 1 ano)", description: "Necesito el dinero pronto." },
  { value: "medio", label: "Mediano plazo (1 a 3 anos)", description: "Puedo esperar algunos anos." },
  { value: "largo", label: "Largo plazo (3 a 10 anos)", description: "Invierto pensando en el futuro." },
  { value: "muylargo", label: "Muy largo plazo (mas de 10 anos)", description: "Horizonte generacional o de retiro." },
]
