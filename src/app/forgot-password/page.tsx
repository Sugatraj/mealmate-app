import { AuthProvider } from '@/contexts/AuthContext';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <AuthProvider>
      <ForgotPasswordForm />
    </AuthProvider>
  );
}
