import { LayoutDashboard, UserPlus, Wallet, GraduationCap, User, Users } from 'lucide-react';

export type NavLinkIdAdministrasi = 'dashboard' | 'pendaftaran' | 'keuangan' | 'akademik' | 'profil';

export const administrasi = {
  nama: 'Admin Sistem',
  nip: 'ADMIN001',
  peran: 'Administrator',
  email: 'admin@sttis.ac.id',
  fotoProfil: `https://placehold.co/128x128/A78BFA/4C1D95?text=AD`,
};

export const navLinksAdministrasi = [
  { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
  { id: 'pendaftaran', title: 'Manajemen Pendaftaran', icon: UserPlus },
  { id: 'pengguna', title: 'Manajemen Pengguna', icon: Users }, // <-- Tambahkan baris ini
  { id: 'keuangan', title: 'Manajemen Keuangan', icon: Wallet },
  { id: 'akademik', title: 'Manajemen Akademik', icon: GraduationCap },
  { id: 'profil', title: 'Profil Saya', icon: User },
];

export const notifications = [
  { title: '10 Pendaftar Baru', subtitle: 'Memerlukan validasi pembayaran' },
  { title: 'Laporan Keuangan Bulanan Siap', subtitle: 'Periode Juni 2025 telah digenerate' },
  { title: '5 Mahasiswa Telah Lunas', subtitle: 'Generate NIM untuk mahasiswa baru' },
  { title: 'Update Data Dosen', subtitle: 'Dr. Jane Smith telah memperbarui profil' },
  { title: 'Jadwal Maintenance Server', subtitle: 'VPS akan diperbarui pada 15 Juli 2025' },
  { title: 'Periode Validasi KRS', subtitle: 'Batas akhir validasi oleh Dosen PA: 31 Agustus' },
  { title: '2 Mahasiswa Mengajukan Cuti', subtitle: 'Perlu perubahan status akademik' },
  { title: 'Gagal Sinkronisasi Perpustakaan', subtitle: 'Sistem XAMPP perpustakaan offline' },
  { title: 'Penambahan Kurikulum Baru', subtitle: 'Data mata kuliah semester ganjil telah diupdate' },
  { title: 'Backup Sistem Berhasil', subtitle: 'Backup data mingguan telah selesai' },
];