'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      volume: formData.get('volume'),
      duration: formData.get('duration'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Mesaj gönderilemedi');
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError('Mesaj gönderilemedi, lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-100 rounded-xl p-6 space-y-4" id="contact-form" aria-labelledby="contact-form-title" noValidate>
      <h3 className="text-2xl font-bold text-gray-900 mb-6" id="contact-form-title">İletişim Formu</h3>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg" role="alert" aria-live="polite">
          ✓ Talebiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg" role="alert" aria-live="assertive">
          ✗ {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="name"
          label="Ad Soyad"
          placeholder="Adınız Soyadınız"
          required
        />
        <Input
          name="phone"
          label="Telefon"
          type="tel"
          placeholder="0532 XXX XX XX"
          required
        />
      </div>

      <Input
        name="email"
        label="E-posta"
        type="email"
        placeholder="ornek@email.com"
        required
      />

      <Textarea
        name="message"
        label="Mesajınız (Opsiyonel)"
        rows={4}
        placeholder="Ek bilgi veya sorularınız..."
      />

      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Gönderiliyor...
          </>
        ) : (
          'Gönder'
        )}
      </Button>
    </form>
  );
}
