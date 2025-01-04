const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function callGemini(prompt: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/gemini`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const { text, responseTime } = await response.json();

    return { text, responseTime };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
