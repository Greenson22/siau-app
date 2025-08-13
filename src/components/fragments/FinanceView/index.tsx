// src/components/fragments/FinanceView/index.tsx

'use client';

import React from 'react';
import Card from '@/components/elements/Card';
import { useFinanceData } from '@/hooks/useFinanceData';
// 💡 PERBAIKAN: Mengganti 'Bill' dengan 'Receipt' yang valid
import { Receipt, History, AlertCircle } from 'lucide-react'; 

// Helper untuk format Rupiah (tidak berubah)
const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);
};

// Helper untuk format Tanggal (tidak berubah)
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: '2-digit', 
        month: 'long', 
        year: 'numeric'
    });
};

const FinanceView = () => {
  const { tagihan, pembayaran, isLoading, error } = useFinanceData();

  if (isLoading) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-500">Memuat data keuangan Anda...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50 border border-red-200">
        <div className="flex items-center justify-center text-red-700 p-4">
          <AlertCircle className="mr-3" />
          <div>
            <h4 className="font-bold">Gagal Memuat Data</h4>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <>
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Informasi Keuangan</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* --- KARTU RINCIAN TAGIHAN --- */}
        <Card className="!p-0 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-1">
              <div className="bg-blue-100 p-3 rounded-full">
                {/* 💡 PERBAIKAN: Menggunakan ikon Receipt */}
                <Receipt className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800">Rincian Tagihan</h4>
                <p className="text-sm text-gray-500">Tagihan UKT dan lainnya yang perlu dibayar.</p>
              </div>
            </div>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              {tagihan.length > 0 ? tagihan.map((item, index) => (
                <li key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.deskripsiTagihan}</p>
                      <p className="text-sm text-gray-500 truncate">{formatRupiah(item.totalTagihan)}</p>
                    </div>
                    <div className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        item.status === 'LUNAS' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                      {item.status}
                    </div>
                  </div>
                </li>
              )) : (
                <li className="px-6 py-8 text-center">
                  <p className="text-gray-500">Tidak ada tagihan saat ini. Hebat!</p>
                </li>
              )}
            </ul>
          </div>
        </Card>

        {/* --- KARTU RIWAYAT PEMBAYARAN --- */}
        <Card className="!p-0 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-1">
               <div className="bg-green-100 p-3 rounded-full">
                <History className="text-green-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800">Riwayat Pembayaran</h4>
                <p className="text-sm text-gray-500">Semua transaksi yang telah berhasil.</p>
              </div>
            </div>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
                {pembayaran.length > 0 ? pembayaran.map((item, index) => (
                    <li key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{item.deskripsiTagihan}</p>
                                <p className="text-sm text-gray-500 truncate">{formatDate(item.tanggalBayar)}</p>
                            </div>
                            <div className="inline-flex items-center text-sm font-semibold text-gray-900">
                                {formatRupiah(item.jumlahBayar)}
                            </div>
                        </div>
                    </li>
                )) : (
                    <li className="px-6 py-8 text-center">
                      <p className="text-gray-500">Belum ada riwayat pembayaran.</p>
                    </li>
                )}
            </ul>
          </div>
        </Card>
      </div>
    </>
  );
};

export default FinanceView;