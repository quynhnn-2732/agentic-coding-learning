import { z } from 'zod'

const kudoUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar_url: z.string().nullable(),
  department: z.string(),
  star_count: z.number(),
  title: z.string().nullable(),
})

export const kudoSchema = z.object({
  id: z.string(),
  sender: kudoUserSchema,
  receiver: kudoUserSchema,
  content: z.string(),
  category_tag: z.string(),
  hashtags: z.array(z.string()),
  images: z.array(z.string()),
  video_url: z.string().nullable(),
  heart_count: z.number(),
  is_hearted: z.boolean(),
  created_at: z.string(),
})

export const kudosFeedResponseSchema = z.array(kudoSchema)

export const heartToggleResponseSchema = z.object({
  hearted: z.boolean(),
  heart_count: z.number(),
})

export const kudosStatsSchema = z.object({
  received_count: z.number(),
  sent_count: z.number(),
  heart_count: z.number(),
  secret_box_opened: z.number(),
  secret_box_unopened: z.number(),
})

export const leaderboardEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar_url: z.string().nullable(),
  department: z.string(),
  star_count: z.number(),
  title: z.string().nullable(),
  gift_description: z.string().nullable(),
})

export const leaderboardResponseSchema = z.array(leaderboardEntrySchema)

const spotlightUserSchema = z.object({
  name: z.string(),
  kudos_received: z.number(),
})

const tickerEntrySchema = z.object({
  time: z.string(),
  user_name: z.string(),
})

export const spotlightDataSchema = z.object({
  users: z.array(spotlightUserSchema),
  ticker: z.array(tickerEntrySchema),
  total_kudos: z.number(),
})

export const hashtagSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const departmentSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const createKudoSchema = z.object({
  recipient_id: z.string().min(1, 'Người nhận là bắt buộc'),
  title: z.string().min(1, 'Danh hiệu là bắt buộc').max(200, 'Danh hiệu tối đa 200 ký tự'),
  body: z.string().min(1, 'Nội dung là bắt buộc').max(5000, 'Nội dung tối đa 5000 ký tự'),
  hashtag_ids: z.array(z.string()).min(1, 'Chọn ít nhất 1 hashtag').max(5, 'Tối đa 5 hashtag'),
  image_urls: z.array(z.string().url()).max(5, 'Tối đa 5 ảnh').default([]),
  is_anonymous: z.boolean().default(false),
})
