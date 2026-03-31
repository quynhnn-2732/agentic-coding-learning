export interface KudoUser {
  id: string
  name: string
  avatar_url: string | null
  department: string
  star_count: number
  title: string | null
}

export interface Kudo {
  id: string
  sender: KudoUser
  receiver: KudoUser
  content: string
  category_tag: string
  hashtags: string[]
  images: string[]
  video_url: string | null
  heart_count: number
  is_hearted: boolean
  created_at: string
}

export interface KudosStats {
  received_count: number
  sent_count: number
  heart_count: number
  secret_box_opened: number
  secret_box_unopened: number
}

export interface SecretBox {
  id: string
  user_id: string
  status: 'opened' | 'unopened'
  content: string | null
}

export interface Hashtag {
  id: string
  name: string
}

export interface Department {
  id: string
  name: string
}

export interface SpotlightUser {
  name: string
  kudos_received: number
}

export interface TickerEntry {
  time: string
  user_name: string
}

export interface SpotlightData {
  users: SpotlightUser[]
  ticker: TickerEntry[]
  total_kudos: number
}

export interface HeartToggleResponse {
  hearted: boolean
  heart_count: number
}

export interface CreateKudoPayload {
  recipient_id: string
  title: string
  body: string
  hashtag_ids: string[]
  image_urls: string[]
  is_anonymous: boolean
}

export interface KudoFormState {
  recipient: KudoUser | null
  title: string
  body: string
  selectedHashtags: Hashtag[]
  images: { url: string; filename: string }[]
  isAnonymous: boolean
  isSubmitting: boolean
  errors: Partial<Record<'recipient' | 'title' | 'body' | 'hashtags', string>>
}
