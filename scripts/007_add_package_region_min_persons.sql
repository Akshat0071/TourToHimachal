-- Add region and min_persons to packages table
ALTER TABLE packages
  ADD COLUMN IF NOT EXISTS region TEXT,
  ADD COLUMN IF NOT EXISTS min_persons INTEGER;

-- Optional indexes if needed later (commented out)
-- CREATE INDEX IF NOT EXISTS idx_packages_region ON packages(region);
