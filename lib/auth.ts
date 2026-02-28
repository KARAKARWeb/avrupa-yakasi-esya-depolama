import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { readFile } from 'fs/promises';
import { join } from 'path';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 saat

interface AdminUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

interface Session {
  userId: string;
  username: string;
  email: string;
  role: string;
  expiresAt: number;
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  const filePath = join(process.cwd(), 'data', 'admin-users.json');
  const fileContent = await readFile(filePath, 'utf-8');
  const data = JSON.parse(fileContent);
  return data.users || [];
}

export async function verifyCredentials(username: string, password: string): Promise<AdminUser | null> {
  const users = await getAdminUsers();
  const user = users.find(u => u.username === username || u.email === username);
  
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}

export async function createSession(user: AdminUser): Promise<void> {
  const session: Session = {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    expiresAt: Date.now() + SESSION_DURATION,
  };

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    
    if (!sessionCookie?.value) {
      return null;
    }

    const session: Session = JSON.parse(sessionCookie.value);

    if (Date.now() > session.expiresAt) {
      await destroySession();
      return null;
    }

    return session;
  } catch (error) {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function requireAuth(): Promise<Session> {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}
