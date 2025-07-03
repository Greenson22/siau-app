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
  dosenPA: 'Dr. Glenn Maramis, S.Kom., M.CompSc',
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

export interface MataKuliah {
  id: number;
  kode: string;
  nama: string;
  sks: number;
  semester: number;
}

export const dataMataKuliah: MataKuliah[] = [
  // Semester 1
  { id: 1, kode: 'TEO101', nama: 'Pengantar Teologi Sistematika', sks: 3, semester: 1 },
  { id: 2, kode: 'PAK101', nama: 'Dasar-Dasar Pendidikan Agama Kristen', sks: 3, semester: 1 },
  { id: 3, kode: 'BSI101', nama: 'Bahasa Indonesia', sks: 2, semester: 1 },
  { id: 4, kode: 'PLB101', nama: 'Pengantar Perjanjian Lama', sks: 3, semester: 1 },
  { id: 5, kode: 'FIL101', nama: 'Filsafat Umum', sks: 2, semester: 1 },

  // Semester 2
  { id: 6, kode: 'TEO201', nama: 'Kristologi', sks: 3, semester: 2 },
  { id: 7, kode: 'PAK201', nama: 'Metodologi Pengajaran PAK', sks: 3, semester: 2 },
  { id: 8, kode: 'BSI201', nama: 'Bahasa Inggris', sks: 2, semester: 2 },
  { id: 9, kode: 'PB201', nama: 'Pengantar Perjanjian Baru', sks: 3, semester: 2 },
  { id: 10, kode: 'PSI201', nama: 'Psikologi Perkembangan', sks: 3, semester: 2 },

  // Semester 3
  { id: 11, kode: 'TEO301', nama: 'Pneumatologi', sks: 3, semester: 3 },
  { id: 12, kode: 'PAK301', nama: 'Kurikulum PAK', sks: 3, semester: 3 },
  { id: 13, kode: 'HER301', nama: 'Hermeneutik I', sks: 3, semester: 3 },
  { id: 14, kode: 'SOT301', nama: 'Soteriologi', sks: 2, semester: 3 },
  { id: 15, kode: 'ETK301', nama: 'Etika Kristen', sks: 3, semester: 3 },

  // Semester 4
  { id: 16, kode: 'TEO401', nama: 'Antropologi & Hamartologi', sks: 3, semester: 4 },
  { id: 17, kode: 'PAK401', nama: 'Evaluasi Pembelajaran PAK', sks: 3, semester: 4 },
  { id: 18, kode: 'HER401', nama: 'Hermeneutik II', sks: 3, semester: 4 },
  { id: 19, kode: 'BYN401', nama: 'Bahasa Yunani I', sks: 2, semester: 4 },
  { id: 20, kode: 'MIS401', nama: 'Misiologi', sks: 3, semester: 4 },

  // Semester 5
  { id: 21, kode: 'TEO501', nama: 'Eklesiologi', sks: 3, semester: 5 },
  { id: 22, kode: 'PAK501', nama: 'PAK dalam Keluarga', sks: 3, semester: 5 },
  { id: 23, kode: 'BYN501', nama: 'Bahasa Yunani II', sks: 2, semester: 5 },
  { id: 24, kode: 'APO501', nama: 'Apologetika', sks: 3, semester: 5 },
  { id: 25, kode: 'LIT501', nama: 'Liturgika', sks: 2, semester: 5 },
];

export const maxSks = 24;

export const mataKuliahTersedia = {
  semester: 'Ganjil 2025/2026',
  totalSks: 17,
  mataKuliah: [
    { kode: 'TEO501', nama: 'Teologi Sistematika III', sks: 3, checked: true },
    { kode: 'PAK503', nama: 'Hermeneutik II', sks: 3, checked: true },
    { kode: 'BIB505', nama: 'Bahasa Yunani II', sks: 2, checked: true },
    { kode: 'FIL502', nama: 'Filsafat Kristen', sks: 3, checked: false },
    { kode: 'SEJ504', nama: 'Sejarah Gereja Asia', sks: 3, checked: false },
    { kode: 'HOM506', nama: 'Homiletika I', sks: 3, checked: false },
  ]
};

export const dataKrs = {
  semester: 5,
  status: 'Belum Kontrak',
  mataKuliah: [
    { kode: 'TEO301', nama: 'Teologi Sistematika III', sks: 3 },
    { kode: 'PAK301', nama: 'Metodologi Pengajaran PAK', sks: 3 },
    { kode: 'BIB301', nama: 'Eksegesis Perjanjian Baru', sks: 3 },
    { kode: 'PRA301', nama: 'Praktik Pelayanan Jemaat', sks: 2 },
    { kode: 'SEJ301', nama: 'Sejarah Gereja Asia', sks: 2 },
    { kode: 'FIL301', nama: 'Filsafat Agama', sks: 2 },
  ],
};
