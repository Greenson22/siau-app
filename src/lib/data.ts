import { LayoutDashboard, UserCircle, Landmark, GraduationCap } from 'lucide-react';

export const navLinks = [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { id: 'profil', title: 'Profil Mahasiswa', icon: UserCircle },
    { id: 'keuangan', title: 'Keuangan', icon: Landmark },
    { id: 'akademik', title: 'Akademik', icon: GraduationCap },
];

export type NavLinkId = 'dashboard' | 'profil' | 'keuangan' | 'akademik';

export const mahasiswa = {
  nama: 'Frendy Gerung',
  peran: 'Mahasiswa',
  prodi: 'S1 Teologi',
  nim: '20210118',
  status: 'Aktif',
  email: '20210118@sttis.ac.id',
  telepon: '085298937694',
  fotoProfil: 'https://placehold.co/128x128/E2E8F0/4A5568?text=FG',
  avatar: 'https://placehold.co/40x40/E2E8F0/4A5568?text=AT'
};

export const ringkasanAkademik = {
    ipk: "3.75",
    statusKeuangan: "Lunas",
    sksDitempuh: "98",
    ipsData: {
        labels: ['Sm 1', 'Sm 2', 'Sm 3', 'Sm 4', 'Sm 5', 'Sm 6'],
        data: [3.5, 3.6, 3.4, 3.7, 3.8, 3.75],
    }
};

export const dataKeuangan = {
  tagihan: [
    { bulan: 'Juli 2025', jumlah: 'Rp 1.500.000', status: 'Lunas' },
    { bulan: 'Juni 2025', jumlah: 'Rp 1.500.000', status: 'Lunas' },
    { bulan: 'Mei 2025', jumlah: 'Rp 1.500.000', status: 'Lunas' },
  ],
  pembayaran: [
    { tanggal: '10 Juli 2025', keterangan: 'Pembayaran UKT Juli', jumlah: 'Rp 1.500.000' },
    { tanggal: '08 Juni 2025', keterangan: 'Pembayaran UKT Juni', jumlah: 'Rp 1.500.000' },
    { tanggal: '05 Mei 2025', keterangan: 'Pembayaran UKT Mei', jumlah: 'Rp 1.500.000' },
  ]
};

export const dataAkademik = {
  krs: {
    semester: 'Ganjil 2025/2026',
    status: 'Disetujui oleh Dosen PA',
    mataKuliah: [
      { kode: 'TEO501', nama: 'Teologi Sistematika III', sks: 3 },
      { kode: 'PAK503', nama: 'Hermeneutik II', sks: 3 },
      { kode: 'BIB505', nama: 'Bahasa Yunani II', sks: 2 },
    ]
  },
  khs: {
    semester: 'Genap 2024/2025',
    ips: '3.80',
    sks: '21',
    mataKuliah: [
      { nama: 'Teologi Sistematika II', sks: 3, nilaiHuruf: 'A', nilaiAngka: 4.00 },
      { nama: 'Hermeneutik I', sks: 3, nilaiHuruf: 'A-', nilaiAngka: 3.70 },
      { nama: 'Bahasa Yunani I', sks: 2, nilaiHuruf: 'A', nilaiAngka: 4.00 },
    ]
  }
};

// Data Notifikasi Baru
export const notifications = [
  { id: 1, text: 'Batas Akhir Pembayaran UKT adalah 30 Juli 2025.', time: '5 menit yang lalu' },
  { id: 2, text: 'Jadwal UAS Semester Genap telah terbit.', time: '2 jam yang lalu' },
  { id: 3, text: 'KRS Anda telah divalidasi oleh Dosen PA.', time: '1 hari yang lalu' },
];