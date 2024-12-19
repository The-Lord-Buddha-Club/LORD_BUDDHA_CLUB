"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TextRevealCardProps {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}

export function TextRevealCard({
  text,
  revealText,
  children,
  className,
}: TextRevealCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border p-8",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/50 to-black/10 opacity-0 hover:opacity-100 transition-opacity"
        initial={false}
      >
        <motion.p
          className="text-white text-2xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {revealText}
        </motion.p>
      </motion.div>
    </div>
  );
}

export function TextRevealCardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-2xl font-bold mb-2", className)}>
      {children}
    </h3>
  );
}

export function TextRevealCardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-muted-foreground", className)}>
      {children}
    </p>
  );
}