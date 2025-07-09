import { X } from 'lucide-react';
import Logo from '@/components/elements/Logo';

interface SidebarHeaderProps {
  portalTitle: string;
  onClose: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ portalTitle, onClose }) => (
  <div className="flex flex-col items-center px-6 py-5 border-b border-gray-200 relative">
    {/* Tombol close untuk mobile */}
    <button 
      onClick={onClose} 
      className="md:hidden text-gray-500 hover:text-gray-800 absolute top-4 right-4"
    >
      <X size={24} />
    </button>
    
    <div className="mb-2">
      <Logo 
        showText={true} 
        textColor="text-gray-800"
        textPosition='bawah'
      />
    </div>
    
    <div className="text-center">
      <p className="text-sm text-gray-500">{portalTitle}</p>
    </div>
  </div>
);

export default SidebarHeader;