'use client';

import { useState, useMemo } from 'react';
import { User, Phone, Home, Calendar, ChevronDown, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { formatPrice, calculatePrice } from '@/lib/utils';

interface PriceCalculatorProps {
  prices: any;
  config?: any;
  formSettings?: any;
}

export default function PriceCalculator({ prices, config, formSettings }: PriceCalculatorProps) {
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [apartmentType, setApartmentType] = useState<string>('1+0');
  const [duration, setDuration] = useState<number>(1);
  const [nameError, setNameError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  const apartmentTypes = formSettings?.apartmentTypes || [
    { value: '1+0', label: '1+0 Daire', volume: 3 },
    { value: '1+1', label: '1+1 Daire', volume: 10 },
    { value: '2+1', label: '2+1 Daire', volume: 20 },
    { value: '3+1', label: '3+1 Daire', volume: 30 },
    { value: '4+1', label: '4+1 Daire', volume: 50 },
  ];

  const durationOptions = formSettings?.durationOptions || [
    { value: 1, label: '1 Ay' },
    { value: 2, label: '2 Ay' },
    { value: 3, label: '3 Ay' },
    { value: 6, label: '6 Ay' },
    { value: 12, label: '12 Ay (1 Yıl)' },
  ];

  const currentApartment = apartmentTypes.find((apt: any) => apt.value === apartmentType);
  const monthlyPrice = currentApartment?.monthlyPrice || 0;
  
  // Aylık fiyat x süre
  const totalPrice = monthlyPrice * duration;
  
  // Validasyon fonksiyonları
  const validateName = (name: string): boolean => {
    const trimmedName = name.trim();
    
    // Minimum 2 kelime kontrolü
    const words = trimmedName.split(/\s+/).filter(word => word.length > 0);
    if (words.length < 2) {
      setNameError('Lütfen ad ve soyadınızı giriniz');
      return false;
    }
    
    // Sadece harf ve Türkçe karakter kontrolü
    const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/;
    if (!nameRegex.test(trimmedName)) {
      setNameError('Sadece harf kullanınız');
      return false;
    }
    
    // Her kelimenin minimum 2 karakter olması
    const allWordsValid = words.every(word => word.length >= 2);
    if (!allWordsValid) {
      setNameError('Her kelime en az 2 karakter olmalıdır');
      return false;
    }
    
    setNameError('');
    return true;
  };
  
  const validatePhone = (phone: string): boolean => {
    // Tam 10 hane kontrolü
    if (phone.length !== 10) {
      setPhoneError('Telefon numarası 10 haneli olmalıdır');
      return false;
    }
    
    // 5 ile başlamalı (Türk cep telefonu)
    if (!phone.startsWith('5')) {
      setPhoneError('Geçerli bir cep telefonu numarası giriniz (5XX)');
      return false;
    }
    
    setPhoneError('');
    return true;
  };
  
  const isFormValid = useMemo(() => {
    const trimmedName = fullName.trim();
    const words = trimmedName.split(/\s+/).filter(word => word.length > 0);
    const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/;
    const nameValid = words.length >= 2 && nameRegex.test(trimmedName) && words.every(word => word.length >= 2);
    
    const phoneValid = phoneNumber.length === 10 && phoneNumber.startsWith('5');
    
    return nameValid && phoneValid;
  }, [fullName, phoneNumber]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Sadece rakamları al
    
    // Eğer 0 ile başlıyorsa, 0'ı kaldır
    if (value.startsWith('0')) {
      value = value.substring(1);
    }
    
    // Maksimum 10 hane
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  return (
    <div 
      className="rounded-2xl shadow-2xl p-8 backdrop-blur-2xl"
      style={{
        background: 'rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
      }}
      role="region" 
      aria-label="Fiyat hesaplama formu"
    >
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-2" id="price-calculator-title">
          {formSettings?.title || 'Ücretsiz Fiyat Teklifi Alın'}
        </h3>
      </div>

      <div className="space-y-5" role="form" aria-labelledby="price-calculator-title">
        {/* Ad Soyad ve Telefon - Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Ad Soyad */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (nameError) setNameError('');
                }}
                onBlur={() => validateName(fullName)}
                placeholder={formSettings?.namePlaceholder || 'Ad Soyad'}
                className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white focus:ring-4 outline-none transition-all text-gray-900 placeholder-gray-400 ${
                  nameError ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-primary focus:ring-primary/10'
                }`}
                required
              />
            </div>
            {nameError && (
              <p className="text-red-500 text-xs mt-1 ml-1">{nameError}</p>
            )}
          </div>

          {/* Telefon */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  handlePhoneChange(e);
                  if (phoneError) setPhoneError('');
                }}
                onBlur={() => validatePhone(phoneNumber)}
                placeholder={formSettings?.phonePlaceholder || 'Telefon: 5XX XXX XX XX'}
                maxLength={10}
                className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl bg-white focus:ring-4 outline-none transition-all text-gray-900 placeholder-gray-400 ${
                  phoneError ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-primary focus:ring-primary/10'
                }`}
                required
              />
            </div>
            {phoneError && (
              <p className="text-red-500 text-xs mt-1 ml-1">{phoneError}</p>
            )}
          </div>
        </div>

        {/* Daire Tipi ve Süre - Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Daire Tipi */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {formSettings?.apartmentLabel || 'Daire Tipi'} <span className="text-red-300">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Home className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={apartmentType}
                onChange={(e) => setApartmentType(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-gray-900 appearance-none cursor-pointer"
                required
              >
                {apartmentTypes.map((apt: { value: string; label: string; volume: number }) => (
                  <option key={apt.value} value={apt.value}>
                    {apt.label} (~{apt.volume} m³)
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Süre */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {formSettings?.durationLabel || 'Depolama Süresi'} <span className="text-red-300">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-gray-900 appearance-none cursor-pointer"
                required
              >
                {durationOptions.map((opt: { value: string; label: string }) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Fiyat Gösterimi - Sadece form doldurulunca */}
        {isFormValid && (
          <div 
            className="rounded-2xl p-6 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-lg" 
            role="status" 
            aria-live="polite" 
            aria-atomic="true"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <div className="text-center">
              <p className="text-sm text-primary mb-2 font-medium">{formSettings?.priceLabel || 'Tahmini Toplam Fiyat'}</p>
              <p className="text-5xl font-bold text-accent mb-3" aria-label={`Toplam fiyat ${formatPrice(totalPrice)}`}>
                {formatPrice(totalPrice)}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span className="text-sm font-semibold">Depolama Süreci Boyunca Ücretsiz Sigorta</span>
              </div>
            </div>
          </div>
        )}

        {/* Butonlar */}
        {config && (
          <div className="space-y-3">
            {/* Telefon ve WhatsApp - Yan Yana */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${config.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-3.5 rounded-lg hover:bg-primary-dark transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                <span className="hidden sm:inline">Hemen Ara</span>
                <span className="sm:hidden">Ara</span>
              </a>
              <a
                href={`https://wa.me/${config.contact.whatsapp.replace(/\s/g, '')}?text=${encodeURIComponent(
                  `Merhaba, fiyat teklifi almak istiyorum.\n\n` +
                  `Ad Soyad: ${fullName}\n` +
                  `Telefon: ${phoneNumber}\n` +
                  `Daire Tipi: ${apartmentTypes.find((apt: any) => apt.value === apartmentType)?.label}\n` +
                  `Süre: ${durationOptions.find((opt: any) => opt.value === duration)?.label}\n` +
                  `Toplam Fiyat: ${formatPrice(totalPrice)}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3.5 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
            
            {/* Hemen Teklif Al - Tam Genişlik */}
            <button
              disabled={!isFormValid}
              onClick={async () => {
                if (!isFormValid) return;
                
                try {
                  const response = await fetch('/api/send-quote', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      fullName,
                      phoneNumber,
                      apartmentType: apartmentTypes.find((apt: any) => apt.value === apartmentType)?.label,
                      duration: durationOptions.find((opt: any) => opt.value === duration)?.label,
                      totalPrice: formatPrice(totalPrice),
                    }),
                  });
                  
                  if (response.ok) {
                    alert('Teklifiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
                  } else {
                    alert('Bir hata oluştu. Lütfen WhatsApp üzerinden iletişime geçin.');
                  }
                } catch (error) {
                  alert('Bir hata oluştu. Lütfen WhatsApp üzerinden iletişime geçin.');
                }
              }}
              className="w-full flex items-center justify-center gap-2 bg-accent text-white px-6 py-3.5 rounded-lg hover:bg-accent-dark transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Teklif formu bölümüne git"
            >
              {isFormValid ? (formSettings?.submitButton || 'Hemen Teklif Al') : (formSettings?.submitButtonDisabled || 'Bilgilerinizi Girin')}
            </button>
          </div>
        )}

        {!isFormValid && (
          <p className="text-center text-sm text-gray-100 mt-3">
            {formSettings?.infoText || 'Fiyat görmek için ad soyad ve telefon bilgilerinizi giriniz'}
          </p>
        )}
      </div>
    </div>
  );
}
