export type SessionType = {
  id: string;
  prompt: string;
  openAIResponse?: string | null;
  openAIResponseTime?: number | null;
  deepseekResponse?: string | null;
  deepseekResponseTime?: number | null;
  geminiResponse?: string | null;
  geminiResponseTime?: number | null;
};
