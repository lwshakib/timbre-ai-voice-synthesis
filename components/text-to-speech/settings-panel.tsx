"use client";

import { Settings2, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsPanelSettings } from "./settings-panel-settings";
import { SettingsPanelHistory } from "./settings-panel-history";

export function SettingsPanel() {
  return (
    <div className="flex flex-col h-full bg-[#050505] border-l border-[#1f1f1e] overflow-hidden">
      <Tabs defaultValue="settings" className="flex flex-col h-full">
        <div className="p-4 border-b border-[#1f1f1e] bg-[#070707]">
          <TabsList className="bg-[#050505] border-[#1f1f1e] w-full p-1 h-10 rounded-lg">
            <TabsTrigger 
              value="settings" 
              className="flex-1 gap-2 text-xs font-mono-custom uppercase tracking-wider data-[state=active]:bg-[#d4b87a] data-[state=active]:text-black"
            >
              <Settings2 className="size-3.5" />
              Settings
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex-1 gap-2 text-xs font-mono-custom uppercase tracking-wider data-[state=active]:bg-[#d4b87a] data-[state=active]:text-black"
            >
              <History className="size-3.5" />
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="settings" className="h-full flex flex-col m-0 data-[state=active]:flex">
            <SettingsPanelSettings />
          </TabsContent>
          <TabsContent value="history" className="h-full flex flex-col m-0 data-[state=active]:flex">
            <SettingsPanelHistory />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
