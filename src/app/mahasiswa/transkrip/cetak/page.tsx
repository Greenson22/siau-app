// program/next-js/app/mahasiswa/transkrip/cetak/page.tsx
import TranscriptPrintPage from "@/components/layouts/TranscriptPrintPage";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cetak Transkrip Nilai - Portal Mahasiswa STTIS Siau",
};

export default function CetakTranskripPage() {
  return (
    <TranscriptPrintPage />
  );
}