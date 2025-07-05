import DosenLayout from "@/components/layouts/DosenLayout";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Portal Dosen - STTIS Siau",
  description: "Portal Dosen untuk manajemen akademik di STTIS Siau.",
};

export default function DosenPage() {
  return (
    <DosenLayout />
  );
}