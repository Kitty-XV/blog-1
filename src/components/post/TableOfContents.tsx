'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // 获取文章主要内容区域（需要在文章内容区域添加 .post-content 类）
    const mainContent = document.querySelector('.post-content')
    if (!mainContent) return

    // 只获取主要内容区域内的标题
    const elements = Array.from(mainContent.querySelectorAll('h2, h3, h4'))
    
    const headingElements = elements.map((element, index) => {
      if (!element.id) {
        element.id = `heading-${index}`
      }
      return {
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.charAt(1)),
      }
    })
    setHeadings(headingElements)

    // 监听滚动，高亮当前可见的标题
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0% 0% -80% 0%' }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-auto">
      <h2 className="mb-4 font-serif text-lg font-light text-foreground/80">目录</h2>
      <ul className="space-y-2.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                'block text-sm font-light text-foreground/60 transition-colors duration-150 ease-out hover:text-foreground',
                activeId === heading.id && 'text-primary-600'
              )}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
} 