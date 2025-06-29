// src/app/(dashboard)/krs/page.tsx

import KrsView from '@/components/fragments/KrsView';
import { dataMataKuliah } from '@/lib/data';

export default function KrsPage() {
  return <KrsView dataMataKuliah={dataMataKuliah} />;
}