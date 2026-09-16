// app/register/page.tsx
import RegisterForm from '@/app/ui/register-form';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
  );
}