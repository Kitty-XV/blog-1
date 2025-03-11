import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'
import { getBatchLocalViews } from '@/lib/storage'

export async function GET(request: NextRequest): Promise<Response> {
  const slugs = request.nextUrl.searchParams.get('slugs')?.split(',') || []
  
  if (slugs.length === 0) {
    return new NextResponse('No slugs provided', { status: 400 })
  }

  try {
    let views: Record<string, number>
    
    if (process.env.VERCEL_ENV === 'development' || !process.env.KV_REST_API_URL) {
      // 本地开发环境使用文件存储
      views = getBatchLocalViews(slugs)
    } else {
      // 生产环境使用 Vercel KV
      const pipeline = kv.pipeline()
      slugs.forEach(slug => {
        pipeline.get(`views:${slug}`)
      })
      const results = await pipeline.exec()
      
      views = slugs.reduce((acc, slug, index) => {
        acc[slug] = (results[index] as number) || 0
        return acc
      }, {} as Record<string, number>)
    }
    
    return NextResponse.json({ views })
  } catch (error) {
    console.error('Error getting views:', error)
    // 发生错误时使用本地存储作为后备
    return NextResponse.json({ views: getBatchLocalViews(slugs) })
  }
} 