-- Applied to the dedicated Dolce Look database. No fake initial review.
create table public.dolce_stock_review (id smallint primary key check(id=1),reviewed_at timestamptz);
insert into public.dolce_stock_review(id) values(1);
alter table public.dolce_stock_review enable row level security;
revoke all on public.dolce_stock_review from public,anon,authenticated;
grant select on public.dolce_stock_review to anon,authenticated;
grant update(reviewed_at) on public.dolce_stock_review to authenticated;
create policy "Public review timestamp" on public.dolce_stock_review for select to anon,authenticated using(true);
create policy "Admin confirms review" on public.dolce_stock_review for update to authenticated using(public.dolce_is_admin()) with check(public.dolce_is_admin());
create function public.dolce_stamp_stock_review() returns trigger language plpgsql security invoker set search_path='' as $$ begin new.reviewed_at:=statement_timestamp(); return new; end $$;
revoke all on function public.dolce_stamp_stock_review() from public,anon,authenticated;
create trigger stamp_stock_review before update on public.dolce_stock_review for each row execute function public.dolce_stamp_stock_review();
create function public.dolce_confirm_stock_review() returns timestamptz language plpgsql security invoker set search_path='' as $$
declare stamp timestamptz;
begin
 if auth.uid() is null or not public.dolce_is_admin() then raise exception 'Access denied'; end if;
 update public.dolce_stock_review set reviewed_at=statement_timestamp() where id=1 returning reviewed_at into stamp;
 if stamp is null then raise exception 'Review was not recorded'; end if;
 return stamp;
end $$;
revoke all on function public.dolce_confirm_stock_review() from public,anon;
grant execute on function public.dolce_confirm_stock_review() to authenticated;
create function public.dolce_get_stock_review() returns jsonb language sql stable security invoker set search_path='' as $$
 select jsonb_build_object('reviewed_at',reviewed_at,'server_now',statement_timestamp()) from public.dolce_stock_review where id=1
$$;
revoke all on function public.dolce_get_stock_review() from public;
grant execute on function public.dolce_get_stock_review() to anon,authenticated;
