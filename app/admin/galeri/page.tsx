import { getGallery } from '@/lib/actions/gallery';
import GalleryManager from '@/components/admin/GalleryManager';

export default async function GalleryPage() {
  const data = await getGallery();
  const images = data.images || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Galeri Yönetimi</h1>
        <p className="text-gray-600 mt-1">Galeri görsellerini yönetin</p>
      </div>

      <GalleryManager images={images} />
    </div>
  );
}
