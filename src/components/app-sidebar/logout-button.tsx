"use client";

import { signOut } from "@/lib/supabase/client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <DropdownMenuItem onClick={() => signOut()}>
      <LogOut /> Sign Out
    </DropdownMenuItem>
  );
}
