'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PricesFormProps {
  prices: any;
  updateAction: (formData: FormData) => Promise<{ success: boolean; message: string }>;
}

export default function PricesForm({ prices, updateAction }: PricesFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await updateAction(formData);

      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        router.refresh();
      } else {
        setMessage({ type: 'error', text: 'Güncelleme başarısız oldu' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Bir hata oluştu' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Temel Fiyatlandırma</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Temel Fiyat (₺)
            </label>
            <input
              type="number"
              name="basePrice"
              defaultValue={prices.basePrice}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              m² Başına Fiyat (₺)
            </label>
            <input
              type="number"
              name="pricePerM2"
              defaultValue={prices.pricePerM2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Fiyat (₺)
            </label>
            <input
              type="number"
              name="minPrice"
              defaultValue={prices.minPrice}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alan Fiyatları</h3>
        <div className="space-y-4">
          {prices.sizes.map((size: any) => (
            <div key={size.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {size.name} - Fiyat (₺)
                </label>
                <input
                  type="number"
                  name={`price_${size.id}`}
                  defaultValue={size.price}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama
                </label>
                <input
                  type="text"
                  name={`desc_${size.id}`}
                  defaultValue={size.description}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">İndirimler</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prices.discounts.map((discount: any) => (
            <div key={discount.months}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {discount.months} Ay - İndirim (%)
              </label>
              <input
                type="number"
                name={`discount_${discount.months}`}
                defaultValue={discount.percentage}
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
}
