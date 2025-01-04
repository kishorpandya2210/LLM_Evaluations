"use server";
import { db } from "@/db/drizzle";
import { session } from "@/db/schema";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getData = async () => {
  const data = await db.select().from(session);
  return data;
};

export const addSession = async (
  id: string,
  prompt: string,
  openAIResponse: string | null,
  openAIResponseTime: number | null,
  deepseekResponse: string | null,
  deepseekResponseTime: number | null,
  geminiResponse: string | null,
  geminiResponseTime: number | null
) => {
  await db.insert(session).values({
    id: id,
    prompt: prompt,
    openAIResponse: openAIResponse,
    openAIResponseTime: openAIResponseTime,
    deepseekResponse: deepseekResponse,
    deepseekResponseTime: deepseekResponseTime,
    geminiResponse: geminiResponse,
    geminiResponseTime: geminiResponseTime,
  });
};

export const editSession = async (
  id: string,
  openAIResponse: string | null,
  openAIResponseTime: number | null,
  deepseekResponse: string | null,
  deepseekResponseTime: number | null,
  geminiResponse: string | null,
  geminiResponseTime: number | null
) => {
  await db
    .update(session)
    .set({
      openAIResponse: openAIResponse,
      openAIResponseTime: openAIResponseTime,
      deepseekResponse: deepseekResponse,
      deepseekResponseTime: deepseekResponseTime,
      geminiResponse: geminiResponse,
      geminiResponseTime: geminiResponseTime,
    })
    .where(eq(session.id, id));

  revalidatePath("/");
};

export const getSessionById = async (id: string) => {
  const data = await db.select().from(session).where(eq(session.id, id));

  return data[0] || null;
}