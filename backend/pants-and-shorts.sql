begin;
alter table public.dolce_products drop constraint dolce_products_type_check;
alter table public.dolce_products add constraint dolce_products_type_check check(type in ('Camisas','Blusas','Conjuntos','Vestidos','Calças','Shorts'));
commit;
