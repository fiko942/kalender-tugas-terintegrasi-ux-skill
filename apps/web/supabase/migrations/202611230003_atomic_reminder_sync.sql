create or replace function public.sync_task_reminders()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  tz text;
  due_local_date date;
  offset_value integer;
  reminder_time timestamptz;
  key_value text;
begin
  if tg_op = 'DELETE' then
    delete from public.reminders
      where task_id = old.id and user_id = old.user_id and status = 'pending';
    return old;
  end if;

  select p.time_zone into tz from public.profiles p where p.id = new.user_id;
  tz := coalesce(tz, 'Asia/Jakarta');

  if tg_op = 'UPDATE' and old.user_id = new.user_id
    and old.deadline = new.deadline and old.status = new.status then
    return new;
  end if;

  delete from public.reminders
    where task_id = new.id and user_id = new.user_id and status = 'pending';

  if new.status = 'Selesai' then
    return new;
  end if;

  due_local_date := (new.deadline at time zone tz)::date;
  foreach offset_value in array array[3, 1] loop
    reminder_time := ((due_local_date - offset_value)::timestamp + time '09:00') at time zone tz;
    if reminder_time > now() and reminder_time < new.deadline then
      key_value := new.id::text || ':' || new.deadline::text || ':H-' || offset_value::text;
      insert into public.reminders(task_id, user_id, offset_days, scheduled_at, idempotency_key, status)
      values (new.id, new.user_id, offset_value, reminder_time, key_value, 'pending')
      on conflict (idempotency_key) do update
        set status = 'pending', claimed_at = null, sent_at = null, failure_reason = null
        where public.reminders.status in ('cancelled', 'failed');
    end if;
  end loop;
  return new;
end;
$$;

create trigger tasks_sync_reminders_after_insert_or_update
  after insert or update of deadline, status on public.tasks
  for each row execute function public.sync_task_reminders();
create trigger tasks_cancel_reminders_after_delete
  after delete on public.tasks
  for each row execute function public.sync_task_reminders();
