import { LayoutDashboard, UserCircle, Landmark, GraduationCap } from 'lucide-react';

export const navLinks = [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { id: 'akademik', title: 'Akademik', icon: GraduationCap },
    { id: 'profil', title: 'Profil Mahasiswa', icon: UserCircle },
    { id: 'keuangan', title: 'Keuangan', icon: Landmark },
];

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

export const notifications = [
    { title: 'Batas Akhir Pembayaran UKT', subtitle: '30 Juli 2025' },
    { title: 'Validasi KRS oleh Dosen PA', subtitle: '25-31 Agustus 2025' },
    { title: 'Perkuliahan Semester Ganjil Dimulai', subtitle: '1 September 2025' },
]