'use client';

import React, { useState, useMemo } from 'react';
import Card from '@/components/elements/Card';
import TabButton from '@/components/elements/TabButton';
import KrsView from './KrsView';
import KhsView from './KhsView';
import TranscriptView from './TranscriptView';
import ScheduleView from './ScheduleView';

type AcademicTab = 'krs' | 'khs' | 'transkrip' | 'jadwal';

const AcademicView = () => {
  const [activeTab, setActiveTab] = useState<AcademicTab>('krs');

  const tabs: { id: AcademicTab; label: string; component: React.ComponentType }[] = useMemo(() => [
    { id: 'krs', label: 'KRS', component: KrsView },
    { id: 'khs', label: 'KHS', component: KhsView },
    { id: 'transkrip', label: 'Transkrip Nilai', component: TranscriptView },
    { id: 'jadwal', label: 'Jadwal Kuliah', component: ScheduleView },
  ], []);

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <Card>
      <h3 className="text-xl font-bold mb-4 text-gray-800">Informasi Akademik</h3>
      
      {/* === BAGIAN YANG DIPERBAIKI === */}
      {/* Kembalikan `border-b` di sini untuk membuat garis bawah panjang */}
      <div className="border-b border-gray-200"> 
        <nav className="flex space-x-6 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <div key={tab.id} className="flex-shrink-0">
              <TabButton
                label={tab.label}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            </div>
          ))}
        </nav>
      </div>
      {/* === AKHIR BAGIAN YANG DIPERBAIKI === */}

      <div className="mt-6">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </Card>
  );
};

export default AcademicView;