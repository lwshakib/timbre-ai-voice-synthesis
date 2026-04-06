"use client";

import { quickActions } from "./data/quick-actions";
import { QuickActionCard } from "./quick-action-card";

export function QuickActionsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-light tracking-tight text-foreground">Quick actions</h2>
        <span className="text-[10px] text-muted-foreground font-mono-custom tracking-widest uppercase">[USER_SHORTCUTS]</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quickActions.map((action) => (
          <QuickActionCard
            key={action.title}
            title={action.title}
            description={action.description}
            gradient={action.gradient}
            href={action.href}
          />
        ))}
      </div>
    </div>
  );
}
