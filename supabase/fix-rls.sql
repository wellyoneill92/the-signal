-- Fix RLS policies: restrict write operations to service_role only
-- Run this in the Supabase SQL Editor

-- ============================================
-- DROP existing permissive policies
-- ============================================

-- Articles write policies (currently allow anyone)
drop policy if exists "Service role can insert articles" on articles;
drop policy if exists "Service role can update articles" on articles;
drop policy if exists "Service role can delete articles" on articles;

-- Feedback write policies (update/delete currently allow anyone)
drop policy if exists "Service role can update feedback" on feedback;
drop policy if exists "Service role can delete feedback" on feedback;

-- ============================================
-- CREATE restricted policies (service_role only)
-- ============================================

-- Articles: only service_role can insert/update/delete
create policy "Only service role can insert articles"
  on articles for insert
  with check (auth.role() = 'service_role');

create policy "Only service role can update articles"
  on articles for update
  using (auth.role() = 'service_role');

create policy "Only service role can delete articles"
  on articles for delete
  using (auth.role() = 'service_role');

-- Feedback: only service_role can update/delete (anon can still insert and read)
create policy "Only service role can update feedback"
  on feedback for update
  using (auth.role() = 'service_role');

create policy "Only service role can delete feedback"
  on feedback for delete
  using (auth.role() = 'service_role');
