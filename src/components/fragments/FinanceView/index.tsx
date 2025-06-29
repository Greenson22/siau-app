import Card from '@/components/elements/Card';
import React from 'react';
import { dataKeuangan } from '@/lib/data';

const FinanceView = () => {
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
                {dataKeuangan.tagihan.map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4">{item.bulan}</td>
                    <td className="px-6 py-4">{item.jumlah}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">{item.status}</span>
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
                {dataKeuangan.pembayaran.map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4">{item.tanggal}</td>
                    <td className="px-6 py-4">{item.keterangan}</td>
                    <td className="px-6 py-4">{item.jumlah}</td>
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