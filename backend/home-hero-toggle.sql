alter table public.dolce_store_settings add column hero_enabled boolean not null default true;
grant update(hero_enabled) on public.dolce_store_settings to anon,authenticated;
