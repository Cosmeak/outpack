"use client";

import { ChevronsUpDown, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import LogoutButton from "@/components/app-sidebar/logout-button";
import Link from "next/link";
import ThemeToggle from "@/components/app-sidebar/theme-toggle";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export function UserMenu() {
  const { isMobile } = useSidebar();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    async function fetchPosts() {
      const data = await supabase.auth.getUser();
      setUser(data.data.user);
    }
    fetchPosts();
  }, [supabase]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user?.user_metadata.avatar ?? ""}
                  alt={user?.user_metadata.username}
                />
                <AvatarFallback className="rounded-lg">
                  {user?.user_metadata.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.user_metadata.username}
                </span>
                <span className="truncate text-xs">
                  {user?.user_metadata.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.user_metadata.avatar ?? ""}
                    alt={user?.user_metadata.username}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.user_metadata.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.user_metadata.username}
                  </span>
                  <span className="truncate text-xs">
                    {user?.user_metadata.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href="/settings"
                  className="w-full h-full flex gap-2 items-center"
                >
                  <Settings />
                  Settings
                </Link>
              </DropdownMenuItem>
              <ThemeToggle />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
