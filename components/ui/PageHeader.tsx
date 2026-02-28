import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  siteName: string;
  variant?: 'default' | 'gradient' | 'minimal';
}

export default function PageHeader({ 
  title, 
  description, 
  breadcrumbs,
  siteName,
  variant = 'default' 
}: PageHeaderProps) {
  const getBgClass = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-primary/5 via-blue-50 to-white';
      case 'minimal':
        return 'bg-gray-50';
      default:
        return 'bg-gradient-to-br from-blue-50 via-white to-gray-50';
    }
  };

  return (
    <section className={`relative py-12 md:py-16 ${getBgClass()} overflow-hidden`}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Page Title & Description */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
              {description}
            </p>
          )}
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center justify-center gap-2 text-sm flex-wrap">
              <li className="flex items-center gap-2">
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {siteName}
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </li>
              
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  {item.href ? (
                    <>
                      <Link 
                        href={item.href}
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </>
                  ) : (
                    <span className="text-gray-900 font-semibold">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Decorative Line */}
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
