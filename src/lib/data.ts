import { LayoutDashboard, UserCircle, Landmark, GraduationCap } from 'lucide-react';

export const navLinks = [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { id: 'profil', title: 'Profil Mahasiswa', icon: UserCircle },
    { id: 'keuangan', title: 'Keuangan', icon: Landmark },
    { id: 'akademik', title: 'Akademik', icon: GraduationCap },
];

export type NavLinkId = 'dashboard' | 'profil' | 'keuangan' | 'akademik';

// Helper untuk membuat inisial dari nama
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

// Palet warna untuk avatar [background, text] (format hex tanpa #)
const colorPalette = [
  { bg: 'FCA5A5', text: '991B1B' }, // Red-300, Red-800
  { bg: 'FDBA74', text: '9A3412' }, // Orange-300, Orange-800
  { bg: 'FDE047', text: '854D0E' }, // Yellow-300, Yellow-700
  { bg: '86EFAC', text: '166534' }, // Green-300, Green-800
  { bg: '93C5FD', text: '1E40AF' }, // Blue-300, Blue-800
  { bg: 'C4B5FD', text: '5B21B6' }, // Violet-300, Violet-800
  { bg: 'F9A8D4', text: '9D2449' }, // Pink-300, Pink-800
];

// Helper untuk mendapatkan warna konsisten berdasarkan inisial
const getAvatarColors = (initials: string) => {
  if (!initials) {
    return { bg: 'E2E8F0', text: '4A5568' }; // Default Abu-abu
  }
  // Membuat 'hash' sederhana dari inisial untuk memilih warna
  const charCodeSum = initials.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const index = charCodeSum % colorPalette.length;
  return colorPalette[index];
};


const namaMahasiswa = 'Frendy Gerung';
const inisialMahasiswa = getInitials(namaMahasiswa);
const avatarColors = getAvatarColors(inisialMahasiswa);

export const mahasiswa = {
  nama: namaMahasiswa,
  peran: 'Mahasiswa',
  prodi: 'S1 Teologi',
  nim: '20210118',
  status: 'Aktif',
  email: '20210118@sttis.ac.id',
  telepon: '085298937694',
  // Menggunakan inisial dan warna dinamis untuk placeholder
  fotoProfil: `https://placehold.co/128x128/${avatarColors.bg}/${avatarColors.text}?text=${inisialMahasiswa}`,
  avatar: `https://placehold.co/40x40/${avatarColors.bg}/${avatarColors.text}?text=${inisialMahasiswa}`
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

export const notifikasi = [
  { id: 1, pesan: 'Batas akhir pembayaran UKT adalah 30 Juli 2025.', waktu: '2 jam yang lalu' },
  { id: 2, pesan: 'Jadwal KRS Semester Ganjil 2025/2026 telah terbit.', waktu: '1 hari yang lalu' },
  { id: 3, pesan: 'Nilai mata kuliah Teologi Sistematika II telah keluar.', waktu: '3 hari yang lalu' },
];