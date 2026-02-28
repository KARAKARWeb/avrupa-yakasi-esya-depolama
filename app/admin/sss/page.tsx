import { getFAQs } from '@/lib/actions/faq';
import FAQManager from '@/components/admin/FAQManager';

export default async function FAQPage() {
  const data = await getFAQs();
  const faqs = data.faqs || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SSS Yönetimi</h1>
        <p className="text-gray-600 mt-1">Sık sorulan soruları yönetin</p>
      </div>

      <FAQManager faqs={faqs} />
    </div>
  );
}
