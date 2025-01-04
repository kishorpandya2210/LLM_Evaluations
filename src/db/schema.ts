import { uuid, integer, text, boolean, pgTable } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: uuid("id").defaultRandom().primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});

export const session = pgTable("session", {
  // id: uuid("id").defaultRandom().primaryKey(),
  id: uuid("id").primaryKey(),
  prompt: text("prompt").notNull(),
  openAIResponse: text("openAIResponse"),
  openAIResponseTime: integer("openAIResponseTime"),
  deepseekResponse: text("deepseekResponse"),
  deepseekResponseTime: integer("deepseekResponseTime"),
  geminiResponse: text("geminiResponse"),
  geminiResponseTime: integer("geminiResponseTime"),
});
