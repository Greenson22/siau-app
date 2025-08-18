'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/elements/Card';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Select from '@/components/elements/Select';
import MahasiswaManagementView from './MahasiswaManagementView';
import DosenManagementView from './DosenManagementView';

// --- Interface untuk data dari API ---
interface User {
    userId: number;
    username: string;
    roleName: string;
}

interface Role {
    roleId: number;
    roleName: string;
}

interface Jurusan {
    jurusanId: number;
    namaJurusan: string;
}

const UserManagementView = () => {
    // --- State untuk menyimpan data dari API ---
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [jurusan, setJurusan] = useState<Jurusan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- State untuk form tambah pengguna ---
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [namaLengkap, setNamaLengkap] = useState('');
    const [roleId, setRoleId] = useState('');
    const [jurusanId, setJurusanId] = useState('');
    const [nim, setNim] = useState('');
    const [nidn, setNidn] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // --- Efek untuk mengambil data awal ---
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('authToken');
                const headers = { 'Authorization': `Bearer ${token}` };

                const [usersRes, rolesRes, jurusanRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, { headers }),
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/roles`, { headers }),
                    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jurusan`, { headers }),
                ]);

                if (!usersRes.ok || !rolesRes.ok || !jurusanRes.ok) {
                    throw new Error('Gagal mengambil data dari server.');
                }

                const usersData = await usersRes.json();
                const rolesData = await rolesRes.json();
                const jurusanData = await jurusanRes.json();

                setUsers(usersData);
                setRoles(rolesData);
                setJurusan(jurusanData);

            } catch (e: any) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // --- Handler untuk submit form ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError(null);

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username,
                    password,
                    namaLengkap,
                    roleId: parseInt(roleId),
                    jurusanId: parseInt(jurusanId),
                    nim: roleId === '3' ? nim : undefined, // Sesuaikan dengan roleId Mahasiswa
                    nidn: roleId === '2' ? nidn : undefined, // Sesuaikan dengan roleId Dosen
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Gagal menambahkan pengguna baru.');
            }
            
            // Refresh daftar pengguna
            setUsers(prevUsers => [...prevUsers, data]);

            // Reset form
            setUsername('');
            setPassword('');
            setNamaLengkap('');
            setRoleId('');
            setJurusanId('');
            setNim('');
            setNidn('');

        } catch (e: any) {
            setFormError(e.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <p>Memuat data pengguna...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    const selectedRoleName = roles.find(r => r.roleId.toString() === roleId)?.roleName;

    return (
        <div className="space-y-8">
            {/* --- Form Tambah Pengguna --- */}
            <Card>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Tambah Pengguna Baru</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input id="namaLengkap" label="Nama Lengkap" value={namaLengkap} onChange={e => setNamaLengkap(e.target.value)} required />
                    <Input id="username" label="Username / ID Pengguna" value={username} onChange={e => setUsername(e.target.value)} required />
                    <Input id="password" label="Password Awal" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                     <Select
                        id="role"
                        label="Peran (Role)"
                        options={roles.map(r => ({ value: r.roleId.toString(), label: r.roleName }))}
                        value={roleId}
                        onChange={e => setRoleId(e.target.value)}
                        required
                    />
                    <Select
                        id="jurusan"
                        label="Jurusan"
                        options={jurusan.map(j => ({ value: j.jurusanId.toString(), label: j.namaJurusan }))}
                        value={jurusanId}
                        onChange={e => setJurusanId(e.target.value)}
                        required
                    />
                    {selectedRoleName === 'Mahasiswa' && (
                        <Input id="nim" label="NIM" value={nim} onChange={e => setNim(e.target.value)} required />
                    )}
                    {selectedRoleName === 'Dosen' && (
                        <Input id="nidn" label="NIDN" value={nidn} onChange={e => setNidn(e.target.value)} required />
                    )}

                    <div className="md:col-span-2 flex justify-end items-center">
                         {formError && <p className="text-sm text-red-600 mr-4">{formError}</p>}
                        <Button type="submit" isLoading={isSubmitting}>
                            Simpan Pengguna
                        </Button>
                    </div>
                </form>
            </Card>

            {/* --- Daftar Pengguna --- */}
            <Card>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Daftar Pengguna Sistem</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">User ID</th>
                                <th className="px-6 py-3">Username</th>
                                <th className="px-6 py-3">Peran</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.userId} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{user.userId}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.username}</td>
                                    <td className="px-6 py-4">{user.roleName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* --- Daftar dan Cari Mahasiswa --- */}
            <div className="mt-8">
                <MahasiswaManagementView />
            </div>

            <div className="mt-8">
                <DosenManagementView />
            </div>
        </div>
    );
};

export default UserManagementView;