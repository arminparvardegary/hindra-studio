-- Supabase Storage bucket setup for Works media uploads
-- Run this in Supabase SQL Editor

-- 1. Create the storage bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'works-media',
  'works-media',
  true,
  52428800, -- 50MB limit
  ARRAY['image/webp', 'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'video/mp4', 'video/quicktime', 'video/webm']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public read access to the bucket
CREATE POLICY "Public read access for works-media"
ON storage.objects
FOR SELECT
USING (bucket_id = 'works-media');

-- 3. Allow authenticated uploads (using anon key)
CREATE POLICY "Authenticated upload access for works-media"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'works-media');

-- 4. Allow authenticated updates
CREATE POLICY "Authenticated update access for works-media"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'works-media');

-- 5. Allow authenticated deletes
CREATE POLICY "Authenticated delete access for works-media"
ON storage.objects
FOR DELETE
USING (bucket_id = 'works-media');
