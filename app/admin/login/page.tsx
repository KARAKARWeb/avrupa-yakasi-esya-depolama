import LoginForm from '@/components/admin/LoginForm';

export const metadata = {
  title: 'Admin Girişi',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Paneli</h1>
            <p className="text-gray-600">Yönetim paneline giriş yapın</p>
          </div>
          
          <LoginForm />
        </div>
        
        <p className="text-center text-white/80 text-sm mt-6">
          © 2024 Eşya Depolama. Tüm hakları saklıdır.
        </p>
      </div>
    </div>
  );
}
