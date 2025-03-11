'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      // 将 ReactNode 转换为字符串
      const code = Array.isArray(children) 
        ? children.join('') 
        : String(children ?? '')

      if (code) {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  return (
    <div className="group relative">
      <pre className={cn(
        'overflow-x-auto rounded-xl bg-primary-900/5 p-4 backdrop-blur-sm',
        className
      )}>
        {children}
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute right-4 top-4 hidden rounded-lg border border-primary-200/30 bg-white/50 px-2 py-1 text-xs font-light text-primary-600 opacity-0 backdrop-blur-sm transition-all duration-150 ease-out hover:bg-white/80 group-hover:opacity-100 md:block"
      >
        {copied ? '已复制' : '复制代码'}
      </button>
    </div>
  )
} 