import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock next/headers — cookies() is called at route-handler time
vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue({
    getAll: vi.fn().mockReturnValue([]),
  }),
}))

// Mock @supabase/ssr — createServerClient wires setAll into the provided opts
const mockExchangeCodeForSession = vi.fn()
vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn((_url, _key, opts) => ({
    auth: {
      exchangeCodeForSession: async (code: string) => {
        // Simulate session cookies being written to whatever response is provided
        opts.cookies.setAll([
          { name: 'sb-access-token', value: 'tok', options: { path: '/' } },
        ])
        return mockExchangeCodeForSession(code)
      },
    },
  })),
}))

// Mock NextResponse with a cookie-aware fake response
vi.mock('next/server', () => {
  const makeResponse = (url: string) => {
    const jar = new Map<string, string>()
    return {
      type: 'redirect',
      url,
      cookies: {
        set: (name: string, value: string) => jar.set(name, value),
        get: (name: string) => jar.get(name),
      },
    }
  }
  return {
    NextResponse: {
      redirect: vi.fn((url: string) => makeResponse(url)),
    },
  }
})

describe('Auth flow integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
    mockExchangeCodeForSession.mockResolvedValue({
      data: { session: { access_token: 'tok' } },
      error: null,
    })
  })

  it('callback route: full success flow redirects to / with session cookie', async () => {
    const { GET } = await import('@/app/auth/callback/route')
    const res = await GET(new Request('http://localhost:3000/auth/callback?code=abc123'))

    expect((res as { url: string }).url).toMatch(/http:\/\/localhost:3000\/?$/)
    // Session cookie must be on the redirect response itself (not lost)
    expect((res as { cookies: { get: (k: string) => string } }).cookies.get('sb-access-token')).toBe('tok')
  })

  it('callback route: missing code → redirect with error', async () => {
    const { GET } = await import('@/app/auth/callback/route')
    const res = await GET(new Request('http://localhost:3000/auth/callback'))

    expect((res as { url: string }).url).toContain('error=auth_error')
  })

  it('callback route: exchange failure → redirect with encoded error', async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      data: { session: null },
      error: { message: 'Token expired' },
    })

    const { GET } = await import('@/app/auth/callback/route')
    const res = await GET(new Request('http://localhost:3000/auth/callback?code=stale'))

    expect((res as { url: string }).url).toContain('Token%20expired')
  })

  it('callback route: null session without error → redirect with session_not_created', async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      data: { session: null },
      error: null,
    })

    const { GET } = await import('@/app/auth/callback/route')
    const res = await GET(new Request('http://localhost:3000/auth/callback?code=pkce-fail'))

    expect((res as { url: string }).url).toContain('session_not_created')
  })
})
