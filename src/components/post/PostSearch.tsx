'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'

interface PostSearchProps {
  onSearch: (query: string) => void
}

export function PostSearch({ onSearch }: PostSearchProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }
  
  const handleClear = () => {
    setQuery('')
    onSearch('')
    inputRef.current?.focus()
  }
  
  // 按下Escape键时清空搜索
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && query) {
        handleClear()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [query])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.2,
      }}
      className="mb-8"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className={`flex w-full overflow-hidden rounded-full transition-all duration-300 ${isFocused ? 'shadow-soft-md ring-2 ring-primary-100' : 'shadow-soft-sm'}`}>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="搜索文章..."
              className="w-full border-0 bg-white/80 px-5 py-3.5 pl-12 text-base font-light placeholder:text-foreground/40 focus:outline-none focus:ring-0 backdrop-blur-sm"
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-400" />
            
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-foreground/40 hover:bg-primary-100/50 hover:text-primary-500"
                aria-label="清空搜索"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <button
            type="submit"
            className="bg-primary-600 px-6 py-3 text-sm font-light text-white transition-colors hover:bg-primary-700"
          >
            搜索
          </button>
        </div>
        
        {query && (
          <p className="mt-2 pl-4 text-xs font-light text-foreground/40">
            按 ESC 键清空搜索
          </p>
        )}
      </form>
    </motion.div>
  )
} 