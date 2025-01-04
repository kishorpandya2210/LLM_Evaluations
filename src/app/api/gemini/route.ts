import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const gemini = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

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
    const result = await gemini.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 4196,
        temperature: 0.0,
      },
    });
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(
      "Gemini Response Time:",
      new Date(startTime).toISOString(),
      responseTime
    );

    return NextResponse.json({ text: result.response.text(), responseTime });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Interval server error" },
      { status: 500 }
    );
  }
}
