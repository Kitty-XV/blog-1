'use client'

import { motion } from 'framer-motion'
import { Archive } from 'lucide-react'

export function PostsHeader() {
  return (
    <header className="mx-auto mb-16 max-w-2xl text-center">
      <div className="mb-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100/60 text-primary-600 backdrop-blur-sm"
        >
          <Archive size={28} />
        </motion.div>
      </div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.1,
        }}
        className="font-serif text-4xl font-light tracking-tight text-foreground/90 md:text-5xl"
      >
        博客文章
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.2,
        }}
        className="mt-4 text-lg font-light leading-relaxed text-foreground/60"
      >
        分享技术见解、学习心得和个人思考
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          delay: 0.3,
        }}
        className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary-200/0 via-primary-300/60 to-primary-200/0"
      />
    </header>
  )
} 