'use client';

import React from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { ScrambleText } from '@/components/marketing/scramble-text';

export function InviteDialog() {
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState<'member' | 'admin' | 'owner'>('member');
  const [isOpen, setIsOpen] = React.useState(false);
  const [isInviting, setIsInviting] = React.useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsInviting(true);
    try {
      await authClient.organization.inviteMember({
        email,
        role,
      });
      toast.success(`Invitation sent to ${email}`);
      setIsOpen(false);
      setEmail('');
      setRole('member');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send invitation');
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="btn-swiss px-6 py-2.5 font-mono-custom text-[0.6875rem] tracking-[0.05em] flex items-center gap-2">
          <Icon icon="solar:user-plus-linear" width={16} height={16} className="relative z-10" />
          <ScrambleText text="ADD_PERSONNEL" className="relative z-10" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border text-foreground">
        <form onSubmit={handleInvite}>
          <DialogHeader>
            <DialogTitle className="text-foreground">Invite Personnel</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Grant synthesis permissions to an institutional entity.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-6">
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-[10px] font-mono-custom uppercase tracking-widest text-muted-foreground/60"
              >
                ENTITY_UPLINK_EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="uplink@corp.com"
                className="bg-background border-border focus-visible:ring-primary h-11"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="role"
                className="text-[10px] font-mono-custom uppercase tracking-widest text-muted-foreground/60"
              >
                PERMISSIONS_LEVEL
              </Label>
              <Select
                value={role}
                onValueChange={(v) => setRole(v as 'member' | 'admin' | 'owner')}
              >
                <SelectTrigger className="bg-background border-border h-11">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border text-foreground">
                  <SelectItem value="member">Personnel // Member</SelectItem>
                  <SelectItem value="admin">Institutional // Admin</SelectItem>
                  <SelectItem value="owner">System // Owner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isInviting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-mono-custom tracking-widest uppercase text-xs"
            >
              {isInviting ? 'INITIALIZING_HANDSHAKE...' : 'AUTHORIZE_INVITATION'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
