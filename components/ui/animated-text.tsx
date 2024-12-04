"use client"

import React from 'react'
import { motion, Variants, HTMLMotionProps } from 'framer-motion'

interface AnimatedTextProps extends HTMLMotionProps<"div"> {
  text: string
  className?: string
  wordClassName?: string
  charClassName?: string
}

export function AnimatedText({ 
  text, 
  className = '', 
  wordClassName = '',
  charClassName = '',
  ...rest 
}: AnimatedTextProps) {
  // Split text into words and characters
  const words = text.split(' ')

  // Variants for container animation
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  // Variants for word animation
  const word: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.5,
      },
    },
  }

  // Variants for character animation
  const character: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      {...rest}
    >
      {words.map((w, index) => (
        <motion.span
          key={index}
          className={`inline-block mr-1 ${wordClassName}`}
          variants={word}

        >
          {w.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className={`inline-block ${charClassName}`}
              variants={character}
              style={{
                display: 'inline-block',
                fontFamily: 'Poppins, sans-serif', // Changed font family
                background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Added text shadow for aesthetics
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  )
}

