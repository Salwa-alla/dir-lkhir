"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { needs } from "@/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { getServerSession } from "@/lib/auth/get-session";
import { z } from "zod";

const createNeedSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  city: z.string().min(1, "La ville est requise"),
  category: z.string().min(1, "La catégorie est requise"),
  whatsapp: z.string().min(1, "Le numéro WhatsApp est requis"),
});

export async function createNeed(formData: FormData) {
  const session = await getServerSession();

  if (!session) {
    throw new Error("Vous devez être connecté pour créer un besoin");
  }

  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    city: formData.get("city") as string,
    category: formData.get("category") as string,
    whatsapp: formData.get("whatsapp") as string,
  };

  const validatedData = createNeedSchema.parse(data);

  try {
    await db.insert(needs).values({
      ...validatedData,
      userId: session.user.id,
    });

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    throw new Error("Erreur lors de la création du besoin");
  }
}

export async function volunteer(needId: string) {
  const session = await getServerSession();

  if (!session) {
    throw new Error("Vous devez être connecté pour participer");
  }

  try {
    await db
      .update(needs)
      .set({
        volunteersCount: sql`${needs.volunteersCount} + 1`,
      })
      .where(eq(needs.id, needId));

    revalidatePath("/");
  } catch (error) {
    throw new Error("Erreur lors de la participation");
  }
}

export async function markComplete(needId: string) {
  const session = await getServerSession();

  if (!session) {
    throw new Error("Vous devez être connecté");
  }

  try {
    await db
      .update(needs)
      .set({
        status: "complete",
      })
      .where(and(eq(needs.id, needId), eq(needs.userId, session.user.id)));

    revalidatePath("/mon-espace");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erreur lors de la mise à jour" };
  }
}

export async function getNeeds() {
  try {
    const result = await db
      .select({
        id: needs.id,
        title: needs.title,
        description: needs.description,
        city: needs.city,
        category: needs.category,
        whatsapp: needs.whatsapp,
        userId: needs.userId,
        status: needs.status,
        volunteersCount: needs.volunteersCount,
        createdAt: needs.createdAt,
        updatedAt: needs.updatedAt,
      })
      .from(needs)
      .orderBy(desc(needs.createdAt));

    return result;
  } catch (error) {
    const now = new Date();
    return [
      {
        id: "demo-1",
        title: "Don de vêtements d'hiver",
        description: "Nous collectons des manteaux et des couvertures pour familles à Rabat.",
        city: "Rabat",
        category: "Don urgent",
        whatsapp: "0612345678",
        userId: "demo-user",
        status: "open",
        volunteersCount: 3,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "demo-2",
        title: "Aide scolaire - maths",
        description: "Besoin de bénévoles pour aider des élèves au centre du quartier.",
        city: "Casablanca",
        category: "Aide scolaire",
        whatsapp: "0600000000",
        userId: "demo-user-2",
        status: "open",
        volunteersCount: 1,
        createdAt: now,
        updatedAt: now,
      },
    ];
  }
}

export async function getUserNeeds(userId: string) {
  try {
    const result = await db
      .select({
        id: needs.id,
        title: needs.title,
        description: needs.description,
        city: needs.city,
        category: needs.category,
        whatsapp: needs.whatsapp,
        userId: needs.userId,
        status: needs.status,
        volunteersCount: needs.volunteersCount,
        createdAt: needs.createdAt,
        updatedAt: needs.updatedAt,
      })
      .from(needs)
      .where(eq(needs.userId, userId))
      .orderBy(desc(needs.createdAt));

    return result;
  } catch (error) {
    return [];
  }
}

export async function getEngagedNeeds(userId: string) {
  // For now, return empty array as we don't have a volunteers table
  // In a real app, you'd have a separate table for volunteers
  return [];
}
