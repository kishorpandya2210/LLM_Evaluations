import { create } from "zustand";
import { SessionType } from "../types/sessionType";

interface SessionState {
  selectedSession: SessionType | null;
  setSelectedSession: (session: SessionType | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  selectedSession: null,
  setSelectedSession: (session) => set({ selectedSession: session }),
}));
