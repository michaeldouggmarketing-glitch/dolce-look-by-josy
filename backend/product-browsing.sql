-- Preserve the prior magazine and allow a staff-controlled presentation switch.
alter table public.dolce_products add column photos text[] not null default '{}';
alter table public.dolce_products add constraint dolce_photos_bounded check(cardinality(photos)<=12);
create table public.dolce_store_settings(id smallint primary key check(id=1),browse_mode text not null default 'shop' check(browse_mode in ('shop','magazine')));
insert into public.dolce_store_settings(id,browse_mode) values(1,'shop');
alter table public.dolce_store_settings enable row level security;
revoke all on public.dolce_store_settings from public,anon,authenticated;
grant select on public.dolce_store_settings to anon,authenticated;
grant update(browse_mode) on public.dolce_store_settings to authenticated;
create policy "Public browsing mode" on public.dolce_store_settings for select to anon,authenticated using(true);
create policy "Staff chooses browsing mode" on public.dolce_store_settings for update to authenticated using(public.dolce_is_admin()) with check(public.dolce_is_admin());
