import Image from 'next/image';

interface GalleryProps {
  title?: string;
  subtitle?: string;
  images: Array<{
    id: string;
    src: string;
    alt: string;
    title: string;
  }>;
}

export default function Gallery({ title, subtitle, images }: GalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section id="galeri" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title || 'Galeri'}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle || 'Modern ve güvenli depolarımızdan görüntüler'}
          </p>
        </div>

        {/* Tüm Resimler - Mobilde 2 sütun, Desktop'ta 5 sütun */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">{image.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
