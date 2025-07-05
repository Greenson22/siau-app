import Card from '@/components/elements/Card';
import InfoText from '@/components/elements/InfoText';
import { dosen } from '@/lib/dataDosen';
import { Mail, User, Award } from 'lucide-react';

const ProfileDosenView = () => {
  return (
    <Card>
      <h3 className="text-xl font-bold text-gray-800 mb-6">Profil Dosen</h3>
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Foto Profil */}
        <div className="flex-shrink-0">
           <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-5xl">
             {dosen.nama.split(' ').map(n => n[0]).join('').substring(0,2)}
           </div>
        </div>

        {/* Info Detail */}
        <div className="w-full">
          <h4 className="text-2xl font-bold text-gray-900">{dosen.nama}</h4>
          <p className="text-md text-gray-500 mb-4">{dosen.peran} di STTIS Siau</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoText 
              icon={Award} 
              label="NIDN (Nomor Induk Dosen Nasional)" 
              value={dosen.nidn} 
            />
            <InfoText 
              icon={Mail} 
              label="Alamat Email" 
              value={dosen.email} 
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileDosenView;