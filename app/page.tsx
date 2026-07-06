import Link from "next/link"
import Image from "next/image"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ClipboardList, Target, PieChart, ShieldCheck, TrendingUp, GraduationCap } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "1. Respondé la encuesta",
    text: "Un test del inversor basado en los lineamientos de CNV Argentina y el material del IAMC: horizonte, tolerancia al riesgo, conocimiento y situación financiera.",
  },
  {
    icon: Target,
    title: "2. Definí tus objetivos",
    text: "Contanos qué buscás (proteger tus ahorros, generar ingresos, hacer crecer tu capital) y en qué plazo.",
  },
  {
    icon: PieChart,
    title: "3. Recibí tu cartera",
    text: "Generamos una cartera ficticia diversificada, ajustada a tu perfil, con instrumentos argentinos y globales.",
  },
]

const features = [
  {
    icon: ShieldCheck,
    title: "Perfil de riesgo serio",
    text: "Metodología alineada al test del inversor recomendado por la CNV y el IAMC.",
  },
  {
    icon: TrendingUp,
    title: "Instrumentos reales",
    text: "Bonos CER, plazos fijos, ON, acciones del Merval, Cedears de índices y acciones globales.",
  },
  {
    icon: GraduationCap,
    title: "100% educativo",
    text: "Pensado para aprender cómo se arma una cartera. Sin dinero real ni riesgo.",
  },
]

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() })
  const ctaHref = session?.user ? "/encuesta" : "/sign-up"

  return (
    <div className="min-h-svh bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              Test del inversor · CNV Argentina · IAMC
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground text-balance md:text-5xl">
              Descubrí tu perfil de inversor y armá tu primera cartera
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Una plataforma pensada para inversores principiantes. Conocé tu tolerancia al riesgo, definí tus objetivos
              y obtené una cartera ficticia a tu medida, con instrumentos locales y globales.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" render={<Link href={ctaHref} />}>
                Comenzar el test gratis
              </Button>
              <Button size="lg" variant="outline" render={<Link href="#como-funciona" />}>
                Cómo funciona
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-pretty">
              Herramienta educativa. No constituye recomendación ni asesoramiento de inversión.
            </p>
          </div>

          <div className="relative">
            <Card className="overflow-hidden p-0">
              <Image
                src="/hero-inversiones.png"
                alt="Ilustración de un tablero de inversiones con gráficos de rendimiento y distribución de cartera"
                width={720}
                height={720}
                className="h-auto w-full"
                priority
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">Cómo funciona</h2>
            <p className="mt-3 text-muted-foreground text-pretty">
              En tres pasos simples pasás de no saber por dónde empezar a tener una cartera diversificada de ejemplo.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <Card key={step.title} className="p-6">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <step.icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{step.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">
            ¿Listo para conocer tu perfil de inversor?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-pretty">
            Creá tu cuenta gratis y obtené tu cartera ficticia personalizada en pocos minutos.
          </p>
          <Button size="lg" className="mt-6" render={<Link href={ctaHref} />}>
            Empezar ahora
          </Button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-muted-foreground text-pretty">
          <p>
            Invertí Simple · Proyecto educativo de Fintech y Negocios Digitales. La información y las carteras generadas
            son ilustrativas y no constituyen asesoramiento financiero.
          </p>
        </div>
      </footer>
    </div>
  )
}
