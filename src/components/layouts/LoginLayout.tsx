import Card from "@/components/elements/Card";
import Logo from "@/components/elements/Logo";
import LoginForm from "@/components/fragments/LoginForm";
import DemoInfoCard from "@/components/fragments/DemoInfoCard"; // <-- 1. Impor komponen baru

const LoginLayout = () => {
  return (
    <main className="flex min-h-screen bg-white">
      {/* Bagian Kiri: Panel Branding (Hanya untuk Desktop) */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-indigo-800 p-12 text-white">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="text-xl font-bold">STTIS Siau</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold leading-tight">
            Selamat Datang di Portal Akademik.
          </h1>
          <p className="mt-2 text-indigo-200">
            Akses informasi akademik Anda dengan mudah dan aman.
          </p>
        </div>
        <div className="text-sm text-indigo-300">
          © {new Date().getFullYear()} Sekolah Tinggi Teologi Injili Setia Siau
        </div>
      </div>

      {/* Bagian Kanan: Form Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <Card className="px-8 py-10 shadow-lg">
            <LoginForm />
          </Card>
          {/* Informasi kredesial untuk akun demo */}
          <DemoInfoCard />

        </div>
      </div>
    </main>
  );
};

export default LoginLayout;