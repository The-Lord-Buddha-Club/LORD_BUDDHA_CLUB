"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { BackgroundBeams } from '@/components/ui/background-beams'
import { TypewriterEffect } from '@/components/ui/typewriter'

interface AnimatedTerminalProps {
  quotes?: { text: string; className?: string }[]
  className?: string
  height?: string // New prop for customizing height
}

export function AnimatedTerminal({
  quotes = [
    { text: "$ npm create next-app" },
    { text: "✓ Installing dependencies..." },
    { text: "✓ Setting up project..." },
    { text: "> Success! Your Next.js app is ready." },
    { text: "$ cd my-app" },
    { text: "$ npm run dev" },
    { text: "> Ready in 2.3s" },
    { text: "> Server running at http://localhost:3000" },
  ],
  className,
  height = "auto", // Default to auto height
}: AnimatedTerminalProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0, 1, 1, 0.8])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -50])

  const [mounted, setMounted] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    setMounted(true)

    const timer = setTimeout(() => {
      setVisibleLines(1)

      const interval = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev >= quotes.length) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }, 800)

    return () => clearTimeout(timer)
  }, [quotes.length])

  if (!mounted) return null

  return (
    <div 
      className={cn("relative flex w-full items-center justify-center py-10", className)} 
      ref={ref}
      style={{ height }}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <BackgroundBeams />
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className={cn(
          "z-10 w-full max-w-3xl rounded-xl border border-neutral-800 bg-black/80 backdrop-blur-md",
        )}
      >
        <div className="flex items-center justify-between rounded-t-xl border-b border-neutral-800 bg-black/30 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="text-sm text-neutral-400">Terminal</div>
          <div className="w-10" />
        </div>

        <div className="p-4 text-sm md:p-6 md:text-base">
          <div className="flex flex-col gap-2 font-mono text-neutral-200">
            {quotes.slice(0, visibleLines).map((quote, index) => (
              <TerminalLine key={index} index={index} text={quote.text} className={quote.className} />
            ))}
            <TerminalCursor />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function TerminalLine({
  index,
  text,
  className,
}: {
  index: number
  text: string
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={cn("flex items-start", className)}
    >
      <TypewriterEffect words={[{ text }]} className="text-neutral-200" cursorClassName="hidden" />
    </motion.div>
  )
}

function TerminalCursor() {
  return (
    <div className="mt-1 flex items-center">
      <div className="h-4 w-2 animate-pulse bg-emerald-500" />
    </div>
  )
}