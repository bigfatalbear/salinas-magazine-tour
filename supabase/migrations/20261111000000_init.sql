-- Salinas Magazine Tour — schema inicial
-- property 2dfce9de-de4b-57ae-a291-a170c20195cd

create extension if not exists pgcrypto;

create table if not exists public.editions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  edition_number integer not null unique check (edition_number > 0),
  published_at date not null default current_date,
  is_published boolean not null default false,
  cover_image_url text not null default '',
  cover_headline text not null default '',
  cover_highlights jsonb not null default '[]'::jsonb,
  backcover_title text not null default '',
  backcover_image_url text not null default '',
  backcover_content text not null default '',
  backcover_cta_links jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions(id) on delete cascade,
  title text not null,
  subtitle text not null default '',
  content text not null default '',
  category text not null check (category in ('Cultura', 'Gastronomia', 'História', 'Eventos')),
  author text not null default 'Redação Salinas Magazine',
  image_url text not null default '',
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.merchants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text not null default '',
  whatsapp text not null default '',
  maps_url text not null default '',
  opening_hours text not null default '',
  coupon_code text not null default '',
  logo_url text not null default '',
  plan_tier text not null default 'free' check (plan_tier in ('free', 'highlight', 'sponsor')),
  created_at timestamptz not null default now()
);

create table if not exists public.tourism_spots (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text not null default '',
  history_text text not null default '',
  location_name text not null default '',
  maps_url text not null default '',
  image_url text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.service_opportunities (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('job', 'freelancer')),
  title text not null,
  category text not null,
  description text not null default '',
  contact_whatsapp text not null default '',
  status text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.app_settings (
  id smallint primary key default 1 check (id = 1),
  storage_path text not null default 'C:\Users\Public\SalinasMagazineTour\data',
  deploy_target text not null default 'pwa' check (deploy_target in ('pwa', 'windows_exe')),
  ai_provider text not null default 'gemini' check (ai_provider in ('gemini', 'openai')),
  ai_api_key text not null default '',
  ai_model text not null default 'gemini-2.5-flash',
  updated_at timestamptz not null default now()
);

create index if not exists articles_edition_idx on public.articles (edition_id);
create index if not exists articles_featured_idx on public.articles (is_featured) where is_featured;
create index if not exists merchants_plan_idx on public.merchants (plan_tier);
create index if not exists opportunities_status_idx on public.service_opportunities (status, created_at desc);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists app_settings_touch on public.app_settings;
create trigger app_settings_touch
before update on public.app_settings
for each row execute function public.touch_updated_at();

insert into public.app_settings (id) values (1)
on conflict (id) do nothing;

alter table public.editions enable row level security;
alter table public.articles enable row level security;
alter table public.merchants enable row level security;
alter table public.tourism_spots enable row level security;
alter table public.service_opportunities enable row level security;
alter table public.app_settings enable row level security;

create policy "published editions are public"
on public.editions for select
to anon, authenticated
using (is_published);

create policy "admin manages editions"
on public.editions for all
to authenticated
using (true)
with check (true);

create policy "published articles are public"
on public.articles for select
to anon, authenticated
using (
  exists (
    select 1
    from public.editions
    where editions.id = articles.edition_id
      and editions.is_published
  )
);

create policy "admin manages articles"
on public.articles for all
to authenticated
using (true)
with check (true);

create policy "merchants are public"
on public.merchants for select
to anon, authenticated
using (true);

create policy "admin manages merchants"
on public.merchants for all
to authenticated
using (true)
with check (true);

create policy "tourism spots are public"
on public.tourism_spots for select
to anon, authenticated
using (true);

create policy "admin manages tourism spots"
on public.tourism_spots for all
to authenticated
using (true)
with check (true);

create policy "open opportunities are public"
on public.service_opportunities for select
to anon, authenticated
using (status = 'open');

create policy "admin manages opportunities"
on public.service_opportunities for all
to authenticated
using (true)
with check (true);

create policy "admin manages settings"
on public.app_settings for all
to authenticated
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media is public"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'media');

create policy "admin uploads media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'media');

create policy "admin updates media"
on storage.objects for update
to authenticated
using (bucket_id = 'media')
with check (bucket_id = 'media');

create policy "admin deletes media"
on storage.objects for delete
to authenticated
using (bucket_id = 'media');
