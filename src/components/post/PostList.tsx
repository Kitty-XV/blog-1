'use client'

import { motion } from 'framer-motion'
import { PostCard } from './PostCard'
import type { PostMeta } from '@/types/post'
import { useEffect, useState } from 'react'

interface PostListProps {
  posts: PostMeta[]
}

export function PostList({ posts }: PostListProps) {
  const [views, setViews] = useState<Record<string, number>>({})

  useEffect(() => {
    // 批量获取文章阅读量
    const fetchViews = async () => {
      try {
        const slugs = posts.map(post => post.slug).join(',')
        const response = await fetch(`/api/views?slugs=${slugs}`)
        const data = await response.json()
        setViews(data.views)
      } catch (error) {
        console.error('获取阅读量失败:', error)
      }
    }

    if (posts.length > 0) {
      fetchViews()
    }
  }, [posts])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 22,
      },
    },
  }

  if (posts.length === 0) {
    return (
      <div className="mt-12 text-center">
        <p className="text-lg font-light text-foreground/60">还没有文章</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-8"
    >
      {posts.map((post) => (
        <motion.div
          key={post.slug}
          variants={item}
          className="hover-card-effect"
        >
          <PostCard post={post} views={views[post.slug]} />
        </motion.div>
      ))}
    </motion.div>
  )
} 