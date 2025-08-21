// program/next-js/app/mahasiswa/krs/cetak/page.tsx
import KrsPrintPage from "@/components/layouts/KrsPrintPage";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cetak Bukti KRS - Portal Mahasiswa STTIS Siau",
};

export default function CetakKrs() {
  return (
    <KrsPrintPage />
  );
}