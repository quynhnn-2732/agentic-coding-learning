import type {
  Kudo,
  KudosStats,
  SpotlightData,
  HeartToggleResponse,
  Hashtag,
  Department,
  KudoUser,
} from '@/libs/types/kudos'

// ── Mock data for development (replace with Supabase queries when DB is ready) ──

const MOCK_USER: KudoUser = {
  id: '1',
  name: 'Huỳnh Dương Xuân Nhật',
  avatar_url: null,
  department: 'CWAZVN',
  star_count: 5,
  title: 'Phòng Nhân',
}

const MOCK_RECEIVER: KudoUser = {
  id: '2',
  name: 'Huỳnh Dương Xuân',
  avatar_url: null,
  department: 'CWAZVN',
  star_count: 3,
  title: 'Phòng Nhân',
}

function createMockKudo(index: number): Kudo {
  return {
    id: `kudo-${index}`,
    sender: MOCK_USER,
    receiver: MOCK_RECEIVER,
    content:
      'Cảm ơn người em bình thường nhưng phí thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team, để luôn nhắc mình luôn phải nỗ lực hơn nữa trong công việc. <3 và cuộc sống...',
    category_tag: 'IDOL GIỚI TRẺ',
    hashtags: ['#Dedicated', '#Inspiring', '#Creative', '#Teamwork', '#Passionate'],
    images: [],
    video_url: null,
    heart_count: 1000,
    is_hearted: false,
    created_at: '2025-10-30T10:00:00Z',
  }
}

const MOCK_FEED: Kudo[] = Array.from({ length: 10 }, (_, i) => createMockKudo(i))

const MOCK_HIGHLIGHTED: Kudo[] = Array.from({ length: 5 }, (_, i) => createMockKudo(i + 100))

const MOCK_STATS: KudosStats = {
  received_count: 25,
  sent_count: 25,
  heart_count: 25,
  secret_box_opened: 25,
  secret_box_unopened: 25,
}

const MOCK_LEADERBOARD: KudoUser[] = Array.from({ length: 10 }, (_, i) => ({
  ...MOCK_USER,
  id: `leader-${i}`,
  name: 'Huỳnh Dương Xuân',
}))

const MOCK_SPOTLIGHT: SpotlightData = {
  users: Array.from({ length: 20 }, (_, i) => ({
    name: `Sunner ${i + 1}`,
    kudos_received: Math.floor(Math.random() * 50) + 1,
  })),
  ticker: [
    { time: '08:30', user_name: 'Nguyễn Bá Châu' },
    { time: '08:25', user_name: 'Huỳnh Dương' },
  ],
  total_kudos: 388,
}

const MOCK_HASHTAGS: Hashtag[] = [
  { id: '1', name: 'Dedicated' },
  { id: '2', name: 'Inspiring' },
  { id: '3', name: 'Creative' },
  { id: '4', name: 'Teamwork' },
]

const MOCK_DEPARTMENTS: Department[] = [
  { id: '1', name: 'CWAZVN' },
  { id: '2', name: 'D1VN' },
  { id: '3', name: 'ETSVN' },
]

// ── Query helpers (server + client compatible) ──

export async function fetchKudosFeed(
  page: number = 1,
  limit: number = 10
): Promise<{ data: Kudo[]; hasMore: boolean }> {
  // TODO: Replace with Supabase query:
  // const { data } = await supabase.from('kudos_feed_view').select().range(offset, offset+limit)
  const offset = (page - 1) * limit
  const data = MOCK_FEED.slice(offset, offset + limit)
  return { data, hasMore: offset + limit < MOCK_FEED.length }
}

export async function fetchHighlightedKudos(
  hashtag?: string,
  department?: string
): Promise<Kudo[]> {
  // TODO: Replace with Supabase query with filter params
  void hashtag
  void department
  return MOCK_HIGHLIGHTED
}

export async function fetchUserStats(): Promise<KudosStats> {
  // TODO: Replace with supabase.rpc('get_user_kudos_stats', { p_user_id })
  return MOCK_STATS
}

export async function fetchLeaderboard(limit: number = 10): Promise<KudoUser[]> {
  // TODO: Replace with supabase.rpc('get_leaderboard', { p_limit })
  return MOCK_LEADERBOARD.slice(0, limit)
}

export async function fetchSpotlight(): Promise<SpotlightData> {
  // TODO: Replace with supabase.from('kudos_spotlight_view').select()
  return MOCK_SPOTLIGHT
}

export async function toggleHeart(kudoId: string): Promise<HeartToggleResponse> {
  // TODO: Replace with supabase.from('kudo_hearts').upsert() / .delete()
  void kudoId
  return { hearted: true, heart_count: 1001 }
}

export async function fetchHashtags(): Promise<Hashtag[]> {
  // TODO: Replace with supabase.from('hashtags').select()
  return MOCK_HASHTAGS
}

export async function fetchDepartments(): Promise<Department[]> {
  // TODO: Replace with supabase.from('departments').select()
  return MOCK_DEPARTMENTS
}

export async function searchUsers(
  query: string
): Promise<{ id: string; name: string; avatar_url: string | null }[]> {
  // TODO: Replace with supabase.from('profiles').select().ilike('name', `%${query}%`)
  void query
  return MOCK_LEADERBOARD.map((u) => ({ id: u.id, name: u.name, avatar_url: u.avatar_url }))
}
