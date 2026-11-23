"use client";

import {
  addDays, addMonths, addWeeks, endOfMonth, endOfWeek, format, isSameDay,
  isSameMonth, startOfMonth, startOfWeek, subMonths, subWeeks,
} from "date-fns";
import { id } from "date-fns/locale";
import {
  AlarmClock, ArrowDownUp, ArrowRight, Bell, CalendarDays, Check,
  CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Circle, Clock3,
  LayoutDashboard, ListTodo, LogOut, Menu, MoreHorizontal, Plus, Search,
  Settings2, Trash2, X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  filterAndSortTasks, isOverdue, TASK_STATUSES, validateTask,
  type Task, type TaskFilter, type TaskInput, type TaskSort, type TaskStatus,
} from "@/lib/tasks";
import { saveTask } from "@/lib/task-repository";

type Page = "Dashboard" | "Kalender" | "Semua Tugas";
type Toast = { kind: "success" | "error"; message: string };
const filters: TaskFilter[] = ["Semua", ...TASK_STATUSES, "Terlambat"];
const weekdays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const initialForm: TaskInput = { title: "", course: "", description: "", deadline: "", status: "Belum Dikerjakan" };
const demoTasks: Task[] = [
  { id: "demo-1", user_id: "demo", title: "Riset pengalaman pengguna", course: "Rekayasa Interaksi", description: "Rangkum temuan wawancara dan identifikasi peluang perbaikan.", deadline: "2026-11-25T23:59:00+07:00", status: "Sedang Dikerjakan", created_at: "2026-11-12T08:00:00+07:00" },
  { id: "demo-2", user_id: "demo", title: "Prototipe high-fidelity", course: "Interaksi Manusia dan Komputer", description: "Siapkan layar inti untuk evaluasi usability.", deadline: "2026-11-27T23:59:00+07:00", status: "Belum Dikerjakan", created_at: "2026-11-14T08:00:00+07:00" },
  { id: "demo-3", user_id: "demo", title: "Laporan evaluasi heuristik", course: "Rekayasa Interaksi", description: "Dokumentasikan temuan berdasarkan sepuluh heuristik Nielsen.", deadline: "2026-11-21T16:00:00+07:00", status: "Belum Dikerjakan", created_at: "2026-11-10T08:00:00+07:00" },
  { id: "demo-4", user_id: "demo", title: "Presentasi progress", course: "Studio Desain", description: "", deadline: "2026-11-20T09:30:00+07:00", status: "Selesai", created_at: "2026-11-03T08:00:00+07:00" },
];

function localInputDate(date: Date) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}
function statusTone(task: Task, now: Date) {
  if (isOverdue(task, now)) return "overdue";
  return task.status === "Selesai" ? "done" : task.status === "Sedang Dikerjakan" ? "progress" : "pending";
}
function dueLabel(task: Task, now: Date) {
  const date = new Date(task.deadline);
  if (isOverdue(task, now)) return `Terlambat · ${format(date, "d MMM", { locale: id })}`;
  if (isSameDay(date, now)) return `Hari ini · ${format(date, "HH:mm")}`;
  return format(date, "d MMM · HH:mm", { locale: id });
}

