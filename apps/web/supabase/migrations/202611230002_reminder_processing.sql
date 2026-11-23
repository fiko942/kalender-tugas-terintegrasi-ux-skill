-- Claiming a reminder is separate from marking it sent; only the delivery worker
-- may set sent after the provider confirms delivery.
alter type public.reminder_status add value if not exists 'processing';
alter table public.reminders add column if not exists claimed_at timestamptz;

create or replace function public.claim_due_reminders(batch_size integer default 100)
returns setof public.reminders
language sql
security definer
set search_path = ''
as $$
  with due as (
    select r.id
    from public.reminders r
    join public.tasks t on t.id = r.task_id and t.user_id = r.user_id
    where r.status = 'pending'
      and r.scheduled_at <= now()
      and t.status <> 'Selesai'
    order by r.scheduled_at
    for update of r skip locked
    limit greatest(1, least(batch_size, 500))
  )
  update public.reminders r
  set status = 'processing', claimed_at = now()
  from due
  where r.id = due.id
  returning r.*;
$$;
revoke all on function public.claim_due_reminders(integer) from public, anon, authenticated;
-- Invoke only from a trusted worker. Mark sent only after provider confirmation;
-- mark failed with a recorded reason on provider error, and recover stale claims.
