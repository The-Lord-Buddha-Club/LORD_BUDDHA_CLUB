"use client";

import React from "react";
import { motion } from "framer-motion";

interface HoverEffectProps {
  items: {
    component: React.ReactNode;
  }[];
  className?: string;
}

export const HoverEffect: React.FC<HoverEffectProps> = ({ items, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300 group-hover:duration-200" />
          <div className="relative bg-white dark:bg-gray-900 rounded-lg p-4">
            {item.component}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

