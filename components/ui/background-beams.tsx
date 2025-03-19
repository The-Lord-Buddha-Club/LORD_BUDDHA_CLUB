"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface BackgroundBeamsProps extends React.HTMLAttributes<HTMLDivElement> {
  disableAnimation?: boolean
}

export function BackgroundBeams({ className, disableAnimation = false, ...props }: BackgroundBeamsProps) {
  const [opacity, setOpacity] = useState(0)
  const [size, setSize] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disableAnimation) {
      setOpacity(1)
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setPosition({ x: width / 2, y: height / 2 })
        setSize(Math.max(width, height))
      }
      return
    }

    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = e.clientX - left
      const y = e.clientY - top
      setPosition({ x, y })
      setSize(Math.max(width, height) * 1.5)
      setOpacity(1)
    }

    window.addEventListener("mousemove", handleMove)
    return () => {
      window.removeEventListener("mousemove", handleMove)
    }
  }, [disableAnimation])

  return (
    <div
      ref={containerRef}
      className={cn("bg-black/[0.8] pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 backdrop-blur-md"
        style={{
          background: `radial-gradient(
            circle at ${position.x}px ${position.y}px,
            transparent,
            rgba(0, 0, 0, 0.8) 50%
          )`,
          opacity: disableAnimation ? 1 : opacity,
          transition: "opacity 300ms ease",
        }}
      />
      <div
        className="absolute opacity-50"
        style={{
          background: `radial-gradient(
            circle at ${position.x}px ${position.y}px,
            rgba(29, 78, 216, 0.4) 0%,
            transparent 65%
          )`,
          width: `${size}px`,
          height: `${size}px`,
          left: `calc(${position.x}px - ${size / 2}px)`,
          top: `calc(${position.y}px - ${size / 2}px)`,
          opacity: disableAnimation ? 0.3 : opacity * 0.3,
          transition: disableAnimation ? "opacity 300ms ease" : "none",
        }}
      />
    </div>
  )
}

