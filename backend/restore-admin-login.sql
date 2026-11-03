-- Re-enable login without deploying. Original accounts/passwords remain intact.
update dolce_private.presentation_access set enabled=false where id=true;
-- All temporary permissions are guarded by dolce_is_admin(); anon then loses Admin access.
