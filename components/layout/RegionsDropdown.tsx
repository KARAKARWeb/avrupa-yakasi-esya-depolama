'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  slug: string;
}

interface RegionsDropdownProps {
  regions: Region[];
}

export default function RegionsDropdown({ regions }: RegionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors"
      >
        Hizmet Bölgeleri
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
        >
          <div className="max-h-96 overflow-y-auto">
            {regions.map((region) => (
              <Link
                key={region.id}
                href={`/${region.slug}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
              >
                {region.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
