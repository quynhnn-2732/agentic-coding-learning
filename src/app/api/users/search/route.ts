import { NextRequest, NextResponse } from 'next/server'
import { searchUsers } from '@/libs/data/kudos-queries'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')

  if (!query || query.trim().length < 1) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required (min 1 character)' },
      { status: 400 }
    )
  }

  try {
    const users = await searchUsers(query.trim())
    return NextResponse.json(users)
  } catch {
    return NextResponse.json(
      { error: 'Failed to search users' },
      { status: 500 }
    )
  }
}
