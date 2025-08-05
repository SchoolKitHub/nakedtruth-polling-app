-- NakedTruth Polling App Database Schema
-- Run this in your Supabase SQL Editor

-- Create responses table for poll submissions
CREATE TABLE IF NOT EXISTS responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  presidential_candidate TEXT NOT NULL,
  key_issues TEXT[] NOT NULL,
  demographics JSONB NOT NULL,
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create results_cache table for aggregated data (optional for performance)
CREATE TABLE IF NOT EXISTS results_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  results JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE results_cache ENABLE ROW LEVEL SECURITY;

-- Create policies for responses table
-- Allow anonymous inserts (for poll submissions)
CREATE POLICY "Allow anonymous poll submissions" ON responses
  FOR INSERT WITH CHECK (true);

-- Allow reads for aggregated data (no personal info exposed)
CREATE POLICY "Allow reading responses for aggregation" ON responses
  FOR SELECT USING (true);

-- Create policies for results_cache table
CREATE POLICY "Allow reading cached results" ON results_cache
  FOR SELECT USING (true);

-- Optional: Create policy for updating cache (if you implement auto-refresh)
CREATE POLICY "Allow updating results cache" ON results_cache
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow updating existing cache" ON results_cache
  FOR UPDATE USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_responses_created_at ON responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_responses_ip_hash ON responses(ip_hash);
CREATE INDEX IF NOT EXISTS idx_responses_presidential_candidate ON responses(presidential_candidate);

-- Create a function to get aggregated results (optional)
CREATE OR REPLACE FUNCTION get_poll_results()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'presidential_candidates', (
      SELECT jsonb_object_agg(presidential_candidate, count)
      FROM (
        SELECT presidential_candidate, COUNT(*) as count
        FROM responses
        GROUP BY presidential_candidate
      ) pc
    ),
    'key_issues', (
      SELECT jsonb_object_agg(issue, count)
      FROM (
        SELECT UNNEST(key_issues) as issue, COUNT(*) as count
        FROM responses
        GROUP BY issue
      ) ki
    ),
    'demographics', jsonb_build_object(
      'age_groups', (
        SELECT jsonb_object_agg(age_group, count)
        FROM (
          SELECT demographics->>'age_group' as age_group, COUNT(*) as count
          FROM responses
          WHERE demographics->>'age_group' IS NOT NULL
          GROUP BY demographics->>'age_group'
        ) ag
      ),
      'regions', (
        SELECT jsonb_object_agg(region, count)
        FROM (
          SELECT demographics->>'region' as region, COUNT(*) as count
          FROM responses
          WHERE demographics->>'region' IS NOT NULL
          GROUP BY demographics->>'region'
        ) r
      ),
      'genders', (
        SELECT jsonb_object_agg(gender, count)
        FROM (
          SELECT demographics->>'gender' as gender, COUNT(*) as count
          FROM responses
          WHERE demographics->>'gender' IS NOT NULL
          GROUP BY demographics->>'gender'
        ) g
      )
    ),
    'total_responses', (SELECT COUNT(*) FROM responses)
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_poll_results() TO anon;
GRANT EXECUTE ON FUNCTION get_poll_results() TO authenticated; 