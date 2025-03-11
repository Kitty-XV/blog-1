import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 测试 KV 连接
    await kv.set('test-key', 'test-value')
    const value = await kv.get('test-key')
    
    return NextResponse.json({
      status: 'success',
      connected: true,
      value,
      kvUrl: process.env.KV_REST_API_URL ? 'configured' : 'not configured'
    })
  } catch (error) {
    console.error('KV connection test failed:', error)
    return NextResponse.json({
      status: 'error',
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      kvUrl: process.env.KV_REST_API_URL ? 'configured' : 'not configured'
    }, { status: 500 })
  }
} 