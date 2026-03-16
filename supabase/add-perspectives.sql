-- Add left/right perspective columns and source links to articles table
-- Run this in the Supabase SQL Editor

alter table articles
  add column if not exists perspective_left text,
  add column if not exists perspective_right text,
  add column if not exists source_links jsonb default '[]'::jsonb,
  add column if not exists source_links_left jsonb default '[]'::jsonb,
  add column if not exists source_links_right jsonb default '[]'::jsonb;
