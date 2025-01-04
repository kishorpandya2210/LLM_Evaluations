import { ChevronDown, History } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SessionType } from "@/types/sessionType";
import { useSessions } from "@/context/SessionContext";
import { Dot } from "lucide-react";
import { useSessionStore } from "@/store/session-store";

export function AppSidebar() {
  const { sessions, getSessionById } = useSessions();
  const setSelectionSession = useSessionStore(
    (state) => state.setSelectedSession
  );

  const handleSessionClick = async (id: string) => {
    const session = await getSessionById(id);
    if (!session) return;
    setSelectionSession(session);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                <div className="flex items-center text !text-sm">
                  <History className="mr-1 h-4 w-4" />
                  Recent
                </div>
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sessions.map((session) => (
                    <SidebarMenuItem
                      key={session.id}
                      onClick={() => handleSessionClick(session.id)}
                    >
                      <SidebarMenuButton asChild>
                        <div className="text text-sm flex items-center bg-gray-200 hover:bg-gray-300 rounded-md p-2">
                          <span>{session.prompt}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
    </Sidebar>
  );
}
