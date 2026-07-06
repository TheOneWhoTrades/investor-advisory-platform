import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { SignOutButton } from "@/components/sign-out-button"

export async function SiteHeader() {
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <TrendingUp className="h-5 w-5" />
          </span>
          <span className="text-base font-semibold tracking-tight">Invertí Simple</span>
        </Link>

        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="sm" render={<Link href="/dashboard" />}>
                Mi cartera
              </Button>
              <Button variant="ghost" size="sm" render={<Link href="/encuesta" />}>
                Rehacer test
              </Button>
              <SignOutButton />
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" render={<Link href="/sign-in" />}>
                Ingresar
              </Button>
              <Button size="sm" render={<Link href="/sign-up" />}>
                Comenzar
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
