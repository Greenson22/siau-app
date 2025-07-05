import { LayoutDashboard, UserCircle, Landmark, GraduationCap } from 'lucide-react';

export const navLinks = [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { id: 'profil', title: 'Profil Mahasiswa', icon: UserCircle },
    { id: 'keuangan', title: 'Keuangan', icon: Landmark },
    { id: 'akademik', title: 'Akademik', icon: GraduationCap },
];

export type NavLinkId = 'dashboard' | 'profil' | 'keuangan' | 'akademik';
export type ProfileTab = 'biodata' | 'akademik' | 'keamanan';

// Helper untuk membuat inisial dari nama
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

// Palet warna untuk avatar [background, text]
const colorPalette = [
  { bg: 'FCA5A5', text: '991B1B' }, // Red
  { bg: 'FDBA74', text: '9A3412' }, // Orange
  { bg: 'FDE047', text: '854D0E' }, // Yellow
  { bg: '86EFAC', text: '166534' }, // Green
  { bg: '93C5FD', text: '1E40AF' }, // Blue
  { bg: 'C4B5FD', text: '5B21B6' }, // Violet
  { bg: 'F9A8D4', text: '9D2449' }, // Pink
];

// Helper untuk mendapatkan warna konsisten berdasarkan inisial
const getAvatarColors = (initials: string) => {
  if (!initials) {
    return { bg: 'E2E8F0', text: '4A5568' }; // Default Gray
  }
  const charCodeSum = initials.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const index = charCodeSum % colorPalette.length;
  return colorPalette[index];
};

// --- DATA UNTUK PROFIL ---
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
  fotoProfil: `https://placehold.co/128x128/${avatarColors.bg}/${avatarColors.text}?text=${inisialMahasiswa}`,
  avatar: `https://placehold.co/40x40/${avatarColors.bg}/${avatarColors.text}?text=${inisialMahasiswa}`,
  
  // --- PENAMBAHAN DATA UNTUK PROFILEVIEW ---
  ttl: 'Manado, 17 Agustus 2003',
  jenisKelamin: 'Laki-laki',
  alamat: 'Jl. Raya Tahuna-Manganitu, Siau Timur, Kab. Sitaro',
  semester: 7, // Semester saat ini
  ipk: 3.75,
  totalSKS: 98,
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
    { bulan: 'Juli 2025', jumlah: 'Rp 500.000', status: 'Lunas' },
    { bulan: 'Juni 2025', jumlah: 'Rp 500.000', status: 'Lunas' },
    { bulan: 'Mei 2025', jumlah: 'Rp 500.000', status: 'Lunas' },
  ],
  pembayaran: [
    { tanggal: '10 Juli 2025', keterangan: 'Pembayaran UKT Juli', jumlah: 'Rp 500.000' },
    { tanggal: '08 Juni 2025', keterangan: 'Pembayaran UKT Juni', jumlah: 'Rp 500.000' },
    { tanggal: '05 Mei 2025', keterangan: 'Pembayaran UKT Mei', jumlah: 'Rp 500.000' },
  ]
};

export const notifikasi = [
  { id: 1, pesan: 'Batas akhir pembayaran UKT adalah 30 Juli 2025.', waktu: '2 jam yang lalu' },
  { id: 2, pesan: 'Jadwal KRS Semester Ganjil 2025/2026 telah terbit.', waktu: '1 hari yang lalu' },
  { id: 3, pesan: 'Nilai mata kuliah Teologi Sistematika II telah keluar.', waktu: '3 hari yang lalu' },
];

export const dataKrs = {
  semester: 7,
  status: 'Disetujui',
  mataKuliah: [
    { kode: 'TEO401', nama: 'Teologi Kontemporer', sks: 3 },
    { kode: 'PAK401', nama: 'Pendidikan Kristen Lanjutan', sks: 3 },
    { kode: 'BIB401', nama: 'Eksegesis Lanjutan', sks: 3 },
    { kode: 'PRA401', nama: 'Praktik Pelayanan Lanjutan', sks: 2 },
    { kode: 'SEJ401', nama: 'Sejarah Gereja Modern', sks: 2 },
  ],
};

export const dataAkademik = {
  krs: dataKrs,
  // Mengubah khs menjadi array untuk menampung data multi-semester
  khs: [
    {
      semester: 'Genap 2024/2025',
      ips: '3.80',
      sks: '21',
      ipk: '3.75',
      totalSks: '110',
      mataKuliah: [
        { nama: 'Teologi Sistematika II', sks: 3, nilaiHuruf: 'A', nilaiAngka: 4.00 },
        { nama: 'Hermeneutik I', sks: 3, nilaiHuruf: 'A-', nilaiAngka: 3.70 },
        { nama: 'Bahasa Yunani I', sks: 2, nilaiHuruf: 'A', nilaiAngka: 4.00 },
        { nama: 'Dogmatika II', sks: 3, nilaiHuruf: 'B+', nilaiAngka: 3.30 },
        { nama: 'Pendidikan Agama Kristen II', sks: 2, nilaiHuruf: 'A', nilaiAngka: 4.00 },
      ]
    },
    {
      semester: 'Ganjil 2024/2025',
      ips: '3.70',
      sks: '20',
      ipk: '3.72',
      totalSks: '89',
      mataKuliah: [
        { nama: 'Misiologi', sks: 3, nilaiHuruf: 'A', nilaiAngka: 4.00 },
        { nama: 'Etika Kristen', sks: 3, nilaiHuruf: 'A-', nilaiAngka: 3.70 },
        { nama: 'Bahasa Ibrani I', sks: 2, nilaiHuruf: 'B+', nilaiAngka: 3.30 },
      ]
    },
     {
      semester: 'Genap 2023/2024',
      ips: '3.65',
      sks: '19',
      ipk: '3.68',
      totalSks: '69',
      mataKuliah: [
        { nama: 'Sejarah Gereja', sks: 3, nilaiHuruf: 'A-', nilaiAngka: 3.70 },
        { nama: 'Teologi Perjanjian Lama', sks: 3, nilaiHuruf: 'A', nilaiAngka: 4.00 },
        { nama: 'Logika', sks: 2, nilaiHuruf: 'B', nilaiAngka: 3.00 },
      ]
    }
  ],
  transkrip: {
    ipk: "3.75",
    totalSks: "98",
    semesters: [
      {
        semester: "Ganjil 2023/2024",
        ips: "3.70",
        sks: "18",
        mataKuliah: [
          { kode: 'TEO101', nama: 'Pengantar Perjanjian Lama', sks: 3, nilaiHuruf: 'A', nilaiAngka: 4.00 },
          { kode: 'TEO102', nama: 'Pengantar Perjanjian Baru', sks: 3, nilaiHuruf: 'A-', nilaiAngka: 3.70 },
          { kode: 'PAK101', nama: 'Pendidikan Agama Kristen', sks: 2, nilaiHuruf: 'A', nilaiAngka: 4.00 },
        ]
      },
      // ... data semester lainnya
    ]
  },
  jadwal: [
      { hari: 'Senin', waktu: '08:00 - 10:30', nama: 'Teologi Kontemporer', dosen: 'Dr. John Doe', ruang: 'A-101' },
      { hari: 'Selasa', waktu: '10:30 - 12:00', nama: 'Pendidikan Kristen Lanjutan', dosen: 'Dr. Jane Smith', ruang: 'B-203' },
      // ... data jadwal lainnya
  ]
};