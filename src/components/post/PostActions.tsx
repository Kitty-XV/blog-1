'use client'

import { useEffect, useState } from 'react'
import { Share2, Eye, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PostActionsProps {
  slug: string
  title: string
}

// 使用内存缓存来防止重复更新
const updatedPosts = new Set<string>()

export function PostActions({ slug, title }: PostActionsProps) {
  const [views, setViews] = useState<number>(0)
  const [likes, setLikes] = useState<number>(0)
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    const updateViews = async () => {
      try {
        console.log('Attempting to update views for:', slug)
        // 增加阅读量并获取最新数据
        const response = await fetch(`/api/views/${slug}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Views updated successfully:', data)
        setViews(data.views)
        // 标记此文章在此次页面加载中已更新
        updatedPosts.add(slug)
      } catch (error) {
        console.error('更新阅读量失败:', error)
        // 如果更新失败，至少尝试获取当前阅读量
        try {
          const response = await fetch(`/api/views/${slug}`)
          const data = await response.json()
          console.log('Retrieved current views:', data)
          setViews(data.views)
        } catch (fetchError) {
          console.error('获取当前阅读量也失败:', fetchError)
        }
      }
    }

    const initializeViews = async () => {
      if (hasInitialized) return;
      
      try {
        console.log('Initializing views for:', slug)
        // 检查是否在同一个会话中已经增加过阅读量
        const sessionKey = `viewed:${slug}`
        const hasViewed = sessionStorage.getItem(sessionKey)
        const hasUpdatedThisLoad = updatedPosts.has(slug)
        
        console.log('Has viewed in this session:', hasViewed)
        console.log('Has updated this page load:', hasUpdatedThisLoad)
        
        if (!hasViewed && !hasUpdatedThisLoad) {
          // 如果是新的会话且在此次页面加载中还没更新过，增加阅读量
          await updateViews()
          // 记录已阅读状态
          sessionStorage.setItem(sessionKey, 'true')
        } else {
          // 如果已经阅读过或已更新过，只获取当前阅读量
          console.log('Existing session or already updated, fetching current views')
          const response = await fetch(`/api/views/${slug}`)
          const data = await response.json()
          console.log('Current views:', data)
          setViews(data.views)
        }
        
        setHasInitialized(true)
      } catch (error) {
        console.error('初始化阅读量失败:', error)
      }
    }

    const initializeLikes = async () => {
      try {
        // 获取点赞数
        const response = await fetch(`/api/likes/${slug}`)
        const data = await response.json()
        setLikes(data.likes)
        
        // 检查用户是否已点赞
        const hasLiked = localStorage.getItem(`liked:${slug}`)
        setLiked(!!hasLiked)
      } catch (error) {
        console.error('初始化点赞数据失败:', error)
      }
    }

    // 初始化数据
    initializeViews()
    initializeLikes()
  }, [slug, hasInitialized])

  const handleLike = async () => {
    try {
      const newLiked = !liked
      
      // 更新点赞状态
      const response = await fetch(`/api/likes/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ increment: newLiked }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update likes')
      }
      
      const data = await response.json()
      setLikes(data.likes)
      setLiked(newLiked)
      
      // 保存点赞状态到本地存储
      if (newLiked) {
        localStorage.setItem(`liked:${slug}`, 'true')
      } else {
        localStorage.removeItem(`liked:${slug}`)
      }
    } catch (error) {
      console.error('更新点赞失败:', error)
    }
  }

  const sharePost = async () => {
    const url = window.location.href
    const shareTitle = `${title} | Renne's blog`
    const shareText = `${title}\n\n阅读全文：`

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url,
        })
      } else {
        await navigator.clipboard.writeText(`${shareText}${url}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error('分享失败:', err)
    }
  }

  return (
    <div className="flex items-center gap-6">
      {/* 阅读量 */}
      <div className="flex items-center gap-1.5 text-sm font-light text-foreground/60">
        <Eye className="h-4 w-4" />
        <span>{views} 次阅读</span>
      </div>

      {/* 点赞按钮 */}
      <button
        onClick={handleLike}
        className="group flex items-center gap-1.5 text-sm font-light text-foreground/60 transition-colors duration-150 ease-out hover:text-primary-600"
      >
        <Heart
          className={cn(
            'h-4 w-4 transition-all duration-150 ease-out group-hover:scale-110',
            liked && 'fill-primary-600 text-primary-600'
          )}
        />
        <span>{likes} 喜欢</span>
      </button>

      {/* 分享按钮 */}
      <button
        onClick={sharePost}
        className="group flex items-center gap-1.5 text-sm font-light text-foreground/60 transition-colors duration-150 ease-out hover:text-primary-600"
      >
        <Share2 className="h-4 w-4 transition-all duration-150 ease-out group-hover:scale-110" />
        <span>{copied ? '已复制链接' : '分享'}</span>
      </button>
    </div>
  )
} 