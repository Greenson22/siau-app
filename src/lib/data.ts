export type NavLinkId = 'dashboard' | 'profil' | 'keuangan' | 'akademik';
export type ProfileTab = 'biodata' | 'akademik' | 'keamanan';
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

export const notificationsMhs = [
  { title: 'Batas Akhir Pembayaran UKT', subtitle: '30 Juli 2025' },
  { title: 'Validasi KRS oleh Dosen PA', subtitle: '25-31 Agustus 2025' },
  { title: 'Perkuliahan Semester Ganjil Dimulai', subtitle: '1 September 2025' },
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