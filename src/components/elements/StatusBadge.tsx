// src/components/elements/StatusBadge.tsx
import React from 'react';

interface StatusBadgeProps {
  status: 'Belum Kontrak' | 'Menunggu Persetujuan' | 'Disetujui';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles = {
    'Belum Kontrak': 'bg-yellow-100 text-yellow-800',
    'Menunggu Persetujuan': 'bg-blue-100 text-blue-800 animate-pulse',
    'Disetujui': 'bg-green-100 text-green-800',
  };

  const statusIcons = {
    'Belum Kontrak': '📢',
    'Menunggu Persetujuan': '⏳',
    'Disetujui': '✅',
  }

  return (
    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${statusStyles[status]}`}>
       <span className="mr-2">{statusIcons[status]}</span>
      {status}
    </div>
  );
};

export default StatusBadge;