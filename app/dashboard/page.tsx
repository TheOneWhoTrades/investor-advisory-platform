import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getLatestProfile } from "@/app/actions/profile"
import { riskProfiles, goals, horizons } from "@/lib/survey"
import type { GeneratedPortfolio } from "@/lib/portfolio"
import { PortfolioView } from "@/components/portfolio-view"
import { ClipboardList } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/sign-in")

  const latest = await getLatestProfile()

  if (!latest) {
    return (
      <div className="min-h-svh bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-4 py-16">
          <Card className="flex flex-col items-center gap-4 p-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ClipboardList className="h-6 w-6" />
            </span>
            <h1 className="text-2xl font-semibold text-foreground text-balance">Todavía no tenés un perfil</h1>
            <p className="max-w-md text-muted-foreground text-pretty">
              Completá la encuesta de perfil de riesgo para generar tu primera cartera de inversión personalizada.
            </p>
            <Button asChild size="lg">
              <Link href="/encuesta">Comenzar la encuesta</Link>
            </Button>
          </Card>
        </main>
      </div>
    )
  }

  const profileMeta = riskProfiles.find((p) => p.key === latest.riskProfile) ?? riskProfiles[0]
  const goalMeta = goals.find((g) => g.value === latest.goal)
  const horizonMeta = horizons.find((h) => h.value === latest.horizon)
  const portfolio = latest.portfolio as GeneratedPortfolio

  return (
    <div className="min-h-svh bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <PortfolioView
          userName={session.user.name}
          profileMeta={profileMeta}
          score={latest.riskScore}
          goalLabel={goalMeta?.label}
          horizonLabel={horizonMeta?.label}
          portfolio={portfolio}
          createdAt={latest.createdAt as unknown as string}
        />
      </main>
    </div>
  )
}
