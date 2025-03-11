'use client'

import { motion } from 'framer-motion'
import { TagCloud } from './TagCloud'

interface Tag {
  name: string
  count: number
}

interface AnimatedTagCloudProps {
  tags: Tag[]
  onTagClick?: (tag: string) => void
}

export function AnimatedTagCloud({ tags, onTagClick }: AnimatedTagCloudProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.6,
      },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="overflow-hidden rounded-2xl border border-foreground/10 bg-white/50 p-6 backdrop-blur-sm"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="mb-6 font-serif text-lg font-light text-foreground/80"
      >
        标签云
      </motion.h2>
      <TagCloud tags={tags} onTagClick={onTagClick} />
    </motion.div>
  )
} 