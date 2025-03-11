import { generateRssFeed } from '@/lib/rss'
import { NextResponse } from 'next/server'

// 设置更长的缓存时间，因为博客内容通常不会频繁更新
const CACHE_CONTROL = 'public, s-maxage=86400, stale-while-revalidate=43200' // 24小时缓存，12小时后台刷新

export async function GET(request: Request) {
  try {
    const accept = request.headers.get('accept') || ''
    const feed = await generateRssFeed()
    
    // 根据Accept头选择最合适的格式
    let content: string
    let contentType: string
    
    if (accept.includes('application/atom+xml')) {
      content = feed.atom
      contentType = 'application/atom+xml'
    } else if (accept.includes('application/json')) {
      content = feed.json
      contentType = 'application/json'
    } else {
      // 默认使用RSS 2.0格式
      content = feed.rss2
      contentType = 'application/rss+xml'
    }

    return new NextResponse(content, {
      headers: {
        'Content-Type': `${contentType}; charset=utf-8`,
        'Cache-Control': CACHE_CONTROL,
        // 添加Link头，指示可用的其他格式
        'Link': [
          '</rss>; rel="alternate"; type="application/rss+xml"; title="RSS 2.0"',
          '</rss>; rel="alternate"; type="application/atom+xml"; title="Atom"',
          '</rss>; rel="alternate"; type="application/json"; title="JSON Feed"'
        ].join(', ')
      }
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Error generating RSS feed', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache'
      }
    })
  }
} 