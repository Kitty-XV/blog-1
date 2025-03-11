import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'
import { getLocalViewStats } from '@/lib/storage'

export async function GET(): Promise<Response> {
  try {
    let stats
    
    if (process.env.VERCEL_ENV === 'development' || !process.env.KV_REST_API_URL) {
      // 本地开发环境使用文件存储
      stats = getLocalViewStats()
    } else {
      // 生产环境使用 Vercel KV
      const keys = await kv.keys('views:*')
      if (keys.length > 0) {
        const pipeline = kv.pipeline()
        keys.forEach(key => {
          pipeline.get(key)
        })
        const results = await pipeline.exec()
        
        // 构建统计数据
        const views = keys.reduce((acc, key, index) => {
          const slug = key.replace('views:', '')
          acc[slug] = (results[index] as number) || 0
          return acc
        }, {} as Record<string, number>)
        
        const viewCounts = Object.values(views)
        
        stats = {
          totalViews: viewCounts.reduce((sum, count) => sum + count, 0),
          averageViews: Math.round(
            viewCounts.reduce((sum, count) => sum + count, 0) / 
            Math.max(viewCounts.length, 1)
          ),
          topPosts: Object.entries(views)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([slug, count]) => ({ slug, count }))
        }
      } else {
        stats = {
          totalViews: 0,
          averageViews: 0,
          topPosts: []
        }
      }
    }
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error getting view stats:', error)
    // 发生错误时使用本地存储作为后备
    return NextResponse.json(getLocalViewStats())
  }
} 