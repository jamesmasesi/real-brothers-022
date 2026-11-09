-- REAL BROTHERS 022 v2, FILE 7: official balances brought forward at 31 October 2026.
-- Run after 01 to 06. Safe to run more than once (it never overwrites figures you have since edited).
--
-- WHY: the Treasurer's sheet holds the official balances, including 2025 arrears and attendance details the app
-- cannot recreate. These are loaded as a brought-forward balance per member at 31 Oct 2026. From 1 Nov 2026 the app
-- adds each month's dues and subtracts payments. The dowry balance is still worked out from the dowry payments.

create table if not exists opening_balances(
  member_id int primary key references members(id) on delete cascade,
  as_of date not null,
  monthly_2025 numeric not null default 0 check (monthly_2025 >= 0),
  monthly_2026 numeric not null default 0 check (monthly_2026 >= 0),
  note text, updated_by_name text, updated_at timestamptz not null default now());
alter table opening_balances enable row level security;
drop policy if exists "ob read" on opening_balances;
create policy "ob read" on opening_balances for select to authenticated using (is_staff() or member_id = my_member_id());
revoke insert, update, delete on opening_balances from authenticated, anon;   -- written only by the function below

create or replace function set_opening_balance(p_member int, p_as_of date, p_m2025 numeric, p_m2026 numeric, p_note text default null)
returns void language plpgsql security definer set search_path = public as $$
declare o opening_balances%rowtype;
begin
  if not is_treasurer() then raise exception 'Only the treasurer or an admin can change brought-forward balances.'; end if;
  if p_as_of is null or p_m2025 < 0 or p_m2026 < 0 then raise exception 'Enter a date and amounts of zero or more.'; end if;
  if not exists (select 1 from members where id = p_member) then raise exception 'Member not found.'; end if;
  select * into o from opening_balances where member_id = p_member;
  insert into opening_balances(member_id, as_of, monthly_2025, monthly_2026, note, updated_by_name, updated_at)
  values (p_member, p_as_of, p_m2025, p_m2026, p_note, actor_name(), now())
  on conflict (member_id) do update set as_of = excluded.as_of, monthly_2025 = excluded.monthly_2025, monthly_2026 = excluded.monthly_2026,
    note = excluded.note, updated_by_name = excluded.updated_by_name, updated_at = now();
  perform log_audit('set_opening_balance', 'opening_balances', p_member::text, to_jsonb(o),
    jsonb_build_object('as_of', p_as_of, 'monthly_2025', p_m2025, 'monthly_2026', p_m2026), p_note);
end $$;

-- Official monthly balances from the sheet (Monthly 2025 and Monthly 2026 columns)
insert into opening_balances(member_id, as_of, monthly_2025, monthly_2026, note, updated_by_name)
select m.id, date '2026-10-31', v.m25, v.m26, 'Official sheet: balances to 31 Oct 2026', 'Treasurer sheet'
from (values
  ('James Kithome', 0, 0),
  ('Muthoka Daniel', 0, 0),
  ('Dominic Mwendwa', 0, 0),
  ('Nicholus Kimeu', 800, 3500),
  ('Erick Ndambuki', 0, 3500),
  ('Dennis Muiwa', 0, 300),
  ('Onesmus Mwongela', 500, 1200),
  ('Kelvin Muthusi', 0, 500),
  ('Jorum Mutina', 1200, 1500),
  ('Denis Mwendwa', 500, 0),
  ('Leornard Musyoki', 0, 1500),
  ('Faustine Mwendwa', 2000, 1500),
  ('Charlse Wambua', 500, 2000),
  ('Justus Nthiw’a', 800, 2300),
  ('Moses Wambua', 2400, 2400),
  ('Lucas Mwangangi', 0, 800),
  ('Mutinda Nzioka', 0, 2300),
  ('Albanus Kioko', 0, 0),
  ('Daniel Wio', 0, 0),
  ('John Maundu', 250, 1500)
) v(name, m25, m26) join members m on m.name = v.name
on conflict (member_id) do nothing;

-- Mutinda Nzioka: the new sheet shows Wave 2 2025 = 7,500 and Wave 1 2026 = 4,350. Top up whatever is missing.
insert into payments(member_id, kind, amount, wave, period_id, paid_on, note)
select m.id, 'dowry', t.target - coalesce(p.paid, 0), t.wave, cp.id, date '2026-10-31', 'Sheet update Nov 2026'
from members m
cross join (values ('W2-2025', 7500), ('W1-2026', 4350)) as t(wave, target)
join contribution_periods cp on cp.year = substring(t.wave from 4)::int and cp.wave = substring(t.wave from 2 for 1)::int
left join lateral (select sum(amount) paid from payments x where x.member_id = m.id and x.kind = 'dowry' and x.status = 'posted' and x.wave = t.wave) p on true
where m.name = 'Mutinda Nzioka' and t.target - coalesce(p.paid, 0) > 0;

insert into audit_log(actor, action, table_name, reason)
select 'Migration', 'import_official_balances', 'opening_balances', 'Official balances from the Treasurer sheet, total KES 194,600 as at 31 Oct 2026'
where not exists (select 1 from audit_log where action = 'import_official_balances');

revoke execute on all functions in schema public from public, anon;
grant execute on all functions in schema public to authenticated;
notify pgrst, 'reload schema';
