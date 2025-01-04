const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function callAnthropic(prompt: string) {
  try {
    const result = await fetch(`${BASE_URL}/api/anthropic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const { response, responseTime } = await result.json();
    return { text: response.content[0].text, responseTime };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
