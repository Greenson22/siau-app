import Card from '@/components/elements/Card';

interface KrsInfoProps {
  sksTerpilih: number;
  maksSks: number;
}

export default function KrsInfo({ sksTerpilih, maksSks }: KrsInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card>
        <h3 className="text-lg font-medium text-gray-700">SKS Terpilih</h3>
        <p className={`text-3xl font-bold ${sksTerpilih > maksSks ? 'text-red-500' : 'text-blue-600'}`}>
          {sksTerpilih}
        </p>
      </Card>
      <Card>
        <h3 className="text-lg font-medium text-gray-700">Maksimal SKS</h3>
        <p className="text-3xl font-bold text-gray-800">{maksSks}</p>
      </Card>
    </div>
  );
}