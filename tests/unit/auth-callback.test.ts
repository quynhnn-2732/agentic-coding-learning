import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock next/headers
vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue({
    getAll: vi.fn().mockReturnValue([]),
  }),
}))

// Mock @supabase/ssr — createServerClient returns a controllable auth client
const mockExchangeCodeForSession = vi.fn()
vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn((_url, _key, opts) => ({
    auth: {
      exchangeCodeForSession: async (code: string) => {
        // Simulate session cookies being written via the provided setAll callback
        opts.cookies.setAll([
          { name: 'sb-access-token', value: 'fake-token', options: { path: '/' } },
        ])
        return mockExchangeCodeForSession(code)
      },
    },
  })),
}))

// Mock NextResponse so we can inspect cookies set on it
vi.mock('next/server', () => {
  const makeFakeResponse = (url: string) => {
    const cookieMap = new Map<string, string>()
    return {
      type: 'redirect',
      url,
      cookies: {
        set: (name: string, value: string) => cookieMap.set(name, value),
        get: (name: string) => cookieMap.get(name),
        _map: cookieMap,
      },
    }
  }
  return {
    NextResponse: {
      redirect: vi.fn((url: string) => makeFakeResponse(url)),
    },
  }
})

describe('GET /auth/callback', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockExchangeCodeForSession.mockResolvedValue({
      data: { session: { access_token: 'tok' } },
      error: null,
    })
  })

  it('redirects to / and sets session cookie on valid code exchange', async () => {
    const { GET } = await import('@/app/auth/callback/route')
    const request = new Request('http://localhost:3000/auth/callback?code=valid-code')
    const response = await GET(request)

    expect((response as { type: string }).type).toBe('redirect')
    expect((response as { url: string }).url).toMatch(/http:\/\/localhost:3000\/?$/)
    // Session cookie must be forwarded onto the redirect response (not lost)
    expect((response as { cookies: { get: (k: string) => string } }).cookies.get('sb-access-token')).toBe('fake-token')
  })

  it('redirects to /login?error=auth_error when code is missing', async () => {
    const { GET } = await import('@/app/auth/callback/route')
    const request = new Request('http://localhost:3000/auth/callback')
    const response = await GET(request)

    expect((response as { url: string }).url).toContain('/login?error=auth_error')
  })

  it('redirects to /login?error when Supabase returns an error', async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      data: { session: null },
      error: { message: 'invalid_grant' },
    })

    const { GET } = await import('@/app/auth/callback/route')
    const request = new Request('http://localhost:3000/auth/callback?code=bad-code')
    const response = await GET(request)

    expect((response as { url: string }).url).toContain('/login?error=invalid_grant')
  })

  it('redirects to /login?error=session_not_created when session is null without error', async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      data: { session: null },
      error: null,
    })

    const { GET } = await import('@/app/auth/callback/route')
    const request = new Request('http://localhost:3000/auth/callback?code=pkce-mismatch')
    const response = await GET(request)

    expect((response as { url: string }).url).toContain('/login?error=session_not_created')
  })
})
