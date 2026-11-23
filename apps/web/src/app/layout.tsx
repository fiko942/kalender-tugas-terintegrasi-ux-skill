import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tempo — Kalender Tugas",
  description: "Ruang kerja sederhana untuk tenggat dan tugas kuliahmu.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
