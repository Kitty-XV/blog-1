'use client'

import { AnimatePresence as FramerAnimatePresence } from 'framer-motion'

interface AnimatePresenceProps {
  children: React.ReactNode
}

export function AnimatePresence({ children }: AnimatePresenceProps) {
  return (
    <FramerAnimatePresence mode="wait">
      {children}
    </FramerAnimatePresence>
  )
} 