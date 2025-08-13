// src/components/fragments/FinanceView/index.tsx

'use client';

import React from 'react';
import Card from '@/components/elements/Card';
import { useFinanceData } from '@/hooks/useFinanceData'; // <-- 1. Impor hook baru

// Fungsi helper untuk memformat angka menjadi format Rupiah
const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);
};

// Fungsi helper untuk memformat tanggal
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: '2-digit', 
        month: 'long', 
        year: 'numeric'
    });
};

const FinanceView = () => {
  // 2. Panggil hook untuk mendapatkan data dan state
  const { tagihan, pembayaran, isLoading, error } = useFinanceData();

  // 3. Render loading state
  if (isLoading) {
    return <Card><p className="text-center">Memuat data keuangan...</p></Card>;
  }

  // 4. Render error state
  if (error) {
    return <Card><p className="text-center text-red-500">Error: {error}</p></Card>;
  }

  // 5. Render UI utama dengan data dari hook
  return (
    <>
      <h3 className="text-xl font-bold mb-4 text-gray-800">Informasi Keuangan</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h4 className="font-bold mb-4 text-gray-800">Rincian Tagihan</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Bulan</th>
                  <th scope="col" className="px-6 py-3">Jumlah</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {tagihan.map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4">{item.deskripsiTagihan}</td>
                    <td className="px-6 py-4">{formatRupiah(item.totalTagihan)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'LUNAS' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h4 className="font-bold mb-4 text-gray-800">Riwayat Pembayaran</h4>
           <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Tanggal</th>
                  <th scope="col" className="px-6 py-3">Keterangan</th>
                  <th scope="col" className="px-6 py-3">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {pembayaran.map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4">{formatDate(item.tanggalBayar)}</td>
                    <td className="px-6 py-4">{item.deskripsiTagihan}</td>
                    <td className="px-6 py-4">{formatRupiah(item.jumlahBayar)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};

export default FinanceView;