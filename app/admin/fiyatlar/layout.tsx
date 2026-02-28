import { getSession } from '@/lib/auth';
import AdminLayout from '@/components/admin/AdminLayout';
import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware zaten session kontrolü yaptı, buraya geldiyse session var
  const session = await getSession();
  
  // Yine de kontrol edelim (type safety için)
  if (!session) {
    redirect('/admin/login');
  }

  return <AdminLayout session={session}>{children}</AdminLayout>;
}
