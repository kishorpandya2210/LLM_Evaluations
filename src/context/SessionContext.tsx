import { createContext, useContext, useState, useEffect } from "react";
import { SessionType } from "@/types/sessionType";
import { SessionContextType } from "@/types/sessionContextType";
import {
  getData,
  addSession as addSessionAction,
  editSession,
  getSessionById
} from "@/app/actions/neon";

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const data = await getData();
        setSessions(data);
      } finally {
        setLoading(false);
      }
    }
    fetchSessions();
  }, []);

  const value: SessionContextType = {
    sessions,
    loading,
    getSessionById: async (id) => {
      try {
        const data = await getSessionById(id);
        return data as SessionType;
      } catch (error) {
        throw error;
      }
    },
    addSession: async (session) => {
      try {
        setSessions((prev) => [...prev, { ...session }]);

        await addSessionAction(
          session.id,
          session.prompt,
          session.openAIResponse ?? null,
          session.openAIResponseTime ?? null,
          session.deepseekResponse ?? null,
          session.deepseekResponseTime ?? null,
          session.geminiResponse ?? null,
          session.geminiResponseTime ?? null
        );

        const updatedSessions = await getData();
        setSessions(updatedSessions);
      } catch (error) {
        // setSessions((prev) => prev.filter((s) => s.id !== Date.now()));
        throw error;
      }
    },
    updateSession: async (session) => {
      try {
        setSessions((prev) => {
          const index = prev.findIndex((s) => s.id === session.id);
          if (index === -1) {
            return prev;
          }
          prev[index] = { ...session };
          return [...prev];
        });

        await editSession(
          session.id,
          session.openAIResponse ?? null,
          session.openAIResponseTime ?? null,
          session.deepseekResponse ?? null,
          session.deepseekResponseTime ?? null,
          session.geminiResponse ?? null,
          session.geminiResponseTime ?? null
        );

        const updatedSessions = await getData();
        setSessions(updatedSessions);
      } catch (error) {
        throw error;
      }
    },
  };
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export const useSessions = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessions must be used within a SessionProvider");
  }
  return context;
};
