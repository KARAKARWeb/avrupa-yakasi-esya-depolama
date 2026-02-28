'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQProps {
  title?: string;
  subtitle?: string;
  faq: any[];
}

export default function FAQ({ title, subtitle, faq }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const leftFaqs = faq.slice(0, 5);
  const rightFaqs = faq.slice(5, 10);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title || 'Sık Sorulan Sorular'}</h2>
          <p className="text-lg text-gray-600">
            {subtitle || 'Eşya depolama hakkında merak ettikleriniz'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {leftFaqs.map((item, index) => (
              <div key={item.id} className="bg-white rounded-lg border-2 border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full py-4 px-6 flex items-center justify-between text-left font-semibold hover:bg-gray-50 transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 transition-transform',
                      openIndex === index && 'rotate-180'
                    )}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {rightFaqs.map((item, index) => {
              const actualIndex = index + 5;
              return (
                <div key={item.id} className="bg-white rounded-lg border-2 border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === actualIndex ? null : actualIndex)}
                    className="w-full py-4 px-6 flex items-center justify-between text-left font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 transition-transform',
                        openIndex === actualIndex && 'rotate-180'
                      )}
                    />
                  </button>
                  {openIndex === actualIndex && (
                    <div className="px-6 pb-4 text-gray-600">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
