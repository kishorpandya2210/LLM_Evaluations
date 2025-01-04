"use client";

import { useState } from "react";
import PromptArea from "@/components/ui/PromptArea";
import ResponseArea from "@/components/ui/ResponseArea";
import SubmitButton from "@/components/ui/SubmitButton";
import callOpenAI from "./actions/openai";
import callGemini from "./actions/gemini";
import callDeepSeek from "./actions/deepseek";
import { useEffect } from "react";
import { useSessions } from "@/context/SessionContext";
import { useSessionStore } from "@/store/session-store";

export default function Home() {
  const selectedSession = useSessionStore((state) => state.selectedSession);
  const { sessions, loading, addSession, updateSession } = useSessions();
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [openAIResponse, setOpenAIResponse] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");
  const [deepseekResponse, setDeepseekResponse] = useState("");
  const [isLoadingOpenAI, setIsLoadingOpenAI] = useState(false);
  const [isLoadingGemini, setIsLoadingGemini] = useState(false);
  const [isLoadingDeepseek, setIsLoadingDeepseek] = useState(false);
  const [openAIResponseTime, setOpenAIResponseTime] = useState<number | null>(
    null
  );
  const [geminiResponseTime, setGeminiResponseTime] = useState<number | null>(
    null
  );
  const [deepseekResponseTime, setDeepseekResponseTime] = useState<
    number | null
  >(null);

  const handleSubmit = async () => {
    const sessionId = crypto.randomUUID();
    setCurrentSessionId(sessionId);

    const initialSession = {
      id: sessionId,
      prompt: userInput,
      openAIResponse: null,
      openAIResponseTime: null,
      deepseekResponse: null,
      deepseekResponseTime: null,
      geminiResponse: null,
      geminiResponseTime: null,
    };

    await addSession(initialSession);

    setOpenAIResponse("");
    setGeminiResponse("");
    setDeepseekResponse("");
    setOpenAIResponseTime(null);
    setGeminiResponseTime(null);
    setDeepseekResponseTime(null);

    setIsLoadingOpenAI(true);
    setIsLoadingGemini(true);
    setIsLoadingDeepseek(true);

    const promises = [
      callOpenAI(userInput)
        .then(({ content, responseTime }) => {
          setOpenAIResponse(content);
          setOpenAIResponseTime(responseTime);
          setIsLoadingOpenAI(false);
        })
        .catch((error) => {
          console.error("Error fetching OpenAI response:", error);
          setIsLoadingOpenAI(false);
        }),
      callGemini(userInput)
        .then(({ text, responseTime }) => {
          setGeminiResponse(text);
          setGeminiResponseTime(responseTime);
          setIsLoadingGemini(false);
        })
        .catch((error) => {
          console.error("Error fetching Gemini response:", error);
          setIsLoadingGemini(false);
        }),

      callDeepSeek(userInput)
        .then(({ content, responseTime }) => {
          setDeepseekResponse(content);
          setDeepseekResponseTime(responseTime);
          setIsLoadingDeepseek(false);
        })
        .catch((error) => {
          console.error("Error fetching DeepSeek response:", error);
          setIsLoadingDeepseek(false);
        }),
    ];

    await Promise.all(promises);
  };

  useEffect(() => {
    if (
      !isLoadingOpenAI &&
      !isLoadingGemini &&
      !isLoadingDeepseek &&
      openAIResponse &&
      geminiResponse &&
      deepseekResponse &&
      typeof openAIResponseTime === "number" &&
      typeof deepseekResponseTime === "number" &&
      typeof geminiResponseTime === "number"
    ) {
      const session = {
        id: currentSessionId!,
        prompt: userInput,
        openAIResponse,
        openAIResponseTime,
        deepseekResponse,
        deepseekResponseTime,
        geminiResponse,
        geminiResponseTime,
      };

      updateSession(session);
    }
  }, [
    isLoadingOpenAI,
    isLoadingGemini,
    isLoadingDeepseek,
    openAIResponse,
    geminiResponse,
    deepseekResponse,
  ]);

  return (
    <div className="w-screen flex flex-col justify-center items-center bg-red-000">
      <div className="w-full max-w-2xl">
        <div className="relative w-full mt-8 bg-blue-0">
          <h3 className="text-sm text-left font-semibold mb-1">Prompt</h3>
          <PromptArea
            value={selectedSession?.prompt || userInput}
            onChange={setUserInput}
            placeholder="Type your prompt here..."
          />
          <SubmitButton
            onClick={handleSubmit}
            disabled={false}
            isLoading={false}
          />
        </div>
      </div>
      <div className="flex bg-green-000 mt-8 gap-8">
        <div>
          <h3 className="inline-block px-4 py-1 text-sm text-left font-semibold text-green-600 bg-green-400/50 rounded-full mb-2">
            gpt-4o-mini{" "}
            {selectedSession?.openAIResponseTime || openAIResponseTime
              ? `(${
                  selectedSession?.openAIResponseTime || openAIResponseTime
                }ms)`
              : ""}
          </h3>
          <ResponseArea
            value={selectedSession?.openAIResponse || openAIResponse}
            isLoading={isLoadingOpenAI}
          />
        </div>
        <div>
          <h3 className="inline-block px-4 py-1 text-sm text-left font-semibold text-blue-600 bg-blue-400/50 rounded-full mb-2">
            deepseek-v3{" "}
            {selectedSession?.deepseekResponseTime || deepseekResponseTime ? `(${selectedSession?.deepseekResponseTime || deepseekResponseTime}ms)` : ""}
          </h3>
          <ResponseArea
            value={selectedSession?.deepseekResponse || deepseekResponse}
            isLoading={isLoadingDeepseek}
          />
        </div>
        <div>
          <h3 className="inline-block px-4 py-1 text-sm text-left font-semibold text-violet-600 bg-violet-400/50 rounded-full mb-2">
            gemini-2.0-flash{" "}
            {selectedSession?.geminiResponseTime || geminiResponseTime ? `(${selectedSession?.geminiResponseTime || geminiResponseTime}ms)` : ""}
          </h3>
          <ResponseArea value={selectedSession?.geminiResponse || geminiResponse} isLoading={isLoadingGemini} />
        </div>
      </div>
    </div>
  );
}
