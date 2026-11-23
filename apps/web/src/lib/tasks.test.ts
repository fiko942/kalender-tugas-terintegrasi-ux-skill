import { describe, expect, it } from "vitest";
import {
  buildReminderSchedule,
  filterAndSortTasks,
  isOverdue,
  validateTask,
  type Task,
} from "./tasks";

const baseTask: Task = {
  id: "1",
  user_id: "user-1",
  title: "Essay",
  course: "Interaction Design",
  description: "",
  deadline: "2026-12-01T23:59:00+07:00",
  status: "Belum Dikerjakan",
  created_at: "2026-11-01T00:00:00+07:00",
};

describe("task domain rules", () => {
  it("requires a non-blank title, course, and future deadline", () => {
    expect(validateTask({ ...baseTask, title: "   " }, new Date("2026-11-20T00:00:00+07:00")).title).toBeTruthy();
    expect(validateTask({ ...baseTask, course: "" }, new Date("2026-11-20T00:00:00+07:00")).course).toBeTruthy();
    expect(validateTask(baseTask, new Date("2026-12-02T00:00:00+07:00")).deadline).toBeTruthy();
    expect(validateTask({ ...baseTask, deadline: "" }, new Date("2026-11-20T00:00:00+07:00")).deadline).toBeTruthy();
  });

  it("enforces maximum field lengths", () => {
    const errors = validateTask(
      { ...baseTask, title: "x".repeat(151), course: "x".repeat(101), description: "x".repeat(1001) },
      new Date("2026-11-20T00:00:00+07:00"),
    );
    expect(errors.title).toBeTruthy();
    expect(errors.course).toBeTruthy();
    expect(errors.description).toBeTruthy();
  });

  it("derives overdue without changing the stored status", () => {
    const overdue = { ...baseTask, deadline: "2026-11-19T23:59:00+07:00" };
    expect(isOverdue(overdue, new Date("2026-11-20T09:00:00+07:00"))).toBe(true);
    expect(overdue.status).toBe("Belum Dikerjakan");
    expect(isOverdue({ ...overdue, status: "Selesai" }, new Date("2026-11-20T09:00:00+07:00"))).toBe(false);
  });

  it("filters overdue tasks and sorts the remaining matching tasks", () => {
    const tasks = [
      { ...baseTask, deadline: "2026-11-24T23:59:00+07:00" },
      { ...baseTask, id: "2", title: "Earlier", deadline: "2026-11-25T23:00:00+07:00" },
      { ...baseTask, id: "3", title: "Done", status: "Selesai" as const, deadline: "2026-11-19T23:59:00+07:00" },
    ];
    const result = filterAndSortTasks(tasks, "Terlambat", "deadline_asc", new Date("2026-11-26T00:00:00+07:00"));
    expect(result.map((task) => task.id)).toEqual(["1", "2"]);
  });

  it("schedules H-3 and H-1 at 09:00 local time only when still relevant", () => {
    const result = buildReminderSchedule(
      "2026-12-01T23:59:00+07:00",
      "Asia/Jakarta",
      new Date("2026-11-29T08:00:00+07:00"),
    );
    expect(result.map((item) => item.offset_days)).toEqual([1]);
    expect(result[0].scheduled_at).toBe("2026-11-30T02:00:00.000Z");
    expect(result[0].idempotency_key).toContain(":H-1");
  });
});
