'use client';

import { useRouter } from 'next/navigation';
import { Menu, LogOut, User, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface AdminHeaderProps {
  session: {
    username: string;
    email: string;
    role: string;
  };
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function AdminHeader({ session, onMenuClick, sidebarOpen }: AdminHeaderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      setLoading(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
            <User size={20} className="text-gray-600" />
            <div className="text-sm">
              <p className="font-semibold text-gray-900">{session.username}</p>
              <p className="text-gray-500 text-xs">{session.email}</p>
            </div>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <ExternalLink size={18} />
            <span className="font-medium">Siteyi Görüntüle</span>
          </a>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <LogOut size={18} />
            <span className="font-medium">Çıkış</span>
          </button>
        </div>
      </div>
    </header>
  );
}
