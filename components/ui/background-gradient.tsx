"use client";

import React from "react";
import { motion } from "framer-motion";

interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        animate={{
          x: ["0%", "100%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 10,
        }}
      />
      <div className="relative z-10 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90">
        {children}
      </div>
    </motion.div>
  );
};

