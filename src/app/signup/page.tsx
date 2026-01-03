import { AuthProvider } from '@/contexts/AuthContext';
import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <AuthProvider>
      <SignupForm />
    </AuthProvider>
  );
}
