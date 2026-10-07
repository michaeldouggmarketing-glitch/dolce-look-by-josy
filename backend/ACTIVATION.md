# Production activation — 2026-10-07
Dedicated Supabase project `bfzfkrpcozeuzcmwbsxc`, organization Dolce Look by Josy, São Paulo region, free tier. Schema applied, RLS enabled on public tables, protected private administrator membership, storage policies, stock0/1 checks, versioned sale RPC, audit triggers, Realtime revision signal. All nine real pieces published after explicit owner confirmation. Prices and sizes remain unset.

## First administrator
Authorized e-mail: michaeldouggmarketing@gmail.com. A private one-use setup link is handed to the owner outside source. Token is 384 random bits, only SHA256 stored in private database, seven-day expiry. Fragment is removed from address bar on opening. Owner enters password directly in Admin. Edge function validates and atomically consumes token, creates the authorized confirmed Auth user, then inserts protected membership. No role derives from user metadata, no service role key enters browser. Claim/finish/retry RPCs executable only by service_role. Edge function has custom token authentication and therefore disables gateway JWT verification deliberately. Setup link is not included in the repository/ZIP.

Regular Admin uses Supabase password authentication plus protected membership RPC/RLS. Owner defined their password and confirmed email/admin membership was verified on 2026-10-07. Authenticated UI editing/sale/upload have NOT yet been exercised. Configure recovery and additional staff accounts privately before final client handover. Do not send a new invitation or recovery email without the owner's instruction.

## Environment
`.env.local` holds only project URL and publishable key. Both variables configured in Vercel for production, preview and development. Source bundle omits env files, contains .env.example. Backend secrets remain server-side within Supabase Edge runtime.

## Verification
Real anonymous API returns nine available items. Anonymous write query affects no rows, stock remains available. Browser integration passes on desktop1440 and mobile390. Independent Collection and Product browser pages observed sale removal (9→8 and unavailable product page), restoration (8→9) without page reload, with no JS errors. Test conducted by database operator changes; the Admin button itself still requires owner authentication to be exercised. Realtime/polling auto-refresh observed; isolated disconnection/fallback timing and concurrent authenticated sell attempts not yet exercised. Test piece restored, all nine available.

Security advisor warned about authenticated SECURITY DEFINER dolce_is_admin: intentional boolean membership helper, fixed empty search_path, no ability to modify membership. Anonymous execute revoked explicitly after checking Supabase default grants. Remediation reference: https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable

Temporary test-admin bootstrap was blocked by automatic review; no test account was created, temporary setup row removed. Do not retry it without explicit authorization.
