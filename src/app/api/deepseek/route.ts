import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
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
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "deepseek-chat",
      temperature: 0.0,
      max_tokens: 8192,
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(
      "DeepSeekV3 Response Time:",
      new Date(startTime).toISOString(),
      responseTime
    );

    return NextResponse.json({
      message: response.choices[0].message,
      responseTime,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Interval server error" },
      { status: 500 }
    );
  }
}
