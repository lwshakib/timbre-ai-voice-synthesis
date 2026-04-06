'use client';

import * as React from 'react';
import { ChevronsUpDown, Plus, Check, Building2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function OrgSwitcher() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { data: organizations, isPending: loadingOrgs } = authClient.useListOrganizations();
  const { data: activeOrg, isPending: loadingActive } = authClient.useActiveOrganization();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newOrgName, setNewOrgName] = React.useState('');
  const [newOrgSlug, setNewOrgSlug] = React.useState('');
  const [isCreating, setIsCreating] = React.useState(false);

  const handleCreateOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName || !newOrgSlug) return;

    setIsCreating(true);
    try {
      await authClient.organization.create({
        name: newOrgName,
        slug: newOrgSlug,
      });
      toast.success('Organization created successfully');
      setIsDialogOpen(false);
      setNewOrgName('');
      setNewOrgSlug('');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create organization');
    } finally {
      setIsCreating(false);
    }
  };

  const currentOrg = activeOrg || null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-primary/10 data-[state=open]:text-foreground border border-border bg-card hover:border-primary transition-all duration-300"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                {currentOrg?.logo ? (
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage src={currentOrg.logo} alt={currentOrg.name} />
                    <AvatarFallback className="rounded-lg bg-transparent text-[10px]">
                      {currentOrg.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Building2 className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold text-foreground">
                  {currentOrg?.name || 'Personal Workspace'}
                </span>
                <span className="truncate text-xs text-muted-foreground font-mono-custom tracking-wider">
                  {currentOrg ? 'Institutional' : 'Individual Access'}
                </span>
              </div>
              <ChevronsUpDown className="size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-card border-border text-foreground"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground font-mono-custom tracking-[0.2em] uppercase px-2 py-1.5">
              Organizations
            </DropdownMenuLabel>

            {/* Personal Workspace Option */}
            <DropdownMenuItem
              onClick={async () => {
                await authClient.organization.setActive({ organizationId: null });
                toast.success('Switched to Personal Workspace');
              }}
              className="gap-2 p-2 focus:bg-primary/10 focus:text-foreground cursor-pointer"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border border-border bg-background">
                <Plus className="size-4 text-muted-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Personal Workspace</span>
                <span className="text-[10px] text-muted-foreground">Individual</span>
              </div>
              {!currentOrg && <Check className="ml-auto size-4 text-primary" />}
            </DropdownMenuItem>

            {organizations?.map((org) => (
              <DropdownMenuItem
                key={org.id}
                onClick={async () => {
                  await authClient.organization.setActive({ organizationId: org.id });
                  toast.success(`Switched to ${org.name}`);
                }}
                className="gap-2 p-2 focus:bg-primary/10 focus:text-foreground cursor-pointer"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border border-border bg-background">
                  <Building2 className="size-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{org.name}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                    {org.slug}
                  </span>
                </div>
                {currentOrg?.id === org.id && <Check className="ml-auto size-4 text-primary" />}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator className="bg-border" />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="gap-2 p-2 focus:bg-primary/10 focus:text-foreground cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border border-border bg-background">
                    <Plus className="size-4 text-foreground" />
                  </div>
                  <div className="font-medium text-foreground">Create Organization</div>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="bg-card border-border text-foreground">
                <form onSubmit={handleCreateOrg}>
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Create Organization</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Set up a new institutional workspace for your team.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newOrgName}
                        onChange={(e) => {
                          setNewOrgName(e.target.value);
                          if (!newOrgSlug) {
                            setNewOrgSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                          }
                        }}
                        placeholder="Acme Inc."
                        className="bg-background border-border focus-visible:ring-primary"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={newOrgSlug}
                        onChange={(e) =>
                          setNewOrgSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))
                        }
                        placeholder="acme-inc"
                        className="bg-background border-border focus-visible:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={isCreating}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-semibold"
                    >
                      {isCreating ? 'Creating...' : 'Create Workspace'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
