import { NextResponse } from 'next/server'
import { getAllPosts, getAllTags } from '@/lib/posts'

export async function GET() {
  try {
    const posts = await getAllPosts()
    const tags = await getAllTags()
    
    return NextResponse.json({
      posts,
      tags,
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
} 