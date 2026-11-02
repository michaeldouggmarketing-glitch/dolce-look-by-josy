-- Existing modes remain valid and available. Activation is a separate staff action.
alter table public.dolce_store_settings drop constraint dolce_store_settings_browse_mode_check;
alter table public.dolce_store_settings add constraint dolce_store_settings_browse_mode_check check(browse_mode in ('shop','magazine','magazine-site'));
