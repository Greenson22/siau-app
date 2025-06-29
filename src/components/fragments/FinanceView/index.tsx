import Card from '@/components/elements/Card';
import React from 'react';

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
                <tr className="bg-white border-b">
                  <td className="px-6 py-4">Juli 2025</td>
                  <td className="px-6 py-4">Rp 1.500.000</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Lunas</span>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4">Juni 2025</td>
                  <td className="px-6 py-4">Rp 1.500.000</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Lunas</span>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4">Mei 2025</td>
                  <td className="px-6 py-4">Rp 1.500.000</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Lunas</span>
                  </td>
                </tr>
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
                <tr className="bg-white border-b">
                  <td className="px-6 py-4">10 Juli 2025</td>
                  <td className="px-6 py-4">Pembayaran UKT Juli</td>
                  <td className="px-6 py-4">Rp 1.500.000</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4">08 Juni 2025</td>
                  <td className="px-6 py-4">Pembayaran UKT Juni</td>
                  <td className="px-6 py-4">Rp 1.500.000</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4">05 Mei 2025</td>
                  <td className="px-6 py-4">Pembayaran UKT Mei</td>
                  <td className="px-6 py-4">Rp 1.500.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};

export default FinanceView;