import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { getSiteConfig, getRegions } from '@/lib/data';

export default async function Footer() {
  const config = await getSiteConfig();
  const regions = await getRegions();
  
  // Depo Fiyatları - Ana sayfadaki Pricing component ile aynı
  const storagePrices = [
    { type: '1+0 Daire', volume: 8, price: 2700 },
    { type: '1+1 Daire', volume: 17, price: 4000 },
    { type: '2+1 Daire', volume: 24, price: 6500 },
    { type: '3+1 Daire', volume: 30, price: 7500 },
    { type: '4+1 Daire', volume: 40, price: 11000 },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Partner Linkler */}
        <div className="py-8 border-b border-gray-300">
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://avrupayakasiesyadepolama.com" target="_blank" rel="nofollow noopener noreferrer" className="px-4 py-2 bg-white/50 hover:bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-primary hover:border-primary transition-all">
              Avrupa Yakası Eşya Depolama
            </a>
            <a href="https://anadoluyakasiesyadepolama.com" target="_blank" rel="nofollow noopener noreferrer" className="px-4 py-2 bg-white/50 hover:bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-primary hover:border-primary transition-all">
              Anadolu Yakası Eşya Depolama
            </a>
            <a href="https://besiktasesyadepolama.com" target="_blank" rel="nofollow noopener noreferrer" className="px-4 py-2 bg-white/50 hover:bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-primary hover:border-primary transition-all">
              Beşiktaş Eşya Depolama
            </a>
            <a href="https://beyogluesyadepolama.com" target="_blank" rel="nofollow noopener noreferrer" className="px-4 py-2 bg-white/50 hover:bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-primary hover:border-primary transition-all">
              Beyoğlu Eşya Depolama
            </a>
            <a href="https://esenyurtesyadepolama.com" target="_blank" rel="nofollow noopener noreferrer" className="px-4 py-2 bg-white/50 hover:bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-primary hover:border-primary transition-all">
              Esenyurt Eşya Depolama
            </a>
            <a href="https://kagithaneesyadepolama.com" target="_blank" rel="nofollow noopener noreferrer" className="px-4 py-2 bg-white/50 hover:bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-primary hover:border-primary transition-all">
              Kağıthane Eşya Depolama
            </a>
            <a href="https://sisliesyadepolama.com" target="_blank" rel="nofollow noopener noreferrer" className="px-4 py-2 bg-white/50 hover:bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-primary hover:border-primary transition-all">
              Şişli Eşya Depolama
            </a>
            <a href="https://zeytinburnuesyadepolama.com" target="_blank" rel="nofollow noopener noreferrer" className="px-4 py-2 bg-white/50 hover:bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-primary hover:border-primary transition-all">
              Zeytinburnu Eşya Depolama
            </a>
            <a href="https://bakirkoyesyadepolama.com" target="_blank" rel="nofollow noopener noreferrer" className="px-4 py-2 bg-white/50 hover:bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-primary hover:border-primary transition-all">
              Bakırköy Eşya Depolama
            </a>
            <a href="https://beykozesyadepolama.com" target="_blank" rel="nofollow noopener noreferrer" className="px-4 py-2 bg-white/50 hover:bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-primary hover:border-primary transition-all">
              Beykoz Eşya Depolama
            </a>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Site Bilgisi ve Sosyal Medya - %20 daha geniş */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4 text-gray-900">{config.site.name}</h3>
              <p className="text-gray-600 mb-4">
                {config.location.city} {config.location.region}'da güvenli ve uygun fiyatlı eşya depolama hizmeti.
              </p>
              <div className="flex gap-4">
                {config.social.facebook && (
                  <Link href={config.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary transition-colors">
                    <Facebook className="w-5 h-5" />
                  </Link>
                )}
                {config.social.instagram && (
                  <Link href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary transition-colors">
                    <Instagram className="w-5 h-5" />
                  </Link>
                )}
                {config.social.twitter && (
                  <Link href={config.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </Link>
                )}
                {config.social.linkedin && (
                  <Link href={config.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>

            {/* Kurumsal */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Kurumsal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link href="/hakkimizda" className="text-gray-600 hover:text-primary transition-colors">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/hizmet-bolgeleri" className="text-gray-600 hover:text-primary transition-colors">
                    Hizmet Bölgeleri
                  </Link>
                </li>
                <li>
                  <Link href="/#fiyatlarimiz" className="text-gray-600 hover:text-primary transition-colors">
                    Eşya Depolama Fiyatları
                  </Link>
                </li>
                <li>
                  <Link href="/iletisim" className="text-gray-600 hover:text-primary transition-colors">
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>

            {/* Hizmetlerimiz */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Hizmetlerimiz</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/#hizmetlerimiz" className="text-gray-600 hover:text-primary transition-colors text-sm">
                    Eşya Depolama Hizmeti
                  </Link>
                </li>
                <li>
                  <Link href="/#hizmetlerimiz" className="text-gray-600 hover:text-primary transition-colors text-sm">
                    Ev Eşyası Depolama
                  </Link>
                </li>
                <li>
                  <Link href="/#hizmetlerimiz" className="text-gray-600 hover:text-primary transition-colors text-sm">
                    Ofis Eşyası Depolama
                  </Link>
                </li>
                <li>
                  <Link href="/#hizmetlerimiz" className="text-gray-600 hover:text-primary transition-colors text-sm">
                    Arşiv / Evrak Depolama
                  </Link>
                </li>
                <li>
                  <Link href="/#hizmetlerimiz" className="text-gray-600 hover:text-primary transition-colors text-sm">
                    E-Ticaret Depolama
                  </Link>
                </li>
              </ul>
            </div>

            {/* Fiyatlarımız */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Fiyatlarımız</h3>
              <ul className="space-y-2">
                {storagePrices.map((item) => (
                  <li key={item.type} className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{item.type}</span>
                    <span className="text-gray-500"> {item.volume} m³:</span>
                    <span className="text-primary font-bold"> {item.price.toLocaleString('tr-TR')} ₺</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* İletişim Bilgileri */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">İletişim Bilgileri</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <a href={`tel:${config.contact.phone}`} className="text-gray-600 hover:text-primary transition-colors text-sm">
                      {config.contact.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <a href={`mailto:${config.contact.email}`} className="text-gray-600 hover:text-primary transition-colors text-sm">
                      {config.contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <a href={`https://wa.me/${config.contact.whatsapp.replace(/\D/g, '')}?text=Merhaba`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                      WhatsApp
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-sm">{config.contact.address}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Kozcuoğlu Linkler */}
        <div className="py-8 border-t border-b border-gray-300">
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://kozcuogluesyadepolama.com" target="_blank" rel="nofollow noopener noreferrer" className="px-4 py-2 bg-white/50 hover:bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-primary hover:border-primary transition-all">
              Kozcuoğlu Eşya Depolama
            </a>
            <a href="https://kozcuoglunakliyat.com.tr" target="_blank" rel="nofollow noopener noreferrer" className="px-4 py-2 bg-white/50 hover:bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-primary hover:border-primary transition-all">
              Kozcuoğlu Nakliyat
            </a>
            <a href="https://www.kozcuogluevdenevenakliyat.com" target="_blank" rel="nofollow noopener noreferrer" className="px-4 py-2 bg-white/50 hover:bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:text-primary hover:border-primary transition-all">
              Kozcuoğlu Evden Eve Nakliyat
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} {config.site.name}. Tüm hakları saklıdır.</p>
            <div className="flex items-center gap-2">
              <a 
                href="https://karakar.web.tr" 
                target="_blank" 
                rel="dofollow" 
                className="flex items-center gap-2 hover:opacity-80 transition-opacity" 
                title="web tasarım"
                aria-label="web tasarım"
              >
                <img 
                  src="https://karakar.web.tr/KARAKAR-Web-Logo-1.webp" 
                  alt="web tasarım" 
                  width="120" 
                  height="40" 
                  className="h-6 w-auto"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
