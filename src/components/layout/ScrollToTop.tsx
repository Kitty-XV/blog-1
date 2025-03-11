'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // 监听滚动事件
  useEffect(() => {
    const toggleVisibility = () => {
      // 当页面滚动超过 300px 时显示按钮
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // 平滑滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.3,
              ease: "easeOut"
            }
          }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-4 z-50 md:bottom-16 md:right-24"
        >
          <motion.button
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={scrollToTop}
            className="group relative flex h-10 w-10 items-center justify-center md:h-14 md:w-14"
            aria-label="返回顶部"
          >
            <span className="absolute -inset-6 z-0 transform rounded-full bg-gradient-to-b from-purple-500/20 to-transparent opacity-40 blur-xl transition-all duration-500 group-hover:opacity-100 md:-inset-10" />
            <ArrowUp 
              className="relative z-20 h-5 w-5 transform text-purple-500/60 transition-all duration-500 group-hover:scale-110 group-hover:text-purple-400 md:h-6 md:w-6" 
              strokeWidth={1.5} 
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 