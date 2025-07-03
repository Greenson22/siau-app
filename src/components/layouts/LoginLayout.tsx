import Card from "@/components/elements/Card";
import LoginForm from "@/components/fragments/LoginForm";

const LoginLayout = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <Card className="px-8 py-10">
          <LoginForm />
        </Card>
        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} STTIS Siau. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default LoginLayout;