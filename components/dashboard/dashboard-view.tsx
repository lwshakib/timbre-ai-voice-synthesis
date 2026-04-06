import { PageHeader } from "./page-header";
import { HeroPattern } from "./hero-pattern";
import { DashboardHeader } from "./dashboard-header";
import { TextInputPanel } from "./text-input-panel";
import { QuickActionsPanel } from "./quick-actions-panel";

export function DashboardView() {
  return (
    <div className="relative flex-1 flex flex-col">
      <PageHeader title="Dashboard" className="lg:hidden" />
      <HeroPattern />
      <div className="relative flex-1 space-y-12 p-6 lg:p-16 max-w-[1400px] mx-auto w-full">
        <DashboardHeader />
        <TextInputPanel />
        <QuickActionsPanel />
      </div>
    </div>
  );
}
