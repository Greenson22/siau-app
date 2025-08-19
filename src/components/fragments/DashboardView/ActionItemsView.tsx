// program/next-js/components/fragments/DashboardView/ActionItemsView.tsx
'use client';

import React from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import { useActionItems } from '@/hooks/useActionItems';
import { AlertCircle, ChevronRight, Wallet, UserPlus } from 'lucide-react';

const ActionItemsView = () => {
    const { actionItems, isLoading, error } = useActionItems();

    const formatRupiah = (angka: number) => 
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

    const formatDate = (dateString: string) => 
        new Date(dateString).toLocaleString('id-ID', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

    if (isLoading) {
        return <Card><p className="text-gray-500">Memuat daftar tugas...</p></Card>;
    }

    if (error) {
         return (
            <Card className="bg-red-50 border-red-200 text-red-700 p-4 flex items-center gap-3">
                <AlertCircle />
                <p>Error: {error}</p>
            </Card>
        );
    }

    const pendingPayments = actionItems?.pembayaranMenungguVerifikasi || [];

    return (
        <Card>
            <h3 className="text-xl font-bold text-gray-800 mb-6">Daftar Tugas & Notifikasi Mendesak 📢</h3>
            
            <div className="space-y-4">
                {/* Bagian Verifikasi Pembayaran */}
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Wallet className="text-orange-500" />
                            <h4 className="font-semibold">Verifikasi Pembayaran</h4>
                        </div>
                        <span className="text-sm font-bold bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                            {pendingPayments.length} Pending
                        </span>
                    </div>
                    {pendingPayments.length > 0 ? (
                        <ul className="mt-4 space-y-2 text-sm">
                            {pendingPayments.slice(0, 3).map(p => (
                                <li key={p.pembayaranId} className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                                    <div>
                                        <p className="font-medium text-gray-800">{p.namaMahasiswa}</p>
                                        <p className="text-gray-500">{formatRupiah(p.jumlahBayar)} - <span className="text-xs">{formatDate(p.tanggalBayar)}</span></p>
                                    </div>
                                    <Button variant="secondary" className="!text-xs !py-1 !px-2">
                                        Verifikasi
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-3 text-sm text-gray-500">Tidak ada pembayaran yang perlu diverifikasi.</p>
                    )}
                </div>

                {/* Placeholder untuk Validasi Pendaftaran */}
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-gray-50 opacity-70">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <UserPlus className="text-gray-500" />
                            <h4 className="font-semibold text-gray-600">Validasi Pendaftaran</h4>
                        </div>
                        <span className="text-sm font-bold bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
                            0 Pending
                        </span>
                    </div>
                    <p className="mt-3 text-sm text-gray-500">Tidak ada pendaftar baru yang perlu divalidasi.</p>
                </div>
            </div>
        </Card>
    );
};

export default ActionItemsView;