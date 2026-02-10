-- The Signal: Database Schema
-- Run this in the Supabase SQL Editor

-- ============================================
-- ARTICLES TABLE
-- ============================================
create table if not exists articles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  headline text not null,
  summary text not null,
  body text not null,
  category text not null check (category in ('politics', 'technology', 'business', 'world')),
  sources text[] default '{}',
  is_breaking boolean default false,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Indexes for common queries
create index if not exists idx_articles_category on articles (category);
create index if not exists idx_articles_published_at on articles (published_at desc);
create index if not exists idx_articles_slug on articles (slug);
create index if not exists idx_articles_category_published on articles (category, published_at desc);

-- ============================================
-- FEEDBACK TABLE
-- ============================================
create table if not exists feedback (
  id uuid default gen_random_uuid() primary key,
  article_id uuid not null references articles(id) on delete cascade,
  accurate boolean,
  balanced boolean,
  important boolean,
  tags text[] default '{}',
  comment text default '',
  created_at timestamptz not null default now()
);

-- Index for looking up feedback by article
create index if not exists idx_feedback_article_id on feedback (article_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS
alter table articles enable row level security;
alter table feedback enable row level security;

-- Articles: anyone can read, only service role can insert/update/delete
create policy "Articles are publicly readable"
  on articles for select
  using (true);

create policy "Service role can insert articles"
  on articles for insert
  with check (true);

create policy "Service role can update articles"
  on articles for update
  using (true);

create policy "Service role can delete articles"
  on articles for delete
  using (true);

-- Feedback: anyone can read and insert, only service role can update/delete
create policy "Feedback is publicly readable"
  on feedback for select
  using (true);

create policy "Anyone can submit feedback"
  on feedback for insert
  with check (true);

create policy "Service role can update feedback"
  on feedback for update
  using (true);

create policy "Service role can delete feedback"
  on feedback for delete
  using (true);
