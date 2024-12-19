"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface FloatingNavProps {
  children: React.ReactNode;
  label: string;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ children, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{label}</span>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-2 p-4 bg-background rounded-lg shadow-xl z-10 border border-border min-w-[200px]"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FloatingNavItem: React.FC<React.ComponentPropsWithoutRef<"a">> = ({ children, ...props }) => {
  return (
    <a
      {...props}
      className="block px-4 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors duration-200"
    >
      {children}
    </a>
  );
};

