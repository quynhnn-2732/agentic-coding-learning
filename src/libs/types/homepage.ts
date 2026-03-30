export interface Award {
  id: string
  slug: string
  name: string
  description: string
  imageUrl: string
}

export interface AwardDetail extends Award {
  quantity: number
  unit: 'Cá nhân' | 'Tập thể' | 'Đơn vị' | 'Cá nhân hoặc tập thể'
  prizeValue: string | { individual: string; team: string }
}

export interface CountdownState {
  days: number
  hours: number
  minutes: number
  isEventPast: boolean
}
