import Card from "@/components/elements/Card";
import { mahasiswa } from "@/lib/data";
import { CreditCard, User, Mail, Phone } from "lucide-react";

const ProfileView = () => (
    <Card className="max-w-3xl mx-auto">
        <h3 className="text-xl font-bold mb-6">Profil Mahasiswa</h3>
        <div className="flex flex-col md:flex-row items-center gap-8">
            <img src={mahasiswa.fotoProfil} alt="Foto Profil" className="w-32 h-32 rounded-full shadow-md"/>
            <div className="flex-1">
                <p className="text-2xl font-bold text-gray-800">{mahasiswa.nama}</p>
                <p className="text-indigo-600">{mahasiswa.prodi}</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2"><CreditCard size={16} className="text-gray-500" /><span className="font-semibold">NIM:</span><span>{mahasiswa.nim}</span></div>
                    <div className="flex items-center gap-2"><User size={16} className="text-gray-500" /><span className="font-semibold">Status:</span><span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full">{mahasiswa.status}</span></div>
                    <div className="flex items-center gap-2"><Mail size={16} className="text-gray-500" /><span>{mahasiswa.email}</span></div>
                    <div className="flex items-center gap-2"><Phone size={16} className="text-gray-500" /><span>{mahasiswa.telepon}</span></div>
                </div>
            </div>
        </div>
    </Card>
);

export default ProfileView;