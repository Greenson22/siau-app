// src/components/fragments/Sidebar/SidebarHeader.tsx
import Image from 'next/image';
import { X } from 'lucide-react';

interface SidebarHeaderProps {
  portalTitle: string;
  onClose: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ portalTitle, onClose }) => (
  <div className="flex flex-col items-center px-6 py-5 border-b border-gray-200 relative">
    <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-800 absolute top-4 right-4">
      <X size={24} />
    </button>
    
    <div className="mb-4">
      <Image 
        src="/images/logo.png" 
        alt="Logo STTIS Siau" 
        width={160} 
        height={40}
        className="h-10 w-auto rounded-full object-cover"
        priority
      />
    </div>
    
    <div className="text-center">
      <h1 className="text-xl font-bold text-gray-800">STTIS Siau</h1>
      <p className="text-sm text-gray-500">{portalTitle}</p>
    </div>
  </div>
);

export default SidebarHeader;