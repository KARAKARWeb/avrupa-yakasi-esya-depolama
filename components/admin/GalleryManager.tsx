'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addGalleryImage, updateGalleryImage, deleteGalleryImage } from '@/lib/actions/gallery';
import { Plus, Edit, Trash2, X, Upload } from 'lucide-react';
import Image from 'next/image';

interface GalleryManagerProps {
  images: any[];
}

export default function GalleryManager({ images }: GalleryManagerProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingImage, setEditingImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadedUrl(data.url);
        setMessage({ type: 'success', text: 'Dosya başarıyla yüklendi' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Yükleme başarısız' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Dosya yükleme hatası' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      const result = editingImage 
        ? await updateGalleryImage(formData)
        : await addGalleryImage(formData);

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setShowForm(false);
        setEditingImage(null);
        setUploadedUrl('');
        router.refresh();
      } else {
        setMessage({ type: 'error', text: result.message || 'İşlem başarısız oldu' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Bir hata oluştu' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu görseli silmek istediğinizden emin misiniz?')) {
      return;
    }

    setLoading(true);
    try {
      const result = await deleteGalleryImage(id);
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        router.refresh();
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Silme işlemi başarısız oldu' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (image: any) => {
    setEditingImage(image);
    setUploadedUrl(image.url);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingImage(null);
    setUploadedUrl('');
  };

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus size={20} />
          Yeni Görsel Ekle
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {editingImage ? 'Görsel Düzenle' : 'Yeni Görsel Ekle'}
            </h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {editingImage && <input type="hidden" name="id" value={editingImage.id} />}
            {editingImage && <input type="hidden" name="order" value={editingImage.order} />}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Görsel Yükle
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                  <Upload size={20} />
                  <span>{uploading ? 'Yükleniyor...' : 'Dosya Seç'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                {uploadedUrl && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-300">
                    <Image src={uploadedUrl} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Görsel URL
              </label>
              <input
                type="text"
                name="url"
                value={uploadedUrl}
                onChange={(e) => setUploadedUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="/uploads/gallery/image.jpg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alt Metni
              </label>
              <input
                type="text"
                name="alt"
                defaultValue={editingImage?.alt || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                name="category"
                defaultValue={editingImage?.category || 'depo'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="depo">Depo</option>
                <option value="guvenlik">Güvenlik</option>
                <option value="hizmet">Hizmet</option>
                <option value="musteri">Müşteri</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading || !uploadedUrl}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image: any) => (
          <div key={image.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative h-48">
              <Image 
                src={image.url} 
                alt={image.alt} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-gray-900 truncate">{image.alt}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                {image.category}
              </span>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(image)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <Edit size={14} />
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                  disabled={loading}
                >
                  <Trash2 size={14} />
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
