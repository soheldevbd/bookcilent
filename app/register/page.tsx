import type { Metadata } from 'next';
import RegisterForm from '@/components/RegisterForm';

export const metadata: Metadata = { title: 'BookNook | Register' };

export default function RegisterPage() {
  return <RegisterForm />;
}
