import { NextRequest, NextResponse } from 'next/server'
import { createKudoSchema } from '@/libs/validations/kudos-schemas'
import { createClient } from '@/libs/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const result = createKudoSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    // TODO: Replace with actual Supabase insert when tables exist
    // const { data, error } = await supabase.from('kudos').insert({
    //   sender_id: user.id,
    //   ...result.data,
    // }).select().single()

    return NextResponse.json(
      { id: crypto.randomUUID(), ...result.data, sender_id: user.id },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Failed to create kudo' },
      { status: 500 }
    )
  }
}
