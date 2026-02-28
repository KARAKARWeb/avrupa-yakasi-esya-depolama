import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 mb-6">
          Sayfa Bulunamadı
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link href="/">
          <Button variant="primary">Ana Sayfaya Dön</Button>
        </Link>
      </div>
    </div>
  );
}
