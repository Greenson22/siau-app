'use client';

import { BookCheck, BrainCircuit, GraduationCap } from 'lucide-react';
import { dosen } from '@/lib/dataDosen';
import { InfoItem } from '@/components/fragments/ProfileView';

const AkademikDosenSection = () => (
    <div className="space-y-6 text-sm">
        <div>
            <h4 className="font-bold text-lg text-gray-700 mb-4">Informasi Akademik</h4>
            <div className="space-y-4">
                <InfoItem icon={<BookCheck size={16} />} label="Jabatan Fungsional" value={dosen.jabatanAkademik} />
                <InfoItem icon={<BrainCircuit size={16} />} label="Bidang Keahlian" value={dosen.spesialisasi} isBlock />
            </div>
        </div>
         <div>
            <h4 className="font-bold text-lg text-gray-700 mt-6 mb-4">Riwayat Pendidikan</h4>
            <ul className="space-y-3">
                {dosen.riwayatPendidikan.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <GraduationCap className="text-indigo-500 mt-1 flex-shrink-0" size={18} />
                        <div>
                            <p className="font-semibold text-gray-800">{item.jenjang}</p>
                            <p className="text-gray-600">{item.institusi} - Lulus {item.tahun}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default AkademikDosenSection;