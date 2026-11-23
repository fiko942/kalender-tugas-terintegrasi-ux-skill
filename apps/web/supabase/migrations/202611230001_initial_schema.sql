create extension if not exists pgcrypto;

create type public.task_status as enum ('Belum Dikerjakan', 'Sedang Dikerjakan', 'Selesai');
create type public.reminder_status as enum ('pending', 'sent', 'failed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  time_zone text not null default 'Asia/Jakarta',
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title varchar(150) not null check (length(trim(title)) > 0),
  course varchar(100) not null check (length(trim(course)) > 0),
  description varchar(1000) not null default '',
  deadline timestamptz not null,
  status public.task_status not null default 'Belum Dikerjakan',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index tasks_user_deadline_idx on public.tasks(user_id, deadline);

create table public.reminders (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  offset_days smallint not null check (offset_days in (1, 3)),
  scheduled_at timestamptz not null,
  idempotency_key text not null unique,
  status public.reminder_status not null default 'pending',
  sent_at timestamptz,
  failure_reason text,
  created_at timestamptz not null default now(),
  unique(task_id, offset_days, scheduled_at)
);
create index reminders_pending_due_idx on public.reminders(scheduled_at) where status = 'pending';

alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.reminders enable row level security;

create policy "Users can read their own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can create their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Users can read their own tasks" on public.tasks for select using (auth.uid() = user_id);
create policy "Users can create their own tasks" on public.tasks for insert with check (auth.uid() = user_id);
create policy "Users can update their own tasks" on public.tasks for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete their own tasks" on public.tasks for delete using (auth.uid() = user_id);
create policy "Users can read their own reminders" on public.reminders for select using (auth.uid() = user_id);
create policy "Users can create their own reminders" on public.reminders for insert with check (auth.uid() = user_id);
create policy "Users can update their own reminders" on public.reminders for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete their own reminders" on public.reminders for delete using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
