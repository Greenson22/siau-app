import { Bell } from 'lucide-react';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
    <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex items-center gap-4">
            <div className="relative">
                <Bell size={20} className="text-gray-500" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center gap-3">
                <img src="https://placehold.co/40x40/E2E8F0/4A5568?text=AT" alt="User Avatar" className="w-10 h-10 rounded-full"/>
                <div>
                    <p className="font-semibold text-gray-700">Frendy Gerung</p>
                    <p className="text-sm text-gray-500">Mahasiswa</p>
                </div>
            </div>
        </div>
    </header>
);

export default Header;