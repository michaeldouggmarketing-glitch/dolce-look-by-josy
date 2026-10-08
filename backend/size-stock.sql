begin;
alter table public.dolce_products add column if not exists size_stock jsonb not null default '{"P":true,"M":true,"G":true,"GG":true}'::jsonb;
update public.dolce_products set size_stock=case when status='sold' then '{"P":false,"M":false,"G":false,"GG":false}'::jsonb when size in ('P','M','G','GG') then jsonb_build_object('P',size='P','M',size='M','G',size='G','GG',size='GG') else size_stock end;
create or replace function dolce_private.before_product() returns trigger language plpgsql set search_path='' as $$ begin
 if jsonb_typeof(new.size_stock)<>'object' or (select count(*) from jsonb_object_keys(new.size_stock))<>4 or not(new.size_stock ?& array['P','M','G','GG']) or exists(select 1 from jsonb_each(new.size_stock) where jsonb_typeof(value)<>'boolean') then raise exception 'Invalid size stock'; end if;
 if new.status='sold' then new.size_stock:='{"P":false,"M":false,"G":false,"GG":false}'::jsonb; end if;
 if new.status='available' and not exists(select 1 from jsonb_each(new.size_stock) where value='true'::jsonb) then new.status:='sold'; end if;
 new.stock:=case when new.status='available' then 1 else 0 end;
 new.updated_at:=now();
 if TG_OP='UPDATE' then new.version:=old.version+1; end if;
 new.sold_at:=case when new.status='sold' then coalesce(new.sold_at,now()) else null end;
 return new;
end $$;
create or replace function public.dolce_set_size_stock(product_id bigint,expected_version bigint,garment_size text,is_available boolean) returns void language plpgsql security invoker set search_path='' as $$ begin
 if not public.dolce_is_admin() then raise exception 'Access denied'; end if;
 if garment_size not in ('P','M','G','GG') or is_available is null then raise exception 'Invalid size'; end if;
 update public.dolce_products set size_stock=jsonb_set(size_stock,array[garment_size],to_jsonb(is_available)),status=case when is_available and status='sold' then 'available' else status end where id=product_id and version=expected_version;
 if not found then raise exception 'Product changed; refresh and retry'; end if;
end $$;
revoke all on function public.dolce_set_size_stock(bigint,bigint,text,boolean) from public,anon;
grant execute on function public.dolce_set_size_stock(bigint,bigint,text,boolean) to authenticated;
create or replace function public.dolce_set_status(product_id bigint,expected_version bigint,next_status text) returns void language plpgsql security invoker set search_path='' as $$ begin
 if not public.dolce_is_admin() then raise exception 'Access denied'; end if;
 if next_status not in ('available','sold','hidden') then raise exception 'Invalid status'; end if;
 update public.dolce_products set status=next_status,size_stock=case when next_status='available' and status='sold' then '{"P":true,"M":true,"G":true,"GG":true}'::jsonb else size_stock end where id=product_id and version=expected_version and (next_status<>'sold' or status='available');
 if not found then raise exception 'Product changed; refresh and retry'; end if;
end $$;
create or replace function dolce_private.after_product() returns trigger language plpgsql security definer set search_path='' as $$ begin
 insert into public.dolce_audit(product_id,actor,action) values(coalesce(new.id,old.id),auth.uid(),case when TG_OP='UPDATE' and old.size_stock is distinct from new.size_stock then old.status||' → '||new.status||' · tamanhos: '||new.size_stock::text when TG_OP='UPDATE' then old.status||' → '||new.status else TG_OP end);
 update public.dolce_inventory_revision set revision=revision+1 where id=1;
 return coalesce(new,old);
end $$;
commit;
