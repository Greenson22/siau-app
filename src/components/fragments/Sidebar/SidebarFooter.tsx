// src/components/fragments/Sidebar/SidebarFooter.tsx
import { LogOut } from 'lucide-react';

interface SidebarFooterProps {
  onLogout: () => void;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ onLogout }) => (
  <div className="px-6 py-4 border-t border-gray-200">
    <button 
      onClick={onLogout}
      className="w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition"
    >
      <LogOut size={16} />
      <span>Logout</span>
    </button>
  </div>
);

export default SidebarFooter;