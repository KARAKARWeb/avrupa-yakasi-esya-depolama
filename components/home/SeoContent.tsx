interface SeoContentProps {
  title?: string;
  content: string;
}

export default function SeoContent({ title, content }: SeoContentProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            {title}
          </h2>
        )}
        <div 
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed 
          [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-0 [&_h2]:first:mt-0 [&_h2]:mb-6 
          [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-4 
          [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-gray-900 [&_h4]:mt-6 [&_h4]:mb-3
          [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ul]:text-gray-700
          [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_ol]:text-gray-700
          [&_li]:mb-2 [&_li]:leading-relaxed
          [&_table]:border-collapse [&_table]:w-full [&_table]:mb-6 [&_table]:border [&_table]:border-gray-300
          [&_th]:border [&_th]:border-gray-300 [&_th]:p-3 [&_th]:bg-gray-100 [&_th]:font-bold [&_th]:text-left
          [&_td]:border [&_td]:border-gray-300 [&_td]:p-3"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
