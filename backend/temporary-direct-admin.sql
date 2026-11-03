create table dolce_private.presentation_access(id boolean primary key default true check(id), enabled boolean not null default false);
insert into dolce_private.presentation_access values(true,true);
revoke all on dolce_private.presentation_access from public,anon,authenticated;
create or replace function public.dolce_is_admin() returns boolean language sql stable security definer set search_path='' as $$ select coalesce((select enabled from dolce_private.presentation_access where id),false) or exists(select 1 from dolce_private.admins where user_id=auth.uid()) $$;
grant execute on function public.dolce_is_admin() to anon;
alter policy "Admin reads all" on public.dolce_products to anon,authenticated;
alter policy "Admin inserts" on public.dolce_products to anon,authenticated;
alter policy "Admin updates" on public.dolce_products to anon,authenticated;
alter policy "Admin deletes" on public.dolce_products to anon,authenticated;
alter policy "Admin history" on public.dolce_audit to anon,authenticated;
alter policy "Admin confirms review" on public.dolce_stock_review to anon,authenticated;
alter policy "Staff chooses browsing mode" on public.dolce_store_settings to anon,authenticated;
alter policy "Admin uploads Dolce images" on storage.objects to anon,authenticated;
alter policy "Admin manages Dolce images" on storage.objects to anon,authenticated;
grant insert,update,delete on public.dolce_products to anon;
grant usage,select on sequence public.dolce_products_id_seq to anon;
grant select on public.dolce_audit to anon;
grant update(reviewed_at) on public.dolce_stock_review to anon;
grant update(browse_mode) on public.dolce_store_settings to anon;
grant execute on function public.dolce_set_status(bigint,bigint,text),public.dolce_set_size_stock(bigint,bigint,text,boolean),public.dolce_confirm_stock_review() to anon;
create or replace function public.dolce_confirm_stock_review() returns timestamptz language plpgsql security invoker set search_path='' as $$
declare stamp timestamptz;
begin
 if not public.dolce_is_admin() then raise exception 'Access denied'; end if;
 update public.dolce_stock_review set reviewed_at=statement_timestamp() where id=1 returning reviewed_at into stamp;
 if stamp is null then raise exception 'Review was not recorded'; end if;
 return stamp;
end $$;