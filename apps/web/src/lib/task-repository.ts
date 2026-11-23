import type { SupabaseClient } from "@supabase/supabase-js";
import type { Task, TaskInput } from "./tasks";

export async function saveTask(
  supabase: SupabaseClient,
  userId: string,
  input: TaskInput,
  taskId?: string,
): Promise<Task> {
  const result = taskId
    ? await supabase.from("tasks").update({ ...input, title: input.title.trim(), course: input.course.trim() }).eq("id", taskId).eq("user_id", userId).select().single()
    : await supabase.from("tasks").insert({ ...input, title: input.title.trim(), course: input.course.trim(), user_id: userId }).select().single();
  if (result.error) throw result.error;
  return result.data as Task;
}
