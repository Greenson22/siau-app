// program/next-js/components/fragments/AcademicView/MahasiswaAcademicView.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Card from '@/components/elements/Card';
import TabButton from '@/components/elements/TabButton';
import KrsView from './KrsView';
import KhsView from './KhsView';
import TranscriptView from './TranscriptView';
import ScheduleView from './ScheduleView';

const MahasiswaAcademicView = () => {
  const [activeTab, setActiveTab] = useState('krs');

  // Fungsi baru untuk mengubah tab, akan diteruskan sebagai prop
  const handleSwitchTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  const studentTabs = useMemo(() => [
    { id: 'krs', label: 'KRS', component: <KrsView onSwitchTab={handleSwitchTab} /> },
    { id: 'khs', label: 'KHS', component: <KhsView /> },
    { id: 'transkrip', label: 'Transkrip Nilai', component: <TranscriptView /> },
    { id: 'jadwal', label: 'Jadwal Kuliah', component: <ScheduleView /> },
  ], []); // Dependensi kosong karena handleSwitchTab stabil

  const ActiveComponent = studentTabs.find(tab => tab.id === activeTab)?.component;

  return (
    <Card>
      <h3 className="text-xl font-bold mb-4 text-gray-800">Informasi Akademik</h3>
      
      <div className="border-b border-gray-200">
        <nav className="flex space-x-6 overflow-x-auto" aria-label="Tabs">
          {studentTabs.map((tab) => (
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

      <div className="mt-6">
        {ActiveComponent}
      </div>
    </Card>
  );
};

export default MahasiswaAcademicView;