"use client"

import { cn } from "@/lib/utils"
import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { useEffect } from "react"

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 0.01,
          delay: stagger(0.025),
        },
      )
    }
  }, [isInView, animate])

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {words.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.split("").map((char, index) => (
                <motion.span initial={{ opacity: 0 }} key={`char-${index}`} className={cn(word.className)}>
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("inline-block", className)}>
        {renderWords()}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className={cn("inline-block h-4 w-[2px] bg-primary ml-1", cursorClassName)}
        />
      </div>
    </div>
  )
}

