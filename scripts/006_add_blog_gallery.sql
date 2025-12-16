-- Add gallery column to blogs to support multiple images
ALTER TABLE IF EXISTS blogs
ADD COLUMN IF NOT EXISTS gallery TEXT[];
