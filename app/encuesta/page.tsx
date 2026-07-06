import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SurveyWizard } from "@/components/survey-wizard"

export default async function EncuestaPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/sign-in")

  return (
    <div className="min-h-svh bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <SurveyWizard />
      </main>
    </div>
  )
}
