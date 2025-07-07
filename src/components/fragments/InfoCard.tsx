'use client';

import { ElementType } from 'react';
import Card from '@/components/elements/Card'; // Mengimpor komponen dasar Card

// Definisikan props untuk InfoCard
interface InfoCardProps {
  icon: ElementType;
  label: string;
  value: string | number;
  colorClass: {
    bg: string;
    text: string;
  };
}

// Komponen InfoCard yang menggunakan Card sebagai dasarnya
const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, label, value, colorClass }) => (
    <Card className="flex items-center gap-5 p-5">
        <div className={`p-4 rounded-full ${colorClass.bg}`}>
            <Icon className={colorClass.text} size={28}/>
        </div>
        <div>
            <p className="text-md text-gray-500">{label}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    </Card>
);

export default InfoCard;