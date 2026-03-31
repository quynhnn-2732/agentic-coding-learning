import { NextResponse } from 'next/server'
import { fetchHashtags } from '@/libs/data/kudos-queries'

export async function GET() {
  try {
    const hashtags = await fetchHashtags()
    return NextResponse.json(hashtags, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' },
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch hashtags' },
      { status: 500 }
    )
  }
}
