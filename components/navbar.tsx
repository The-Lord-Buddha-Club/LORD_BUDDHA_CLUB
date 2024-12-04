"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md dark:bg-gray-900/80 border-gray-200 dark:border-gray-800"
          : "bg-transparent border-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="w-8 h-8" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400">
                LB
              </span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => (
                  (item.name !== "Dashboard" || session) && (
                    <Link key={item.name} href={item.href}>
                      <motion.div
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-colors relative",
                          pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.name}
                        {pathname === item.href && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            layoutId="navbar-underline"
                          />
                        )}
                      </motion.div>
                    </Link>
                  )
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <ThemeToggle />
            {session ? (
              <UserNav />
            ) : (
              <Button asChild variant="default" size="sm">
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}

