"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { profileResult } from "@/lib/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { getProfileFromScore } from "@/lib/survey"
import { generatePortfolio } from "@/lib/portfolio"

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user.id
}

export type SaveProfileInput = {
  score: number
  goal: string
  horizon: string
  monthlyAmount: number
  answers: Record<string, string>
}

export async function saveProfile(input: SaveProfileInput) {
  const userId = await getUserId()
  const profile = getProfileFromScore(input.score)
  const portfolio = generatePortfolio(profile.key, input.monthlyAmount)

  const [row] = await db
    .insert(profileResult)
    .values({
      userId,
      riskProfile: profile.key,
      riskScore: input.score,
      goal: input.goal,
      horizon: input.horizon,
      monthlyAmount: String(input.monthlyAmount),
      answers: input.answers,
      portfolio,
    })
    .returning()

  revalidatePath("/dashboard")
  return { id: row.id }
}

export async function getLatestProfile() {
  const userId = await getUserId()
  const [row] = await db
    .select()
    .from(profileResult)
    .where(eq(profileResult.userId, userId))
    .orderBy(desc(profileResult.createdAt))
    .limit(1)
  return row ?? null
}

export async function getProfileHistory() {
  const userId = await getUserId()
  return db
    .select()
    .from(profileResult)
    .where(eq(profileResult.userId, userId))
    .orderBy(desc(profileResult.createdAt))
}

export async function deleteProfile(id: number) {
  const userId = await getUserId()
  await db.delete(profileResult).where(and(eq(profileResult.id, id), eq(profileResult.userId, userId)))
  revalidatePath("/dashboard")
}