export function TaskWorkspace() {
  const [page, setPage] = useState<Page>("Dashboard");
  const envConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const [tasks, setTasks] = useState<Task[]>(envConfigured ? [] : demoTasks);
  const [sessionReady, setSessionReady] = useState(!envConfigured);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [demoMode] = useState(!envConfigured);
  const configured = envConfigured;
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week">("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState<TaskFilter>("Semua");
  const [sort, setSort] = useState<TaskSort>("deadline_asc");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<"create" | "edit" | "detail" | "delete" | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [form, setForm] = useState<TaskInput>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [now] = useState(() => new Date());

  async function loadTasks(id: string) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from("tasks").select("*").eq("user_id", id).order("deadline");
      if (error) throw error;
      setTasks((data ?? []) as Task[]);
    } catch {
      setToast({ kind: "error", message: "Data tugas tidak dapat dimuat. Coba muat ulang halaman." });
    } finally { setSessionReady(true); }
  }

  useEffect(() => {
    if (!envConfigured) return;
    const supabase = createClient();
    supabase.auth.getClaims().then(async ({ data }) => {
      const claims = data?.claims;
      if (claims?.sub) {
        setUserId(String(claims.sub));
        setUserEmail(String(claims.email ?? ""));
        await loadTasks(String(claims.sub));
      } else setSessionReady(true);
    }).catch(() => setSessionReady(true));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const id = session?.user.id;
      setUserId(id ?? null);
      setUserEmail(session?.user.email ?? "");
      if (id) void loadTasks(id);
      else { setTasks([]); setSessionReady(true); }
    });
    return () => listener.subscription.unsubscribe();
  }, [envConfigured]);

  async function authenticate(event: FormEvent) {
    event.preventDefault();
    setAuthError("");
    try {
      const supabase = createClient();
      const result = authMode === "signup"
        ? await supabase.auth.signUp({ email: authEmail, password: authPassword })
        : await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
      if (result.error) throw result.error;
      if (authMode === "signup" && !result.data.session) setAuthError("Cek email kamu untuk mengonfirmasi akun, lalu masuk.");
    } catch (error) { setAuthError(error instanceof Error ? error.message : "Gagal masuk. Periksa kembali data akun."); }
  }

  function openCreate(date?: Date) {
    setActiveTask(null);
    setForm({ ...initialForm, status: "Belum Dikerjakan", deadline: date ? localInputDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59)) : "" });
    setErrors({}); setModal("create");
  }
  function openEdit(task: Task) {
    setActiveTask(task);
    setForm({ title: task.title, course: task.course, description: task.description ?? "", deadline: localInputDate(new Date(task.deadline)), status: task.status });
    setErrors({}); setModal("edit");
  }
  function openDetail(task: Task) { setActiveTask(task); setModal("detail"); }
  async function submitTask(event: FormEvent) {
    event.preventDefault();
    if (saving) return;
    const nextErrors = validateTask({ ...form, deadline: form.deadline ? new Date(form.deadline).toISOString() : "" });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (demoMode) {
      const updated: Task = { ...form, deadline: new Date(form.deadline).toISOString(), id: activeTask?.id ?? crypto.randomUUID(), user_id: "demo", created_at: activeTask?.created_at ?? new Date().toISOString() };
      setTasks((current) => activeTask ? current.map((task) => task.id === activeTask.id ? updated : task) : [...current, updated]);
      setModal(null); setToast({ kind: "success", message: activeTask ? "Perubahan disimpan di demo." : "Tugas ditambahkan ke demo." }); return;
    }
    if (!userId) return;
    setSaving(true);
    try {
      const saved = await saveTask(createClient(), userId, { ...form, deadline: new Date(form.deadline).toISOString() }, activeTask?.id);
      setTasks((current) => activeTask ? current.map((task) => task.id === saved.id ? saved : task) : [...current, saved]);
      setModal(null); setToast({ kind: "success", message: activeTask ? "Perubahan tugas tersimpan." : "Tugas berhasil ditambahkan." });
    } catch (error) { setErrors({ form: error instanceof Error ? error.message : "Tugas gagal disimpan. Periksa koneksi dan coba lagi." }); }
    finally { setSaving(false); }
  }
  async function updateStatus(task: Task, status: TaskStatus) {
    if (demoMode) {
      setTasks((current) => current.map((item) => item.id === task.id ? { ...item, status } : item));
      setActiveTask({ ...task, status }); setToast({ kind: "success", message: "Status tugas diperbarui." }); return;
    }
    try {
      const { error } = await createClient().from("tasks").update({ status }).eq("id", task.id).eq("user_id", userId);
      if (error) throw error;
      const updated = { ...task, status };
      setTasks((current) => current.map((item) => item.id === task.id ? updated : item));
      setActiveTask(updated); setToast({ kind: "success", message: "Status tugas diperbarui." });
    } catch { setToast({ kind: "error", message: "Status gagal diperbarui. Coba lagi." }); }
  }
  async function deleteTask() {
    if (!activeTask) return;
    if (demoMode) setTasks((current) => current.filter((task) => task.id !== activeTask.id));
    else {
      const { error } = await createClient().from("tasks").delete().eq("id", activeTask.id).eq("user_id", userId);
      if (error) { setToast({ kind: "error", message: "Tugas gagal dihapus. Coba lagi." }); return; }
    }
    setModal(null); setToast({ kind: "success", message: "Tugas berhasil dihapus." });
  }
  async function signOut() {
    if (!demoMode) await createClient().auth.signOut();
    setUserId(null); setUserEmail(""); setTasks(demoMode ? demoTasks : []);
  }

  const visibleTasks = useMemo(() => filterAndSortTasks(tasks, filter, sort, now).filter((task) => `${task.title} ${task.course}`.toLowerCase().includes(query.toLowerCase())), [tasks, filter, sort, query, now]);
  const upcoming = useMemo(() => tasks.filter((task) => task.status !== "Selesai" && Date.parse(task.deadline) >= now.getTime()).sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline)).slice(0, 4), [tasks, now]);
  const overdue = tasks.filter((task) => isOverdue(task, now));
  const counts = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === "Belum Dikerjakan").length,
    doing: tasks.filter((task) => task.status === "Sedang Dikerjakan").length,
    done: tasks.filter((task) => task.status === "Selesai").length,
  };
  const selectedTasks = tasks.filter((task) => isSameDay(new Date(task.deadline), selectedDate));
  const rangeStart = view === "month" ? startOfWeek(startOfMonth(calendarDate), { weekStartsOn: 1 }) : startOfWeek(calendarDate, { weekStartsOn: 1 });
  const rangeEnd = view === "month" ? endOfWeek(endOfMonth(calendarDate), { weekStartsOn: 1 }) : endOfWeek(calendarDate, { weekStartsOn: 1 });
  const days = Array.from({ length: Math.round((rangeEnd.getTime() - rangeStart.getTime()) / 86400000) + 1 }, (_, index) => addDays(rangeStart, index));
  const goBack = () => setCalendarDate((date) => view === "month" ? subMonths(date, 1) : subWeeks(date, 1));
  const goForward = () => setCalendarDate((date) => view === "month" ? addMonths(date, 1) : addWeeks(date, 1));

  if (!sessionReady) return <div className="loading-screen"><div className="brand-mark">t.</div><div className="spinner"/><span>Menyiapkan ruang kerjamu…</span></div>;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand"><div className="brand-mark">t.</div><span>tempo<span className="brand-dot">.</span></span><span className="brand-tag">STUDY SPACE</span><button className="mobile-close icon-button" aria-label="Tutup navigasi" onClick={() => setMobileMenu(false)}><X size={19}/></button></div>
        <div className="workspace-switch"><div className="workspace-avatar">{userEmail ? userEmail[0].toUpperCase() : "F"}</div><div className="workspace-meta"><strong>{userEmail ? userEmail.split("@")[0] : "Ruang belajar"}</strong><span>{userEmail || "Semester aktif"}</span></div><ChevronDown size={15}/></div>
        <nav className="main-nav" aria-label="Navigasi utama">
          <p className="nav-label">WORKSPACE</p>
          {([ ["Dashboard", LayoutDashboard], ["Kalender", CalendarDays], ["Semua Tugas", ListTodo] ] as const).map(([label, Icon]) => <button key={label} className={`nav-item ${page === label ? "active" : ""}`} onClick={() => { setPage(label); setMobileMenu(false); }}><Icon size={18}/><span>{label}</span>{label === "Semua Tugas" && <span className="nav-count">{counts.total}</span>}</button>)}
          <p className="nav-label nav-label-spaced">PRIORITAS</p>
          <button className="nav-item" onClick={() => { setPage("Semua Tugas"); setFilter("Terlambat"); setMobileMenu(false); }}><Clock3 size={18}/><span>Terlambat</span>{overdue.length > 0 && <span className="nav-alert">{overdue.length}</span>}</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="streak-card"><div className="streak-icon"><AlarmClock size={18}/></div><div><strong>Pelan tapi rutin.</strong><span>Satu tugas selesai, satu langkah maju.</span></div></div>
          <button className="nav-item settings-item" onClick={() => setToast({ kind: "error", message: "Pengaturan profil belum tersedia pada versi ini." })}><Settings2 size={18}/><span>Pengaturan</span></button>
          <button className="profile-row" onClick={signOut}><div className="profile-avatar">{userEmail ? userEmail[0].toUpperCase() : "F"}</div><div className="profile-meta"><strong>{userEmail || "Fiko"}</strong><span>{demoMode ? "Mode demo" : "Mahasiswa"}</span></div><LogOut size={16}/></button>
        </div>
      </aside>
      {mobileMenu && <button className="mobile-scrim" aria-label="Tutup navigasi" onClick={() => setMobileMenu(false)}/>}
      <main className="main-content">
        <header className="topbar"><button className="mobile-menu-button icon-button" aria-label="Buka navigasi" onClick={() => setMobileMenu(true)}><Menu size={20}/></button><div className="breadcrumb"><span>Workspace</span><ChevronRight size={14}/><strong>{page}</strong></div><div className="topbar-actions"><div className="today-chip"><span className="today-dot"/>{format(now, "EEEE, d MMM yyyy", { locale: id })}</div><button className="icon-button notification-button" aria-label="Informasi pengingat" onClick={() => setToast({ kind: "error", message: "Pengingat terjadwal; pengiriman akan aktif setelah provider notifikasi dikonfigurasi." })}><Bell size={18}/>{tasks.length > 0 && <i/>}</button><div className="top-avatar">{userEmail ? userEmail[0].toUpperCase() : "F"}</div></div></header>
        {!configured && <div className="demo-banner"><span><strong>Mode demo</strong> · Contoh tampilan saja; perubahan tidak disimpan. Hubungkan Supabase untuk akun dan penyimpanan persisten.</span><button onClick={() => { setAuthError(""); setModal("detail"); setActiveTask(null); }}>Tentang mode demo <ArrowRight size={14}/></button></div>}
        {configured && !userId && <div className="auth-overlay"><form className="auth-card" onSubmit={authenticate}><div className="brand-mark">t.</div><span className="eyebrow">RUANG BELAJAR TERPADU</span><h1>{authMode === "signin" ? "Senang melihatmu lagi." : "Mulai ruang belajarmu."}</h1><p>{authMode === "signin" ? "Masuk untuk melihat semua tugasmu." : "Buat akun untuk menyimpan tugas dengan aman."}</p><label>Email<input type="email" required value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} placeholder="nama@email.com" autoComplete="email"/></label><label>Kata sandi<input type="password" required minLength={8} value={authPassword} onChange={(event) => setAuthPassword(event.target.value)} placeholder="Minimal 8 karakter" autoComplete={authMode === "signin" ? "current-password" : "new-password"}/></label>{authError && <div className="form-error">{authError}</div>}<button className="primary-button auth-submit">{authMode === "signin" ? "Masuk" : "Buat akun"}<ArrowRight size={16}/></button><p className="auth-toggle">{authMode === "signin" ? "Belum punya akun?" : "Sudah punya akun?"} <button type="button" onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}>{authMode === "signin" ? "Daftar" : "Masuk"}</button></p></form></div>}
        {page === "Dashboard" && <section className="page dashboard-page">
          <div className="page-heading dashboard-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> {format(now, "EEEE, d MMMM yyyy", { locale: id }).toLocaleUpperCase("id-ID")}</div><h1>Semua yang penting,<br/><span>dalam satu pandangan.</span></h1><p>Halo{userEmail ? `, ${userEmail.split("@")[0]}` : ""}. Yuk, lihat apa yang perlu kamu kerjakan hari ini.</p></div><button className="primary-button" onClick={() => openCreate()}><Plus size={17}/> Tambah Tugas</button></div>
          <div className="summary-grid">
            <button className="summary-card total-card" onClick={() => { setFilter("Semua"); setPage("Semua Tugas"); }}><div className="summary-top"><span className="summary-icon total-icon"><ListTodo size={18}/></span><span className="summary-note">semester ini</span></div><strong>{counts.total.toString().padStart(2, "0")}</strong><span>Total tugas</span><div className="summary-progress"><i style={{ width: "100%" }}/></div></button>
            <button className="summary-card" onClick={() => { setFilter("Belum Dikerjakan"); setPage("Semua Tugas"); }}><div className="summary-top"><span className="summary-icon pending-icon"><Circle size={17}/></span><span className="summary-trend">Perlu mulai</span></div><strong>{counts.todo.toString().padStart(2, "0")}</strong><span>Belum dikerjakan</span><div className="summary-progress"><i className="pending-fill" style={{ width: `${counts.total ? counts.todo / counts.total * 100 : 0}%` }}/></div></button>
            <button className="summary-card" onClick={() => { setFilter("Sedang Dikerjakan"); setPage("Semua Tugas"); }}><div className="summary-top"><span className="summary-icon progress-icon"><ArrowDownUp size={17}/></span><span className="summary-trend">Dalam proses</span></div><strong>{counts.doing.toString().padStart(2, "0")}</strong><span>Sedang dikerjakan</span><div className="summary-progress"><i className="progress-fill" style={{ width: `${counts.total ? counts.doing / counts.total * 100 : 0}%` }}/></div></button>
            <button className="summary-card" onClick={() => { setFilter("Selesai"); setPage("Semua Tugas"); }}><div className="summary-top"><span className="summary-icon done-icon"><Check size={17}/></span><span className="summary-trend">Sudah beres</span></div><strong>{counts.done.toString().padStart(2, "0")}</strong><span>Selesai</span><div className="summary-progress"><i className="done-fill" style={{ width: `${counts.total ? counts.done / counts.total * 100 : 0}%` }}/></div></button>
          </div>
          <div className="dashboard-grid"><section className="panel upcoming-panel"><div className="panel-heading"><div><span className="section-kicker">YANG AKAN DATANG</span><h2>Tenggat terdekat</h2></div><button className="text-link" onClick={() => { setPage("Semua Tugas"); setFilter("Semua"); }}>Semua tugas <ArrowRight size={15}/></button></div>{upcoming.length ? <div className="task-list">{upcoming.map((task) => <TaskRow key={task.id} task={task} now={now} onOpen={() => openDetail(task)} onToggle={() => void updateStatus(task, task.status === "Selesai" ? "Belum Dikerjakan" : "Selesai")}/>)}</div> : <EmptyState title="Belum ada tenggat mendatang" body="Tambahkan tugas agar semua rencanamu terkumpul di sini." action="Tambah tugas" onAction={() => openCreate()}/>}</section>
            <section className="panel week-panel"><div className="panel-heading"><div><span className="section-kicker">GAMBARAN MINGGU INI</span><h2>Agenda</h2></div><button className="icon-button" aria-label="Buka kalender" onClick={() => setPage("Kalender")}><ArrowRight size={16}/></button></div><div className="mini-week">{Array.from({ length: 7 }, (_, index) => addDays(startOfWeek(now, { weekStartsOn: 1 }), index)).map((day) => { const dayTasks = tasks.filter((task) => isSameDay(new Date(task.deadline), day)); return <button key={day.toISOString()} className={`mini-day ${isSameDay(day, now) ? "mini-day-today" : ""} ${isSameDay(day, selectedDate) ? "mini-day-selected" : ""}`} onClick={() => { setSelectedDate(day); setCalendarDate(day); setPage("Kalender"); }}><span>{format(day, "EEEEE", { locale: id })}</span><strong>{format(day, "d")}</strong><i className={dayTasks.length ? "has-task" : ""}/></button>; })}</div><div className="week-summary"><div><span className="week-summary-number">{tasks.filter((task) => isSameDay(new Date(task.deadline), now)).length.toString().padStart(2, "0")}</span><span>tugas hari ini</span></div><div className="week-summary-divider"/><div><span className="week-summary-number">{upcoming.length.toString().padStart(2, "0")}</span><span>tenggat dekat</span></div></div><button className="week-link" onClick={() => setPage("Kalender")}>Lihat kalender lengkap <ArrowRight size={15}/></button></section></div>
          <div className="bottom-grid"><section className="focus-card"><div className="focus-decoration"><span/><span/><span/></div><div className="focus-copy"><span className="section-kicker">SEDIKIT DEMI SEDIKIT</span><h3>Fokus pada satu hal.</h3><p>Kemajuan kecil tetap kemajuan. Pilih tugas yang ingin kamu mulai hari ini.</p><button onClick={() => upcoming[0] && openDetail(upcoming[0])}>Lihat tugas berikutnya <ArrowRight size={14}/></button></div><div className="focus-illustration"><div className="focus-circle"><CheckCircle2 size={39}/><span>01</span></div></div></section><section className="overdue-card"><div className="overdue-head"><span className="overdue-icon"><Clock3 size={17}/></span><span className="section-kicker">PERLU PERHATIAN</span><strong>{overdue.length}</strong></div><h3>{overdue.length ? "Ada tenggat yang terlewat." : "Semua tenggat terpantau."}</h3><p>{overdue.length ? "Tinjau kembali tugas terlambat dan perbarui progresnya." : "Tugas belum selesai yang lewat tenggat akan muncul di sini."}</p>{overdue.length > 0 && <button onClick={() => { setPage("Semua Tugas"); setFilter("Terlambat"); }}>Tinjau tugas <ArrowRight size={14}/></button>}</section></div>
        </section>}
        {page === "Semua Tugas" && <section className="page tasks-page"><div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> DAFTAR AKADEMIK</div><h1>Semua tugas<span className="title-period">.</span></h1><p>Semua yang kamu catat, tersusun menurut prioritasmu.</p></div><button className="primary-button" onClick={() => openCreate()}><Plus size={17}/> Tambah Tugas</button></div><section className="panel tasks-panel"><div className="task-toolbar"><div className="filter-tabs" role="tablist" aria-label="Filter tugas">{filters.map((item) => <button key={item} role="tab" aria-selected={filter === item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>{item}{item === "Semua" && <span>{tasks.length}</span>}</button>)}</div><div className="list-controls"><label className="search-box"><Search size={16}/><input aria-label="Cari tugas" placeholder="Cari tugas" value={query} onChange={(event) => setQuery(event.target.value)}/></label><label className="sort-select"><ArrowDownUp size={14}/><select aria-label="Urutkan tugas" value={sort} onChange={(event) => setSort(event.target.value as TaskSort)}><option value="deadline_asc">Tenggat terdekat</option><option value="deadline_desc">Tenggat terjauh</option><option value="title_asc">Nama A–Z</option><option value="title_desc">Nama Z–A</option></select><ChevronDown size={13}/></label></div></div><div className="list-header"><span>TUGAS</span><span>MATA KULIAH</span><span>TENGGAT</span><span>STATUS</span><span/></div>{visibleTasks.length ? <div className="task-list">{visibleTasks.map((task) => <TaskRow key={task.id} task={task} now={now} onOpen={() => openDetail(task)} onToggle={() => void updateStatus(task, task.status === "Selesai" ? "Belum Dikerjakan" : "Selesai")}/>)}</div> : <EmptyState title={tasks.length ? "Tidak ada tugas yang cocok" : "Belum ada tugas tercatat"} body={tasks.length ? "Coba ubah filter atau kata kunci pencarian." : "Catat tugas kuliahmu agar tenggatnya tidak terlewat."} action="Tambah tugas" onAction={() => openCreate()}/>}</section></section>}
        {page === "Kalender" && <section className="page calendar-page"><div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> JADWAL AKADEMIK</div><h1>Ritme semester<span className="title-period">.</span></h1><p>Lihat beban tugasmu sebelum tenggat mendekat.</p></div><button className="primary-button" onClick={() => openCreate(selectedDate)}><Plus size={17}/> Tambah Tugas</button></div><div className="calendar-layout"><section className="panel calendar-panel"><div className="calendar-toolbar"><div><div className="calendar-month-title">{format(calendarDate, "MMMM yyyy", { locale: id })}</div><span className="calendar-subtitle">{tasks.length} tugas dalam jadwal</span></div><div className="calendar-actions"><button className="today-button" onClick={() => { setCalendarDate(new Date()); setSelectedDate(new Date()); }}>Hari ini</button><div className="calendar-arrows"><button aria-label="Periode sebelumnya" onClick={goBack}><ChevronLeft size={17}/></button><button aria-label="Periode berikutnya" onClick={goForward}><ChevronRight size={17}/></button></div><div className="view-switch"><button className={view === "month" ? "active" : ""} onClick={() => setView("month")}>Bulan</button><button className={view === "week" ? "active" : ""} onClick={() => setView("week")}>Minggu</button></div></div></div><div className={`calendar-grid ${view === "week" ? "week-view" : ""}`}><div className="calendar-weekdays">{weekdays.map((day) => <span key={day}>{day}</span>)}</div>{Array.from({ length: view === "week" ? 1 : days.length / 7 }, (_, weekIndex) => <div className="calendar-week" key={weekIndex}>{days.slice(weekIndex * 7, weekIndex * 7 + 7).map((day) => { const dayTasks = tasks.filter((task) => isSameDay(new Date(task.deadline), day)); return <button key={day.toISOString()} className={`calendar-day ${!isSameMonth(day, calendarDate) && view === "month" ? "outside-month" : ""} ${isSameDay(day, now) ? "today" : ""} ${isSameDay(day, selectedDate) ? "selected-day" : ""}`} onClick={() => setSelectedDate(day)}><span className="day-number">{format(day, "d")}</span>{dayTasks.length > 0 && <span className="day-count">{dayTasks.length}</span>}<div className="day-events">{dayTasks.slice(0, 2).map((task) => <span key={task.id} className={`calendar-event ${statusTone(task, now)}`} onClick={(event) => { event.stopPropagation(); openDetail(task); }}><i/>{task.title}</span>)}{dayTasks.length > 2 && <span className="more-events">+{dayTasks.length - 2} lainnya</span>}</div></button>; })}</div>)}</div><div className="calendar-legend"><span><i className="legend-dot pending"/>Belum dikerjakan</span><span><i className="legend-dot progress"/>Sedang dikerjakan</span><span><i className="legend-dot done"/>Selesai</span><span><i className="legend-dot overdue"/>Terlambat</span></div></section><aside className="panel selected-day-panel"><div className="selected-day-heading"><div><span className="section-kicker">TUGAS PADA TANGGAL</span><h2>{format(selectedDate, "EEEE", { locale: id })}</h2><span>{format(selectedDate, "d MMMM yyyy", { locale: id })}</span></div><button className="icon-button" aria-label="Tambah tugas di tanggal ini" onClick={() => openCreate(selectedDate)}><Plus size={17}/></button></div>{selectedTasks.length ? <div className="selected-task-list">{selectedTasks.map((task) => <button className="selected-task" key={task.id} onClick={() => openDetail(task)}><span className={`selected-task-bar ${statusTone(task, now)}`}/><span className="selected-task-body"><strong>{task.title}</strong><span>{task.course}</span><small><Clock3 size={12}/>{format(new Date(task.deadline), "HH:mm")}</small></span><ChevronRight size={15}/></button>)}</div> : <div className="calendar-empty"><div className="empty-calendar-icon"><CalendarDays size={23}/></div><strong>Tidak ada tugas di tanggal ini.</strong><span>Waktu kosong juga bagian dari rencana yang baik.</span><button onClick={() => openCreate(selectedDate)}><Plus size={14}/> Tambah tugas</button></div>}</aside></div></section>}
      </main>
      {modal && modal !== "detail" && modal !== "delete" && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setModal(null)}><form className="task-modal" onSubmit={submitTask}><div className="modal-header"><div><span className="section-kicker">RUANG BELAJARMU</span><h2>{modal === "edit" ? "Perbarui tugas" : "Catat tugas baru"}</h2><p>{modal === "edit" ? "Pastikan perubahanmu tersimpan." : "Tulis detailnya sekarang, urus satu per satu nanti."}</p></div><button type="button" className="icon-button" aria-label="Tutup" onClick={() => setModal(null)}><X size={18}/></button></div>{errors.form && <div className="form-error">{errors.form}</div>}<label>Nama tugas <span>*</span><input autoFocus maxLength={150} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Contoh: Prototipe aplikasi"/>{errors.title && <small className="field-error">{errors.title}</small>}</label><label>Mata kuliah <span>*</span><input maxLength={100} value={form.course} onChange={(event) => setForm({ ...form, course: event.target.value })} placeholder="Contoh: Rekayasa Interaksi"/>{errors.course && <small className="field-error">{errors.course}</small>}</label><label>Deskripsi <span className="optional-label">Opsional</span><textarea maxLength={1000} rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Catatan kecil tentang tugas ini"/>{errors.description && <small className="field-error">{errors.description}</small>}</label><div className="form-row"><label>Tanggal & waktu tenggat <span>*</span><input type="datetime-local" value={form.deadline} onChange={(event) => setForm({ ...form, deadline: event.target.value })}/>{errors.deadline && <small className="field-error">{errors.deadline}</small>}</label><label>Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as TaskStatus })}>{TASK_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label></div><div className="modal-footer"><span><Bell size={14}/> Pengingat H-3 & H-1</span><div><button type="button" className="secondary-button" onClick={() => setModal(null)}>Batal</button><button className="primary-button" disabled={saving}>{saving ? "Menyimpan…" : modal === "edit" ? "Simpan perubahan" : "Simpan tugas"}</button></div></div></form></div>}
      {modal === "detail" && activeTask && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setModal(null)}><section className="task-modal detail-modal"><div className="modal-header"><div><span className="section-kicker">DETAIL TUGAS</span><h2>{activeTask.title}</h2><p>{activeTask.course}</p></div><button type="button" className="icon-button" aria-label="Tutup" onClick={() => setModal(null)}><X size={18}/></button></div><div className="detail-due"><Clock3 size={17}/><div><span>TENGGAT WAKTU</span><strong>{format(new Date(activeTask.deadline), "EEEE, d MMMM yyyy · HH:mm", { locale: id })}</strong></div><span className={`status-pill ${statusTone(activeTask, now)}`}>{isOverdue(activeTask, now) ? "Terlambat" : activeTask.status}</span></div>{activeTask.description && <div className="detail-description"><span>CATATAN</span><p>{activeTask.description}</p></div>}<div className="detail-reminder"><Bell size={16}/><span><strong>Pengingat tugas</strong><small>Jadwal H-3 & H-1 · 09.00 waktu lokal</small></span><span className="reminder-indicator">{demoMode ? "Demo" : "Terjadwal"}</span></div><label className="detail-status-label">STATUS PENGERJAAN<select value={activeTask.status} onChange={(event) => void updateStatus(activeTask, event.target.value as TaskStatus)}>{TASK_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label><div className="modal-footer detail-footer"><button className="danger-text-button" onClick={() => setModal("delete")}><Trash2 size={15}/> Hapus</button><div><button className="secondary-button" onClick={() => openEdit(activeTask)}>Edit tugas</button><button className="primary-button" onClick={() => setModal(null)}>Selesai</button></div></div></section></div>}
      {modal === "delete" && activeTask && <div className="modal-backdrop"><section className="task-modal delete-modal"><span className="delete-icon"><Trash2 size={20}/></span><h2>Hapus tugas?</h2><p>“{activeTask.title}” akan dihapus dari jadwalmu. Tindakan ini tidak dapat dibatalkan.</p><div><button className="secondary-button" onClick={() => setModal("detail")}>Batal</button><button className="danger-button" onClick={() => void deleteTask()}>Hapus tugas</button></div></section></div>}
      {toast && <div className={`toast ${toast.kind}`} role="status"><span>{toast.kind === "success" ? <CheckCircle2 size={18}/> : <Bell size={18}/>}</span>{toast.message}<button aria-label="Tutup notifikasi" onClick={() => setToast(null)}><X size={15}/></button></div>}
    </div>
  );
}

