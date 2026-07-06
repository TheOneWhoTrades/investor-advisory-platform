"use client"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <Button variant="outline" size="sm" onClick={handleSignOut}>
      Salir
    </Button>
  )
}
