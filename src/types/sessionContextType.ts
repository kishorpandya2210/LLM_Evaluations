import { SessionType } from "@/types/sessionType";

export type SessionContextType = {
  sessions: SessionType[];
  loading: boolean;
  addSession: (session: SessionType) => void;
  updateSession: (session: SessionType) => void;
  getSessionById: (id: string) => Promise<SessionType | null>;
  // deleteSession: (id: string) => void;
}
