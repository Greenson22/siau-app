import { AlertCircle } from "lucide-react";
import Card from "@/components/elements/Card";

const DemoInfoCard = () => {
  return (
    <Card className="px-8 py-6 shadow-lg bg-blue-50 border border-blue-200">
      <div className="flex items-start gap-4">
        <AlertCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-blue-800">Informasi Akun Demo</h3>
          <p className="text-sm text-blue-700 mt-1">
            Gunakan kredensial berikut untuk masuk sebagai peran yang berbeda:
          </p>
          <ul className="mt-3 list-disc list-inside text-sm space-y-2 text-blue-900">
            <li>
              <b>Mahasiswa:</b> User ID:{" "}
              <code className="bg-blue-200 px-1.5 py-0.5 rounded">
                20210118
              </code>
              , Pass:{" "}
              <code className="bg-blue-200 px-1.5 py-0.5 rounded">
                password
              </code>
            </li>
            <li>
              <b>Dosen:</b> User ID:{" "}
              <code className="bg-blue-200 px-1.5 py-0.5 rounded">dosen</code>,
              Pass:{" "}
              <code className="bg-blue-200 px-1.5 py-0.5 rounded">dosen</code>
            </li>
            <li>
              <b>Administrasi:</b> User ID:{" "}
              <code className="bg-blue-200 px-1.5 py-0.5 rounded">admin</code>,
              Pass:{" "}
              <code className="bg-blue-200 px-1.5 py-0.5 rounded">admin</code>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default DemoInfoCard;