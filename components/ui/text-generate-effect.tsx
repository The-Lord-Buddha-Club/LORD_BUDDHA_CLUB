"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
}

export const TextGenerateEffect: React.FC<TextGenerateEffectProps> = ({ words, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prevText => prevText + words[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, words]);

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
    </motion.div>
  );
};

