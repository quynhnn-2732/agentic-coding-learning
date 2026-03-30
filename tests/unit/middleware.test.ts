import { describe, it, expect, vi, beforeEach } from 'vitest'

// NextResponse.redirect returns a fake response with a cookies map
const mockRedirect = vi.fn((url: URL | string) => ({
  type: 'redirect',
  url: typeof url === 'string' ? url : url.toString(),
  cookies: { set: vi.fn(), getAll: vi.fn().mockReturnValue([]) },
}))
const mockNext = vi.fn(() => ({ type: 'next' }))

vi.mock('next/server', () => ({
  NextResponse: {
    redirect: mockRedirect,
    next: mockNext,
  },
}))

vi.mock('@/libs/supabase/middleware', () => ({
  createClient: vi.fn(),
}))

// Builds a supabaseResponse mock with cookies support
function makeSupabaseResponse(cookies: Array<{ name: string; value: string }> = []) {
  return {
    type: 'supabase-response',
    cookies: {
      getAll: vi.fn().mockReturnValue(cookies),
      set: vi.fn(),
    },
  }
}

function makeRequest(pathname: string) {
  return {
    nextUrl: { pathname },
    url: `http://localhost:3000${pathname}`,
    cookies: { getAll: () => [] },
    headers: new Headers(),
  } as never
}

describe('middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirects authenticated user on /login to /', async () => {
    const { createClient } = await import('@/libs/supabase/middleware')
    vi.mocked(createClient).mockReturnValue({
      supabase: { auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: '1' } } }) } },
      supabaseResponse: makeSupabaseResponse(),
    } as never)

    const { middleware } = await import('@/middleware')
    const response = await middleware(makeRequest('/login'))

    expect((response as { url: string }).url).toMatch(/http:\/\/localhost:3000\/?$/)
  })

  it('copies supabaseResponse cookies onto the redirect when authenticated user on /login', async () => {
    const sessionCookie = { name: 'sb-token', value: 'abc', path: '/' }
    const { createClient } = await import('@/libs/supabase/middleware')
    vi.mocked(createClient).mockReturnValue({
      supabase: { auth: { getUser: vi.fn().mockResolvedValue({ data: { user: { id: '1' } } }) } },
      supabaseResponse: makeSupabaseResponse([sessionCookie]),
    } as never)

    const { middleware } = await import('@/middleware')
    const response = await middleware(makeRequest('/login'))

    // cookies.set should have been called with the session cookie
    expect((response as { cookies: { set: ReturnType<typeof vi.fn> } }).cookies.set).toHaveBeenCalledWith(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie
    )
  })

  it('redirects unauthenticated user on / to /login', async () => {
    const { createClient } = await import('@/libs/supabase/middleware')
    vi.mocked(createClient).mockReturnValue({
      supabase: { auth: { getUser: vi.fn().mockResolvedValue({ data: { user: null } }) } },
      supabaseResponse: makeSupabaseResponse(),
    } as never)

    const { middleware } = await import('@/middleware')
    const response = await middleware(makeRequest('/'))

    expect((response as { url: string }).url).toContain('/login')
  })

  it('allows unauthenticated user through on /login', async () => {
    const { createClient } = await import('@/libs/supabase/middleware')
    const supabaseResponse = makeSupabaseResponse()
    vi.mocked(createClient).mockReturnValue({
      supabase: { auth: { getUser: vi.fn().mockResolvedValue({ data: { user: null } }) } },
      supabaseResponse,
    } as never)

    const { middleware } = await import('@/middleware')
    const response = await middleware(makeRequest('/login'))

    expect(response).toBe(supabaseResponse)
  })
})
