"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isSignUp = mode === "sign-up"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = isSignUp
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password })

    setLoading(false)

    if (error) {
      setError(traducirError(error.message ?? ""))
      return
    }

    router.push("/encuesta")
    router.refresh()
  }

  return (
    <main className="min-h-svh bg-background flex flex-col items-center justify-center px-4 py-10">
      <Link href="/" className="flex items-center gap-2 mb-8 text-foreground">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <TrendingUp className="h-5 w-5" />
        </span>
        <span className="text-lg font-semibold tracking-tight">Invertí Simple</span>
      </Link>

      <Card className="w-full max-w-sm p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
            {isSignUp ? "Creá tu cuenta" : "Bienvenido de nuevo"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1 text-pretty">
            {isSignUp
              ? "Registrate para conocer tu perfil de inversor."
              : "Ingresá para ver tu perfil y tu cartera."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignUp && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Tu nombre"
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="tu@email.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              placeholder="Mínimo 8 caracteres"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Aguardá un momento..." : isSignUp ? "Crear cuenta" : "Ingresar"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          {isSignUp ? "¿Ya tenés una cuenta? " : "¿No tenés una cuenta? "}
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            {isSignUp ? "Ingresá" : "Registrate"}
          </Link>
        </p>
      </Card>

      <p className="text-xs text-muted-foreground text-center mt-6 max-w-sm text-pretty">
        Herramienta educativa. No constituye recomendación ni asesoramiento de inversión.
      </p>
    </main>
  )
}

function traducirError(message: string): string {
  const m = message.toLowerCase()
  if (m.includes("invalid") && m.includes("password")) return "Correo o contraseña incorrectos."
  if (m.includes("already") || m.includes("exists")) return "Ya existe una cuenta con ese correo."
  if (m.includes("password")) return "La contraseña debe tener al menos 8 caracteres."
  if (m.includes("email")) return "Ingresá un correo electrónico válido."
  return message || "Ocurrió un error. Intentá nuevamente."
}
