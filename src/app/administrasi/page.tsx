import AdministrasiLayout from "@/components/layouts/AdministrasiLayout";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Portal Administrasi - STTIS Siau",
  description: "Portal Administrasi untuk manajemen sistem di STTIS Siau.",
};

export default function AdministrasiPage() {
  return (
    <AdministrasiLayout />
  );
}