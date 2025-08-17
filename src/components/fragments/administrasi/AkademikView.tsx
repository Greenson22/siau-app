// program/next-js/components/fragments/administrasi/AkademikView.tsx
import Card from '@/components/elements/Card';
import JurusanView from './JurusanView'; // Impor komponen baru

const AkademikView = () => (
    <div className="space-y-8">
        <Card>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Manajemen Akademik</h3>
            <div className="space-y-2">
                <p>• Mengelola data mahasiswa (status aktif/cuti).</p>
                <p>• Mengelola data mata kuliah dan kurikulum (sistem paket).</p>
                <p>• Mengelola data dosen.</p>
            </div>
        </Card>
        
        {/* Tambahkan komponen JurusanView di sini */}
        <JurusanView />
    </div>
);

export default AkademikView;