'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';

// --- Interface untuk data dari API ---
interface Pengumuman {
    pengumumanId: number;
    judul: string;
    isi: string;
    namaPembuat: string;
    tanggalTerbit: string;
}

interface ActivityLog {
    logId: number;
    username: string;
    aksi: string;
    deskripsi: string;
    timestamp: string;
}

const SystemView = () => {
    // --- State untuk data ---
    const [pengumumanList, setPengumumanList] = useState<Pengumuman[]>([]);
    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- State untuk form pengumuman ---
    const [judul, setJudul] = useState('');
    const [isi, setIsi] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // --- Efek untuk mengambil data awal ---
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('authToken');
                const headers = { 'Authorization': `Bearer ${token}` };

                const [pengumumanRes, logsRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pengumuman`, { headers }),
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logs/activity`, { headers }),
                ]);

                if (!pengumumanRes.ok || !logsRes.ok) {
                    throw new Error('Gagal mengambil data sistem dari server.');
                }

                const pengumumanData = await pengumumanRes.json();
                const logsData = await logsRes.json();

                setPengumumanList(pengumumanData);
                setActivityLogs(logsData);

            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // --- Handler untuk submit form ---
    const handleSubmitPengumuman = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError(null);

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pengumuman`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ judul, isi }),
            });

            const newData = await response.json();

            if (!response.ok) {
                throw new Error(newData.message || 'Gagal mengirim pengumuman.');
            }
            
            // Tambahkan pengumuman baru ke daftar paling atas
            setPengumumanList(prev => [newData, ...prev]);

            // Reset form
            setJudul('');
            setIsi('');

        } catch (e: any) {
            setFormError(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID', {
            dateStyle: 'long',
            timeStyle: 'short'
        });
    };

    if (isLoading) return <p>Memuat data sistem...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* --- Kolom Kiri: Pengumuman --- */}
            <div className="space-y-6">
                <Card>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Buat Pengumuman Baru 📣</h3>
                    <form onSubmit={handleSubmitPengumuman} className="space-y-4">
                        <Input id="judul" label="Judul Pengumuman" value={judul} onChange={e => setJudul(e.target.value)} required />
                        <div>
                            <label htmlFor="isi" className="block text-sm font-medium leading-6 text-gray-900">Isi Pengumuman</label>
                            <textarea
                                id="isi"
                                rows={4}
                                value={isi}
                                onChange={e => setIsi(e.target.value)}
                                className="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-colors"
                                required
                            ></textarea>
                        </div>
                        <div className="flex justify-end items-center pt-2">
                             {formError && <p className="text-sm text-red-600 mr-4">{formError}</p>}
                            <Button type="submit" isLoading={isSubmitting}>
                                Terbitkan
                            </Button>
                        </div>
                    </form>
                </Card>

                 <Card>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Daftar Pengumuman Terbit</h3>
                     <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {pengumumanList.map(p => (
                            <li key={p.pengumumanId} className="border-b pb-3">
                                <p className="font-bold">{p.judul}</p>
                                <p className="text-sm text-gray-600 my-1">{p.isi}</p>
                                <p className="text-xs text-gray-400">Oleh {p.namaPembuat} - {formatDate(p.tanggalTerbit)}</p>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            {/* --- Kolom Kanan: Log Aktivitas --- */}
            <Card>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Log Aktivitas Sistem 📈</h3>
                <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-4 py-3">Waktu</th>
                                <th className="px-4 py-3">Pengguna</th>
                                <th className="px-4 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {activityLogs.map((log) => (
                                <tr key={log.logId} className="bg-white hover:bg-gray-50">
                                    <td className="px-4 py-2 whitespace-nowrap text-gray-500">{formatDate(log.timestamp)}</td>
                                    <td className="px-4 py-2 font-medium">{log.username}</td>
                                    <td className="px-4 py-2">{log.aksi}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default SystemView;