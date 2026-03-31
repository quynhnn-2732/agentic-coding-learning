import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB' },
        { status: 400 }
      )
    }

    // TODO: Replace with actual Supabase Storage upload when configured
    // const supabase = await createClient()
    // const filename = `kudos/${crypto.randomUUID()}-${file.name}`
    // const { data, error } = await supabase.storage.from('images').upload(filename, file)
    // const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filename)

    const filename = `${crypto.randomUUID()}-${file.name}`
    const mockUrl = `/uploads/${filename}`

    return NextResponse.json({ url: mockUrl, filename: file.name })
  } catch {
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
