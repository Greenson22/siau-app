import { LayoutDashboard, Users, GraduationCap, Calendar, User } from 'lucide-react';

// Tipe untuk ID navigasi dan status KRS
export type NavLinkIdDosen = 'dashboard' | 'bimbingan' | 'akademik' | 'profil';
export type KrsStatus = 'Belum Kontrak' | 'Menunggu Persetujuan' | 'Disetujui';

// Data Profil Dosen
export const dosen = {
  nama: 'Dr. Glenn Maramis, S.Kom., M.CompSc',
  nidn: '0912048801',
  peran: 'Dosen',
  email: 'glenn.maramis@sttis.ac.id',
  avatar: `https://placehold.co/40x40/93C5FD/1E40AF?text=GM`,
};

// Navigasi untuk Sidebar Dosen
export const navLinksDosen = [
  { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
  { id: 'bimbingan', title: 'Bimbingan Akademik', icon: Users },
  { id: 'akademik', title: 'Akademik Dosen', icon: GraduationCap },
  { id: 'profil', title: 'Profil Saya', icon: User }, // <-- Link baru
];

// Data untuk Mahasiswa Bimbingan
export const mahasiswaBimbingan = [
    { 
      id: 1,
      nama: 'Frendy Gerung', 
      nim: '20210118', 
      prodi: 'S1 Teologi', 
      semester: 7,
      statusKrs: 'Menunggu Persetujuan' as KrsStatus,
      avatar: `https://placehold.co/40x40/FCA5A5/991B1B?text=FG`
    },
    {
      id: 2,
      nama: 'John Doe',
      nim: '20210119',
      prodi: 'S1 Teologi',
      semester: 7,
      statusKrs: 'Disetujui' as KrsStatus,
      avatar: `https://placehold.co/40x40/86EFAC/166534?text=JD`
    },
    {
      id: 3,
      nama: 'Jane Smith',
      nim: '20220120',
      prodi: 'S1 PAK',
      semester: 5,
      statusKrs: 'Belum Kontrak' as KrsStatus,
      avatar: `https://placehold.co/40x40/FDE047/854D0E?text=JS`
    },
];

// Data Jadwal Mengajar Dosen
export const jadwalMengajar = [
    { hari: 'Senin', waktu: '08:00 - 10:30', nama: 'Teologi Kontemporer', sks: 3, ruang: 'A-101', prodi: 'S1 Teologi' },
    { hari: 'Rabu', waktu: '13:00 - 15:30', nama: 'Filsafat Ilmu', sks: 3, ruang: 'C-301', prodi: 'S1 Teologi' },
    { hari: 'Jumat', waktu: '10:30 - 12:00', nama: 'Logika', sks: 2, ruang: 'B-203', prodi: 'S1 PAK' },
];

// Data untuk pengisian nilai
export const kelasUntukNilai = [
  { id: 'TEO401', nama: 'Teologi Kontemporer', prodi: 'S1 Teologi', jumlahMahasiswa: 35 },
  { id: 'FIL101', nama: 'Filsafat Ilmu', prodi: 'S1 Teologi', jumlahMahasiswa: 35 },
  { id: 'LOG101', nama: 'Logika', prodi: 'S1 PAK', jumlahMahasiswa: 40 },
]