"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { User, Settings, LogOut } from 'lucide-react';

export function UserNav() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full overflow-hidden hover:bg-primary/10 transition-colors duration-300"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
              {session?.user?.name?.[0]}
            </AvatarFallback>
          </Avatar>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            initial={false}
            animate={isOpen ? { scale: 1.1, opacity: 1 } : { scale: 1, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </Button>
      </DropdownMenuTrigger>
      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent 
            className="w-64 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg border border-primary/20" 
            align="end" 
            forceMount
            asChild
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              transition={{ duration: 0.2 }}
            >
              <DropdownMenuLabel className="font-normal p-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-lg font-semibold leading-none">{session?.user?.name}</p>
                  <p className="text-sm leading-none text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-primary/10" />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center p-3 hover:bg-primary/10 transition-colors duration-200">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center p-3 hover:bg-primary/10 transition-colors duration-200">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-primary/10" />
              <DropdownMenuItem
                className="flex items-center p-3 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
}

