'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface TagCloudProps {
  tags: Array<{
    name: string
    count: number
  }>
  onTagClick?: (tag: string) => void
}

export function TagCloud({ tags, onTagClick }: TagCloudProps) {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)
  const [tagPositions, setTagPositions] = useState<Record<string, { x: number, y: number }>>({})
  const maxCount = Math.max(...tags.map(tag => tag.count))
  
  // 在客户端生成标签位置
  useEffect(() => {
    const positions: Record<string, { x: number, y: number }> = {}
    tags.forEach(tag => {
      positions[tag.name] = {
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5
      }
    })
    setTagPositions(positions)
  }, [tags])

  // 根据标签的使用次数计算字体大小
  const getTagSize = (count: number) => {
    const minSize = 0.875 // 14px
    const maxSize = 1.25  // 20px
    return minSize + (count / maxCount) * (maxSize - minSize)
  }

  // 根据标签的使用次数计算透明度
  const getTagOpacity = (count: number) => {
    return 0.5 + (count / maxCount) * 0.5 // 透明度范围：0.5-1
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {tags.sort((a, b) => b.count - a.count).map((tag) => {
        const fontSize = getTagSize(tag.count)
        return onTagClick ? (
          <button
            key={tag.name}
            onClick={() => onTagClick(tag.name)}
            className={cn(
              'group relative transition-all duration-300 ease-out hover:-translate-y-0.5',
              hoveredTag && hoveredTag !== tag.name && 'opacity-30'
            )}
            style={tagPositions[tag.name] ? {
              transform: `translate(${tagPositions[tag.name].x}px, ${tagPositions[tag.name].y}px)`
            } : undefined}
            onMouseEnter={() => setHoveredTag(tag.name)}
            onMouseLeave={() => setHoveredTag(null)}
          >
            <span
              className="relative block rounded-full bg-primary-100/30 px-3 py-1 font-light text-primary-600 transition-all duration-200 ease-out group-hover:bg-primary-100/50"
              style={{
                fontSize: `${fontSize}rem`,
                opacity: getTagOpacity(tag.count),
              }}
            >
              {tag.name}
              <span className="ml-1 text-[0.7em] text-primary-400">
                {tag.count}
              </span>
            </span>
            {/* 装饰性光晕效果 */}
            <div className="absolute -inset-1 -z-10 rounded-full bg-primary-100/20 opacity-0 blur-md transition-all duration-300 ease-out group-hover:opacity-100" />
          </button>
        ) : (
          <Link
            key={tag.name}
            href={`/posts?tag=${tag.name}`}
            className={cn(
              'group relative transition-all duration-300 ease-out hover:-translate-y-0.5',
              hoveredTag && hoveredTag !== tag.name && 'opacity-30'
            )}
            style={tagPositions[tag.name] ? {
              transform: `translate(${tagPositions[tag.name].x}px, ${tagPositions[tag.name].y}px)`
            } : undefined}
            onMouseEnter={() => setHoveredTag(tag.name)}
            onMouseLeave={() => setHoveredTag(null)}
          >
            <span
              className="relative block rounded-full bg-primary-100/30 px-3 py-1 font-light text-primary-600 transition-all duration-200 ease-out group-hover:bg-primary-100/50"
              style={{
                fontSize: `${fontSize}rem`,
                opacity: getTagOpacity(tag.count),
              }}
            >
              {tag.name}
              <span className="ml-1 text-[0.7em] text-primary-400">
                {tag.count}
              </span>
            </span>
            {/* 装饰性光晕效果 */}
            <div className="absolute -inset-1 -z-10 rounded-full bg-primary-100/20 opacity-0 blur-md transition-all duration-300 ease-out group-hover:opacity-100" />
          </Link>
        )
      })}
    </div>
  )
} 