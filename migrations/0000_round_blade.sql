CREATE TABLE "session" (
	"id" uuid PRIMARY KEY NOT NULL,
	"prompt" text NOT NULL,
	"openAIResponse" text,
	"openAIResponseTime" integer,
	"deepseekResponse" text,
	"deepseekResponseTime" integer,
	"geminiResponse" text,
	"geminiResponseTime" integer
);
--> statement-breakpoint
CREATE TABLE "todo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"text" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL
);
