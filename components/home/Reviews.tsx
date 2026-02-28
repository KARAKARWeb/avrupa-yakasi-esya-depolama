import Card from '@/components/ui/Card';
import { Star } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ReviewsProps {
  reviews: any[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Müşteri Yorumları</h2>
          <p className="text-lg text-gray-600">
            Müşterilerimizin deneyimleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"{review.comment}"</p>
              <p className="text-sm text-gray-500">
                {review.name} - {formatDate(review.date)}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
