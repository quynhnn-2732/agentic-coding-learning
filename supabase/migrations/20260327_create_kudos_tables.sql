-- Sun* Kudos Live Board — Database Schema
-- Tables, RLS policies, views, and RPCs for the Kudos feature

-- ============================================================
-- Tables
-- ============================================================

CREATE TABLE IF NOT EXISTS hashtags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kudos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id),
  receiver_id UUID NOT NULL REFERENCES auth.users(id),
  content TEXT NOT NULL,
  category_tag TEXT NOT NULL DEFAULT '',
  video_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kudo_hashtags (
  kudo_id UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
  hashtag_id UUID NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
  PRIMARY KEY (kudo_id, hashtag_id)
);

CREATE TABLE IF NOT EXISTS kudo_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kudo_id UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS kudo_hearts (
  kudo_id UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (kudo_id, user_id)
);

CREATE TABLE IF NOT EXISTS secret_boxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'unopened' CHECK (status IN ('opened', 'unopened')),
  content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_kudos_created_at ON kudos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_kudos_sender ON kudos(sender_id);
CREATE INDEX IF NOT EXISTS idx_kudos_receiver ON kudos(receiver_id);
CREATE INDEX IF NOT EXISTS idx_kudo_hearts_kudo ON kudo_hearts(kudo_id);
CREATE INDEX IF NOT EXISTS idx_kudo_hearts_user ON kudo_hearts(user_id);
CREATE INDEX IF NOT EXISTS idx_secret_boxes_user ON secret_boxes(user_id);

-- ============================================================
-- RLS Policies
-- ============================================================

ALTER TABLE kudos ENABLE ROW LEVEL SECURITY;
ALTER TABLE kudo_hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE kudo_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE kudo_hearts ENABLE ROW LEVEL SECURITY;
ALTER TABLE hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE secret_boxes ENABLE ROW LEVEL SECURITY;

-- Kudos: any authenticated user can read; sender can insert
CREATE POLICY "kudos_select" ON kudos FOR SELECT TO authenticated USING (true);
CREATE POLICY "kudos_insert" ON kudos FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);

-- Kudo hashtags/images: readable by all auth users
CREATE POLICY "kudo_hashtags_select" ON kudo_hashtags FOR SELECT TO authenticated USING (true);
CREATE POLICY "kudo_images_select" ON kudo_images FOR SELECT TO authenticated USING (true);

-- Hearts: one per user per kudo; user can insert/delete own hearts
CREATE POLICY "hearts_select" ON kudo_hearts FOR SELECT TO authenticated USING (true);
CREATE POLICY "hearts_insert" ON kudo_hearts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "hearts_delete" ON kudo_hearts FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Hashtags/departments: readable by all
CREATE POLICY "hashtags_select" ON hashtags FOR SELECT TO authenticated USING (true);
CREATE POLICY "departments_select" ON departments FOR SELECT TO authenticated USING (true);

-- Secret boxes: user can only see/update their own
CREATE POLICY "secret_boxes_select" ON secret_boxes FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "secret_boxes_update" ON secret_boxes FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- ============================================================
-- Views
-- ============================================================

-- Feed view: joins kudos with sender, receiver, heart count, images, hashtags
CREATE OR REPLACE VIEW kudos_feed_view AS
SELECT
  k.id,
  k.content,
  k.category_tag,
  k.video_url,
  k.created_at,
  jsonb_build_object(
    'id', k.sender_id,
    'name', COALESCE(s.raw_user_meta_data->>'full_name', s.email),
    'avatar_url', s.raw_user_meta_data->>'avatar_url',
    'department', COALESCE(s.raw_user_meta_data->>'department', ''),
    'star_count', COALESCE((s.raw_user_meta_data->>'star_count')::int, 0),
    'title', s.raw_user_meta_data->>'title'
  ) AS sender,
  jsonb_build_object(
    'id', k.receiver_id,
    'name', COALESCE(r.raw_user_meta_data->>'full_name', r.email),
    'avatar_url', r.raw_user_meta_data->>'avatar_url',
    'department', COALESCE(r.raw_user_meta_data->>'department', ''),
    'star_count', COALESCE((r.raw_user_meta_data->>'star_count')::int, 0),
    'title', r.raw_user_meta_data->>'title'
  ) AS receiver,
  COALESCE(hc.heart_count, 0) AS heart_count,
  COALESCE(img.images, '[]'::jsonb) AS images,
  COALESCE(ht.hashtags, '[]'::jsonb) AS hashtags
FROM kudos k
LEFT JOIN auth.users s ON s.id = k.sender_id
LEFT JOIN auth.users r ON r.id = k.receiver_id
LEFT JOIN LATERAL (
  SELECT COUNT(*)::int AS heart_count FROM kudo_hearts WHERE kudo_id = k.id
) hc ON true
LEFT JOIN LATERAL (
  SELECT jsonb_agg(ki.image_url ORDER BY ki.sort_order) AS images
  FROM kudo_images ki WHERE ki.kudo_id = k.id
) img ON true
LEFT JOIN LATERAL (
  SELECT jsonb_agg(h.name) AS hashtags
  FROM kudo_hashtags kh JOIN hashtags h ON h.id = kh.hashtag_id
  WHERE kh.kudo_id = k.id
) ht ON true
ORDER BY k.created_at DESC;

-- ============================================================
-- RPCs
-- ============================================================

-- Get user kudos stats
CREATE OR REPLACE FUNCTION get_user_kudos_stats(p_user_id UUID)
RETURNS JSON AS $$
  SELECT json_build_object(
    'received_count', (SELECT COUNT(*) FROM kudos WHERE receiver_id = p_user_id),
    'sent_count', (SELECT COUNT(*) FROM kudos WHERE sender_id = p_user_id),
    'heart_count', (SELECT COUNT(*) FROM kudo_hearts kh JOIN kudos k ON k.id = kh.kudo_id WHERE k.receiver_id = p_user_id),
    'secret_box_opened', (SELECT COUNT(*) FROM secret_boxes WHERE user_id = p_user_id AND status = 'opened'),
    'secret_box_unopened', (SELECT COUNT(*) FROM secret_boxes WHERE user_id = p_user_id AND status = 'unopened')
  );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Get leaderboard (top N users who received gifts most recently)
CREATE OR REPLACE FUNCTION get_leaderboard(p_limit INT DEFAULT 10)
RETURNS JSON AS $$
  SELECT json_agg(row_to_json(t))
  FROM (
    SELECT
      sb.user_id AS id,
      COALESCE(u.raw_user_meta_data->>'full_name', u.email) AS name,
      u.raw_user_meta_data->>'avatar_url' AS avatar_url,
      COALESCE(u.raw_user_meta_data->>'department', '') AS department,
      COALESCE((u.raw_user_meta_data->>'star_count')::int, 0) AS star_count,
      u.raw_user_meta_data->>'title' AS title,
      sb.content AS gift_description
    FROM secret_boxes sb
    JOIN auth.users u ON u.id = sb.user_id
    WHERE sb.status = 'opened'
    ORDER BY sb.created_at DESC
    LIMIT p_limit
  ) t;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;
