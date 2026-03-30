export interface AuthUser {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  provider: 'google'
  created_at: string
  department?: string
  star_count?: number
  title?: string
}

export interface AuthError {
  message: string
  code?: string
}

export type Locale = 'vi' | 'en'
