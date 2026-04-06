"use client";

import { Settings2, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsPanelSettings } from "./settings-panel-settings";
import { SettingsPanelHistory } from "./settings-panel-history";

export function SettingsPanel() {
  return (
    <div className="flex flex-col h-full bg-background border-l border-border overflow-hidden">
      <Tabs defaultValue="settings" className="flex flex-col h-full">
        <div className="p-4 border-b border-border bg-secondary/50 backdrop-blur-sm">
          <TabsList className="bg-background border border-border w-full p-1 h-10 rounded-lg">
            <TabsTrigger 
              value="settings" 
              className="flex-1 gap-2 text-xs font-mono-custom uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Settings2 className="size-3.5" />
              Settings
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex-1 gap-2 text-xs font-mono-custom uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <History className="size-3.5" />
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          <TabsContent value="settings" className="h-full flex flex-col m-0 data-[state=active]:flex overflow-hidden">
            <SettingsPanelSettings />
          </TabsContent>
          <TabsContent value="history" className="h-full flex flex-col m-0 data-[state=active]:flex overflow-hidden">
            <SettingsPanelHistory />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
