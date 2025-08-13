// src/lib/utils.ts

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
export const getAvatarColors = (initials: string) => {
  if (!initials) {
    return { bg: 'E2E8F0', text: '4A5568' }; // Default Gray
  }
  const charCodeSum = initials.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const index = charCodeSum % colorPalette.length;
  return colorPalette[index];
};

// Fungsi getInitials yang sudah ada sebelumnya
export const getInitials = (name: string): string => {
  if (!name) return '';
  const names = name.split(' ');
  const initials = names.map(n => n[0]).join('');
  return initials.toUpperCase();
};