import { getReviews } from '@/lib/actions/reviews';
import ReviewsManager from '@/components/admin/ReviewsManager';

export default async function ReviewsPage() {
  const data = await getReviews();
  const reviews = data.reviews || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Yorum Yönetimi</h1>
        <p className="text-gray-600 mt-1">Müşteri yorumlarını yönetin</p>
      </div>

      <ReviewsManager reviews={reviews} />
    </div>
  );
}
