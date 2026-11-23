export const TASK_STATUSES = ["Belum Dikerjakan", "Sedang Dikerjakan", "Selesai"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];
export type Task = {
  id: string;
  user_id: string;
  title: string;
  course: string;
  description: string;
  deadline: string;
  status: TaskStatus;
  created_at: string;
};
export type TaskInput = Pick<Task, "title" | "course" | "description" | "deadline" | "status">;
export type TaskErrors = Partial<Record<keyof TaskInput, string>>;
export type TaskFilter = "Semua" | TaskStatus | "Terlambat";
export type TaskSort = "deadline_asc" | "deadline_desc" | "title_asc" | "title_desc";

export function validateTask(input: TaskInput, now = new Date()): TaskErrors {
  const errors: TaskErrors = {};
  if (!input.title.trim()) errors.title = "Nama tugas wajib diisi.";
  else if (input.title.trim().length > 150) errors.title = "Nama tugas maksimal 150 karakter.";
  if (!input.course.trim()) errors.course = "Mata kuliah wajib diisi.";
  else if (input.course.trim().length > 100) errors.course = "Mata kuliah maksimal 100 karakter.";
  if (input.description.length > 1000) errors.description = "Deskripsi maksimal 1000 karakter.";
  if (!input.deadline || !Number.isFinite(Date.parse(input.deadline))) errors.deadline = "Tanggal dan waktu tenggat wajib diisi.";
  else if (Date.parse(input.deadline) <= now.getTime()) errors.deadline = "Tenggat harus berada di masa depan.";
  if (!TASK_STATUSES.includes(input.status)) errors.status = "Pilih status tugas yang tersedia.";
  return errors;
}

export function isOverdue(task: Pick<Task, "deadline" | "status">, now = new Date()): boolean {
  return task.status !== "Selesai" && Date.parse(task.deadline) < now.getTime();
}

export function filterAndSortTasks(tasks: Task[], filter: TaskFilter, sort: TaskSort, now = new Date()): Task[] {
  const filtered = tasks.filter((task) => {
    if (filter === "Semua") return true;
    if (filter === "Terlambat") return isOverdue(task, now);
    return task.status === filter;
  });
  return [...filtered].sort((a, b) => {
    if (sort === "title_asc") return a.title.localeCompare(b.title);
    if (sort === "title_desc") return b.title.localeCompare(a.title);
    const difference = Date.parse(a.deadline) - Date.parse(b.deadline);
    return sort === "deadline_asc" ? difference : -difference;
  });
}

function zonedDateToUtc(year: number, month: number, day: number, hour: number, timeZone: string): Date {
  const desired = Date.UTC(year, month, day, hour, 0, 0);
  let guess = desired;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const values = Object.fromEntries(formatter.formatToParts(new Date(guess)).map((part) => [part.type, part.value]));
    const represented = Date.UTC(+values.year, +values.month - 1, +values.day, +values.hour, +values.minute, +values.second);
    guess += desired - represented;
  }
  return new Date(guess);
}

export type Reminder = { offset_days: 1 | 3; scheduled_at: string; idempotency_key: string };
export function buildReminderSchedule(deadline: string, timeZone: string, now = new Date()): Reminder[] {
  const due = new Date(deadline);
  if (Number.isNaN(due.getTime())) return [];
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" })
    .formatToParts(due);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const dueDate = new Date(Date.UTC(+values.year, +values.month - 1, +values.day));
  return ([3, 1] as const).flatMap((offset) => {
    const localDate = new Date(dueDate);
    localDate.setUTCDate(localDate.getUTCDate() - offset);
    const scheduled = zonedDateToUtc(localDate.getUTCFullYear(), localDate.getUTCMonth(), localDate.getUTCDate(), 9, timeZone);
    if (scheduled.getTime() <= now.getTime() || scheduled.getTime() >= due.getTime()) return [];
    return [{ offset_days: offset, scheduled_at: scheduled.toISOString(), idempotency_key: `${deadline}:H-${offset}` }];
  });
}
