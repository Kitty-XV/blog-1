import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'
import { getLocalViews, updateLocalViews } from '@/lib/storage'

export async function POST(
  request: NextRequest,
  context: any
): Promise<Response> {
  console.log('POST request received for slug:', context.params.slug)
  console.log('Environment:', process.env.VERCEL_ENV)
  console.log('KV URL:', process.env.KV_REST_API_URL)
  
  const slug = await Promise.resolve(context.params.slug)

  if (!slug) {
    console.log('No slug provided')
    return new NextResponse('Slug not found', { status: 400 })
  }

  try {
    let views: number
    
    if (process.env.VERCEL_ENV === 'development' || !process.env.KV_REST_API_URL) {
      console.log('Using local storage for views')
      views = updateLocalViews(slug)
      console.log('Updated views:', views)
    } else {
      console.log('Using Vercel KV for views')
      const currentViews = await kv.get<number>(`views:${slug}`) || 0
      views = Math.round(currentViews + 0.5)
      await kv.set(`views:${slug}`, views)
      console.log('Updated views:', views)
    }
    
    return NextResponse.json({ views })
  } catch (error) {
    console.error('Error incrementing views:', error)
    const fallbackViews = getLocalViews(slug)
    console.log('Fallback views:', fallbackViews)
    return NextResponse.json({ views: fallbackViews })
  }
}

export async function GET(
  request: NextRequest,
  context: any
): Promise<Response> {
  console.log('GET request received for slug:', context.params.slug)
  console.log('Environment:', process.env.VERCEL_ENV)
  
  const slug = await Promise.resolve(context.params.slug)

  if (!slug) {
    console.log('No slug provided')
    return new NextResponse('Slug not found', { status: 400 })
  }

  try {
    let views: number
    
    if (process.env.VERCEL_ENV === 'development' || !process.env.KV_REST_API_URL) {
      console.log('Using local storage for views')
      views = getLocalViews(slug)
      console.log('Retrieved views:', views)
    } else {
      console.log('Using Vercel KV for views')
      views = await kv.get<number>(`views:${slug}`) || 0
      console.log('Retrieved views:', views)
    }
    
    return NextResponse.json({ views })
  } catch (error) {
    console.error('Error getting views:', error)
    const fallbackViews = getLocalViews(slug)
    console.log('Fallback views:', fallbackViews)
    return NextResponse.json({ views: fallbackViews })
  }
} 