import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "A prompt is required." },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      system: "You are a helpful assistant.",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.0,
      max_tokens: 4196,
    });
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(
      "Anthropic Response Time:",
      new Date(startTime).toISOString(),
      responseTime
    );

    return NextResponse.json({
      response,
      responseTime,
    });
  } catch (error) {
    console.error("Anthropic API error:", error);
    return NextResponse.json(
      { error: "Interval server error" },
      { status: 500 }
    );
  }
}
