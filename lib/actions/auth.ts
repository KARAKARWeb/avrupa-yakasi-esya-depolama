'use server';

import { redirect } from 'next/navigation';
import { verifyCredentials, createSession } from '@/lib/auth';

export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Kullanıcı adı ve şifre gereklidir' };
  }

  const user = await verifyCredentials(username, password);

  if (!user) {
    return { error: 'Kullanıcı adı veya şifre hatalı' };
  }

  await createSession(user);
  
  // Server-side redirect - cookie zaten set edilmiş olacak
  redirect('/admin/dashboard');
}
