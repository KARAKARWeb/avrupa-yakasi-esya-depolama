'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addReview, updateReview, deleteReview } from '@/lib/actions/reviews';
import { Plus, Edit, Trash2, X, Star } from 'lucide-react';

interface ReviewsManagerProps {
  reviews: any[];
}

export default function ReviewsManager({ reviews }: ReviewsManagerProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      const result = editingReview 
        ? await updateReview(formData)
        : await addReview(formData);

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setShowForm(false);
        setEditingReview(null);
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
    if (!confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      return;
    }

    setLoading(true);
    try {
      const result = await deleteReview(id);
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

  const handleEdit = (review: any) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingReview(null);
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
          Yeni Yorum Ekle
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {editingReview ? 'Yorum Düzenle' : 'Yeni Yorum Ekle'}
            </h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {editingReview && <input type="hidden" name="id" value={editingReview.id} />}
            {editingReview && <input type="hidden" name="date" value={editingReview.date} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İsim
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingReview?.name || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Puan (1-5)
                </label>
                <select
                  name="rating"
                  defaultValue={editingReview?.rating || 5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="5">5 Yıldız</option>
                  <option value="4">4 Yıldız</option>
                  <option value="3">3 Yıldız</option>
                  <option value="2">2 Yıldız</option>
                  <option value="1">1 Yıldız</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yorum
              </label>
              <textarea
                name="comment"
                defaultValue={editingReview?.comment || ''}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="verified"
                id="verified"
                value="true"
                defaultChecked={editingReview?.verified || false}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="verified" className="text-sm font-medium text-gray-700">
                Doğrulanmış Müşteri
              </label>
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
                disabled={loading}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review: any) => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{review.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(review)}
                  className="text-primary hover:text-primary-dark"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-red-600 hover:text-red-800"
                  disabled={loading}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{review.comment}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{review.date}</span>
              {review.verified && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                  Doğrulanmış
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
