"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { questions, goals, horizons } from "@/lib/survey"
import { saveProfile } from "@/app/actions/profile"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"

// Pasos = preguntas de riesgo + objetivo + horizonte + monto
const EXTRA_STEPS = 3

export function SurveyWizard() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [goal, setGoal] = useState("")
  const [horizon, setHorizon] = useState("")
  const [monthlyAmount, setMonthlyAmount] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalSteps = questions.length + EXTRA_STEPS
  const progress = Math.round((step / totalSteps) * 100)

  const isRiskStep = step < questions.length
  const currentQuestion = isRiskStep ? questions[step] : null

  const goalStep = questions.length
  const horizonStep = questions.length + 1
  const amountStep = questions.length + 2

  const canContinue = useMemo(() => {
    if (isRiskStep) return Boolean(answers[currentQuestion!.id])
    if (step === goalStep) return Boolean(goal)
    if (step === horizonStep) return Boolean(horizon)
    if (step === amountStep) return Number(monthlyAmount) > 0
    return false
  }, [isRiskStep, answers, currentQuestion, step, goalStep, goal, horizonStep, horizon, amountStep, monthlyAmount])

  const handleNext = async () => {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1)
      return
    }
    // Último paso: calcular puntaje y guardar
    setSubmitting(true)
    setError(null)
    const score = questions.reduce((sum, q) => {
      const selected = q.options.find((o) => o.value === answers[q.id])
      return sum + (selected?.score ?? 0)
    }, 0)

    try {
      await saveProfile({
        score,
        goal,
        horizon,
        monthlyAmount: Number(monthlyAmount),
        answers,
      })
      router.push("/dashboard")
      router.refresh()
    } catch (e) {
      setSubmitting(false)
      setError("No pudimos guardar tu perfil. Verificá que hayas iniciado sesión e intentá nuevamente.")
    }
  }

  const handleBack = () => setStep((s) => Math.max(0, s - 1))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Paso {step + 1} de {totalSteps}
          </span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>

      <Card className="p-6">
        {isRiskStep && currentQuestion && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-accent">
                {currentQuestion.category}
              </span>
              <h2 className="text-xl font-semibold text-foreground text-balance">{currentQuestion.question}</h2>
              {currentQuestion.help && (
                <p className="text-sm text-muted-foreground text-pretty">{currentQuestion.help}</p>
              )}
            </div>

            <RadioGroup
              value={answers[currentQuestion.id] ?? ""}
              onValueChange={(v) => setAnswers((a) => ({ ...a, [currentQuestion.id]: v }))}
              className="flex flex-col gap-3"
            >
              {currentQuestion.options.map((opt) => {
                const active = answers[currentQuestion.id] === opt.value
                return (
                  <Label
                    key={opt.value}
                    htmlFor={`${currentQuestion.id}-${opt.value}`}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                      active ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/60"
                    }`}
                  >
                    <RadioGroupItem id={`${currentQuestion.id}-${opt.value}`} value={opt.value} />
                    <span className="text-sm font-normal text-foreground">{opt.label}</span>
                  </Label>
                )
              })}
            </RadioGroup>
          </div>
        )}

        {step === goalStep && (
          <StepChoice
            title="¿Cuál es tu principal objetivo de inversión?"
            help="Elegí la opción que mejor represente lo que buscás."
            options={goals.map((g) => ({ value: g.value, label: g.label, description: g.description }))}
            value={goal}
            onChange={setGoal}
          />
        )}

        {step === horizonStep && (
          <StepChoice
            title="¿En qué plazo pensás usar el dinero?"
            help="El horizonte temporal ayuda a definir cuánto riesgo podés asumir."
            options={horizons.map((h) => ({ value: h.value, label: h.label, description: h.description }))}
            value={horizon}
            onChange={setHorizon}
          />
        )}

        {step === amountStep && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-accent">Monto a invertir</span>
              <h2 className="text-xl font-semibold text-foreground text-balance">
                ¿Cuánto pensás invertir por mes?
              </h2>
              <p className="text-sm text-muted-foreground text-pretty">
                Usamos este monto (en pesos) para distribuir tu cartera de ejemplo entre las distintas clases de activos.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="monto">Monto mensual (ARS)</Label>
              <Input
                id="monto"
                type="number"
                min={0}
                inputMode="numeric"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(e.target.value)}
                placeholder="Ej: 100000"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {[50000, 100000, 250000, 500000].map((preset) => (
                  <Button
                    key={preset}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setMonthlyAmount(String(preset))}
                  >
                    {new Intl.NumberFormat("es-AR").format(preset)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <Button type="button" variant="ghost" onClick={handleBack} disabled={step === 0 || submitting}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Atrás
          </Button>
          <Button type="button" onClick={handleNext} disabled={!canContinue || submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Generando cartera...
              </>
            ) : step === totalSteps - 1 ? (
              "Ver mi cartera"
            ) : (
              <>
                Siguiente
                <ArrowRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}

function StepChoice({
  title,
  help,
  options,
  value,
  onChange,
}: {
  title: string
  help: string
  options: { value: string; label: string; description: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-foreground text-balance">{title}</h2>
        <p className="text-sm text-muted-foreground text-pretty">{help}</p>
      </div>
      <RadioGroup value={value} onValueChange={onChange} className="flex flex-col gap-3">
        {options.map((opt) => {
          const active = value === opt.value
          return (
            <Label
              key={opt.value}
              htmlFor={`choice-${opt.value}`}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                active ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/60"
              }`}
            >
              <RadioGroupItem id={`choice-${opt.value}`} value={opt.value} className="mt-0.5" />
              <span className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{opt.label}</span>
                <span className="text-xs text-muted-foreground">{opt.description}</span>
              </span>
            </Label>
          )
        })}
      </RadioGroup>
    </div>
  )
}
