import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'
import { getLocalLikes, updateLocalLikes } from '@/lib/storage'

// 使用环境变量初始化 Redis 客户端
const redis = Redis.fromEnv()

export async function POST(
  request: NextRequest,
  props: any
): Promise<Response> {
  const slug = props.params.slug
  const { increment } = await request.json()

  if (!slug) {
    return new NextResponse('Slug not found', { status: 400 })
  }

  try {
    let likes: number

    try {
      // 使用 Redis
      console.log('Using Redis for likes')
      const key = `likes:${slug}`
      
      if (increment) {
        // 增加点赞
        likes = await redis.incr(key)
      } else {
        // 取消点赞
        likes = await redis.decr(key)
        // 确保不会小于 0
        if (likes < 0) {
          await redis.set(key, 0)
          likes = 0
        }
      }
    } catch (redisError) {
      console.error('Redis operation failed:', redisError)
      // 如果 Redis 操作失败，回退到本地存储
      console.log('Falling back to local storage')
      likes = updateLocalLikes(slug, increment)
    }

    return NextResponse.json({ likes })
  } catch (error) {
    console.error('Error in POST /api/likes/[slug]:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update likes',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  props: any
): Promise<Response> {
  const slug = props.params.slug

  if (!slug) {
    return new NextResponse('Slug not found', { status: 400 })
  }

  try {
    let likes: number

    try {
      // 使用 Redis
      console.log('Using Redis for getting likes')
      const key = `likes:${slug}`
      likes = Number(await redis.get(key)) || 0
    } catch (redisError) {
      console.error('Redis operation failed:', redisError)
      // 如果 Redis 操作失败，回退到本地存储
      console.log('Falling back to local storage')
      likes = getLocalLikes(slug)
    }

    return NextResponse.json({ likes })
  } catch (error) {
    console.error('Error in GET /api/likes/[slug]:', error)
    return NextResponse.json(
      { 
        error: 'Failed to get likes',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
} 