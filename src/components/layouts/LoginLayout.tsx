import Card from "@/components/elements/Card";
import LoginForm from "@/components/fragments/LoginForm";
import DemoInfoCard from "@/components/fragments/DemoInfoCard";
import BrandingPanel from "@/components/fragments/BrandingPanel"; // <-- Impor komponen baru

const LoginLayout = () => {
  return (
    <main className="flex min-h-screen bg-white">
      {/* Bagian Kiri: Branding Panel yang sudah diperbarui */}
      <BrandingPanel />

      {/* Bagian Kanan: Form Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <Card className="px-8 py-10 shadow-lg">
            <LoginForm />
          </Card>
          <DemoInfoCard />
        </div>
      </div>
    </main>
  );
};

export default LoginLayout;