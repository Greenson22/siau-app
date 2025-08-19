// program/next-js/components/fragments/DashboardView/ActivityLogCard.tsx
'use client';

import React from 'react';
import Card from '@/components/elements/Card';
import { useActionItems } from '@/hooks/useActionItems';
import { AlertCircle, History } from 'lucide-react';

const ActivityLogCard = () => {
    const { actionItems, isLoading, error } = useActionItems();

    const formatDate = (dateString: string) => 
        new Date(dateString).toLocaleString('id-ID', { 
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
        });

    if (isLoading) {
        return <Card><p className="text-gray-500">Memuat aktivitas terbaru...</p></Card>;
    }

    if (error) {
         return null; // Tidak menampilkan card jika error
    }

    const latestActivities = actionItems?.latestActivities || [];

    return (
        <Card>
            <div className="flex items-center gap-3 mb-4">
                <History className="text-indigo-500" />
                <h3 className="text-xl font-bold text-gray-800">Aktivitas Terbaru</h3>
            </div>
            
            {latestActivities.length > 0 ? (
                <ul className="space-y-3">
                    {latestActivities.map(log => (
                        <li key={log.logId} className="flex items-start gap-3 text-sm border-b pb-2 last:border-b-0 last:pb-0">
                            <div className="w-16 text-right text-gray-500 text-xs flex-shrink-0">{formatDate(log.timestamp)}</div>
                            <div>
                                <p className="font-semibold text-gray-800">{log.username}</p>
                                <p className="text-gray-600">{log.aksi}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500">Tidak ada aktivitas terbaru yang tercatat.</p>
            )}
        </Card>
    );
};

export default ActivityLogCard;