function TaskRow({ task, now, onOpen, onToggle }: { task: Task; now: Date; onOpen: () => void; onToggle: () => void }) {
  const tone = statusTone(task, now);
  return <div className="task-row"><button className={`task-check ${task.status === "Selesai" ? "checked" : ""}`} aria-label={task.status === "Selesai" ? "Tandai belum dikerjakan" : "Tandai selesai"} onClick={onToggle}>{task.status === "Selesai" && <Check size={12}/>}</button><button className="task-title-button" onClick={onOpen}><strong>{task.title}</strong><span className="mobile-course">{task.course}</span></button><span className="task-course">{task.course}</span><span className={`task-due ${tone}`}>{dueLabel(task, now)}</span><span className={`status-pill ${tone}`}><i/>{isOverdue(task, now) ? "Terlambat" : task.status}</span><button className="row-more icon-button" aria-label={`Lihat ${task.title}`} onClick={onOpen}><MoreHorizontal size={17}/></button></div>;
}
function EmptyState({ title, body, action, onAction }: { title: string; body: string; action: string; onAction: () => void }) {
  return <div className="empty-state"><div className="empty-icon"><ListTodo size={22}/></div><strong>{title}</strong><p>{body}</p><button className="secondary-button" onClick={onAction}><Plus size={14}/>{action}</button></div>;
}
